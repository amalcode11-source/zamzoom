import { Handler } from '@netlify/functions';
import { db } from '../_lib/db';
import { orders, orderItems, products } from '../../../drizzle/schema';
import { and, eq, inArray } from 'drizzle-orm';
import { z } from 'zod';
import { createRazorpayOrder } from '../_lib/razorpay';
import { validateAuth } from '../_lib/auth';
import { orderSchema, cartValidationSchema } from '../_lib/validation';

export const handler: Handler = async (event, context) => {
  try {
    // Authenticate user
    const user = await validateAuth(event);
    if (!user) {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'Authentication required',
        }),
      };
    }

    // Parse request body
    const requestData = JSON.parse(event.body || '{}');
    const { items } = orderSchema.parse(requestData);

    if (items.length === 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'Order must contain at least one item',
        }),
      };
    }

    // Extract product IDs and validate stock
    const productIds = items.map(item => item.productId);
    const availableProducts = await db
      .select()
      .from(products)
      .where(
        and(
          inArray(products.id, productIds),
          eq(products.isActive, true)
        )
      );

    let subtotalCents = 0;
    const orderItemsData = [];

    // Validate each item and calculate total
    for (const cartItem of items) {
      const product = availableProducts.find(p => p.id === cartItem.productId);
      
      if (!product) {
        return {
          statusCode: 404,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            success: false,
            error: `Product not found: ${cartItem.productId}`,
          }),
        };
      }

      if (product.stock < cartItem.qty) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            success: false,
            error: `Insufficient stock for ${product.title}`,
          }),
        };
      }

      const itemTotal = product.priceCents * cartItem.qty;
      subtotalCents += itemTotal;

      orderItemsData.push({
        productId: cartItem.productId,
        qty: cartItem.qty,
        priceCents: product.priceCents,
      });
    }

    const shippingCents = 0; // Free shipping for MVP
    const totalCents = subtotalCents + shippingCents;

    // Create order in database
    const [newOrder] = await db
      .insert(orders)
      .values({
        userId: user.id,
        subtotalCents,
        shippingCents,
        totalCents,
        status: 'created',
      })
      .returning();

    // Create order items
    await db.insert(orderItems).values(
      orderItemsData.map(item => ({
        ...item,
        orderId: newOrder.id,
      }))
    );

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder({
      amount: totalCents,
      currency: 'INR',
      receipt: `order_${newOrder.id}`,
      notes: {
        orderId: newOrder.id,
        userId: user.id,
      },
    });

    // Update order with Razorpay order ID
    await db
      .update(orders)
      .set({ razorpayOrderId: razorpayOrder.id })
      .where(eq(orders.id, newOrder.id));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        data: {
          order: newOrder,
          razorpayOrder: {
            id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID,
          },
        },
      }),
    };
  } catch (error) {
    console.error('Order creation error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to create order',
      }),
    };
  }
};
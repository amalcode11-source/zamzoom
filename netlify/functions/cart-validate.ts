import { Handler } from '@netlify/functions';
import { db } from '../_lib/db';
import { products } from '../../../drizzle/schema';
import { and, eq, inArray } from 'drizzle-orm';
import { z } from 'zod';
import { cartValidationSchema } from '../_lib/validation';

export const handler: Handler = async (event, context) => {
  try {
    // Parse request body
    const requestData = JSON.parse(event.body || '{}');
    const { items } = cartValidationSchema.parse(requestData);

    if (items.length === 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'Cart is empty',
        }),
      };
    }

    // Extract product IDs
    const productIds = items.map(item => item.productId);

    // Fetch all products
    const availableProducts = await db
      .select()
      .from(products)
      .where(
        and(
          inArray(products.id, productIds),
          eq(products.isActive, true)
        )
      );

    // Validate each cart item
    const validatedItems = [];
    let subtotalCents = 0;

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

      if (product.stock < cartItem.quantity) {
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

      const itemTotal = product.priceCents * cartItem.quantity;
      subtotalCents += itemTotal;

      validatedItems.push({
        product,
        quantity: cartItem.quantity,
        itemTotal,
      });
    }

    const shippingCents = 0; // Free shipping for MVP
    const totalCents = subtotalCents + shippingCents;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        data: {
          items: validatedItems,
          subtotalCents,
          shippingCents,
          totalCents,
        },
      }),
    };
  } catch (error) {
    console.error('Cart validation error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to validate cart',
      }),
    };
  }
};
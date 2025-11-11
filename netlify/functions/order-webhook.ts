import { Handler } from '@netlify/functions';
import { db } from '../_lib/db';
import { orders, orderItems, products } from '../../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { verifyRazorpaySignature } from '../_lib/razorpay';
import { webhookSchema } from '../_lib/validation';

export const handler: Handler = async (event, context) => {
  try {
    // Parse webhook payload
    const webhookData = JSON.parse(event.body || '{}');
    const { event: webhookEvent, payload } = webhookSchema.parse(webhookData);

    // Handle payment success event
    if (webhookEvent === 'payment.captured') {
      const payment = payload.payment;
      const orderId = payment.order_id;

      // Find the order
      const [order] = await db
        .select()
        .from(orders)
        .where(eq(orders.razorpayOrderId, orderId))
        .limit(1);

      if (!order) {
        return {
          statusCode: 404,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            success: false,
            error: 'Order not found',
          }),
        };
      }

      // Verify webhook signature
      const secret = process.env.RAZORPAY_KEY_SECRET;
      if (!secret) {
        throw new Error('Razorpay secret not configured');
      }

      const expectedSignature = event.headers['x-razorpay-signature'];
      const payloadString = JSON.stringify(payload);

      if (!verifyRazorpaySignature(payloadString, expectedSignature, secret)) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            success: false,
            error: 'Invalid webhook signature',
          }),
        };
      }

      // Update order status to paid
      await db
        .update(orders)
        .set({ status: 'paid' })
        .where(eq(orders.id, order.id));

      // Get order items to update stock
      const orderItemsList = await db
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, order.id));

      // Update product stock
      for (const orderItem of orderItemsList) {
        const [product] = await db
          .select()
          .from(products)
          .where(eq(products.id, orderItem.productId))
          .limit(1);

        if (product && product.stock >= orderItem.qty) {
          await db
            .update(products)
            .set({ stock: product.stock - orderItem.qty })
            .where(eq(products.id, orderItem.productId));
        }
      }

      console.log(`Order ${order.id} marked as paid, stock updated`);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Webhook processed successfully',
      }),
    };
  } catch (error) {
    console.error('Webhook processing error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to process webhook',
      }),
    };
  }
};
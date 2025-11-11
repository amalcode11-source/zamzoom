import { Handler } from '@netlify/functions';
import { db } from '../_lib/db';
import { orders } from '../../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { orderStatusSchema } from '../_lib/validation';
import { validateAuth, requireAdmin } from '../_lib/auth';

export const handler: Handler = async (event, context) => {
  try {
    // Authenticate user and require admin role
    const user = await validateAuth(event);
    requireAdmin(user);

    // Parse request body
    const requestData = JSON.parse(event.body || '{}');
    const { orderId, status } = orderStatusSchema.parse(requestData);

    // Update order status
    const [updatedOrder] = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, orderId))
      .returning();

    if (!updatedOrder) {
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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        data: updatedOrder,
      }),
    };
  } catch (error) {
    console.error('Order status update error:', error);
    
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'Invalid order data',
          details: error.errors,
        }),
      };
    }

    if (error instanceof Error && error.message === 'Admin access required') {
      return {
        statusCode: 403,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'Admin access required',
        }),
      };
    }

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to update order status',
      }),
    };
  }
};
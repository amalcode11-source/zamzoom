import { Handler } from '@netlify/functions';
import { db } from '../_lib/db';
import { products } from '../../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { productUpdateSchema } from '../_lib/validation';
import { validateAuth, requireAdmin } from '../_lib/auth';

export const handler: Handler = async (event, context) => {
  try {
    // Authenticate user and require admin role
    const user = await validateAuth(event);
    requireAdmin(user);

    // Parse request body
    const requestData = JSON.parse(event.body || '{}');
    const { id, ...updateData } = productUpdateSchema.parse(requestData);

    // Update product
    const [updatedProduct] = await db
      .update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();

    if (!updatedProduct) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'Product not found',
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
        data: updatedProduct,
      }),
    };
  } catch (error) {
    console.error('Product update error:', error);
    
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'Invalid product data',
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
        error: 'Failed to update product',
      }),
    };
  }
};
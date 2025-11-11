import { Handler } from '@netlify/functions';
import { db } from '../_lib/db';
import { products } from '../../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { validateAuth, requireAdmin } from '../_lib/auth';

const deleteSchema = z.object({
  id: z.string().uuid(),
});

export const handler: Handler = async (event, context) => {
  try {
    // Authenticate user and require admin role
    const user = await validateAuth(event);
    requireAdmin(user);

    // Parse request body
    const requestData = JSON.parse(event.body || '{}');
    const { id } = deleteSchema.parse(requestData);

    // Soft delete by setting isActive to false
    const [deletedProduct] = await db
      .update(products)
      .set({ isActive: false })
      .where(eq(products.id, id))
      .returning();

    if (!deletedProduct) {
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
        data: deletedProduct,
      }),
    };
  } catch (error) {
    console.error('Product deletion error:', error);
    
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'Invalid product ID',
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
        error: 'Failed to delete product',
      }),
    };
  }
};
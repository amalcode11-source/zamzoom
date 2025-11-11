import { Handler } from '@netlify/functions';
import { db } from '../_lib/db';
import { products } from '../../../drizzle/schema';
import { z } from 'zod';
import { productSchema } from '../_lib/validation';
import { validateAuth, requireAdmin } from '../_lib/auth';

export const handler: Handler = async (event, context) => {
  try {
    // Authenticate user and require admin role
    const user = await validateAuth(event);
    requireAdmin(user);

    // Parse request body
    const requestData = JSON.parse(event.body || '{}');
    const productData = productSchema.parse(requestData);

    // Create product
    const [newProduct] = await db
      .insert(products)
      .values({
        ...productData,
      })
      .returning();

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        data: newProduct,
      }),
    };
  } catch (error) {
    console.error('Product creation error:', error);
    
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
        error: 'Failed to create product',
      }),
    };
  }
};
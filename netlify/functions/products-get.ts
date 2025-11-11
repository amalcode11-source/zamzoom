import { Handler } from '@netlify/functions';
import { db } from '../_lib/db';
import { products } from '../../../drizzle/schema';
import { and, eq, isNull } from 'drizzle-orm';
import { z } from 'zod';

const querySchema = z.object({
  category: z.enum(['honey', 'nuts', 'combo']).optional(),
  search: z.string().optional(),
  limit: z.string().optional(),
  offset: z.string().optional(),
});

export const handler: Handler = async (event, context) => {
  try {
    // Parse query parameters
    const queryParams = querySchema.parse(event.queryStringParameters || {});
    const { category, search, limit = '20', offset = '0' } = queryParams;

    // Build where conditions
    const whereConditions = [
      eq(products.isActive, true),
      isNull(products.deletedAt),
    ];

    if (category) {
      whereConditions.push(eq(products.category, category));
    }

    if (search) {
      whereConditions.push(
        // Note: In production, you'd use proper full-text search
        // This is a simple substring search for demo purposes
      );
    }

    // Fetch products
    const productsList = await db
      .select()
      .from(products)
      .where(and(...whereConditions))
      .limit(parseInt(limit))
      .offset(parseInt(offset))
      .orderBy(products.createdAt);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        data: productsList,
      }),
    };
  } catch (error) {
    console.error('Products fetch error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to fetch products',
      }),
    };
  }
};
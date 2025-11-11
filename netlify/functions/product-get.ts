import { Handler } from '@netlify/functions';
import { db } from '../_lib/db';
import { products } from '../../../drizzle/schema';
import { eq, and, isNull } from 'drizzle-orm';
import { z } from 'zod';

const paramsSchema = z.object({
  slug: z.string(),
});

export const handler: Handler = async (event, context) => {
  try {
    // Parse path parameters
    const pathParams = event.path.split('/');
    const slug = pathParams[pathParams.length - 1];

    // Validate slug
    const { slug: validSlug } = paramsSchema.parse({ slug });

    // Fetch product
    const product = await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.slug, validSlug),
          eq(products.isActive, true),
          isNull(products.deletedAt)
        )
      )
      .limit(1);

    if (product.length === 0) {
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
        data: product[0],
      }),
    };
  } catch (error) {
    console.error('Product fetch error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to fetch product',
      }),
    };
  }
};
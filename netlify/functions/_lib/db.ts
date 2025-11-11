import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

if (!process.env.NEON_DATABASE_URL) {
  throw new Error('NEON_DATABASE_URL is required');
}

const sql = neon(process.env.NEON_DATABASE_URL);
export const db = drizzle(sql);
import jwt from 'jsonwebtoken';
import { db } from './db';
import { users } from '../../../drizzle/schema';
import { eq } from 'drizzle-orm';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export async function validateAuth(event: any): Promise<AuthUser | null> {
  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!authHeader) return null;

  const token = authHeader.replace('Bearer ', '');
  if (!token) return null;

  try {
    const secret = process.env.NETLIFY_IDENTITY_SECRET || process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT secret not configured');
    }

    const decoded = jwt.verify(token, secret) as any;
    const userId = decoded.sub || decoded.user_id;

    if (!userId) return null;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (user.length === 0) return null;

    const [userData] = user;
    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
    };
  } catch (error) {
    console.error('Auth validation error:', error);
    return null;
  }
}

export function requireAdmin(user: AuthUser | null): void {
  if (!user || user.role !== 'admin') {
    throw new Error('Admin access required');
  }
}
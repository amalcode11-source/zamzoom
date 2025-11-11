import { z } from 'zod';

// User schemas
export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
  role: z.enum(['customer', 'admin']).default('customer'),
});

// Product schemas
export const productSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(['honey', 'nuts', 'combo']),
  priceCents: z.number().int().positive(),
  unit: z.string().default('g'),
  unitSize: z.number().int().positive(),
  stock: z.number().int().nonnegative(),
  imageUrl: z.string().url().optional(),
  isActive: z.boolean().default(true),
});

export const productUpdateSchema = productSchema.partial().extend({
  id: z.string().uuid(),
});

// Order schemas
export const cartItemSchema = z.object({
  productId: z.string().uuid(),
  qty: z.number().int().positive(),
});

export const orderSchema = z.object({
  items: z.array(cartItemSchema).min(1),
});

export const orderStatusSchema = z.object({
  orderId: z.string().uuid(),
  status: z.enum(['created', 'paid', 'shipped', 'delivered', 'cancelled']),
});

// Cart validation schema
export const cartValidationSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
  })),
});

// Webhook validation schema
export const webhookSchema = z.object({
  event: z.string(),
  payload: z.record(z.any()),
});

// API Response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
});

// Cloudinary upload schema
export const cloudinaryUploadSchema = z.object({
  url: z.string().url(),
  publicId: z.string(),
});
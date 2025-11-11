import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
import { products } from '../drizzle/schema';

if (!process.env.NEON_DATABASE_URL) {
  throw new Error('NEON_DATABASE_URL is required');
}

const sql = neon(process.env.NEON_DATABASE_URL);
const db = drizzle(sql);

const seedProducts = [
  // 4 Honey Products
  {
    slug: 'raw-honey-500g',
    title: 'Raw Wildflower Honey',
    description: 'Pure, unprocessed wildflower honey harvested from pristine forest regions. Rich in antioxidants and natural enzymes.',
    category: 'honey' as const,
    priceCents: 45000, // ₹450
    unit: 'g' as const,
    unitSize: 500,
    stock: 50,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1234567890/honey-1.jpg',
    isActive: true,
  },
  {
    slug: 'manuka-honey-250g',
    title: 'Premium Manuka Honey',
    description: 'Authentic Manuka honey with high UMF rating. Known for its exceptional medicinal properties and unique flavor.',
    category: 'honey' as const,
    priceCents: 120000, // ₹1,200
    unit: 'g' as const,
    unitSize: 250,
    stock: 25,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1234567890/honey-2.jpg',
    isActive: true,
  },
  {
    slug: 'acacia-honey-1kg',
    title: 'Pure Acacia Honey',
    description: 'Light, clear honey with a delicate floral taste that stays liquid for longer. Perfect for tea and baking.',
    category: 'honey' as const,
    priceCents: 80000, // ₹800
    unit: 'g' as const,
    unitSize: 1000,
    stock: 30,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1234567890/honey-3.jpg',
    isActive: true,
  },
  {
    slug: 'honey-comb-200g',
    title: 'Natural Honey Comb',
    description: 'Whole honey comb straight from the hive. Experience honey in its most natural form with edible wax.',
    category: 'honey' as const,
    priceCents: 65000, // ₹650
    unit: 'g' as const,
    unitSize: 200,
    stock: 20,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1234567890/honey-4.jpg',
    isActive: true,
  },

  // 4 Nuts Products
  {
    slug: 'mixed-nuts-500g',
    title: 'Premium Mixed Nuts',
    description: 'Carefully selected blend of almonds, cashews, walnuts, and pistachios. A perfect healthy snack.',
    category: 'nuts' as const,
    priceCents: 75000, // ₹750
    unit: 'g' as const,
    unitSize: 500,
    stock: 40,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1234567890/nuts-1.jpg',
    isActive: true,
  },
  {
    slug: 'california-almonds-1kg',
    title: 'California Almonds',
    description: 'Premium California almonds, rich in protein and healthy fats. Perfect for snacking or cooking.',
    category: 'nuts' as const,
    priceCents: 85000, // ₹850
    unit: 'g' as const,
    unitSize: 1000,
    stock: 35,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1234567890/nuts-2.jpg',
    isActive: true,
  },
  {
    slug: 'cashews-premium-500g',
    title: 'Premium Cashews',
    description: 'Whole cashews with a rich, buttery flavor. Carefully selected for quality and freshness.',
    category: 'nuts' as const,
    priceCents: 95000, // ₹950
    unit: 'g' as const,
    unitSize: 500,
    stock: 28,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1234567890/nuts-3.jpg',
    isActive: true,
  },
  {
    slug: 'walnuts-premium-500g',
    title: 'Premium Walnuts',
    description: 'Rich, earthy walnuts packed with omega-3 fatty acids. Great for baking and healthy eating.',
    category: 'nuts' as const,
    priceCents: 65000, // ₹650
    unit: 'g' as const,
    unitSize: 500,
    stock: 32,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1234567890/nuts-4.jpg',
    isActive: true,
  },

  // 4 Combo Products
  {
    slug: 'honey-nuts-combo-1kg',
    title: 'Honey & Nuts Celebration Combo',
    description: 'Perfect gift combo featuring premium honey and assorted nuts. Ideal for festivals and special occasions.',
    category: 'combo' as const,
    priceCents: 120000, // ₹1,200
    unit: 'g' as const,
    unitSize: 1000,
    stock: 20,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1234567890/combo-1.jpg',
    isActive: true,
  },
  {
    slug: 'breakfast-combo-750g',
    title: 'Healthy Breakfast Combo',
    description: 'Start your day right with this nutritious combo of honey, nuts, and dried fruits.',
    category: 'combo' as const,
    priceCents: 90000, // ₹900
    unit: 'g' as const,
    unitSize: 750,
    stock: 25,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1234567890/combo-2.jpg',
    isActive: true,
  },
  {
    slug: 'organic-trio-800g',
    title: 'Organic Honey Trio Combo',
    description: 'Three different types of organic honey in one convenient pack. A honey lover\'s dream.',
    category: 'combo' as const,
    priceCents: 150000, // ₹1,500
    unit: 'g' as const,
    unitSize: 800,
    stock: 15,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1234567890/combo-3.jpg',
    isActive: true,
  },
  {
    slug: 'family-pack-2kg',
    title: 'Family Size Honey & Nuts Pack',
    description: 'Large family pack perfect for families. Great value with premium quality products.',
    category: 'combo' as const,
    priceCents: 220000, // ₹2,200
    unit: 'g' as const,
    unitSize: 2000,
    stock: 12,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1234567890/combo-4.jpg',
    isActive: true,
  },
];

async function main() {
  console.log('🌱 Seeding database...');
  
  try {
    // Clear existing products
    await db.delete(products);
    console.log('🗑️ Cleared existing products');
    
    // Insert seed data
    const insertedProducts = await db.insert(products).values(seedProducts).returning();
    console.log(`✅ Inserted ${insertedProducts.length} products`);
    
    // Create a default admin user (for testing)
    // In a real app, this would be handled by Netlify Identity
    console.log('👤 Default admin user would be created here');
    console.log('🔐 Admin credentials: admin@zamzoom.com / password123');
    
    console.log('🎉 Database seeded successfully!');
    console.log('\n📊 Seeded Products:');
    console.log('🍯 Honey Products:', seedProducts.filter(p => p.category === 'honey').length);
    console.log('🥜 Nuts Products:', seedProducts.filter(p => p.category === 'nuts').length);
    console.log('🎁 Combo Products:', seedProducts.filter(p => p.category === 'combo').length);
    
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

main()
  .then(() => {
    console.log('✨ Seeding completed!');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
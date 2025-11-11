const { initializeApp } = require('firebase/app')
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyDag1mtzUeBGKpIk1kXl9fQ9cXfECBmAqI",
  authDomain: "zamzoom-b9088.firebaseapp.com",
  projectId: "zamzoom-b9088",
  storageBucket: "zamzoom-b9088.firebasestorage.app",
  messagingSenderId: "1087058101275",
  appId: "1:1087058101275:web:b3887e3a0b3ad1347e24be",
  measurementId: "G-MH6X12KWQ0"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function seedData() {
  try {
    console.log('🌱 Seeding Firebase data...')

    // Seed categories
    const categories = [
      { id: 'honey', name: 'Honey', slug: 'honey' },
      { id: 'nuts', name: 'Nuts', slug: 'nuts' }
    ]

    for (const category of categories) {
      await setDoc(doc(db, 'categories', category.id), category)
      console.log(`✅ Added category: ${category.name}`)
    }

    // Seed products
    const products = [
      {
        id: 'pure-wild-honey',
        name: 'Pure Wild Honey',
        slug: 'pure-wild-honey',
        category: 'honey',
        description: 'Natural wild honey harvested from pristine forests. Rich in antioxidants and natural enzymes.',
        variants: [
          { weight_g: 250, price: 250, sku: 'HW250', stock: 20 },
          { weight_g: 500, price: 450, sku: 'HW500', stock: 15 },
          { weight_g: 1000, price: 850, sku: 'HW1000', stock: 10 }
        ],
        images: ['https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop'],
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'organic-forest-honey',
        name: 'Organic Forest Honey',
        slug: 'organic-forest-honey',
        category: 'honey',
        description: 'Premium organic honey sourced from certified forest apiaries. Pure and unprocessed.',
        variants: [
          { weight_g: 250, price: 300, sku: 'FH250', stock: 25 },
          { weight_g: 500, price: 550, sku: 'FH500', stock: 18 },
          { weight_g: 1000, price: 1000, sku: 'FH1000', stock: 12 }
        ],
        images: ['https://images.unsplash.com/photo-1471943311424-646960669fbc?w=400&h=400&fit=crop'],
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'manuka-honey',
        name: 'Manuka Honey',
        slug: 'manuka-honey',
        category: 'honey',
        description: 'Premium Manuka honey with high MGO content. Known for its unique healing properties.',
        variants: [
          { weight_g: 250, price: 1200, sku: 'MH250', stock: 8 },
          { weight_g: 500, price: 2200, sku: 'MH500', stock: 5 }
        ],
        images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop'],
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'acacia-honey',
        name: 'Acacia Honey',
        slug: 'acacia-honey',
        category: 'honey',
        description: 'Light and delicate acacia honey. Perfect for sweetening tea and desserts.',
        variants: [
          { weight_g: 250, price: 280, sku: 'AH250', stock: 22 },
          { weight_g: 500, price: 500, sku: 'AH500', stock: 16 },
          { weight_g: 1000, price: 920, sku: 'AH1000', stock: 11 }
        ],
        images: ['https://images.unsplash.com/photo-1596800892045-0e5df7b8d1e8?w=400&h=400&fit=crop'],
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'premium-almonds',
        name: 'Premium Almonds',
        slug: 'premium-almonds',
        category: 'nuts',
        description: 'Premium quality almonds, perfect for snacking or cooking. Rich in healthy fats and protein.',
        variants: [
          { weight_g: 250, price: 180, sku: 'AP250', stock: 30 },
          { weight_g: 500, price: 320, sku: 'AP500', stock: 25 },
          { weight_g: 1000, price: 600, sku: 'AP1000', stock: 20 }
        ],
        images: ['https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&h=400&fit=crop'],
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'cashews-premium',
        name: 'Premium Cashews',
        slug: 'cashews-premium',
        category: 'nuts',
        description: 'Large, premium cashews with rich flavor. Perfect for gourmet snacking and cooking.',
        variants: [
          { weight_g: 250, price: 220, sku: 'CP250', stock: 28 },
          { weight_g: 500, price: 400, sku: 'CP500', stock: 22 },
          { weight_g: 1000, price: 750, sku: 'CP1000', stock: 15 }
        ],
        images: ['https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=400&fit=crop'],
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'walnuts-premium',
        name: 'Premium Walnuts',
        slug: 'walnuts-premium',
        category: 'nuts',
        description: 'Fresh, crunchy walnuts packed with omega-3 fatty acids. Great for brain health.',
        variants: [
          { weight_g: 250, price: 240, sku: 'WP250', stock: 26 },
          { weight_g: 500, price: 440, sku: 'WP500', stock: 20 },
          { weight_g: 1000, price: 820, sku: 'WP1000', stock: 14 }
        ],
        images: ['https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop'],
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'pistachios-premium',
        name: 'Premium Pistachios',
        slug: 'pistachios-premium',
        category: 'nuts',
        description: 'Delicious, salted pistachios. Perfect for healthy snacking and entertaining.',
        variants: [
          { weight_g: 250, price: 260, sku: 'PP250', stock: 24 },
          { weight_g: 500, price: 480, sku: 'PP500', stock: 18 },
          { weight_g: 1000, price: 900, sku: 'PP1000', stock: 12 }
        ],
        images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop'],
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]

    for (const product of products) {
      await setDoc(doc(db, 'products', product.id), product)
      console.log(`✅ Added product: ${product.name}`)
    }

    console.log('🎉 Seeding complete! Your Firebase database is now populated.')
  } catch (error) {
    console.error('❌ Error seeding data:', error)
  }
}

seedData()
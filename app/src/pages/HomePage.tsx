import { HeroSection } from '../components/HeroSection';

export function HomePage() {
  // Mock products for demo - in production these would come from API
  const mockProducts = [
    {
      id: '1',
      slug: 'raw-honey-500g',
      title: 'Raw Wildflower Honey',
      description: 'Pure, unprocessed honey from pristine forest regions',
      category: 'honey' as const,
      priceCents: 45000,
      unit: 'g' as const,
      unitSize: 500,
      stock: 50,
      imageUrl: '/api/placeholder/300/300',
    },
    {
      id: '2',
      slug: 'mixed-nuts-500g',
      title: 'Premium Mixed Nuts',
      description: 'Carefully selected blend of almonds, cashews, and walnuts',
      category: 'nuts' as const,
      priceCents: 75000,
      unit: 'g' as const,
      unitSize: 500,
      stock: 40,
      imageUrl: '/api/placeholder/300/300',
    },
  ];

  return (
    <div>
      <HeroSection />
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-600">
                    ₹{(product.priceCents / 100).toFixed(2)}
                  </span>
                  <button className="btn btn-primary">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-honey-50 rounded-lg">
              <div className="w-20 h-20 bg-honey-500 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Honey</h3>
              <p className="text-gray-600">Pure, organic honey varieties</p>
            </div>
            <div className="text-center p-8 bg-amber-50 rounded-lg">
              <div className="w-20 h-20 bg-amber-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Nuts</h3>
              <p className="text-gray-600">Premium nuts and dried fruits</p>
            </div>
            <div className="text-center p-8 bg-orange-50 rounded-lg">
              <div className="w-20 h-20 bg-orange-500 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Combos</h3>
              <p className="text-gray-600">Curated gift sets and combos</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
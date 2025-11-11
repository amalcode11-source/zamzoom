import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
      <div className="container">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Premium Honey & Nuts
            <span className="block text-primary-200">Delivered Fresh</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Discover our curated collection of organic honey, premium nuts, and delicious combo packs. 
            Quality guaranteed with free shipping on all orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/category/honey"
              className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              Shop Honey
            </Link>
            <Link
              to="/category/nuts"
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 text-lg"
            >
              Shop Nuts
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <div className="h-full w-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3Ccircle cx='60' cy='30' r='2'/%3E%3Ccircle cx='30' cy='60' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-bold">Zamzoom</span>
            </div>
            <p className="text-gray-300 mb-4">
              Premium honey, nuts, and combo packs delivered fresh to your door. 
              Quality guaranteed, organic, and sustainable.
            </p>
            <div className="text-sm text-gray-400">
              <p>Free shipping on all orders</p>
              <p>100% satisfaction guarantee</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/category/honey" className="hover:text-white">Honey</a></li>
              <li><a href="/category/nuts" className="hover:text-white">Nuts</a></li>
              <li><a href="/category/combo" className="hover:text-white">Combos</a></li>
              <li><a href="/orders" className="hover:text-white">My Orders</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Zamzoom. All rights reserved. | Made with ❤️ for quality food lovers</p>
        </div>
      </div>
    </footer>
  );
}
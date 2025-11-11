import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="glass-dark text-slate-100 py-12 px-4 mt-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 gradient-text">ZamZoom</h3>
            <p className="text-slate-300 mb-4 max-w-md">
              Your trusted source for pure honey and premium nuts. We deliver nature's finest products directly to your doorstep.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Stay Updated</h4>
              <p className="text-sm text-slate-400 mb-3">Subscribe to get special offers and product updates.</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-slate-100 text-sm focus:outline-none focus:border-vibrant-blue"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-vibrant-blue to-vibrant-purple hover:from-vibrant-purple hover:to-vibrant-pink px-4 py-2 rounded text-sm font-medium transition-all"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="flex space-x-4">
              <a href="#" aria-label="Follow us on Facebook" className="text-slate-400 hover:text-vibrant-blue transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" aria-label="Follow us on Instagram" className="text-slate-400 hover:text-vibrant-blue transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.609.034 6.298.094 4.985.154 4.011.389 3.194.8c-.836.426-1.546 1.002-2.122 1.578C.496 3.002.07 3.732 0 4.568c-.07 1.311-.094 2.098-.094 5.719s.024 4.408.094 5.719c.07.836.496 1.566.8 2.192.576.576 1.146 1.006 1.972 1.432.807.411 1.781.646 3.094.706 1.311.06 2.098.094 5.719.094s4.408-.034 5.719-.094c1.313-.06 2.287-.295 3.094-.706.826-.426 1.396-.856 1.972-1.432.304-.626.73-1.356.8-2.192.07-1.311.094-2.098.094-5.719s-.024-4.408-.094-5.719c-.07-.836-.496-1.566-.8-2.192C21.506 1.002 20.936.572 20.11.146 19.303-.265 18.329-.5 17.016-.56 15.705-.62 14.918-.654 11.297-.654zm4.548 7.374c-.346 0-.628.282-.628.628v3.776c0 .346.282.628.628.628s.628-.282.628-.628V7.374c0-.346-.282-.628-.628-.628zM12 4.5c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zm0 7.5c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Follow us on Twitter" className="text-slate-400 hover:text-vibrant-blue transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-300 hover:text-vibrant-blue transition-colors">Home</Link></li>
              <li><Link href="/search" className="text-slate-300 hover:text-vibrant-blue transition-colors">Shop All</Link></li>
              <li><Link href="/categories/honey" className="text-slate-300 hover:text-vibrant-blue transition-colors">Honey</Link></li>
              <li><Link href="/categories/nuts" className="text-slate-300 hover:text-vibrant-blue transition-colors">Nuts</Link></li>
              <li><Link href="/cart" className="text-slate-300 hover:text-vibrant-blue transition-colors">Cart</Link></li>
              <li><Link href="/about" className="text-slate-300 hover:text-vibrant-blue transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-vibrant-blue transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-slate-300 hover:text-vibrant-blue transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-slate-300 hover:text-vibrant-blue transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-slate-300 hover:text-vibrant-blue transition-colors">Returns</a></li>
              <li><a href="#" className="text-slate-300 hover:text-vibrant-blue transition-colors">FAQ</a></li>
              <li><a href="#" className="text-slate-300 hover:text-vibrant-blue transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2024 ZamZoom. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-slate-400 text-sm">
              <a href="#" className="hover:text-vibrant-blue transition-colors">Accessibility Statement</a> |
              <a href="#" className="hover:text-vibrant-blue transition-colors ml-2">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
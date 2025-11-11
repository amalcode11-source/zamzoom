import Link from 'next/link'
import Breadcrumb from '../../components/Breadcrumb'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">About ZamZoom</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your trusted source for pure, natural honey and premium nuts since 2020.
          </p>
        </div>

        <div className="space-y-12">
          {/* Our Story */}
          <section className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                ZamZoom was born from a passion for natural, healthy foods and a commitment to bringing the finest
                honey and nuts directly from sustainable sources to your table. Founded in 2020, we started as a small
                family business with a simple mission: to provide pure, unprocessed honey and premium nuts that
                nourish both body and soul.
              </p>
              <p className="mb-4">
                What began as a local venture has grown into a trusted brand, serving thousands of customers who
                share our values of quality, sustainability, and health. Every product in our collection is carefully
                selected, ensuring it meets our rigorous standards for purity and taste.
              </p>
              <p>
                Today, ZamZoom continues to innovate while staying true to our roots, offering an ever-expanding
                selection of natural products that make healthy eating delicious and accessible.
              </p>
            </div>
          </section>

          {/* Our Values */}
          <section className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Quality First</h3>
                <p className="text-gray-600">We never compromise on quality. Every product undergoes rigorous testing to ensure purity and excellence.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Sustainability</h3>
                <p className="text-gray-600">We partner with sustainable farms and beekeepers who prioritize environmental responsibility.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Customer Care</h3>
                <p className="text-gray-600">Your satisfaction is our priority. We're here to help with any questions or concerns.</p>
              </div>
            </div>
          </section>

          {/* Our Products */}
          <section className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-black mb-3">Premium Honey</h3>
                <p className="text-gray-600 mb-4">
                  Our honey collection features wild, organic, and specialty varieties sourced from pristine
                  environments. Each jar contains pure, raw honey with natural enzymes and antioxidants.
                </p>
                <Link
                  href="/categories/honey"
                  className="text-orange hover:text-orange/80 font-medium transition-colors"
                >
                  Explore Honey Collection →
                </Link>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-black mb-3">Premium Nuts</h3>
                <p className="text-gray-600 mb-4">
                  Hand-selected nuts including almonds, cashews, walnuts, and pistachios. Perfect for snacking,
                  cooking, or gifting. All nuts are fresh, natural, and sustainably sourced.
                </p>
                <Link
                  href="/categories/nuts"
                  className="text-orange hover:text-orange/80 font-medium transition-colors"
                >
                  Explore Nut Collection →
                </Link>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="bg-orange rounded-lg p-6 md:p-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="text-lg mb-6 opacity-90">
              We'd love to hear from you. Reach out with any questions about our products or services.
            </p>
            <Link
              href="/contact"
              className="bg-white text-orange px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Contact Us
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
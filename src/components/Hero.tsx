import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-ocean-breeze py-16 md:py-24 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="honeycomb" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
              <polygon points="10,0 20,5.77 20,11.55 10,17.32 0,11.55 0,5.77" fill="none" stroke="#000" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#honeycomb)"/>
        </svg>
      </div>

      <div className="container mx-auto text-center max-w-5xl relative z-10">
        <div className="mb-6">
          <span className="inline-block glass text-slate-900 px-4 py-2 rounded-full text-sm font-medium mb-4 animate-fade-in-up">
            🏆 Award-Winning Natural Products
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold gradient-text mb-6 leading-tight animate-fade-in-up">
          Pure Honey &<br className="hidden sm:block" /> Premium Nuts
        </h1>

        <p className="text-xl md:text-2xl text-slate-700 mb-4 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200 font-medium">
          Discover nature's finest - artisanal honey and hand-selected nuts for a healthier lifestyle.
        </p>

        <p className="text-base md:text-lg text-slate-600 mb-10 max-w-2xl mx-auto animate-fade-in-up animate-delay-400">
          100% natural, organic, and sustainably sourced. Trusted by thousands of happy customers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-bounce-in animate-delay-400">
          <Link
            href="/search"
            className="bg-gradient-to-r from-vibrant-blue to-vibrant-purple hover:from-vibrant-purple hover:to-vibrant-pink text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-semibold text-lg md:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-modern hover:shadow-modern-lg"
          >
            Shop Now →
          </Link>
          <Link
            href="/categories/honey"
            className="glass text-slate-900 hover:bg-white/30 px-6 md:px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/40 hover:border-white/60"
          >
            Explore Honey
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-slate-600 animate-fade-in-up animate-delay-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free Shipping Over ₹500
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure SSL Checkout
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            4.9/5 Customer Rating
          </div>
        </div>
      </div>
    </section>
  )
}
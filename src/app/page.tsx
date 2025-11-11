import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import TrustSignals from '../components/TrustSignals'

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ZamZoom",
    "description": "Your trusted source for pure honey and premium nuts. Natural, healthy, and delicious products delivered to your door.",
    "url": "https://zamzoom.com",
    "logo": "https://zamzoom.com/logo.png",
    "sameAs": [
      "https://facebook.com/zamzoom",
      "https://instagram.com/zamzoom",
      "https://twitter.com/zamzoom"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Honey Lane",
      "addressLocality": "Sweet Valley",
      "addressRegion": "SV",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Honey & Nuts Collection",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Pure Wild Honey",
            "description": "Natural wild honey harvested from pristine forests."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Premium Almonds",
            "description": "Premium quality almonds, perfect for snacking or cooking."
          }
        }
      ]
    }
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Hero />
      <ProductGrid />
      <TrustSignals />
    </main>
  )
}
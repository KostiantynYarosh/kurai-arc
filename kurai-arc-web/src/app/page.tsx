import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import MoodGrid from "@/components/MoodGrid";
import Footer from "@/components/Footer";
import { api, formatPrice } from "@/services/api";

import Link from "next/link";

export default async function Home() {
  const allProducts = await api.getProducts();
  // Sort by ID descending or created_at if available to show "latest"
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <main className="min-h-screen bg-deep-black font-sans selection:bg-accent-purple selection:text-warm-white">
      <Navigation />
      <Hero />

      {/* Featured Drops */}
      <section className="py-24 px-4 bg-soft-black/30">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-end mb-7">
            <h2 className="text-xs tracking-[0.2em] text-secondary-gray uppercase">
              Latest Drops
            </h2>
            <Link href="/drops" className="text-xs tracking-[0.1em] text-accent-purple hover:text-warm-white transition-colors">
              VIEW ALL
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                slug={product.slug}
                name={product.name}
                type={product.type}
                price={formatPrice(product.base_price)}
                image={product.images && product.images.length > 0 ? product.images[0].url : undefined}
                status={product.status as 'available' | 'archived'}
              />
            ))}
          </div>
        </div>
      </section>

      <MoodGrid />
      <Footer />
    </main>
  );
}

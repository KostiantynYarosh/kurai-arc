import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductView from "@/components/ProductView";
import { api } from "@/services/api";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch real data from API
    const product = await api.getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-deep-black font-sans selection:bg-accent-purple selection:text-warm-white">
            <Navigation />
            <ProductView product={product} />
            <Footer />
        </main>
    );
}

'use client';

import { useState } from 'react';
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductCarousel from "@/components/ProductCarousel";
import { APIProduct, formatPrice } from "@/services/api";

interface ProductViewProps {
    product: APIProduct;
}

export default function ProductView({ product }: ProductViewProps) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const { addToCart } = useCart();
    const isArchived = product.status === 'archived';

    const handleAddToCart = () => {
        if (!selectedSize) return;
        // Adapter for Cart Context which might expect the old Product type
        // For now, we assume implicit compatibility or minimal differences.
        // If addToCart expects strict mock type, we might need a cast or adapter.
        // Assuming addToCart takes { ...product, image } style
        const cartItem: any = {
            ...product,
            image: product.images?.[0]?.url || '',
            price: formatPrice(product.base_price) // Cart expects string price? 
        };
        addToCart(cartItem, selectedSize);
    };

    return (
        <div className="pt-32 px-4 pb-24 max-w-[1200px] mx-auto">
            {/* Back Link */}
            <Link
                href="/drops"
                className="inline-flex items-center gap-2 text-xs text-secondary-gray hover:text-warm-white transition-colors mb-6 group"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-x-1 transition-transform">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                BACK TO DROPS
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                {/* Image Section */}
                <div className="aspect-[3/4]">
                    <ProductCarousel
                        images={product.images?.map(img => img.url) || []}
                        productName={product.name}
                        isArchived={isArchived}
                    />
                </div>

                {/* Info Section */}
                <div className="flex flex-col justify-center">
                    <div className="mb-8">
                        <span className="text-xs text-secondary-gray tracking-[0.2em] uppercase mb-4 block">
                            {product.type} • {product.collection?.name || 'Unclassified'}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-light text-warm-white mb-4">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className={`text-2xl font-light ${isArchived ? 'text-secondary-gray decoration-line-through' : 'text-accent-purple'}`}>
                                {formatPrice(product.base_price)}
                            </span>
                            {isArchived && (
                                <span className="px-2 py-1 bg-secondary-border/50 text-[10px] text-secondary-gray tracking-widest uppercase rounded">
                                    Archived
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 mb-12">
                        <div>
                            <h3 className="text-xs text-secondary-gray tracking-widest uppercase mb-3">Description</h3>
                            <p className="text-secondary-gray leading-relaxed font-light">
                                {product.description || "No description available for this item."}
                            </p>
                        </div>

                        {!isArchived && (
                            <div>
                                <h3 className="text-xs text-secondary-gray tracking-widest uppercase mb-3">
                                    Sizes
                                </h3>
                                <div className="flex gap-3">
                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 rounded border flex items-center justify-center text-xs transition-all cursor-pointer ${selectedSize === size
                                                ? 'border-accent-purple bg-accent-purple/10 text-warm-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                                                : 'border-secondary-border text-secondary-gray hover:border-accent-purple hover:text-warm-white'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={isArchived}
                        className={`w-full py-5 rounded-lg text-sm tracking-[0.2em] font-light transition-all duration-300 ${isArchived
                            ? 'bg-secondary-border text-secondary-gray cursor-not-allowed opacity-50'
                            : 'bg-warm-white text-deep-black hover:bg-accent-purple hover:text-warm-white cursor-pointer active:scale-[0.98]'
                            }`}
                    >
                        {isArchived ? 'UNAVAILABLE' : selectedSize ? 'ADD TO CART' : 'SELECT SIZE'}
                    </button>

                    <div className="mt-8 pt-8 border-t border-secondary-border space-y-4">
                        <div className="flex justify-between items-center text-xs text-secondary-gray/60">
                            <span>Shipping calculated at checkout.</span>
                            <span className="text-warm-white/40">Ships in 2-4 business days.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

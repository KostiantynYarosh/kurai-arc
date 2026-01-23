'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CartDrawer() {
    const { cartItems, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsCartOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [setIsCartOpen]);

    // Format currency
    const formatPrice = (amount: number) => {
        return `₴ ${amount.toLocaleString()}`;
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-deep-black/40 transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className={`relative w-full max-w-md h-full bg-soft-black border-l border-secondary-border shadow-2xl flex flex-col transition-transform duration-500 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header */}
                <div className="p-6 border-b border-secondary-border flex items-center justify-between">
                    <h2 className="text-xl font-light tracking-widest uppercase">Cart</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-secondary-gray hover:text-warm-white transition-colors cursor-pointer"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <div key={`${item.slug}-${item.selectedSize}`} className="flex gap-4 group">
                                {/* Thumbnail */}
                                <Link
                                    href={`/product/${item.slug}`}
                                    onClick={() => setIsCartOpen(false)}
                                    className="w-24 h-32 bg-deep-black rounded border border-secondary-border overflow-hidden flex-shrink-0 relative"
                                >
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-secondary-gray text-[10px]">IMG</span>
                                        </div>
                                    )}
                                </Link>

                                {/* Info */}
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <Link
                                                href={`/product/${item.slug}`}
                                                onClick={() => setIsCartOpen(false)}
                                                className="text-lg font-light text-warm-white hover:text-accent-purple transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                            <button
                                                onClick={() => removeFromCart(item.slug, item.selectedSize)}
                                                className="text-secondary-gray hover:text-accent-red transition-colors cursor-pointer"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className="text-xs text-secondary-gray tracking-widest uppercase mb-2">
                                            {item.type} • {item.selectedSize}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-sm text-secondary-gray">
                                            Qty: {item.quantity}
                                        </div>
                                        <div className="text-base text-accent-purple font-light">
                                            {item.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary-border mb-4">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                            <p className="text-secondary-gray text-sm tracking-widest uppercase">Your cart is empty</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-6 text-xs text-accent-purple hover:text-warm-white transition-colors tracking-widest cursor-pointer"
                            >
                                CONTINUE BROWSING
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-secondary-border bg-dark-gray/30">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm text-secondary-gray tracking-widest uppercase">Subtotal</span>
                            <span className="text-2xl font-light text-warm-white">{formatPrice(cartTotal)}</span>
                        </div>
                        <p className="text-[10px] text-secondary-gray mb-6 text-center tracking-wider">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <Link
                            href="/checkout"
                            onClick={() => setIsCartOpen(false)}
                            className="block"
                        >
                            <button className="w-full py-5 bg-warm-white text-deep-black rounded-lg text-sm tracking-[0.2em] font-light hover:bg-accent-purple hover:text-warm-white transition-all duration-300 cursor-pointer active:scale-[0.98]">
                                CHECKOUT
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

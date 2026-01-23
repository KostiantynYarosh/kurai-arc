'use client';

import { useCart } from "@/context/CartContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const formatPrice = (amount: number) => {
        return `₴ ${amount.toLocaleString()}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        clearCart();
    };

    if (isSubmitted) {
        return (
            <main className="min-h-screen bg-deep-black font-sans selection:bg-accent-purple selection:text-warm-white">
                <Navigation />
                <div className="pt-40 px-4 pb-24 max-w-[600px] mx-auto text-center">
                    <div className="w-20 h-20 bg-accent-purple/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-accent-purple/30">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-purple">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-light text-warm-white mb-4 tracking-widest uppercase">Order Received</h1>
                    <p className="text-secondary-gray mb-12 font-light leading-relaxed">
                        Your order has been placed into the void. We'll reach out once the transmission is complete. Check your email for confirmation.
                    </p>
                    <Link href="/" className="inline-block py-4 px-10 bg-warm-white text-deep-black rounded-lg text-sm tracking-[0.2em] font-light hover:bg-accent-purple hover:text-warm-white transition-all duration-300">
                        RETURN TO HOME
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen bg-deep-black font-sans selection:bg-accent-purple selection:text-warm-white">
                <Navigation />
                <div className="pt-40 px-4 pb-24 max-w-[600px] mx-auto text-center">
                    <h1 className="text-2xl font-light text-warm-white mb-6 tracking-widest uppercase">Your cart is empty</h1>
                    <Link href="/drops" className="text-xs text-accent-purple hover:text-warm-white transition-colors tracking-widest">
                        BROWSE COLLECTIONS
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-deep-black font-sans selection:bg-accent-purple selection:text-warm-white">
            <Navigation />

            <div className="pt-32 px-4 pb-24 max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Information Form */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="space-y-12">
                            {/* Contact */}
                            <section>
                                <h2 className="text-xs text-secondary-gray tracking-[0.2em] uppercase mb-8 border-b border-secondary-border pb-4 font-medium">Contact Information</h2>
                                <div className="space-y-4">
                                    <input
                                        required
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-soft-black border border-secondary-border p-4 rounded-lg focus:border-accent-purple outline-none transition-colors text-sm"
                                    />
                                </div>
                            </section>

                            {/* Shipping */}
                            <section>
                                <h2 className="text-xs text-secondary-gray tracking-[0.2em] uppercase mb-8 border-b border-secondary-border pb-4 font-medium">Shipping Address</h2>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <input
                                        required
                                        type="text"
                                        placeholder="First Name"
                                        className="bg-soft-black border border-secondary-border p-4 rounded-lg focus:border-accent-purple outline-none transition-colors text-sm"
                                    />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Last Name"
                                        className="bg-soft-black border border-secondary-border p-4 rounded-lg focus:border-accent-purple outline-none transition-colors text-sm"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <input
                                        required
                                        type="text"
                                        placeholder="Address"
                                        className="w-full bg-soft-black border border-secondary-border p-4 rounded-lg focus:border-accent-purple outline-none transition-colors text-sm"
                                    />
                                    <div className="grid grid-cols-3 gap-4">
                                        <input
                                            required
                                            type="text"
                                            placeholder="City"
                                            className="bg-soft-black border border-secondary-border p-4 rounded-lg focus:border-accent-purple outline-none transition-colors text-sm col-span-2"
                                        />
                                        <input
                                            required
                                            type="text"
                                            placeholder="Postal Code"
                                            className="bg-soft-black border border-secondary-border p-4 rounded-lg focus:border-accent-purple outline-none transition-colors text-sm"
                                        />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Phone Number"
                                        className="w-full bg-soft-black border border-secondary-border p-4 rounded-lg focus:border-accent-purple outline-none transition-colors text-sm"
                                    />
                                </div>
                            </section>

                            {/* Payment info placeholder */}
                            <section>
                                <h2 className="text-xs text-secondary-gray tracking-[0.2em] uppercase mb-8 border-b border-secondary-border pb-4 font-medium">Payment</h2>
                                <div className="p-4 bg-soft-black border border-secondary-border rounded-lg text-sm text-secondary-gray text-center font-light py-8">
                                    Payment processing is simulated for this demo.
                                </div>
                            </section>

                            <button type="submit" className="w-full py-5 bg-warm-white text-deep-black rounded-lg text-sm tracking-[0.2em] font-light hover:bg-accent-purple hover:text-warm-white transition-all duration-300 cursor-pointer">
                                PLACE ORDER • {formatPrice(cartTotal)}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 bg-soft-black/30 border border-secondary-border rounded-xl p-8">
                            <h2 className="text-xs text-secondary-gray tracking-[0.2em] uppercase mb-8 font-medium">Order Summary</h2>
                            <div className="space-y-8 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={`${item.slug}-${item.selectedSize}`} className="flex gap-4">
                                        <div className="w-16 h-20 bg-deep-black rounded border border-secondary-border relative overflow-hidden flex-shrink-0">
                                            {item.image && (
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <h3 className="text-sm font-light text-warm-white">{item.name}</h3>
                                                <p className="text-[10px] text-secondary-gray uppercase tracking-widest">{item.type} • {item.selectedSize}</p>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <span className="text-xs text-secondary-gray">Qty: {item.quantity}</span>
                                                <span className="text-sm text-accent-purple font-light">{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-8 border-t border-secondary-border text-sm">
                                <div className="flex justify-between font-light">
                                    <span className="text-secondary-gray">Subtotal</span>
                                    <span className="text-warm-white">{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between font-light">
                                    <span className="text-secondary-gray">Shipping</span>
                                    <span className="text-warm-white tracking-widest uppercase text-[10px]">Calculated Next</span>
                                </div>
                                <div className="flex justify-between pt-4 text-lg font-light border-t border-secondary-border/50">
                                    <span className="text-warm-white">Total</span>
                                    <span className="text-accent-purple">{formatPrice(cartTotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

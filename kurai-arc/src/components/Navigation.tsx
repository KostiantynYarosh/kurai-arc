'use client';

import Link from "next/link";
import { useState } from "react";
import SearchModal from "./SearchModal";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";

export default function Navigation() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { setIsCartOpen, cartCount } = useCart();

    return (
        <>
            <nav className="flex items-center justify-between p-4 md:p-8 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl fixed top-4 left-4 right-4 z-50">
                <Link href="/" className="text-xl font-light tracking-tight hover:opacity-80 transition-opacity">
                    kurai<span className="text-accent-purple">.arc</span>
                </Link>

                <div className="hidden md:flex gap-10">
                    <Link
                        href="/"
                        className="text-xs tracking-[0.15em] text-secondary-gray hover:text-warm-white transition-colors duration-300"
                    >
                        HOME
                    </Link>
                    <Link
                        href="/drops"
                        className="text-xs tracking-[0.15em] text-secondary-gray hover:text-warm-white transition-colors duration-300"
                    >
                        DROPS
                    </Link>
                    <Link
                        href="/archive"
                        className="text-xs tracking-[0.15em] text-secondary-gray hover:text-warm-white transition-colors duration-300"
                    >
                        ARCHIVE
                    </Link>
                    <Link
                        href="/about"
                        className="text-xs tracking-[0.15em] text-secondary-gray hover:text-warm-white transition-colors duration-300"
                    >
                        ABOUT
                    </Link>
                </div>

                <div className="flex gap-6 items-center">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        aria-label="Search"
                        className="text-secondary-gray hover:text-warm-white transition-colors cursor-pointer"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    </button>
                    <button
                        aria-label="Menu"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-secondary-gray hover:text-warm-white transition-colors md:hidden cursor-pointer z-50"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            {isMenuOpen ? (
                                <>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </>
                            ) : (
                                <>
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </>
                            )}
                        </svg>
                    </button>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        aria-label="Cart"
                        className="text-secondary-gray hover:text-warm-white transition-colors cursor-pointer relative"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent-purple text-warm-white text-[8px] flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-deep-black z-40 md:hidden transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {['HOME', 'DROPS', 'ARCHIVE', 'ABOUT'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl font-light tracking-[0.2em] text-warm-white hover:text-accent-purple transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <CartDrawer />
        </>
    );
}

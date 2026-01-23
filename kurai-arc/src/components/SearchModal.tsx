'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts(products);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.type.toLowerCase().includes(query) ||
                product.collection.toLowerCase().includes(query)
            );
            setFilteredProducts(filtered);
        }
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isOpen && !target.closest('.search-modal-content')) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed top-32 right-4 z-40">
            <div className={`search-modal-content w-96 bg-soft-black border border-secondary-border rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                {/* Search Input */}
                <div className="p-4 border-b border-secondary-border">
                    <div className="flex items-center gap-3">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-secondary-gray">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 bg-transparent text-warm-white placeholder-secondary-gray outline-none text-sm"
                            autoFocus
                        />
                        <button
                            onClick={onClose}
                            className="text-secondary-gray hover:text-warm-white transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="max-h-[70vh] overflow-y-auto p-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {filteredProducts.length > 0 ? (
                        <div className="space-y-2">
                            {filteredProducts.map((product, index) => (
                                <Link
                                    key={index}
                                    href={`/product/${product.slug}`}
                                    onClick={onClose}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-dark-gray transition-colors group"
                                >
                                    {/* Thumbnail */}
                                    <div className="w-12 h-12 bg-deep-black rounded border border-secondary-border overflow-hidden flex-shrink-0">
                                        {product.image ? (
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-secondary-gray text-[10px]">IMG</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-light text-warm-white group-hover:text-accent-purple transition-colors truncate">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-secondary-gray truncate">
                                            {product.type}
                                        </p>
                                    </div>

                                    {/* Price */}
                                    <div className="text-sm text-accent-purple font-light">
                                        {product.price}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-secondary-gray text-sm">No products found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
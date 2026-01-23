'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem extends Product {
    selectedSize: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, size: string) => void;
    removeFromCart: (slug: string, size: string) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('kurai_cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart from localStorage", e);
            }
        }
    }, []);

    // Save cart to local storage when it changes
    useEffect(() => {
        localStorage.setItem('kurai_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product, size: string) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.slug === product.slug && item.selectedSize === size);
            if (existingItem) {
                return prev.map(item =>
                    (item.slug === product.slug && item.selectedSize === size)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, selectedSize: size, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (slug: string, size: string) => {
        setCartItems(prev => prev.filter(item => !(item.slug === slug && item.selectedSize === size)));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Helper to parse price string like "₴ 1,890" to number
    const parsePrice = (priceStr: string) => {
        return parseInt(priceStr.replace(/[^\d]/g, ''), 10);
    };

    const cartTotal = cartItems.reduce((total, item) => {
        return total + (parsePrice(item.price) * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            cartCount,
            cartTotal,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

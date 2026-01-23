'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ProductCarouselProps {
    images: string[];
    productName: string;
    isArchived?: boolean;
}

export default function ProductCarousel({ images, productName, isArchived }: ProductCarouselProps) {
    // Cloned slides for infinite loop: [Last, ...Original, First]
    const slides = images.length > 1 ? [images[images.length - 1], ...images, images[0]] : images;

    const [currentIndex, setCurrentIndex] = useState(images.length > 1 ? 1 : 0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    // Effect to handle navigation jumps after transition
    useEffect(() => {
        if (!isTransitioning && !isInitialLoad) {
            if (currentIndex === 0) {
                // Jumped to cloned "Last" (index 0), reset to real "Last"
                setCurrentIndex(slides.length - 2);
            } else if (currentIndex === slides.length - 1) {
                // Jumped to cloned "First" (index N+1), reset to real "First"
                setCurrentIndex(1);
            }
        }
    }, [currentIndex, isTransitioning, slides.length, isInitialLoad]);

    useEffect(() => {
        setIsInitialLoad(false);
    }, []);

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
    };

    const nextSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
    }, [isTransitioning]);

    const prevSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
    }, [isTransitioning]);

    const goToSlide = (index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(index + 1);
    };

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-soft-black rounded-lg border border-secondary-border">
                <span className="text-secondary-gray text-xs tracking-widest uppercase">Image Pending</span>
            </div>
        );
    }

    const hasMultipleImages = images.length > 1;

    // Calculate display index (1-based)
    let displayIndex = currentIndex;
    if (images.length > 1) {
        if (currentIndex === 0) displayIndex = images.length;
        else if (currentIndex === slides.length - 1) displayIndex = 1;
        else displayIndex = currentIndex;
    } else {
        displayIndex = 1;
    }

    return (
        <div className="relative w-full h-full group select-none">
            {/* Main Image Container */}
            <div className={`relative w-full h-full bg-soft-black rounded-lg overflow-hidden border border-secondary-border transition-all duration-500 ${isArchived ? 'opacity-50 saturate-50' : ''}`}>
                <div
                    ref={containerRef}
                    className={`flex w-full h-full ${isTransitioning ? 'transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]' : ''}`}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {slides.map((image, index) => (
                        <div
                            key={`${image}-${index}`}
                            className="relative flex-shrink-0 w-full h-full"
                        >
                            <Image
                                src={image}
                                alt={`${productName} - View ${index + 1}`}
                                fill
                                className="object-cover"
                                priority={index === 1 || (!hasMultipleImages && index === 0)}
                            />
                        </div>
                    ))}
                </div>

                {/* Overlays / Gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-black/20 pointer-events-none" />
            </div>

            {/* Navigation Controls */}
            {hasMultipleImages && (
                <>
                    {/* Arrow Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-deep-black/40 backdrop-blur-md border border-warm-white/10 flex items-center justify-center text-warm-white transition-all duration-300 hover:bg-accent-purple hover:scale-110 active:scale-95 z-10 opacity-70"
                        aria-label="Previous image"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-deep-black/40 backdrop-blur-md border border-warm-white/10 flex items-center justify-center text-warm-white transition-all duration-300 hover:bg-accent-purple hover:scale-110 active:scale-95 z-10 opacity-70"
                        aria-label="Next image"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>

                    {/* Progress Indicators (Dots) */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-1 transition-all duration-300 rounded-full ${(images.length > 1 ? (displayIndex === index + 1) : true)
                                        ? 'w-8 bg-accent-purple shadow-[0_0_10px_rgba(139,92,246,0.5)]'
                                        : 'w-2 bg-warm-white/20 hover:bg-warm-white/40'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Counter */}
                    <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-deep-black/40 backdrop-blur-md border border-warm-white/10 text-[10px] text-warm-white/60 tracking-widest z-10">
                        {String(displayIndex).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                    </div>
                </>
            )}
        </div>
    );
}

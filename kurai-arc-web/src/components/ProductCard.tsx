import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    slug: string;
    name: string;
    type: string;
    price: string;
    image?: string;
    status?: 'available' | 'archived';
    availableSizes?: string[];
}

export default function ProductCard({ slug, name, type, price, image, status, availableSizes }: ProductCardProps) {
    const isArchived = status === 'archived';

    // Format sizes string (e.g. "XS / M / XL") or default fallback
    const sizesDisplay = availableSizes && availableSizes.length > 0
        ? availableSizes.join(' / ')
        : 'XS - XXL';

    return (
        <div className={`group relative bg-dark-gray rounded-lg overflow-hidden border border-secondary-border transition-all duration-300 ${isArchived ? 'opacity-50 hover:opacity-100' : 'hover:border-accent-purple/50 hover:shadow-[0_0_20px_rgba(80,68,255,0.5)]'}`}>
            <div className="aspect-[3/4] bg-deep-black relative flex items-center justify-center">
                {/* Product Image */}
                {image ? (
                    <Link href={`/product/${slug}`} draggable={false} className="w-full h-full relative block">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            draggable={false}
                            className={`object-cover select-none transition-all duration-500 ${isArchived ? 'saturate-50 group-hover:saturate-100' : ''}`}
                        />
                    </Link>
                ) : (
                    <Link href={`/product/${slug}`} draggable={false} className="w-full h-full relative block">
                        <div className="w-full h-full bg-soft-black rounded border border-secondary-border flex items-center justify-center transition-transform duration-500">
                            <span className="text-secondary-gray text-xs tracking-widest">IMAGE</span>
                        </div>
                    </Link>
                )}
            </div>

            <div className="p-6 bg-dark-gray">
                <div className={isArchived ? 'saturate-50' : ''}>
                    <div className="text-[10px] text-secondary-gray tracking-[0.2em] mb-2 uppercase select-text">
                        {type}
                    </div>
                    <Link href={`/product/${slug}`} className="block">
                        <div className={`text-lg font-light mb-2 text-warm-white transition-colors ${!isArchived ? 'group-hover:text-accent-purple' : ''}`}>
                            {name}
                        </div>
                    </Link>
                    <div className="flex justify-between items-center mt-4">
                        <span className={`font-light select-text ${isArchived ? 'text-secondary-gray decoration-line-through' : 'text-warm-white group-hover:text-accent-purple transition-colors'}`}>
                            {price}
                        </span>
                        {isArchived ? (
                            <span className="text-xs text-secondary-gray select-text">SOLD OUT</span>
                        ) : (
                            <span className="text-xs text-secondary-gray select-text">{sizesDisplay}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
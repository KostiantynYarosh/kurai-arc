import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    slug: string;
    name: string;
    type: string;
    price: string;
    image?: string;
    status?: 'available' | 'archived';
}

export default function ProductCard({ slug, name, type, price, image, status }: ProductCardProps) {
    const isArchived = status === 'archived';

    return (
        <Link href={`/product/${slug}`} className="block">
            <div className={`group relative bg-dark-gray rounded-lg overflow-hidden border border-secondary-border transition-all duration-300 ${isArchived ? 'opacity-50 hover:opacity-100' : 'hover:border-accent-purple/50'}`}>
                <div className="aspect-[3/4] bg-deep-black relative flex items-center justify-center">
                    {/* Product Image */}
                    {image ? (
                        <div className="w-full h-full relative">
                            <Image
                                src={image}
                                alt={name}
                                fill
                                className={`object-cover transition-all duration-500 ${isArchived ? 'saturate-50 group-hover:saturate-100' : ''}`}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-soft-black rounded border border-secondary-border flex items-center justify-center transition-transform duration-500">
                            <span className="text-secondary-gray text-xs tracking-widest">IMAGE</span>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-dark-gray">
                    <div className={isArchived ? 'saturate-50' : ''}>
                        <div className="text-[10px] text-secondary-gray tracking-[0.2em] mb-2 uppercase">
                            {type}
                        </div>
                        <div className={`text-lg font-light mb-2 text-warm-white transition-colors ${!isArchived ? 'group-hover:text-accent-purple' : ''}`}>
                            {name}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <span className={`font-light ${isArchived ? 'text-secondary-gray decoration-line-through' : 'text-accent-purple'}`}>
                                {price}
                            </span>
                            {isArchived ? (
                                <span className="text-xs text-secondary-gray">SOLD OUT</span>
                            ) : (
                                <span className="text-xs text-secondary-gray">XS - XXL</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

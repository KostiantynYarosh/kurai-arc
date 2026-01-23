export interface APIProduct {
    id: number;
    name: string;
    slug: string;
    description: string;
    base_price: number;
    status: string;
    stock_xs: number;
    stock_s: number;
    stock_m: number;
    stock_l: number;
    stock_xl: number;
    stock_xxl: number;
    stock_os: number;
    images?: { url: string; display_order: number }[];
    collection?: { name: string; slug: string };
    type: string;
}

export interface APICollection {
    id: number;
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
}

// Determines the correct API URL depending on the environment (Server vs Client)
const API_URL = typeof window === 'undefined'
    ? (process.env.INTERNAL_API_URL || 'http://api:8080/api') // Server-side (Docker Service Name)
    : (process.env.NEXT_PUBLIC_API_URL || '/api'); // Client-side (Relative via Nginx)

export const api = {
    async getProducts(collectionSlug?: string): Promise<APIProduct[]> {
        const url = collectionSlug
            ? `${API_URL}/products?collection=${collectionSlug}`
            : `${API_URL}/products`;

        try {
            const res = await fetch(url, { cache: 'no-store' }); // no-store for dynamic updates
            if (!res.ok) throw new Error('Failed to fetch products');
            return res.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    async getProductBySlug(slug: string): Promise<APIProduct | null> {
        try {
            const res = await fetch(`${API_URL}/products/${slug}`, { cache: 'no-store' });
            if (!res.ok) return null;
            return res.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async getCollections(): Promise<APICollection[]> {
        try {
            const res = await fetch(`${API_URL}/collections`);
            if (!res.ok) throw new Error('Failed to fetch collections');
            return res.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }
};

// Helper to format price like the mock data "₴ 1,890"
export const formatPrice = (price: number): string => {
    return `₴ ${price.toLocaleString('uk-UA')}`;
};

// Helper to get available sizes
export const getAvailableSizes = (product: APIProduct): string[] => {
    const sizes: string[] = [];
    if (product.stock_xs > 0) sizes.push('XS');
    if (product.stock_s > 0) sizes.push('S');
    if (product.stock_m > 0) sizes.push('M');
    if (product.stock_l > 0) sizes.push('L');
    if (product.stock_xl > 0) sizes.push('XL');
    if (product.stock_xxl > 0) sizes.push('XXL');
    if (product.stock_os > 0) sizes.push('OS');
    return sizes;
};

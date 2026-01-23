export interface Product {
    id: number;
    slug: string;
    name: string;
    type: string;
    price: string; // The UI mostly expects a string like "₴ 1,890", but API returns number. We need to handle this.
    base_price: number;
    image: string; // Helper for primary image URL
    images: { url: string; display_order: number }[];
    collection: { id: number; name: string; slug: string };
    description?: string;
    status: 'available' | 'archived' | 'soon';
}

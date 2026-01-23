-- Database Schema for Kurai Arc
-- Dialect: PostgreSQL

-- 1. Users Table
-- Simplified user profiles for order contact info (no authentication/passwords)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    telegram VARCHAR(255),
    instagram VARCHAR(255),
    address TEXT, -- Shipping address snapshot or JSON structure
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Collections Table (Drops)
CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Products Table
-- Contains all product info including stock levels for each size
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    collection_id INTEGER REFERENCES collections(id),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    type VARCHAR(100), -- E.g., 'Tee', 'Hoodie', 'Pants'
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'soon', -- 'available', 'archived', 'soon'
    
    -- Inventory Stock Levels by Size
    stock_xs INTEGER DEFAULT 0,
    stock_s INTEGER DEFAULT 0,
    stock_m INTEGER DEFAULT 0,
    stock_l INTEGER DEFAULT 0,
    stock_xl INTEGER DEFAULT 0,
    stock_xxl INTEGER DEFAULT 0,
    stock_os INTEGER DEFAULT 0, -- One Size (for accessories)
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Product Images Table
-- Linked to products, handled by display_order
CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    display_order INTEGER DEFAULT 1 -- 1 = Main Image, 2 = Secondary, etc.
);

-- 5. Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id), -- Link to customer info
    status VARCHAR(50) DEFAULT 'pending', -- pending, paid, shipped, cancelled
    total_amount DECIMAL(10, 2) NOT NULL,
    promo_code VARCHAR(50),
    shipping_address TEXT NOT NULL, -- Snapshot of address at time of order to preserve history
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Order Items Table
-- Links specific products and chosen sizes to an order
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    size VARCHAR(10) NOT NULL, -- The specific size chosen (e.g., 'M', 'L')
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL -- Store price at time of purchase in case product price changes
);

-- Performance Indexes
CREATE INDEX idx_products_collection ON products(collection_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);

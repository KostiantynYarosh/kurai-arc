-- Seed Data for Kurai Arc
-- Run this in your SQL client (e.g. Neon Console, pgAdmin, or VS Code SQLTools)

-- 1. Insert Collections
INSERT INTO collections (name, slug, description, is_active) VALUES
('Void Genesis', 'void-genesis', 'The beginning of the void. Exploring dark matter and silence.', true),
('Urban Drifter', 'urban-drifter', 'For those who wander the concrete jungle.', true),
('Neon Nights', 'neon-nights', 'Vibrant shadows under the city lights.', true),
('Legacy 2023', 'legacy-2023', 'Archived pieces from the first era.', true);

-- 2. Insert Products
-- Note: usage of subqueries to get collection_id helps avoid hardcoding IDs

-- Void Genesis Products
INSERT INTO products (collection_id, name, slug, type, description, base_price, status, stock_m, stock_l) VALUES
((SELECT id FROM collections WHERE slug='void-genesis'), 'Phantom Archive Tee', 'phantom-archive-tee', 'Oversized Tee', 'A staple of the kurai.arc aesthetic. The Phantom Archive Tee features a premium heavyweight cotton build with a signature boxy silhouette.', 1890.00, 'available', 10, 10),
((SELECT id FROM collections WHERE slug='void-genesis'), 'Void Runner Hoodie', 'void-runner-hoodie', 'Heavyweight Hoodie', 'Engineered for the urban nomad. 500GSM brushed back fleece for maximum insulation.', 3200.00, 'available', 15, 20),
((SELECT id FROM collections WHERE slug='void-genesis'), 'Obsidian Cargo V2', 'obsidian-cargo-v2', 'Techwear Pants', 'The evolution of the technical cargo. Water-repellent finish on high-density nylon.', 4500.00, 'archived', 0, 0),
((SELECT id FROM collections WHERE slug='void-genesis'), 'Eclipse Cap', 'eclipse-cap', 'Accessories', 'A low-profile headwear piece designed to complement any dark ensemble.', 950.00, 'available', 50, 0);

-- Urban Drifter Products
INSERT INTO products (collection_id, name, slug, type, description, base_price, status, stock_m, stock_l) VALUES
((SELECT id FROM collections WHERE slug='urban-drifter'), 'Cyberpunk Utility Vest', 'cyberpunk-utility-vest', 'Outerwear', 'The ultimate layering piece. Multiple utility compartments.', 3800.00, 'available', 5, 5),
((SELECT id FROM collections WHERE slug='urban-drifter'), 'Gore-Tex Shell Jacket', 'gore-tex-shell-jacket', 'Outerwear', 'Maximum protection. Zero compromise. 3-layer Gore-Tex Pro.', 6500.00, 'available', 8, 8),
((SELECT id FROM collections WHERE slug='urban-drifter'), 'Tactical Chest Rig', 'tactical-chest-rig', 'Accessories', 'Expanding the horizons of urban utility.', 2200.00, 'available', 12, 0),
((SELECT id FROM collections WHERE slug='urban-drifter'), 'Asymmetric Long Sleeve', 'asymmetric-long-sleeve', 'Tops', 'Breaking the lines of convention. Unique paneling.', 2100.00, 'available', 20, 15);

-- Neon Nights Products
INSERT INTO products (collection_id, name, slug, type, description, base_price, status, stock_m, stock_l) VALUES
((SELECT id FROM collections WHERE slug='neon-nights'), 'Modular Tech Pack', 'modular-tech-pack', 'Accessories', 'Your entire workspace, portable. Ballistic nylon construction.', 5600.00, 'available', 10, 0),
((SELECT id FROM collections WHERE slug='neon-nights'), 'Shinobi Joggers', 'shinobi-joggers', 'Pants', 'Agility meets aesthetics. Tapered fit with elasticated cuffs.', 3900.00, 'available', 25, 25),
((SELECT id FROM collections WHERE slug='neon-nights'), 'Nocturnal Windbreaker', 'nocturnal-windbreaker', 'Outerwear', 'Lightweight protection with high-visibility reflective trim.', 4800.00, 'available', 10, 10),
((SELECT id FROM collections WHERE slug='neon-nights'), 'Digital Nomad Scarf', 'digital-nomad-scarf', 'Accessories', 'An oversized scarf for the cold city streets.', 1200.00, 'available', 30, 0);

-- Legacy 2023 Products (Archived)
INSERT INTO products (collection_id, name, slug, type, description, base_price, status, stock_m, stock_l) VALUES
((SELECT id FROM collections WHERE slug='legacy-2023'), 'Proto-01 Shell', 'proto-01-shell', 'Prototype', 'The blueprint for kurai.arc. A collectors piece.', 4800.00, 'archived', 0, 0),
((SELECT id FROM collections WHERE slug='legacy-2023'), 'Zero-Day Parka', 'zero-day-parka', 'Outerwear', 'Designed for the ultimate cold.', 4800.00, 'archived', 0, 0),
((SELECT id FROM collections WHERE slug='legacy-2023'), 'Neural Link Tee', 'neural-link-tee', 'Graphic Tee', 'Cybernetic aesthetics captured in print.', 1200.00, 'archived', 0, 0),
((SELECT id FROM collections WHERE slug='legacy-2023'), 'Ghost Protocol Vest', 'ghost-protocol-vest', 'Outerwear', 'Minimal visibility. Maximum utility.', 4800.00, 'archived', 0, 0);

-- 3. Insert Product Images
-- Linking images to products via nested subqueries or assumption of order is tricky in raw SQL without stored procedures.
-- For a seed file, we'll assume slugs are unique and use them to find PL.

INSERT INTO product_images (product_id, url) VALUES
((SELECT id FROM products WHERE slug='phantom-archive-tee'), '/images/phantom-tee.png'),
((SELECT id FROM products WHERE slug='void-runner-hoodie'), '/images/void-hoodie.png'),
((SELECT id FROM products WHERE slug='obsidian-cargo-v2'), '/images/obsidian-cargo.png'),
((SELECT id FROM products WHERE slug='eclipse-cap'), '/images/eclipse-cap.png'),
((SELECT id FROM products WHERE slug='cyberpunk-utility-vest'), '/images/utility-vest.png'),
((SELECT id FROM products WHERE slug='gore-tex-shell-jacket'), '/images/shell-jacket.png'),
((SELECT id FROM products WHERE slug='tactical-chest-rig'), '/images/chest-rig.png'),
((SELECT id FROM products WHERE slug='asymmetric-long-sleeve'), '/images/long-sleeve.png'),
((SELECT id FROM products WHERE slug='modular-tech-pack'), '/images/tech-pack.png'),
((SELECT id FROM products WHERE slug='shinobi-joggers'), '/images/shinobi-joggers.png'),
((SELECT id FROM products WHERE slug='nocturnal-windbreaker'), '/images/windbreaker.png'),
((SELECT id FROM products WHERE slug='digital-nomad-scarf'), '/images/scarf.png'),
((SELECT id FROM products WHERE slug='proto-01-shell'), '/images/proto-shell.png'),
((SELECT id FROM products WHERE slug='zero-day-parka'), '/images/zero-parka.png'),
((SELECT id FROM products WHERE slug='neural-link-tee'), '/images/neural-tee.png'),
((SELECT id FROM products WHERE slug='ghost-protocol-vest'), '/images/ghost-vest.png');

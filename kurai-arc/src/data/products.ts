export interface Product {
    slug: string;
    name: string;
    type: string;
    price: string;
    image: string;
    images?: string[];
    collection: string;
    description?: string;
    status?: 'available' | 'archived';
}

export const products: Product[] = [
    {
        slug: "phantom-archive-tee",
        name: "Phantom Archive Tee",
        type: "Oversized Tee",
        price: "₴ 1,890",
        image: "/images/phantom-tee.png",
        images: ["/images/phantom-tee.png", "/images/void-hoodie.png", "/images/obsidian-cargo.png"],
        collection: "Void Genesis",
        status: 'available',
        description: "A staple of the kurai.arc aesthetic. The Phantom Archive Tee features a premium heavyweight cotton build with a signature boxy silhouette. Minimalist branding on the chest meets architectural seam details. Dark streetwear refined."
    },
    {
        slug: "void-runner-hoodie",
        name: "Void Runner Hoodie",
        type: "Heavyweight Hoodie",
        price: "₴ 3,200",
        image: "/images/void-hoodie.png",
        images: ["/images/void-hoodie.png", "/images/phantom-tee.png", "/images/eclipse-cap.png"],
        collection: "Void Genesis",
        status: 'available',
        description: "Engineered for the urban nomad. The Void Runner Hoodie is constructed from 500GSM brushed back fleece for maximum insulation and structure. Features an oversized hood and hidden pocket systems."
    },
    {
        slug: "obsidian-cargo-v2",
        name: "Obsidian Cargo V2",
        type: "Techwear Pants",
        price: "₴ 4,500",
        image: "/images/obsidian-cargo.png",
        collection: "Void Genesis",
        status: 'archived',
        description: "The evolution of the technical cargo. V2 features improved articulation and modular pocket configurations. Water-repellent finish on high-density nylon. A blueprint of utility and style."
    },
    {
        slug: "eclipse-cap",
        name: "Eclipse Cap",
        type: "Accessories",
        price: "₴ 950",
        image: "/images/eclipse-cap.png",
        collection: "Void Genesis",
        status: 'available',
        description: "A low-profile headwear piece designed to complement any dark ensemble. Six-panel construction with adjustable buckle closure and subtle tonal embroidery."
    },
    {
        slug: "cyberpunk-utility-vest",
        name: "Cyberpunk Utility Vest",
        type: "Outerwear",
        price: "₴ 3,800",
        image: "/images/utility-vest.png",
        collection: "Urban Drifter",
        status: 'available',
        description: "The ultimate layering piece. Multiple utility compartments provide ample storage while maintaining a streamlined profile. Adjustable side straps for a custom fit over tees or hoodies."
    },
    {
        slug: "gore-tex-shell-jacket",
        name: "Gore-Tex Shell Jacket",
        type: "Outerwear",
        price: "₴ 6,500",
        image: "/images/shell-jacket.png",
        collection: "Urban Drifter",
        status: 'available',
        description: "Maximum protection. Zero compromise. Our flagship shell jacket is built with 3-layer Gore-Tex Pro for total waterproofness and breathability. Integrated storm hood and YKK AquaGuard zippers."
    },
    {
        slug: "tactical-chest-rig",
        name: "Tactical Chest Rig",
        type: "Accessories",
        price: "₴ 2,200",
        image: "/images/chest-rig.png",
        collection: "Urban Drifter",
        status: 'available',
        description: "Expanding the horizons of urban utility. The tactical chest rig offers accessible storage for essentials. Breathable mesh back panel ensures comfort during long patrols."
    },
    {
        slug: "asymmetric-long-sleeve",
        name: "Asymmetric Long Sleeve",
        type: "Tops",
        price: "₴ 2,100",
        image: "/images/long-sleeve.png",
        collection: "Urban Drifter",
        status: 'available',
        description: "Breaking the lines of convention. This long sleeve garment features unique paneling and an asymmetric hemline. Soft stretch cotton for a second-skin feel."
    },
    {
        slug: "modular-tech-pack",
        name: "Modular Tech Pack",
        type: "Accessories",
        price: "₴ 5,600",
        image: "/images/tech-pack.png",
        collection: "Neon Nights",
        status: 'available',
        description: "Your entire workspace, portable. The Modular Tech Pack adapts to your needs with detachable pouches and internal cable management. Ballistic nylon construction."
    },
    {
        slug: "shinobi-joggers",
        name: "Shinobi Joggers",
        type: "Pants",
        price: "₴ 3,900",
        image: "/images/shinobi-joggers.png",
        collection: "Neon Nights",
        status: 'available',
        description: "Agility meets aesthetics. Inspired by traditional attire but built for the future. Tapered fit with elasticated cuffs and deep cargo pockets."
    },
    {
        slug: "nocturnal-windbreaker",
        name: "Nocturnal Windbreaker",
        type: "Outerwear",
        price: "₴ 4,800",
        image: "/images/windbreaker.png",
        collection: "Neon Nights",
        status: 'available',
        description: "Lightweight protection from the elements. The Nocturnal Windbreaker features a high-visibility reflective trim that stays subtle until hit by light. Packable design."
    },
    {
        slug: "digital-nomad-scarf",
        name: "Digital Nomad Scarf",
        type: "Accessories",
        price: "₴ 1,200",
        image: "/images/scarf.png",
        collection: "Neon Nights",
        status: 'available',
        description: "An oversized scarf for the cold city streets. Distressed edges and a heavy knit pattern for added texture and warmth."
    },
    // Archived Items
    {
        slug: "proto-01-shell",
        name: "Proto-01 Shell",
        type: "Prototype",
        price: "₴ 4,800",
        image: "/images/proto-shell.png",
        collection: "Legacy 2023",
        status: 'archived',
        description: "The blueprint for kurai.arc. Proto-01 explored the limits of modular outerwear. A collector's piece representing the dawn of our design journey."
    },
    {
        slug: "zero-day-parka",
        name: "Zero-Day Parka",
        type: "Outerwear",
        price: "₴ 4,800",
        image: "/images/zero-parka.png",
        collection: "Legacy 2023",
        status: 'archived',
        description: "Designed for the ultimate cold. The Zero-Day Parka utilized experimental down-fill techniques and a reinforced exoskeleton. Our first major archival release."
    },
    {
        slug: "neural-link-tee",
        name: "Neural Link Tee",
        type: "Graphic Tee",
        price: "₴ 1,200",
        image: "/images/neural-tee.png",
        collection: "Legacy 2023",
        status: 'archived',
        description: "Cybernetic aesthetics captured in print. The Neural Link Tee featured high-density screen printing and a custom 'data-stream' pattern."
    },
    {
        slug: "ghost-protocol-vest",
        name: "Ghost Protocol Vest",
        type: "Outerwear",
        price: "₴ 4,800",
        image: "/images/ghost-vest.png",
        collection: "Legacy 2023",
        status: 'archived',
        description: "Minimal visibility. Maximum utility. The Ghost Protocol Vest pushed the boundaries of stealth design with its light-absorbing fabric."
    },
];

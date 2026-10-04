export const PRODUCTS = [
    // ── EVENING GOWNS & DRESSES ──────────────────────────────────────────────
    {
        id: 'tisuta-001',
        name: 'Aurelia Bias-Cut Mulberry Silk Slip Dress',
        brand: 'TISUTA PRIVÉ',
        category: 'dresses',
        price: 7499,
        mrp: 10999,
        discount: 32,
        rating: 4.9,
        reviewCount: 128,
        isNewArrival: true,
        isTrending: true,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-model-walking-on-a-runway-41560-large.mp4',
        description: 'Sculpted from 100% pure Mulberry silk, the Aurelia gown features bespoke liquid drape shoulders, a contoured corset interior, and hand-finished french seam detailing. The bias-cut naturally hugs your silhouette as you move.',
        images: [
            'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Royal Burgundy', hex: '#4A1525', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop' },
            { name: 'Champagne Gold', hex: '#C5A059', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop' },
            { name: 'Midnight Obsidian', hex: '#121212', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        fabric: '100% Mulberry Silk (19 Momme)',
        care: 'Dry Clean Only',
        stockCount: 8,
        editTag: 'Red Carpet Edits'
    },
    {
        id: 'tisuta-002',
        name: 'Verona Structured Asymmetric Corset Gown',
        brand: 'TISUTA ATELIER',
        category: 'dresses',
        price: 9999,
        mrp: 13999,
        discount: 28,
        rating: 4.97,
        reviewCount: 112,
        isNewArrival: true,
        isTrending: true,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-a-black-outfit-41558-large.mp4',
        description: 'An ethereal evening gown engineered with boned internal structuring, high leg slit, and fluid floor-sweeping train. Available in three couture colorways.',
        images: [
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Midnight Emerald', hex: '#0A2E23', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop' },
            { name: 'Crimson Velvet', hex: '#800020', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        fabric: 'Heavy Silk Crepe de Chine',
        care: 'Dry Clean Only',
        stockCount: 4,
        editTag: 'Red Carpet Edits'
    },
    {
        id: 'tisuta-003',
        name: 'Celeste Plunging Crystal Mesh Column Dress',
        brand: 'TISUTA PRIVÉ',
        category: 'dresses',
        price: 12499,
        mrp: 17999,
        discount: 30,
        rating: 4.93,
        reviewCount: 65,
        isNewArrival: true,
        isTrending: false,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-red-dress-and-posing-41554-large.mp4',
        description: 'Liquid crystal mesh column silhouette with hand-applied Swarovski crystal fringe accents, open low back, and plunging V-neckline.',
        images: [
            'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Crystal Silver', hex: '#C0C0C0', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop' },
            { name: 'Onyx Sparkle', hex: '#1C1C1C', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['S', 'M', 'L'],
        fabric: 'Crystal Mesh with Swarovski Embellishments',
        care: 'Dry Clean Only',
        stockCount: 6,
        editTag: 'Red Carpet Edits'
    },
    {
        id: 'tisuta-004',
        name: 'Geneva Off-Shoulder Italian Velvet Ball Gown',
        brand: 'TISUTA COUTURE',
        category: 'dresses',
        price: 14999,
        mrp: 21499,
        discount: 30,
        rating: 4.96,
        reviewCount: 48,
        isNewArrival: false,
        isTrending: true,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-maroon-dress-41559-large.mp4',
        description: 'Dramatic off-shoulder neckline draped in dense Italian micro-velvet with structured internal petticoat volume. Floor-skimming hem with satin lining.',
        images: [
            'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Midnight Sapphire', hex: '#0F1C3F', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop' },
            { name: 'Deep Bordeaux', hex: '#3B0D1A', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        fabric: 'Italian Micro Velvet & Silk Taffeta Lining',
        care: 'Dry Clean Only',
        stockCount: 5,
        editTag: 'Red Carpet Edits'
    },
    {
        id: 'tisuta-005',
        name: 'Sora Plissé Crepe Chiffon Maxi Dress',
        brand: 'TISUTA STUDIO',
        category: 'dresses',
        price: 4999,
        mrp: 7499,
        discount: 33,
        rating: 4.87,
        reviewCount: 39,
        isNewArrival: true,
        isTrending: false,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-saree-posing-for-a-photo-41557-large.mp4',
        description: 'Weightless plissé pleated chiffon halter maxi with optional obi waist belt. Perfect for resort, poolside, and summer weddings.',
        images: [
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Blush Nude', hex: '#E8D5C8', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop' },
            { name: 'Sage Green', hex: '#708238', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        fabric: 'Japanese Micro-Pleated Crepe Chiffon',
        care: 'Handwash Cold',
        stockCount: 10,
        editTag: 'Office Luxe'
    },

    // ── HERITAGE ETHNIC ──────────────────────────────────────────────────────
    {
        id: 'tisuta-006',
        name: 'Kashmiri Zardozi Velvet Anarkali Set',
        brand: 'TISUTA COUTURE',
        category: 'ethnic',
        price: 12999,
        mrp: 17999,
        discount: 27,
        rating: 4.95,
        reviewCount: 94,
        isNewArrival: true,
        isTrending: true,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-saree-posing-for-a-photo-41557-large.mp4',
        description: 'An architectural heirloom silhouette crafted in plush Royal Velvet with hand-embroidered metallic Zardozi gold zari wirework by Kashmiri artisans.',
        images: [
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Emerald Velvet', hex: '#0D3B2E', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop' },
            { name: 'Royal Plum', hex: '#3B0D2E', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop' },
            { name: 'Midnight Black', hex: '#1A1A1A', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        fabric: 'Micro Velvet with Pure Gold Zari Threading',
        care: 'Dry Clean Only',
        stockCount: 5,
        editTag: 'Festive Royal'
    },
    {
        id: 'tisuta-007',
        name: 'Chanderi Gold Tissue Saree with Embroidered Blouse',
        brand: 'TISUTA ARTISANAL',
        category: 'ethnic',
        price: 8999,
        mrp: 12499,
        discount: 28,
        rating: 4.88,
        reviewCount: 76,
        isNewArrival: false,
        isTrending: true,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-saree-posing-for-a-photo-41557-large.mp4',
        description: 'Woven in Madhya Pradesh, this tissue Chanderi saree glimmers with silver-gold metallic sheen. Paired with an intricate zardozi sweetheart blouse piece.',
        images: [
            'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Champagne Tissue', hex: '#C5A059', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop' },
            { name: 'Rose Dust Gold', hex: '#C5A089', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['Free Size (Includes Unstitched Blouse)'],
        fabric: 'Real Tissue Chanderi Silk',
        care: 'Dry Clean Only',
        stockCount: 12,
        editTag: 'Festive Royal'
    },
    {
        id: 'tisuta-008',
        name: 'Banarasi Real Zari Katan Silk Lehenga',
        brand: 'TISUTA HERITAGE',
        category: 'ethnic',
        price: 18999,
        mrp: 24999,
        discount: 24,
        rating: 4.96,
        reviewCount: 88,
        isNewArrival: false,
        isTrending: true,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-red-dress-and-posing-41554-large.mp4',
        description: 'Woven over 180 hours by Varanasi master weavers. Features pure Katan silk brocade with real silver zari garden motifs. Includes matching choli and dupatta.',
        images: [
            'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Royal Crimson', hex: '#4A1525', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop' },
            { name: 'Teal Zari', hex: '#008080', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['S', 'M', 'L', 'Custom Stitching'],
        fabric: '100% Pure Katan Silk Banarasi Brocade',
        care: 'Dry Clean Only',
        stockCount: 4,
        editTag: 'Festive Royal'
    },
    {
        id: 'tisuta-009',
        name: 'Lucknowi Chikankari Georgette Sharara Set',
        brand: 'TISUTA HERITAGE',
        category: 'ethnic',
        price: 6999,
        mrp: 9999,
        discount: 30,
        rating: 4.91,
        reviewCount: 51,
        isNewArrival: true,
        isTrending: true,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-wearing-a-stylish-green-coat-41556-large.mp4',
        description: 'Intricate Bakhiya and Tepchi hand needlework embellished with subtle Mukaish silver foil highlights. A Lucknow heritage craft in contemporary silhouette.',
        images: [
            'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Powder Blue', hex: '#B0E0E6', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop' },
            { name: 'Lilac Silk', hex: '#C8A2C8', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['S', 'M', 'L'],
        fabric: 'Pure Viscose Georgette',
        care: 'Dry Clean Only',
        stockCount: 9,
        editTag: 'Festive Royal'
    },

    // ── TAILORED CO-ORDS ─────────────────────────────────────────────────────
    {
        id: 'tisuta-010',
        name: 'Lumière Ivory Pleated Satin Co-ord Set',
        brand: 'TISUTA STUDIO',
        category: 'coords',
        price: 5999,
        mrp: 8499,
        discount: 29,
        rating: 4.85,
        reviewCount: 54,
        isNewArrival: true,
        isTrending: false,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-wearing-a-stylish-green-coat-41556-large.mp4',
        description: 'Modern luxury power dressing. Heat-pleated satin tunic with wide-leg palazzo trousers that move fluidly with every step. Office-to-dinner effortlessly.',
        images: [
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Pearl Ivory', hex: '#F5F2EB', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop' },
            { name: 'Warm Taupe', hex: '#8A7A6E', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        fabric: 'Japanese Micro-Pleated Satin',
        care: 'Handwash Cold / Steam',
        stockCount: 15,
        editTag: 'Office Luxe'
    },
    {
        id: 'tisuta-011',
        name: 'Verona Double-Breasted Tuxedo Blazer Suit',
        brand: 'TISUTA ATELIER',
        category: 'coords',
        price: 11999,
        mrp: 15999,
        discount: 25,
        rating: 4.94,
        reviewCount: 44,
        isNewArrival: true,
        isTrending: true,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-black-jacket-41555-large.mp4',
        description: 'Bespoke double-breasted tuxedo blazer with satin peak lapels and high-waisted cigarette trousers. The modern power uniform.',
        images: [
            'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Midnight Onyx', hex: '#121212', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop' },
            { name: 'Champagne Cream', hex: '#F4E8C1', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['S', 'M', 'L'],
        fabric: 'Italian Stretch Wool & Satin Lapel',
        care: 'Dry Clean Only',
        stockCount: 6,
        editTag: 'Office Luxe'
    },

    // ── LUXURY OUTERWEAR ─────────────────────────────────────────────────────
    {
        id: 'tisuta-012',
        name: 'Sovereign Belted Virgin Wool Trench Coat',
        brand: 'TISUTA ATELIER',
        category: 'outerwear',
        price: 11499,
        mrp: 14999,
        discount: 23,
        rating: 4.92,
        reviewCount: 41,
        isNewArrival: false,
        isTrending: true,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-black-jacket-41555-large.mp4',
        description: 'Italian double-faced virgin wool coat with custom horn buttons, exaggerated lapels, and unlined silk-bound seams. The investment piece of the season.',
        images: [
            'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Camel Gold', hex: '#C19A6B', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop' },
            { name: 'Onyx Black', hex: '#121212', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['S', 'M', 'L'],
        fabric: '100% Italian Virgin Wool (520 GSM)',
        care: 'Dry Clean Only',
        stockCount: 6,
        editTag: 'Winter Resort'
    },
    {
        id: 'tisuta-013',
        name: 'Monarch Pure Cashmere Wrap Cape',
        brand: 'TISUTA PRIVÉ',
        category: 'outerwear',
        price: 19999,
        mrp: 25999,
        discount: 23,
        rating: 4.98,
        reviewCount: 29,
        isNewArrival: true,
        isTrending: true,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-wearing-a-stylish-green-coat-41556-large.mp4',
        description: 'Mongolian pure cashmere winter cape with detachable faux fur collar trim and metallic champagne gold clasp fastenings. Ultra-rare winter statement.',
        images: [
            'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Winter Ivory', hex: '#FAF0E6', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop' },
            { name: 'Charcoal', hex: '#1C1C1C', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['Free Size'],
        fabric: '100% Grade-A Mongolian Cashmere',
        care: 'Dry Clean Only',
        stockCount: 3,
        editTag: 'Winter Resort'
    },

    // ── HIGH JEWELRY ─────────────────────────────────────────────────────────
    {
        id: 'tisuta-014',
        name: 'Royal Polki Diamond & Emerald Kundan Choker',
        brand: 'TISUTA HIGH JEWELRY',
        category: 'jewelry',
        price: 22999,
        mrp: 29999,
        discount: 23,
        rating: 4.99,
        reviewCount: 38,
        isNewArrival: true,
        isTrending: true,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-a-black-outfit-41558-large.mp4',
        description: '22K gold-plated handcrafted Kundan choker embellished with uncut Polki stones, Zambian emerald drops, and South Sea freshwater pearl clusters.',
        images: [
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Zambian Emerald', hex: '#0D3B2E', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop' },
            { name: 'Royal Ruby', hex: '#800020', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['Adjustable'],
        fabric: '22K Gold Plated Brass & Handcrafted Polki Stones',
        care: 'Store in Velvet Box',
        stockCount: 3,
        editTag: 'Festive Royal'
    },
    {
        id: 'tisuta-015',
        name: 'VVS1 Solitaire Diamond Drop Earrings in 18K Gold',
        brand: 'TISUTA HIGH JEWELRY',
        category: 'jewelry',
        price: 14999,
        mrp: 19999,
        discount: 25,
        rating: 4.92,
        reviewCount: 47,
        isNewArrival: false,
        isTrending: true,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-red-dress-and-posing-41554-large.mp4',
        description: 'Hand-cut lab-grown VVS1 solitaire diamond drops suspended in solid 18K white gold prong settings. IGI certified.',
        images: [
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'White Gold', hex: '#E5E4E2', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop' },
            { name: 'Rose Gold', hex: '#B76E79', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['Free Size'],
        fabric: '18K Gold & VVS1 Lab-Grown Diamonds',
        care: 'Polish with Jewelry Cloth Only',
        stockCount: 7,
        editTag: 'Red Carpet Edits'
    },
    {
        id: 'tisuta-016',
        name: 'Meenakari Jadau Polki Necklace Set',
        brand: 'TISUTA HIGH JEWELRY',
        category: 'jewelry',
        price: 18499,
        mrp: 23999,
        discount: 22,
        rating: 4.94,
        reviewCount: 62,
        isNewArrival: true,
        isTrending: true,
        video: 'https://assets.mixkit.co/videos/preview/mixkit-model-walking-on-a-runway-41560-large.mp4',
        description: 'Handcrafted Rajasthani Jadau Meenakari necklace set with uncut Polki diamonds, vibrant enamel detailing, and kundan border work. Includes matching earrings.',
        images: [
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop'
        ],
        colors: [
            { name: 'Peacock Blue Meena', hex: '#1F4E79', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop' },
            { name: 'Crimson Red Meena', hex: '#800020', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop' }
        ],
        sizes: ['Free Size'],
        fabric: '22K Gold-Plated Brass with Enamel',
        care: 'Wipe with Dry Cloth Only',
        stockCount: 5,
        editTag: 'Festive Royal'
    }
];

export const CATEGORIES = [
    { id: 'all', name: 'All Couture' },
    { id: 'dresses', name: 'Evening Gowns & Dresses' },
    { id: 'ethnic', name: 'Heritage Sarees & Anarkalis' },
    { id: 'coords', name: 'Tailored Co-ords' },
    { id: 'outerwear', name: 'Luxury Outerwear' },
    { id: 'jewelry', name: 'High Jewelry & Kundan' }
];

export const EDITORIAL_TAGS = [
    { id: 'Red Carpet Edits', name: 'Red Carpet Gala' },
    { id: 'Festive Royal', name: 'Festive Royal Weddings' },
    { id: 'Office Luxe', name: 'Executive Power Dressing' },
    { id: 'Winter Resort', name: 'Winter Resort Luxe' }
];

export const EDITORIAL_COLLECTIONS = [
    {
        id: 'ed-1',
        title: 'Royal Festive Edit',
        subtitle: 'Handwoven Zardozi Silks',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-saree-posing-for-a-photo-41557-large.mp4',
        tag: 'Festive Royal'
    },
    {
        id: 'ed-2',
        title: 'Red Carpet Gala',
        subtitle: 'Sculpted Mulberry Silk Gowns',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-model-walking-on-a-runway-41560-large.mp4',
        tag: 'Red Carpet Edits'
    },
    {
        id: 'ed-3',
        title: 'Executive Power Luxe',
        subtitle: 'Tailored Japanese Micro-Pleats',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-black-jacket-41555-large.mp4',
        tag: 'Office Luxe'
    }
];

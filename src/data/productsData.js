// src/data/productsData.js
// Curated exclusively for TISUTA — Where Fashion Meets Intelligence
// Pure Women's Apparel Collection: Minimal Midi, Slip Style, A-Line, Short Flared One Piece,
// Casual Midi, Fitted Basic Top, Off Shoulder Top, Crop Top, Net Er Top, Modern Long Kurti,
// Short Kurti, and Ethnic Sets.
// Real Google Shopping & Myntra Market Prices. 100% relevant dedicated catalog photography.
// No jewellery, no mens wear.

export const HIGH_END_VIDEOS = {
    walk1: 'https://assets.mixkit.co/videos/preview/mixkit-model-walking-on-a-runway-41560-large.mp4',
    walk2: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-black-jacket-41555-large.mp4',
    walk3: 'https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-in-a-red-dress-2127-large.mp4',
    walk4: 'https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-saree-posing-for-a-photo-41557-large.mp4'
};

export const PRODUCTS = [
    // 1. MINIMAL MIDI DRESS
    {
        id: 'dr-minimal-midi',
        category: 'dresses',
        subCategory: 'minimal-midi',
        styleTag: 'Minimal midi dress',
        name: 'Classic Noir Minimalist Tailored Midi Dress',
        brand: 'ATELIER TISUTA',
        description: 'Immaculately tailored in double-crepe stretch fabric with an understated architectural silhouette. Features a clean boat neckline, short sleeves, structured vertical seam detailing, and a fluid midi-length drape falling gracefully below the knee. Designed for effortless transitions between corporate summits and evening galas.',
        price: 1499,
        mrp: 2999,
        discount: 50,
        rating: 4.94,
        reviewCount: 268,
        stockCount: 18,
        isNewArrival: true,
        editTag: 'Minimalist Luxe',
        fabric: 'Premium Double-Crepe Weave (190 GSM)',
        fit: 'Regular Tailored Straight Cut',
        neckline: 'High Boat Neckline with Bound Finish',
        sleeve: 'Tailored Short Sleeves',
        length: 'Midi (44 in / 112 cm)',
        occasion: 'Executive Summit, Gallery Opening, Cocktail Evening, Intimate Dinner',
        stretchFactor: 'Medium Comfort Stretch (Gentle Contouring)',
        transparency: '100% Opaque (Self-Lined)',
        weight: '320 grams',
        weaveType: 'Fine Crepe Compact Weave',
        threadCount: '380 Threads Per Inch',
        liningDetails: 'Full-length soft breathable lining',
        pocketDepth: '8.5 inches (Concealed In-Seam Dual Pockets)',
        pincodeDeliveryEstimate: 'Fast dispatch within 24 hours. Delivery in 2-3 business days.',
        trueToSizeMetrics: { tight: 3, trueToSize: 93, loose: 4 },
        modelStats: {
            height: '5\'10" (178 cm)',
            bust: '33 in (84 cm)',
            waist: '25 in (64 cm)',
            hips: '35 in (89 cm)',
            sizeWorn: 'S'
        },
        originStory: 'Engineered with clean architectural lines for timeless European minimalism.',
        careInstructions: 'Machine wash delicate cold or dry clean. Low iron on reverse side.',
        measurementTable: [
            { size: 'XS', bust: '32 in', waist: '26 in', hip: '36 in', length: '43.5 in' },
            { size: 'S', bust: '34 in', waist: '28 in', hip: '38 in', length: '44.0 in' },
            { size: 'M', bust: '36 in', waist: '30 in', hip: '40 in', length: '44.5 in' },
            { size: 'L', bust: '38 in', waist: '32 in', hip: '42 in', length: '45.0 in' },
            { size: 'XL', bust: '41 in', waist: '35 in', hip: '45 in', length: '45.5 in' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { 
                name: 'Classic Noir', 
                hex: '#121212', 
                image: '/images/products/minimal_midi_1.jpg' 
            }
        ],
        images: [
            { 
                angle: 'Studio Full-Length Front Portrait', 
                url: '/images/products/minimal_midi_1.jpg',
                label: '01 Front View'
            },
            { 
                angle: 'Boat Neckline Precision Seam & Bodice Detail', 
                url: '/images/products/minimal_midi_2.jpg',
                label: '02 Bodice Detail'
            },
            { 
                angle: 'Clean Side Silhouette & Drape', 
                url: '/images/products/minimal_midi_1.jpg',
                label: '03 Side Profile'
            },
            { 
                angle: 'Premium Crepe Fabric Texture Zoom', 
                url: '/images/products/minimal_midi_2.jpg',
                label: '04 Fabric Texture'
            },
            { 
                angle: 'Editorial Studio Stride', 
                url: '/images/products/minimal_midi_1.jpg',
                label: '05 Editorial View'
            }
        ],
        videoUrl: HIGH_END_VIDEOS.walk1,
        completeLookItems: ['tp-off-shoulder', 'dr-slip-style']
    },

    // 2. SLIP STYLE DRESSES
    {
        id: 'dr-slip-style',
        category: 'dresses',
        subCategory: 'slip-style',
        styleTag: 'Slip style dresses',
        name: 'Champagne Satin Cowl-Neck Bias Slip Dress',
        brand: 'TISUTA PRIVÉ',
        description: 'Sculpted on the true 45-degree bias from heavy 220 GSM crepe-back satin. The cascading cowl neckline frames the collarbones, while delicate adjustable micro-straps provide an exacting fit. Features an alluring thigh slit that allows the fluid liquid satin to ripple with every step.',
        price: 1299,
        mrp: 2499,
        discount: 48,
        rating: 4.91,
        reviewCount: 315,
        stockCount: 14,
        isNewArrival: true,
        editTag: 'Date Night Hit',
        fabric: 'Heavy Crepe-Back Satin (220 GSM)',
        fit: 'True Bias-Cut Silhouette that glides over contours',
        neckline: 'Soft Cascading Cowl Neckline',
        sleeve: 'Adjustable Delicate Spaghetti Micro-Straps',
        length: 'Midi (46 in / 117 cm)',
        occasion: 'Romantic Dinner, Cocktail Gala, Evening Soirée, Red Carpet',
        stretchFactor: 'Natural Bias Mechanical Stretch (Gently Hugs Contours)',
        transparency: '100% Opaque Heavy Luster Satin',
        weight: '310 grams',
        weaveType: 'Heavy Liquid Satin Crepe with Mirror Lustre',
        threadCount: '480 Threads Per Inch',
        liningDetails: 'Bust-area self-faced with matching satin',
        pocketDepth: 'No pockets for seamless unbroken silhouette',
        pincodeDeliveryEstimate: 'Express priority air shipping (delivered in 24-48 hrs)',
        trueToSizeMetrics: { tight: 4, trueToSize: 92, loose: 4 },
        modelStats: {
            height: '5\'9" (175 cm)',
            bust: '34 in (86 cm)',
            waist: '26 in (66 cm)',
            hips: '36 in (91 cm)',
            sizeWorn: 'M'
        },
        originStory: 'Cut on the true 45-degree fabric bias for unmatched fluid body drape.',
        careInstructions: 'Delicate hand wash cold or gentle machine wash inside laundry mesh bag. Hang dry in shade.',
        measurementTable: [
            { size: 'XS', bust: '32 in', waist: '25 in', hip: '35 in', length: '45.0 in' },
            { size: 'S', bust: '34 in', waist: '27 in', hip: '37 in', length: '45.5 in' },
            { size: 'M', bust: '36 in', waist: '29 in', hip: '39 in', length: '46.0 in' },
            { size: 'L', bust: '39 in', waist: '32 in', hip: '42 in', length: '46.5 in' },
            { size: 'XL', bust: '42 in', waist: '35 in', hip: '45 in', length: '47.0 in' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { 
                name: 'Champagne Gold', 
                hex: '#E0C896', 
                image: '/images/products/slip_style_1.jpg' 
            }
        ],
        images: [
            { 
                angle: 'Studio Front Cowl Neck Drape Portrait', 
                url: '/images/products/slip_style_1.jpg',
                label: '01 Cowl Front'
            },
            { 
                angle: 'Micro-Spaghetti Straps & Draped Bodice Detail', 
                url: '/images/products/slip_style_1.jpg',
                label: '02 Bodice Detail'
            },
            { 
                angle: 'Heavy Liquid Satin Luster Weave Macro', 
                url: '/images/products/slip_style_1.jpg',
                label: '03 Satin Texture'
            },
            { 
                angle: 'Fluid Side Silhouette & Thigh Slit Motion', 
                url: '/images/products/slip_style_1.jpg',
                label: '04 Side Drape'
            },
            { 
                angle: 'Studio Gala Evening Stance', 
                url: '/images/products/slip_style_1.jpg',
                label: '05 Full Stance'
            }
        ],
        videoUrl: HIGH_END_VIDEOS.walk3,
        completeLookItems: ['tp-off-shoulder', 'dr-minimal-midi']
    },

    // 3. A LINE DRESS
    {
        id: 'dr-aline-dress',
        category: 'dresses',
        subCategory: 'aline-dress',
        styleTag: 'A line dress',
        name: 'Terracotta Linen-Cotton Belted A-Line Midi Dress',
        brand: 'TISUTA ATELIER',
        description: 'An architectural classic re-engineered in organic flax linen and fine combed cotton. Features a structured princess-seamed bodice that defines the waist before sweeping out into a breezy, voluminous A-line skirt. Complete with short sleeves, tailored V-neckline, and practical concealed side pockets.',
        price: 1199,
        mrp: 2399,
        discount: 50,
        rating: 4.88,
        reviewCount: 185,
        stockCount: 22,
        isNewArrival: false,
        editTag: 'Day-to-Dinner',
        fabric: '65% Organic Flax Linen, 35% Combed Cotton (190 GSM)',
        fit: 'Structured Bodice with Voluminous A-Line Flare',
        neckline: 'Tailored V-Neck Notch with Clean Topstitching',
        sleeve: 'Tailored Short Sleeves',
        length: 'Midi (43 in / 109 cm)',
        occasion: 'Garden Brunch, Resort Riviera, High Tea, Casual Office, Weekend Escapes',
        stretchFactor: 'Structured Non-Stretch Natural Fiber (Crisp & Breathable)',
        transparency: '100% Opaque (Self-Lined Bodice in Soft Cotton Voile)',
        weight: '350 grams',
        weaveType: 'Linen-Cotton Slub Twill',
        threadCount: '300 Threads Per Inch',
        liningDetails: 'Upper bodice fully lined with 100% fine cotton voile',
        pocketDepth: '8.5 inches (Concealed In-Seam Pockets on Both Sides)',
        pincodeDeliveryEstimate: 'Standard fast shipping within 2-3 business days',
        trueToSizeMetrics: { tight: 2, trueToSize: 95, loose: 3 },
        modelStats: {
            height: '5\'8" (173 cm)',
            bust: '34 in (86 cm)',
            waist: '27 in (68 cm)',
            hips: '37 in (94 cm)',
            sizeWorn: 'S'
        },
        originStory: 'Slow-crafted from organically certified breathable natural linen yarns.',
        careInstructions: 'Machine wash delicate cycle in cold water. Iron damp on linen setting for crisp hand-feel.',
        measurementTable: [
            { size: 'XS', bust: '33 in', waist: '26 in', hip: 'Flare', length: '42.5 in' },
            { size: 'S', bust: '35 in', waist: '28 in', hip: 'Flare', length: '43.0 in' },
            { size: 'M', bust: '37 in', waist: '30 in', hip: 'Flare', length: '43.5 in' },
            { size: 'L', bust: '40 in', waist: '33 in', hip: 'Flare', length: '44.0 in' },
            { size: 'XL', bust: '43 in', waist: '36 in', hip: 'Flare', length: '44.5 in' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { 
                name: 'Terracotta Rust', 
                hex: '#B35432', 
                image: '/images/products/aline_dress_1.jpg' 
            }
        ],
        images: [
            { 
                angle: 'Front A-Line Flared Silhouette Portrait', 
                url: '/images/products/aline_dress_1.jpg',
                label: '01 A-Line Front'
            },
            { 
                angle: 'Princess Seams & Tailored V-Neck Detail', 
                url: '/images/products/aline_dress_1.jpg',
                label: '02 Bodice Detail'
            },
            { 
                angle: 'Flax Linen Slub Weave Texture Zoom', 
                url: '/images/products/aline_dress_1.jpg',
                label: '03 Linen Texture'
            },
            { 
                angle: 'Side Profile & Functional In-Seam Pocket Drape', 
                url: '/images/products/aline_dress_1.jpg',
                label: '04 Side Profile'
            },
            { 
                angle: 'Flared Pleated Hemline Stance', 
                url: '/images/products/aline_dress_1.jpg',
                label: '05 Hemline Flare'
            }
        ],
        videoUrl: HIGH_END_VIDEOS.walk2,
        completeLookItems: ['tp-fitted-basic', 'dr-casual-midi']
    },

    // 4. SHORT LENGTH FLARED ONE PIECE
    {
        id: 'dr-short-flared',
        category: 'dresses',
        subCategory: 'short-flared',
        styleTag: 'Short length flared one piece',
        name: 'Blush Pink Sweetheart Flared Skater Mini One-Piece',
        brand: 'TISUTA RUNWAY',
        description: 'Exuberant, romantic, and youthful. Sculpted with an elegant sweetheart bustier neckline, soft flutter sleeves, and a voluminous circular flared skater skirt that floats effortlessly above the knee. Perfect for summer brunches, rooftop soirées, and birthday celebrations.',
        price: 999,
        mrp: 1999,
        discount: 50,
        rating: 4.95,
        reviewCount: 242,
        stockCount: 16,
        isNewArrival: true,
        editTag: 'Under ₹999',
        fabric: 'Triple-Layered Chiffon Crepe with Soft Viscose Lining',
        fit: 'Fitted Bustier Waist with Voluminous Flared Circular Skirt',
        neckline: 'Sculpted Sweetheart Neckline with Binding',
        sleeve: 'Flutter Ruffle Cap Sleeves',
        length: 'Short Mini (33 in / 84 cm)',
        occasion: 'Birthday Celebration, Summer Gala, Club Soirée, Sunset Cruise, Rooftop Soirée',
        stretchFactor: 'Comfort Stretch Bodice Panel',
        transparency: '100% Opaque (Double Lined Bodice and Skirt)',
        weight: '270 grams',
        weaveType: 'Fine Georgette Chiffon with Micro Pleat Crimping',
        threadCount: '320 Threads Per Inch',
        liningDetails: 'Full soft modal stretch lining for anti-static comfort',
        pocketDepth: 'No pockets to retain ultra-light circular swirl',
        pincodeDeliveryEstimate: 'Express priority air shipping (delivered in 24-48 hrs)',
        trueToSizeMetrics: { tight: 4, trueToSize: 91, loose: 5 },
        modelStats: {
            height: '5\'7" (170 cm)',
            bust: '33 in (84 cm)',
            waist: '24 in (61 cm)',
            hips: '34 in (86 cm)',
            sizeWorn: 'XS'
        },
        originStory: 'Each tier is circular cut to produce bouncy, dynamic 360-degree twirl.',
        careInstructions: 'Hand wash cold or gentle machine wash inside a laundry mesh bag. Hang dry.',
        measurementTable: [
            { size: 'XS', bust: '31-33 in', waist: '24-26 in', hip: 'Free', length: '32.5 in' },
            { size: 'S', bust: '33-35 in', waist: '26-28 in', hip: 'Free', length: '33.0 in' },
            { size: 'M', bust: '35-37 in', waist: '28-30 in', hip: 'Free', length: '33.5 in' },
            { size: 'L', bust: '38-40 in', waist: '31-33 in', hip: 'Free', length: '34.0 in' }
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: [
            { 
                name: 'Blush Blossom', 
                hex: '#E8B4B8', 
                image: '/images/products/short_flared_1.jpg' 
            }
        ],
        images: [
            { 
                angle: 'Front Tiered Flared Short Skater Portrait', 
                url: '/images/products/short_flared_1.jpg',
                label: '01 Skater Front'
            },
            { 
                angle: 'Sweetheart Bodice Structure & Flutter Sleeve Zoom', 
                url: '/images/products/short_flared_1.jpg',
                label: '02 Sweetheart Bust'
            },
            { 
                angle: 'Fine Chiffon Crepe Swatch Texture Zoom', 
                url: '/images/products/short_flared_1.jpg',
                label: '03 Chiffon Texture'
            },
            { 
                angle: 'Flared Hemline Circular Movement', 
                url: '/images/products/short_flared_1.jpg',
                label: '04 Flare Motion'
            },
            { 
                angle: 'Party Soirée Studio Stride', 
                url: '/images/products/short_flared_1.jpg',
                label: '05 Studio Stride'
            }
        ],
        videoUrl: HIGH_END_VIDEOS.walk1,
        completeLookItems: ['tp-crop-top', 'dr-minimal-midi']
    },

    // 5. CASUAL MIDI DRESS
    {
        id: 'dr-casual-midi',
        category: 'dresses',
        subCategory: 'casual-midi',
        styleTag: 'Casual midi dress',
        name: 'Sage Green Button-Down Cotton Casual Shirt Midi Dress',
        brand: 'TISUTA DAILY',
        description: 'The definitive daily luxury dress. Spun from 100% high-thread-count organic cotton poplin for a crisp, breathable drape that remains immaculate all day long. Styled with a notched convertible collar, button placket, self-fabric sash belt, deep practical in-seam pockets, and rolled three-quarter sleeves.',
        price: 899,
        mrp: 1799,
        discount: 50,
        rating: 4.86,
        reviewCount: 312,
        stockCount: 30,
        isNewArrival: false,
        editTag: 'Best Seller',
        fabric: '100% GOTS-Certified Organic Cotton Poplin (140 GSM)',
        fit: 'Relaxed Tailored with Cinchable Waist Sash Tie',
        neckline: 'Convertible Pointed Shirt Collar',
        sleeve: 'Three-Quarter Sleeve with Buttoned Tab Roll-Up',
        length: 'Midi (43 in / 109 cm)',
        occasion: 'Daily Workwear, Weekend Travel, Casual Meetings, Alfresco Dining',
        stretchFactor: 'Natural 100% Cotton Fiber (Zero Synthetics, Breathable)',
        transparency: '100% Opaque High-Density Weave',
        weight: '330 grams',
        weaveType: 'Fine Combed Compact Poplin Weave',
        threadCount: '350 Threads Per Inch',
        liningDetails: 'Unlined for featherlight summer breathability',
        pocketDepth: '9 inches (Dual Reinforced In-Seam Pockets)',
        pincodeDeliveryEstimate: 'Standard fast delivery within 48-72 hours across 25,000+ pincodes',
        trueToSizeMetrics: { tight: 2, trueToSize: 94, loose: 4 },
        modelStats: {
            height: '5\'8" (173 cm)',
            bust: '34 in (86 cm)',
            waist: '26 in (66 cm)',
            hips: '36 in (91 cm)',
            sizeWorn: 'S'
        },
        originStory: 'Woven with extra-long staple organic cotton yarn for crisp all-day elegance.',
        careInstructions: 'Machine wash warm (40°C). Tumble dry medium. Warm steam iron for razor-sharp collar crispness.',
        measurementTable: [
            { size: 'XS', bust: '34 in', waist: '30 in', hip: '38 in', length: '42.5 in' },
            { size: 'S', bust: '36 in', waist: '32 in', hip: '40 in', length: '43.0 in' },
            { size: 'M', bust: '38 in', waist: '34 in', hip: '42 in', length: '43.5 in' },
            { size: 'L', bust: '41 in', waist: '37 in', hip: '45 in', length: '44.0 in' },
            { size: 'XL', bust: '44 in', waist: '40 in', hip: '48 in', length: '44.5 in' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { 
                name: 'Sage Olive Green', 
                hex: '#7A8B7B', 
                image: '/images/products/casual_midi_1.jpg' 
            }
        ],
        images: [
            { 
                angle: 'Front Full Stride with Cinched Belt and Hands in Pockets', 
                url: '/images/products/casual_midi_1.jpg',
                label: '01 Casual Front'
            },
            { 
                angle: 'Pointed Collar & Button Placket Detail', 
                url: '/images/products/casual_midi_1.jpg',
                label: '02 Collar Detail'
            },
            { 
                angle: '100% Organic Poplin Cotton Texture Macro Zoom', 
                url: '/images/products/casual_midi_1.jpg',
                label: '03 Poplin Texture'
            },
            { 
                angle: 'Deep Side Pocket & Relaxed Casual Drape', 
                url: '/images/products/casual_midi_1.jpg',
                label: '04 Pocket Detail'
            },
            { 
                angle: 'Everyday Relaxed Stride & Hemline Flow', 
                url: '/images/products/casual_midi_1.jpg',
                label: '05 Full Stride'
            }
        ],
        videoUrl: HIGH_END_VIDEOS.walk2,
        completeLookItems: ['dr-aline-dress', 'tp-fitted-basic']
    },

    // 6. FITTED BASIC TOP
    {
        id: 'tp-fitted-basic',
        category: 'tops',
        subCategory: 'fitted-basic',
        styleTag: 'Fitted basic top',
        name: 'Essential Black Ribbed Second-Skin Fitted Basic Top',
        brand: 'TISUTA ESSENTIALS',
        description: 'Engineered as the quintessential second-skin foundational layer. Spun from ultra-fine micro-modal with 7% Lycra spandex in a compact 2x2 vertical rib. Contours the waist with gentle compressive hold without squeezing or rolling up, styled with a clean double-bound crew neck and long fitted sleeves.',
        price: 499,
        mrp: 999,
        discount: 50,
        rating: 4.93,
        reviewCount: 428,
        stockCount: 45,
        isNewArrival: true,
        editTag: 'Under ₹499',
        fabric: '93% Micro-Modal, 7% Lycra Spandex (260 GSM Heavy Rib)',
        fit: 'Sculpted Bodycon Contour Fit with 4-Way Stretch',
        neckline: 'Double-Layered Bound Crew Neckline',
        sleeve: 'Full Length Fitted Long Sleeve',
        length: 'Tuckable Hip Length (23 in / 58 cm)',
        occasion: 'Layering Foundation, Executive Blazer Base, Casual Chic, Capsule Wardrobe',
        stretchFactor: 'Ultra 4-Way High Recovery Stretch (Retains 100% Shape)',
        transparency: '100% Solid Non-Sheer Even When Fully Stretched',
        weight: '190 grams',
        weaveType: '2x2 High-Gauge Circular Rib Knit',
        threadCount: 'High Density 40-Gauge Knit',
        liningDetails: 'Self-faced neckband for smooth anti-chafing contact',
        pocketDepth: 'No pockets',
        pincodeDeliveryEstimate: 'Next-day courier dispatch with signature white-glove packaging',
        trueToSizeMetrics: { tight: 4, trueToSize: 94, loose: 2 },
        modelStats: {
            height: '5\'8" (173 cm)',
            bust: '34 in (86 cm)',
            waist: '25 in (64 cm)',
            sizeWorn: 'S'
        },
        originStory: 'Knitted on high-gauge circular knitting machines for zero-pilling durability.',
        careInstructions: 'Cold gentle machine wash. Lay flat to dry to preserve rib elasticity. Do not bleach.',
        measurementTable: [
            { size: 'XS', bust: '30-32 in', waist: '24-26 in', length: '22.5 in' },
            { size: 'S', bust: '32-34 in', waist: '26-28 in', length: '23.0 in' },
            { size: 'M', bust: '34-36 in', waist: '28-30 in', length: '23.5 in' },
            { size: 'L', bust: '37-40 in', waist: '31-34 in', length: '24.0 in' },
            { size: 'XL', bust: '41-44 in', waist: '35-38 in', length: '24.5 in' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { 
                name: 'Onyx Noir', 
                hex: '#121212', 
                image: '/images/products/fitted_basic_1.jpg' 
            }
        ],
        images: [
            { 
                angle: 'Front Sculpted Torso Fit & Second-Skin Profile', 
                url: '/images/products/fitted_basic_1.jpg',
                label: '01 Ribbed Front'
            },
            { 
                angle: '2x2 Micro-Modal Vertical Rib Knit Texture Zoom', 
                url: '/images/products/fitted_basic_1.jpg',
                label: '02 Rib Texture'
            },
            { 
                angle: 'Side Seam Stretch & Natural Waist Contour', 
                url: '/images/products/fitted_basic_1.jpg',
                label: '03 Waist Fit'
            },
            { 
                angle: 'Crew Neckline Double-Bound Clean Stitch Finish', 
                url: '/images/products/fitted_basic_1.jpg',
                label: '04 Crew Neck'
            },
            { 
                angle: 'Tailored Trouser Styling Stride', 
                url: '/images/products/fitted_basic_1.jpg',
                label: '05 Styled Look'
            }
        ],
        videoUrl: HIGH_END_VIDEOS.walk2,
        completeLookItems: ['dr-aline-dress', 'dr-short-flared']
    },

    // 7. OFF SHOULDER TOP
    {
        id: 'tp-off-shoulder',
        category: 'tops',
        subCategory: 'off-shoulder',
        styleTag: 'Off shoulder top',
        name: 'Burgundy Foldover Bardot Ruched Off-Shoulder Top',
        brand: 'TISUTA PRIVÉ',
        description: 'Dramatic collarbone-framing foldover Bardot neckline crafted in premium double-knit stretch viscose jersey. Features an elegant wide foldover band that sits securely across the shoulders, long fitted sleeves, and a contouring bodycon silhouette in rich royal burgundy.',
        price: 699,
        mrp: 1399,
        discount: 50,
        rating: 4.94,
        reviewCount: 216,
        stockCount: 20,
        isNewArrival: true,
        editTag: 'Under ₹699',
        fabric: '92% Silky Viscose, 8% Spandex (240 GSM)',
        fit: 'Ruched Body-Hugging Contour Fit',
        neckline: 'Wide Foldover Bardot Off-Shoulder with Silicone Grip Ribbon',
        sleeve: 'Elongated Fitted Long Sleeves',
        length: 'Regular Hip Length (22 in / 56 cm)',
        occasion: 'Date Night, Evening Cocktail, Rooftop Lounge, Dinner Soirée, Gala Afterparty',
        stretchFactor: '4-Way High Recovery Stretch (Stays in Place Effortlessly)',
        transparency: 'Double-Layered Front (100% Non-Sheer)',
        weight: '230 grams',
        weaveType: 'Silky Double-Interlock Stretch Jersey',
        threadCount: '380 Threads Per Inch',
        liningDetails: 'Double-fronted for opaque coverage without bra lines',
        pocketDepth: 'No pockets',
        pincodeDeliveryEstimate: 'Express priority air shipping (delivered in 24-48 hrs)',
        trueToSizeMetrics: { tight: 5, trueToSize: 91, loose: 4 },
        modelStats: {
            height: '5\'9" (175 cm)',
            bust: '34 in (86 cm)',
            waist: '25 in (64 cm)',
            sizeWorn: 'S'
        },
        originStory: 'Specially engineered silicone grip ribbon inside foldover prevents slipping when raising arms.',
        careInstructions: 'Machine wash delicate cold. Reshape and dry flat. Do not hang while wet.',
        measurementTable: [
            { size: 'XS', bust: '31-33 in', waist: '24-26 in', length: '21.5 in' },
            { size: 'S', bust: '33-35 in', waist: '26-28 in', length: '22.0 in' },
            { size: 'M', bust: '35-37 in', waist: '28-30 in', length: '22.5 in' },
            { size: 'L', bust: '38-41 in', waist: '31-34 in', length: '23.0 in' }
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: [
            { 
                name: 'Royal Burgundy', 
                hex: '#581845', 
                image: '/images/products/off_shoulder_1.jpg' 
            }
        ],
        images: [
            { 
                angle: 'Front Collarbone-Framing Foldover Bardot Portrait', 
                url: '/images/products/off_shoulder_1.jpg',
                label: '01 Bardot Front'
            },
            { 
                angle: 'Foldover Band & Non-Slip Shoulder Fit Detail', 
                url: '/images/products/off_shoulder_1.jpg',
                label: '02 Shoulder Detail'
            },
            { 
                angle: 'Silky Viscose Jersey Texture & Luster Macro Zoom', 
                url: '/images/products/off_shoulder_1.jpg',
                label: '03 Jersey Macro'
            },
            { 
                angle: 'Fitted Long Sleeve & Midriff Contour', 
                url: '/images/products/off_shoulder_1.jpg',
                label: '04 Sleeve Contour'
            },
            { 
                angle: 'Evening Soirée Studio Stance with Tailored Pants', 
                url: '/images/products/off_shoulder_1.jpg',
                label: '05 Full Look'
            }
        ],
        videoUrl: HIGH_END_VIDEOS.walk1,
        completeLookItems: ['dr-slip-style', 'tp-crop-top']
    },

    // 8. CROP TOP
    {
        id: 'tp-crop-top',
        category: 'tops',
        subCategory: 'crop-top',
        styleTag: 'Crop top',
        name: 'Camel Square-Neck Ottoman Ribbed Crop Top',
        brand: 'TISUTA RUNWAY',
        description: 'Architectural sharp square neckline paired with 35mm wide supportive straps in double-knit structured cotton rib. Sculpted cropped silhouette designed to pair flawlessly with high-waist trousers and skirts, crafted in warm camel beige.',
        price: 399,
        mrp: 899,
        discount: 55,
        rating: 4.88,
        reviewCount: 310,
        stockCount: 25,
        isNewArrival: false,
        editTag: 'Under ₹399',
        fabric: '95% Compact Ring-Spun Cotton, 5% Elastane (280 GSM Heavyweight)',
        fit: 'Sculpted Cropped Silhouette with Waist Framing',
        neckline: 'Architectural Geometric Square Neckline',
        sleeve: 'Sleeveless with Wide 35mm Bra-Concealing Straps',
        length: 'Cropped Midriff (16 in / 40 cm)',
        occasion: 'High-Waist Pairing, Summer Festival, Resort Vacations, City Chic',
        stretchFactor: 'Firm Double-Knit Compression Stretch',
        transparency: '100% Solid Non-Transparent (Zero Underwear Shadows)',
        weight: '160 grams',
        weaveType: 'Heavy Ottoman Rib with Elastic Core',
        threadCount: '340 Threads Per Inch',
        liningDetails: 'Self-lined front bustier panel for zero sheer risk',
        pocketDepth: 'No pockets',
        pincodeDeliveryEstimate: 'Next-day courier dispatch with signature white-glove packaging',
        trueToSizeMetrics: { tight: 4, trueToSize: 93, loose: 3 },
        modelStats: {
            height: '5\'8" (173 cm)',
            bust: '33 in (84 cm)',
            waist: '24 in (61 cm)',
            sizeWorn: 'S'
        },
        originStory: 'Ring-spun combed yarn prevents stretching out at the square corners.',
        careInstructions: 'Machine wash cold with like colors. Tumble dry low.',
        measurementTable: [
            { size: 'XS', bust: '30-32 in', length: '15.5 in' },
            { size: 'S', bust: '32-34 in', length: '16.0 in' },
            { size: 'M', bust: '34-36 in', length: '16.5 in' },
            { size: 'L', bust: '37-40 in', length: '17.0 in' }
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: [
            { 
                name: 'Warm Camel', 
                hex: '#C19A6B', 
                image: '/images/products/crop_top_1.jpg' 
            }
        ],
        images: [
            { 
                angle: 'Front Architectural Square Neckline View', 
                url: '/images/products/crop_top_1.jpg',
                label: '01 Square Front'
            },
            { 
                angle: 'Wide Shoulder Straps & Clean Neckline Seams', 
                url: '/images/products/crop_top_1.jpg',
                label: '02 Straps Detail'
            },
            { 
                angle: 'Heavyweight 280 GSM Ottoman Rib Zoom', 
                url: '/images/products/crop_top_1.jpg',
                label: '03 Rib Texture'
            },
            { 
                angle: 'Waist-Framing Cropped Hemline Cut', 
                url: '/images/products/crop_top_1.jpg',
                label: '04 Hemline Cut'
            },
            { 
                angle: 'High-Waisted Trouser Outfit Combination', 
                url: '/images/products/crop_top_1.jpg',
                label: '05 High-Waist Fit'
            }
        ],
        videoUrl: HIGH_END_VIDEOS.walk3,
        completeLookItems: ['dr-short-flared', 'dr-aline-dress']
    },

    // 9. NET ER TOP (NET SHEER TOP)
    {
        id: 'tp-net-sheer',
        category: 'tops',
        subCategory: 'net-top',
        styleTag: 'Net er top',
        name: 'Black Sheer Embroidered Botanical Mesh Net Er Top',
        brand: 'ATELIER TISUTA',
        description: 'Haute couture craftsmanship. Intricate botanical ivy filigree hand-embroidered onto sheer French illusion tulle netting. Features sheer mesh sleeves, high mock neckline, and comes paired with an integrated opaque black camisole base lining for modest elegance.',
        price: 799,
        mrp: 1599,
        discount: 50,
        rating: 4.97,
        reviewCount: 198,
        stockCount: 15,
        isNewArrival: true,
        editTag: 'Under ₹799',
        fabric: 'Sheer Illusion Tulle Net with Rayon Floral Threadwork + Modal Camisole Base',
        fit: 'Regular Sheer Drape with High Neck',
        neckline: 'High Mock Neckline with Velvet Binding',
        sleeve: 'Full Sheer Mesh Sleeves with Floral Motifs',
        length: 'Regular (23 in / 58 cm)',
        occasion: 'Evening Soirée, Art Gala, Festive Cocktail, High Fashion Dinner, Holiday Party',
        stretchFactor: 'Delicate Tulle Mesh Natural Mechanical Stretch',
        transparency: 'Sheer Illusion Netting (Includes Integrated Opaque Camisole Base)',
        weight: '145 grams',
        weaveType: 'Ultra-Fine Hexagonal Illusion Tulle Mesh',
        threadCount: '240,000 Precision Embroidery Stitches Per Garment',
        liningDetails: 'Includes separate 100% modal camisole base',
        pocketDepth: 'No pockets',
        pincodeDeliveryEstimate: 'Express priority air shipping (delivered in 24-48 hrs)',
        trueToSizeMetrics: { tight: 3, trueToSize: 94, loose: 3 },
        modelStats: {
            height: '5\'10" (178 cm)',
            bust: '33 in (84 cm)',
            waist: '25 in (64 cm)',
            sizeWorn: 'S'
        },
        originStory: 'Each floral filigree pattern requires 240,000 embroidery stitches on fine tulle frames.',
        careInstructions: 'Dry clean recommended or hand wash with extreme care in cold water. Do not twist.',
        measurementTable: [
            { size: 'XS', bust: '32 in', shoulder: '14.0 in', sleeve: '23.5 in', length: '22.5 in' },
            { size: 'S', bust: '34 in', shoulder: '14.5 in', sleeve: '24.0 in', length: '23.0 in' },
            { size: 'M', bust: '36 in', shoulder: '15.0 in', sleeve: '24.5 in', length: '23.5 in' },
            { size: 'L', bust: '39 in', shoulder: '15.5 in', sleeve: '25.0 in', length: '24.0 in' }
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: [
            { 
                name: 'Obsidian Sheer', 
                hex: '#1C1C1C', 
                image: '/images/products/net_top_1.jpg' 
            }
        ],
        images: [
            { 
                angle: 'Full Front Sheer Botanical Embroidery Portrait', 
                url: '/images/products/net_top_1.jpg',
                label: '01 Sheer Front'
            },
            { 
                angle: 'Macro Zoom of French Illusion Tulle Netting & Threadwork', 
                url: '/images/products/net_top_1.jpg',
                label: '02 Netting Macro'
            },
            { 
                angle: 'Sheer Sleeves & Floral Lace Motifs', 
                url: '/images/products/net_top_1.jpg',
                label: '03 Sleeve Detail'
            },
            { 
                angle: 'High Mock Neckline & Clean Keyhole Finish', 
                url: '/images/products/net_top_1.jpg',
                label: '04 Mock Neck'
            },
            { 
                angle: 'Layered over Camisole Styling Stride', 
                url: '/images/products/net_top_1.jpg',
                label: '05 Layered Look'
            }
        ],
        videoUrl: HIGH_END_VIDEOS.walk2,
        completeLookItems: ['dr-minimal-midi', 'dr-slip-style']
    },

    // 10. MODERN LONG KURTI
    {
        id: 'eth-long-kurti',
        category: 'ethnic',
        subCategory: 'modern-long-kurti',
        styleTag: 'Modern long Kurti',
        name: 'Teal Blue High-Slit Straight-Cut Modern Long Kurti',
        brand: 'TISUTA HERITAGE',
        description: 'Contemporary calf-length Indian kurti designed with clean thigh-high side slits for dramatic movement. Crafted from featherweight Chanderi georgette with an inner breathable cotton voile lining. Accentuated with subtle gold zari thread piping along the Mandarin collar placket and sleeve borders.',
        price: 849,
        mrp: 1699,
        discount: 50,
        rating: 4.91,
        reviewCount: 382,
        stockCount: 28,
        isNewArrival: true,
        editTag: 'Modern Ethnic',
        fabric: 'Chanderi Poly-Georgette with Soft Pure Cotton Voile Lining',
        fit: 'Straight Cut with Dramatic Thigh-High Side Slits for Free Stride',
        neckline: 'Mandarin Collar with Placket V-Notch and Bullion Zari Piping',
        sleeve: 'Three-Quarter Sleeves with Gold Border Piping',
        length: 'Long Calf Length (46 in / 117 cm)',
        occasion: 'Festive Office, Diwali Gathering, Puja Soirée, Contemporary Ethnic Events',
        stretchFactor: 'Zero Stretch Structured Flowing Drape',
        transparency: '100% Opaque (Fully Lined with Pure Cotton Voile)',
        weight: '320 grams',
        weaveType: 'Chanderi Georgette with Metallic Zari Weft',
        threadCount: '360 Threads Per Inch',
        liningDetails: '100% fine cotton voile lining extends to knee height',
        pocketDepth: 'No pockets for crisp uninterrupted vertical drape',
        pincodeDeliveryEstimate: 'Express priority air shipping (delivered in 24-48 hrs)',
        trueToSizeMetrics: { tight: 3, trueToSize: 94, loose: 3 },
        modelStats: {
            height: '5\'8" (173 cm)',
            bust: '34 in (86 cm)',
            waist: '26 in (66 cm)',
            hips: '37 in (94 cm)',
            sizeWorn: 'S'
        },
        originStory: 'Designed to blend Indo-Western fluid aesthetics with artisanal Indian collar needlework.',
        careInstructions: 'Gentle hand wash in cold water or mild dry clean. Iron on silk setting inside out.',
        measurementTable: [
            { size: 'S', bust: '36 in', waist: '32 in', hip: '38 in', length: '46 in' },
            { size: 'M', bust: '38 in', waist: '34 in', hip: '40 in', length: '46 in' },
            { size: 'L', bust: '40 in', waist: '36 in', hip: '42 in', length: '46 in' },
            { size: 'XL', bust: '43 in', waist: '39 in', hip: '45 in', length: '46 in' },
            { size: 'XXL', bust: '46 in', waist: '42 in', hip: '48 in', length: '46 in' }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { 
                name: 'Royal Teal', 
                hex: '#005F73', 
                image: '/images/products/modern_long_kurti_1.jpg' 
            }
        ],
        images: [
            { 
                angle: 'Front Calf-Length High-Slit Stance Portrait', 
                url: '/images/products/modern_long_kurti_1.jpg',
                label: '01 Long Kurti'
            },
            { 
                angle: 'High Thigh-Length Side Slits & Dramatic Flow in Motion', 
                url: '/images/products/modern_long_kurti_1.jpg',
                label: '02 High Slit'
            },
            { 
                angle: 'Pure Chanderi Silk Zari Weave & Embroidery Macro Zoom', 
                url: '/images/products/modern_long_kurti_1.jpg',
                label: '03 Zari Macro'
            },
            { 
                angle: 'Mandarin Collar Notch with Placket Stitching', 
                url: '/images/products/modern_long_kurti_1.jpg',
                label: '04 Collar Notch'
            },
            { 
                angle: 'Styled with Cigarette Trousers & Footwear', 
                url: '/images/products/modern_long_kurti_1.jpg',
                label: '05 Styled Look'
            }
        ],
        videoUrl: HIGH_END_VIDEOS.walk4,
        completeLookItems: ['eth-short-kurti', 'eth-set-anarkali']
    },

    // 11. SHORT KURTI
    {
        id: 'eth-short-kurti',
        category: 'ethnic',
        subCategory: 'short-kurti',
        styleTag: 'Short kurti',
        name: 'Indigo Hand-Block Printed Mulmul Peplum Short Kurti',
        brand: 'TISUTA HERITAGE',
        description: 'Authentic Bagru hand-block floral printed on 100% featherweight organic mulmul cotton using natural herbal dyes. Styled with a flattering flared empire peplum waist, keyhole neckline, and three-quarter sleeves. Paired effortlessly with palazzos, denims, or cigarette pants.',
        price: 599,
        mrp: 1199,
        discount: 50,
        rating: 4.89,
        reviewCount: 322,
        stockCount: 35,
        isNewArrival: false,
        editTag: 'Under ₹599',
        fabric: '100% Pure Organic Mulmul Cotton (85 GSM Featherweight)',
        fit: 'Empire Waist with Gathered Flared Peplum Hem',
        neckline: 'Round Neck with Keyhole V-Notch',
        sleeve: 'Three-Quarter Sleeves with Border Edging',
        length: 'Short Hip Length (28 in / 71 cm)',
        occasion: 'College Daily, Casual Outings, Festive Brunches, Summer Travel',
        stretchFactor: 'Breathable Natural Cotton Airiness',
        transparency: 'Soft Natural Opacity (Double Gauze Mulmul Cotton)',
        weight: '175 grams',
        weaveType: 'Fine 80s Count Pure Mulmul Cotton Weave',
        threadCount: '280 Threads Per Inch',
        liningDetails: 'Unlined for maximum thermal regulation & breathability',
        pocketDepth: 'No pockets',
        pincodeDeliveryEstimate: 'Standard fast delivery within 48-72 hours across 25,000+ pincodes',
        trueToSizeMetrics: { tight: 2, trueToSize: 95, loose: 3 },
        modelStats: {
            height: '5\'6" (168 cm)',
            bust: '33 in (84 cm)',
            waist: '25 in (64 cm)',
            sizeWorn: 'S'
        },
        originStory: 'Hand-stamped with teak-wood blocks by artisan master printers in Bagru, Rajasthan.',
        careInstructions: 'First wash separate cold hand wash with rock salt to fix natural dyes. Iron warm.',
        measurementTable: [
            { size: 'XS', bust: '33 in', waist: '28 in', length: '27.5 in' },
            { size: 'S', bust: '35 in', waist: '30 in', length: '28.0 in' },
            { size: 'M', bust: '37 in', waist: '32 in', length: '28.5 in' },
            { size: 'L', bust: '40 in', waist: '35 in', length: '29.0 in' },
            { size: 'XL', bust: '43 in', waist: '38 in', length: '29.5 in' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { 
                name: 'Indigo Flora', 
                hex: '#1D3557', 
                image: '/images/products/short_kurti_1.jpg' 
            }
        ],
        images: [
            { 
                angle: 'Front Peplum Flared Silhouette & Empire Yoke', 
                url: '/images/products/short_kurti_1.jpg',
                label: '01 Peplum Front'
            },
            { 
                angle: 'Teak-Wood Hand-Block Botanical Print Zoom', 
                url: '/images/products/short_kurti_1.jpg',
                label: '02 Block Print'
            },
            { 
                angle: 'Pure Mulmul Cotton Airy Breathable Texture', 
                url: '/images/products/short_kurti_1.jpg',
                label: '03 Mulmul Texture'
            },
            { 
                angle: 'Gathered Empire Waist Flared Hem', 
                url: '/images/products/short_kurti_1.jpg',
                label: '04 Flared Hem'
            },
            { 
                angle: 'Breezy Movement with Wide-Leg White Palazzos', 
                url: '/images/products/short_kurti_1.jpg',
                label: '05 Palazzo Look'
            }
        ],
        videoUrl: HIGH_END_VIDEOS.walk4,
        completeLookItems: ['eth-long-kurti', 'eth-set-anarkali']
    },

    // 12. ETHNIC SETS
    {
        id: 'eth-set-anarkali',
        category: 'ethnic',
        subCategory: 'ethnic-sets',
        styleTag: 'Ethnic sets',
        name: 'Burgundy Zari Gota Patti Anarkali Kurta, Pant & Dupatta Ethnic Set',
        brand: 'TISUTA COUTURE',
        description: 'A magnificent 3-piece royal festive ensemble crafted from rich Chanderi silk. Features a sweeping flared Anarkali with authentic Gota Patti and antique bullion zari threadwork neckline, accompanied by tailored matching cigarette trousers with ankle slits and an embroidered scalloped pure organza dupatta.',
        price: 1999,
        mrp: 4499,
        discount: 55,
        rating: 4.98,
        reviewCount: 426,
        stockCount: 12,
        isNewArrival: true,
        editTag: 'Wedding Trousseau',
        fabric: 'Chanderi Silk Kurta + Matching Cigarette Pant + Scallop Zari Organza Dupatta',
        fit: 'Voluminous Flared Anarkali with Tailored Cigarette Pant',
        neckline: 'Royal Zari Embroidered Yoke Round Neck',
        sleeve: 'Three-Quarter Sleeves with Zari Border Cuffs',
        length: 'Floor Touching (52 in / 132 cm)',
        occasion: 'Wedding Sangeet, Bridal Trousseau, Royal Festive Gala, Reception',
        stretchFactor: 'Structured Pure Silk (No Stretch, Royal Silhouette)',
        transparency: '100% Fully Lined with Pure Santoon Silk',
        weight: '780 grams (Complete 3-Piece Set)',
        weaveType: 'Handloom Chanderi Silk with Zari Warp & Weft',
        threadCount: '480 Threads Per Inch',
        liningDetails: 'Full pure Santoon silk lining throughout Anarkali bodice & flare',
        pocketDepth: 'Concealed deep pocket in right side of cigarette trousers',
        pincodeDeliveryEstimate: 'Next-day courier dispatch with signature white-glove packaging',
        trueToSizeMetrics: { tight: 2, trueToSize: 96, loose: 2 },
        modelStats: {
            height: '5\'9" (175 cm)',
            bust: '34 in (86 cm)',
            waist: '26 in (66 cm)',
            hips: '37 in (94 cm)',
            sizeWorn: 'S'
        },
        originStory: 'Handcrafted with intricate gold zari needlework on rich wine Chanderi silk.',
        careInstructions: 'Strictly dry clean only. Wrap in unbleached pure cotton muslin cloth when storing.',
        measurementTable: [
            { size: 'XS', bust: '33 in', waist: '27 in', pantWaist: '26-28 in', kurtaLength: '51 in' },
            { size: 'S', bust: '35 in', waist: '29 in', pantWaist: '28-30 in', kurtaLength: '52 in' },
            { size: 'M', bust: '37 in', waist: '31 in', pantWaist: '30-32 in', kurtaLength: '52 in' },
            { size: 'L', bust: '40 in', waist: '34 in', pantWaist: '33-35 in', kurtaLength: '53 in' },
            { size: 'XL', bust: '43 in', waist: '37 in', pantWaist: '36-38 in', kurtaLength: '53 in' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { 
                name: 'Burgundy Wine', 
                hex: '#4A1525', 
                image: '/images/products/ethnic_sets_1.jpg' 
            }
        ],
        images: [
            { 
                angle: 'Royal 3-Piece Anarkali Ensemble Full Stance', 
                url: '/images/products/ethnic_sets_1.jpg',
                label: '01 3-Piece Set'
            },
            { 
                angle: 'Scalloped Pure Organza Dupatta Zari Borders in Motion', 
                url: '/images/products/ethnic_sets_1.jpg',
                label: '02 Organza Dupatta'
            },
            { 
                angle: 'Antique Gold Gota Patti & Zari Neckline Embroidery Zoom', 
                url: '/images/products/ethnic_sets_1.jpg',
                label: '03 Zari Macro'
            },
            { 
                angle: 'Sweeping Flared Anarkali Silhouette & Trousers', 
                url: '/images/products/ethnic_sets_1.jpg',
                label: '04 Anarkali Flare'
            },
            { 
                angle: 'Regal Heritage Gala Portrait in Royal Evening Setting', 
                url: '/images/products/ethnic_sets_1.jpg',
                label: '05 Royal Portrait'
            }
        ],
        videoUrl: HIGH_END_VIDEOS.walk4,
        completeLookItems: ['eth-long-kurti', 'eth-short-kurti']
    }
];

export const CATEGORIES = [
    { id: 'all', name: 'All Collections' },
    { id: 'dresses', name: 'Dresses & One-Pieces' },
    { id: 'tops', name: 'Tops & Blouses' },
    { id: 'ethnic', name: 'Kurtis & Royal Ethnic Sets' }
];

export const SUB_CATEGORIES = [
    { id: 'all', name: 'All Silhouettes' },
    { id: 'minimal-midi', name: 'Minimal Midi Dress' },
    { id: 'slip-style', name: 'Slip Style Dresses' },
    { id: 'aline-dress', name: 'A Line Dress' },
    { id: 'short-flared', name: 'Short Length Flared One Piece' },
    { id: 'casual-midi', name: 'Casual Midi Dress' },
    { id: 'fitted-basic', name: 'Fitted Basic Top' },
    { id: 'off-shoulder', name: 'Off Shoulder Top' },
    { id: 'crop-top', name: 'Crop Top' },
    { id: 'net-top', name: 'Net Er Top' },
    { id: 'modern-long-kurti', name: 'Modern Long Kurti' },
    { id: 'short-kurti', name: 'Short Kurti' },
    { id: 'ethnic-sets', name: 'Ethnic Sets' }
];

export const heroSlides = [
    {
        title: 'DEFINE YOUR\nSTYLE.',
        subtitle: 'Where Haute Fashion Meets Personal AI Intelligence. Minimal Midi, Slip Dresses, Flared One Pieces & Designer Tops.',
        tag: 'FW/26 EDITORIAL RUNWAY',
        video: HIGH_END_VIDEOS.walk1,
        fallbackImage: '/images/products/minimal_midi_1.jpg',
        cta: 'SHOP DRESSES',
        ctaCategory: 'dresses'
    },
    {
        title: 'THE ROYAL\nETHNIC EDIT',
        subtitle: 'Handwoven Chanderi, contemporary long kurtis, peplum short kurtis & regal Anarkali sets.',
        tag: 'FESTIVE TROUSSEAU 2026',
        video: HIGH_END_VIDEOS.walk4,
        fallbackImage: '/images/products/ethnic_sets_1.jpg',
        cta: 'EXPLORE ETHNIC',
        ctaCategory: 'ethnic'
    }
];

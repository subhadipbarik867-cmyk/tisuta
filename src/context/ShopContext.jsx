import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as initialProducts } from '../data/productsData';
import confetti from 'canvas-confetti';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    // Products State (Admin editable & persistent)
    const CURRENT_DATA_VERSION = 'tisuta_v6_real_shopping_catalog_prices';
    const [products, setProducts] = useState(() => {
        try {
            const version = localStorage.getItem('tisuta_data_version');
            if (version === CURRENT_DATA_VERSION) {
                const saved = localStorage.getItem('tisuta_products');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed) && parsed.length >= initialProducts.length) {
                        return parsed;
                    }
                }
            } else {
                localStorage.setItem('tisuta_data_version', CURRENT_DATA_VERSION);
                localStorage.setItem('tisuta_products', JSON.stringify(initialProducts));
            }
        } catch (e) {
            console.error('Error loading products from localStorage:', e);
        }
        return initialProducts;
    });

    // Cart State
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem('tisuta_cart');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.product?.id) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error('Error loading cart from localStorage:', e);
        }
        return [
            {
                product: initialProducts[0],
                size: 'M',
                color: initialProducts[0].colors[0],
                quantity: 1
            }
        ];
    });

    // Active Coupon Code
    const [activeCoupon, setActiveCoupon] = useState({
        code: 'TISUTA10',
        discountPercent: 10,
        flatDiscount: 0,
        description: '10% Privé Welcome Discount'
    });

    // Gift Wrap Option
    const [giftWrap, setGiftWrap] = useState({
        enabled: false,
        message: 'With love and style from TISUTA Privé.',
        cost: 250
    });

    // Wishlist State (Array of product IDs)
    const [wishlist, setWishlist] = useState(() => {
        try {
            const saved = localStorage.getItem('tisuta_wishlist');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) return parsed;
            }
        } catch (e) { }
        return ['dr-minimal-midi', 'dr-slip-style', 'eth-set-anarkali'];
    });

    // Wishlist Custom Collections
    const [wishlistCollections, setWishlistCollections] = useState(() => {
        try {
            const saved = localStorage.getItem('tisuta_wishlist_collections');
            if (saved) return JSON.parse(saved);
        } catch (e) { }
        return {
            'All Saved': ['dr-minimal-midi', 'dr-slip-style', 'eth-set-anarkali'],
            'Wedding & Sangeet': ['eth-set-anarkali', 'dr1'],
            'Date Night': ['dr-slip-style', 'tp-off-shoulder'],
            'Executive Office': ['dr-minimal-midi', 'tp-fitted-basic']
        };
    });

    // Comparison List (Max 4 products)
    const [compareProducts, setCompareProducts] = useState([]);
    const [isCompareOpen, setIsCompareOpen] = useState(false);

    // Virtual Fit Saved Looks & User Body Profile
    const [savedLooks, setSavedLooks] = useState(() => {
        const saved = localStorage.getItem('tisuta_saved_looks');
        return saved ? JSON.parse(saved) : [
            {
                id: 'look-101',
                date: '2026-10-02',
                outfitName: 'Minimal Ivory Silhouette Fit',
                productId: 'dr-minimal-midi',
                fitScore: 98,
                recommendedSize: 'M',
                previewImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
            },
            {
                id: 'look-102',
                date: '2026-09-29',
                outfitName: 'Italian Satin Cowl Evening Fit',
                productId: 'dr-slip-style',
                fitScore: 96,
                recommendedSize: 'S',
                previewImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop'
            }
        ];
    });

    const [fitProfile, setFitProfile] = useState({
        height: '168 cm',
        weight: '58 kg',
        bust: '34 in',
        waist: '27 in',
        hips: '36 in',
        bodyShape: 'Hourglass',
        preferredFit: 'Regular',
        avatarType: 'photorealistic'
    });

    // Orders State
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('tisuta_orders');
        return saved ? JSON.parse(saved) : [
            {
                id: 'ORD-TIS-98214',
                date: '2026-10-01',
                status: 'shipped', // placed -> confirmed -> packed -> shipped -> in_transit -> out_for_delivery -> delivered
                statusStep: 3,
                total: 4299,
                estimatedDelivery: 'Oct 08, 2026',
                items: [
                    {
                        product: initialProducts.find(p => p.id === 'eth-set-anarkali') || initialProducts[0],
                        size: 'M',
                        color: { name: 'Imperial Gold', hex: '#C5A059' },
                        quantity: 1
                    }
                ],
                shippingAddress: {
                    fullName: 'Ananya Roy',
                    addressLine: 'Apt 4B, Empire Heights, Bandra West',
                    city: 'Mumbai',
                    pincode: '400050',
                    phone: '+91 98765 43210'
                },
                paymentMethod: 'UPI (Google Pay)',
                courier: 'Blue Dart Luxury Express (Tracking: BD8841294)'
            },
            {
                id: 'ORD-TIS-88120',
                date: '2026-09-24',
                status: 'delivered',
                statusStep: 5,
                total: 3499,
                estimatedDelivery: 'Sep 27, 2026',
                items: [
                    {
                        product: initialProducts[0],
                        size: 'M',
                        color: initialProducts[0].colors[0],
                        quantity: 1
                    }
                ],
                shippingAddress: {
                    fullName: 'Ananya Roy',
                    addressLine: 'Apt 4B, Empire Heights, Bandra West',
                    city: 'Mumbai',
                    pincode: '400050',
                    phone: '+91 98765 43210'
                },
                paymentMethod: 'Credit Card (Tokenized)',
                courier: 'Blue Dart Express (Delivered Sep 27)'
            }
        ];
    });

    // Returns & Exchanges Requests
    const [returns, setReturns] = useState([
        {
            returnId: 'RET-TIS-1042',
            orderId: 'ORD-TIS-88120',
            item: 'The Alix Minimalist Silk-Georgette Midi Dress',
            reason: 'Size exchange for a tighter silhouette fit',
            requestedType: 'Exchange (Size S)',
            status: 'Approved - Courier Pickup Scheduled for Tomorrow',
            trackingNumber: 'RET-BD-90214'
        }
    ]);

    // Loyalty Rewards Program
    const [loyalty, setLoyalty] = useState({
        tier: 'Royal Privé',
        pointsBalance: 2450, // 1 point = ₹1
        lifetimePoints: 8900,
        nextTierThreshold: 10000,
        perks: [
            'Complimentary Master Atelier Alterations',
            '2-Hour Express VIP White Glove Delivery',
            'Dedicated 24/7 AI & Human Fashion Concierge',
            'Early Access to Paris & Milan Runway Drops'
        ]
    });

    // Active User State
    const [user, setUser] = useState({
        isLoggedIn: true,
        name: 'Ananya Roy',
        email: 'ananya.roy@tisuta.com',
        phone: '+91 98765 43210',
        membershipTier: 'Royal Privé',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        addresses: [
            {
                id: 'addr-1',
                title: 'Bandra Residence',
                fullName: 'Ananya Roy',
                addressLine: 'Apt 4B, Empire Heights, Turner Road, Bandra West',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400050',
                phone: '+91 98765 43210',
                isDefault: true
            },
            {
                id: 'addr-2',
                title: 'South Delhi Penthouse',
                fullName: 'Ananya Roy',
                addressLine: '12 Golf Links, Lodhi Road',
                city: 'New Delhi',
                state: 'Delhi',
                pincode: '110003',
                phone: '+91 98765 43210',
                isDefault: false
            }
        ]
    });

    // TISUTA Styleboards (Scrapbook Community)
    const [styleboards, setStyleboards] = useState([
        {
            id: 'sb-1',
            title: 'Chic Parisian Gallery Opening',
            creator: 'Maya Sen',
            creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
            likes: 428,
            isLiked: false,
            items: ['dr-minimal-midi', 'dr-slip-style', 'tp-fitted-basic', 'tp-off-shoulder'],
            bgMood: 'Champagne Studio',
            date: '2 hours ago'
        },
        {
            id: 'sb-2',
            title: 'Royal Sangeet Evening Gala',
            creator: 'Natasha Roy',
            creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
            likes: 689,
            isLiked: true,
            items: ['eth-set-anarkali', 'eth-long-kurti', 'eth-short-kurti'],
            bgMood: 'Royal Gold Velvet',
            date: 'Yesterday'
        }
    ]);

    // Social Creators
    const [creators, setCreators] = useState([
        {
            id: 'cr-1',
            name: 'Maya Sen',
            handle: '@mayasen_couture',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
            followers: '124K',
            isFollowing: true,
            bio: 'Minimalist silhouette curator & TISUTA Atelier Ambassador. Paris • Mumbai',
            looksCount: 42,
            commissionTier: 'Pro Partner (12%)'
        },
        {
            id: 'cr-2',
            name: 'Natasha Roy',
            handle: '@natasharoy_style',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
            followers: '89K',
            isFollowing: false,
            bio: 'Heritage ethnic revivalist. Transforming traditional weaves into modern luxury.',
            looksCount: 38,
            commissionTier: 'Elite Partner (15%)'
        }
    ]);

    // Notifications Center
    const [notifications, setNotifications] = useState([
        {
            id: 'notif-1',
            type: 'order',
            title: 'Order ORD-TIS-98214 in Transit',
            description: 'Your royal Anarkali set has arrived at the Mumbai Sorting Hub via Blue Dart.',
            time: '15m ago',
            read: false
        },
        {
            id: 'notif-2',
            type: 'price_drop',
            title: 'Price Drop Alert on Wishlist Item',
            description: 'Sora Cowl-Neck Slip Dress is now ₹2,899 (Was ₹4,499).',
            time: '2h ago',
            read: false
        },
        {
            id: 'notif-3',
            type: 'creator',
            title: 'Maya Sen published a new Styleboard',
            description: 'Explore "Chic Parisian Gallery Opening" and shop the full look.',
            time: '4h ago',
            read: true
        }
    ]);

    // Customer Support Tickets
    const [supportTickets, setSupportTickets] = useState([
        {
            id: 'TCK-8812',
            subject: 'Complimentary Hem Alteration Request',
            status: 'In Progress with Master Tailor',
            priority: 'VIP',
            date: '2026-10-03'
        }
    ]);

    // Admin State & KPIs
    const [adminMode, setAdminMode] = useState(false);
    const [adminState, setAdminState] = useState({
        revenue: 4892400,
        totalOrders: 342,
        customers: 1280,
        aov: 14300,
        conversionRate: '4.68%',
        returnRate: '1.2%',
        grossMargin: '68.4%',
        virtualFitScans: 1420,
        inventoryValue: 18240000,
        warehouses: [
            { name: 'Mumbai Central Hub (Bhiwandi)', stockUnits: 4200, capacity: '84%' },
            { name: 'Delhi NCR Fulfillment (Gurugram)', stockUnits: 3150, capacity: '72%' },
            { name: 'Bangalore Tech Park Hub', stockUnits: 2800, capacity: '65%' }
        ]
    });

    // UI Modals & Drawers
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isVirtualFitOpen, setIsVirtualFitOpen] = useState(false);
    const [virtualFitProduct, setVirtualFitProduct] = useState(null);
    const [isSizeAdvisorOpen, setIsSizeAdvisorOpen] = useState(false);
    const [sizeAdvisorProduct, setSizeAdvisorProduct] = useState(null);
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [isStylistOpen, setIsStylistOpen] = useState(false);
    const [isStyleboardOpen, setIsStyleboardOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isSupportOpen, setIsSupportOpen] = useState(false);

    // AI Stylist Chat History
    const [stylistChat, setStylistChat] = useState([
        {
            sender: 'ai',
            text: 'Bonjour Ananya. I am your TISUTA Personal Stylist AI. How may I elevate your wardrobe today? You can ask me to style a wedding guest look, an executive board meeting outfit, or find pieces for your body profile.',
            timestamp: 'Just now',
            suggestedOutfits: ['dr-minimal-midi', 'dr-slip-style']
        }
    ]);

    // Save states to localStorage
    useEffect(() => {
        localStorage.setItem('tisuta_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('tisuta_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('tisuta_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem('tisuta_orders', JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        localStorage.setItem('tisuta_saved_looks', JSON.stringify(savedLooks));
    }, [savedLooks]);

    // CART OPERATIONS
    const addToCart = (product, size = 'M', color = null, quantity = 1) => {
        const selectedColor = color || product.colors[0];
        setCart(prev => {
            const existingIndex = prev.findIndex(
                item => item.product.id === product.id && item.size === size && item.color.name === selectedColor.name
            );
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex].quantity += quantity;
                return updated;
            }
            return [...prev, { product, size, color: selectedColor, quantity }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId, size, colorName) => {
        setCart(prev => prev.filter(item => !(item.product.id === productId && item.size === size && item.color.name === colorName)));
    };

    const updateQuantity = (productId, size, colorName, delta) => {
        setCart(prev =>
            prev.map(item => {
                if (item.product.id === productId && item.size === size && item.color.name === colorName) {
                    const newQty = item.quantity + delta;
                    return newQty > 0 ? { ...item, quantity: newQty } : item;
                }
                return item;
            })
        );
    };

    const clearCart = () => setCart([]);

    // Cart Financial Totals
    const cartMRP = cart.reduce((acc, item) => acc + (item.product.mrp || item.product.price) * item.quantity, 0);
    const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const rawDiscount = cartMRP - cartSubtotal;

    // Coupon Calculation
    let couponDiscount = 0;
    if (activeCoupon) {
        if (activeCoupon.discountPercent) {
            couponDiscount = Math.round((cartSubtotal * activeCoupon.discountPercent) / 100);
        } else if (activeCoupon.flatDiscount) {
            couponDiscount = Math.min(activeCoupon.flatDiscount, cartSubtotal);
        }
    }

    const freeShippingThreshold = 5000;
    const isFreeShipping = cartSubtotal >= freeShippingThreshold;
    const shippingFee = cart.length === 0 ? 0 : (isFreeShipping ? 0 : 250);
    const giftWrapFee = giftWrap.enabled ? giftWrap.cost : 0;
    const cartTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee + giftWrapFee);
    const cartSavings = rawDiscount + couponDiscount;

    // Apply Coupon
    const applyCoupon = (code) => {
        const upper = code.trim().toUpperCase();
        if (upper === 'TISUTA10') {
            setActiveCoupon({ code: 'TISUTA10', discountPercent: 10, description: '10% Privé Welcome Discount' });
            return { success: true, message: 'Code TISUTA10 applied: 10% off entire order!' };
        } else if (upper === 'TISUTAFIRST') {
            setActiveCoupon({ code: 'TISUTAFIRST', flatDiscount: 1500, description: 'Flat ₹1,500 Off First Luxury Purchase' });
            return { success: true, message: 'Code TISUTAFIRST applied: ₹1,500 off!' };
        } else if (upper === 'ROYAL20') {
            setActiveCoupon({ code: 'ROYAL20', discountPercent: 20, description: '20% Royal Member Privilege' });
            return { success: true, message: 'Code ROYAL20 applied: 20% off!' };
        } else if (upper === 'FESTIVE50') {
            setActiveCoupon({ code: 'FESTIVE50', flatDiscount: 2000, description: '₹2,000 Festive Wardrobe Voucher' });
            return { success: true, message: 'Code FESTIVE50 applied: ₹2,000 off!' };
        }
        return { success: false, message: 'Invalid or expired promotional code. Try TISUTA10 or ROYAL20.' };
    };

    const removeCoupon = () => setActiveCoupon(null);

    // WISHLIST OPERATIONS
    const toggleWishlist = (productId) => {
        setWishlist(prev => {
            const isWishlisted = prev.includes(productId);
            return isWishlisted ? prev.filter(id => id !== productId) : [...prev, productId];
        });
    };

    const isWishlisted = (productId) => wishlist.includes(productId);

    // COMPARE OPERATIONS
    const addToCompare = (product) => {
        setCompareProducts(prev => {
            if (prev.find(p => p.id === product.id)) return prev;
            if (prev.length >= 4) {
                alert('You can compare a maximum of 4 garments at a time.');
                return prev;
            }
            return [...prev, product];
        });
        setIsCompareOpen(true);
    };

    const removeFromCompare = (productId) => {
        setCompareProducts(prev => prev.filter(p => p.id !== productId));
    };

    // VIRTUAL FIT & QUICK VIEW
    const openVirtualFit = (product = null) => {
        setVirtualFitProduct(product || products[0]);
        setIsVirtualFitOpen(true);
    };

    const closeVirtualFit = () => setIsVirtualFitOpen(false);

    const openSizeAdvisor = (product) => {
        setSizeAdvisorProduct(product);
        setIsSizeAdvisorOpen(true);
    };

    const openQuickView = (product) => setQuickViewProduct(product);
    const closeQuickView = () => setQuickViewProduct(null);

    // ORDER CREATION (Supports both signature styles cleanly)
    const createOrder = (param1, param2) => {
        let shippingDetails = param1;
        let paymentMethod = param2 || 'UPI (Instant)';
        let totalAmount = cartTotal;

        if (param1 && typeof param1 === 'object' && param1.shippingDetails) {
            shippingDetails = param1.shippingDetails;
            paymentMethod = param1.paymentMethod || 'UPI (Instant)';
            totalAmount = param1.totalAmount || cartTotal;
        }

        const newOrder = {
            id: `ORD-TIS-${Math.floor(10000 + Math.random() * 90000)}`,
            date: new Date().toISOString().split('T')[0],
            status: 'confirmed',
            statusStep: 1,
            total: totalAmount,
            estimatedDelivery: '3-4 Business Days',
            items: cart.length > 0 ? [...cart] : [{ product: products[0], size: 'M', color: products[0].colors[0], quantity: 1 }],
            shippingAddress: shippingDetails || user.addresses[0],
            paymentMethod: paymentMethod,
            courier: 'Blue Dart Luxury Express (Tracking Assigned)'
        };

        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        try {
            confetti({ particleCount: 140, spread: 85, origin: { y: 0.6 } });
        } catch (e) { }
        return newOrder;
    };

    // RETURNS & EXCHANGES
    const submitReturnRequest = (orderId, itemName, reason, requestedType, evidenceImage = null) => {
        const newReturn = {
            returnId: `RET-TIS-${Math.floor(1000 + Math.random() * 9000)}`,
            orderId,
            item: itemName,
            reason,
            requestedType,
            status: 'Under Review by Atelier Concierge',
            trackingNumber: `RET-BD-${Math.floor(10000 + Math.random() * 90000)}`,
            evidenceImage,
            date: new Date().toISOString().split('T')[0]
        };
        setReturns(prev => [newReturn, ...prev]);
        return newReturn;
    };

    // ADMIN OPERATIONS
    const addProduct = (newProduct) => {
        const prepared = {
            id: `tisuta-${Date.now()}`,
            discount: Math.round(((newProduct.mrp - newProduct.price) / newProduct.mrp) * 100),
            rating: 5.0,
            reviewCount: 0,
            isNewArrival: true,
            sizes: newProduct.sizes || ['XS', 'S', 'M', 'L'],
            colors: newProduct.colors || [{ name: 'Onyx Noir', hex: '#121212' }],
            images: newProduct.images || [
                { angle: 'Front Studio', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=90&w=1200&auto=format&fit=crop' }
            ],
            ...newProduct
        };
        setProducts(prev => [prepared, ...prev]);
        setAdminState(prev => ({ ...prev, revenue: prev.revenue + 50000 }));
    };

    const updateProduct = (updatedProduct) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const updateProductStock = (id, newStock) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, stockCount: Math.max(0, newStock) } : p));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const updateOrderStatus = (orderId, newStatus, newStep) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus, statusStep: newStep } : o));
    };

    // STYLEBOARD OPERATIONS
    const createStyleboard = (title, selectedProductIds, bgMood = 'Champagne Studio') => {
        const newSb = {
            id: `sb-${Date.now()}`,
            title,
            creator: user.name,
            creatorAvatar: user.avatar,
            likes: 1,
            isLiked: true,
            items: selectedProductIds,
            bgMood,
            date: 'Just now'
        };
        setStyleboards(prev => [newSb, ...prev]);
        return newSb;
    };

    const toggleLikeStyleboard = (sbId) => {
        setStyleboards(prev => prev.map(sb => {
            if (sb.id === sbId) {
                const nextLiked = !sb.isLiked;
                return {
                    ...sb,
                    isLiked: nextLiked,
                    likes: nextLiked ? sb.likes + 1 : sb.likes - 1
                };
            }
            return sb;
        }));
    };

    // AI STYLIST CHAT
    const sendStylistMessage = (userQuery) => {
        const lower = userQuery.toLowerCase();
        let aiReply = "I have curated recommendations tailored to your request.";
        let suggestedItems = ['dr-minimal-midi', 'dr-slip-style'];

        if (lower.includes('wedding') || lower.includes('shaadi') || lower.includes('sangeet')) {
            aiReply = "For an unforgettable wedding celebration, I highly recommend our 3-Piece Zari Anarkali Kurta & Dupatta set in rich Chanderi silk with antique Gota Patti, paired with our Modern Long Kurti or Royal Silk Dupatta.";
            suggestedItems = ['eth-set-anarkali', 'eth-long-kurti', 'eth-short-kurti'];
        } else if (lower.includes('office') || lower.includes('work') || lower.includes('executive')) {
            aiReply = "For authoritative executive elegance, our Alix Minimalist Silk-Georgette Midi Dress in Ivory paired with the Essential Second-Skin Ribbed Fitted Top provides an architectural, commanding look.";
            suggestedItems = ['dr-minimal-midi', 'tp-fitted-basic', 'dr-casual-midi'];
        } else if (lower.includes('date') || lower.includes('dinner') || lower.includes('party')) {
            aiReply = "For an enchanting date night, nothing beats our Sora Cowl-Neck Bias Italian Satin Slip Dress in Champagne Gold or our Valentina Ruched Off-Shoulder Top.";
            suggestedItems = ['dr-slip-style', 'tp-off-shoulder', 'dr-short-flared'];
        } else if (lower.includes('under') || lower.includes('budget') || lower.includes('cheap') || lower.includes('1500') || lower.includes('2000')) {
            aiReply = "Here are our finest high-fashion silhouettes crafted under your budget — including our Celeste Flared Mini One-Piece and Valentina Ruched Off-Shoulder Top.";
            suggestedItems = ['dr-short-flared', 'tp-off-shoulder', 'tp-crop-top', 'tp-fitted-basic'];
        }

        setStylistChat(prev => [
            ...prev,
            { sender: 'user', text: userQuery, timestamp: 'Just now' },
            { sender: 'ai', text: aiReply, timestamp: 'Just now', suggestedOutfits: suggestedItems }
        ]);
    };

    return (
        <ShopContext.Provider value={{
            products,
            cart,
            wishlist,
            wishlistCollections,
            savedLooks,
            fitProfile,
            setFitProfile,
            orders,
            returns,
            submitReturnRequest,
            loyalty,
            user,
            setUser,
            adminMode,
            setAdminMode,
            adminState,
            setAdminState,
            // Drawers & Modals
            isCartOpen,
            setIsCartOpen,
            isSearchOpen,
            setIsSearchOpen,
            isVirtualFitOpen,
            setIsVirtualFitOpen,
            virtualFitProduct,
            openVirtualFit,
            closeVirtualFit,
            isSizeAdvisorOpen,
            setIsSizeAdvisorOpen,
            sizeAdvisorProduct,
            openSizeAdvisor,
            quickViewProduct,
            setQuickViewProduct,
            isQuickViewOpen: Boolean(quickViewProduct),
            openQuickView,
            closeQuickView,
            isStylistOpen,
            setIsStylistOpen,
            isStyleboardOpen,
            setIsStyleboardOpen,
            isNotificationOpen,
            setIsNotificationOpen,
            isSupportOpen,
            setIsSupportOpen,
            compareProducts,
            addToCompare,
            removeFromCompare,
            isCompareOpen,
            setIsCompareOpen,
            // Cart actions
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartSubtotal,
            cartMRP,
            cartSavings,
            couponDiscount,
            activeCoupon,
            applyCoupon,
            removeCoupon,
            giftWrap,
            setGiftWrap,
            isFreeShipping,
            freeShippingThreshold,
            shippingFee,
            // Wishlist & Look actions
            toggleWishlist,
            isWishlisted,
            saveVirtualLook: (newLook) => setSavedLooks(prev => [newLook, ...prev]),
            // Social & Styleboard
            styleboards,
            createStyleboard,
            toggleLikeStyleboard,
            creators,
            // Notifications & Support
            notifications,
            supportTickets,
            stylistChat,
            sendStylistMessage,
            // Order & Admin
            createOrder,
            addProduct,
            updateProduct,
            updateProductStock,
            deleteProduct,
            updateOrderStatus
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);
export default ShopContext;

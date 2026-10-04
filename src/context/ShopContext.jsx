import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as initialProducts } from '../data/productsData';
import confetti from 'canvas-confetti';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    // Products state (admin editable)
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('tisuta_products');
        return saved ? JSON.parse(saved) : initialProducts;
    });

    // Cart state
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('tisuta_cart');
        return saved ? JSON.parse(saved) : [
            { product: initialProducts[0], size: 'M', color: initialProducts[0].colors[0], quantity: 1 }
        ];
    });

    // Wishlist state
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('tisuta_wishlist');
        return saved ? JSON.parse(saved) : ['tisuta-001', 'tisuta-002'];
    });

    // Wishlist custom collections
    const [wishlistCollections, setWishlistCollections] = useState(() => {
        const saved = localStorage.getItem('tisuta_wishlist_collections');
        return saved ? JSON.parse(saved) : {
            'All Saved': ['tisuta-001', 'tisuta-002'],
            'Office Edits': ['tisuta-004'],
            'Date Night Gowns': ['tisuta-001', 'tisuta-005']
        };
    });

    // Virtual Fit Saved Looks
    const [savedLooks, setSavedLooks] = useState(() => {
        const saved = localStorage.getItem('tisuta_saved_looks');
        return saved ? JSON.parse(saved) : [
            {
                id: 'look-101',
                date: '2026-09-28',
                outfitName: 'Aurelia Champagne Evening Fit',
                productId: 'tisuta-001',
                fitScore: 98,
                recommendedSize: 'M',
                previewImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop'
            }
        ];
    });

    // Orders State
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('tisuta_orders');
        return saved ? JSON.parse(saved) : [
            {
                id: 'ORD-TIS-98214',
                date: '2026-09-30',
                status: 'shipped', // placed -> confirmed -> packed -> shipped -> out_for_delivery -> delivered
                statusStep: 4,
                total: 14999,
                items: [
                    { product: initialProducts[0], size: 'M', color: initialProducts[0].colors[0], quantity: 1 }
                ],
                shippingAddress: {
                    fullName: 'Ananya Roy',
                    addressLine: 'Apt 4B, Empire Heights, Bandra West',
                    city: 'Mumbai',
                    pincode: '400050',
                    phone: '+91 98765 43210'
                },
                courier: 'Blue Dart Luxury Express (Tracking: BD8841294)'
            }
        ];
    });

    // UI Modal States
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isVirtualFitOpen, setIsVirtualFitOpen] = useState(false);
    const [virtualFitProduct, setVirtualFitProduct] = useState(null);
    const [isSizeAdvisorOpen, setIsSizeAdvisorOpen] = useState(false);
    const [sizeAdvisorProduct, setSizeAdvisorProduct] = useState(null);
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [adminMode, setAdminMode] = useState(false);

    // Active User State
    const [user, setUser] = useState({
        isLoggedIn: true,
        name: 'Ananya Roy',
        email: 'ananya.roy@tisuta.com',
        phone: '+91 98765 43210',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        addresses: [
            {
                id: 'addr-1',
                title: 'Home',
                fullName: 'Ananya Roy',
                addressLine: 'Apt 4B, Empire Heights, Bandra West',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400050',
                phone: '+91 98765 43210',
                isDefault: true
            }
        ]
    });

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

    // Cart Functions
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

    const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const cartMRP = cart.reduce((acc, item) => acc + item.product.mrp * item.quantity, 0);
    const cartSavings = cartMRP - cartTotal;
    const freeShippingThreshold = 5000;
    const isFreeShipping = cartTotal >= freeShippingThreshold;

    // Wishlist Functions
    const toggleWishlist = (productId) => {
        setWishlist(prev => {
            const isWishlisted = prev.includes(productId);
            const next = isWishlisted ? prev.filter(id => id !== productId) : [...prev, productId];
            return next;
        });
    };

    const isWishlisted = (productId) => wishlist.includes(productId);

    // Virtual Fit modal trigger & close
    const openVirtualFit = (product = null) => {
        setVirtualFitProduct(product || products[0]);
        setIsVirtualFitOpen(true);
    };

    const closeVirtualFit = () => {
        setIsVirtualFitOpen(false);
    };

    // Size Advisor modal trigger
    const openSizeAdvisor = (product) => {
        setSizeAdvisorProduct(product);
        setIsSizeAdvisorOpen(true);
    };

    // Place Order Simulation
    const createOrder = (shippingDetails, paymentMethod) => {
        const newOrder = {
            id: `ORD-TIS-${Math.floor(10000 + Math.random() * 90000)}`,
            date: new Date().toISOString().split('T')[0],
            status: 'confirmed',
            statusStep: 2,
            total: cartTotal,
            items: [...cart],
            shippingAddress: shippingDetails,
            paymentMethod,
            courier: 'Blue Dart Luxury Express (Tracking Assigned)'
        };
        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        return newOrder;
    };

    // Admin Product Management
    const addProduct = (newProduct) => {
        setProducts(prev => [newProduct, ...prev]);
    };

    const updateProduct = (updatedProduct) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const updateOrderStatus = (orderId, newStatus, newStep) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus, statusStep: newStep } : o));
    };

    return (
        <ShopContext.Provider value={{
            products,
            cart,
            wishlist,
            wishlistCollections,
            savedLooks,
            orders,
            user,
            adminMode,
            setAdminMode,
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
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartMRP,
            cartSavings,
            isFreeShipping,
            freeShippingThreshold,
            toggleWishlist,
            isWishlisted,
            setSavedLooks,
            createOrder,
            addProduct,
            updateProduct,
            deleteProduct,
            updateOrderStatus
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);
export default ShopContext;

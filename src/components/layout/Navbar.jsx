import React, { useState } from 'react';
import { 
    Search, User, Heart, ShoppingBag, Menu, Sparkles, LayoutDashboard, 
    SlidersHorizontal, Bell, Palette, Bot, X, ChevronDown, ArrowRight, Crown 
} from 'lucide-react';
import { TisutaMonogram } from '../brand/TisutaMonogram';
import { useShop } from '../../context/ShopContext';
import { getImgUrl } from '../../utils/imageUtils';

export const Navbar = ({ onNavigatePage, currentPage }) => {
    const {
        cart,
        wishlist,
        compareProducts,
        setIsCompareOpen,
        setIsCartOpen,
        setIsSearchOpen,
        setIsStylistOpen,
        setIsStyleboardOpen,
        setIsNotificationOpen,
        openVirtualFit,
        notifications,
        adminMode,
        setAdminMode
    } = useShop();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeMegaCategory, setActiveMegaCategory] = useState(null);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = wishlist.length;
    const unreadNotifs = notifications.filter(n => !n.read).length;

    const handleCategoryClick = (catId, subCatId = 'all', editTag = null) => {
        onNavigatePage('catalog', { category: catId, subCategory: subCatId, editTag });
        setActiveMegaCategory(null);
        setMobileOpen(false);
    };

    const megaMenus = {
        clothing: {
            title: 'Haute Couture & Prêt-à-Porter',
            badge: 'ALL 12 SILHOUETTES',
            sections: [
                {
                    heading: 'Dresses & One-Pieces',
                    items: [
                        { label: 'Minimal Midi Dress', cat: 'dresses', sub: 'minimal-midi' },
                        { label: 'Slip Style Dresses', cat: 'dresses', sub: 'slip-style' },
                        { label: 'A Line Dress', cat: 'dresses', sub: 'aline-dress' },
                        { label: 'Short Length Flared One Piece', cat: 'dresses', sub: 'short-flared' },
                        { label: 'Casual Midi Dress', cat: 'dresses', sub: 'casual-midi' }
                    ]
                },
                {
                    heading: 'Tops & Blouses',
                    items: [
                        { label: 'Fitted Basic Top', cat: 'tops', sub: 'fitted-basic' },
                        { label: 'Off Shoulder Top', cat: 'tops', sub: 'off-shoulder' },
                        { label: 'Crop Top', cat: 'tops', sub: 'crop-top' },
                        { label: 'Net Er Top', cat: 'tops', sub: 'net-top' }
                    ]
                },
                {
                    heading: 'Kurtis & Royal Ethnic Sets',
                    items: [
                        { label: 'Modern Long Kurti', cat: 'ethnic', sub: 'modern-long-kurti' },
                        { label: 'Short Kurti', cat: 'ethnic', sub: 'short-kurti' },
                        { label: 'Ethnic Sets', cat: 'ethnic', sub: 'ethnic-sets' }
                    ]
                }
            ],
            promo: {
                title: 'Champagne Minimal Midi Dress',
                subtitle: 'Double silk georgette with tailored cowl neckline',
                price: '₹1,499',
                image: getImgUrl('/images/products/minimal_midi_1.jpg'),
                action: () => handleCategoryClick('dresses', 'minimal-midi')
            }
        },
        trending: {
            title: 'Trending Editions & Curated Edits',
            badge: 'HOT EDITORIAL',
            sections: [
                {
                    heading: 'Royale Bestsellers',
                    items: [
                        { label: 'Silk Cowl Neck Slip Dress', cat: 'dresses', sub: 'slip-style' },
                        { label: 'Kashmiri Zari Anarkali Set', cat: 'ethnic', sub: 'ethnic-sets' },
                        { label: 'French Illusion Net Er Top', cat: 'tops', sub: 'net-top' },
                        { label: 'Flared Peplum Short Kurti', cat: 'ethnic', sub: 'short-kurti' }
                    ]
                },
                {
                    heading: 'Price Curations',
                    items: [
                        { label: 'Under ₹799 Essentials', cat: 'all', sub: 'all', tag: 'Under ₹799' },
                        { label: 'Under ₹1,199 Luxury', cat: 'all', sub: 'all', tag: 'Under ₹1199' },
                        { label: 'Under ₹1,899 Imperial Couture', cat: 'all', sub: 'all', tag: 'Under ₹1899' }
                    ]
                },
                {
                    heading: 'Occasion Edits',
                    items: [
                        { label: 'Royal Festive & Wedding Sangeet', cat: 'ethnic', sub: 'ethnic-sets' },
                        { label: 'Date Night Satin Glamour', cat: 'dresses', sub: 'slip-style' },
                        { label: 'Resort Riviera Pleated Midis', cat: 'dresses', sub: 'aline-dress' }
                    ]
                }
            ],
            promo: {
                title: 'Kashmiri Tilla Anarkali Set',
                subtitle: 'Handcrafted Chanderi silk with 24K bullion gota patti',
                price: '₹1,899',
                image: getImgUrl('/images/products/ethnic_sets_1.jpg'),
                action: () => handleCategoryClick('ethnic', 'ethnic-sets')
            }
        },
        dresses: {
            title: 'Designer Dresses & Flared One Pieces',
            badge: '5 SILHOUETTES',
            sections: [
                {
                    heading: 'Satin & Silk Draping',
                    items: [
                        { label: 'Minimal Midi Dress', cat: 'dresses', sub: 'minimal-midi' },
                        { label: 'Slip Style Dresses', cat: 'dresses', sub: 'slip-style' },
                        { label: 'Casual Midi Dress', cat: 'dresses', sub: 'casual-midi' }
                    ]
                },
                {
                    heading: 'Flared & Pleated Midis',
                    items: [
                        { label: 'A Line Dress', cat: 'dresses', sub: 'aline-dress' },
                        { label: 'Short Length Flared One Piece', cat: 'dresses', sub: 'short-flared' }
                    ]
                },
                {
                    heading: 'Couture Dress Styling',
                    items: [
                        { label: 'Virtual Fit 3D Try-On', isTool: 'virtualFit' },
                        { label: 'Find Your Custom Size', isTool: 'virtualFit' },
                        { label: 'View All 5 Dress Edits', cat: 'dresses', sub: 'all' }
                    ]
                }
            ],
            promo: {
                title: 'Mulberry Silk Slip Dress',
                subtitle: 'Liquid cowl neckline with bias-cut body hug',
                price: '₹1,299',
                image: getImgUrl('/images/products/slip_style_1.jpg'),
                action: () => handleCategoryClick('dresses', 'slip-style')
            }
        },
        tops: {
            title: 'Haute Tops, Off-Shoulders & Net Tops',
            badge: '4 SILHOUETTES',
            sections: [
                {
                    heading: 'Sculpted Bodice Tops',
                    items: [
                        { label: 'Fitted Basic Top', cat: 'tops', sub: 'fitted-basic' },
                        { label: 'Off Shoulder Top', cat: 'tops', sub: 'off-shoulder' }
                    ]
                },
                {
                    heading: 'Crop & Sheer Netting',
                    items: [
                        { label: 'Crop Top', cat: 'tops', sub: 'crop-top' },
                        { label: 'Net Er Top', cat: 'tops', sub: 'net-top' }
                    ]
                },
                {
                    heading: 'Runway Styling Guides',
                    items: [
                        { label: 'Off-Shoulder Ruched Bardot Edit', cat: 'tops', sub: 'off-shoulder' },
                        { label: 'Sheer French Net Layering', cat: 'tops', sub: 'net-top' },
                        { label: 'View All 4 Tops Edits', cat: 'tops', sub: 'all' }
                    ]
                }
            ],
            promo: {
                title: 'French Illusion Net Er Top',
                subtitle: 'Delicate sheer honeycomb netting with floral embroidery',
                price: '₹799',
                image: getImgUrl('/images/products/net_top_1.jpg'),
                action: () => handleCategoryClick('tops', 'net-top')
            }
        },
        ethnic: {
            title: 'Imperial Kurtis & 3-Piece Ethnic Sets',
            badge: '3 SILHOUETTES',
            sections: [
                {
                    heading: 'Royal Kurtis',
                    items: [
                        { label: 'Modern Long Kurti', cat: 'ethnic', sub: 'modern-long-kurti' },
                        { label: 'Flared Short Kurti', cat: 'ethnic', sub: 'short-kurti' }
                    ]
                },
                {
                    heading: 'Imperial Ensemble Sets',
                    items: [
                        { label: '3-Piece Anarkali Sets', cat: 'ethnic', sub: 'ethnic-sets' },
                        { label: 'Zari Bordered Trousseau Sets', cat: 'ethnic', sub: 'ethnic-sets' }
                    ]
                },
                {
                    heading: 'Heritage Craft Details',
                    items: [
                        { label: 'Pure Chanderi & Mulmul Silk', cat: 'ethnic', sub: 'all' },
                        { label: '24K Bullion Gota Patti Needlework', cat: 'ethnic', sub: 'all' },
                        { label: 'View All Royal Kurtis & Sets', cat: 'ethnic', sub: 'all' }
                    ]
                }
            ],
            promo: {
                title: 'Handblock Flared Peplum Kurti',
                subtitle: 'Breathable mulmul silk with flared peplum hem',
                price: '₹899',
                image: getImgUrl('/images/products/short_kurti_1.jpg'),
                action: () => handleCategoryClick('ethnic', 'short-kurti')
            }
        }
    };

    return (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#D4AF37]/35 shadow-[0_10px_35px_rgba(212,175,55,0.08)] transition-all">
            {/* Top Announcement Bar */}
            <div className="bg-gradient-to-r from-[#141210] via-[#2D251A] to-[#141210] text-[#FFF4CC] text-[10.5px] font-semibold tracking-[0.28em] py-2.5 text-center uppercase border-b border-[#D4AF37]/40 flex items-center justify-center gap-4 px-4 shadow-sm">
                <span className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
                    <span>Complimentary Express White-Glove Royale Shipping Above ₹2,999</span>
                </span>
                <span className="hidden sm:inline text-[#D4AF37]">✦</span>
                <span className="hidden sm:inline">Royale Privilege Code <strong className="text-[#D4AF37] font-bold underline underline-offset-4 decoration-[#D4AF37]">TISUTA10</strong> for 10% Off</span>
                <span className="hidden md:inline text-[#D4AF37]">✦</span>
                <span className="hidden md:inline text-[#D4AF37] font-bold">3D Virtual Fit AI Studio Activated</span>
            </div>

            {/* Main Navigation Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[82px] flex items-center justify-between gap-4">
                
                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="lg:hidden p-2 text-[#141210] hover:text-[#D4AF37] transition-colors"
                    aria-label="Toggle navigation menu"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Enhanced Brand Logo: TISUTA CREATION with Royale Crest */}
                <div
                    onClick={() => onNavigatePage('home')}
                    className="cursor-pointer flex-shrink-0 hover:scale-105 transition-all duration-300 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[350px] h-[52px] sm:h-[62px] flex items-center"
                    title="TISUTA CREATION — Haute Couture Royale"
                >
                    <TisutaMonogram className="w-full h-full" showSubtitle={true} variant="gold" />
                </div>

                {/* Desktop Category Navigation with Mega Menus */}
                <nav className="hidden lg:flex items-center gap-6 text-[11px] font-cinzel font-bold uppercase tracking-[0.22em] text-[#141210]/90">
                    <button
                        onClick={() => onNavigatePage('home')}
                        className={`py-2 transition-colors hover:text-[#D4AF37] relative ${currentPage === 'home' ? 'text-[#D4AF37] font-black' : ''}`}
                    >
                        Home
                        {currentPage === 'home' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />}
                    </button>

                    {/* Clothing with Mega Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setActiveMegaCategory('clothing')}
                        onMouseLeave={() => setActiveMegaCategory(null)}
                    >
                        <button
                            onClick={() => handleCategoryClick('all')}
                            className="py-2 inline-flex items-center gap-1 transition-colors hover:text-[#D4AF37] cursor-pointer"
                        >
                            <span>Clothing</span>
                            <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
                        </button>
                    </div>

                    {/* Trending with Mega Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setActiveMegaCategory('trending')}
                        onMouseLeave={() => setActiveMegaCategory(null)}
                    >
                        <button
                            onClick={() => onNavigatePage('catalog', { category: 'all' })}
                            className="py-2 inline-flex items-center gap-1 transition-colors hover:text-[#D4AF37] cursor-pointer"
                        >
                            <span>Trending</span>
                            <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
                        </button>
                    </div>

                    {/* Dresses with Mega Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setActiveMegaCategory('dresses')}
                        onMouseLeave={() => setActiveMegaCategory(null)}
                    >
                        <button
                            onClick={() => handleCategoryClick('dresses')}
                            className="py-2 inline-flex items-center gap-1 transition-colors hover:text-[#D4AF37] cursor-pointer"
                        >
                            <span>Dresses</span>
                            <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
                        </button>
                    </div>

                    {/* Tops with Mega Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setActiveMegaCategory('tops')}
                        onMouseLeave={() => setActiveMegaCategory(null)}
                    >
                        <button
                            onClick={() => handleCategoryClick('tops')}
                            className="py-2 inline-flex items-center gap-1 transition-colors hover:text-[#D4AF37] cursor-pointer"
                        >
                            <span>Tops</span>
                            <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
                        </button>
                    </div>

                    {/* Kurtis & Ethnic Sets with Mega Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setActiveMegaCategory('ethnic')}
                        onMouseLeave={() => setActiveMegaCategory(null)}
                    >
                        <button
                            onClick={() => handleCategoryClick('ethnic')}
                            className="py-2 inline-flex items-center gap-1 transition-colors hover:text-[#D4AF37] cursor-pointer"
                        >
                            <span>Kurtis & Sets</span>
                            <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
                        </button>
                    </div>

                    {/* Interactive 3D Virtual Fit Studio Button */}
                    <button
                        onClick={() => openVirtualFit()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] text-[#141210] hover:scale-105 rounded-full text-[10px] font-black tracking-[0.2em] transition-all shadow-[0_4px_16px_rgba(212,175,55,0.35)] border border-[#F5D77F] cursor-pointer"
                    >
                        <Sparkles className="w-3.5 h-3.5 fill-[#141210]" />
                        <span>3D VIRTUAL FIT</span>
                    </button>

                    <button
                        onClick={() => setIsStylistOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#141210] border border-[#D4AF37]/50 hover:bg-[#141210] hover:text-[#F5D77F] rounded-full text-[10px] font-bold tracking-[0.16em] transition-all shadow-sm cursor-pointer"
                    >
                        <Bot className="w-3 h-3 text-[#D4AF37]" />
                        <span>AI Stylist</span>
                    </button>

                    <button
                        onClick={() => setIsStyleboardOpen(true)}
                        className="inline-flex items-center gap-1 text-[10px] text-[#141210]/80 hover:text-[#D4AF37] transition-colors cursor-pointer"
                        title="Interactive scrapbook outfit builder"
                    >
                        <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Styleboard</span>
                    </button>
                </nav>

                {/* Right Utility Icons */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Admin Dashboard Switch */}
                    <button
                        onClick={() => onNavigatePage('admin')}
                        className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                            currentPage === 'admin'
                                ? 'bg-[#D5B263] text-[#121212] border-[#D5B263]'
                                : 'bg-white/60 text-[#121212]/80 border-[#D5B263]/30 hover:bg-[#121212] hover:text-[#D5B263]'
                        }`}
                        title="Enterprise Multi-Role Admin Suite"
                    >
                        <LayoutDashboard className="w-3 h-3" />
                        <span>Admin</span>
                    </button>

                    {/* AI Natural Language Search */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="p-2.5 text-[#121212] hover:text-[#D5B263] transition-colors rounded-full hover:bg-white/60"
                        aria-label="AI Search Engine"
                    >
                        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Compare Products */}
                    {compareProducts.length > 0 && (
                        <button
                            onClick={() => setIsCompareOpen(true)}
                            className="relative p-2.5 text-[#121212] hover:text-[#D5B263] transition-colors rounded-full hover:bg-white/60"
                            title="Compare Garments Side-by-Side"
                        >
                            <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="absolute top-1 right-1 w-4 h-4 bg-[#D5B263] text-[#121212] text-[9px] font-bold rounded-full flex items-center justify-center">
                                {compareProducts.length}
                            </span>
                        </button>
                    )}

                    {/* Notifications */}
                    <button
                        onClick={() => setIsNotificationOpen(true)}
                        className="relative p-2.5 text-[#121212] hover:text-[#D5B263] transition-colors rounded-full hover:bg-white/60"
                        aria-label="Notification Center"
                    >
                        <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                        {unreadNotifs > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D5B263] rounded-full ring-2 ring-white" />
                        )}
                    </button>

                    {/* Account */}
                    <button
                        onClick={() => onNavigatePage('account')}
                        className={`p-2.5 transition-colors rounded-full hover:bg-white/60 ${
                            currentPage === 'account' ? 'text-[#D5B263]' : 'text-[#121212] hover:text-[#D5B263]'
                        }`}
                        aria-label="Account Profile"
                    >
                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Wishlist */}
                    <button
                        onClick={() => onNavigatePage('account', { tab: 'wishlist' })}
                        className="relative p-2.5 text-[#121212] hover:text-[#D5B263] transition-colors rounded-full hover:bg-white/60"
                        aria-label="Wishlist"
                    >
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                        {wishlistCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-[#121212] text-[#D5B263] text-[9px] font-bold rounded-full flex items-center justify-center border border-[#D5B263]">
                                {wishlistCount}
                            </span>
                        )}
                    </button>

                    {/* Shopping Bag */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2.5 ml-1 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] rounded-full transition-all shadow-md"
                        aria-label="Shopping Bag"
                    >
                        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D5B263] text-[#121212] font-black text-[9px] rounded-full flex items-center justify-center border border-white">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mega Menu Dropdown Stage */}
            {activeMegaCategory && megaMenus[activeMegaCategory] && (
                <div 
                    className="hidden lg:block absolute top-full inset-x-0 bg-white/98 backdrop-blur-2xl border-b-2 border-[#D4AF37]/40 shadow-[0_25px_60px_rgba(212,175,55,0.18)] py-8 transition-all animate-fadeIn z-50"
                    onMouseEnter={() => setActiveMegaCategory(activeMegaCategory)}
                    onMouseLeave={() => setActiveMegaCategory(null)}
                >
                    <div className="max-w-7xl mx-auto px-8">
                        {/* Mega Menu Top Category Badge */}
                        <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-[#D4AF37]/25">
                            <Crown className="w-4 h-4 text-[#D4AF37]" />
                            <h3 className="font-cinzel text-base font-black text-[#141210] uppercase tracking-wider">
                                {megaMenus[activeMegaCategory].title}
                            </h3>
                            <span className="px-3 py-0.5 bg-gradient-to-r from-[#D4AF37]/20 to-[#F5D77F]/30 border border-[#D4AF37]/50 text-[#9E7D23] font-cinzel text-[9.5px] font-black rounded-full uppercase tracking-widest ml-auto shadow-sm">
                                {megaMenus[activeMegaCategory].badge}
                            </span>
                        </div>

                        <div className="grid grid-cols-12 gap-8 items-start">
                            {/* Categories Columns */}
                            <div className="col-span-8 grid grid-cols-3 gap-6">
                                {megaMenus[activeMegaCategory].sections.map((sec, idx) => (
                                    <div key={idx} className="space-y-3.5">
                                        <h4 className="font-cinzel text-xs font-bold text-[#9E7D23] uppercase tracking-wider border-b border-[#D4AF37]/25 pb-2">
                                            {sec.heading}
                                        </h4>
                                        <ul className="space-y-2 text-xs">
                                            {sec.items.map((item, i) => (
                                                <li key={i}>
                                                    <button
                                                        onClick={() => {
                                                            if (item.isTool === 'virtualFit') {
                                                                openVirtualFit();
                                                                setActiveMegaCategory(null);
                                                            } else {
                                                                handleCategoryClick(item.cat, item.sub, item.tag);
                                                            }
                                                        }}
                                                        className="font-cinzel text-xs font-semibold text-[#141210]/80 hover:text-[#D4AF37] hover:translate-x-1.5 transition-all text-left flex items-center gap-2 group cursor-pointer"
                                                    >
                                                        <span className="text-[10px] text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                                                        <span>{item.label}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Editorial Promo Card */}
                            <div 
                                className="col-span-4 bg-gradient-to-br from-[#1C1814] via-[#141210] to-[#1C1814] text-white rounded-3xl p-5 border-2 border-[#D4AF37]/50 shadow-[0_12px_35px_rgba(212,175,55,0.25)] flex gap-4 items-center group cursor-pointer hover:border-[#F5D77F] transition-all"
                                onClick={megaMenus[activeMegaCategory].promo.action}
                            >
                                <div className="relative w-24 h-32 rounded-2xl overflow-hidden border border-[#D4AF37]/50 flex-shrink-0">
                                    <img
                                        src={megaMenus[activeMegaCategory].promo.image}
                                        alt=""
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-1.5 right-1.5 px-2 py-0.5 bg-[#D4AF37] text-[#141210] text-[9px] font-black font-cinzel rounded shadow-md">
                                        {megaMenus[activeMegaCategory].promo.price}
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <span className="text-[9px] font-cinzel font-black text-[#F5D77F] uppercase tracking-widest block">
                                        ATELIER SPOTLIGHT
                                    </span>
                                    <h5 className="font-cinzel text-sm font-bold text-white leading-tight group-hover:text-[#F5D77F] transition-colors">
                                        {megaMenus[activeMegaCategory].promo.title}
                                    </h5>
                                    <p className="text-[11px] text-white/70 leading-relaxed font-light line-clamp-2">
                                        {megaMenus[activeMegaCategory].promo.subtitle}
                                    </p>
                                    <span className="text-[10px] font-cinzel font-bold text-[#F5D77F] uppercase tracking-wider inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform pt-1">
                                        <span>Explore Silhouette</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="lg:hidden border-t border-[#D4AF37]/25 bg-white/98 backdrop-blur-xl px-6 py-6 space-y-5 max-h-[85vh] overflow-y-auto shadow-2xl">
                    <div className="flex gap-2 pb-4 border-b border-[#D4AF37]/20">
                        <button
                            onClick={() => { openVirtualFit(); setMobileOpen(false); }}
                            className="flex-1 py-3 bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] text-[#141210] rounded-xl text-xs font-cinzel font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                        >
                            <Sparkles className="w-3.5 h-3.5 fill-[#141210]" />
                            <span>3D Virtual Fit</span>
                        </button>
                        <button
                            onClick={() => { setIsStylistOpen(true); setMobileOpen(false); }}
                            className="flex-1 py-3 bg-white border border-[#D4AF37]/50 text-[#141210] rounded-xl text-xs font-cinzel font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm"
                        >
                            <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>AI Stylist</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => { onNavigatePage('home'); setMobileOpen(false); }}
                            className="w-full text-left py-2 font-cinzel text-base font-bold text-[#141210] border-b border-[#D4AF37]/20 pb-2"
                        >
                            ✦ Home Storefront
                        </button>

                        {/* Dresses section */}
                        <div className="space-y-1">
                            <div className="text-[10px] font-cinzel font-black text-[#9E7D23] uppercase tracking-widest">
                                Dresses & One Pieces (5 Silhouettes)
                            </div>
                            <div className="grid grid-cols-1 gap-1 pl-2">
                                <button
                                    onClick={() => handleCategoryClick('dresses', 'minimal-midi')}
                                    className="text-left py-1 text-xs font-cinzel font-semibold text-[#141210]/80 hover:text-[#D4AF37]"
                                >
                                    • Minimal Midi Dress
                                </button>
                                <button
                                    onClick={() => handleCategoryClick('dresses', 'slip-style')}
                                    className="text-left py-1 text-xs font-cinzel font-semibold text-[#141210]/80 hover:text-[#D4AF37]"
                                >
                                    • Slip Style Dresses
                                </button>
                                <button
                                    onClick={() => handleCategoryClick('dresses', 'aline-dress')}
                                    className="text-left py-1 text-xs font-cinzel font-semibold text-[#141210]/80 hover:text-[#D4AF37]"
                                >
                                    • A-Line Dress
                                </button>
                                <button
                                    onClick={() => handleCategoryClick('dresses', 'short-flared')}
                                    className="text-left py-1 text-xs font-cinzel font-semibold text-[#141210]/80 hover:text-[#D4AF37]"
                                >
                                    • Short Length Flared One Piece
                                </button>
                                <button
                                    onClick={() => handleCategoryClick('dresses', 'casual-midi')}
                                    className="text-left py-1 text-xs font-cinzel font-semibold text-[#141210]/80 hover:text-[#D4AF37]"
                                >
                                    • Casual Midi Dress
                                </button>
                            </div>
                        </div>

                        {/* Tops section */}
                        <div className="space-y-1">
                            <div className="text-[10px] font-cinzel font-black text-[#9E7D23] uppercase tracking-widest">
                                Tops & Blouses (4 Silhouettes)
                            </div>
                            <div className="grid grid-cols-1 gap-1 pl-2">
                                <button
                                    onClick={() => handleCategoryClick('tops', 'fitted-basic')}
                                    className="text-left py-1 text-xs font-cinzel font-semibold text-[#141210]/80 hover:text-[#D4AF37]"
                                >
                                    • Fitted Basic Top
                                </button>
                                <button
                                    onClick={() => handleCategoryClick('tops', 'off-shoulder')}
                                    className="text-left py-1 text-xs font-cinzel font-semibold text-[#141210]/80 hover:text-[#D4AF37]"
                                >
                                    • Off Shoulder Top
                                </button>
                                <button
                                    onClick={() => handleCategoryClick('tops', 'crop-top')}
                                    className="text-left py-1 text-xs font-cinzel font-semibold text-[#141210]/80 hover:text-[#D4AF37]"
                                >
                                    • Crop Top
                                </button>
                                <button
                                    onClick={() => handleCategoryClick('tops', 'net-top')}
                                    className="text-left py-1 text-xs font-cinzel font-semibold text-[#141210]/80 hover:text-[#D4AF37]"
                                >
                                    • Net Er Top
                                </button>
                            </div>
                        </div>

                        {/* Kurtis & Ethnic sets */}
                        <div className="space-y-1">
                            <div className="text-[10px] font-cinzel font-black text-[#9E7D23] uppercase tracking-widest">
                                Kurtis & Royal Ethnic Sets (3 Silhouettes)
                            </div>
                            <div className="grid grid-cols-1 gap-1 pl-2">
                                <button
                                    onClick={() => handleCategoryClick('ethnic', 'modern-long-kurti')}
                                    className="text-left py-1 text-xs font-cinzel font-semibold text-[#141210]/80 hover:text-[#D4AF37]"
                                >
                                    • Modern Long Kurti
                                </button>
                                <button
                                    onClick={() => handleCategoryClick('ethnic', 'short-kurti')}
                                    className="text-left py-1 text-xs font-cinzel font-semibold text-[#141210]/80 hover:text-[#D4AF37]"
                                >
                                    • Short Kurti
                                </button>
                                <button
                                    onClick={() => handleCategoryClick('ethnic', 'ethnic-sets')}
                                    className="text-left py-1 text-xs font-cinzel font-semibold text-[#141210]/80 hover:text-[#D4AF37]"
                                >
                                    • Ethnic Sets (3-Piece Anarkali)
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-[#D4AF37]/25 flex flex-col gap-2">
                        <button
                            onClick={() => { setIsStyleboardOpen(true); setMobileOpen(false); }}
                            className="w-full py-2.5 text-center text-xs font-cinzel font-bold uppercase tracking-wider text-[#141210] bg-white rounded-xl border border-[#D4AF37]/40 shadow-sm"
                        >
                            TISUTA Styleboard Scrapbook
                        </button>
                        <button
                            onClick={() => { onNavigatePage('admin'); setMobileOpen(false); }}
                            className="w-full py-2.5 text-center text-xs font-cinzel font-bold uppercase tracking-wider text-[#F5D77F] bg-[#141210] rounded-xl shadow-md"
                        >
                            Enterprise Admin Suite
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;

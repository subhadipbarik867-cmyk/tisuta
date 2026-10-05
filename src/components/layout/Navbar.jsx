import React, { useState } from 'react';
import { 
    Search, User, Heart, ShoppingBag, Menu, Sparkles, LayoutDashboard, 
    SlidersHorizontal, Bell, Palette, Bot, X, ChevronDown, ArrowRight 
} from 'lucide-react';
import { TisutaMonogram } from '../brand/TisutaMonogram';
import { useShop } from '../../context/ShopContext';

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
            title: 'Women Couture & Prêt-à-Porter',
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
                title: 'The Alix Minimal Midi',
                subtitle: 'Double silk georgette in pearl ivory & noir',
                image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=90&w=800&auto=format&fit=crop',
                action: () => handleCategoryClick('dresses', 'minimal-midi')
            }
        },
        trending: {
            title: 'Trending Editions & Curated Edits',
            sections: [
                {
                    heading: 'Price Curations',
                    items: [
                        { label: 'Under ₹999 Edits', cat: 'all', sub: 'all', tag: 'Under ₹999' },
                        { label: 'Under ₹1,499 Edits', cat: 'all', sub: 'all', tag: 'Under ₹1499' },
                        { label: 'Under ₹2,000 Luxury', cat: 'all', sub: 'all', tag: 'Under ₹2000' }
                    ]
                },
                {
                    heading: 'Occasion Edit',
                    items: [
                        { label: 'Wedding & Sangeet Trousseau', cat: 'ethnic', sub: 'ethnic-sets' },
                        { label: 'Date Night Glamour', cat: 'dresses', sub: 'slip-style' },
                        { label: 'Executive Boardroom Luxe', cat: 'dresses', sub: 'minimal-midi' },
                        { label: 'Resort Riviera 2026', cat: 'dresses', sub: 'aline-dress' }
                    ]
                }
            ],
            promo: {
                title: 'Zoya Zari Anarkali Set',
                subtitle: 'Handcrafted Chanderi silk with antique Gota Patti',
                image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=90&w=800&auto=format&fit=crop',
                action: () => handleCategoryClick('ethnic', 'ethnic-sets')
            }
        }
    };

    return (
        <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#D5B263]/25 transition-all">
            {/* Top Announcement Bar */}
            <div className="bg-[#121212] text-[#FDFBF7] text-[10px] font-medium tracking-[0.25em] py-2 text-center uppercase border-b border-[#D5B263]/20 flex items-center justify-center gap-4 px-4">
                <span>Complimentary Express White-Glove Shipping Above ₹5,000</span>
                <span className="hidden sm:inline text-[#D5B263]">✦</span>
                <span className="hidden sm:inline">Use Code <strong className="text-[#D5B263] font-bold">TISUTA10</strong> for 10% Off</span>
                <span className="hidden md:inline text-[#D5B263]">✦</span>
                <span className="hidden md:inline text-[#D5B263]">3D Virtual Fit AI Activated</span>
            </div>

            {/* Main Navigation Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between gap-4">
                
                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="lg:hidden p-2 text-[#121212] hover:text-[#D5B263] transition-colors"
                    aria-label="Toggle navigation menu"
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Brand Logo & Monogram */}
                <div
                    onClick={() => onNavigatePage('home')}
                    className="cursor-pointer flex-shrink-0 hover:opacity-90 transition-opacity"
                    style={{ width: '180px', height: '42px' }}
                >
                    <TisutaMonogram className="w-full h-full" showSubtitle={true} />
                </div>

                {/* Desktop Category Navigation with Mega Menu */}
                <nav className="hidden lg:flex items-center gap-7 text-[11px] font-bold uppercase tracking-[0.22em] text-[#121212]/80">
                    <button
                        onClick={() => onNavigatePage('home')}
                        className={`py-2 transition-colors hover:text-[#121212] relative ${currentPage === 'home' ? 'text-[#121212]' : ''}`}
                    >
                        Home
                        {currentPage === 'home' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D5B263]" />}
                    </button>

                    {/* Clothing with Mega Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setActiveMegaCategory('clothing')}
                        onMouseLeave={() => setActiveMegaCategory(null)}
                    >
                        <button
                            onClick={() => handleCategoryClick('all')}
                            className="py-2 inline-flex items-center gap-1 transition-colors hover:text-[#121212]"
                        >
                            <span>Clothing</span>
                            <ChevronDown className="w-3 h-3 text-[#D5B263]" />
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
                            className="py-2 inline-flex items-center gap-1 transition-colors hover:text-[#121212]"
                        >
                            <span>Trending</span>
                            <ChevronDown className="w-3 h-3 text-[#D5B263]" />
                        </button>
                    </div>

                    <button
                        onClick={() => handleCategoryClick('dresses')}
                        className="py-2 transition-colors hover:text-[#121212]"
                    >
                        Dresses
                    </button>

                    <button
                        onClick={() => handleCategoryClick('tops')}
                        className="py-2 transition-colors hover:text-[#121212]"
                    >
                        Tops
                    </button>

                    <button
                        onClick={() => handleCategoryClick('ethnic')}
                        className="py-2 transition-colors hover:text-[#121212]"
                    >
                        Ethnic & Sets
                    </button>

                    {/* Interactive Innovation Tools */}
                    <button
                        onClick={() => openVirtualFit()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] rounded-full text-[10px] font-bold tracking-[0.16em] transition-all shadow-sm"
                    >
                        <Sparkles className="w-3 h-3" />
                        <span>Virtual Fit</span>
                    </button>

                    <button
                        onClick={() => setIsStylistOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F4EE] text-[#121212] border border-[#D5B263]/40 hover:bg-[#121212] hover:text-[#D5B263] rounded-full text-[10px] font-bold tracking-[0.16em] transition-all shadow-sm"
                    >
                        <Bot className="w-3 h-3 text-[#D5B263]" />
                        <span>AI Stylist</span>
                    </button>

                    <button
                        onClick={() => setIsStyleboardOpen(true)}
                        className="inline-flex items-center gap-1.5 text-[10px] text-[#121212]/70 hover:text-[#D5B263] transition-colors"
                        title="LimeRoad-style interactive scrapbook outfit builder"
                    >
                        <Palette className="w-3.5 h-3.5 text-[#D5B263]" />
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
                    className="hidden lg:block absolute top-[108px] inset-x-0 bg-[#FDFBF7] border-b border-[#D5B263]/30 shadow-2xl py-10 transition-all animate-fadeIn"
                    onMouseEnter={() => setActiveMegaCategory(activeMegaCategory)}
                    onMouseLeave={() => setActiveMegaCategory(null)}
                >
                    <div className="max-w-7xl mx-auto px-8 grid grid-cols-12 gap-8 items-start">
                        {/* Categories Columns */}
                        <div className="col-span-8 grid grid-cols-3 gap-6">
                            {megaMenus[activeMegaCategory].sections.map((sec, idx) => (
                                <div key={idx} className="space-y-4">
                                    <h4 className="font-serif-luxury text-sm font-bold text-[#121212] uppercase tracking-wider border-b border-[#D5B263]/30 pb-2">
                                        {sec.heading}
                                    </h4>
                                    <ul className="space-y-2 text-xs">
                                        {sec.items.map((item, i) => (
                                            <li key={i}>
                                                <button
                                                    onClick={() => handleCategoryClick(item.cat, item.sub, item.tag)}
                                                    className="text-[#121212]/70 hover:text-[#121212] hover:translate-x-1 font-medium transition-all text-left block"
                                                >
                                                    {item.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Editorial Promo Card */}
                        <div className="col-span-4 bg-[#121212] text-[#FDFBF7] rounded-3xl p-5 border border-[#D5B263]/40 flex gap-4 items-center group cursor-pointer"
                             onClick={megaMenus[activeMegaCategory].promo.action}>
                            <img
                                src={megaMenus[activeMegaCategory].promo.image}
                                alt=""
                                className="w-24 h-32 object-cover rounded-2xl border border-[#D5B263]/30 group-hover:scale-105 transition-transform"
                            />
                            <div className="space-y-2">
                                <span className="text-[9px] font-bold text-[#D5B263] uppercase tracking-widest block">
                                    Featured Drop
                                </span>
                                <h5 className="font-serif-luxury text-base font-bold text-white leading-tight">
                                    {megaMenus[activeMegaCategory].promo.title}
                                </h5>
                                <p className="text-[11px] text-white/60 leading-relaxed font-light">
                                    {megaMenus[activeMegaCategory].promo.subtitle}
                                </p>
                                <span className="text-[10px] font-bold text-[#D5B263] uppercase tracking-wider inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    <span>Shop Now</span>
                                    <ArrowRight className="w-3 h-3" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="lg:hidden border-t border-[#D5B263]/20 bg-[#FDFBF7] px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
                    <div className="flex gap-2 pb-3 border-b border-[#D5B263]/20">
                        <button
                            onClick={() => { openVirtualFit(); setMobileOpen(false); }}
                            className="flex-1 py-2.5 bg-[#121212] text-[#D5B263] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Virtual Fit</span>
                        </button>
                        <button
                            onClick={() => { setIsStylistOpen(true); setMobileOpen(false); }}
                            className="flex-1 py-2.5 bg-[#F7F4EE] border border-[#D5B263]/40 text-[#121212] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                        >
                            <Bot className="w-3.5 h-3.5 text-[#D5B263]" />
                            <span>AI Stylist</span>
                        </button>
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={() => { onNavigatePage('home'); setMobileOpen(false); }}
                            className="w-full text-left py-2 font-serif-luxury text-base font-bold text-[#121212]"
                        >
                            Home Storefront
                        </button>
                        <button
                            onClick={() => handleCategoryClick('dresses', 'midi')}
                            className="w-full text-left py-2 text-sm text-[#121212]/80 hover:text-[#121212]"
                        >
                            Minimal Midi Dresses
                        </button>
                        <button
                            onClick={() => handleCategoryClick('dresses', 'slip')}
                            className="w-full text-left py-2 text-sm text-[#121212]/80 hover:text-[#121212]"
                        >
                            Slip Style Dresses
                        </button>
                        <button
                            onClick={() => handleCategoryClick('dresses', 'aline')}
                            className="w-full text-left py-2 text-sm text-[#121212]/80 hover:text-[#121212]"
                        >
                            A-Line Dresses
                        </button>
                        <button
                            onClick={() => handleCategoryClick('dresses', 'mini')}
                            className="w-full text-left py-2 text-sm text-[#121212]/80 hover:text-[#121212]"
                        >
                            Short Flared One Pieces
                        </button>
                        <button
                            onClick={() => handleCategoryClick('tops', 'fitted')}
                            className="w-full text-left py-2 text-sm text-[#121212]/80 hover:text-[#121212]"
                        >
                            Fitted Basic Tops
                        </button>
                        <button
                            onClick={() => handleCategoryClick('tops', 'off-shoulder')}
                            className="w-full text-left py-2 text-sm text-[#121212]/80 hover:text-[#121212]"
                        >
                            Off Shoulder Tops
                        </button>
                        <button
                            onClick={() => handleCategoryClick('tops', 'net')}
                            className="w-full text-left py-2 text-sm text-[#121212]/80 hover:text-[#121212]"
                        >
                            Net & Sheer Tops
                        </button>
                        <button
                            onClick={() => handleCategoryClick('ethnic', 'kurtis')}
                            className="w-full text-left py-2 text-sm text-[#121212]/80 hover:text-[#121212]"
                        >
                            Modern Long & Short Kurtis
                        </button>
                        <button
                            onClick={() => handleCategoryClick('ethnic', 'sets')}
                            className="w-full text-left py-2 text-sm text-[#121212]/80 hover:text-[#121212]"
                        >
                            Regal Ethnic Sets
                        </button>
                    </div>

                    <div className="pt-4 border-t border-[#D5B263]/20 flex flex-col gap-2">
                        <button
                            onClick={() => { setIsStyleboardOpen(true); setMobileOpen(false); }}
                            className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[#121212] bg-white rounded-xl border border-[#D5B263]/30"
                        >
                            TISUTA Styleboard Scrapbook
                        </button>
                        <button
                            onClick={() => { onNavigatePage('admin'); setMobileOpen(false); }}
                            className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[#D5B263] bg-[#121212] rounded-xl"
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

import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, Sparkles, LayoutDashboard, Layers, ShieldCheck } from 'lucide-react';
import { TisutaMonogram } from '../brand/TisutaMonogram';
import { useShop } from '../../context/ShopContext';

export const Navbar = ({ onOpenMobileMenu, onNavigatePage, currentPage, onOpenOutfitMixer }) => {
    const {
        cart,
        wishlist,
        setIsCartOpen,
        setIsSearchOpen,
        openVirtualFit,
        adminMode,
        setAdminMode
    } = useShop();

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = wishlist.length;

    const handleCategoryClick = (catId) => {
        onNavigatePage('catalog', { category: catId });
    };

    return (
        <header className="sticky top-0 z-40 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-[#0F0F0F]/10 text-[#0F0F0F] transition-all duration-300">

            {/* Quiet Luxury Top Ticker Bar */}
            <div className="bg-[#0F0F0F] text-[#FAFAFA] py-2 px-4 text-[9px] uppercase font-bold tracking-[0.25em]">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-[#C5A059]" />
                        <span>TISUTA PRIVÉ • BESPOKE HIGH FASHION & ATELIER TAILORING</span>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-[#FAFAFA]/70">
                        <span>COMPLIMENTARY EXPRESS WORLDWIDE SHIPPING</span>
                        <span className="text-[#C5A059]">•</span>
                        <span>USE CODE: <strong className="text-white">TISUTA10</strong> FOR 10% OFF</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#FAFAFA]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>100% AUTHENTIC GUARANTEE</span>
                    </div>
                </div>
            </div>

            {/* Main Luxury Header Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

                {/* Mobile Hamburger */}
                <div className="flex items-center gap-3 lg:hidden">
                    <button
                        onClick={onOpenMobileMenu}
                        className="p-2 text-[#0F0F0F] hover:text-[#C5A059] transition-colors"
                        aria-label="Open Mobile Menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="p-2 text-[#0F0F0F] hover:text-[#C5A059] transition-colors"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </div>

                {/* Brand Logo */}
                <div onClick={() => onNavigatePage('home')} className="flex items-center cursor-pointer">
                    <TisutaMonogram className="h-14 py-1 filter drop-shadow-sm" showSubtitle={true} />
                </div>

                {/* Desktop Category Navigation */}
                <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0F0F0F]">
                    <button
                        onClick={() => onNavigatePage('home')}
                        className={`hover:text-[#C5A059] transition-colors py-2 relative ${currentPage === 'home' ? 'text-[#0F0F0F] font-extrabold' : ''}`}
                    >
                        <span>Home</span>
                        {currentPage === 'home' && (
                            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0F0F0F]" />
                        )}
                    </button>

                    <button
                        onClick={() => handleCategoryClick('all')}
                        className="hover:text-[#C5A059] transition-colors py-2"
                    >
                        Couture Catalog
                    </button>

                    <button
                        onClick={() => handleCategoryClick('ethnic')}
                        className="hover:text-[#C5A059] transition-colors py-2"
                    >
                        Heritage Ethnic
                    </button>

                    <button
                        onClick={() => handleCategoryClick('dresses')}
                        className="hover:text-[#C5A059] transition-colors py-2"
                    >
                        Gowns & Dresses
                    </button>

                    {/* LimeRoad Mix-It-Up Studio Minimal Button */}
                    <button
                        onClick={onOpenOutfitMixer}
                        className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0F0F0F]/20 text-[#0F0F0F] hover:border-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-white transition-all cursor-pointer"
                    >
                        <Layers className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold tracking-[0.2em]">OUTFIT MIXER</span>
                    </button>

                    {/* TISUTA Virtual Fit Studio Button */}
                    <button
                        onClick={() => openVirtualFit()}
                        className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F0F0F] text-white hover:bg-[#C5A059] hover:text-[#0F0F0F] transition-all cursor-pointer shadow-sm"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#0F0F0F] transition-colors" />
                        <span className="text-[10px] font-bold tracking-[0.2em]">3D VIRTUAL FIT</span>
                    </button>
                </nav>

                {/* Right Action Icons & Admin Toggle */}
                <div className="flex items-center space-x-3">
                    {/* Admin Panel Toggle */}
                    <button
                        onClick={() => setAdminMode(!adminMode)}
                        className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${adminMode
                                ? 'bg-[#C5A059] text-[#0F0F0F]'
                                : 'bg-[#0F0F0F]/5 text-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-white border border-[#0F0F0F]/10'
                            }`}
                        title="Toggle Enterprise Admin Dashboard"
                    >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>{adminMode ? 'Exit Admin' : 'Admin'}</span>
                    </button>

                    {/* Search */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="hidden lg:flex items-center p-2 text-[#0F0F0F] hover:text-[#C5A059] transition-colors cursor-pointer"
                        aria-label="Search Catalog"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    {/* Account */}
                    <button
                        onClick={() => onNavigatePage('account')}
                        className={`p-2 text-[#0F0F0F] hover:text-[#C5A059] transition-colors ${currentPage === 'account' ? 'text-[#C5A059]' : ''
                            }`}
                        title="Customer Account Dashboard"
                    >
                        <User className="w-5 h-5" />
                    </button>

                    {/* Wishlist */}
                    <button
                        onClick={() => onNavigatePage('account', { tab: 'wishlist' })}
                        className="relative p-2 text-[#0F0F0F] hover:text-[#C5A059] transition-colors cursor-pointer"
                        title="Wishlist"
                    >
                        <Heart className="w-5 h-5" />
                        {wishlistCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-[#0F0F0F] text-white font-bold text-[9px] rounded-full flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </button>

                    {/* Cart Trigger */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2.5 bg-[#0F0F0F] text-white hover:bg-[#C5A059] hover:text-[#0F0F0F] rounded-full transition-all duration-300 shadow-md cursor-pointer group"
                        title="Shopping Cart"
                    >
                        <ShoppingBag className="w-4 h-4 group-hover:scale-105 transition-transform" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A059] text-[#0F0F0F] font-extrabold text-[9px] rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

        </header>
    );
};

export default Navbar;

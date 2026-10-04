import React from 'react';
import { X, Sparkles, User, Heart, ShoppingBag, ArrowRight, LayoutDashboard, ChevronRight } from 'lucide-react';
import { TisutaMonogram } from '../brand/TisutaMonogram';
import { useShop } from '../../context/ShopContext';

export const MobileDrawer = ({ isOpen, onClose, onNavigatePage }) => {
    const { openVirtualFit, cart, wishlist, adminMode, setAdminMode } = useShop();

    if (!isOpen) return null;

    const categories = [
        { name: 'All Collections', cat: 'all' },
        { name: 'Dresses & Gowns', cat: 'dresses' },
        { name: 'Ethnic & Festive', cat: 'ethnic' },
        { name: 'Co-ords & Sets', cat: 'coords' },
        { name: 'Tops & Shirts', cat: 'tops' },
        { name: 'Outerwear', cat: 'outerwear' }
    ];

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-[#121212]/60 backdrop-blur-sm transition-opacity animate-in fade-in"
            />

            {/* Drawer Panel */}
            <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FDFBF7] shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-300">
                <div>
                    {/* Header */}
                    <div className="p-6 flex items-center justify-between border-b border-[#D5B263]/20">
                        <TisutaMonogram className="h-12" showSubtitle={false} />
                        <button
                            onClick={onClose}
                            className="p-2 text-[#121212] hover:text-[#D5B263] transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Virtual Fit Banner */}
                    <div className="p-4 bg-gradient-to-r from-[#121212] to-[#2E2E2E] text-[#FDFBF7]">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-[#D5B263]" />
                            <span className="text-xs font-bold tracking-widest text-[#D5B263]">TISUTA VIRTUAL FIT</span>
                        </div>
                        <p className="text-xs text-[#FDFBF7]/80 mb-3 font-light">
                            Try outfits on your custom 3D body profile before buying.
                        </p>
                        <button
                            onClick={() => {
                                openVirtualFit();
                                onClose();
                            }}
                            className="w-full py-2 bg-[#D5B263] text-[#121212] text-xs font-bold rounded-lg hover:bg-[#C5A059] transition-colors flex items-center justify-center gap-2"
                        >
                            <span>Launch AI Try-On</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Nav links */}
                    <div className="p-4 space-y-1">
                        <div className="text-[10px] font-bold tracking-widest text-[#121212]/40 uppercase px-3 py-2">
                            Navigation
                        </div>
                        {categories.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    onNavigatePage('catalog', { category: item.cat });
                                    onClose();
                                }}
                                className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-[#121212] hover:text-[#D5B263] hover:bg-[#F7F4EE] rounded-lg transition-colors"
                            >
                                <span>{item.name}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-[#D5B263]" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer actions */}
                <div className="p-6 border-t border-[#D5B263]/20 space-y-3 bg-[#F7F4EE]/50">
                    <button
                        onClick={() => {
                            setAdminMode(!adminMode);
                            onClose();
                        }}
                        className="w-full py-2.5 px-4 bg-[#121212] text-[#D5B263] rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>{adminMode ? 'Switch to Storefront' : 'Switch to Admin Panel'}</span>
                    </button>

                    <button
                        onClick={() => {
                            onNavigatePage('account');
                            onClose();
                        }}
                        className="w-full py-2 px-4 border border-[#121212]/20 text-[#121212] rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:border-[#D5B263]"
                    >
                        <User className="w-4 h-4 text-[#D5B263]" />
                        <span>My Account & Orders</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileDrawer;

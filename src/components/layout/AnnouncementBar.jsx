import React from 'react';
import { Sparkles, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AnnouncementBar = () => {
    const { openVirtualFit } = useShop();

    return (
        <div className="bg-[#121212] text-[#FDFBF7] text-xs py-2.5 px-4 border-b border-[#D5B263]/30">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left perk */}
                <div className="hidden md:flex items-center gap-2 text-[#D5B263]">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Complimentary Express Shipping on Orders Above ₹5,000</span>
                </div>

                {/* Center Spotlight feature CTA */}
                <button
                    onClick={() => openVirtualFit()}
                    className="flex items-center gap-2 mx-auto md:mx-0 group text-[#FDFBF7] hover:text-[#D5B263] transition-colors cursor-pointer"
                >
                    <Sparkles className="w-3.5 h-3.5 text-[#D5B263] animate-pulse" />
                    <span className="font-medium tracking-wide">
                        INTRODUCING <strong className="text-[#D5B263]">TISUTA VIRTUAL FIT</strong> — AI Body Scan & Garment Try-On
                    </span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#D5B263]" />
                </button>

                {/* Right currency & help */}
                <div className="hidden lg:flex items-center gap-4 text-[#FDFBF7]/70 text-[11px]">
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D5B263]" />
                        <span>100% Authentic Luxury Guarantee</span>
                    </div>
                    <span>|</span>
                    <span>INR (₹)</span>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBar;

import React, { useState } from 'react';
import { Sparkles, Flame, Tag, Heart, Star, Crown, Compass, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../product/ProductCard';

export const DiscoveryFeed = ({ onSelectProduct, onNavigatePage }) => {
    const { products } = useShop();
    const [activePill, setActivePill] = useState('hot');

    const pills = [
        { id: 'hot', label: "What's Hot", icon: Flame },
        { id: 'under999', label: 'Under ₹999', icon: Tag },
        { id: 'under1499', label: 'Under ₹1,499', icon: Tag },
        { id: 'minimal', label: 'Minimal Midi & Slip', icon: Sparkles },
        { id: 'ethnic', label: 'Royal Ethnic & Sets', icon: Crown },
        { id: 'best-rated', label: 'Most Loved (4.9+ ★)', icon: Star },
        { id: 'luxury', label: 'Haute Runway Luxe', icon: Crown }
    ];

    const filtered = products.filter(p => {
        if (activePill === 'hot') return p.isNewArrival || p.rating >= 4.85;
        if (activePill === 'under999') return p.price <= 999;
        if (activePill === 'under1499') return p.price <= 1499;
        if (activePill === 'minimal') return p.subCategory === 'midi' || p.subCategory === 'slip';
        if (activePill === 'ethnic') return p.category === 'ethnic';
        if (activePill === 'best-rated') return p.rating >= 4.9;
        if (activePill === 'luxury') return p.price >= 5000;
        return true;
    });

    return (
        <section className="py-20 bg-[#FDFBF7] text-[#121212]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D5B263]/30 pb-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Compass className="w-4 h-4 text-[#D5B263]" />
                            <span className="text-[11px] font-bold tracking-[0.25em] text-[#D5B263] uppercase">
                                Discovery Engine
                            </span>
                        </div>
                        <h2 className="font-serif-luxury text-4xl sm:text-5xl text-[#121212] font-bold">
                            Explore Fashion Beyond Shopping
                        </h2>
                        <p className="text-xs sm:text-sm text-[#121212]/60 font-light max-w-md">
                            Curated feeds designed to inspire — from sub-₹999 essentials to multi-lakh Paris couture.
                        </p>
                    </div>

                    <button
                        onClick={() => onNavigatePage('catalog', { category: 'all' })}
                        className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-widest text-[#D5B263] hover:text-[#121212] flex items-center gap-1.5 transition-colors"
                    >
                        <span>View All Categories</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Filter Pills Bar */}
                <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-none">
                    {pills.map(p => {
                        const Icon = p.icon;
                        const isSelected = activePill === p.id;
                        return (
                            <button
                                key={p.id}
                                onClick={() => setActivePill(p.id)}
                                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                                    isSelected
                                        ? 'bg-[#121212] text-[#D5B263] shadow-md border border-[#121212]'
                                        : 'bg-white text-[#121212]/70 border border-[#D5B263]/30 hover:border-[#D5B263] hover:text-[#121212]'
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{p.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filtered.slice(0, 8).map(prod => (
                        <ProductCard
                            key={prod.id}
                            product={prod}
                            onSelectProduct={onSelectProduct}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default DiscoveryFeed;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Tag, Star, Crown, Compass, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../product/ProductCard';

export const DiscoveryFeed = ({ onSelectProduct, onNavigatePage }) => {
    const { products } = useShop();
    const [activePill, setActivePill] = useState('hot');

    const pills = [
        { id: 'hot', label: "Royal Highlights", icon: Flame },
        { id: 'under799', label: 'Under ₹799', icon: Tag },
        { id: 'under1199', label: 'Under ₹1,199', icon: Tag },
        { id: 'dresses', label: 'Midi, Slip & Flared', icon: Sparkles },
        { id: 'ethnic', label: 'Kurtis & Royal Sets', icon: Crown },
        { id: 'tops', label: 'Fitted, Off-Shoulder & Net', icon: Sparkles },
        { id: 'best-rated', label: 'Imperial 5-Star (4.8+ ★)', icon: Star }
    ];

    const filtered = products.filter(p => {
        if (activePill === 'hot') return p.isNewArrival || p.rating >= 4.85;
        if (activePill === 'under799') return p.price <= 799;
        if (activePill === 'under1199') return p.price <= 1199;
        if (activePill === 'dresses') return p.category === 'dresses';
        if (activePill === 'ethnic') return p.category === 'ethnic';
        if (activePill === 'tops') return p.category === 'tops';
        if (activePill === 'best-rated') return p.rating >= 4.8;
        return true;
    });

    return (
        <section className="py-24 bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F5] to-[#FFFFFF] text-[#141210]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D4AF37]/35 pb-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                            <Crown className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-[11px] font-cinzel font-bold tracking-[0.28em] text-[#9E7D23] uppercase">
                                Imperial Discovery Engine
                            </span>
                        </div>
                        <h2 className="font-cinzel text-3xl sm:text-5xl text-[#141210] font-black tracking-tight">
                            Explore Fashion <span className="gold-text-gradient">Beyond Limits</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-[#141210]/70 font-light max-w-md">
                            Curated edits designed for royal elegance — pure 12 women's silhouettes crafted in breathable luxury fabrics from ₹499 to ₹1,899.
                        </p>
                    </div>

                    <button
                        onClick={() => onNavigatePage('catalog', { category: 'all' })}
                        className="mt-4 md:mt-0 text-xs font-cinzel font-bold uppercase tracking-widest text-[#9E7D23] hover:text-[#141210] flex items-center gap-2 transition-colors group cursor-pointer"
                    >
                        <span>View All Silhouettes</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Filter Pills Bar */}
                <div className="flex items-center gap-3 overflow-x-auto pb-3 no-scrollbar">
                    {pills.map(p => {
                        const Icon = p.icon;
                        const isSelected = activePill === p.id;
                        return (
                            <button
                                key={p.id}
                                onClick={() => setActivePill(p.id)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-cinzel font-bold tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                                    isSelected
                                        ? 'bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] text-[#141210] shadow-[0_6px_20px_rgba(212,175,55,0.35)] scale-105 border border-[#F5D77F]'
                                        : 'bg-white text-[#141210]/75 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:text-[#141210] hover:shadow-md'
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{p.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Product Grid with Framer Motion AnimatePresence */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {filtered.slice(0, 8).map(prod => (
                            <motion.div
                                key={prod.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ProductCard
                                    product={prod}
                                    onSelectProduct={onSelectProduct}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
};

export default DiscoveryFeed;

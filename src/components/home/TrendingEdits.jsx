import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Sparkles } from 'lucide-react';
import { getImgUrl } from '../../utils/imageUtils';

const EDITS = [
    {
        id: 'royal-festive',
        label: 'Festive Royal',
        title: 'THE ROYAL HERITAGE EDIT',
        subtitle: 'Kashmiri tilla work, pure Chanderi weaves, and flared Anarkali gowns with 24K gota patti borders.',
        image: '/images/products/ethnic_sets_1.jpg',
        tag: 'ethnic',
        pieces: 'Kurtis & Sets'
    },
    {
        id: 'slip-couture',
        label: 'Silk Atelier',
        title: 'SLIP & MINIMAL MIDI DRESSES',
        subtitle: 'Liquid mulberry satin draping and timeless cowl-neck resort slip silhouettes.',
        image: '/images/products/slip_style_1.jpg',
        tag: 'dresses',
        pieces: 'Slip Dresses'
    },
    {
        id: 'sheer-tops',
        label: 'Haute Netting',
        title: 'SHEER NET ER & CROP TOPS',
        subtitle: 'Architectural sheer illusion netting with hand-embroidered jewel florals.',
        image: '/images/products/net_top_1.jpg',
        tag: 'tops',
        pieces: 'Net & Crop Tops'
    }
];

export const TrendingEdits = ({ onNavigatePage }) => {
    return (
        <section className="py-24 bg-gradient-to-b from-[#FAF8F5] via-[#FFFFFF] to-[#FAF8F5] text-[#141210] overflow-hidden relative">

            {/* Ambient golden radial spotlight */}
            <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#D4AF37]/35 pb-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                            <div className="h-0.5 w-10 bg-gradient-to-r from-[#D4AF37] to-[#F5D77F]" />
                            <Crown className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-[11px] font-cinzel font-bold tracking-[0.28em] text-[#9E7D23] uppercase">
                                Royale Lookbooks • Atelier Editions
                            </span>
                        </div>
                        <h2 className="font-cinzel text-4xl sm:text-6xl text-[#141210] font-black leading-tight tracking-tight">
                            Trending <span className="gold-text-gradient">Royale Edits</span>
                        </h2>
                    </div>
                    <p className="text-sm text-[#141210]/70 font-light max-w-sm leading-relaxed">
                        Immersive fashion stories styled for every signature moment — from royal festive weddings to modern high-glamour soirees.
                    </p>
                </div>

                {/* Editorial 3-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Hero Feature */}
                    <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => onNavigatePage('catalog', { category: EDITS[0].tag })}
                        className="md:col-span-7 group relative cursor-pointer overflow-hidden rounded-3xl bg-white border border-[#D4AF37]/35 hover:border-[#D4AF37] min-h-[520px] sm:min-h-[580px] shadow-xl hover:shadow-[0_24px_50px_rgba(212,175,55,0.25)] transition-all duration-500"
                    >
                        <img 
                            src={getImgUrl(EDITS[0].image)} 
                            alt={EDITS[0].title}
                            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-106" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/95 via-[#141210]/40 to-transparent" />

                        {/* Gold Border Highlight Ring */}
                        <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none group-hover:border-[#F5D77F]/60 transition-colors" />

                        <div className="absolute bottom-0 left-0 p-8 sm:p-10 space-y-3 z-10">
                            <div className="flex items-center gap-2.5 mb-2">
                                <span className="px-3.5 py-1 bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#141210] text-[10px] font-cinzel font-black tracking-widest uppercase rounded-full shadow-md">
                                    {EDITS[0].label}
                                </span>
                                <span className="text-xs text-[#F5D77F] font-semibold">{EDITS[0].pieces}</span>
                            </div>
                            <h3 className="font-cinzel text-3xl sm:text-4xl text-white font-black leading-tight group-hover:text-[#F5D77F] transition-colors duration-300">
                                {EDITS[0].title}
                            </h3>
                            <p className="text-xs sm:text-sm text-white/80 font-light max-w-md">{EDITS[0].subtitle}</p>
                            <div className="flex items-center gap-2 text-[#F5D77F] text-xs font-cinzel font-bold uppercase tracking-widest pt-2 group-hover:gap-3 transition-all">
                                <span>Shop the Royale Edit</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right stacked cards */}
                    <div className="md:col-span-5 flex flex-col gap-6">
                        {EDITS.slice(1).map((edit) => (
                            <motion.div
                                key={edit.id}
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.4 }}
                                onClick={() => onNavigatePage('catalog', { category: edit.tag })}
                                className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white border border-[#D4AF37]/35 hover:border-[#D4AF37] flex-1 min-h-[260px] shadow-lg hover:shadow-[0_18px_40px_rgba(212,175,55,0.22)] transition-all duration-500"
                            >
                                <img 
                                    src={getImgUrl(edit.image)} 
                                    alt={edit.title}
                                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-106" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-[#141210]/35 to-transparent" />
                                <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none group-hover:border-[#F5D77F]/60 transition-colors" />

                                <div className="absolute bottom-0 left-0 p-6 sm:p-7 space-y-2 z-10">
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-0.5 bg-black/60 border border-[#D4AF37]/60 text-[#F5D77F] text-[9px] font-cinzel font-bold tracking-widest uppercase rounded-full backdrop-blur-md">
                                            {edit.label}
                                        </span>
                                        <span className="text-[10px] text-white/70">{edit.pieces}</span>
                                    </div>
                                    <h4 className="font-cinzel text-xl sm:text-2xl text-white font-bold group-hover:text-[#F5D77F] transition-colors">
                                        {edit.title}
                                    </h4>
                                    <div className="flex items-center gap-1.5 text-[#F5D77F] text-[11px] font-cinzel font-bold uppercase tracking-widest pt-1 group-hover:translate-x-1 transition-transform">
                                        <span>Explore Silhouette</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TrendingEdits;

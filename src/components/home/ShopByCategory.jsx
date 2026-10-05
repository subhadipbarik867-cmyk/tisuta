import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Crown, Sparkles } from 'lucide-react';
import { getImgUrl } from '../../utils/imageUtils';

export const ShopByCategory = ({ onNavigatePage }) => {
    const categories = [
        {
            id: 'dresses',
            subCategory: 'minimal-midi',
            title: 'Minimal & Slip Dresses',
            subtitle: 'Silk Minimalist Midi & Cowl-Neck Satin Slip Dresses',
            image: '/images/products/minimal_midi_1.jpg',
            count: 'Midi & Slip Edits',
            tag: 'ATELIER COUTURE',
            col: 'col-span-1 md:col-span-2 row-span-2'
        },
        {
            id: 'ethnic',
            subCategory: 'ethnic-sets',
            title: 'Kurtis & Royal Ethnic Sets',
            subtitle: 'Modern Long Kurtis, Peplum Short Kurtis & 3-Piece Anarkali Sets',
            image: '/images/products/ethnic_sets_1.jpg',
            count: 'Chanderi & Mulmul Sets',
            tag: 'ROYAL HERITAGE',
            col: 'col-span-1 row-span-1'
        },
        {
            id: 'tops',
            subCategory: 'fitted-basic',
            title: 'Fitted & Off-Shoulder Tops',
            subtitle: 'Second-Skin Modal Basic Tops & Ruched Bardot Off-Shoulder Tops',
            image: '/images/products/fitted_basic_1.jpg',
            count: 'Ribbed & Viscose Tops',
            tag: 'SIGNATURE FIT',
            col: 'col-span-1 row-span-1'
        },
        {
            id: 'dresses',
            subCategory: 'short-flared',
            title: 'A-Line & Flared One Pieces',
            subtitle: 'Pleated Linen A-Line Midis & Tiered Ruffle Flared Short Dresses',
            image: '/images/products/short_flared_1.jpg',
            count: 'Flared Silhouettes',
            tag: 'RUNWAY ESSENTIAL',
            col: 'col-span-1 row-span-1'
        },
        {
            id: 'tops',
            subCategory: 'net-top',
            title: 'Crop Tops & Net Er Tops',
            subtitle: 'Square-Neck Architectural Crop Tops & Sheer Illusion Netting Tops',
            image: '/images/products/net_top_1.jpg',
            count: 'Sheer & Crop Edits',
            tag: 'ROYALE SHEER',
            col: 'col-span-1 row-span-1'
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-[#FAF8F5] via-[#FFFFFF] to-[#FAF8F5] text-[#141210] relative overflow-hidden">
            {/* Subtle background golden glow halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D4AF37]/35 pb-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                            <div className="h-0.5 w-10 bg-gradient-to-r from-[#D4AF37] to-[#F5D77F]" />
                            <Crown className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-[11px] font-cinzel font-bold tracking-[0.28em] text-[#9E7D23] uppercase">
                                Royale Atelier Editions • Pure Silhouettes
                            </span>
                        </div>
                        <h2 className="font-cinzel text-3xl sm:text-5xl text-[#141210] font-black tracking-tight">
                            Explore <span className="gold-text-gradient">Haute Collections</span>
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#141210]/70 font-light max-w-sm mt-4 md:mt-0 leading-relaxed font-sans">
                        Sculpted for pure imperial opulence — each silhouette tailored in breathable chanderi, mulmul silk, ribbed cotton, and sheer netting.
                    </p>
                </div>

                {/* Editorial Masonry Grid with Figma-Style Spring Hover */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] sm:auto-rows-[280px]">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.subCategory || cat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -6, scale: 1.015 }}
                            onClick={() => onNavigatePage('catalog', { category: cat.id, subCategory: cat.subCategory || 'all' })}
                            className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg bg-white border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-[0_20px_45px_rgba(212,175,55,0.22)] transition-all duration-500 ${cat.col}`}
                        >
                            <img
                                src={getImgUrl(cat.image)}
                                alt={cat.title}
                                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                            />

                            {/* Royal Multi-stop Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/95 via-[#141210]/35 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#9E7D23]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Gold Border Highlight Ring */}
                            <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none group-hover:border-[#F5D77F]/60 transition-colors" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-cinzel font-bold text-[#F5D77F] tracking-[0.2em] uppercase px-3 py-1 bg-black/60 rounded-full border border-[#D4AF37]/50 backdrop-blur-md shadow-md">
                                        {cat.tag}
                                    </span>
                                </div>

                                <div className="flex items-end justify-between gap-4">
                                    <div className="space-y-1.5 max-w-[80%]">
                                        <div className="text-[11px] text-[#F5D77F] font-bold tracking-wider uppercase flex items-center gap-1.5">
                                            <Sparkles className="w-3 h-3 text-[#F5D77F]" />
                                            <span>{cat.count}</span>
                                        </div>
                                        <h3 className="font-cinzel text-xl sm:text-2xl text-white font-bold leading-tight group-hover:text-[#F5D77F] transition-colors">
                                            {cat.title}
                                        </h3>
                                        <p className="text-xs text-white/80 font-light hidden sm:block line-clamp-1">{cat.subtitle}</p>
                                    </div>

                                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-[#D4AF37]/60 flex items-center justify-center text-[#F5D77F] group-hover:bg-[#D4AF37] group-hover:text-[#141210] group-hover:border-[#F5D77F] transition-all duration-500 transform group-hover:rotate-45 shadow-xl">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ShopByCategory;

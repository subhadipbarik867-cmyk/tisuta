import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
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
            col: 'col-span-2 row-span-2'
        },
        {
            id: 'ethnic',
            subCategory: 'ethnic-sets',
            title: 'Kurtis & Royal Ethnic Sets',
            subtitle: 'Modern Long Kurtis, Peplum Short Kurtis & 3-Piece Anarkali Sets',
            image: '/images/products/ethnic_sets_1.jpg',
            count: 'Chanderi & Mulmul Sets',
            col: 'col-span-1 row-span-1'
        },
        {
            id: 'tops',
            subCategory: 'fitted-basic',
            title: 'Fitted & Off-Shoulder Tops',
            subtitle: 'Second-Skin Modal Basic Tops & Ruched Bardot Off-Shoulder Tops',
            image: '/images/products/fitted_basic_1.jpg',
            count: 'Ribbed & Viscose Tops',
            col: 'col-span-1 row-span-1'
        },
        {
            id: 'dresses',
            subCategory: 'short-flared',
            title: 'A-Line & Flared One Pieces',
            subtitle: 'Pleated Linen A-Line Midis & Tiered Ruffle Flared Short Dresses',
            image: '/images/products/short_flared_1.jpg',
            count: 'Flared Silhouettes',
            col: 'col-span-1 row-span-1'
        },
        {
            id: 'tops',
            subCategory: 'net-top',
            title: 'Crop Tops & Net Er Tops',
            subtitle: 'Square-Neck Architectural Crop Tops & Sheer Illusion Netting Tops',
            image: '/images/products/net_top_1.jpg',
            count: 'Sheer & Crop Edits',
            col: 'col-span-1 row-span-1'
        }
    ];

    return (
        <section className="py-24 bg-[#FDFBF7] text-[#121212]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D5B263]/30 pb-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="h-0.5 w-8 bg-[#D5B263]" />
                            <span className="text-[11px] font-bold tracking-[0.25em] text-[#D5B263] uppercase">Curated Atelier Editions</span>
                        </div>
                        <h2 className="font-serif-luxury text-4xl sm:text-5xl text-[#121212] font-bold">
                            Explore Haute Collections
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#121212]/60 font-light max-w-xs mt-4 md:mt-0 leading-relaxed">
                        Sculpted for modern luxury wardrobes — from resort silk gowns to heritage bridal zardozi.
                    </p>
                </div>

                {/* Editorial Masonry Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 auto-rows-[240px]">
                    {categories.map((cat) => (
                        <div
                            key={cat.subCategory || cat.title}
                            onClick={() => onNavigatePage('catalog', { category: cat.id, subCategory: cat.subCategory || 'all' })}
                            className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-md bg-[#121212] border border-[#D5B263]/30 img-zoom-container card-luxury-hover ${cat.col}`}
                        >
                            <img
                                src={getImgUrl(cat.image)}
                                alt={cat.title}
                                className="w-full h-full object-cover object-center img-luxury-zoom opacity-85 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/30 to-transparent" />

                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <div className="flex items-end justify-between gap-4">
                                    <div className="space-y-1">
                                        <span className="text-[10px] text-[#D5B263] font-bold tracking-widest uppercase px-2.5 py-0.5 bg-[#121212]/80 rounded-full border border-[#D5B263]/40 backdrop-blur-md">
                                            {cat.count}
                                        </span>
                                        <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FDFBF7] font-bold leading-tight group-hover:text-[#D5B263] transition-colors">
                                            {cat.title}
                                        </h3>
                                        <p className="text-xs text-[#FDFBF7]/70 font-light hidden sm:block">{cat.subtitle}</p>
                                    </div>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur border border-[#D5B263]/50 flex items-center justify-center text-[#FDFBF7] group-hover:bg-[#D5B263] group-hover:text-[#121212] group-hover:border-[#D5B263] transition-all duration-500 transform group-hover:rotate-45 shadow-lg">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ShopByCategory;

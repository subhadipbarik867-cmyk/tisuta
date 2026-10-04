import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const ShopByCategory = ({ onNavigatePage }) => {
    const categories = [
        {
            id: 'dresses',
            title: 'Evening Gowns',
            subtitle: 'Mulberry Silk Slip Silhouettes',
            image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
            count: '28 Pieces',
            col: 'col-span-2 row-span-2'
        },
        {
            id: 'ethnic',
            title: 'Heritage Ethnic',
            subtitle: 'Zardozi, Banarasi & Chanderi Silks',
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
            count: '35 Pieces',
            col: 'col-span-1 row-span-1'
        },
        {
            id: 'coords',
            title: 'Tailored Co-ords',
            subtitle: 'Power Dressing & Executive Luxe',
            image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
            count: '14 Pieces',
            col: 'col-span-1 row-span-1'
        },
        {
            id: 'outerwear',
            title: 'Luxury Outerwear',
            subtitle: 'Virgin Wool & Cashmere Coats',
            image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
            count: '11 Pieces',
            col: 'col-span-1 row-span-1'
        },
        {
            id: 'jewelry',
            title: 'High Jewelry',
            subtitle: 'Polki, Kundan & Diamond Atelier',
            image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
            count: '19 Pieces',
            col: 'col-span-1 row-span-1'
        }
    ];

    return (
        <section className="py-24 bg-white text-[#0A0908]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-[#C5A059]" />
                            <span className="text-[11px] font-bold tracking-[0.25em] text-[#C5A059] uppercase">Curated Collections</span>
                        </div>
                        <h2 className="font-serif-luxury text-4xl sm:text-5xl text-[#0A0908] font-bold">
                            Shop by Category
                        </h2>
                    </div>
                    <p className="text-sm text-gray-400 font-light max-w-xs mt-4 md:mt-0 leading-relaxed">
                        Meticulously designed for the modern luxury wardrobe — from bridal ethnic to editorial gowns.
                    </p>
                </div>

                {/* Editorial Masonry Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 auto-rows-[220px]">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => onNavigatePage('catalog', { category: cat.id })}
                            className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-md bg-[#0A0908] ${cat.col}`}
                        >
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-95"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/85 via-[#0A0908]/20 to-transparent" />

                            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
                                <div className="flex items-end justify-between gap-4">
                                    <div>
                                        <span className="text-[10px] text-[#C5A059] font-bold tracking-widest uppercase">{cat.count}</span>
                                        <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-bold leading-tight group-hover:text-[#C5A059] transition-colors">
                                            {cat.title}
                                        </h3>
                                        <p className="text-xs text-white/60 font-light mt-0.5 hidden sm:block">{cat.subtitle}</p>
                                    </div>
                                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/15 backdrop-blur border border-[#C5A059]/40 flex items-center justify-center text-white group-hover:bg-[#C5A059] group-hover:text-[#0A0908] group-hover:border-[#C5A059] transition-all transform group-hover:rotate-45">
                                        <ArrowUpRight className="w-4 h-4" />
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

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const EDITS = [
    {
        id: 'royal-festive',
        label: 'Festive Royal',
        title: 'THE ROYAL FESTIVE EDIT',
        subtitle: 'Zardozi gold embroidery, Banarasi brocade & Chanderi tissue silks. Worn by queens.',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
        tag: 'ethnic',
        pieces: '40 Pieces'
    },
    {
        id: 'red-carpet',
        label: 'Red Carpet',
        title: 'GALA GOWN ATELIER',
        subtitle: 'Mulberry silk corset gowns & sculpted asymmetric silhouettes for the spotlight.',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
        tag: 'dresses',
        pieces: '28 Pieces'
    },
    {
        id: 'power-edit',
        label: 'Power Dressing',
        title: 'EXECUTIVE LUXE',
        subtitle: 'Tailored Italian wool blazers and Japanese pleated sets that command every room.',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
        tag: 'coords',
        pieces: '14 Pieces'
    }
];

export const TrendingEdits = ({ onNavigatePage }) => {
    return (
        <section className="py-0 bg-[#0A0908] text-white overflow-hidden">

            {/* Thin gold top rule */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

                {/* Section Header — left-aligned editorial */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-8 bg-[#C5A059]" />
                            <span className="text-[10px] font-bold tracking-[0.35em] text-[#C5A059] uppercase">Seasonal Lookbooks</span>
                        </div>
                        <h2 className="font-serif-luxury text-5xl sm:text-6xl text-white font-bold leading-[0.95]">
                            Trending<br />Edits
                        </h2>
                    </div>
                    <p className="text-sm text-white/40 font-light max-w-xs leading-relaxed">
                        Immersive fashion stories styled for every signature moment — from bridal mandaps to boardrooms.
                    </p>
                </div>

                {/* Editorial 3-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                    {/* Hero Feature */}
                    <div
                        onClick={() => onNavigatePage('catalog', { category: EDITS[0].tag })}
                        className="md:col-span-7 group relative cursor-pointer overflow-hidden bg-[#0A0908] min-h-[580px]"
                    >
                        <img src={EDITS[0].image} alt={EDITS[0].title}
                            className="absolute inset-0 w-full h-full object-cover object-top opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/90 via-[#0A0908]/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0908]/40 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-8 sm:p-10 space-y-3 z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2.5 py-1 bg-[#C5A059] text-[#0A0908] text-[9px] font-bold tracking-widest uppercase">
                                    {EDITS[0].label}
                                </span>
                                <span className="text-[10px] text-white/50">{EDITS[0].pieces}</span>
                            </div>
                            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white font-bold leading-[1.0] group-hover:text-[#C5A059] transition-colors duration-300">
                                {EDITS[0].title}
                            </h3>
                            <p className="text-sm text-white/60 font-light max-w-sm">{EDITS[0].subtitle}</p>
                            <div className="flex items-center gap-2 text-[#C5A059] text-xs font-bold uppercase tracking-widest pt-2 group-hover:gap-3 transition-all">
                                <span>Shop the Edit</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Corner gold rule */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#C5A059]/0 via-[#C5A059]/0 to-[#C5A059]/0 group-hover:via-[#C5A059]/60 transition-all duration-500" />
                    </div>

                    {/* Right stacked cards */}
                    <div className="md:col-span-5 flex flex-col gap-4">
                        {EDITS.slice(1).map((edit) => (
                            <div
                                key={edit.id}
                                onClick={() => onNavigatePage('catalog', { category: edit.tag })}
                                className="group relative cursor-pointer overflow-hidden bg-[#0A0908] flex-1 min-h-[280px]"
                            >
                                <img src={edit.image} alt={edit.title}
                                    className="absolute inset-0 w-full h-full object-cover object-center opacity-65 group-hover:opacity-88 group-hover:scale-105 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/80 via-[#0A0908]/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-6 space-y-2 z-10">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-[9px] font-bold tracking-widest uppercase">
                                            {edit.label}
                                        </span>
                                        <span className="text-[9px] text-white/40">{edit.pieces}</span>
                                    </div>
                                    <h4 className="font-serif-luxury text-xl sm:text-2xl text-white font-bold group-hover:text-[#C5A059] transition-colors">
                                        {edit.title}
                                    </h4>
                                    <div className="flex items-center gap-1.5 text-[#C5A059] text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>Explore</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />
        </section>
    );
};

export default TrendingEdits;

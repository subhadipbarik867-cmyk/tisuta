import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronRight, Play, ShieldCheck, Globe } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { heroSlides as slides } from '../../data/productsData';

export const HeroSection = ({ onNavigatePage }) => {
    const { openVirtualFit } = useShop();
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const t = setInterval(() => {
            setAnimating(true);
            setTimeout(() => {
                setCurrent(p => (p + 1) % slides.length);
                setAnimating(false);
            }, 400);
        }, 9000);
        return () => clearInterval(t);
    }, []);

    const goTo = (idx) => {
        if (idx === current) return;
        setAnimating(true);
        setTimeout(() => { setCurrent(idx); setAnimating(false); }, 300);
    };

    const slide = slides[current];

    return (
        <section className="relative h-[92vh] min-h-[680px] overflow-hidden bg-[#121212]">

            {/* Ambient Fashion Runway Video Loops — Smooth Crossfade */}
            {slides.map((s, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-out ${i === current ? 'opacity-100 z-0 scale-100' : 'opacity-0 -z-10 scale-105'
                        }`}
                >
                    <video
                        src={s.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={s.fallbackImage}
                        className="w-full h-full object-cover filter brightness-90"
                    />
                </div>
            ))}

            {/* High-Fashion Gradient Vignette Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/95 via-[#121212]/70 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-transparent to-[#121212]/40 z-10" />

            {/* Main Content Stage */}
            <div className={`relative z-20 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center transition-all duration-700 ${animating ? 'opacity-0 translateY-6' : 'opacity-100 translateY-0'}`}>

                <div className="max-w-2xl space-y-6">

                    {/* Editorial Season Tag */}
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-10 bg-[#D5B263]" />
                        <span className="text-[10px] font-extrabold tracking-[0.35em] text-[#D5B263] uppercase px-3 py-1 bg-[#121212]/80 rounded-full border border-[#D5B263]/30 backdrop-blur-md animate-float-slow">
                            {slide.tag}
                        </span>
                    </div>

                    {/* Clean Quiet Luxury Serif Headline */}
                    <h1 className="font-serif-luxury text-[60px] sm:text-[80px] lg:text-[96px] font-bold leading-[0.92] tracking-tight text-[#FDFBF7] whitespace-pre-line drop-shadow-xl">
                        {slide.title}
                    </h1>

                    {/* Subtext */}
                    <p className="text-sm sm:text-base text-[#FDFBF7]/80 font-light leading-relaxed max-w-lg">
                        {slide.subtitle}
                    </p>

                    {/* High Fashion Action CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <button
                            onClick={() => onNavigatePage('catalog', { category: slide.ctaCategory })}
                            className="bg-[#D5B263] text-[#121212] font-bold text-[11px] uppercase tracking-[0.25em] flex items-center gap-3 px-8 py-4 rounded-xl hover:bg-white hover:text-[#121212] transition-all cursor-pointer shadow-xl hover:shadow-[#D5B263]/30 hover:-translate-y-1"
                        >
                            <span>{slide.cta}</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => openVirtualFit()}
                            className="group flex items-center gap-2 px-8 py-4 bg-[#121212]/80 border border-[#D5B263]/50 text-[#FDFBF7] hover:bg-[#D5B263] hover:text-[#121212] font-bold text-[11px] uppercase tracking-[0.25em] rounded-xl transition-all cursor-pointer backdrop-blur-md hover:-translate-y-1"
                        >
                            <Sparkles className="w-4 h-4 text-[#D5B263] group-hover:text-[#121212] animate-pulse" />
                            <span>3D VIRTUAL FIT</span>
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="pt-8 flex flex-wrap items-center gap-8 border-t border-white/15">
                        {[
                            { label: '100% AUTHENTICATED ATELIER', icon: ShieldCheck },
                            { label: 'EXPRESS GLOBAL DELIVERY', icon: Globe },
                            { label: 'PARISIAN TAILORING', icon: Sparkles }
                        ].map(b => (
                            <div key={b.label} className="flex items-center gap-2 text-[#D5B263]/80 text-[10px] font-bold tracking-widest uppercase">
                                <b.icon className="w-3.5 h-3.5 text-[#D5B263]" />
                                {b.label}
                            </div>
                        ))}
                    </div>

                </div>

            </div>

            {/* Slide Counter & Progress Controls — Bottom Right */}
            <div className="absolute bottom-12 right-12 z-30 flex items-center gap-6 bg-[#121212]/70 p-3 rounded-2xl border border-[#D5B263]/30 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    {slides.map((_, i) => (
                        <button key={i} onClick={() => goTo(i)} className="cursor-pointer">
                            <div className={`transition-all duration-500 rounded-full ${i === current ? 'w-10 h-1.5 bg-[#D5B263]' : 'w-3 h-1.5 bg-white/30 hover:bg-white'}`} />
                        </button>
                    ))}
                </div>
                <span className="text-[10px] text-[#D5B263] font-bold tracking-widest">
                    0{current + 1} / 0{slides.length}
                </span>
                <button
                    onClick={() => goTo((current + 1) % slides.length)}
                    className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-[#D5B263] hover:text-[#121212] transition-all cursor-pointer"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

        </section>
    );
};

export default HeroSection;

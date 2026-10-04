import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronRight, Play } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const slides = [
    {
        title: 'POWER IN\nSILK.',
        subtitle: 'Mulberry silk corset gowns, sculpted for the modern woman. Every stitch, intentional.',
        tag: 'RED CARPET ATELIER 2026',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-model-walking-on-a-runway-41560-large.mp4',
        fallbackImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1900&auto=format&fit=crop',
        cta: 'EXPLORE EVENING GOWNS',
        ctaCategory: 'dresses'
    },
    {
        title: 'THE ROYAL\nFESTIVE\nEDIT.',
        subtitle: 'Handwoven Zardozi gold embroidery. Chanderi silks crafted in Varanasi. Worn by royalty.',
        tag: 'FESTIVE COUTURE',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-saree-posing-for-a-photo-41557-large.mp4',
        fallbackImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1900&auto=format&fit=crop',
        cta: 'EXPLORE HERITAGE ETHNIC',
        ctaCategory: 'ethnic'
    },
    {
        title: 'EXECUTIVE\nPOWER\nTAILORING.',
        subtitle: 'Japanese micro-pleated satins. Bespoke Italian wool blazers. Command every room.',
        tag: 'QUIET LUXURY EDITION',
        video: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-black-jacket-41555-large.mp4',
        fallbackImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1900&auto=format&fit=crop',
        cta: 'EXPLORE POWER CO-ORDS',
        ctaCategory: 'coords'
    }
];

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
        }, 8000);
        return () => clearInterval(t);
    }, []);

    const goTo = (idx) => {
        if (idx === current) return;
        setAnimating(true);
        setTimeout(() => { setCurrent(idx); setAnimating(false); }, 300);
    };

    const slide = slides[current];

    return (
        <section className="relative h-[92vh] min-h-[650px] overflow-hidden bg-[#0F0F0F]">

            {/* Ambient Fashion Runway Video Loops — Smooth Crossfade */}
            {slides.map((s, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100 z-0' : 'opacity-0 -z-10'
                        }`}
                >
                    <video
                        src={s.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={s.fallbackImage}
                        className="w-full h-full object-cover scale-105 filter brightness-75"
                    />
                </div>
            ))}

            {/* High-Fashion Gradient Vignette Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/95 via-[#0F0F0F]/65 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/90 via-transparent to-[#0F0F0F]/30 z-10" />

            {/* Main Content */}
            <div className={`relative z-20 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>

                <div className="max-w-2xl space-y-6">

                    {/* Editorial Season Tag */}
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] w-8 bg-[#C5A059]" />
                        <span className="text-[10px] font-extrabold tracking-[0.35em] text-[#C5A059] uppercase">{slide.tag}</span>
                    </div>

                    {/* Clean Quiet Luxury Serif Headline */}
                    <h1 className="font-serif-luxury text-[64px] sm:text-[84px] lg:text-[100px] font-bold leading-[0.92] tracking-tight text-[#FAFAFA] whitespace-pre-line drop-shadow-md">
                        {slide.title}
                    </h1>

                    {/* Subtext */}
                    <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-lg">
                        {slide.subtitle}
                    </p>

                    {/* Zara-Grade High Fashion Action CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <button
                            onClick={() => onNavigatePage('catalog', { category: slide.ctaCategory })}
                            className="btn-luxury-primary flex items-center gap-3 shadow-xl"
                        >
                            <span>{slide.cta}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                            onClick={() => openVirtualFit()}
                            className="group flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[#0F0F0F] font-semibold text-[11px] uppercase tracking-[0.25em] transition-all cursor-pointer"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#0F0F0F]" />
                            <span>3D VIRTUAL FIT</span>
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="pt-8 flex flex-wrap items-center gap-8 border-t border-white/15">
                        {[
                            '100% AUTHENTICATED ATELIER',
                            'EXPRESS GLOBAL DELIVERY',
                            'BESPOKE TAILORING'
                        ].map(b => (
                            <div key={b} className="flex items-center gap-2 text-white/60 text-[10px] font-medium tracking-widest">
                                <div className="w-1 h-1 rounded-full bg-[#C5A059]" />
                                {b}
                            </div>
                        ))}
                    </div>

                </div>

            </div>

            {/* Slide Counter & Minimal Controls — Bottom Right */}
            <div className="absolute bottom-8 right-8 z-30 flex items-center gap-4">
                <div className="flex items-center gap-2">
                    {slides.map((_, i) => (
                        <button key={i} onClick={() => goTo(i)} className="cursor-pointer">
                            <div className={`transition-all duration-500 ${i === current ? 'w-8 h-[2px] bg-[#C5A059]' : 'w-3 h-[2px] bg-white/30 hover:bg-white'}`} />
                        </button>
                    ))}
                </div>
                <span className="text-[10px] text-white/50 font-mono tracking-widest">
                    {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </span>
                <button
                    onClick={() => goTo((current + 1) % slides.length)}
                    className="p-2.5 border border-white/20 text-white hover:border-[#C5A059] hover:text-[#C5A059] transition-all cursor-pointer rounded-full"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

        </section>
    );
};

export default HeroSection;

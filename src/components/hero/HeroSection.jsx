import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ArrowRight, Sparkles, ChevronRight, Crown, ShieldCheck, Globe, Star, Gem } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { heroSlides as slides } from '../../data/productsData';
import { getImgUrl } from '../../utils/imageUtils';

export const HeroSection = ({ onNavigatePage }) => {
    const { openVirtualFit } = useShop();
    const [current, setCurrent] = useState(0);
    const heroRef = useRef(null);

    // GSAP Royal Entrance Timeline
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.gsap-royale-fade', {
                opacity: 0,
                y: 30,
                stagger: 0.15,
                duration: 1.2,
                ease: 'power4.out',
                clearProps: 'all'
            });

            gsap.to('.gsap-gold-pulse', {
                boxShadow: '0 0 35px rgba(212, 175, 55, 0.65)',
                repeat: -1,
                yoyo: true,
                duration: 2.2,
                ease: 'sine.inOut'
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Auto rotate slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    const slide = slides[current];

    // ✦ Figma-Style 3D Spring Tilt Physics for Royale Showcase Card ✦
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 180 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section ref={heroRef} className="relative min-h-[90vh] bg-gradient-to-b from-[#141210] via-[#1C1814] to-[#141210] overflow-hidden text-white flex flex-col justify-between">

            {/* ✦ AMBIENT ROYALE GOLD BEAMS & GLOW AURA ✦ */}
            <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-gradient-to-br from-[#D4AF37]/25 via-[#AA771C]/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-0" />
            <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-gradient-to-tr from-[#D4AF37]/15 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none -z-0" />

            {/* ✦ FLOATING GOLD PARTICLES CANVAS (12 Floating Star Dust Emitters) ✦ */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {[...Array(14)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-tr from-[#FFF2BF] to-[#D4AF37]"
                        style={{
                            width: i % 3 === 0 ? '5px' : '3px',
                            height: i % 3 === 0 ? '5px' : '3px',
                            top: `${(i * 19) % 95}%`,
                            left: `${(i * 27) % 92}%`,
                            boxShadow: '0 0 10px rgba(212, 175, 55, 0.9)'
                        }}
                        animate={{
                            y: [-10, -40, -10],
                            x: [0, (i % 2 === 0 ? 15 : -15), 0],
                            opacity: [0.2, 0.9, 0.2],
                            scale: [1, 1.4, 1]
                        }}
                        transition={{
                            duration: 4 + (i % 5),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: (i * 0.4)
                        }}
                    />
                ))}
            </div>

            {/* ✦ MAIN HERO STAGE ✦ */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex-1 flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

                    {/* Left Column: Royale Typography & CTAs (7 Cols) */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Top Royal Tag Badge with Pulse Halo */}
                        <div 
                            className="gsap-royale-fade inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/60 shadow-[0_0_25px_rgba(212,175,55,0.3)] backdrop-blur-md"
                        >
                            <Crown className="w-3.5 h-3.5 text-[#F5D77F] animate-pulse" />
                            <span className="font-cinzel text-[10.5px] font-bold tracking-[0.3em] uppercase text-[#FFF5D1]">
                                TISUTA CREATION • HAUTE COUTURE ROYALE
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                        </div>

                        {/* Grand Royale Headline */}
                        <div
                            key={current}
                            className="gsap-royale-fade space-y-3"
                        >
                            <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
                                THE APOGEE OF <br />
                                <span className="gold-text-gradient underline decoration-[#D4AF37]/30 decoration-wavy underline-offset-8">
                                    ROYALE LUXURY
                                </span>
                            </h1>
                            <p className="text-sm sm:text-base text-[#FDFBF7]/85 font-light max-w-xl leading-relaxed font-sans pt-2">
                                Where Imperial Indian Needlework Meets Contemporary Haute Silhouettes. Sculpted in pure Chanderi silk, French illusion tulle, and double-crepe georgette for the modern queen.
                            </p>
                        </div>

                        {/* Flashy & Royale CTAs with Framer Motion Spring */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.25 }}
                            className="flex flex-wrap items-center gap-4 pt-2"
                        >
                            <button
                                onClick={() => onNavigatePage('catalog', { category: slide.ctaCategory || 'all' })}
                                className="btn-royale-gold shimmer-gold-sweep"
                            >
                                <Crown className="w-4 h-4 text-[#141210]" />
                                <span>EXPLORE ROYALE CATALOG</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>

                            <button
                                onClick={() => openVirtualFit()}
                                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#141210] border border-[#D4AF37]/60 hover:border-white font-cinzel text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-md flex items-center gap-2.5 cursor-pointer hover:-translate-y-1"
                            >
                                <Sparkles className="w-4 h-4 text-[#F5D77F]" />
                                <span>3D VIRTUAL FIT STUDIO</span>
                            </button>
                        </motion.div>

                        {/* Royal Trust Badges */}
                        <div className="pt-6 border-t border-[#D4AF37]/25 flex flex-wrap items-center gap-6 sm:gap-8">
                            {[
                                { label: '100% PURE CHANDERI & SILK', icon: Gem },
                                { label: '24K BULLION ZARI EMBROIDERY', icon: Crown },
                                { label: 'WHITE-GLOVE ATELIER DELIVERY', icon: ShieldCheck }
                            ].map((badge, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#FFF2BF] font-cinzel">
                                    <badge.icon className="w-3.5 h-3.5 text-[#D4AF37]" />
                                    <span>{badge.label}</span>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Right Column: 3D Interactive Figma-Style Royale Showcase Card (5 Cols) */}
                    <div className="lg:col-span-5 flex justify-center">
                        <motion.div
                            ref={cardRef}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d'
                            }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className="relative w-full max-w-[420px] aspect-[3/4.2] rounded-[36px] p-3 bg-gradient-to-b from-[#D4AF37]/40 via-white/15 to-[#D4AF37]/40 border-2 border-[#D4AF37] shadow-[0_25px_60px_-15px_rgba(212,175,55,0.45)] cursor-pointer group"
                        >
                            {/* Inner Card Container */}
                            <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-[#141210]">
                                
                                {/* Super Royale Top Image: Genuine Royal Anarkali & Gold Embroidery */}
                                <img
                                    src={getImgUrl('/images/products/ethnic_sets_1.jpg')}
                                    alt="TISUTA CREATION Royale Couture"
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108 filter contrast-[1.03]"
                                />

                                {/* Royale Gradient Vignette */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/95 via-transparent to-[#141210]/20" />

                                {/* Top Floating Badge */}
                                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                                    <span className="px-3 py-1 rounded-full bg-[#141210]/85 border border-[#D4AF37] text-[10px] font-bold text-[#F5D77F] tracking-widest uppercase backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                                        <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                                        <span>ROYALE EDITION</span>
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#141210] text-[10px] font-extrabold tracking-wider uppercase shadow-lg">
                                        55% PRIVÉ OFF
                                    </span>
                                </div>

                                {/* Bottom Royal Inscription */}
                                <div className="absolute bottom-5 left-5 right-5 z-20 space-y-1.5 text-left bg-gradient-to-r from-[#141210]/90 to-[#141210]/60 p-4 rounded-2xl border border-[#D4AF37]/40 backdrop-blur-md">
                                    <div className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase font-cinzel">
                                        HAUTE IMPERIAL TROUSSEAU
                                    </div>
                                    <h3 className="font-cinzel text-lg font-bold text-white leading-tight">
                                        Burgundy 3-Piece Zari Anarkali Ensemble
                                    </h3>
                                    <div className="flex items-center justify-between pt-1 text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#F5D77F] font-bold text-base font-cinzel">₹1,999</span>
                                            <span className="line-through text-white/40 text-[11px]">₹4,499</span>
                                        </div>
                                        <span className="text-[10px] text-[#D4AF37] font-semibold underline underline-offset-2">
                                            Quick View ✦
                                        </span>
                                    </div>
                                </div>

                            </div>

                            {/* Corner Royal Accent Pearls */}
                            <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-[#FFF2BF] border-2 border-[#D4AF37] shadow-[0_0_12px_#D4AF37]" />
                            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#FFF2BF] border-2 border-[#D4AF37] shadow-[0_0_12px_#D4AF37]" />
                            <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-[#FFF2BF] border-2 border-[#D4AF37] shadow-[0_0_12px_#D4AF37]" />
                            <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-[#FFF2BF] border-2 border-[#D4AF37] shadow-[0_0_12px_#D4AF37]" />
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* ✦ ROYALE MARQUEE TICKER RIBBON (Underneath Hero) ✦ */}
            <div className="relative z-20 bg-gradient-to-r from-[#D4AF37] via-[#FFF3CC] to-[#D4AF37] text-[#141210] py-3.5 border-y-2 border-[#FFE79E] shadow-[0_4px_25px_rgba(212,175,55,0.4)] overflow-hidden font-cinzel">
                <div className="animate-royal-ticker text-xs font-black tracking-[0.35em] uppercase flex items-center whitespace-nowrap gap-12">
                    <span>✦ TISUTA CREATION ✦</span>
                    <span>HAUTE COUTURE ROYALE</span>
                    <span>✦ 100% PURE CHANDERI & MULMUL SILK</span>
                    <span>✦ 24K GOLD BULLION GOTA PATTI</span>
                    <span>✦ 3D VIRTUAL FIT AI AVATAR</span>
                    <span>✦ LUXURY WHITE-GLOVE PACKAGING</span>
                    <span>✦ TISUTA CREATION ✦</span>
                    <span>HAUTE COUTURE ROYALE</span>
                    <span>✦ 100% PURE CHANDERI & MULMUL SILK</span>
                    <span>✦ 24K GOLD BULLION GOTA PATTI</span>
                    <span>✦ 3D VIRTUAL FIT AI AVATAR</span>
                    <span>✦ LUXURY WHITE-GLOVE PACKAGING</span>
                </div>
            </div>

        </section>
    );
};

export default HeroSection;

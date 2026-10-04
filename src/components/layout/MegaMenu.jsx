import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const MegaMenu = ({ category, onClose, onSelectCategory }) => {
    const { openVirtualFit } = useShop();

    if (!category) return null;

    const contentMap = {
        women: {
            title: 'Women Couture & Ready-To-Wear',
            columns: [
                {
                    title: 'Ethnic & Festive',
                    links: ['Chanderi Silk Sarees', 'Zardozi Anarkalis', 'Velvet Lehengas', 'Sharara Suits', 'Silk Dupattas']
                },
                {
                    title: 'Western & Modern',
                    links: ['Satin Evening Gowns', 'Tailored Co-ord Sets', 'Pleated Skirts', 'Wool Trench Coats', 'Silk Shirts']
                },
                {
                    title: 'Curated Edits',
                    links: ['The Office Edit', 'Royal Festive Edit', 'Date Night Glamour', 'Resort Riviera 2026']
                }
            ],
            promo: {
                title: 'The Riviera 2026 Collection',
                subtitle: 'Effortless silk drapes & resort elegance',
                image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
                cta: 'Explore Runway Drop'
            }
        },
        ethnic: {
            title: 'Heritage Ethnic & Royal Couture',
            columns: [
                {
                    title: 'Sarees',
                    links: ['Chanderi Silk', 'Banarasi Brocade', 'Organza Zari', 'Tissue Metallic Saree']
                },
                {
                    title: 'Kurtas & Suits',
                    links: ['Anarkali Sets', 'Straight Fit Kurtis', 'Angrakha Cut', 'Palazzo & Sharara']
                },
                {
                    title: 'Bridal & Trousseau',
                    links: ['Velvet Lehengas', 'Embroidered Jackets', 'Kundan Accessories']
                }
            ],
            promo: {
                title: 'Zardozi Royal Craftsmanship',
                subtitle: 'Handcrafted bullion gold thread embroidery',
                image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
                cta: 'View Festive Edit'
            }
        },
        dresses: {
            title: 'Designer Dresses & Evening Gowns',
            columns: [
                {
                    title: 'Silhouettes',
                    links: ['Mulberry Silk Slip Dresses', 'Waist Cut-Out Gowns', 'Tiered Chiffon Maxis', 'Pleated Midi Dresses']
                },
                {
                    title: 'Occasions',
                    links: ['Cocktail & Galas', 'Date Night', 'Resort Brunch', 'Reception Evening']
                }
            ],
            promo: {
                title: 'Aurelia Mulberry Silk',
                subtitle: 'Cowl necklines with gold-plated chain straps',
                image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop',
                cta: 'Shop Evening Wear'
            }
        },
        virtualfit: {
            title: 'TISUTA Virtual Fit™ AI Experience',
            columns: [
                {
                    title: 'AI Fitting Room',
                    links: ['Upload Full Body Photo', 'Camera Body Scan', 'Enter Tailor Measurements', 'Size Recommendation Engine']
                },
                {
                    title: 'Virtual Wardrobe',
                    links: ['Saved Outfit Looks', 'Compare Sizes (S vs M vs L)', 'Body Profile Metrics']
                }
            ],
            promo: {
                title: 'See the Outfit. Feel the Fit.',
                subtitle: 'Photorealistic AI visualization on your custom profile',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
                isAiPromo: true
            }
        }
    };

    const current = contentMap[category] || contentMap.women;

    return (
        <div
            onMouseLeave={onClose}
            className="absolute top-full left-0 w-full bg-[#FDFBF7] border-b border-[#D5B263]/30 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300"
        >
            <div className="max-w-7xl mx-auto py-10 px-8 grid grid-cols-12 gap-8">
                {/* Links Columns */}
                <div className="col-span-8 grid grid-cols-3 gap-8 border-r border-[#D5B263]/20 pr-8">
                    {current.columns.map((col, idx) => (
                        <div key={idx} className="space-y-4">
                            <h4 className="font-serif-luxury text-sm font-semibold tracking-wider text-[#121212] uppercase border-b border-[#D5B263]/30 pb-2">
                                {col.title}
                            </h4>
                            <ul className="space-y-2.5">
                                {col.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <button
                                            onClick={() => {
                                                onSelectCategory(link);
                                                onClose();
                                            }}
                                            className="text-xs text-[#121212]/70 hover:text-[#D5B263] transition-colors hover:translate-x-1 duration-200 block text-left font-medium"
                                        >
                                            {link}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Feature Teaser Card */}
                <div className="col-span-4 pl-4">
                    <div className="relative group overflow-hidden rounded-xl bg-[#121212] text-[#FDFBF7] border border-[#D5B263]/40 aspect-[4/3]">
                        <img
                            src={current.promo.image}
                            alt={current.promo.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent p-6 flex flex-col justify-end">
                            {current.promo.isAiPromo && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D5B263] text-[#121212] rounded-full text-[10px] font-bold tracking-widest uppercase mb-2 w-max">
                                    <Sparkles className="w-3 h-3 fill-[#121212]" />
                                    AI Innovation
                                </div>
                            )}
                            <h3 className="font-serif-luxury text-lg font-bold text-[#FDFBF7] mb-1">
                                {current.promo.title}
                            </h3>
                            <p className="text-xs text-[#FDFBF7]/80 mb-4 font-light">
                                {current.promo.subtitle}
                            </p>
                            <button
                                onClick={() => {
                                    if (current.promo.isAiPromo) {
                                        openVirtualFit();
                                    } else {
                                        onSelectCategory('all');
                                    }
                                    onClose();
                                }}
                                className="inline-flex items-center gap-2 text-xs font-semibold text-[#D5B263] hover:text-white transition-colors cursor-pointer group/btn"
                            >
                                <span>{current.promo.cta || 'Launch Experience'}</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MegaMenu;

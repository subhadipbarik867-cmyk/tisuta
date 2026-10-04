import React, { useState } from 'react';
import { Mail, Phone, ArrowRight, ShieldCheck, Sparkles, Heart, Globe, Share2 } from 'lucide-react';
import { TisutaMonogram } from '../brand/TisutaMonogram';
import { TisutaLeafEmblem } from '../brand/TisutaLeafEmblem';
import { useShop } from '../../context/ShopContext';

export const Footer = ({ onNavigatePage }) => {
    const { openVirtualFit } = useShop();
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (newsletterEmail.trim()) {
            setSubscribed(true);
            setNewsletterEmail('');
        }
    };

    return (
        <footer className="bg-[#121212] text-[#FDFBF7] border-t border-[#D5B263]/30 pt-16 pb-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top Newsletter Card */}
                <div className="relative rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#242424] to-[#1A1A1A] p-8 md:p-12 mb-16 border border-[#D5B263]/30 shadow-2xl overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#D5B263]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 space-y-3">
                            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D5B263] uppercase tracking-widest">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>The Tisuta Privé Circle</span>
                            </div>
                            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FDFBF7]">
                                Subscribe for Exclusive Runway Drops & Bespoke Styling
                            </h3>
                            <p className="text-xs sm:text-sm text-[#FDFBF7]/70 font-light max-w-xl">
                                Receive private invitations to seasonal edits, early access to limited edition silk sarees, and personalized Virtual Fit recommendations.
                            </p>
                        </div>

                        <div className="lg:col-span-5">
                            {subscribed ? (
                                <div className="p-4 bg-[#D5B263]/20 border border-[#D5B263] rounded-xl text-center text-xs font-semibold text-[#D5B263] animate-in fade-in">
                                    ✓ Welcome to The TISUTA Privé Circle. Check your inbox shortly.
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email address..."
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        className="flex-1 px-4 py-3 bg-[#121212]/80 border border-[#D5B263]/40 rounded-xl text-xs text-[#FDFBF7] placeholder-[#FDFBF7]/40 focus:outline-none focus:border-[#D5B263]"
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-[#D5B263] text-[#121212] font-bold text-xs rounded-xl hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                                    >
                                        <span>Subscribe</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Footer Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#D5B263]/20">

                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-5">
                        <TisutaLeafEmblem className="h-16 items-start" variant="gold" showText={true} />
                        <p className="text-xs text-[#FDFBF7]/70 font-light leading-relaxed max-w-sm">
                            TISUTA Creation is a premier luxury fashion-tech brand weaving timeless Indian artisanal heritage, modern western silhouettes, and AI Virtual Try-On technology.
                        </p>

                        {/* Contact details as specified in brand thank you card */}
                        <div className="space-y-2 pt-2 text-xs text-[#FDFBF7]/80">
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-[#D5B263]" />
                                <a href="mailto:tisutacreation@gmail.com" className="hover:text-[#D5B263] transition-colors">
                                    tisutacreation@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-[#D5B263]" />
                                <a href="https://wa.me/919046341544" target="_blank" rel="noreferrer" className="hover:text-[#D5B263] transition-colors">
                                    WhatsApp: +91 90463 41544
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe className="w-4 h-4 text-[#D5B263]" />
                                <a href="https://instagram.com/tisuta.creation" target="_blank" rel="noreferrer" className="hover:text-[#D5B263] transition-colors">
                                    Instagram: @tisuta.creation
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Share2 className="w-4 h-4 text-[#D5B263]" />
                                <span>Facebook: TISUTA Creation</span>
                            </div>
                        </div>
                    </div>

                    {/* Couture Collections */}
                    <div className="space-y-4">
                        <h4 className="font-serif-luxury text-sm font-semibold tracking-wider text-[#D5B263] uppercase border-b border-[#D5B263]/20 pb-2">
                            Collections
                        </h4>
                        <ul className="space-y-2.5 text-xs text-[#FDFBF7]/70 font-light">
                            <li>
                                <button onClick={() => onNavigatePage('catalog', { category: 'ethnic' })} className="hover:text-[#D5B263] transition-colors">
                                    Chanderi Silk Sarees
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigatePage('catalog', { category: 'ethnic' })} className="hover:text-[#D5B263] transition-colors">
                                    Kashmiri Zardozi Anarkalis
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigatePage('catalog', { category: 'dresses' })} className="hover:text-[#D5B263] transition-colors">
                                    Mulberry Silk Gowns
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigatePage('catalog', { category: 'coords' })} className="hover:text-[#D5B263] transition-colors">
                                    Tailored Power Co-ords
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigatePage('catalog', { category: 'outerwear' })} className="hover:text-[#D5B263] transition-colors">
                                    Virgin Wool Trench Coats
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Innovation & Services */}
                    <div className="space-y-4">
                        <h4 className="font-serif-luxury text-sm font-semibold tracking-wider text-[#D5B263] uppercase border-b border-[#D5B263]/20 pb-2">
                            Technology & Fit
                        </h4>
                        <ul className="space-y-2.5 text-xs text-[#FDFBF7]/70 font-light">
                            <li>
                                <button onClick={() => openVirtualFit()} className="hover:text-[#D5B263] transition-colors flex items-center gap-1.5 text-[#D5B263]">
                                    <Sparkles className="w-3 h-3" />
                                    <span>TISUTA Virtual Fit™</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => openVirtualFit()} className="hover:text-[#D5B263] transition-colors">
                                    Find My Size Engine
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigatePage('account', { tab: 'looks' })} className="hover:text-[#D5B263] transition-colors">
                                    Saved 3D Outfits
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigatePage('account', { tab: 'orders' })} className="hover:text-[#D5B263] transition-colors">
                                    Order Tracking Timeline
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Brand Promise */}
                    <div className="space-y-4">
                        <h4 className="font-serif-luxury text-sm font-semibold tracking-wider text-[#D5B263] uppercase border-b border-[#D5B263]/20 pb-2">
                            Luxury Guarantee
                        </h4>
                        <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#D5B263]/20 space-y-3">
                            <div className="flex items-center gap-2 text-xs font-medium text-[#FDFBF7]">
                                <ShieldCheck className="w-4 h-4 text-[#D5B263]" />
                                <span>Bespoke Quality</span>
                            </div>
                            <p className="text-[11px] text-[#FDFBF7]/60 font-light">
                                Handcrafted with authentic gold zari threads & mulberry silks. Tested for perfect luxury draping.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#FDFBF7]/50 gap-4">
                    <p>© 2026 TISUTA CREATION. All Rights Reserved. Crafted with Love & Gratitude.</p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-[#D5B263] cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-[#D5B263] cursor-pointer">Terms of Service</span>
                        <span className="hover:text-[#D5B263] cursor-pointer">Authenticity Certificate</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;

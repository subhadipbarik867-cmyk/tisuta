import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';
import { useShop } from '../../context/ShopContext';

export const NewArrivals = ({ onSelectProduct, onNavigatePage }) => {
    const { products } = useShop();
    const scrollRef = useRef(null);

    const newProducts = products.filter(p => p.isNewArrival || p.isTrending);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth / 1.5 : clientWidth / 1.5;
            scrollRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-[#FFFFFF] text-[#141210] overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D4AF37]/35 pb-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                            <div className="h-0.5 w-10 bg-gradient-to-r from-[#D4AF37] to-[#F5D77F]" />
                            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-[11px] font-cinzel font-bold tracking-[0.28em] text-[#9E7D23] uppercase">
                                Royale Couture Drops 2026
                            </span>
                        </div>
                        <h2 className="font-cinzel text-3xl sm:text-5xl text-[#141210] font-black tracking-tight">
                            New Arrivals & <span className="gold-text-gradient">Editorial Trending</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-[#141210]/70 font-light max-w-md">
                            Freshly crafted from master ateliers — available in limited boutique quantities with express insured delivery.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 mt-6 md:mt-0">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3.5 rounded-2xl bg-white border border-[#D4AF37]/40 text-[#141210] hover:bg-[#D4AF37] hover:text-[#141210] transition-all shadow-sm hover:shadow-[0_4px_16px_rgba(212,175,55,0.25)] cursor-pointer"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3.5 rounded-2xl bg-white border border-[#D4AF37]/40 text-[#141210] hover:bg-[#D4AF37] hover:text-[#141210] transition-all shadow-sm hover:shadow-[0_4px_16px_rgba(212,175,55,0.25)] cursor-pointer"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => onNavigatePage('catalog', { category: 'all' })}
                            className="hidden md:flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] text-[#141210] text-xs font-cinzel font-black tracking-widest uppercase rounded-2xl hover:scale-105 transition-all cursor-pointer shadow-[0_6px_20px_rgba(212,175,55,0.3)] border border-[#F5D77F]"
                        >
                            <span>View All Drops</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Horizontal Scrolling Product Carousel */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-6 scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {newProducts.map((product) => (
                        <div
                            key={product.id}
                            className="min-w-[270px] sm:min-w-[310px] max-w-[310px] flex-shrink-0"
                        >
                            <ProductCard product={product} onSelectProduct={onSelectProduct} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default NewArrivals;

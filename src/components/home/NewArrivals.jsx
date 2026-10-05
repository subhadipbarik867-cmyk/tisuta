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
        <section className="py-24 bg-[#FDFBF7] text-[#121212] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D5B263]/30 pb-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="h-0.5 w-8 bg-[#D5B263]" />
                            <span className="text-[11px] font-bold tracking-[0.25em] text-[#D5B263] uppercase">Runway Drops 2026</span>
                        </div>
                        <h2 className="font-serif-luxury text-4xl sm:text-5xl text-[#121212] font-bold">
                            New Arrivals & Editorial Trending
                        </h2>
                        <p className="text-xs sm:text-sm text-[#121212]/60 font-light max-w-md">
                            Freshly crafted from master ateliers across Paris and India — available in limited boutique quantities.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 mt-6 md:mt-0">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 rounded-xl bg-white border border-[#D5B263]/40 text-[#121212] hover:bg-[#D5B263] hover:text-[#121212] transition-colors shadow-sm cursor-pointer"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 rounded-xl bg-white border border-[#D5B263]/40 text-[#121212] hover:bg-[#D5B263] hover:text-[#121212] transition-colors shadow-sm cursor-pointer"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => onNavigatePage('catalog', { category: 'all' })}
                            className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#121212] text-[#D5B263] text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-[#D5B263] hover:text-[#121212] transition-colors cursor-pointer shadow-md"
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

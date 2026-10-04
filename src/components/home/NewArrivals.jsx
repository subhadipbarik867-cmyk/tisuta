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
        <section className="py-24 bg-[#FAF8F5] text-[#0A0908] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-[#C5A059]" />
                            <span className="text-[11px] font-bold tracking-[0.25em] text-[#C5A059] uppercase">Runway Drops 2026</span>
                        </div>
                        <h2 className="font-serif-luxury text-4xl sm:text-5xl text-[#0A0908] font-bold">
                            New Arrivals & Trending
                        </h2>
                        <p className="text-sm text-gray-400 font-light max-w-md">
                            Freshly arrived from our master artisans and design ateliers across India and Europe.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 mt-6 md:mt-0">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 rounded-full bg-white border border-[#C5A059]/30 text-[#0A0908] hover:bg-[#C5A059] hover:text-white hover:border-[#C5A059] transition-colors shadow-sm cursor-pointer"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 rounded-full bg-white border border-[#C5A059]/30 text-[#0A0908] hover:bg-[#C5A059] hover:text-white hover:border-[#C5A059] transition-colors shadow-sm cursor-pointer"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => onNavigatePage('catalog', { category: 'all' })}
                            className="hidden md:flex items-center gap-2 px-5 py-3 bg-[#0A0908] text-[#C5A059] text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-[#1A1918] transition-colors cursor-pointer"
                        >
                            <span>View All</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* Horizontal Scrolling Product Carousel */}
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {newProducts.map((product) => (
                        <div
                            key={product.id}
                            className="min-w-[260px] sm:min-w-[300px] max-w-[300px] flex-shrink-0"
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

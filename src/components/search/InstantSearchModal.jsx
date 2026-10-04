import React, { useState } from 'react';
import { Search, X, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../product/ProductCard';

export const InstantSearchModal = ({ onSelectProduct, onNavigatePage }) => {
    const { isSearchOpen, setIsSearchOpen, products } = useShop();
    const [query, setQuery] = useState('');

    if (!isSearchOpen) return null;

    const trendingTags = ['Black Silk Dress', 'Zardozi Anarkali', 'Chanderi Saree', 'Ivory Co-ord', 'Wool Trench Coat'];

    const filteredProducts = query.trim()
        ? products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4">
            <div onClick={() => setIsSearchOpen(false)} className="fixed inset-0 bg-[#121212]/80 backdrop-blur-md" />

            <div className="relative w-full max-w-3xl bg-[#FDFBF7] rounded-3xl border border-[#D5B263]/40 shadow-2xl overflow-hidden z-10 p-6 sm:p-8">
                <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute top-6 right-6 p-2 text-[#121212] hover:text-[#D5B263]"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D5B263]" />
                        <input
                            type="text"
                            autoFocus
                            placeholder="Search by product, category, fabric or style (e.g. 'Silk Dress')..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 bg-white border-2 border-[#D5B263]/40 rounded-2xl text-sm text-[#121212] placeholder-[#121212]/40 focus:outline-none focus:border-[#D5B263] shadow-inner"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#121212]/40 hover:text-[#121212]"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Trending Searches tags */}
                    {!query && (
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#D5B263] uppercase tracking-widest">
                                <TrendingUp className="w-4 h-4" />
                                <span>Trending Searches</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {trendingTags.map((tag, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setQuery(tag)}
                                        className="px-3.5 py-1.5 bg-[#F7F4EE] hover:bg-[#121212] hover:text-[#D5B263] text-[#121212] text-xs font-medium rounded-full border border-[#D5B263]/20 transition-all"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Instant Search Results */}
                    {query && (
                        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                            <div className="flex items-center justify-between text-xs text-[#121212]/60 font-medium">
                                <span>Matching Results ({filteredProducts.length})</span>
                                {filteredProducts.length > 0 && (
                                    <button
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            onNavigatePage('catalog', { search: query });
                                        }}
                                        className="text-[#D5B263] hover:underline flex items-center gap-1"
                                    >
                                        <span>View all in catalog</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {filteredProducts.map(product => (
                                        <div
                                            key={product.id}
                                            onClick={() => {
                                                setIsSearchOpen(false);
                                                if (onSelectProduct) onSelectProduct(product);
                                            }}
                                            className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#D5B263]/20 hover:border-[#D5B263] cursor-pointer transition-all hover:shadow-md"
                                        >
                                            <img src={product.images[0]} alt={product.name} className="w-16 h-20 object-cover rounded-xl" />
                                            <div className="flex-1 space-y-1">
                                                <span className="text-[10px] uppercase font-bold text-[#D5B263]">{product.brand}</span>
                                                <h5 className="font-serif-luxury text-xs font-semibold text-[#121212] line-clamp-1">{product.name}</h5>
                                                <span className="text-xs font-bold text-[#121212]">₹{product.price.toLocaleString('en-IN')}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-xs text-[#121212]/60 space-y-2">
                                    <p>No direct matches found for "{query}".</p>
                                    <p className="text-[11px] text-[#D5B263]">Try searching "Dress", "Saree", "Anarkali", or "Silk".</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstantSearchModal;

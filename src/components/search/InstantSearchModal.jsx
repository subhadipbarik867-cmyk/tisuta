import React, { useState, useMemo, useRef } from 'react';
import { Search, X, Mic, Camera, Sparkles, ArrowRight, Tag, SlidersHorizontal, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { getImgUrl } from '../../utils/imageUtils';

export const InstantSearchModal = ({ onSelectProduct, onNavigatePage }) => {
    const { isSearchOpen, setIsSearchOpen, products, addToCart } = useShop();
    const [query, setQuery] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [visualSearchActive, setVisualSearchActive] = useState(false);
    const [activeFilterMode, setActiveFilterMode] = useState('all'); // all, cheaper, premium
    const fileInputRef = useRef(null);

    // Natural Language Parser
    const parsedFilters = useMemo(() => {
        if (!query.trim()) return null;
        const q = query.toLowerCase();

        let maxPrice = null;
        const priceMatch = q.match(/under\s*(?:₹|rs\.?|inr)?\s*(\d+)/i) || q.match(/(?:below|less than)\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
        if (priceMatch) {
            maxPrice = parseInt(priceMatch[1], 10);
        }

        const colors = ['black', 'noir', 'white', 'ivory', 'gold', 'taupe', 'champagne', 'emerald', 'burgundy', 'wine', 'rust', 'olive', 'teal', 'blush'];
        const matchedColor = colors.find(c => q.includes(c));

        const occasions = ['wedding', 'sangeet', 'office', 'work', 'date', 'party', 'casual', 'brunch', 'gala'];
        const matchedOccasion = occasions.find(o => q.includes(o));

        const categories = [
            { key: 'midi', label: 'Midi Dress' },
            { key: 'slip', label: 'Slip Dress' },
            { key: 'aline', label: 'A-Line' },
            { key: 'flared', label: 'Flared' },
            { key: 'top', label: 'Tops' },
            { key: 'crop', label: 'Crop Top' },
            { key: 'net', label: 'Net / Sheer Top' },
            { key: 'kurti', label: 'Kurti' },
            { key: 'ethnic', label: 'Ethnic Sets' },
            { key: 'gown', label: 'Gowns' },
            { key: 'dress', label: 'Dresses' }
        ];
        const matchedCat = categories.find(cat => q.includes(cat.key));

        return {
            maxPrice,
            color: matchedColor,
            occasion: matchedOccasion,
            category: matchedCat ? matchedCat.key : null
        };
    }, [query]);

    // Filter Products based on Query and Parsed NL entities
    const filteredProducts = useMemo(() => {
        if (!query.trim() && !visualSearchActive) return [];
        let list = [...products];

        if (visualSearchActive) {
            // Visual search simulator returns silhouettes
            return list.filter(p => p.category === 'dresses' || p.category === 'tops').slice(0, 4);
        }

        const q = query.toLowerCase();
        const filters = parsedFilters;

        list = list.filter(p => {
            // If parsed with price
            if (filters?.maxPrice && p.price > filters.maxPrice) return false;

            // If color extracted
            if (filters?.color) {
                const hasColor = p.colors.some(c => c.name.toLowerCase().includes(filters.color));
                if (!hasColor) return false;
            }

            // If occasion extracted
            if (filters?.occasion && p.occasion) {
                if (!p.occasion.toLowerCase().includes(filters.occasion)) {
                    // Soft match
                }
            }

            // Keyword fallback
            const matchName = p.name.toLowerCase().includes(q);
            const matchStyle = p.styleTag && p.styleTag.toLowerCase().includes(q);
            const matchDesc = p.description.toLowerCase().includes(q);
            const matchBrand = p.brand.toLowerCase().includes(q);
            const matchCat = p.category.toLowerCase().includes(q);

            return matchName || matchStyle || matchDesc || matchBrand || matchCat || filters?.maxPrice;
        });

        if (activeFilterMode === 'cheaper') {
            list = list.sort((a, b) => a.price - b.price);
        } else if (activeFilterMode === 'premium') {
            list = list.sort((a, b) => b.price - a.price);
        }

        return list;
    }, [query, products, parsedFilters, visualSearchActive, activeFilterMode]);

    if (!isSearchOpen) return null;

    const handleVoiceSearch = () => {
        setIsListening(true);
        setTimeout(() => {
            setQuery('Show me a black dress for a wedding under ₹2000');
            setIsListening(false);
        }, 1800);
    };

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            setVisualSearchActive(true);
            setQuery('Visual Image Match: Tailored Midi Silhouette');
        }
    };

    const sampleQueries = [
        'Minimal midi dress',
        'Show me a black dress for a wedding under ₹2000',
        'Slip style dresses in gold',
        'Fitted basic top under ₹1000',
        'Short length flared one piece',
        'Modern long kurti for office',
        'Regal ethnic sets'
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-4">
            {/* Backdrop */}
            <div
                onClick={() => setIsSearchOpen(false)}
                className="fixed inset-0 bg-[#121212]/80 backdrop-blur-md transition-opacity"
            />

            {/* Modal Body */}
            <div className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-3xl border border-[#D5B263]/40 shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-6">
                
                {/* Header Controls */}
                <div className="flex items-center justify-between border-b border-[#D5B263]/25 pb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-[#121212] text-[#D5B263] rounded-lg">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="font-serif-luxury text-lg font-bold text-[#121212]">
                                TISUTA Intelligence Search
                            </h3>
                            <p className="text-[11px] text-[#121212]/60">
                                Natural language understanding, voice input, and visual image matching
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className="p-2 text-[#121212] hover:text-[#D5B263] transition-colors rounded-full hover:bg-black/5"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Search Bar with AI Multi-Modal Inputs */}
                <div className="relative flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-[#D5B263]" />
                    <input
                        type="text"
                        autoFocus
                        placeholder="Try: 'Show me a black dress for a wedding under ₹2000'..."
                        value={query}
                        onChange={e => {
                            setQuery(e.target.value);
                            setVisualSearchActive(false);
                        }}
                        className="w-full pl-12 pr-28 py-4 bg-white border-2 border-[#D5B263]/40 rounded-2xl text-sm font-medium text-[#121212] placeholder-[#121212]/40 focus:outline-none focus:border-[#D5B263] shadow-inner"
                    />

                    {/* Voice & Image Search Controls */}
                    <div className="absolute right-3 flex items-center gap-1">
                        {query && (
                            <button
                                onClick={() => { setQuery(''); setVisualSearchActive(false); }}
                                className="p-2 text-[#121212]/40 hover:text-[#121212]"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}

                        <button
                            onClick={handleVoiceSearch}
                            className={`p-2 rounded-xl transition-all ${
                                isListening
                                    ? 'bg-red-500 text-white animate-pulse'
                                    : 'text-[#121212]/60 hover:text-[#D5B263] hover:bg-[#F7F4EE]'
                            }`}
                            title="Voice Search"
                        >
                            <Mic className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 text-[#121212]/60 hover:text-[#D5B263] hover:bg-[#F7F4EE] rounded-xl transition-all"
                            title="Visual Image Search"
                        >
                            <Camera className="w-4 h-4" />
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* AI Entity Badges (Shows what the AI understood) */}
                {parsedFilters && (parsedFilters.maxPrice || parsedFilters.color || parsedFilters.category || parsedFilters.occasion) && (
                    <div className="flex flex-wrap items-center gap-2 p-3 bg-[#F7F4EE] rounded-2xl border border-[#D5B263]/30 text-xs">
                        <span className="font-bold text-[#D5B263] uppercase tracking-wider text-[10px]">
                            AI Query Interpretation:
                        </span>
                        {parsedFilters.category && (
                            <span className="px-2.5 py-1 bg-white border border-[#D5B263]/40 rounded-full font-bold text-[#121212]">
                                Silhouette: {parsedFilters.category}
                            </span>
                        )}
                        {parsedFilters.color && (
                            <span className="px-2.5 py-1 bg-white border border-[#D5B263]/40 rounded-full font-bold text-[#121212] capitalize">
                                Color: {parsedFilters.color}
                            </span>
                        )}
                        {parsedFilters.occasion && (
                            <span className="px-2.5 py-1 bg-white border border-[#D5B263]/40 rounded-full font-bold text-[#121212] capitalize">
                                Occasion: {parsedFilters.occasion}
                            </span>
                        )}
                        {parsedFilters.maxPrice && (
                            <span className="px-2.5 py-1 bg-[#121212] text-[#D5B263] rounded-full font-bold">
                                Price: &lt; ₹{parsedFilters.maxPrice.toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>
                )}

                {/* Fast Natural Language Query Pills */}
                {!query && !visualSearchActive && (
                    <div className="space-y-3">
                        <span className="text-[10px] font-bold text-[#121212]/60 uppercase tracking-widest block">
                            Trending Searches & Natural Queries
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {sampleQueries.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setQuery(item)}
                                    className="px-3.5 py-1.5 bg-white border border-[#D5B263]/30 hover:border-[#D5B263] hover:bg-[#121212] hover:text-[#D5B263] rounded-full text-xs font-medium text-[#121212] transition-all"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Filter Switching: All | Cheaper Alternatives | Premium Alternatives */}
                {(query || visualSearchActive) && filteredProducts.length > 0 && (
                    <div className="flex items-center justify-between border-b border-[#D5B263]/20 pb-3">
                        <span className="text-xs font-bold text-[#121212]">
                            {filteredProducts.length} Silhouettes Matching Your Criteria
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveFilterMode('cheaper')}
                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                                    activeFilterMode === 'cheaper'
                                        ? 'bg-[#121212] text-[#D5B263]'
                                        : 'bg-white border border-[#D5B263]/30 text-[#121212]/70 hover:text-[#121212]'
                                }`}
                            >
                                Cheaper Alternatives
                            </button>
                            <button
                                onClick={() => setActiveFilterMode('premium')}
                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                                    activeFilterMode === 'premium'
                                        ? 'bg-[#121212] text-[#D5B263]'
                                        : 'bg-white border border-[#D5B263]/30 text-[#121212]/70 hover:text-[#121212]'
                                }`}
                            >
                                Premium Luxury Alternatives
                            </button>
                        </div>
                    </div>
                )}

                {/* Matching Results Stage */}
                {(query || visualSearchActive) && (
                    <div className="max-h-[50vh] overflow-y-auto pr-1 space-y-3">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredProducts.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            onSelectProduct(p);
                                        }}
                                        className="group p-3 bg-white rounded-2xl border border-[#D5B263]/25 hover:border-[#D5B263] transition-all cursor-pointer flex gap-3 shadow-sm hover:shadow-md"
                                    >
                                        <img
                                            src={getImgUrl(p.images[0])}
                                            alt={p.name}
                                            className="w-16 h-20 object-cover rounded-xl flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <span className="text-[9px] font-bold text-[#D5B263] uppercase tracking-wider block">
                                                {p.styleTag || p.brand}
                                            </span>
                                            <h4 className="font-serif-luxury text-xs font-bold text-[#121212] line-clamp-1 group-hover:text-[#D5B263]">
                                                {p.name}
                                            </h4>
                                            <div className="flex items-center gap-2 text-xs font-bold text-[#121212]">
                                                <span>₹{p.price.toLocaleString('en-IN')}</span>
                                                {p.mrp > p.price && (
                                                    <span className="text-[10px] line-through text-[#121212]/40 font-normal">
                                                        ₹{p.mrp.toLocaleString('en-IN')}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-[9px] text-[#121212]/60 font-light block">
                                                {p.fabric}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 space-y-3">
                                <Sparkles className="w-10 h-10 text-[#D5B263]/40 mx-auto" />
                                <h4 className="font-serif-luxury text-base font-bold text-[#121212]">
                                    No exact silhouette found
                                </h4>
                                <p className="text-xs text-[#121212]/60 max-w-sm mx-auto">
                                    Try adjusting your natural search query or browse our signature collections.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsSearchOpen(false);
                                        onNavigatePage('catalog', { category: 'all' });
                                    }}
                                    className="px-6 py-2.5 bg-[#121212] text-[#D5B263] font-bold text-xs rounded-xl"
                                >
                                    Explore Complete Catalog
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstantSearchModal;

import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Grid3X3, Grid2X2, ChevronDown, X, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';
import { CATEGORIES } from '../data/productsData';

export const CatalogPage = ({ initialCategory = 'all', initialEditTag = null, onSelectProduct, onNavigatePage }) => {
    const { products } = useShop();

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [maxPrice, setMaxPrice] = useState(35000);
    const [sortBy, setSortBy] = useState('featured');
    const [gridCols, setGridCols] = useState(3);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const availableColors = [
        { name: 'Champagne Gold', hex: '#D5B263' },
        { name: 'Ivory Pearl', hex: '#FDFBF7' },
        { name: 'Emerald Green', hex: '#0B3B24' },
        { name: 'Crimson Wine', hex: '#65000B' },
        { name: 'Onyx Black', hex: '#121212' }
    ];

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
            if (initialEditTag && p.editTag !== initialEditTag) return false;
            if (p.price > maxPrice) return false;
            if (selectedSizes.length > 0 && !p.sizes.some(s => selectedSizes.includes(s))) return false;
            if (selectedColors.length > 0 && !p.colors.some(c => selectedColors.includes(c.name))) return false;
            return true;
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return 0;
        });
    }, [products, selectedCategory, initialEditTag, maxPrice, selectedSizes, selectedColors, sortBy]);

    const toggleSize = (sz) => {
        setSelectedSizes(prev => prev.includes(sz) ? prev.filter(s => s !== sz) : [...prev, sz]);
    };

    const toggleColor = (colName) => {
        setSelectedColors(prev => prev.includes(colName) ? prev.filter(c => c !== colName) : [...prev, colName]);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#121212] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb Navigation */}
                <div className="flex items-center gap-2 text-xs text-[#121212]/50 mb-6">
                    <button onClick={() => onNavigatePage('home')} className="hover:text-[#D5B263]">Home</button>
                    <span>/</span>
                    <span className="text-[#121212] font-semibold capitalize">
                        {selectedCategory === 'all' ? 'All Collections' : selectedCategory}
                    </span>
                </div>

                {/* Page Title & Count Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D5B263]/30 pb-6 mb-8 gap-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#D5B263]">
                            TISUTA High Fashion Catalog
                        </span>
                        <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#121212] mt-1 capitalize">
                            {selectedCategory === 'all' ? 'The Complete Wardrobe' : selectedCategory}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* View Grid Switcher */}
                        <div className="hidden sm:flex items-center border border-[#121212]/15 rounded-xl p-1 bg-white">
                            <button
                                onClick={() => setGridCols(2)}
                                className={`p-1.5 rounded-lg transition-colors ${gridCols === 2 ? 'bg-[#121212] text-[#D5B263]' : 'text-[#121212]/40'}`}
                            >
                                <Grid2X2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setGridCols(3)}
                                className={`p-1.5 rounded-lg transition-colors ${gridCols === 3 ? 'bg-[#121212] text-[#D5B263]' : 'text-[#121212]/40'}`}
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="px-4 py-2.5 bg-white border border-[#D5B263]/40 rounded-xl text-xs font-semibold text-[#121212] focus:outline-none cursor-pointer"
                            >
                                <option value="featured">Sort by: Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>

                        {/* Mobile Filter Sheet Button */}
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="lg:hidden px-4 py-2.5 bg-[#121212] text-[#D5B263] rounded-xl text-xs font-bold flex items-center gap-2"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Filters</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Desktop Filter Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-8 bg-white p-6 rounded-2xl border border-[#D5B263]/25 shadow-sm">
                        <div className="flex items-center justify-between border-b border-[#D5B263]/20 pb-4">
                            <h3 className="font-serif-luxury text-base font-bold text-[#121212] flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4 text-[#D5B263]" />
                                <span>Filters</span>
                            </h3>
                            {(selectedCategory !== 'all' || selectedSizes.length > 0 || selectedColors.length > 0 || maxPrice < 35000) && (
                                <button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSelectedSizes([]);
                                        setSelectedColors([]);
                                        setMaxPrice(35000);
                                    }}
                                    className="text-[11px] text-[#D5B263] hover:underline font-semibold"
                                >
                                    Reset All
                                </button>
                            )}
                        </div>

                        {/* Category Filter */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-[#121212] uppercase tracking-wider block">Category</label>
                            <div className="space-y-1.5">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`w-full flex items-center justify-between py-1.5 px-3 rounded-lg text-xs font-medium transition-all text-left ${selectedCategory === cat.id ? 'bg-[#121212] text-[#D5B263] font-bold' : 'hover:bg-[#F7F4EE] text-[#121212]/80'
                                            }`}
                                    >
                                        <span>{cat.name}</span>
                                        <span className="text-[10px] opacity-60">({cat.count})</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="space-y-3 pt-4 border-t border-[#D5B263]/20">
                            <div className="flex justify-between text-xs font-bold text-[#121212]">
                                <span>Max Price:</span>
                                <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                            </div>
                            <input
                                type="range"
                                min="5000"
                                max="35000"
                                step="1000"
                                value={maxPrice}
                                onChange={e => setMaxPrice(Number(e.target.value))}
                                className="w-full accent-[#D5B263]"
                            />
                        </div>

                        {/* Sizes Filter */}
                        <div className="space-y-3 pt-4 border-t border-[#D5B263]/20">
                            <label className="text-xs font-bold text-[#121212] uppercase tracking-wider block">Select Sizes</label>
                            <div className="flex flex-wrap gap-2">
                                {availableSizes.map(sz => (
                                    <button
                                        key={sz}
                                        onClick={() => toggleSize(sz)}
                                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all border ${selectedSizes.includes(sz)
                                                ? 'bg-[#121212] text-[#D5B263] border-[#D5B263]'
                                                : 'bg-white text-[#121212] border-[#121212]/20 hover:border-[#D5B263]'
                                            }`}
                                    >
                                        {sz}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Colors Filter */}
                        <div className="space-y-3 pt-4 border-t border-[#D5B263]/20">
                            <label className="text-xs font-bold text-[#121212] uppercase tracking-wider block">Color Palette</label>
                            <div className="space-y-2">
                                {availableColors.map(c => (
                                    <button
                                        key={c.name}
                                        onClick={() => toggleColor(c.name)}
                                        className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded-lg text-xs font-medium transition-all text-left ${selectedColors.includes(c.name) ? 'bg-[#F7F4EE] font-bold text-[#121212]' : 'text-[#121212]/70'
                                            }`}
                                    >
                                        <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                                        <span>{c.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <main className="col-span-1 lg:col-span-9">
                        {filteredProducts.length > 0 ? (
                            <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
                                {filteredProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onSelectProduct={onSelectProduct}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 bg-white rounded-3xl border border-[#D5B263]/20 text-center space-y-4">
                                <Sparkles className="w-10 h-10 text-[#D5B263] mx-auto" />
                                <h3 className="font-serif-luxury text-2xl font-bold text-[#121212]">
                                    No Garments Match Current Filters
                                </h3>
                                <p className="text-xs text-[#121212]/60 max-w-sm mx-auto font-light">
                                    Try adjusting your price range, sizing, or category selections to explore more high fashion items.
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSelectedSizes([]);
                                        setSelectedColors([]);
                                        setMaxPrice(35000);
                                    }}
                                    className="px-6 py-3 bg-[#121212] text-[#D5B263] font-bold text-xs rounded-xl hover:bg-[#D5B263] hover:text-[#121212] transition-colors"
                                >
                                    Reset Catalog Filters
                                </button>
                            </div>
                        )}
                    </main>

                </div>

            </div>
        </div>
    );
};

export default CatalogPage;

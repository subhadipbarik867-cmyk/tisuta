import React, { useState, useMemo } from 'react';
import { 
    Filter, SlidersHorizontal, Grid3X3, Grid2X2, ChevronDown, X, Sparkles, 
    Check, RotateCcw, ArrowUpDown, Tag, Heart 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';
import { CATEGORIES, SUB_CATEGORIES } from '../data/productsData';

export const CatalogPage = ({ 
    initialCategory = 'all', 
    initialSubCategory = 'all', 
    initialEditTag = null, 
    initialSearch = '', 
    onSelectProduct, 
    onNavigatePage 
}) => {
    const { products, openVirtualFit } = useShop();

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [selectedSubCategory, setSelectedSubCategory] = useState(initialSubCategory);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedFabrics, setSelectedFabrics] = useState([]);
    const [selectedFits, setSelectedFits] = useState([]);
    const [selectedOccasions, setSelectedOccasions] = useState([]);
    const [maxPrice, setMaxPrice] = useState(150000);
    const [minRating, setMinRating] = useState(0);
    const [onlyInStock, setOnlyInStock] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [gridCols, setGridCols] = useState(3);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
    const availableColors = [
        { name: 'Pearl Ivory', hex: '#FDFBF7' },
        { name: 'Onyx Black', hex: '#121212' },
        { name: 'Champagne Gold', hex: '#D5B263' },
        { name: 'Emerald Forest', hex: '#0B3B24' },
        { name: 'Royal Burgundy', hex: '#581845' },
        { name: 'Sage Olive', hex: '#5B7052' },
        { name: 'Terracotta Rust', hex: '#B35432' },
        { name: 'Blush Blossom', hex: '#E8B4B8' }
    ];
    const availableFabrics = ['Mulberry Silk', 'Italian Crepe Satin', 'Double Silk Georgette', 'Chanderi Silk', 'Organic Linen Cotton', 'French Illusion Tulle Net', 'Micro-Modal Ribbed Knit'];
    const availableFits = ['Bodycon Fitted', 'Regular Tailored', 'Slim Bias Cut', 'A-Line Flared', 'Flared Fit & Flare', 'Straight High-Slit'];
    const availableOccasions = ['Casual', 'Date Night', 'Wedding & Sangeet', 'Office & Work', 'Party & Summer Gala', 'Red Carpet & Black Tie Gala'];

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            // Category match
            if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

            // Subcategory match
            if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) return false;

            // Tag match
            if (initialEditTag && p.editTag !== initialEditTag) return false;

            // Max Price
            if (p.price > maxPrice) return false;

            // Min Rating
            if (minRating > 0 && p.rating < minRating) return false;

            // In Stock
            if (onlyInStock && p.stockCount <= 0) return false;

            // Size match
            if (selectedSizes.length > 0 && !p.sizes.some(s => selectedSizes.includes(s))) return false;

            // Color match
            if (selectedColors.length > 0 && !p.colors.some(c => selectedColors.includes(c.name))) return false;

            // Fabric match
            if (selectedFabrics.length > 0 && !selectedFabrics.some(fab => p.fabric && p.fabric.toLowerCase().includes(fab.toLowerCase()))) return false;

            // Fit match
            if (selectedFits.length > 0 && !selectedFits.some(f => p.fit && p.fit.toLowerCase().includes(f.toLowerCase()))) return false;

            // Occasion match
            if (selectedOccasions.length > 0 && !selectedOccasions.some(occ => p.occasion && p.occasion.toLowerCase().includes(occ.toLowerCase()))) return false;

            return true;
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'discount') return b.discount - a.discount;
            return 0;
        });
    }, [
        products, selectedCategory, selectedSubCategory, initialEditTag, maxPrice, 
        selectedSizes, selectedColors, selectedFabrics, selectedFits, selectedOccasions, 
        minRating, onlyInStock, sortBy
    ]);

    const toggleFilter = (list, setList, item) => {
        setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    };

    const handleReset = () => {
        setSelectedCategory('all');
        setSelectedSubCategory('all');
        setSelectedSizes([]);
        setSelectedColors([]);
        setSelectedFabrics([]);
        setSelectedFits([]);
        setSelectedOccasions([]);
        setMaxPrice(150000);
        setMinRating(0);
        setOnlyInStock(false);
    };

    const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) + 
                               (selectedSubCategory !== 'all' ? 1 : 0) + 
                               selectedSizes.length + 
                               selectedColors.length + 
                               selectedFabrics.length + 
                               selectedFits.length + 
                               selectedOccasions.length;

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#121212] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs text-[#121212]/50 font-medium">
                    <button onClick={() => onNavigatePage('home')} className="hover:text-[#D5B263]">Home</button>
                    <span>/</span>
                    <button onClick={() => { setSelectedCategory('all'); setSelectedSubCategory('all'); }} className="hover:text-[#D5B263]">
                        Catalog
                    </button>
                    <span>/</span>
                    <span className="text-[#121212] font-bold capitalize">
                        {selectedCategory === 'all' ? 'All Women Collections' : selectedCategory}
                    </span>
                    {selectedSubCategory !== 'all' && (
                        <>
                            <span>/</span>
                            <span className="text-[#D5B263] font-bold capitalize">
                                {selectedSubCategory}
                            </span>
                        </>
                    )}
                </div>

                {/* Subcategory Pills Row (Minimal Midi, Slip, A-Line, Flared, Tops, Kurtis, Sets) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    <button
                        onClick={() => setSelectedSubCategory('all')}
                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                            selectedSubCategory === 'all'
                                ? 'bg-[#121212] text-[#D5B263] shadow-md'
                                : 'bg-white text-[#121212]/70 border border-[#D5B263]/30 hover:border-[#D5B263]'
                        }`}
                    >
                        All Silhouettes
                    </button>
                    {SUB_CATEGORIES.filter(s => s.id !== 'all').map(sub => (
                        <button
                            key={sub.id}
                            onClick={() => {
                                setSelectedSubCategory(sub.id);
                                const matchProd = products.find(p => p.subCategory === sub.id);
                                if (matchProd && selectedCategory !== 'all' && selectedCategory !== matchProd.category) {
                                    setSelectedCategory(matchProd.category);
                                }
                            }}
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                                selectedSubCategory === sub.id
                                    ? 'bg-[#121212] text-[#D5B263] shadow-md'
                                    : 'bg-white text-[#121212]/70 border border-[#D5B263]/30 hover:border-[#D5B263]'
                            }`}
                        >
                            {sub.name}
                        </button>
                    ))}
                </div>

                {/* Title & Sorting Toolbar */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D5B263]/30 pb-6 gap-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#D5B263]">
                            TISUTA Prêt-à-Porter & Couture
                        </span>
                        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#121212] mt-1 font-bold">
                            {selectedSubCategory !== 'all' 
                                ? SUB_CATEGORIES.find(s => s.id === selectedSubCategory)?.name || selectedSubCategory 
                                : (selectedCategory === 'all' ? 'Complete Women’s Catalog' : selectedCategory)}
                        </h1>
                        <p className="text-xs text-[#121212]/60 mt-1">
                            Showing {filteredProducts.length} tailored silhouettes
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Grid Toggle */}
                        <div className="hidden sm:flex items-center border border-[#D5B263]/40 rounded-xl p-1 bg-white">
                            <button
                                onClick={() => setGridCols(2)}
                                className={`p-1.5 rounded-lg transition-colors ${gridCols === 2 ? 'bg-[#121212] text-[#D5B263]' : 'text-[#121212]/40'}`}
                                title="2 Columns"
                            >
                                <Grid2X2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setGridCols(3)}
                                className={`p-1.5 rounded-lg transition-colors ${gridCols === 3 ? 'bg-[#121212] text-[#D5B263]' : 'text-[#121212]/40'}`}
                                title="3 Columns"
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Sort Selector */}
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="px-4 py-2.5 bg-white border border-[#D5B263]/40 rounded-xl text-xs font-semibold text-[#121212] focus:outline-none cursor-pointer shadow-sm"
                        >
                            <option value="featured">Sort: Featured Collection</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated (4.8+)</option>
                            <option value="discount">Biggest Savings (%)</option>
                        </select>

                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="lg:hidden px-4 py-2.5 bg-[#121212] text-[#D5B263] rounded-xl text-xs font-bold flex items-center gap-2"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Filters ({activeFiltersCount})</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Desktop Sidebar Filters (3 Cols) */}
                    <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-6 bg-white p-6 rounded-3xl border border-[#D5B263]/30 shadow-sm max-h-[85vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-[#D5B263]/25 pb-4">
                            <h3 className="font-serif-luxury text-base font-bold text-[#121212] flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4 text-[#D5B263]" />
                                <span>Refine Catalog</span>
                            </h3>
                            {activeFiltersCount > 0 && (
                                <button
                                    onClick={handleReset}
                                    className="text-[11px] text-[#D5B263] hover:underline font-bold flex items-center gap-1"
                                >
                                    <RotateCcw className="w-3 h-3" />
                                    <span>Reset All</span>
                                </button>
                            )}
                        </div>

                        {/* Category Filter */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#121212] uppercase tracking-wider block">
                                Main Department
                            </label>
                            <div className="space-y-1">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => { setSelectedCategory(cat.id); setSelectedSubCategory('all'); }}
                                        className={`w-full flex items-center justify-between py-2 px-3 rounded-xl text-xs font-medium transition-all text-left ${
                                            selectedCategory === cat.id
                                                ? 'bg-[#121212] text-[#D5B263] font-bold'
                                                : 'hover:bg-[#F7F4EE] text-[#121212]/80'
                                        }`}
                                    >
                                        <span>{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range Slider */}
                        <div className="space-y-3 pt-4 border-t border-[#D5B263]/20">
                            <div className="flex justify-between text-xs font-bold text-[#121212]">
                                <span>Max Budget</span>
                                <span className="text-[#D5B263]">₹{maxPrice.toLocaleString('en-IN')}</span>
                            </div>
                            <input
                                type="range"
                                min={800}
                                max={150000}
                                step={500}
                                value={maxPrice}
                                onChange={e => setMaxPrice(Number(e.target.value))}
                                className="w-full accent-[#121212] cursor-pointer"
                            />
                            <div className="flex gap-2">
                                {[
                                    { label: '< ₹1,000', v: 999 },
                                    { label: '< ₹2,000', v: 2000 },
                                    { label: '< ₹5,000', v: 5000 }
                                ].map(p => (
                                    <button
                                        key={p.v}
                                        onClick={() => setMaxPrice(p.v)}
                                        className="flex-1 py-1 bg-[#F7F4EE] rounded-lg text-[10px] font-bold border border-[#D5B263]/20 hover:border-[#D5B263]"
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="space-y-2 pt-4 border-t border-[#D5B263]/20">
                            <label className="text-xs font-bold text-[#121212] uppercase tracking-wider block">
                                Sizes
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                                {availableSizes.map(sz => {
                                    const isSel = selectedSizes.includes(sz);
                                    return (
                                        <button
                                            key={sz}
                                            onClick={() => toggleFilter(selectedSizes, setSelectedSizes, sz)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                                                isSel
                                                    ? 'bg-[#121212] text-[#D5B263] border-[#121212]'
                                                    : 'bg-white text-[#121212]/70 border-stone-200 hover:border-[#D5B263]'
                                            }`}
                                        >
                                            {sz}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="space-y-2 pt-4 border-t border-[#D5B263]/20">
                            <label className="text-xs font-bold text-[#121212] uppercase tracking-wider block">
                                Shade Palette
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {availableColors.map(c => {
                                    const isSel = selectedColors.includes(c.name);
                                    return (
                                        <button
                                            key={c.name}
                                            onClick={() => toggleFilter(selectedColors, setSelectedColors, c.name)}
                                            style={{ backgroundColor: c.hex }}
                                            className={`w-6 h-6 rounded-full border transition-all ${
                                                isSel ? 'ring-2 ring-offset-2 ring-[#D5B263] scale-110' : 'border-stone-300 opacity-80 hover:opacity-100'
                                            }`}
                                            title={c.name}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* Tailored Fits */}
                        <div className="space-y-2 pt-4 border-t border-[#D5B263]/20">
                            <label className="text-xs font-bold text-[#121212] uppercase tracking-wider block">
                                Tailored Fit
                            </label>
                            <div className="space-y-1">
                                {availableFits.map(fit => (
                                    <button
                                        key={fit}
                                        onClick={() => toggleFilter(selectedFits, setSelectedFits, fit)}
                                        className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs transition-colors text-left ${
                                            selectedFits.includes(fit)
                                                ? 'bg-[#121212] text-[#D5B263] font-bold'
                                                : 'text-[#121212]/70 hover:bg-[#F7F4EE]'
                                        }`}
                                    >
                                        <span>{fit}</span>
                                        {selectedFits.includes(fit) && <Check className="w-3.5 h-3.5" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Fabrics */}
                        <div className="space-y-2 pt-4 border-t border-[#D5B263]/20">
                            <label className="text-xs font-bold text-[#121212] uppercase tracking-wider block">
                                Signature Fabric
                            </label>
                            <div className="space-y-1">
                                {availableFabrics.map(fab => (
                                    <button
                                        key={fab}
                                        onClick={() => toggleFilter(selectedFabrics, setSelectedFabrics, fab)}
                                        className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs transition-colors text-left ${
                                            selectedFabrics.includes(fab)
                                                ? 'bg-[#121212] text-[#D5B263] font-bold'
                                                : 'text-[#121212]/70 hover:bg-[#F7F4EE]'
                                        }`}
                                    >
                                        <span>{fab}</span>
                                        {selectedFabrics.includes(fab) && <Check className="w-3.5 h-3.5" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Virtual Fit Banner in Sidebar */}
                        <div className="pt-4 border-t border-[#D5B263]/20 bg-[#121212] text-white p-4 rounded-2xl space-y-2">
                            <div className="flex items-center gap-1.5 text-[#D5B263] text-xs font-bold">
                                <Sparkles className="w-4 h-4" />
                                <span>Unsure About Size?</span>
                            </div>
                            <p className="text-[11px] text-white/70">
                                Launch our 3D Virtual Fit Suite for instant photorealistic body matching.
                            </p>
                            <button
                                onClick={() => openVirtualFit()}
                                className="w-full py-2 bg-[#D5B263] text-[#121212] font-bold text-[10px] uppercase rounded-xl tracking-wider hover:bg-white transition-colors"
                            >
                                Try 3D Virtual Fit
                            </button>
                        </div>
                    </aside>

                    {/* Product Grid Stage (9 Cols) */}
                    <div className="lg:col-span-9 space-y-8">
                        {filteredProducts.length > 0 ? (
                            <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
                                {filteredProducts.map(prod => (
                                    <ProductCard
                                        key={prod.id}
                                        product={prod}
                                        onSelectProduct={onSelectProduct}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 text-center bg-white rounded-3xl border border-[#D5B263]/30 p-8 space-y-4">
                                <Sparkles className="w-12 h-12 text-[#D5B263] mx-auto opacity-50" />
                                <h3 className="font-serif-luxury text-2xl font-bold text-[#121212]">
                                    No Silhouettes Match Selected Criteria
                                </h3>
                                <p className="text-xs text-[#121212]/60 max-w-sm mx-auto">
                                    Try resetting your filters or adjusting your budget and size selections.
                                </p>
                                <button
                                    onClick={handleReset}
                                    className="px-6 py-2.5 bg-[#121212] text-[#D5B263] font-bold text-xs rounded-xl"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CatalogPage;

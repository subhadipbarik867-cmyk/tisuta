import React, { useState } from 'react';
import { Palette, X, Plus, Trash2, Share2, Sparkles, ShoppingBag, Heart, Check, Download } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { getImgUrl } from '../../utils/imageUtils';
import confetti from 'canvas-confetti';

export const TisutaStyleboardModal = () => {
    const {
        isStyleboardOpen,
        setIsStyleboardOpen,
        products,
        styleboards,
        createStyleboard,
        toggleLikeStyleboard,
        addToCart
    } = useShop();

    const [activeTab, setActiveTab] = useState('create'); // 'create' or 'community'
    const [boardTitle, setBoardTitle] = useState('My Parisian Evening Look');
    const [selectedItems, setSelectedItems] = useState([
        products.find(p => p.id === 'dr-minimal-midi') || products[0],
        products.find(p => p.id === 'dr-slip-style') || products[1],
        products.find(p => p.id === 'tp-off-shoulder') || products[2]
    ]);
    const [bgMood, setBgMood] = useState('Champagne Studio');
    const [isPublished, setIsPublished] = useState(false);

    if (!isStyleboardOpen) return null;

    const bgStyles = {
        'Champagne Studio': 'bg-[#FDFBF7] border-[#D5B263]/40',
        'Onyx Velvet': 'bg-[#121212] text-white border-stone-800',
        'Parisian Marble': 'bg-gradient-to-br from-stone-100 to-stone-200 border-stone-300',
        'Royal Gold': 'bg-gradient-to-br from-[#201A10] to-[#121212] text-white border-[#D5B263]'
    };

    const handleAddItem = (prod) => {
        if (selectedItems.find(p => p.id === prod.id)) return;
        if (selectedItems.length >= 6) {
            alert('A styleboard can hold up to 6 curated silhouettes.');
            return;
        }
        setSelectedItems([...selectedItems, prod]);
    };

    const handleRemoveItem = (id) => {
        setSelectedItems(selectedItems.filter(p => p.id !== id));
    };

    const boardTotal = selectedItems.reduce((acc, it) => acc + it.price, 0);
    const bundleDiscount = Math.round(boardTotal * 0.15); // 15% complete look bonus
    const bundleFinalPrice = boardTotal - bundleDiscount;

    const handleShopEntireLook = () => {
        selectedItems.forEach(item => {
            addToCart(item, 'M', item.colors[0], 1);
        });
        try {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
        alert(`All ${selectedItems.length} items from "${boardTitle}" added to your bag with 15% bundle privilege!`);
    };

    const handlePublish = () => {
        if (!boardTitle.trim()) return;
        createStyleboard(boardTitle, selectedItems.map(p => p.id), bgMood);
        setIsPublished(true);
        setTimeout(() => setIsPublished(false), 3000);
        try {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
        } catch (e) {}
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <div
                onClick={() => setIsStyleboardOpen(false)}
                className="fixed inset-0 bg-[#121212]/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <div className="relative w-full max-w-5xl bg-[#FDFBF7] rounded-3xl border border-[#D5B263]/40 shadow-2xl overflow-hidden z-10 flex flex-col h-[85vh]">
                
                {/* Header */}
                <div className="px-6 py-4 bg-[#121212] text-white flex items-center justify-between border-b border-[#D5B263]/30">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#D5B263] text-[#121212] rounded-xl font-bold">
                            <Palette className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-serif-luxury text-lg font-bold text-white flex items-center gap-2">
                                <span>TISUTA Styleboard™</span>
                                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-[#D5B263]/20 text-[#D5B263] rounded-full border border-[#D5B263]/30">
                                    Scrapbook Studio
                                </span>
                            </h3>
                            <p className="text-[11px] text-white/60">
                                Mix, match, and curate shoppable editorial fashion moodboards
                            </p>
                        </div>
                    </div>

                    {/* Mode Tabs */}
                    <div className="flex items-center gap-3">
                        <div className="flex bg-white/10 p-1 rounded-xl text-xs font-bold">
                            <button
                                onClick={() => setActiveTab('create')}
                                className={`px-4 py-1.5 rounded-lg transition-all ${
                                    activeTab === 'create' ? 'bg-[#D5B263] text-[#121212]' : 'text-white/70 hover:text-white'
                                }`}
                            >
                                Board Creator
                            </button>
                            <button
                                onClick={() => setActiveTab('community')}
                                className={`px-4 py-1.5 rounded-lg transition-all ${
                                    activeTab === 'community' ? 'bg-[#D5B263] text-[#121212]' : 'text-white/70 hover:text-white'
                                }`}
                            >
                                Community Looks ({styleboards.length})
                            </button>
                        </div>
                        <button
                            onClick={() => setIsStyleboardOpen(false)}
                            className="p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* TAB 1: CREATOR */}
                {activeTab === 'create' ? (
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
                        
                        {/* Interactive Scrapbook Canvas (7 Cols) */}
                        <div className="lg:col-span-8 p-6 flex flex-col justify-between overflow-y-auto">
                            
                            {/* Canvas Controls */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                <input
                                    type="text"
                                    value={boardTitle}
                                    onChange={e => setBoardTitle(e.target.value)}
                                    className="font-serif-luxury text-xl font-bold text-[#121212] bg-transparent border-b border-[#D5B263]/40 focus:outline-none focus:border-[#D5B263] pb-1 max-w-sm"
                                    placeholder="Name your styleboard..."
                                />
                                
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="text-[#121212]/60 font-medium">Mood:</span>
                                    {Object.keys(bgStyles).map(m => (
                                        <button
                                            key={m}
                                            onClick={() => setBgMood(m)}
                                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                                                bgMood === m
                                                    ? 'bg-[#121212] text-[#D5B263] border-[#121212]'
                                                    : 'bg-white text-[#121212]/60 border-stone-300'
                                            }`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* The Visual Stage Canvas */}
                            <div className={`relative flex-1 rounded-3xl border-2 p-6 transition-all min-h-[360px] flex items-center justify-center ${bgStyles[bgMood]}`}>
                                {selectedItems.length === 0 ? (
                                    <div className="text-center space-y-2 opacity-50">
                                        <Palette className="w-12 h-12 mx-auto text-[#D5B263]" />
                                        <p className="text-xs font-bold uppercase tracking-wider">Canvas is Empty</p>
                                        <p className="text-[11px]">Select silhouettes from the right panel to compose your look.</p>
                                    </div>
                                ) : (
                                    <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 gap-4 items-center justify-items-center">
                                        {selectedItems.map((prod) => (
                                            <div
                                                key={prod.id}
                                                className="relative group bg-white/90 backdrop-blur rounded-2xl p-2.5 border border-[#D5B263]/30 shadow-md hover:scale-105 transition-all text-[#121212] w-full max-w-[170px]"
                                            >
                                                <button
                                                    onClick={() => handleRemoveItem(prod.id)}
                                                    className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10"
                                                    title="Remove from board"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                                <img
                                                    src={getImgUrl(prod.images[0])}
                                                    alt={prod.name}
                                                    className="w-full h-32 object-cover rounded-xl"
                                                />
                                                <div className="mt-2 space-y-0.5">
                                                    <p className="font-serif-luxury text-[11px] font-bold truncate">
                                                        {prod.name}
                                                    </p>
                                                    <p className="text-[10px] font-extrabold text-[#D5B263]">
                                                        ₹{prod.price.toLocaleString('en-IN')}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Canvas Bottom Action Bar */}
                            <div className="mt-4 pt-4 border-t border-[#D5B263]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <span className="text-[10px] text-[#121212]/60 uppercase font-bold tracking-wider block">
                                        Bundle Total ({selectedItems.length} Silhouettes)
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-serif-luxury text-2xl font-bold text-[#121212]">
                                            ₹{bundleFinalPrice.toLocaleString('en-IN')}
                                        </span>
                                        {bundleDiscount > 0 && (
                                            <span className="text-xs line-through text-[#121212]/40">
                                                ₹{boardTotal.toLocaleString('en-IN')}
                                            </span>
                                        )}
                                        <span className="px-2 py-0.5 bg-green-600 text-white text-[9px] font-bold rounded-full">
                                            Save 15% Complete Look
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handlePublish}
                                        className="px-4 py-2.5 bg-white border border-[#D5B263]/50 text-[#121212] font-bold text-xs rounded-xl hover:bg-[#121212] hover:text-[#D5B263] transition-colors flex items-center gap-1.5"
                                    >
                                        <Share2 className="w-3.5 h-3.5" />
                                        <span>{isPublished ? 'Published!' : 'Publish to Feed'}</span>
                                    </button>
                                    <button
                                        onClick={handleShopEntireLook}
                                        disabled={selectedItems.length === 0}
                                        className="px-6 py-2.5 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>Shop Complete Look</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Silhouette Palette Selector (4 Cols) */}
                        <div className="lg:col-span-4 bg-white border-l border-[#D5B263]/25 p-6 flex flex-col justify-between overflow-y-auto">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-[#D5B263]/20 pb-3">
                                    <h4 className="font-serif-luxury text-sm font-bold text-[#121212] uppercase tracking-wider">
                                        Garment Palette
                                    </h4>
                                    <span className="text-[10px] text-[#D5B263] font-bold uppercase tracking-wider">
                                        Click (+) to Add
                                    </span>
                                </div>

                                <div className="space-y-2.5 max-h-[55vh] overflow-y-auto pr-1">
                                    {products.map(prod => {
                                        const isAdded = selectedItems.some(p => p.id === prod.id);
                                        return (
                                            <div
                                                key={prod.id}
                                                className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                                                    isAdded
                                                        ? 'bg-[#F7F4EE] border-[#D5B263]'
                                                        : 'bg-white border-[#D5B263]/20 hover:border-[#D5B263]'
                                                }`}
                                            >
                                                <img
                                                    src={getImgUrl(prod.images[0])}
                                                    alt={prod.name}
                                                    className="w-12 h-14 object-cover rounded-xl flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-[9px] font-bold text-[#D5B263] uppercase tracking-wider block">
                                                        {prod.styleTag || prod.category}
                                                    </span>
                                                    <h5 className="font-serif-luxury text-xs font-bold text-[#121212] truncate">
                                                        {prod.name}
                                                    </h5>
                                                    <span className="text-[11px] font-bold text-[#121212]">
                                                        ₹{prod.price.toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => isAdded ? handleRemoveItem(prod.id) : handleAddItem(prod)}
                                                    className={`p-2 rounded-xl transition-colors ${
                                                        isAdded
                                                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                                            : 'bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212]'
                                                    }`}
                                                    title={isAdded ? 'Remove' : 'Add to Canvas'}
                                                >
                                                    {isAdded ? <Trash2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* TAB 2: COMMUNITY STYLEBOARDS */
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {styleboards.map(sb => {
                                const boardProducts = products.filter(p => sb.items.includes(p.id));
                                const total = boardProducts.reduce((acc, p) => acc + p.price, 0);

                                return (
                                    <div
                                        key={sb.id}
                                        className="bg-white rounded-3xl border border-[#D5B263]/30 overflow-hidden shadow-md space-y-4 p-5"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={sb.creatorAvatar}
                                                    alt={sb.creator}
                                                    className="w-10 h-10 rounded-full object-cover border border-[#D5B263]"
                                                />
                                                <div>
                                                    <h5 className="font-serif-luxury text-sm font-bold text-[#121212]">
                                                        {sb.title}
                                                    </h5>
                                                    <p className="text-[10px] text-[#121212]/60">
                                                        Curated by <strong>{sb.creator}</strong> • {sb.date}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => toggleLikeStyleboard(sb.id)}
                                                className={`p-2 rounded-full border transition-all flex items-center gap-1 text-xs font-bold ${
                                                    sb.isLiked
                                                        ? 'bg-red-50 text-red-600 border-red-200'
                                                        : 'bg-white text-stone-600 border-stone-200 hover:border-[#D5B263]'
                                                }`}
                                            >
                                                <Heart className={`w-3.5 h-3.5 ${sb.isLiked ? 'fill-red-600' : ''}`} />
                                                <span>{sb.likes}</span>
                                            </button>
                                        </div>

                                        {/* Board Gallery */}
                                        <div className="grid grid-cols-3 gap-2 bg-[#F7F4EE] p-3 rounded-2xl border border-[#D5B263]/20">
                                            {boardProducts.map(bp => (
                                                <div key={bp.id} className="space-y-1 text-center">
                                                    <img
                                                        src={getImgUrl(bp.images[0])}
                                                        alt={bp.name}
                                                        className="w-full h-24 object-cover rounded-xl"
                                                    />
                                                    <span className="text-[9px] font-bold text-[#121212] block truncate">
                                                        {bp.name}
                                                    </span>
                                                    <span className="text-[9px] text-[#D5B263] font-bold block">
                                                        ₹{bp.price.toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Action */}
                                        <div className="flex items-center justify-between pt-2 border-t border-[#D5B263]/20">
                                            <div>
                                                <span className="text-[9px] text-[#121212]/60 uppercase font-bold">
                                                    Full Outfit Value
                                                </span>
                                                <p className="font-serif-luxury text-lg font-bold text-[#121212]">
                                                    ₹{total.toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    boardProducts.forEach(p => addToCart(p, 'M', p.colors[0], 1));
                                                    alert(`Added all ${boardProducts.length} items from "${sb.title}" to cart!`);
                                                }}
                                                className="px-5 py-2.5 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                                            >
                                                <ShoppingBag className="w-3.5 h-3.5" />
                                                <span>Shop Look</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TisutaStyleboardModal;

import React, { useState } from 'react';
import { Layers, Plus, Check, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { getImgUrl } from '../../utils/imageUtils';

export const CompleteTheLook = ({ currentProduct }) => {
    const { products, addToCart } = useShop();

    // Pick 2 matching accessory/apparel items from catalog based on current category
    const matchingItems = products.filter(p => p.id !== currentProduct.id).slice(0, 2);

    const [selectedItemIds, setSelectedItemIds] = useState(
        [currentProduct.id, ...matchingItems.map(m => m.id)]
    );

    const toggleItem = (id) => {
        if (id === currentProduct.id) return; // Main product cannot be unselected
        setSelectedItemIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const selectedProducts = [currentProduct, ...matchingItems].filter(p => selectedItemIds.includes(p.id));

    const originalTotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
    const bundleDiscountPercent = selectedProducts.length >= 3 ? 15 : selectedProducts.length === 2 ? 10 : 0;
    const finalBundlePrice = Math.round(originalTotal * (1 - bundleDiscountPercent / 100));
    const bundleSavings = originalTotal - finalBundlePrice;

    const [addedSuccess, setAddedSuccess] = useState(false);

    const handleAddFullOutfit = () => {
        selectedProducts.forEach(p => {
            addToCart(p, p.sizes?.[0] || 'M', p.colors?.[0] || null, 1);
        });
        setAddedSuccess(true);
        setTimeout(() => setAddedSuccess(false), 3000);
    };

    return (
        <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-stone-800">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#C5A059] text-[10px] font-bold tracking-[0.25em] uppercase">
                        <Layers className="w-3.5 h-3.5" />
                        <span>LimeRoad Mix & Match Studio</span>
                    </div>
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                        Complete The Look
                    </h3>
                </div>

                {bundleDiscountPercent > 0 && (
                    <span className="px-3.5 py-1 bg-[#C5A059] text-stone-950 text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                        🔥 Extra {bundleDiscountPercent}% Outfit Bundle OFF
                    </span>
                )}
            </div>

            {/* Visual Outfit Bundle Grid */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto py-2">
                    {[currentProduct, ...matchingItems].map((item, idx) => {
                        const isSelected = selectedItemIds.includes(item.id);
                        const isMain = item.id === currentProduct.id;

                        return (
                            <React.Fragment key={item.id}>
                                {idx > 0 && (
                                    <Plus className="w-4 h-4 text-stone-500 flex-shrink-0" />
                                )}

                                <div
                                    onClick={() => toggleItem(item.id)}
                                    className={`relative flex-shrink-0 w-28 sm:w-32 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-stone-900 ${isSelected
                                        ? 'border-[#C5A059] ring-2 ring-[#C5A059]/40 opacity-100 scale-100'
                                        : 'border-stone-800 opacity-40 hover:opacity-75 scale-95'
                                        }`}
                                >
                                    <div className="aspect-[3/4] relative">
                                        <img
                                            src={getImgUrl(item.images?.[0])}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Selection indicator */}
                                        <div className="absolute top-2 right-2">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isSelected ? 'bg-[#C5A059] text-stone-900' : 'bg-stone-900/80 text-white'
                                                    }`}
                                            >
                                                {isSelected ? <Check className="w-3 h-3" /> : '+'}
                                            </div>
                                        </div>

                                        {isMain && (
                                            <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-stone-950/90 text-[#C5A059] text-[8px] font-bold uppercase tracking-wider rounded">
                                                This Item
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-2 space-y-0.5 bg-stone-900">
                                        <p className="text-[10px] text-white font-medium truncate">
                                            {item.name}
                                        </p>
                                        <p className="text-xs font-bold text-[#C5A059]">
                                            ₹{item.price.toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Bundle Summary & CTA Box */}
                <div className="w-full md:w-64 bg-stone-900/80 border border-stone-800 rounded-2xl p-4 space-y-3 flex-shrink-0">
                    <div className="space-y-1">
                        <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-medium">
                            {selectedProducts.length} Items Selected
                        </span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">
                                ₹{finalBundlePrice.toLocaleString('en-IN')}
                            </span>
                            {bundleSavings > 0 && (
                                <span className="text-xs text-stone-400 line-through">
                                    ₹{originalTotal.toLocaleString('en-IN')}
                                </span>
                            )}
                        </div>
                        {bundleSavings > 0 && (
                            <p className="text-[11px] font-bold text-emerald-400">
                                You Save ₹{bundleSavings.toLocaleString('en-IN')} on this look!
                            </p>
                        )}
                    </div>

                    <button
                        onClick={handleAddFullOutfit}
                        className="w-full py-3 bg-[#C5A059] text-stone-950 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                        {addedSuccess ? (
                            <>
                                <Check className="w-4 h-4 text-emerald-900" />
                                <span>ADDED FULL OUTFIT!</span>
                            </>
                        ) : (
                            <>
                                <ShoppingBag className="w-4 h-4" />
                                <span>ADD FULL LOOK TO BAG</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompleteTheLook;

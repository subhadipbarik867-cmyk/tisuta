import React, { useState } from 'react';
import { Sparkles, X, Plus, Check, ShoppingBag, ArrowRight, Layers, ShieldCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { getImgUrl } from '../../utils/imageUtils';

export const OutfitMixerModal = ({ isOpen, onClose }) => {
    const { products, addToCart, openVirtualFit } = useShop();

    // Selected piece slots
    const [selectedTop, setSelectedTop] = useState(products[0]);
    const [selectedBottom, setSelectedBottom] = useState(products[2] || products[1]);
    const [selectedCape, setSelectedCape] = useState(products[5] || products[3]);
    const [selectedLayer, setSelectedLayer] = useState(products[8] || products[4]);

    if (!isOpen) return null;

    const rawTotal =
        (selectedTop?.price || 0) +
        (selectedBottom?.price || 0) +
        (selectedCape?.price || 0) +
        (selectedLayer?.price || 0);

    const bundleDiscountPercentage = 15;
    const bundleSavings = Math.round((rawTotal * bundleDiscountPercentage) / 100);
    const finalBundleTotal = rawTotal - bundleSavings;

    const handleBuyEntireLook = () => {
        if (selectedTop) addToCart(selectedTop, 'M', selectedTop.colors[0], 1);
        if (selectedBottom) addToCart(selectedBottom, 'M', selectedBottom.colors[0], 1);
        if (selectedCape) addToCart(selectedCape, 'M', selectedCape.colors[0], 1);
        if (selectedLayer) addToCart(selectedLayer, 'M', selectedLayer.colors[0], 1);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <div onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-md" />

            {/* Main Modal */}
            <div className="relative w-full max-w-5xl bg-[#121212] text-[#FDFBF7] rounded-3xl border border-[#D5B263]/40 shadow-2xl overflow-hidden z-10 my-auto grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Column: Visual Mix-It-Up Canvas Stage (7 Cols) */}
                <div className="lg:col-span-7 p-6 bg-[#0E0D0B] border-r border-[#D5B263]/20 flex flex-col justify-between overflow-y-auto space-y-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 bg-[#D5B263] text-[#121212] font-bold text-[10px] uppercase rounded-full">
                                TISUTA Mix-It-Up Studio
                            </span>
                            <span className="text-xs text-[#D5B263] font-bold">15% Ensemble Savings</span>
                        </div>
                        <h3 className="font-serif-luxury text-2xl font-bold text-white">Create Custom Outfit Ensemble</h3>
                    </div>

                    {/* 4-Piece Visual Mannequin Display Grid */}
                    <div className="grid grid-cols-2 gap-3 p-4 bg-[#141311] rounded-2xl border border-[#D5B263]/30">
                        {/* Slot 1: Dress / Main Piece */}
                        <div className="relative aspect-[3/4] bg-black rounded-xl overflow-hidden border border-[#D5B263]/40 group">
                            <img src={getImgUrl(selectedTop?.images?.[0])} alt="" className="w-full h-full object-cover" />
                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] text-[#D5B263] font-bold rounded">
                                1. Dress / Main Piece
                            </div>
                            <div className="absolute bottom-2 left-2 right-2 bg-black/90 p-1.5 rounded text-[11px] font-bold line-clamp-1">
                                {selectedTop?.name}
                            </div>
                        </div>

                        {/* Slot 2: Outerwear / Kurti / Shrug */}
                        <div className="relative aspect-[3/4] bg-black rounded-xl overflow-hidden border border-[#D5B263]/40 group">
                            <img src={getImgUrl(selectedCape?.images?.[0])} alt="" className="w-full h-full object-cover" />
                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] text-[#D5B263] font-bold rounded">
                                2. Outerwear / Kurti
                            </div>
                            <div className="absolute bottom-2 left-2 right-2 bg-black/90 p-1.5 rounded text-[11px] font-bold line-clamp-1">
                                {selectedCape?.name}
                            </div>
                        </div>

                        {/* Slot 3: Silhouette / Bottom */}
                        <div className="relative aspect-[3/4] bg-black rounded-xl overflow-hidden border border-[#D5B263]/40 group">
                            <img src={getImgUrl(selectedBottom?.images?.[0])} alt="" className="w-full h-full object-cover" />
                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] text-[#D5B263] font-bold rounded">
                                3. Silhouette / Bottom
                            </div>
                            <div className="absolute bottom-2 left-2 right-2 bg-black/90 p-1.5 rounded text-[11px] font-bold line-clamp-1">
                                {selectedBottom?.name}
                            </div>
                        </div>

                        {/* Slot 4: Layering Stole / Overlay */}
                        <div className="relative aspect-[3/4] bg-black rounded-xl overflow-hidden border border-[#D5B263]/40 group">
                            <img src={getImgUrl(selectedLayer?.images?.[0])} alt="" className="w-full h-full object-cover" />
                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] text-[#D5B263] font-bold rounded">
                                4. Layering / Dupatta / Stole
                            </div>
                            <div className="absolute bottom-2 left-2 right-2 bg-black/90 p-1.5 rounded text-[11px] font-bold line-clamp-1">
                                {selectedLayer?.name}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Piece Selector Controls & Price Summary (5 Cols) */}
                <div className="lg:col-span-5 p-6 bg-[#171614] flex flex-col justify-between overflow-y-auto space-y-6">
                    <div className="space-y-4">
                        <h4 className="font-serif-luxury text-xl font-bold text-white border-b border-[#D5B263]/20 pb-2">
                            Select Garment Pieces
                        </h4>

                        {/* Item Switcher 1: Main Piece */}
                        <div className="space-y-1.5">
                            <label className="text-xs text-[#D5B263] font-bold">1. Main Silhouette / Dress:</label>
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {products.slice(0, 4).map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => setSelectedTop(p)}
                                        className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${selectedTop?.id === p.id ? 'border-[#D5B263] ring-2 ring-[#D5B263]' : 'border-transparent opacity-60'
                                            }`}
                                    >
                                        <img src={getImgUrl(p.images?.[0])} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Item Switcher 2: Kurti / Outerwear */}
                        <div className="space-y-1.5">
                            <label className="text-xs text-[#D5B263] font-bold">2. Outerwear / Kurti:</label>
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {products.slice(4, 8).map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => setSelectedCape(p)}
                                        className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${selectedCape?.id === p.id ? 'border-[#D5B263] ring-2 ring-[#D5B263]' : 'border-transparent opacity-60'
                                            }`}
                                    >
                                        <img src={getImgUrl(p.images?.[0])} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Item Switcher 3: Silhouette Bottom */}
                        <div className="space-y-1.5">
                            <label className="text-xs text-[#D5B263] font-bold">3. Silhouette / Bottom:</label>
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {products.slice(2, 6).map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => setSelectedBottom(p)}
                                        className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${selectedBottom?.id === p.id ? 'border-[#D5B263] ring-2 ring-[#D5B263]' : 'border-transparent opacity-60'
                                            }`}
                                    >
                                        <img src={getImgUrl(p.images?.[0])} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Item Switcher 4: Layering Stole / Overlay */}
                        <div className="space-y-1.5">
                            <label className="text-xs text-[#D5B263] font-bold">4. Layering / Dupatta / Stole:</label>
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {products.slice(8, 12).map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => setSelectedLayer(p)}
                                        className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${selectedLayer?.id === p.id ? 'border-[#D5B263] ring-2 ring-[#D5B263]' : 'border-transparent opacity-60'
                                            }`}
                                    >
                                        <img src={getImgUrl(p.images?.[0])} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pricing Breakdown & CTA */}
                    <div className="space-y-4 pt-4 border-t border-[#D5B263]/20">
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between text-gray-400">
                                <span>Combined Garment Total</span>
                                <span>₹{rawTotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-green-400 font-bold">
                                <span>Mix-It-Up 15% Bundle Discount</span>
                                <span>-₹{bundleSavings.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/10">
                                <span>Final Ensemble Price</span>
                                <span className="text-[#D5B263]">₹{finalBundleTotal.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={handleBuyEntireLook}
                                className="w-full py-4 bg-[#D5B263] text-[#121212] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                <span>BUY COMPLETE 4-PIECE LOOK</span>
                            </button>

                            <button
                                onClick={() => {
                                    onClose();
                                    openVirtualFit(selectedTop);
                                }}
                                className="w-full py-3 bg-white/10 text-white font-bold text-xs rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                            >
                                <Sparkles className="w-4 h-4 text-[#D5B263]" />
                                <span>Try Complete Ensemble in 3D Avatar</span>
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default OutfitMixerModal;

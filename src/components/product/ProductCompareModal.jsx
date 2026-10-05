import React from 'react';
import { X, Check, SlidersHorizontal, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { getImgUrl } from '../../utils/imageUtils';

export const ProductCompareModal = () => {
    const { isCompareOpen, setIsCompareOpen, compareProducts, removeFromCompare, addToCart } = useShop();

    if (!isCompareOpen || compareProducts.length === 0) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                onClick={() => setIsCompareOpen(false)}
                className="fixed inset-0 bg-[#121212]/80 backdrop-blur-md"
            />

            <div className="relative w-full max-w-5xl bg-[#FDFBF7] rounded-3xl border border-[#D5B263]/40 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="px-6 py-4 bg-[#121212] text-white flex items-center justify-between border-b border-[#D5B263]/30">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-[#D5B263]" />
                        <div>
                            <h3 className="font-serif-luxury text-lg font-bold">
                                Silhouette Spec Comparison
                            </h3>
                            <p className="text-[10px] text-white/60">
                                Side-by-side analysis of fabric, tailoring, silhouette metrics, and delivery
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsCompareOpen(false)}
                        className="p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Table Content */}
                <div className="flex-1 overflow-x-auto p-6">
                    <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b border-[#D5B263]/30">
                                <th className="p-3 text-[#121212]/50 font-bold uppercase tracking-widest w-36">
                                    Garment
                                </th>
                                {compareProducts.map(p => (
                                    <th key={p.id} className="p-3 align-top">
                                        <div className="space-y-2 relative">
                                            <button
                                                onClick={() => removeFromCompare(p.id)}
                                                className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                                                title="Remove"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                            <img
                                                src={getImgUrl(p.images[0])}
                                                alt={p.name}
                                                className="w-24 h-32 object-cover rounded-xl border border-[#D5B263]/30"
                                            />
                                            <span className="text-[9px] font-bold text-[#D5B263] uppercase tracking-wider block">
                                                {p.brand}
                                            </span>
                                            <h4 className="font-serif-luxury text-sm font-bold text-[#121212]">
                                                {p.name}
                                            </h4>
                                            <p className="font-serif-luxury text-base font-bold text-[#121212]">
                                                ₹{p.price.toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#D5B263]/20">
                            {/* Rating */}
                            <tr>
                                <td className="p-3 font-bold text-[#121212]/60 uppercase text-[10px] tracking-wider">
                                    Customer Rating
                                </td>
                                {compareProducts.map(p => (
                                    <td key={p.id} className="p-3 font-bold text-[#121212]">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#121212] text-[#D5B263] rounded-full text-xs">
                                            <Star className="w-3 h-3 fill-[#D5B263]" />
                                            <span>{p.rating} / 5.0 ({p.reviewCount} Reviews)</span>
                                        </span>
                                    </td>
                                ))}
                            </tr>

                            {/* Fabric & Material */}
                            <tr>
                                <td className="p-3 font-bold text-[#121212]/60 uppercase text-[10px] tracking-wider">
                                    Fabric & Weave
                                </td>
                                {compareProducts.map(p => (
                                    <td key={p.id} className="p-3 text-[#121212] font-medium">
                                        {p.fabric || 'Pure Mulberry Silk'}
                                    </td>
                                ))}
                            </tr>

                            {/* Tailoring & Fit */}
                            <tr>
                                <td className="p-3 font-bold text-[#121212]/60 uppercase text-[10px] tracking-wider">
                                    Tailored Fit
                                </td>
                                {compareProducts.map(p => (
                                    <td key={p.id} className="p-3 text-[#121212]">
                                        <span className="px-2.5 py-0.5 bg-[#F7F4EE] border border-[#D5B263]/40 rounded-full font-semibold">
                                            {p.fit || 'Regular Tailored'}
                                        </span>
                                    </td>
                                ))}
                            </tr>

                            {/* Neckline & Sleeve */}
                            <tr>
                                <td className="p-3 font-bold text-[#121212]/60 uppercase text-[10px] tracking-wider">
                                    Neckline & Sleeve
                                </td>
                                {compareProducts.map(p => (
                                    <td key={p.id} className="p-3 text-[#121212]/80">
                                        {p.neckline || 'Classic'} • {p.sleeve || 'Fitted'}
                                    </td>
                                ))}
                            </tr>

                            {/* Length */}
                            <tr>
                                <td className="p-3 font-bold text-[#121212]/60 uppercase text-[10px] tracking-wider">
                                    Length
                                </td>
                                {compareProducts.map(p => (
                                    <td key={p.id} className="p-3 text-[#121212]/80">
                                        {p.length || 'Tea Length (Midi)'}
                                    </td>
                                ))}
                            </tr>

                            {/* Occasion */}
                            <tr>
                                <td className="p-3 font-bold text-[#121212]/60 uppercase text-[10px] tracking-wider">
                                    Occasion
                                </td>
                                {compareProducts.map(p => (
                                    <td key={p.id} className="p-3 text-[#121212] font-medium">
                                        {p.occasion || 'Evening & Gala'}
                                    </td>
                                ))}
                            </tr>

                            {/* White Glove Delivery */}
                            <tr>
                                <td className="p-3 font-bold text-[#121212]/60 uppercase text-[10px] tracking-wider">
                                    Delivery Guarantee
                                </td>
                                {compareProducts.map(p => (
                                    <td key={p.id} className="p-3 text-green-700 font-semibold">
                                        Express 48h Blue Dart Delivery
                                    </td>
                                ))}
                            </tr>

                            {/* Return Policy */}
                            <tr>
                                <td className="p-3 font-bold text-[#121212]/60 uppercase text-[10px] tracking-wider">
                                    Atelier Returns
                                </td>
                                {compareProducts.map(p => (
                                    <td key={p.id} className="p-3 text-[#121212]/70">
                                        7-Day Complimentary Home Pickup & Size Exchange
                                    </td>
                                ))}
                            </tr>

                            {/* Quick Add To Bag */}
                            <tr>
                                <td className="p-3 font-bold text-[#121212]/60 uppercase text-[10px] tracking-wider">
                                    Instant Action
                                </td>
                                {compareProducts.map(p => (
                                    <td key={p.id} className="p-3">
                                        <button
                                            onClick={() => addToCart(p, 'M', p.colors[0], 1)}
                                            className="w-full py-2.5 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                                        >
                                            <ShoppingBag className="w-3.5 h-3.5" />
                                            <span>Add to Bag</span>
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductCompareModal;

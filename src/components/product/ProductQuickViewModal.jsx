import React, { useState } from 'react';
import { X, Heart, Sparkles, ShoppingBag, ShieldCheck, Star } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ProductQuickViewModal = () => {
    const {
        isQuickViewOpen,
        closeQuickView,
        quickViewProduct,
        addToCart,
        toggleWishlist,
        isWishlisted,
        openVirtualFit
    } = useShop();

    if (!isQuickViewOpen || !quickViewProduct) return null;

    const [selectedColor, setSelectedColor] = useState(quickViewProduct.colors[0]);
    const [selectedSize, setSelectedSize] = useState(quickViewProduct.sizes[0] || 'M');
    const [activeImage, setActiveImage] = useState(quickViewProduct.colors[0]?.image || quickViewProduct.images[0]);
    const [quantity, setQuantity] = useState(1);

    const wishlisted = isWishlisted(quickViewProduct.id);

    const handleColorClick = (c) => {
        setSelectedColor(c);
        if (c.image) {
            setActiveImage(c.image);
        }
    };

    const handleAddToCart = () => {
        addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
        closeQuickView();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div onClick={closeQuickView} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

            <div className="relative w-full max-w-4xl bg-[#FDFBF7] text-[#121212] rounded-3xl border border-[#D5B263]/40 shadow-2xl overflow-hidden z-10 my-auto grid grid-cols-1 md:grid-cols-12">

                {/* Close Button */}
                <button
                    onClick={closeQuickView}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-[#121212] hover:bg-white shadow-md transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Gallery Left (6 Cols) */}
                <div className="md:col-span-6 bg-[#F7F4EE] relative flex flex-col justify-between p-6">
                    <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[#D5B263]/30 shadow-md">
                        <img src={activeImage} alt="" className="w-full h-full object-cover transition-all duration-500" />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pt-4">
                        {quickViewProduct.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(img)}
                                className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === img ? 'border-[#D5B263] ring-2 ring-[#D5B263]' : 'border-transparent opacity-70'
                                    }`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info Right (6 Cols) */}
                <div className="md:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                        <div>
                            <span className="text-[10px] font-bold text-[#D5B263] uppercase tracking-widest block">
                                {quickViewProduct.brand}
                            </span>
                            <h3 className="font-serif-luxury text-2xl font-bold text-[#121212] mt-1">
                                {quickViewProduct.name}
                            </h3>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-[#121212]">
                                ₹{quickViewProduct.price.toLocaleString('en-IN')}
                            </span>
                            {quickViewProduct.mrp > quickViewProduct.price && (
                                <span className="text-xs text-gray-400 line-through">
                                    ₹{quickViewProduct.mrp.toLocaleString('en-IN')}
                                </span>
                            )}
                        </div>

                        {/* Dynamic Swatch Colors */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-[#121212] block">
                                Shade: <strong>{selectedColor.name}</strong>
                            </label>
                            <div className="flex gap-2">
                                {quickViewProduct.colors.map(c => (
                                    <button
                                        key={c.name}
                                        onClick={() => handleColorClick(c)}
                                        style={{ backgroundColor: c.hex }}
                                        className={`w-7 h-7 rounded-full border border-black/20 ${selectedColor.name === c.name ? 'ring-2 ring-[#D5B263] scale-110' : ''
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-[#121212]">Size</label>
                            <div className="flex gap-2">
                                {quickViewProduct.sizes.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`w-10 h-10 rounded-xl text-xs font-bold border transition-all ${selectedSize === s
                                                ? 'bg-[#121212] text-[#D5B263] border-[#D5B263]'
                                                : 'bg-white text-[#121212] border-gray-200'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-4 bg-[#D5B263] text-[#121212] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>ADD TO WARDROBE</span>
                        </button>

                        <button
                            onClick={() => {
                                closeQuickView();
                                openVirtualFit(quickViewProduct);
                            }}
                            className="w-full py-3 bg-[#121212] text-[#D5B263] font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Test 3D Virtual Fit AI</span>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProductQuickViewModal;

import React, { useState } from 'react';
import { X, Heart, Sparkles, ShoppingBag, Star, Eye, ShieldCheck, Compass, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { getImgUrl } from '../../utils/imageUtils';
import { ThreeDBodyAvatar } from '../virtualFit/ThreeDBodyAvatar';

const QuickViewContent = ({ product, onClose, initialMode = 'photos' }) => {
    const { addToCart, isWishlisted, toggleWishlist, openVirtualFit } = useShop();
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || { name: 'Default', hex: '#000' });
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [viewMode, setViewMode] = useState(initialMode === 'avatar3d' ? 'avatar3d' : 'photos');

    const wishlisted = isWishlisted(product.id);
    const images = product.images || [];
    const activeImage = images[activeImageIndex] || images[0] || { url: '' };

    const handleColorClick = (c) => {
        setSelectedColor(c);
        if (c.image) {
            const idx = images.findIndex(img => getImgUrl(img) === getImgUrl(c.image));
            if (idx !== -1) setActiveImageIndex(idx);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, selectedSize, selectedColor, 1);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
            <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" />

            <div className="relative w-full max-w-5xl bg-[#FDFBF7] text-[#121212] rounded-3xl border-2 border-[#D4AF37]/50 shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden z-10 my-auto grid grid-cols-1 lg:grid-cols-12 animate-in fade-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/90 hover:bg-[#D4AF37] hover:text-black backdrop-blur-md text-[#121212] shadow-md transition-all border border-[#D4AF37]/30 cursor-pointer"
                    title="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* LEFT: Multi-Angle Media Showcase (7 Cols) */}
                <div className="lg:col-span-7 bg-[#F7F4EE] relative flex flex-col justify-between p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#D4AF37]/25 space-y-4">
                    
                    {/* Mode Selector Tabs: Photos vs 3D Avatar */}
                    <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-[#D4AF37]/30 shadow-sm max-w-md mx-auto w-full">
                        <button
                            onClick={() => setViewMode('photos')}
                            className={`flex-1 py-2 px-3 rounded-xl font-cinzel text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                viewMode === 'photos'
                                    ? 'bg-[#141210] text-[#F5D77F] shadow-md'
                                    : 'text-stone-600 hover:text-black'
                            }`}
                        >
                            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>📸 Studio Photography</span>
                        </button>

                        <button
                            onClick={() => setViewMode('avatar3d')}
                            className={`flex-1 py-2 px-3 rounded-xl font-cinzel text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                viewMode === 'avatar3d'
                                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B88B22] text-[#141210] shadow-md font-extrabold'
                                    : 'text-stone-600 hover:text-[#D4AF37]'
                            }`}
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>👗 3D Fit Avatar</span>
                        </button>
                    </div>

                    {/* MODE 1: HIGH-RES PHOTOS GALLERY */}
                    {viewMode === 'photos' && (
                        <div className="space-y-4">
                            <div className="aspect-[3/3.9] w-full rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-md bg-white relative group">
                                <img 
                                    src={getImgUrl(activeImage)} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                                />

                                {/* Angle Label Floating Pill */}
                                <div className="absolute top-3 left-3 bg-[#141210]/85 text-[#F5D77F] text-[9.5px] font-cinzel font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md border border-[#D4AF37]/30 shadow-md">
                                    {activeImage.label || `Angle 0${activeImageIndex + 1}`}
                                </div>

                                <div className="absolute bottom-3 left-3 right-3 text-center bg-black/60 backdrop-blur-md text-white text-[10px] py-1.5 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {activeImage.angle || 'Full Atelier Perspective'}
                                </div>
                            </div>

                            {/* Angle Thumbnails */}
                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none justify-center">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`w-14 h-18 sm:w-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                                            activeImageIndex === idx 
                                                ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 scale-95 shadow-md' 
                                                : 'border-transparent opacity-65 hover:opacity-100'
                                        }`}
                                    >
                                        <img src={getImgUrl(img)} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* MODE 2: 3D AVATAR & LIVE DRAPE */}
                    {viewMode === 'avatar3d' && (
                        <div className="w-full bg-[#0C0B0A] rounded-2xl p-3 sm:p-4 border border-[#D4AF37]/40 shadow-xl space-y-2">
                            <div className="flex items-center justify-between text-xs text-[#F5D77F] font-cinzel font-bold px-1">
                                <span>3D Avatar Turntable Model</span>
                                <span className="text-[10px] text-stone-400 font-mono">Drag to Rotate 360°</span>
                            </div>
                            <ThreeDBodyAvatar
                                garmentColor={selectedColor}
                                garmentImage={getImgUrl(activeImage)}
                                garmentSilhouette={product.subCategory || 'minimal-midi'}
                                garmentName={product.name}
                                height={product.modelStats?.height || '168 cm'}
                                bust="34 in"
                                waist="27 in"
                                hips="36 in"
                                fitScore={98}
                                showControls={true}
                            />
                        </div>
                    )}

                </div>

                {/* RIGHT: Product Details & Wardrobe CTA (5 Cols) */}
                <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                        <div>
                            <span className="text-[10px] font-extrabold text-[#9E7D23] uppercase tracking-[0.25em] font-cinzel block">
                                {product.brand || 'ATELIER TISUTA'}
                            </span>
                            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#141210] mt-1 line-clamp-2">
                                {product.name}
                            </h3>
                        </div>

                        {/* Price & Rating */}
                        <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3">
                            <div className="flex items-baseline gap-3">
                                <span className="text-2xl sm:text-3xl font-extrabold text-[#141210] font-cinzel">
                                    ₹{product.price?.toLocaleString('en-IN')}
                                </span>
                                {product.mrp > product.price && (
                                    <span className="text-xs text-stone-400 line-through">
                                        ₹{product.mrp?.toLocaleString('en-IN')}
                                    </span>
                                )}
                                {product.discount > 0 && (
                                    <span className="text-[10px] font-bold text-[#9E7D23] bg-[#D4AF37]/20 px-2 py-0.5 rounded-full font-cinzel">
                                        {product.discount}% OFF
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-1 text-xs font-bold text-stone-700 bg-white px-2.5 py-1 rounded-full border border-[#D4AF37]/30 shadow-sm">
                                <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                                <span>{product.rating || '4.9'}</span>
                                <span className="text-[10px] text-stone-400">({product.reviewCount || 180})</span>
                            </div>
                        </div>

                        {/* Fabric & Fit Quick Spec Badge */}
                        <div className="p-3 bg-white rounded-2xl border border-[#D4AF37]/30 space-y-1.5 shadow-sm text-[11px]">
                            <div className="flex items-center justify-between">
                                <span className="text-stone-500 font-medium">Textile Weave:</span>
                                <strong className="text-[#141210] font-cinzel">{product.fabric || 'Luxury Double-Crepe Weave'}</strong>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-stone-500 font-medium">Fit Profile:</span>
                                <strong className="text-[#141210] font-cinzel">{product.fit || 'Regular Tailored Straight Cut'}</strong>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-stone-500 font-medium">Stretch & Drape:</span>
                                <span className="text-[#9E7D23] font-bold">{product.stretchFactor || 'Comfort Stretch'}</span>
                            </div>
                        </div>

                        {/* Dynamic Swatch Colors */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="space-y-2 pt-1">
                                <label className="text-xs font-semibold text-[#141210] block">
                                    Selected Shade: <strong className="text-[#9E7D23] font-cinzel">{selectedColor?.name}</strong>
                                </label>
                                <div className="flex gap-2">
                                    {product.colors.map(c => (
                                        <button
                                            key={c.name}
                                            onClick={() => handleColorClick(c)}
                                            style={{ backgroundColor: c.hex }}
                                            className={`w-7 h-7 rounded-full border border-black/20 cursor-pointer transition-all ${
                                                selectedColor?.name === c.name ? 'ring-2 ring-[#D4AF37] scale-110 shadow-md' : 'opacity-80 hover:opacity-100'
                                            }`}
                                            title={c.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sizes */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-[#141210]">Atelier Size</label>
                                    <span className="text-[10px] text-green-700 font-semibold flex items-center gap-1">
                                        <Check className="w-3 h-3" /> 93% True to Size
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    {product.sizes.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setSelectedSize(s)}
                                            className={`w-10 h-10 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                                selectedSize === s
                                                    ? 'bg-[#141210] text-[#F5D77F] border-[#D4AF37] shadow-md font-cinzel'
                                                    : 'bg-white text-[#141210] border-gray-200 hover:border-[#D4AF37]'
                                            }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-2">
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-4 bg-gradient-to-r from-[#141210] to-[#25201A] hover:from-[#D4AF37] hover:to-[#B88B22] text-[#F5D77F] hover:text-[#141210] font-cinzel font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl border border-[#D4AF37]/40"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>ADD TO BAG · ₹{product.price?.toLocaleString('en-IN')}</span>
                        </button>

                        <button
                            onClick={() => {
                                onClose();
                                openVirtualFit(product);
                            }}
                            className="w-full py-3 bg-white hover:bg-[#FAF8F5] text-[#141210] font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl border border-[#D4AF37]/50 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                        >
                            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                            <span>Full 3D Virtual Fit AI & Biometrics</span>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export const ProductQuickViewModal = () => {
    const { isQuickViewOpen, closeQuickView, quickViewProduct, quickViewInitialMode } = useShop();

    if (!isQuickViewOpen || !quickViewProduct) {
        return null;
    }

    return <QuickViewContent product={quickViewProduct} onClose={closeQuickView} initialMode={quickViewInitialMode || 'photos'} />;
};

export default ProductQuickViewModal;

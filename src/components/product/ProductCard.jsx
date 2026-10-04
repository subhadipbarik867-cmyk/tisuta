import React, { useState } from 'react';
import { Heart, Sparkles, Eye, ShoppingBag, Star, Play } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ProductCard = ({ product, onSelectProduct }) => {
    const { toggleWishlist, isWishlisted, openQuickView, openVirtualFit, addToCart } = useShop();

    const [activeColor, setActiveColor] = useState(product.colors[0]);
    const [activeImage, setActiveImage] = useState(product.colors[0]?.image || product.images[0]);
    const [isHovered, setIsHovered] = useState(false);

    const wishlisted = isWishlisted(product.id);

    const handleColorClick = (e, color) => {
        e.stopPropagation();
        setActiveColor(color);
        if (color.image) setActiveImage(color.image);
    };

    return (
        <div
            onClick={() => onSelectProduct(product)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-[#FAFAFA] text-[#0F0F0F] border border-[#0F0F0F]/10 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-[#0F0F0F]/30"
        >
            {/* Image / Video Media Stage */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F4F0]">

                {/* Show Video Loop on Hover if available, otherwise show image */}
                {isHovered && product.video ? (
                    <video
                        src={product.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover object-top scale-105 transition-transform duration-700"
                    />
                ) : (
                    <img
                        src={isHovered && product.images[1] ? product.images[1] : activeImage}
                        alt={product.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                )}

                {/* Subtle Editorial Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges top-left */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.isNewArrival && (
                        <span className="px-2.5 py-1 bg-[#0F0F0F] text-white font-extrabold text-[9px] uppercase tracking-[0.2em]">
                            NEW
                        </span>
                    )}
                    {product.video && (
                        <span className="px-2 py-0.5 bg-[#C5A059] text-[#0F0F0F] font-bold text-[8px] uppercase tracking-widest flex items-center gap-1 shadow-sm">
                            <Play className="w-2.5 h-2.5 fill-[#0F0F0F]" />
                            VIDEO
                        </span>
                    )}
                </div>

                {/* Wishlist Heart */}
                <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md text-[#0F0F0F] hover:text-red-500 transition-all z-10 rounded-full shadow-sm hover:scale-110 cursor-pointer"
                >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                {/* Hover Quick View & 3D Fit Triggers */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                        onClick={(e) => { e.stopPropagation(); openVirtualFit(product); }}
                        className="p-2.5 bg-[#0F0F0F] text-white hover:bg-[#C5A059] hover:text-[#0F0F0F] transition-all rounded-full shadow-md cursor-pointer"
                        title="3D Virtual Fit"
                    >
                        <Sparkles className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); openQuickView(product); }}
                        className="p-2.5 bg-white text-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-white transition-all rounded-full shadow-md cursor-pointer border border-[#0F0F0F]/10"
                        title="Quick View"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Product Details Section */}
            <div className="p-4 space-y-3 bg-[#FAFAFA]">

                {/* Brand & Stock indicator */}
                <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-[#C5A059] uppercase tracking-[0.25em]">{product.brand}</span>
                    {product.stockCount <= 8 && (
                        <span className="text-[9px] font-semibold text-amber-700">
                            {product.stockCount} left
                        </span>
                    )}
                </div>

                {/* Product Name */}
                <h4 className="font-serif-luxury text-sm font-bold text-[#0F0F0F] line-clamp-1 group-hover:text-[#C5A059] transition-colors">
                    {product.name}
                </h4>

                {/* Swatches */}
                <div className="flex items-center gap-2">
                    {product.colors.map(c => (
                        <button
                            key={c.name}
                            onClick={(e) => handleColorClick(e, c)}
                            style={{ backgroundColor: c.hex }}
                            className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer border ${activeColor.name === c.name ? 'ring-2 ring-offset-1 ring-[#0F0F0F] scale-110' : 'border-[#0F0F0F]/20 hover:scale-105'
                                }`}
                            title={c.name}
                        />
                    ))}
                    <span className="text-[10px] text-[#0F0F0F]/50 truncate flex-1 font-light ml-1">{activeColor.name}</span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 pt-1 border-t border-[#0F0F0F]/10">
                    <span className="text-sm font-bold text-[#0F0F0F]">
                        ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.mrp > product.price && (
                        <span className="text-xs text-[#0F0F0F]/40 line-through">
                            ₹{product.mrp.toLocaleString('en-IN')}
                        </span>
                    )}
                    {product.discount > 0 && (
                        <span className="text-[9px] font-bold text-emerald-700 ml-auto">
                            {product.discount}% OFF
                        </span>
                    )}
                </div>

                {/* Zara-Grade Minimalist ADD TO BAG Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 'M', activeColor, 1);
                    }}
                    className="w-full py-3 bg-[#0F0F0F] text-white hover:bg-[#C5A059] hover:text-[#0F0F0F] font-semibold text-[10px] uppercase tracking-[0.25em] transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#0F0F0F]"
                >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    ADD TO BAG
                </button>

            </div>
        </div>
    );
};

export default ProductCard;

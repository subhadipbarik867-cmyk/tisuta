import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Eye, ShoppingBag, Star, Crown } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { getImgUrl } from '../../utils/imageUtils';

export const ProductCard = ({ product, onSelectProduct }) => {
    const { toggleWishlist, isWishlisted, addToCart, openQuickView } = useShop();

    const [activeColor, setActiveColor] = useState(product.colors[0]);
    const [isHovered, setIsHovered] = useState(false);

    const wishlisted = isWishlisted(product.id);

    const handleColorClick = (e, color) => {
        e.stopPropagation();
        setActiveColor(color);
    };

    const currentImgUrl = activeColor.image
        ? getImgUrl(activeColor.image)
        : getImgUrl(product.images[0]);

    const hoverImgUrl = product.images[1] ? getImgUrl(product.images[1]) : currentImgUrl;

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={() => onSelectProduct(product)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group flex flex-col gap-3.5 bg-white p-3.5 rounded-3xl border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-400 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_-10px_rgba(212,175,55,0.25)] relative overflow-hidden"
        >
            {/* Image Stage - High-Fashion Editorial Dual Layer */}
            <div className="relative aspect-[3/4.2] w-full overflow-hidden rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/15">
                
                {/* Primary High-Resolution Image */}
                <img
                    src={currentImgUrl}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                        isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                    }`}
                />

                {/* Secondary Editorial Perspective (Smooth Crossfade on Hover) */}
                {product.images[1] && (
                    <img
                        src={hoverImgUrl}
                        alt={`${product.name} alternate view`}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                        }`}
                    />
                )}

                {/* Subtle Luxury Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 max-w-[80%]">
                    {product.discount > 0 && (
                        <span className="text-[9.5px] uppercase tracking-wider font-extrabold bg-[#D4AF37] text-[#141210] px-2.5 py-0.5 rounded-full shadow-md font-cinzel">
                            {product.discount}% OFF
                        </span>
                    )}
                    {product.isNewArrival && (
                        <span className="text-[9px] uppercase tracking-widest font-bold bg-[#141210] text-[#FFF2BF] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-md font-cinzel">
                            Royale
                        </span>
                    )}
                </div>

                {/* Bottom Left Feature Indicator: 3D Fit Avatar */}
                <div className="absolute bottom-3 left-3 z-10 transition-opacity duration-300 opacity-100 group-hover:opacity-0 flex items-center gap-1.5">
                    <span className="flex items-center gap-1 text-[8.5px] uppercase tracking-widest font-bold bg-[#141210]/85 text-[#F5D77F] px-2.5 py-0.5 rounded-full backdrop-blur-md border border-[#D4AF37]/40 shadow-md font-cinzel">
                        <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                        3D Fit Available
                    </span>
                </div>

                {/* Wishlist Heart - Top Right */}
                <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-md text-[#141210] hover:bg-[#D4AF37] hover:text-[#141210] transition-all duration-300 shadow-md border border-[#D4AF37]/30 cursor-pointer"
                    title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#D4AF37] text-[#D4AF37]' : 'stroke-[2px]'}`} />
                </button>

                {/* Slide-Up Quick Action Controls */}
                <div className="absolute bottom-0 inset-x-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 flex flex-col gap-1.5 bg-gradient-to-t from-black/90 via-black/55 to-transparent pt-6">
                    {/* 3D Fit Trigger Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            openQuickView(product, 'avatar3d');
                        }}
                        className="w-full py-1.5 px-2 bg-gradient-to-r from-[#141210]/95 to-[#25201A]/95 hover:from-[#D4AF37] hover:to-[#B88B22] text-[#F5D77F] hover:text-[#141210] font-bold text-[9.5px] uppercase tracking-wider rounded-xl backdrop-blur-md border border-[#D4AF37]/50 transition-all flex items-center justify-center gap-1.5 shadow-md font-cinzel cursor-pointer"
                        title="Interactive 3D Avatar Fit"
                    >
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                        <span>👗 3D Avatar Drape</span>
                    </button>

                    {/* Quick View & Add to Bag */}
                    <div className="flex gap-1.5">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                openQuickView(product, 'photos');
                            }}
                            className="flex-1 py-2 bg-white/95 text-[#141210] font-bold text-[9.5px] uppercase tracking-wider rounded-xl backdrop-blur-md border border-[#D4AF37]/40 hover:bg-[#FAF8F5] transition-colors flex items-center justify-center gap-1 shadow-md font-cinzel cursor-pointer"
                        >
                            <Eye className="w-3 h-3 text-[#D4AF37]" />
                            <span>Quick View</span>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product, 'M', activeColor, 1);
                            }}
                            className="flex-1 py-2 bg-[#D4AF37] hover:bg-[#B88B22] text-[#141210] font-bold text-[9.5px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1 shadow-md font-cinzel cursor-pointer"
                        >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Add</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Typography & Atelier Details */}
            <div className="flex flex-col gap-1 items-start px-1">
                <div className="flex items-center justify-between w-full">
                    <span className="text-[9.5px] font-bold text-[#9E7D23] uppercase tracking-[0.25em] font-cinzel">
                        {product.brand}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-stone-600 font-semibold">
                        <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                        <span>{product.rating || '4.9'}</span>
                    </div>
                </div>

                <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#141210] line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                    {product.name}
                </h4>

                {/* Fabric Weave Snippet */}
                {product.fabric && (
                    <span className="text-[10.5px] text-stone-500 font-medium line-clamp-1">
                        {product.fabric.split('(')[0].trim()}
                    </span>
                )}

                {/* Pricing & Offer */}
                <div className="flex items-center gap-2.5 mt-1">
                    <span className="text-sm uppercase tracking-wider font-extrabold text-[#141210] font-cinzel">
                        ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.mrp > product.price && (
                        <span className="text-[11px] line-through text-[#141210]/40 font-medium">
                            ₹{product.mrp.toLocaleString('en-IN')}
                        </span>
                    )}
                </div>

                {/* Minimalist Color Swatches */}
                {product.colors && product.colors.length > 1 && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                        {product.colors.map(c => (
                            <button
                                key={c.name}
                                onClick={(e) => handleColorClick(e, c)}
                                style={{ backgroundColor: c.hex }}
                                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                                    activeColor.name === c.name 
                                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37] scale-110 shadow-sm' 
                                        : 'border-black/20 opacity-70 hover:opacity-100'
                                }`}
                                title={c.name}
                            />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProductCard;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Play, Sparkles, Eye, ShoppingBag, Crown } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { getImgUrl } from '../../utils/imageUtils';

export const ProductCard = ({ product, onSelectProduct }) => {
    const { toggleWishlist, isWishlisted, addToCart, openQuickView } = useShop();

    const [activeColor, setActiveColor] = useState(product.colors[0]);
    const [isHovered, setIsHovered] = useState(false);

    const wishlisted = isWishlisted(product.id);
    const videoSrc = product.videoUrl || product.video;

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
            whileHover={{ y: -7 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={() => onSelectProduct(product)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group flex flex-col gap-3.5 bg-white p-3.5 rounded-3xl border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.28)]"
        >
            {/* Image / Video Media Stage - GPU Zoom Container */}
            <div className="relative aspect-[3/4.2] w-full overflow-hidden rounded-2xl bg-[#FAF8F5] img-zoom-container border border-[#D4AF37]/15">

                {/* Video Loop / Image Crossfade */}
                {isHovered && videoSrc ? (
                    <video
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-95 transition-opacity duration-700"
                    />
                ) : (
                    <img
                        src={isHovered ? hoverImgUrl : currentImgUrl}
                        alt={product.name}
                        className="w-full h-full object-cover img-luxury-zoom"
                    />
                )}

                {/* Top Left Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 max-w-[80%]">
                    {product.discount > 0 && (
                        <span className="text-[9.5px] uppercase tracking-wider font-extrabold bg-[#D4AF37] text-[#141210] px-2.5 py-0.5 rounded-full shadow-md font-cinzel">
                            {product.discount}% OFF
                        </span>
                    )}
                    {product.isNewArrival && (
                        <span className="text-[9px] uppercase tracking-widest font-bold bg-[#141210] text-[#FFF2BF] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-md">
                            Royale
                        </span>
                    )}
                </div>

                {/* Video indicator badge (Bottom Left) */}
                {videoSrc && (
                    <div className="absolute bottom-3 left-3 z-10 transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                        <span className="flex items-center gap-1 text-[8.5px] uppercase tracking-widest font-bold bg-[#141210]/85 text-[#F5D77F] px-2.5 py-0.5 rounded-full backdrop-blur-md border border-[#D4AF37]/35 shadow-md">
                            <Play className="w-2.5 h-2.5 fill-[#D4AF37]" />
                            4K Runway
                        </span>
                    </div>
                )}

                {/* Wishlist Heart - Top Right */}
                <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-md text-[#141210] hover:bg-[#D4AF37] hover:text-[#141210] transition-all duration-300 shadow-md border border-[#D4AF37]/30"
                >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#D4AF37] text-[#D4AF37]' : 'stroke-[2px]'}`} />
                </button>

                {/* Slide-Up Quick Action Controls */}
                <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out z-20 flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            openQuickView(product);
                        }}
                        className="flex-1 py-2.5 bg-white/95 text-[#141210] font-bold text-[10px] uppercase tracking-wider rounded-xl backdrop-blur-md border border-[#D4AF37]/50 hover:bg-[#FAF8F5] transition-colors flex items-center justify-center gap-1.5 shadow-lg font-cinzel"
                    >
                        <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Quick View</span>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, 'M', activeColor, 1);
                        }}
                        className="flex-1 py-2.5 bg-gradient-to-r from-[#141210] to-[#25201A] text-[#F5D77F] font-bold text-[10px] uppercase tracking-wider rounded-xl hover:from-[#D4AF37] hover:to-[#B88B22] hover:text-[#141210] transition-all flex items-center justify-center gap-1.5 shadow-lg font-cinzel border border-[#D4AF37]/40"
                    >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                    </button>
                </div>
            </div>

            {/* Typography Details */}
            <div className="flex flex-col gap-1 items-start px-1">
                <span className="text-[9.5px] font-bold text-[#9E7D23] uppercase tracking-[0.25em] font-cinzel">
                    {product.brand}
                </span>

                <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#141210] line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                    {product.name}
                </h4>

                <div className="flex items-center gap-2.5 mt-0.5">
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
                {product.colors.length > 1 && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                        {product.colors.map(c => (
                            <button
                                key={c.name}
                                onClick={(e) => handleColorClick(e, c)}
                                style={{ backgroundColor: c.hex }}
                                className={`w-3.5 h-3.5 rounded-full border transition-all ${activeColor.name === c.name ? 'border-[#D4AF37] ring-2 ring-[#D4AF37] scale-110' : 'border-black/20 opacity-70 hover:opacity-100'
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

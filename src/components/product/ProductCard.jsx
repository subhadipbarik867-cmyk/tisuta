import React, { useState } from 'react';
import { Heart, Play, Sparkles, Eye, ShoppingBag } from 'lucide-react';
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
        <div
            onClick={() => onSelectProduct(product)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group flex flex-col gap-4 bg-white p-3 rounded-2xl border border-[#D5B263]/20 hover:border-[#D5B263] transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl card-luxury-hover"
        >
            {/* Image / Video Media Stage - GPU Zoom Container */}
            <div className="relative aspect-[3/4.2] w-full overflow-hidden rounded-xl bg-[#F7F4EE] img-zoom-container">

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

                {/* Minimalist Top Left Badge */}
                <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 max-w-[75%]">
                    {product.isNewArrival && (
                        <span className="text-[9px] uppercase tracking-widest font-bold bg-[#121212] text-[#D5B263] px-2.5 py-0.5 rounded-full border border-[#D5B263]/40 shadow-md">
                            New Arrival
                        </span>
                    )}
                    {product.editTag && (
                        <span className="text-[9px] uppercase tracking-widest font-bold bg-[#D5B263] text-[#121212] px-2.5 py-0.5 rounded-full shadow-md">
                            {product.editTag}
                        </span>
                    )}
                    <span className="text-[8px] uppercase tracking-wider font-extrabold bg-black/60 text-white/90 px-2 py-0.5 rounded-full backdrop-blur-md border border-white/20">
                        {product.images?.length || 5} Angles 4K
                    </span>
                </div>

                {/* Video indicator badge (Bottom Left) */}
                {videoSrc && (
                    <div className="absolute bottom-3 left-3 z-10 transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                        <span className="flex items-center gap-1 text-[8px] uppercase tracking-widest font-bold bg-[#121212]/85 text-[#D5B263] px-2.5 py-0.5 rounded-full backdrop-blur-md border border-[#D5B263]/30 shadow-md">
                            <Play className="w-2.5 h-2.5 fill-[#D5B263]" />
                            4K Runway
                        </span>
                    </div>
                )}

                {/* Wishlist Heart - Top Right */}
                <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md text-[#121212] hover:bg-[#D5B263] hover:text-[#121212] transition-all duration-300 shadow-md"
                >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#121212] text-[#121212]' : 'stroke-[2px]'}`} />
                </button>

                {/* Slide-Up Quick Action Controls */}
                <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            openQuickView(product);
                        }}
                        className="flex-1 py-2.5 bg-[#FDFBF7]/90 text-[#121212] font-bold text-[10px] uppercase tracking-widest rounded-xl backdrop-blur-md border border-[#D5B263]/40 hover:bg-white transition-colors flex items-center justify-center gap-1.5 shadow-lg"
                    >
                        <Eye className="w-3.5 h-3.5 text-[#D5B263]" />
                        <span>Quick View</span>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, 'M', activeColor, 1);
                        }}
                        className="flex-1 py-2.5 bg-[#121212] text-[#D5B263] font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#D5B263] hover:text-[#121212] transition-colors flex items-center justify-center gap-1.5 shadow-lg"
                    >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                    </button>
                </div>
            </div>

            {/* Typography Details - Museum Plaque Style */}
            <div className="flex flex-col gap-1 items-start px-1">
                <span className="text-[9px] font-bold text-[#D5B263] uppercase tracking-[0.2em]">
                    {product.brand}
                </span>

                <h4 className="font-serif-luxury text-base font-bold text-[#121212] line-clamp-1 group-hover:text-[#D5B263] transition-colors">
                    {product.name}
                </h4>

                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#121212]">
                        ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.mrp > product.price && (
                        <span className="text-[10px] line-through text-[#121212]/40">
                            ₹{product.mrp.toLocaleString('en-IN')}
                        </span>
                    )}
                </div>

                {/* Minimalist Color Swatches */}
                {product.colors.length > 1 && (
                    <div className="flex items-center gap-1.5 mt-2">
                        {product.colors.map(c => (
                            <button
                                key={c.name}
                                onClick={(e) => handleColorClick(e, c)}
                                style={{ backgroundColor: c.hex }}
                                className={`w-4 h-4 rounded-full border transition-all ${activeColor.name === c.name ? 'border-[#D5B263] ring-2 ring-[#D5B263] scale-110' : 'border-black/20 opacity-70 hover:opacity-100'
                                    }`}
                                title={c.name}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;

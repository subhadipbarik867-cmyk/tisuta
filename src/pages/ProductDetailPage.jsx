import React, { useState } from 'react';
import { Heart, Sparkles, ShieldCheck, Truck, RotateCcw, Star, ChevronRight, Check, ShoppingBag, Eye, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetailPage = ({ product, onSelectProduct, onNavigatePage }) => {
    const {
        addToCart,
        toggleWishlist,
        isWishlisted,
        openVirtualFit,
        openSizeAdvisor,
        products
    } = useShop();

    const [activeImage, setActiveImage] = useState(product.images[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
    const [quantity, setQuantity] = useState(1);
    const [pincode, setPincode] = useState('');
    const [deliveryResult, setDeliveryResult] = useState(null);
    const [activeTab, setActiveTab] = useState('details');

    const wishlisted = isWishlisted(product.id);
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const handleCheckPincode = (e) => {
        e.preventDefault();
        if (pincode.length >= 6) {
            setDeliveryResult('✓ Express 24-48 Hr Luxury Courier Available for ' + pincode);
        } else {
            setDeliveryResult('Please enter a valid 6-digit PIN code.');
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#121212] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-[#121212]/50 mb-8">
                    <button onClick={() => onNavigatePage('home')} className="hover:text-[#D5B263]">Home</button>
                    <span>/</span>
                    <button onClick={() => onNavigatePage('catalog', { category: product.category })} className="hover:text-[#D5B263] capitalize">
                        {product.category}
                    </button>
                    <span>/</span>
                    <span className="text-[#121212] font-semibold line-clamp-1">{product.name}</span>
                </div>

                {/* Main PDP Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">

                    {/* Gallery Left (7 Cols) */}
                    <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
                        {/* Thumbnails */}
                        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[560px] scrollbar-none">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-[#F7F4EE] ${activeImage === img ? 'border-[#D5B263] ring-2 ring-[#D5B263]' : 'border-transparent opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Stage Image */}
                        <div className="flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-[#F7F4EE] border border-[#D5B263]/30 shadow-xl relative group">
                            <img src={activeImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                            <button
                                onClick={() => toggleWishlist(product.id)}
                                className="absolute top-4 right-4 p-3 bg-white/90 rounded-full backdrop-blur-md text-[#121212] shadow-lg hover:text-red-500 transition-colors"
                            >
                                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {/* Product Info Right (5 Cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#D5B263] block">
                                {product.brand}
                            </span>
                            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#121212] mt-1">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center text-[#D5B263]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-[#D5B263]" />
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-[#121212]">{product.rating}</span>
                                <span className="text-xs text-[#121212]/40">({product.reviewCount} Luxury Reviews)</span>
                            </div>
                        </div>

                        {/* Price Box */}
                        <div className="p-4 bg-white rounded-2xl border border-[#D5B263]/30 flex items-center justify-between shadow-sm">
                            <div className="space-x-3">
                                <span className="text-2xl font-bold text-[#121212]">
                                    ₹{product.price.toLocaleString('en-IN')}
                                </span>
                                {product.mrp > product.price && (
                                    <span className="text-sm text-[#121212]/40 line-through">
                                        ₹{product.mrp.toLocaleString('en-IN')}
                                    </span>
                                )}
                            </div>
                            {product.discount > 0 && (
                                <span className="px-3 py-1 bg-[#D5B263] text-[#121212] font-bold text-xs rounded-full">
                                    SAVE {product.discount}%
                                </span>
                            )}
                        </div>

                        {/* Glowing Virtual Try On Trigger Banner */}
                        <div
                            onClick={() => openVirtualFit(product)}
                            className="p-4 bg-gradient-to-r from-[#121212] to-[#222222] text-[#FDFBF7] rounded-2xl border border-[#D5B263] shadow-lg flex items-center justify-between cursor-pointer group hover:scale-[1.01] transition-transform"
                        >
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-[#D5B263] animate-pulse" />
                                <div>
                                    <div className="text-xs font-bold text-[#D5B263] uppercase tracking-wider">
                                        TISUTA Virtual Fit AI
                                    </div>
                                    <div className="text-sm font-semibold">Test Fit on Your Body Silhouette</div>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#D5B263] group-hover:translate-x-1 transition-transform" />
                        </div>

                        {/* Color Swatches */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-[#121212] block">
                                Selected Shade: <strong>{selectedColor.name}</strong>
                            </label>
                            <div className="flex gap-2">
                                {product.colors.map(c => (
                                    <button
                                        key={c.name}
                                        onClick={() => setSelectedColor(c)}
                                        style={{ backgroundColor: c.hex }}
                                        className={`w-7 h-7 rounded-full border border-black/20 ${selectedColor.name === c.name ? 'ring-2 ring-[#D5B263] scale-110' : ''
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Swatches + Find My Size */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-[#121212]">Select Size</label>
                                <button
                                    onClick={() => openSizeAdvisor(product)}
                                    className="text-xs font-bold text-[#D5B263] hover:underline"
                                >
                                    Find My Size Engine
                                </button>
                            </div>
                            <div className="flex gap-2">
                                {product.sizes.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`w-12 h-12 rounded-xl text-xs font-bold transition-all border ${selectedSize === s
                                                ? 'bg-[#121212] text-[#D5B263] border-[#D5B263]'
                                                : 'bg-white text-[#121212] border-[#121212]/20 hover:border-[#D5B263]'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart & Buy CTA */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
                                className="flex-1 py-4 bg-[#D5B263] text-[#121212] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                <span>ADD TO WARDROBE</span>
                            </button>
                        </div>

                        {/* PIN Code Delivery Checker */}
                        <div className="p-4 bg-white rounded-2xl border border-[#D5B263]/20 space-y-2">
                            <label className="text-xs font-semibold text-[#121212] flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-[#D5B263]" />
                                <span>Check Delivery & Pincode Availability</span>
                            </label>
                            <form onSubmit={handleCheckPincode} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit Pincode"
                                    value={pincode}
                                    onChange={e => setPincode(e.target.value)}
                                    className="flex-1 p-2.5 bg-[#F7F4EE] border border-[#D5B263]/30 rounded-xl text-xs"
                                />
                                <button type="submit" className="px-4 py-2.5 bg-[#121212] text-[#D5B263] font-bold text-xs rounded-xl">
                                    Check
                                </button>
                            </form>
                            {deliveryResult && <p className="text-[11px] font-semibold text-green-700">{deliveryResult}</p>}
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-light text-[#121212]/80">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-[#D5B263]" />
                                <span>100% Authentic Luxury Guarantee</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4 text-[#D5B263]" />
                                <span>Complimentary Express Shipping</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Related Couture Products */}
                {relatedProducts.length > 0 && (
                    <div className="pt-16 border-t border-[#D5B263]/30 space-y-8">
                        <h3 className="font-serif-luxury text-3xl text-[#121212]">
                            You May Also Admire
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProductDetailPage;

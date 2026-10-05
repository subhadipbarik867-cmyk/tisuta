import React, { useState, useRef, useEffect } from 'react';
import { 
    Heart, Sparkles, Check, ShoppingBag, MapPin, Play, Pause, 
    RotateCw, RotateCcw, Star, ShieldCheck, Truck, ArrowRight, ArrowLeft, 
    Share2, SlidersHorizontal, ChevronRight, ChevronLeft, CheckCircle2, 
    MessageCircle, Maximize2, ZoomIn, ZoomOut, Ruler, Info, Layers, 
    RefreshCw, X, Eye, Compass, Grid 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';
import { CustomerReviewsSection } from '../components/product/CustomerReviewsSection';
import { getImgUrl } from '../utils/imageUtils';
import { ThreeDBodyAvatar } from '../components/virtualFit/ThreeDBodyAvatar';

export const ProductDetailPage = ({ product, onSelectProduct, onNavigatePage, initialMode = 'single' }) => {
    const {
        addToCart,
        toggleWishlist,
        isWishlisted,
        openVirtualFit,
        openSizeAdvisor,
        addToCompare,
        products
    } = useShop();

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || { name: 'Standard', hex: '#121212' });
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
    const [quantity, setQuantity] = useState(1);
    const [pincode, setPincode] = useState('400050');
    const [deliveryStatus, setDeliveryStatus] = useState({
        checked: true,
        pincode: '400050',
        date: 'Delivered by Tomorrow, 5 PM',
        partner: 'Blue Dart Luxury White Glove Express'
    });

    // Gallery Modes: 'single' (Focus Loupe), 'avatar3d' (3D Avatar), 'turntable' (360 Orbit), 'quad' (4K Multi-Panel)
    const [galleryMode, setGalleryMode] = useState(initialMode || 'single');
    const [loupeFactor, setLoupeFactor] = useState(2.5); // 2.5x or 4.0x
    const [isHoveringImage, setIsHoveringImage] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    
    // Turntable 360 State
    const [isAutoSpinning, setIsAutoSpinning] = useState(false);
    const [orbitDegrees, setOrbitDegrees] = useState(0);

    // Fullscreen 4K Lightbox
    const [isFullscreenZoomOpen, setIsFullscreenZoomOpen] = useState(false);
    const [lightboxZoomLevel, setLightboxZoomLevel] = useState(1);

    // Specs Tab: 'craft', 'sizing', 'care', 'delivery'
    const [activeSpecTab, setActiveSpecTab] = useState('craft');
    const [showStickyBar, setShowStickyBar] = useState(false);
    const [copiedShare, setCopiedShare] = useState(false);

    const imageContainerRef = useRef(null);
    const autoSpinTimerRef = useRef(null);

    const wishlisted = isWishlisted(product.id);
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    // Scroll listener for sticky commerce bar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 620) {
                setShowStickyBar(true);
            } else {
                setShowStickyBar(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 360 Auto-Spin interval
    useEffect(() => {
        if (isAutoSpinning && galleryMode === 'turntable') {
            autoSpinTimerRef.current = setInterval(() => {
                setOrbitDegrees(prev => {
                    const next = (prev + 72) % 360;
                    const nextIndex = Math.floor(next / 72) % (product.images?.length || 1);
                    setActiveImageIndex(nextIndex);
                    return next;
                });
            }, 1200);
        } else {
            if (autoSpinTimerRef.current) clearInterval(autoSpinTimerRef.current);
        }
        return () => {
            if (autoSpinTimerRef.current) clearInterval(autoSpinTimerRef.current);
        };
    }, [isAutoSpinning, galleryMode, product.images]);

    // Complete the Look Bundle Items
    const completeLookProducts = (product.completeLookItems || ['dr-slip-style', 'tp-off-shoulder'])
        .map(id => products.find(p => p.id === id))
        .filter(Boolean);

    const bundleTotal = product.price + completeLookProducts.reduce((acc, p) => acc + p.price, 0);
    const bundleDiscount = Math.round(bundleTotal * 0.15);
    const bundleFinalPrice = bundleTotal - bundleDiscount;

    const handleCheckPincode = (e) => {
        e.preventDefault();
        if (pincode.length >= 6) {
            setDeliveryStatus({
                checked: true,
                pincode,
                date: 'Delivered in 24-48 Hours',
                partner: 'Blue Dart Luxury White-Glove Courier'
            });
        }
    };

    const handleShare = () => {
        navigator.clipboard?.writeText(window.location.href);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
    };

    const handleShopCompleteLook = () => {
        addToCart(product, selectedSize, selectedColor, 1);
        completeLookProducts.forEach(item => {
            addToCart(item, item.sizes?.[0] || 'Free Size', item.colors?.[0] || null, 1);
        });
        alert(`Entire look added to Bag with 15% complete look bonus savings of ₹${bundleDiscount.toLocaleString('en-IN')}!`);
    };

    const handleBuyNow = () => {
        addToCart(product, selectedSize, selectedColor, quantity);
        onNavigatePage('checkout');
    };

    const handleMouseMove = (e) => {
        if (!imageContainerRef.current) return;
        const rect = imageContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    };

    const handleTurntableScrub = (deg) => {
        setOrbitDegrees(deg);
        const imagesCount = product.images?.length || 1;
        const step = 360 / imagesCount;
        const index = Math.min(imagesCount - 1, Math.floor(((deg % 360) + 360) % 360 / step));
        setActiveImageIndex(index);
    };

    const currentActiveImage = product.images?.[activeImageIndex] || product.images?.[0] || { url: '', label: 'Default' };
    const currentImgUrl = getImgUrl(currentActiveImage);

    const handleNextImage = () => {
        if (!product.images?.length) return;
        setActiveImageIndex((activeImageIndex + 1) % product.images.length);
    };

    const handlePrevImage = () => {
        if (!product.images?.length) return;
        setActiveImageIndex((activeImageIndex - 1 + product.images.length) % product.images.length);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#121212] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs text-[#121212]/50 font-medium">
                    <button onClick={() => onNavigatePage('home')} className="hover:text-[#D5B263] transition-colors">Home</button>
                    <span>/</span>
                    <button onClick={() => onNavigatePage('catalog', { category: product.category })} className="hover:text-[#D5B263] capitalize transition-colors">
                        {product.category}
                    </button>
                    <span>/</span>
                    <span className="text-[#121212] font-bold truncate max-w-xs">{product.name}</span>
                </div>

                {/* Main Product Hero Stage: 4K Gallery + Commercial Suite */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
                    
                    {/* LEFT: Multi-Angle High-Def Media Gallery (7 Cols) */}
                    <div className="lg:col-span-7 space-y-4">
                        
                        {/* High-Resolution Gallery Mode Bar */}
                        <div className="flex flex-wrap items-center justify-between border-b border-[#D5B263]/25 pb-3 gap-2">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-bold uppercase tracking-wider">
                                <button
                                    onClick={() => setGalleryMode('single')}
                                    className={`py-1.5 px-3 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                                        galleryMode === 'single'
                                            ? 'bg-[#121212] text-[#F5D77F] shadow-sm font-cinzel'
                                            : 'text-[#121212]/60 hover:text-[#121212] hover:bg-stone-100'
                                    }`}
                                >
                                    <Eye className="w-3.5 h-3.5 text-[#D5B263]" />
                                    <span>Studio Loupe</span>
                                </button>

                                <button
                                    onClick={() => setGalleryMode('avatar3d')}
                                    className={`py-1.5 px-3 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                                        galleryMode === 'avatar3d'
                                            ? 'bg-gradient-to-r from-[#D4AF37] to-[#B88B22] text-[#121212] shadow-md font-extrabold font-cinzel'
                                            : 'bg-[#121212]/5 text-[#9E7D23] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 font-cinzel'
                                    }`}
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                                    <span>👗 3D Avatar Fit</span>
                                </button>

                                <button
                                    onClick={() => setGalleryMode('turntable')}
                                    className={`py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                                        galleryMode === 'turntable'
                                            ? 'bg-[#121212] text-[#F5D77F] shadow-sm font-cinzel'
                                            : 'text-[#121212]/60 hover:text-[#121212] hover:bg-stone-100'
                                    }`}
                                >
                                    <Compass className="w-3.5 h-3.5 text-[#D5B263]" />
                                    <span>360° Orbit</span>
                                </button>

                                <button
                                    onClick={() => setGalleryMode('quad')}
                                    className={`py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                                        galleryMode === 'quad'
                                            ? 'bg-[#121212] text-[#F5D77F] shadow-sm font-cinzel'
                                            : 'text-[#121212]/60 hover:text-[#121212] hover:bg-stone-100'
                                    }`}
                                >
                                    <Grid className="w-3.5 h-3.5 text-[#D5B263]" />
                                    <span>Multi-Panels ({product.images?.length || 5})</span>
                                </button>
                            </div>

                            <button
                                onClick={() => setIsFullscreenZoomOpen(true)}
                                className="inline-flex items-center gap-1 text-[10px] text-[#D5B263] hover:text-[#121212] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#D5B263]/40 bg-white hover:bg-[#FDFBF7] transition-all shadow-sm"
                            >
                                <Maximize2 className="w-3 h-3" />
                                <span>4K Fullscreen Lightbox</span>
                            </button>
                        </div>

                        {/* MODE 1: SINGLE FOCUS STAGE WITH 4K LOUPE MAGNIFIER */}
                        {galleryMode === 'single' && (
                            <div className="flex flex-col-reverse md:flex-row gap-4">
                                {/* Thumbnails Angle Bar */}
                                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[640px] scrollbar-none pb-2">
                                    {product.images?.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`group relative w-16 md:w-20 aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                                                activeImageIndex === idx
                                                    ? 'border-[#121212] ring-2 ring-[#D5B263]/50 scale-95 shadow-md'
                                                    : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <img
                                                src={getImgUrl(img)}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                            <span className="absolute bottom-0 inset-x-0 bg-black/75 text-white text-[8px] font-bold py-0.5 text-center truncate px-1">
                                                {img.label || `Angle ${idx + 1}`}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* Main Stage View with Magnifier Lens */}
                                <div 
                                    ref={imageContainerRef}
                                    onMouseEnter={() => setIsHoveringImage(true)}
                                    onMouseLeave={() => setIsHoveringImage(false)}
                                    onMouseMove={handleMouseMove}
                                    className="flex-1 aspect-[3/4.2] bg-white rounded-3xl border border-[#D5B263]/30 overflow-hidden relative group shadow-lg cursor-crosshair"
                                >
                                    <img
                                        src={currentImgUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 ease-out"
                                    />

                                    {/* Magnified High-Resolution Panel Overlay */}
                                    {isHoveringImage && (
                                        <div 
                                            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-200"
                                            style={{
                                                backgroundImage: `url(${currentImgUrl})`,
                                                backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                                                backgroundSize: `${loupeFactor * 100}%`,
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                        >
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-[#121212]/90 text-[#D5B263] text-[9px] font-bold uppercase rounded-full tracking-widest backdrop-blur-md border border-[#D5B263]/30 shadow-lg">
                                                {loupeFactor}x UHD Fabric Magnifier Active
                                            </div>
                                            
                                            {/* Precision Coordinates HUD */}
                                            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/80 text-white text-[9px] font-mono rounded-lg backdrop-blur-md border border-white/20">
                                                X: {Math.round(mousePos.x)}% · Y: {Math.round(mousePos.y)}% · 2400×3200 UHD
                                            </div>
                                        </div>
                                    )}

                                    {/* Prev / Next Nav Arrows */}
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 hover:bg-[#121212] text-[#121212] hover:text-[#D5B263] backdrop-blur-md transition-all shadow-md opacity-0 group-hover:opacity-100"
                                        title="Previous Angle"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 hover:bg-[#121212] text-[#121212] hover:text-[#D5B263] backdrop-blur-md transition-all shadow-md opacity-0 group-hover:opacity-100"
                                        title="Next Angle"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>

                                    {/* Top Left Controls: Fullscreen & Magnification Multipliers */}
                                    <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5">
                                        <button
                                            onClick={() => setIsFullscreenZoomOpen(true)}
                                            className="p-2.5 rounded-full bg-white/85 hover:bg-[#121212] hover:text-[#D5B263] text-[#121212] backdrop-blur-md transition-all shadow-md"
                                            title="Inspect 4K Fullscreen"
                                        >
                                            <ZoomIn className="w-4 h-4" />
                                        </button>

                                        <div className="bg-white/85 backdrop-blur-md rounded-full p-0.5 border border-[#D5B263]/30 flex items-center text-[9px] font-bold">
                                            <button
                                                onClick={() => setLoupeFactor(2.5)}
                                                className={`px-2 py-0.5 rounded-full transition-all ${loupeFactor === 2.5 ? 'bg-[#121212] text-[#D5B263]' : 'text-stone-600'}`}
                                            >
                                                2.5x
                                            </button>
                                            <button
                                                onClick={() => setLoupeFactor(4.0)}
                                                className={`px-2 py-0.5 rounded-full transition-all ${loupeFactor === 4.0 ? 'bg-[#121212] text-[#D5B263]' : 'text-stone-600'}`}
                                            >
                                                4.0x Macro
                                            </button>
                                        </div>
                                    </div>

                                    {/* Floating Try On Action */}
                                    <div className="absolute bottom-5 inset-x-5 z-20">
                                        <button
                                            onClick={() => openVirtualFit(product)}
                                            className="w-full py-3.5 bg-[#121212]/90 hover:bg-[#D5B263] text-[#D5B263] hover:text-[#121212] font-bold text-xs uppercase tracking-widest rounded-2xl backdrop-blur-md border border-[#D5B263]/40 transition-all flex items-center justify-center gap-2 shadow-2xl cursor-pointer"
                                        >
                                            <Sparkles className="w-4 h-4 animate-pulse" />
                                            <span>Launch 3D Virtual Fitting Studio</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* MODE 2: 4K QUAD / MULTI-PANEL SHOWCASE (Editorial Layout) */}
                        {galleryMode === 'quad' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.images?.map((img, idx) => (
                                        <div 
                                            key={idx}
                                            onClick={() => {
                                                setActiveImageIndex(idx);
                                                setIsFullscreenZoomOpen(true);
                                            }}
                                            className="group relative aspect-[3/4] bg-white rounded-2xl border border-[#D5B263]/30 overflow-hidden shadow-md cursor-pointer transition-all hover:shadow-2xl hover:border-[#D5B263]"
                                        >
                                            <img
                                                src={getImgUrl(img)}
                                                alt={img.angle || product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {/* Floating Angle Badge */}
                                            <div className="absolute top-3 left-3 bg-[#121212]/85 text-[#D5B263] text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md border border-[#D5B263]/30">
                                                {img.label || `Angle 0${idx + 1}`}
                                            </div>

                                            {/* Bottom Details Overlay on Hover */}
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-end justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-xs font-serif-luxury font-bold">
                                                    {img.angle || 'Atelier Perspective'}
                                                </span>
                                                <span className="text-[10px] text-[#D5B263] font-bold flex items-center gap-1">
                                                    <Maximize2 className="w-3 h-3" />
                                                    <span>Inspect 4K</span>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[11px] text-center text-stone-500 font-medium">
                                    Click any high-resolution panel to open full-scale 2400×3200px atelier inspection.
                                </p>
                            </div>
                        )}

                        {/* MODE 3: 360° STUDIO ORBIT TURNTABLE */}
                        {galleryMode === 'turntable' && (
                            <div className="bg-[#F7F4EE] rounded-3xl border border-[#D5B263]/30 p-8 flex flex-col items-center justify-center space-y-6 shadow-md relative overflow-hidden">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <Compass className="w-5 h-5 text-[#D5B263] animate-spin" />
                                        <span className="font-serif-luxury text-base font-bold text-[#121212]">
                                            360° Perspective Turntable Simulator
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                                            isAutoSpinning
                                                ? 'bg-[#D5B263] text-[#121212]'
                                                : 'bg-[#121212] text-[#D5B263]'
                                        }`}
                                    >
                                        {isAutoSpinning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                                        <span>{isAutoSpinning ? 'Pause Rotation' : 'Auto Rotate 360°'}</span>
                                    </button>
                                </div>

                                {/* Turntable Garment Showcase */}
                                <div className="relative w-72 sm:w-80 aspect-[3/4.2] rounded-2xl overflow-hidden shadow-2xl border border-[#D5B263]/40 bg-white">
                                    <img
                                        src={currentImgUrl}
                                        alt=""
                                        className="w-full h-full object-cover transition-opacity duration-300"
                                    />
                                    {/* Compass Azimuth Badge */}
                                    <div className="absolute top-3 right-3 px-3 py-1 bg-black/80 text-[#D5B263] font-mono text-[10px] font-bold rounded-full backdrop-blur-md border border-[#D5B263]/30">
                                        AZIMUTH {orbitDegrees}° · {currentActiveImage.label || 'Perspective'}
                                    </div>
                                </div>

                                {/* Interactive Range Scrubber */}
                                <div className="w-full max-w-md space-y-2 text-center">
                                    <div className="flex justify-between text-[10px] font-bold text-stone-500 uppercase tracking-widest px-1">
                                        <span>0° Front</span>
                                        <span>90° Profile</span>
                                        <span>180° Back</span>
                                        <span>270° Stride</span>
                                        <span>360° Full</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        step="1"
                                        value={orbitDegrees}
                                        onChange={e => handleTurntableScrub(Number(e.target.value))}
                                        className="w-full accent-[#121212] cursor-pointer h-2 bg-stone-300 rounded-lg"
                                    />
                                    <span className="text-[11px] text-stone-600 block">
                                        Drag slider horizontally to rotate viewing camera around garment.
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* MODE: 3D AVATAR & LIVE DRAPE */}
                        {galleryMode === 'avatar3d' && (
                            <div className="bg-[#0C0B0A] rounded-3xl border-2 border-[#D4AF37]/50 p-4 sm:p-6 shadow-2xl space-y-4">
                                <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                                        <span className="font-cinzel text-sm sm:text-base font-bold text-[#F5D77F]">
                                            3D Interactive Avatar & Garment Drape
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setGalleryMode('single')}
                                        className="px-3.5 py-1.5 rounded-full bg-[#141210] hover:bg-[#D4AF37] text-[#F5D77F] hover:text-black border border-[#D4AF37]/40 text-[10px] font-cinzel font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                                    >
                                        <Eye className="w-3 h-3" />
                                        <span>Back to Loupe</span>
                                    </button>
                                </div>
                                <ThreeDBodyAvatar
                                    garmentColor={selectedColor}
                                    garmentImage={currentImgUrl}
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

                        {/* Angle Caption Bar */}
                        {currentActiveImage && galleryMode !== 'quad' && (
                            <div className="flex items-center justify-between text-xs text-[#121212]/70 bg-white p-3.5 rounded-2xl border border-[#D5B263]/25 shadow-sm">
                                <span className="font-semibold flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#D5B263]" />
                                    <span>Angle View: <strong className="text-[#121212]">{currentActiveImage.angle || 'Full Studio Portrait'}</strong></span>
                                </span>
                                <span className="text-[10px] text-[#D5B263] font-bold uppercase tracking-wider">
                                    Hover image for {loupeFactor}x UHD micro-texture zoom
                                </span>
                            </div>
                        )}

                    </div>

                    {/* RIGHT: Typography, Specifications, Size & Commercial CTAs (5 Cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {/* Brand & Title */}
                        <div className="space-y-2 border-b border-[#D5B263]/25 pb-5">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D5B263]">
                                    {product.brand}
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => addToCompare(product)}
                                        className="text-[10px] font-bold text-[#121212]/70 hover:text-[#121212] flex items-center gap-1 border border-[#D5B263]/30 px-3 py-1 rounded-full bg-white hover:border-[#D5B263] transition-colors"
                                    >
                                        <SlidersHorizontal className="w-3 h-3 text-[#D5B263]" />
                                        <span>Compare</span>
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="text-[10px] font-bold text-[#121212]/70 hover:text-[#121212] flex items-center gap-1 border border-[#D5B263]/30 px-3 py-1 rounded-full bg-white hover:border-[#D5B263] transition-colors"
                                    >
                                        <Share2 className="w-3 h-3 text-[#D5B263]" />
                                        <span>{copiedShare ? 'Copied Link' : 'Share'}</span>
                                    </button>
                                </div>
                            </div>

                            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#121212] leading-tight">
                                {product.name}
                            </h1>

                            <p className="text-xs text-[#121212]/70 leading-relaxed font-light pt-1">
                                {product.description}
                            </p>

                            {/* Ratings & Style Tag */}
                            <div className="flex items-center gap-3 pt-2">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#121212] text-[#D5B263] text-xs font-bold rounded-full">
                                    <Star className="w-3 h-3 fill-[#D5B263]" />
                                    <span>{product.rating}</span>
                                </span>
                                <span className="text-xs text-[#121212]/60 font-medium">
                                    ({product.reviewCount} Verified Client Reviews)
                                </span>
                                {product.styleTag && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-[#F7F4EE] border border-[#D5B263]/40 rounded-full text-[#121212]">
                                        {product.styleTag}
                                    </span>
                                )}
                            </div>

                            {/* Pricing Breakdown */}
                            <div className="flex items-baseline gap-3 pt-2">
                                <span className="font-serif-luxury text-3xl font-bold text-[#121212]">
                                    ₹{product.price.toLocaleString('en-IN')}
                                </span>
                                {product.mrp > product.price && (
                                    <>
                                        <span className="text-sm line-through text-[#121212]/40">
                                            ₹{product.mrp.toLocaleString('en-IN')}
                                        </span>
                                        <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                                            {product.discount}% OFF
                                        </span>
                                    </>
                                )}
                            </div>
                            <span className="text-[10px] text-[#121212]/50 block">
                                Inclusive of all GST taxes & White-Glove Atelier Inspection
                            </span>

                            {/* Visual Atelier Feature Direct Cards */}
                            <div className="grid grid-cols-2 gap-2.5 pt-3">
                                <button
                                    onClick={() => {
                                        setGalleryMode('single');
                                        window.scrollTo({ top: 120, behavior: 'smooth' });
                                    }}
                                    className="p-3 rounded-2xl bg-gradient-to-br from-[#141210] to-[#25201A] text-left border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all hover:scale-[1.02] shadow-md group cursor-pointer"
                                >
                                    <div className="flex items-center justify-between text-[#F5D77F] mb-1">
                                        <span className="font-cinzel text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                            <Eye className="w-3 h-3 text-[#D4AF37]" />
                                            <span>Macro Loupe</span>
                                        </span>
                                        <span className="text-[8px] bg-[#D4AF37] text-black font-bold px-1.5 py-0.5 rounded-full font-mono">
                                            {loupeFactor}x UHD
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-white/80 font-medium">
                                        Inspect Weave & Precision Seams
                                    </p>
                                </button>

                                <button
                                    onClick={() => {
                                        setGalleryMode('avatar3d');
                                        window.scrollTo({ top: 120, behavior: 'smooth' });
                                    }}
                                    className="p-3 rounded-2xl bg-white text-left border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all hover:scale-[1.02] shadow-md group cursor-pointer"
                                >
                                    <div className="flex items-center justify-between text-[#141210] mb-1">
                                        <span className="font-cinzel text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                                            <span>3D Avatar Fit</span>
                                        </span>
                                        <span className="text-[8px] bg-[#D4AF37]/20 text-[#9E7D23] font-bold px-1.5 py-0.5 rounded-full font-mono">
                                            360°
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-stone-600 font-medium">
                                        Interactive Silhouette & Stress Heatmap
                                    </p>
                                </button>
                            </div>
                        </div>

                        {/* Color Selector */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="space-y-2.5">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#121212] block">
                                    Shade Palette — <strong className="text-[#D5B263]">{selectedColor.name}</strong>
                                </span>
                                <div className="flex gap-2.5">
                                    {product.colors.map(col => (
                                        <button
                                            key={col.name}
                                            onClick={() => setSelectedColor(col)}
                                            style={{ backgroundColor: col.hex }}
                                            className={`w-8 h-8 rounded-full border transition-all ${
                                                selectedColor.name === col.name
                                                    ? 'ring-2 ring-offset-2 ring-[#D5B263] scale-110 shadow-md'
                                                    : 'border-stone-300 opacity-75 hover:opacity-100'
                                            }`}
                                            title={col.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selector with AI Advisor Trigger */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#121212]">
                                        Select Size
                                    </span>
                                    <button
                                        onClick={() => openSizeAdvisor(product)}
                                        className="text-xs font-bold text-[#D5B263] hover:underline flex items-center gap-1 cursor-pointer"
                                    >
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>Find My Perfect Size (AI)</span>
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map(sz => (
                                        <button
                                            key={sz}
                                            onClick={() => setSelectedSize(sz)}
                                            className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all border ${
                                                selectedSize === sz
                                                    ? 'bg-[#121212] text-[#D5B263] border-[#121212] shadow-sm'
                                                    : 'bg-white text-[#121212]/80 border-stone-200 hover:border-[#D5B263]'
                                            }`}
                                        >
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                                <span className="text-[10px] text-green-700 font-semibold block">
                                    ✓ Fit prediction: True to Size for standard Indian measurements
                                </span>
                            </div>
                        )}

                        {/* Primary CTAs */}
                        <div className="space-y-3 pt-2">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
                                    className="flex-1 py-4 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] font-bold text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer shimmer-sweep"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    <span>Add to Bag</span>
                                </button>

                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className={`p-4 rounded-2xl border transition-all ${
                                        wishlisted
                                            ? 'bg-red-50 text-red-600 border-red-200'
                                            : 'bg-white text-[#121212] border-stone-200 hover:border-[#D5B263]'
                                    }`}
                                    title="Save to Wishlist"
                                >
                                    <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-600' : ''}`} />
                                </button>
                            </div>

                            <button
                                onClick={handleBuyNow}
                                className="w-full py-3.5 bg-gradient-to-r from-[#D5B263] to-[#B89647] text-[#121212] font-bold text-xs uppercase tracking-[0.2em] rounded-2xl hover:brightness-105 transition-all shadow-md cursor-pointer"
                            >
                                Instant Buy Now
                            </button>
                        </div>

                        {/* Pincode Serviceability */}
                        <div className="p-4 bg-white rounded-2xl border border-[#D5B263]/30 space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold text-[#121212]">
                                <span className="flex items-center gap-1.5">
                                    <Truck className="w-4 h-4 text-[#D5B263]" />
                                    <span>Delivery & Pincode Serviceability</span>
                                </span>
                            </div>
                            <form onSubmit={handleCheckPincode} className="flex gap-2">
                                <input
                                    type="text"
                                    value={pincode}
                                    onChange={e => setPincode(e.target.value)}
                                    placeholder="Enter 6-digit Pincode..."
                                    className="flex-1 px-3 py-2 bg-[#F7F4EE] border border-stone-200 rounded-xl text-xs font-semibold"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#121212] text-[#D5B263] rounded-xl text-xs font-bold"
                                >
                                    Check
                                </button>
                            </form>
                            {deliveryStatus.checked && (
                                <p className="text-[11px] text-green-700 font-semibold pt-1">
                                    ✓ Serviceable: {deliveryStatus.date} via {deliveryStatus.partner}.
                                </p>
                            )}
                        </div>

                    </div>
                </div>

                {/* DEEP ATELIER SPECIFICATIONS & MEASUREMENTS MODULE */}
                <div className="bg-white rounded-3xl border border-[#D5B263]/30 p-6 sm:p-8 space-y-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D5B263]/20 pb-4 gap-4">
                        <div>
                            <span className="text-[10px] font-bold text-[#D5B263] uppercase tracking-widest block">
                                Transparent Atelier Craftsmanship
                            </span>
                            <h3 className="font-serif-luxury text-2xl font-bold text-[#121212]">
                                Garment Specifications & Measurement Guide
                            </h3>
                        </div>

                        {/* Specification Sub-Tabs */}
                        <div className="flex bg-[#F7F4EE] p-1 rounded-2xl text-xs font-bold border border-[#D5B263]/30 overflow-x-auto">
                            {[
                                { id: 'craft', label: 'Fabric & Specifications' },
                                { id: 'sizing', label: 'Interactive Measurements' },
                                { id: 'care', label: 'Care & Preservation' },
                                { id: 'delivery', label: 'Authenticity & Returns' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveSpecTab(tab.id)}
                                    className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                                        activeSpecTab === tab.id
                                            ? 'bg-[#121212] text-[#D5B263] shadow-sm'
                                            : 'text-[#121212]/60 hover:text-[#121212]'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TAB 1: FABRIC & SPECIFICATIONS */}
                    {activeSpecTab === 'craft' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                            <div className="space-y-4">
                                <h4 className="font-serif-luxury text-base font-bold text-[#121212]">Material Composition & Weave</h4>
                                <div className="space-y-2.5">
                                    <div className="flex justify-between border-b border-stone-100 pb-1.5">
                                        <span className="text-stone-500">Fiber Composition</span>
                                        <strong className="text-[#121212]">{product.fabric}</strong>
                                    </div>
                                    <div className="flex justify-between border-b border-stone-100 pb-1.5">
                                        <span className="text-stone-500">Weave Structure</span>
                                        <strong className="text-[#121212]">{product.weaveType || 'Fine Atelier Weave'}</strong>
                                    </div>
                                    <div className="flex justify-between border-b border-stone-100 pb-1.5">
                                        <span className="text-stone-500">Garment Weight</span>
                                        <strong className="text-[#121212]">{product.weight || '320 grams (Featherlight Drape)'}</strong>
                                    </div>
                                    <div className="flex justify-between border-b border-stone-100 pb-1.5">
                                        <span className="text-stone-500">Thread Count / Density</span>
                                        <strong className="text-[#121212]">{product.threadCount || '380 Threads Per Inch'}</strong>
                                    </div>
                                    <div className="flex justify-between border-b border-stone-100 pb-1.5">
                                        <span className="text-stone-500">Lining Details</span>
                                        <strong className="text-[#121212]">{product.liningDetails || 'Fully lined with breathable natural fiber'}</strong>
                                    </div>
                                    <div className="flex justify-between border-b border-stone-100 pb-1.5">
                                        <span className="text-stone-500">Stretch Mechanical Rating</span>
                                        <strong className="text-[#121212]">{product.stretchFactor || 'Structured Zero-Stretch'}</strong>
                                    </div>
                                    <div className="flex justify-between border-b border-stone-100 pb-1.5">
                                        <span className="text-stone-500">Fabric Opacity</span>
                                        <strong className="text-[#121212]">{product.transparency || '100% Solid Opacity'}</strong>
                                    </div>
                                    <div className="flex justify-between border-b border-stone-100 pb-1.5">
                                        <span className="text-stone-500">Pocket Depth</span>
                                        <strong className="text-[#121212]">{product.pocketDepth || 'Concealed In-Seam'}</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 bg-[#F7F4EE] p-5 rounded-2xl border border-[#D5B263]/20 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <h4 className="font-serif-luxury text-base font-bold text-[#121212] flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-[#D5B263]" />
                                        <span>Atelier Heritage Story</span>
                                    </h4>
                                    <p className="text-xs text-[#121212]/80 leading-relaxed font-light">
                                        {product.originStory || 'Meticulously crafted by senior master tailors combining traditional Indian artisan heritage with contemporary Parisian bias-cut geometry.'}
                                    </p>
                                </div>
                                <div className="pt-2 flex items-center gap-2 text-[11px] text-green-700 font-bold">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>100% Ethical Sourcing & OEKO-TEX Fair Trade Certified</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: INTERACTIVE MEASUREMENTS */}
                    {activeSpecTab === 'sizing' && (
                        <div className="space-y-6 text-xs">
                            {product.modelStats && (
                                <div className="p-4 bg-[#F7F4EE] rounded-2xl border border-[#D5B263]/30 flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <span className="text-[10px] font-bold text-[#D5B263] uppercase tracking-wider block">Model In Photos</span>
                                        <p className="font-serif-luxury text-sm font-bold text-[#121212]">
                                            Height {product.modelStats.height} · Bust {product.modelStats.bust} · Waist {product.modelStats.waist} · Hips {product.modelStats.hips}
                                        </p>
                                    </div>
                                    <span className="px-3 py-1 bg-[#121212] text-[#D5B263] font-bold rounded-xl text-xs">
                                        Wearing Size {product.modelStats.sizeWorn}
                                    </span>
                                </div>
                            )}

                            {/* Size selector buttons to highlight table row */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-stone-600">Select Size to Highlight:</span>
                                <div className="flex gap-1.5">
                                    {product.sizes?.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setSelectedSize(s)}
                                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                                selectedSize === s
                                                    ? 'bg-[#121212] text-[#D5B263]'
                                                    : 'bg-[#F7F4EE] text-stone-700 hover:bg-stone-200'
                                            }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {product.measurementTable && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs border border-stone-200 rounded-xl overflow-hidden">
                                        <thead className="bg-[#121212] text-[#D5B263] uppercase font-bold">
                                            <tr>
                                                <th className="p-3">Size</th>
                                                <th className="p-3">Bust</th>
                                                <th className="p-3">Waist</th>
                                                <th className="p-3">Hips</th>
                                                <th className="p-3">Garment Length</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-stone-100">
                                            {product.measurementTable.map(row => (
                                                <tr 
                                                    key={row.size} 
                                                    className={`transition-colors ${
                                                        selectedSize === row.size
                                                            ? 'bg-[#D5B263]/15 font-bold border-l-4 border-[#D5B263]'
                                                            : 'hover:bg-[#F7F4EE]'
                                                    }`}
                                                >
                                                    <td className="p-3 font-bold text-[#121212]">
                                                        {row.size} {selectedSize === row.size && '(Selected)'}
                                                    </td>
                                                    <td className="p-3 text-stone-700">{row.bust}</td>
                                                    <td className="p-3 text-stone-700">{row.waist}</td>
                                                    <td className="p-3 text-stone-700">{row.hip || row.pantWaist || 'Regular'}</td>
                                                    <td className="p-3 text-stone-700">{row.length || row.kurtaLength}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB 3: CARE & PRESERVATION */}
                    {activeSpecTab === 'care' && (
                        <div className="space-y-4 text-xs max-w-2xl">
                            <h4 className="font-serif-luxury text-base font-bold text-[#121212]">
                                Recommended Garment Care & Longevity Protocol
                            </h4>
                            <p className="text-[#121212]/80 leading-relaxed font-light">
                                {product.careInstructions || 'Dry clean recommended. Store on wide padded hangers away from direct sunlight.'}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                <div className="p-3 bg-[#F7F4EE] rounded-xl text-center space-y-1">
                                    <span className="font-bold block">Dry Clean</span>
                                    <span className="text-[10px] text-stone-500">Recommended</span>
                                </div>
                                <div className="p-3 bg-[#F7F4EE] rounded-xl text-center space-y-1">
                                    <span className="font-bold block">Steam Iron</span>
                                    <span className="text-[10px] text-stone-500">Low Temp</span>
                                </div>
                                <div className="p-3 bg-[#F7F4EE] rounded-xl text-center space-y-1">
                                    <span className="font-bold block">Do Not Bleach</span>
                                    <span className="text-[10px] text-stone-500">Color Safe</span>
                                </div>
                                <div className="p-3 bg-[#F7F4EE] rounded-xl text-center space-y-1">
                                    <span className="font-bold block">Padded Hanger</span>
                                    <span className="text-[10px] text-stone-500">Preserve Drape</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 4: DELIVERY & AUTHENTICITY */}
                    {activeSpecTab === 'delivery' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                            <div className="space-y-2 p-4 bg-[#F7F4EE] rounded-2xl border border-[#D5B263]/20">
                                <ShieldCheck className="w-5 h-5 text-[#D5B263]" />
                                <h5 className="font-serif-luxury font-bold text-[#121212]">Authenticity Certified</h5>
                                <p className="text-stone-600 font-light">
                                    Every garment arrives with a holographic serial tag and authenticity certificate signed by our head atelier inspector.
                                </p>
                            </div>
                            <div className="space-y-2 p-4 bg-[#F7F4EE] rounded-2xl border border-[#D5B263]/20">
                                <Truck className="w-5 h-5 text-[#D5B263]" />
                                <h5 className="font-serif-luxury font-bold text-[#121212]">Express White-Glove Dispatch</h5>
                                <p className="text-stone-600 font-light">
                                    Orders placed before 2 PM dispatch same-day in custom moisture-resistant cedar apparel presentation boxes.
                                </p>
                            </div>
                            <div className="space-y-2 p-4 bg-[#F7F4EE] rounded-2xl border border-[#D5B263]/20">
                                <RotateCcw className="w-5 h-5 text-[#D5B263]" />
                                <h5 className="font-serif-luxury font-bold text-[#121212]">7-Day Doorstep Pickup</h5>
                                <p className="text-stone-600 font-light">
                                    Need a different size or preference adjustment? Enjoy 100% complimentary courier pickup right from your home.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* COMPLETE THE LOOK BUNDLE (Section 12) */}
                {completeLookProducts.length > 0 && (
                    <div className="bg-white rounded-3xl border border-[#D5B263]/40 p-6 sm:p-8 space-y-6 shadow-md">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D5B263]/25 pb-4 gap-2">
                            <div>
                                <span className="text-[10px] font-bold text-[#D5B263] uppercase tracking-widest block">
                                    Curated Ensemble
                                </span>
                                <h3 className="font-serif-luxury text-2xl font-bold text-[#121212]">
                                    Complete The Look
                                </h3>
                            </div>
                            <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                                Save 15% When Bundled Together
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                            {/* Main Garment */}
                            <div className="p-3 bg-[#F7F4EE] rounded-2xl border border-[#D5B263]/30 flex gap-3 items-center">
                                <img src={currentImgUrl} alt="" className="w-16 h-20 object-cover rounded-xl" />
                                <div>
                                    <span className="text-[9px] font-bold text-[#D5B263] uppercase block">This Garment</span>
                                    <p className="font-serif-luxury text-xs font-bold line-clamp-1">{product.name}</p>
                                    <span className="font-bold text-xs">₹{product.price.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            {/* Accessory Pairings */}
                            {completeLookProducts.map(cl => (
                                <div key={cl.id} className="p-3 bg-[#F7F4EE] rounded-2xl border border-[#D5B263]/30 flex gap-3 items-center">
                                    <img src={getImgUrl(cl.images?.[0])} alt="" className="w-16 h-20 object-cover rounded-xl" />
                                    <div>
                                        <span className="text-[9px] font-bold text-[#D5B263] uppercase block">{cl.styleTag || cl.category}</span>
                                        <p className="font-serif-luxury text-xs font-bold line-clamp-1">{cl.name}</p>
                                        <span className="font-bold text-xs">₹{cl.price.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            ))}

                            {/* Bundle Total & Action */}
                            <div className="p-4 bg-[#121212] text-white rounded-2xl flex flex-col justify-between space-y-3">
                                <div>
                                    <span className="text-[9px] text-[#D5B263] font-bold uppercase tracking-wider block">
                                        Total Look Price
                                    </span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-serif-luxury text-2xl font-bold text-white">
                                            ₹{bundleFinalPrice.toLocaleString('en-IN')}
                                        </span>
                                        <span className="text-xs line-through text-white/40">
                                            ₹{bundleTotal.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleShopCompleteLook}
                                    className="w-full py-2.5 bg-[#D5B263] text-[#121212] font-bold text-xs rounded-xl hover:bg-white transition-colors cursor-pointer"
                                >
                                    Shop Complete Look
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* CUSTOMER REVIEWS & TRUE-TO-SIZE FIT METER */}
                <CustomerReviewsSection product={product} />

                {/* RELATED CURATED PRODUCTS */}
                {relatedProducts.length > 0 && (
                    <div className="space-y-8 pt-8 border-t border-[#D5B263]/25">
                        <div className="text-center space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#D5B263]">
                                Complementary Silhouettes
                            </span>
                            <h3 className="font-serif-luxury text-3xl font-bold text-[#121212]">
                                You May Also Admire
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* FULLSCREEN 4K ULTRA-INSPECTION LIGHTBOX MODAL */}
            {isFullscreenZoomOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
                        <div className="space-y-0.5">
                            <span className="text-[10px] text-[#D5B263] font-bold uppercase tracking-widest">
                                4K Studio Lightbox Inspector (2400×3200 UHD)
                            </span>
                            <h3 className="font-serif-luxury text-xl font-bold">{product.name}</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-white/10 rounded-full px-2 py-1 text-xs gap-2">
                                <button 
                                    onClick={() => setLightboxZoomLevel(Math.max(1, lightboxZoomLevel - 0.25))}
                                    className="p-1 hover:text-[#D5B263]"
                                >
                                    <ZoomOut className="w-4 h-4" />
                                </button>
                                <span>{Math.round(lightboxZoomLevel * 100)}%</span>
                                <button 
                                    onClick={() => setLightboxZoomLevel(Math.min(3, lightboxZoomLevel + 0.25))}
                                    className="p-1 hover:text-[#D5B263]"
                                >
                                    <ZoomIn className="w-4 h-4" />
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    setIsFullscreenZoomOpen(false);
                                    setLightboxZoomLevel(1);
                                }}
                                className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
                        <img
                            src={currentImgUrl}
                            alt=""
                            style={{ transform: `scale(${lightboxZoomLevel})` }}
                            className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-300 cursor-zoom-in"
                        />
                    </div>

                    {/* Bottom Angle Selector */}
                    <div className="flex justify-center gap-3 overflow-x-auto py-2">
                        {product.images?.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImageIndex(idx)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                                    activeImageIndex === idx
                                        ? 'bg-[#D5B263] text-[#121212] border-[#D5B263]'
                                        : 'bg-white/10 text-white/70 border-white/20 hover:text-white'
                                }`}
                            >
                                {img.label || `Angle ${idx + 1}`}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* FLOATING COMMERCE STICKY BOTTOM BAR */}
            {showStickyBar && (
                <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#D5B263]/30 py-3 px-6 shadow-2xl z-40 flex items-center justify-between transition-all animate-in slide-in-from-bottom duration-300">
                    <div className="flex items-center gap-3">
                        <img
                            src={currentImgUrl}
                            alt=""
                            className="w-12 h-14 object-cover rounded-xl border border-stone-200"
                        />
                        <div className="hidden sm:block">
                            <h5 className="font-serif-luxury text-sm font-bold text-[#121212] truncate max-w-xs">{product.name}</h5>
                            <span className="text-xs font-bold text-[#D5B263]">₹{product.price.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex gap-1.5">
                            {product.sizes?.map(sz => (
                                <button
                                    key={sz}
                                    onClick={() => setSelectedSize(sz)}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                                        selectedSize === sz
                                            ? 'bg-[#121212] text-[#D5B263] border-[#121212]'
                                            : 'bg-stone-100 text-stone-700'
                                    }`}
                                >
                                    {sz}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => addToCart(product, selectedSize, selectedColor, 1)}
                            className="px-6 py-2.5 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] font-bold text-xs uppercase rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer shimmer-sweep"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Add to Bag</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;

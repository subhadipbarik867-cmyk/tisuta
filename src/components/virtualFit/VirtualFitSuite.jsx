import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
    Sparkles, Camera, Check, X, ArrowRight, RotateCcw, Sliders, 
    ShieldCheck, Heart, Crown, ShoppingBag, Eye, Zap, Layers 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ThreeDBodyAvatar } from './ThreeDBodyAvatar';
import { getImgUrl } from '../../utils/imageUtils';

export const VirtualFitSuite = () => {
    const {
        isVirtualFitOpen,
        closeVirtualFit,
        virtualFitProduct,
        user,
        addToCart,
        saveVirtualLook,
        products
    } = useShop();

    const [step, setStep] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(virtualFitProduct || products[0]);
    const [selectedColor, setSelectedColor] = useState(selectedProduct?.colors?.[0] || { name: 'Champagne Gold', hex: '#D4AF37' });
    const [selectedSize, setSelectedSize] = useState('M');
    const [isRendering, setIsRendering] = useState(false);
    const [fitScore, setFitScore] = useState(98);
    const [activeSilhouetteTab, setActiveSilhouetteTab] = useState('all');

    const [bodyMetrics, setBodyMetrics] = useState({
        height: 168,
        bust: 34,
        waist: 27,
        hips: 36,
        bodyShape: 'Hourglass'
    });

    // Sync when virtualFitProduct is passed externally
    useEffect(() => {
        if (virtualFitProduct) {
            setSelectedProduct(virtualFitProduct);
            if (virtualFitProduct.colors?.[0]) {
                setSelectedColor(virtualFitProduct.colors[0]);
            }
        }
    }, [virtualFitProduct]);

    // Recalculate dynamic fit score and size based on user measurements
    useEffect(() => {
        let recSize = 'M';
        let score = 98;

        if (bodyMetrics.waist < 26 && bodyMetrics.bust < 33) {
            recSize = 'S';
            score = 96;
        } else if (bodyMetrics.waist > 29 || bodyMetrics.bust > 36) {
            recSize = 'L';
            score = 97;
        } else if (bodyMetrics.waist > 33) {
            recSize = 'XL';
            score = 95;
        }

        setSelectedSize(recSize);
        setFitScore(score);
    }, [bodyMetrics]);

    if (!isVirtualFitOpen) return null;

    const currentGarment = selectedProduct || virtualFitProduct || products[0];

    const handleNextStep = () => {
        if (step === 3) {
            setIsRendering(true);
            setStep(4);
            setTimeout(() => {
                setIsRendering(false);
            }, 800);
        } else {
            setStep(prev => Math.min(prev + 1, 5));
        }
    };

    const handleAddToCartFromFit = () => {
        confetti({
            particleCount: 65,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#F5D77F', '#FFFFFF']
        });
        addToCart(currentGarment, selectedSize, selectedColor, 1);
        closeVirtualFit();
    };

    const handleSaveLook = () => {
        saveVirtualLook({
            id: 'look-' + Date.now(),
            outfitName: currentGarment.name,
            recommendedSize: selectedSize,
            fitScore: fitScore,
            previewImage: getImgUrl(currentGarment?.images?.[0]),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        });
        alert('✦ Haute Couture 3D Look saved to your TISUTA VIP Profile!');
    };

    const filteredCatalog = products.filter(p => {
        if (activeSilhouetteTab === 'dresses') return p.category === 'dresses';
        if (activeSilhouetteTab === 'tops') return p.category === 'tops';
        if (activeSilhouetteTab === 'ethnic') return p.category === 'ethnic';
        return true;
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">

            {/* Dark Velvet Backdrop */}
            <div
                onClick={() => closeVirtualFit()}
                className="fixed inset-0 bg-[#0F0E0D]/90 backdrop-blur-xl transition-opacity cursor-pointer z-40"
            />

            {/* Main Modal Window */}
            <div className="relative w-full max-w-6xl bg-gradient-to-b from-[#1C1814] via-[#141210] to-[#1C1814] text-[#FDFBF7] rounded-3xl border-2 border-[#D4AF37]/50 shadow-[0_25px_70px_rgba(212,175,55,0.3)] overflow-hidden z-50 my-auto flex flex-col max-h-[94vh]">

                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#D4AF37]/30 bg-[#141210]/95 backdrop-blur-xl z-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#9E7D23] via-[#D4AF37] to-[#F5D77F] text-[#141210] shadow-md">
                            <Crown className="w-5 h-5 fill-[#141210]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-cinzel text-xl sm:text-2xl font-black text-white tracking-wide">
                                    TISUTA 3D Virtual Fit™ Studio
                                </h3>
                                <span className="px-3 py-0.5 bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#141210] font-cinzel font-black text-[9.5px] uppercase tracking-widest rounded-full shadow-md">
                                    AI Volumetric Avatar
                                </span>
                            </div>
                            <p className="text-xs text-white/70 font-light">
                                Interactive 360° Real-Time Garment Simulation & Fabric Stress Heatmap
                            </p>
                        </div>
                    </div>

                    {/* Prominent Close Button */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeVirtualFit();
                        }}
                        className="p-2.5 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#141210] text-white transition-all cursor-pointer border border-[#D4AF37]/40 shadow-sm"
                        title="Close 3D Virtual Fit Studio"
                        aria-label="Close 3D Virtual Fit Studio"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Stepper Progress Ribbon */}
                <div className="grid grid-cols-5 bg-[#0C0B0A] border-b border-[#D4AF37]/25 text-[10.5px] font-cinzel font-bold">
                    {[
                        { num: 1, label: '1. 3D Silhouette' },
                        { num: 2, label: '2. Mesh Scan' },
                        { num: 3, label: '3. Choose Outfit' },
                        { num: 4, label: '4. Live 3D Studio' },
                        { num: 5, label: '5. Fit Result' }
                    ].map(s => (
                        <button
                            key={s.num}
                            onClick={() => setStep(s.num)}
                            className={`py-3 px-2 text-center transition-all border-b-2 flex items-center justify-center gap-1.5 cursor-pointer ${
                                step === s.num
                                    ? 'border-[#F5D77F] text-[#F5D77F] bg-white/5 font-black shadow-inner'
                                    : step > s.num
                                        ? 'border-emerald-500/70 text-emerald-400 font-semibold'
                                        : 'border-transparent text-white/40 hover:text-white/70'
                            }`}
                        >
                            {step > s.num && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                            <span>{s.label}</span>
                        </button>
                    ))}
                </div>

                {/* Body Content Stage */}
                <div className="p-5 sm:p-7 overflow-y-auto flex-1 bg-[#141210]">

                    {/* STEP 1, 4 & 5: Interactive 3D Avatar Display */}
                    {(step === 1 || step === 4 || step === 5) && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                            {/* Left Column: 3D Body Mannequin Avatar (7 Cols) */}
                            <div className="lg:col-span-7">
                                <ThreeDBodyAvatar
                                    height={`${bodyMetrics.height} cm`}
                                    bust={`${bodyMetrics.bust}B`}
                                    waist={`${bodyMetrics.waist} in`}
                                    hips={`${bodyMetrics.hips} in`}
                                    bodyShape={bodyMetrics.bodyShape}
                                    garmentColor={selectedColor}
                                    garmentImage={getImgUrl(currentGarment?.images?.[0])}
                                    garmentSilhouette={currentGarment?.subCategory}
                                    garmentName={currentGarment?.name}
                                    fitScore={fitScore}
                                />
                            </div>

                            {/* Right Column: Dynamic Fitting Controls (5 Cols) */}
                            <div className="lg:col-span-5 space-y-6">

                                {step === 1 && (
                                    <div className="space-y-5">
                                        <div className="space-y-1.5">
                                            <span className="text-[10px] font-cinzel font-black text-[#F5D77F] uppercase tracking-[0.28em] flex items-center gap-1.5">
                                                <Sliders className="w-3.5 h-3.5" />
                                                <span>Step 1: Parametric Morphing</span>
                                            </span>
                                            <h4 className="font-cinzel text-2xl font-black text-white">Body Silhouette Sliders</h4>
                                            <p className="text-xs text-white/70 font-light">
                                                Adjust sliders to match your physique — our 3D mannequin geometry morphs in real-time.
                                            </p>
                                        </div>

                                        {/* Real-time measurement sliders */}
                                        <div className="space-y-3.5 bg-black/50 p-4 rounded-2xl border border-[#D4AF37]/30 text-xs">
                                            {/* Height Slider */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between font-cinzel font-bold">
                                                    <span className="text-white/70">Height</span>
                                                    <span className="text-[#F5D77F]">{bodyMetrics.height} cm</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="150"
                                                    max="185"
                                                    value={bodyMetrics.height}
                                                    onChange={e => setBodyMetrics({ ...bodyMetrics, height: Number(e.target.value) })}
                                                    className="w-full accent-[#D4AF37] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                                                />
                                            </div>

                                            {/* Bust Slider */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between font-cinzel font-bold">
                                                    <span className="text-white/70">Bust Circumference</span>
                                                    <span className="text-[#F5D77F]">{bodyMetrics.bust} in</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="30"
                                                    max="42"
                                                    value={bodyMetrics.bust}
                                                    onChange={e => setBodyMetrics({ ...bodyMetrics, bust: Number(e.target.value) })}
                                                    className="w-full accent-[#D4AF37] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                                                />
                                            </div>

                                            {/* Waist Slider */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between font-cinzel font-bold">
                                                    <span className="text-white/70">Waist Size</span>
                                                    <span className="text-[#F5D77F]">{bodyMetrics.waist} in</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="23"
                                                    max="38"
                                                    value={bodyMetrics.waist}
                                                    onChange={e => setBodyMetrics({ ...bodyMetrics, waist: Number(e.target.value) })}
                                                    className="w-full accent-[#D4AF37] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                                                />
                                            </div>

                                            {/* Hips Slider */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between font-cinzel font-bold">
                                                    <span className="text-white/70">Hips Size</span>
                                                    <span className="text-[#F5D77F]">{bodyMetrics.hips} in</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="32"
                                                    max="48"
                                                    value={bodyMetrics.hips}
                                                    onChange={e => setBodyMetrics({ ...bodyMetrics, hips: Number(e.target.value) })}
                                                    className="w-full accent-[#D4AF37] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        {/* Body Shape Selector */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-cinzel font-bold text-[#F5D77F] block">
                                                Body Profile Preset
                                            </label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['Hourglass', 'Pear', 'Petite', 'Athletic', 'Slender'].map(shape => (
                                                    <button
                                                        key={shape}
                                                        onClick={() => setBodyMetrics({ ...bodyMetrics, bodyShape: shape })}
                                                        className={`py-2 px-2 rounded-xl text-[10.5px] font-cinzel font-bold tracking-wider transition-all border cursor-pointer ${
                                                            bodyMetrics.bodyShape === shape
                                                                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#141210] border-[#F5D77F] shadow-md'
                                                                : 'bg-black/50 text-white/70 border-[#D4AF37]/30 hover:border-[#D4AF37]'
                                                        }`}
                                                    >
                                                        {shape}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleNextStep}
                                            className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] text-[#141210] font-cinzel font-black text-xs uppercase tracking-[0.25em] rounded-2xl hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_8px_25px_rgba(212,175,55,0.35)] border border-[#F5D77F]"
                                        >
                                            <span>Proceed to Mesh Photogrammetry</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                {/* Step 4 & 5: Live Fitting Studio, Quick Silhouette Switcher & Checkout */}
                                {(step === 4 || step === 5) && (
                                    <div className="space-y-5">
                                        {/* Size Recommendation Box */}
                                        <div className="p-4 bg-black/60 rounded-3xl border-2 border-[#D4AF37]/50 space-y-2.5 shadow-xl">
                                            <div className="flex justify-between items-center text-xs font-cinzel font-bold">
                                                <span className="text-[#F5D77F] uppercase tracking-wider">AI Recommended Size</span>
                                                <span className="px-3 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-[10px] font-bold">
                                                    {fitScore}% Precision Match
                                                </span>
                                            </div>
                                            <div className="text-3xl font-black text-white font-cinzel">
                                                Size {selectedSize}
                                            </div>
                                            <div className="space-y-1 text-[11px] text-white/80 font-light border-t border-white/10 pt-2">
                                                <p>• <strong>Bust Ease:</strong> 1.5 in tailored ease around {bodyMetrics.bust} in chest.</p>
                                                <p>• <strong>Waist Contour:</strong> Flawless silhouette hugging {bodyMetrics.waist} in waist.</p>
                                                <p>• <strong>Silhouette Drape:</strong> {currentGarment?.name}</p>
                                            </div>
                                        </div>

                                        {/* Color Swatch Picker */}
                                        {currentGarment?.colors && currentGarment.colors.length > 0 && (
                                            <div className="space-y-2">
                                                <label className="text-xs font-cinzel font-bold text-[#F5D77F] block">
                                                    Live 3D Drape Shade: <strong>{selectedColor.name}</strong>
                                                </label>
                                                <div className="flex gap-2">
                                                    {currentGarment.colors.map(c => (
                                                        <button
                                                            key={c.name}
                                                            onClick={() => setSelectedColor(c)}
                                                            style={{ backgroundColor: c.hex }}
                                                            className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                                                                selectedColor.name === c.name 
                                                                    ? 'border-[#D4AF37] ring-4 ring-[#D4AF37]/50 scale-110' 
                                                                    : 'border-white/20 opacity-70 hover:opacity-100'
                                                            }`}
                                                            title={c.name}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* In-Studio Fast Silhouette Switcher */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-xs font-cinzel font-bold">
                                                <span className="text-[#F5D77F] uppercase tracking-wider">Try Another Silhouette</span>
                                                <button
                                                    onClick={() => setStep(3)}
                                                    className="text-[10px] text-[#D4AF37] hover:underline cursor-pointer"
                                                >
                                                    View All 12 ✦
                                                </button>
                                            </div>

                                            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                                                {products.slice(0, 6).map(p => (
                                                    <div
                                                        key={p.id}
                                                        onClick={() => {
                                                            setSelectedProduct(p);
                                                            if (p.colors?.[0]) setSelectedColor(p.colors[0]);
                                                        }}
                                                        className={`w-16 h-20 rounded-xl overflow-hidden border-2 cursor-pointer flex-shrink-0 transition-all ${
                                                            selectedProduct?.id === p.id 
                                                                ? 'border-[#D4AF37] ring-2 ring-[#F5D77F] scale-105' 
                                                                : 'border-white/20 opacity-60 hover:opacity-100'
                                                        }`}
                                                        title={p.name}
                                                    >
                                                        <img src={getImgUrl(p.images?.[0])} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* CTA Actions */}
                                        <div className="flex flex-col gap-2.5 pt-2">
                                            <button
                                                onClick={handleAddToCartFromFit}
                                                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] text-[#141210] font-cinzel font-black text-xs uppercase tracking-[0.25em] rounded-2xl hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_30px_rgba(212,175,55,0.4)] border border-[#F5D77F]"
                                            >
                                                <ShoppingBag className="w-4 h-4" />
                                                <span>ADD TESTED OUTFIT TO CART</span>
                                            </button>

                                            <button
                                                onClick={handleSaveLook}
                                                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-cinzel font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                                            >
                                                <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                                                <span>Save Look to TISUTA Account</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>

                        </div>
                    )}

                    {/* STEP 2: Photo Scan Simulation */}
                    {step === 2 && (
                        <div className="max-w-lg mx-auto py-10 text-center space-y-6">
                            <div className="w-24 h-24 rounded-full bg-[#D4AF37]/15 border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-[#F5D77F] shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                                <Camera className="w-10 h-10 animate-pulse" />
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-cinzel text-3xl font-black text-white">Body Mesh Photogrammetry</h4>
                                <p className="text-xs text-white/70 leading-relaxed font-light">
                                    Our AI spatial pipeline analyzes volumetric torso landmarks to calculate accurate drape tension and wrinkle mechanics across the 12 pure silhouettes.
                                </p>
                            </div>

                            <div className="p-4 bg-black/60 rounded-2xl border border-[#D4AF37]/30 text-xs text-[#F5D77F] font-cinzel flex items-center justify-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                                <span>Zero Biometric Storage • Client-Side Neural Calibration</span>
                            </div>

                            <button
                                onClick={handleNextStep}
                                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] text-[#141210] font-cinzel font-black text-xs uppercase tracking-[0.25em] rounded-2xl hover:scale-102 transition-all cursor-pointer shadow-xl border border-[#F5D77F]"
                            >
                                Calibrate 3D Mesh & Choose Silhouette
                            </button>
                        </div>
                    )}

                    {/* STEP 3: Garment Selection (All 12 Pure Silhouettes) */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="text-center max-w-xl mx-auto space-y-2">
                                <h4 className="font-cinzel text-3xl font-black text-white">Select Silhouette for 3D Draping</h4>
                                <p className="text-xs text-white/70">
                                    Choose any of our 12 tailored women's silhouettes to simulate on your 3D avatar
                                </p>

                                {/* Category Filter Tabs */}
                                <div className="flex items-center justify-center gap-2 pt-2">
                                    {[
                                        { id: 'all', label: 'All 12 Items' },
                                        { id: 'dresses', label: 'Dresses (5)' },
                                        { id: 'tops', label: 'Tops (4)' },
                                        { id: 'ethnic', label: 'Kurtis & Sets (3)' }
                                    ].map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveSilhouetteTab(tab.id)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-cinzel font-bold transition-all cursor-pointer ${
                                                activeSilhouetteTab === tab.id
                                                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#141210]'
                                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                {filteredCatalog.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => {
                                            setSelectedProduct(p);
                                            if (p.colors?.[0]) setSelectedColor(p.colors[0]);
                                        }}
                                        className={`p-2.5 rounded-2xl border transition-all cursor-pointer bg-black/60 space-y-2 ${
                                            selectedProduct?.id === p.id 
                                                ? 'border-[#D4AF37] ring-2 ring-[#F5D77F] scale-104 shadow-[0_8px_20px_rgba(212,175,55,0.3)]' 
                                                : 'border-white/10 opacity-75 hover:opacity-100 hover:border-[#D4AF37]/50'
                                        }`}
                                    >
                                        <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                                            <img src={getImgUrl(p.images?.[0])} alt="" className="w-full h-full object-cover" />
                                            {selectedProduct?.id === p.id && (
                                                <div className="absolute top-1.5 right-1.5 p-1 bg-[#D4AF37] text-[#141210] rounded-full shadow">
                                                    <Check className="w-3 h-3 stroke-[3]" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-xs">
                                            <div className="font-cinzel font-bold line-clamp-1 text-white">{p.name}</div>
                                            <div className="text-[#F5D77F] font-black font-cinzel">₹{p.price.toLocaleString('en-IN')}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleNextStep}
                                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] text-[#141210] font-cinzel font-black text-xs uppercase tracking-[0.25em] rounded-2xl hover:scale-102 transition-all cursor-pointer shadow-xl border border-[#F5D77F]"
                            >
                                Generate Photorealistic 3D Volumetric Render
                            </button>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

export default VirtualFitSuite;

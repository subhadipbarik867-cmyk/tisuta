import React, { useState } from 'react';
import { Sparkles, Camera, Check, X, ArrowRight, RotateCcw, Sliders, ShieldCheck, Heart } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ThreeDBodyAvatar } from './ThreeDBodyAvatar';

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
    const [selectedColor, setSelectedColor] = useState(selectedProduct?.colors[0] || { name: 'Champagne Gold', hex: '#C5A059' });
    const [selectedSize, setSelectedSize] = useState('M');
    const [isRendering, setIsRendering] = useState(false);
    const [fitScore, setFitScore] = useState(98);

    const [bodyMetrics, setBodyMetrics] = useState({
        height: user?.virtualFitProfile?.height || '168 cm',
        bust: user?.virtualFitProfile?.bust || '34B',
        waist: user?.virtualFitProfile?.waist || '27 in',
        hips: user?.virtualFitProfile?.hips || '36 in',
        bodyShape: user?.virtualFitProfile?.bodyShape || 'Hourglass'
    });

    if (!isVirtualFitOpen) return null;

    const currentGarment = selectedProduct || virtualFitProduct || products[0];

    const handleNextStep = () => {
        if (step === 3) {
            setIsRendering(true);
            setStep(4);
            setTimeout(() => {
                setIsRendering(false);
            }, 1200);
        } else {
            setStep(prev => Math.min(prev + 1, 5));
        }
    };

    const handleAddToCartFromFit = () => {
        addToCart(currentGarment, selectedSize, selectedColor, 1);
        closeVirtualFit();
    };

    const handleSaveLook = () => {
        saveVirtualLook({
            id: 'look-' + Date.now(),
            outfitName: currentGarment.name,
            recommendedSize: selectedSize,
            fitScore: fitScore,
            previewImage: currentGarment.images[0],
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        });
        alert('Look saved to your TISUTA Profile!');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">

            {/* Dark Backdrop */}
            <div
                onClick={() => closeVirtualFit()}
                className="fixed inset-0 bg-[#0F0F0F]/90 backdrop-blur-md transition-opacity cursor-pointer z-40"
            />

            {/* Main Modal Window */}
            <div className="relative w-full max-w-5xl bg-[#0F0F0F] text-[#FAFAFA] rounded-2xl border border-[#C5A059]/40 shadow-2xl overflow-hidden z-50 my-auto flex flex-col max-h-[92vh]">

                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#141414] z-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/50 text-[#C5A059]">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-serif-luxury text-xl font-bold text-[#FAFAFA]">TISUTA 3D Virtual Fit™</h3>
                                <span className="px-2.5 py-0.5 bg-[#C5A059] text-[#0F0F0F] font-bold text-[9px] uppercase tracking-wider rounded-full">
                                    AI Body Avatar Engine
                                </span>
                            </div>
                            <p className="text-xs text-white/60 font-light">Interactive 360° Volumetric Garment & Silhouette Simulation</p>
                        </div>
                    </div>

                    {/* Prominent Close Button */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeVirtualFit();
                        }}
                        className="p-2.5 rounded-full bg-white/10 hover:bg-[#C5A059] hover:text-[#0F0F0F] text-white transition-all cursor-pointer border border-white/20"
                        title="Close 3D Virtual Fit Scanner"
                        aria-label="Close 3D Virtual Fit Scanner"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Stepper Progress Ribbon */}
                <div className="grid grid-cols-5 bg-[#0A0908] border-b border-white/10 text-[11px] font-bold">
                    {[
                        { num: 1, label: '1. 3D Profile' },
                        { num: 2, label: '2. Mesh Scan' },
                        { num: 3, label: '3. Select Outfit' },
                        { num: 4, label: '4. 3D Preview' },
                        { num: 5, label: '5. Outfit Result' }
                    ].map(s => (
                        <button
                            key={s.num}
                            onClick={() => setStep(s.num)}
                            className={`py-3.5 px-2 text-center transition-colors border-b-2 flex items-center justify-center gap-1 cursor-pointer ${step === s.num
                                    ? 'border-[#C5A059] text-[#C5A059] bg-[#141414]'
                                    : step > s.num
                                        ? 'border-emerald-500/50 text-emerald-400 opacity-80'
                                        : 'border-transparent text-white/40'
                                }`}
                        >
                            {step > s.num && <Check className="w-3 h-3 text-emerald-400" />}
                            <span>{s.label}</span>
                        </button>
                    ))}
                </div>

                {/* Body Content Stage */}
                <div className="p-6 overflow-y-auto flex-1 bg-[#141414]">

                    {/* STEP 1 & STEP 4: Interactive 3D Avatar Display */}
                    {(step === 1 || step === 4 || step === 5) && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                            {/* Left Column: 3D Body Mannequin Avatar (7 Cols) */}
                            <div className="lg:col-span-7">
                                <ThreeDBodyAvatar
                                    height={bodyMetrics.height}
                                    bust={bodyMetrics.bust}
                                    waist={bodyMetrics.waist}
                                    hips={bodyMetrics.hips}
                                    bodyShape={bodyMetrics.bodyShape}
                                    garmentColor={selectedColor}
                                    garmentImage={currentGarment?.images[0]}
                                    fitScore={fitScore}
                                />
                            </div>

                            {/* Right Column: Dynamic Fitting Controls (5 Cols) */}
                            <div className="lg:col-span-5 space-y-6">

                                {step === 1 && (
                                    <div className="space-y-5">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-extrabold text-[#C5A059] uppercase tracking-[0.25em]">
                                                Step 1: Set Body Silhouette
                                            </span>
                                            <h4 className="font-serif-luxury text-2xl font-bold text-[#FAFAFA]">Personal Measurements</h4>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 text-xs">
                                            <div className="space-y-1">
                                                <label className="text-white/60">Height</label>
                                                <input
                                                    type="text"
                                                    value={bodyMetrics.height}
                                                    onChange={e => setBodyMetrics({ ...bodyMetrics, height: e.target.value })}
                                                    className="w-full p-3 bg-[#0F0F0F] border border-white/20 rounded-xl text-white font-medium"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-white/60">Waist Size</label>
                                                <input
                                                    type="text"
                                                    value={bodyMetrics.waist}
                                                    onChange={e => setBodyMetrics({ ...bodyMetrics, waist: e.target.value })}
                                                    className="w-full p-3 bg-[#0F0F0F] border border-white/20 rounded-xl text-white font-medium"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-white/60">Bust Size</label>
                                                <input
                                                    type="text"
                                                    value={bodyMetrics.bust}
                                                    onChange={e => setBodyMetrics({ ...bodyMetrics, bust: e.target.value })}
                                                    className="w-full p-3 bg-[#0F0F0F] border border-white/20 rounded-xl text-white font-medium"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-white/60">Hips Size</label>
                                                <input
                                                    type="text"
                                                    value={bodyMetrics.hips}
                                                    onChange={e => setBodyMetrics({ ...bodyMetrics, hips: e.target.value })}
                                                    className="w-full p-3 bg-[#0F0F0F] border border-white/20 rounded-xl text-white font-medium"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleNextStep}
                                            className="w-full py-4 bg-[#C5A059] text-[#0F0F0F] font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                                        >
                                            <span>Proceed to Mesh Scan</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                {/* Step 4 & 5: Color Swatches & Fit Match Analysis */}
                                {(step === 4 || step === 5) && (
                                    <div className="space-y-5">
                                        <div className="p-4 bg-[#0F0F0F] rounded-2xl border border-[#C5A059]/40 space-y-2">
                                            <div className="flex justify-between items-center text-xs font-bold">
                                                <span className="text-white/70">Recommended Size</span>
                                                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-[10px]">
                                                    98% Precision Score
                                                </span>
                                            </div>
                                            <div className="text-2xl font-bold text-white font-serif-luxury">Size M</div>
                                            <p className="text-[11px] text-white/60 font-light">
                                                Based on your {bodyMetrics.bust} bust and {bodyMetrics.waist} waist, Size M offers an ideal tailored drape across shoulders without pulling.
                                            </p>
                                        </div>

                                        {/* Interactive Garment Shade Color Swatches */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#C5A059] block">
                                                Live 3D Garment Shade: <strong>{selectedColor.name}</strong>
                                            </label>
                                            <div className="flex gap-2">
                                                {currentGarment.colors.map(c => (
                                                    <button
                                                        key={c.name}
                                                        onClick={() => setSelectedColor(c)}
                                                        style={{ backgroundColor: c.hex }}
                                                        className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${selectedColor.name === c.name ? 'border-[#C5A059] ring-4 ring-[#C5A059]/30 scale-110' : 'border-white/20 opacity-70'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* CTA Actions */}
                                        <div className="flex flex-col gap-2 pt-2">
                                            <button
                                                onClick={handleAddToCartFromFit}
                                                className="w-full py-4 bg-[#C5A059] text-[#0F0F0F] font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                                            >
                                                <Sparkles className="w-4 h-4" />
                                                <span>ADD TESTED OUTFIT TO CART</span>
                                            </button>

                                            <button
                                                onClick={handleSaveLook}
                                                className="w-full py-3 bg-white/10 text-white font-bold text-xs rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                            >
                                                <Heart className="w-4 h-4 text-red-400" />
                                                <span>Save Outfit Look to TISUTA Account</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>

                        </div>
                    )}

                    {/* STEP 2: Photo Scan Simulation */}
                    {step === 2 && (
                        <div className="max-w-md mx-auto py-8 text-center space-y-6">
                            <div className="w-20 h-20 rounded-full bg-[#C5A059]/10 border-2 border-[#C5A059] flex items-center justify-center mx-auto text-[#C5A059]">
                                <Camera className="w-8 h-8 animate-pulse" />
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-serif-luxury text-2xl font-bold">Body Mesh Photogrammetry</h4>
                                <p className="text-xs text-white/60">
                                    Upload a full-length photo or use front camera scan for photorealistic garment physics.
                                </p>
                            </div>

                            <button
                                onClick={handleNextStep}
                                className="w-full py-4 bg-[#C5A059] text-[#0F0F0F] font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all cursor-pointer"
                            >
                                Proceed with Simulated AI Scan
                            </button>
                        </div>
                    )}

                    {/* STEP 3: Garment Selection */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="text-center max-w-xl mx-auto space-y-1">
                                <h4 className="font-serif-luxury text-2xl font-bold">Select Outfit for 3D Simulation</h4>
                                <p className="text-xs text-white/60">Choose any haute couture item from the catalog</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {products.slice(0, 4).map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => {
                                            setSelectedProduct(p);
                                            setSelectedColor(p.colors[0]);
                                        }}
                                        className={`p-3 rounded-2xl border transition-all cursor-pointer bg-[#0F0F0F] space-y-2 ${selectedProduct?.id === p.id ? 'border-[#C5A059] ring-2 ring-[#C5A059]' : 'border-white/10 opacity-80'
                                            }`}
                                    >
                                        <img src={p.images[0]} alt="" className="w-full aspect-[3/4] object-cover rounded-xl" />
                                        <div className="text-xs">
                                            <div className="font-bold line-clamp-1 text-white">{p.name}</div>
                                            <div className="text-[#C5A059] font-semibold">₹{p.price.toLocaleString('en-IN')}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleNextStep}
                                className="w-full py-4 bg-[#C5A059] text-[#0F0F0F] font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all cursor-pointer"
                            >
                                Generate Photorealistic 3D Render
                            </button>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

export default VirtualFitSuite;

import React, { useState } from 'react';
import { Sparkles, Check, RefreshCw, ArrowRight, Heart, Star } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../product/ProductCard';

export const PersonalizedStyleQuiz = ({ onSelectProduct }) => {
    const { products, openVirtualFit } = useShop();

    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        bodyType: 'Hourglass',
        height: '5\'5"',
        fit: 'Fitted & Sculpted',
        style: 'Minimal Luxury',
        occasion: 'Date Night & Galas',
        size: 'M'
    });

    const [completed, setCompleted] = useState(false);

    const options = {
        bodyType: ['Hourglass', 'Pear / Curvy', 'Petite', 'Tall & Slender', 'Athletic Structure'],
        fit: ['Fitted & Sculpted', 'Relaxed & Flowy', 'Tailored Power Fit', 'Comfort Oversized'],
        style: ['Minimal Luxury', 'Royal Ethnic Couture', 'Evening Glamour', 'Resort Riviera'],
        occasion: ['Workplace & Office', 'Date Night & Galas', 'Festive & Weddings', 'Vacation & Brunch'],
        size: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    };

    const handleSelect = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const handleFinish = () => {
        setCompleted(true);
    };

    // Filter products matching style / occasion
    const recommendedProducts = products.filter(p => {
        if (answers.style === 'Royal Ethnic Couture') return p.category === 'ethnic';
        if (answers.style === 'Evening Glamour') return p.category === 'dresses';
        if (answers.style === 'Minimal Luxury') return p.category === 'dresses' || p.category === 'tops';
        return true;
    }).slice(0, 3);

    return (
        <section className="py-24 bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F5] to-[#FFFFFF] text-[#141210]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Title */}
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#141210] text-xs font-cinzel font-black uppercase tracking-widest shadow-md">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Styling Intelligence • Royale Atelier</span>
                    </div>
                    <h2 className="font-cinzel text-3xl sm:text-5xl text-[#141210] font-black tracking-tight">
                        CRAFTED FOR YOUR <span className="gold-text-gradient">SIGNATURE FIT</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#141210]/70 font-light">
                        Select your silhouette profile & occasion preference to receive bespoke high-fashion couture recommendations.
                    </p>
                </div>

                {/* Quiz Box Card */}
                <div className="max-w-4xl mx-auto bg-[#FFFFFF] rounded-3xl p-8 md:p-12 border border-[#D5B263]/30 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#D5B263]/10 rounded-full blur-2xl pointer-events-none" />

                    {!completed ? (
                        <div className="space-y-8 animate-in fade-in duration-300">

                            {/* Progress Steps Header */}
                            <div className="flex items-center justify-between text-xs font-semibold border-b border-[#D5B263]/20 pb-4">
                                <span className="text-[#D5B263] uppercase tracking-widest">
                                    Step {step} of 5 — {step === 1 ? 'Body Profile' : step === 2 ? 'Preferred Fit' : step === 3 ? 'Aesthetic Style' : step === 4 ? 'Occasion' : 'Usual Size'}
                                </span>
                                <span className="text-[#121212]/40">
                                    {Math.round((step / 5) * 100)}% Completed
                                </span>
                            </div>

                            {/* Step 1: Body Type */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    <h3 className="font-serif-luxury text-xl text-[#121212]">
                                        Select Your Body Profile Silhouette:
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {options.bodyType.map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => handleSelect('bodyType', item)}
                                                className={`p-4 rounded-2xl text-xs font-semibold text-left transition-all border ${answers.bodyType === item
                                                        ? 'bg-[#121212] text-[#D5B263] border-[#D5B263] shadow-md'
                                                        : 'bg-[#F7F4EE] text-[#121212] border-transparent hover:border-[#D5B263]'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>{item}</span>
                                                    {answers.bodyType === item && <Check className="w-4 h-4 text-[#D5B263]" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Fit */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <h3 className="font-serif-luxury text-xl text-[#121212]">
                                        How do you prefer your garment silhouette to fit?
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {options.fit.map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => handleSelect('fit', item)}
                                                className={`p-4 rounded-2xl text-xs font-semibold text-left transition-all border ${answers.fit === item
                                                        ? 'bg-[#121212] text-[#D5B263] border-[#D5B263] shadow-md'
                                                        : 'bg-[#F7F4EE] text-[#121212] border-transparent hover:border-[#D5B263]'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>{item}</span>
                                                    {answers.fit === item && <Check className="w-4 h-4 text-[#D5B263]" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Aesthetic */}
                            {step === 3 && (
                                <div className="space-y-4">
                                    <h3 className="font-serif-luxury text-xl text-[#121212]">
                                        Which style identity best defines you?
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {options.style.map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => handleSelect('style', item)}
                                                className={`p-4 rounded-2xl text-xs font-semibold text-left transition-all border ${answers.style === item
                                                        ? 'bg-[#121212] text-[#D5B263] border-[#D5B263] shadow-md'
                                                        : 'bg-[#F7F4EE] text-[#121212] border-transparent hover:border-[#D5B263]'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>{item}</span>
                                                    {answers.style === item && <Check className="w-4 h-4 text-[#D5B263]" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Occasion */}
                            {step === 4 && (
                                <div className="space-y-4">
                                    <h3 className="font-serif-luxury text-xl text-[#121212]">
                                        What is your upcoming primary occasion?
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {options.occasion.map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => handleSelect('occasion', item)}
                                                className={`p-4 rounded-2xl text-xs font-semibold text-left transition-all border ${answers.occasion === item
                                                        ? 'bg-[#121212] text-[#D5B263] border-[#D5B263] shadow-md'
                                                        : 'bg-[#F7F4EE] text-[#121212] border-transparent hover:border-[#D5B263]'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>{item}</span>
                                                    {answers.occasion === item && <Check className="w-4 h-4 text-[#D5B263]" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 5: Size */}
                            {step === 5 && (
                                <div className="space-y-4">
                                    <h3 className="font-serif-luxury text-xl text-[#121212]">
                                        Select your standard sizing:
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {options.size.map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => handleSelect('size', item)}
                                                className={`w-14 h-14 rounded-2xl text-xs font-bold transition-all border flex items-center justify-center ${answers.size === item
                                                        ? 'bg-[#121212] text-[#D5B263] border-[#D5B263] shadow-md scale-110'
                                                        : 'bg-[#F7F4EE] text-[#121212] border-transparent hover:border-[#D5B263]'
                                                    }`}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Navigation buttons */}
                            <div className="pt-6 border-t border-[#D5B263]/20 flex items-center justify-between">
                                {step > 1 ? (
                                    <button
                                        onClick={() => setStep(step - 1)}
                                        className="px-6 py-2.5 bg-[#F7F4EE] text-[#121212] text-xs font-semibold rounded-xl hover:bg-[#E5E2D9] transition-colors"
                                    >
                                        Previous Step
                                    </button>
                                ) : <div />}

                                {step < 5 ? (
                                    <button
                                        onClick={() => setStep(step + 1)}
                                        className="px-8 py-3 bg-[#121212] text-[#D5B263] font-bold text-xs rounded-xl hover:bg-[#D5B263] hover:text-[#121212] transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                                    >
                                        <span>Next Step</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleFinish}
                                        className="px-8 py-3 bg-[#D5B263] text-[#121212] font-bold text-xs rounded-xl hover:bg-[#C5A059] transition-colors shadow-xl flex items-center gap-2 cursor-pointer"
                                    >
                                        <Sparkles className="w-4 h-4 fill-[#121212]" />
                                        <span>Generate Tailored Recommendations</span>
                                    </button>
                                )}
                            </div>

                        </div>
                    ) : (
                        /* Results Screen */
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#D5B263]/30 pb-6 gap-4">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D5B263] uppercase tracking-widest">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>Your Personalized Style Profile Result</span>
                                    </div>
                                    <h3 className="font-serif-luxury text-2xl text-[#121212] mt-1">
                                        Curated for {answers.style} & {answers.bodyType} Profile
                                    </h3>
                                </div>

                                <button
                                    onClick={() => {
                                        setCompleted(false);
                                        setStep(1);
                                    }}
                                    className="px-4 py-2 border border-[#121212]/20 text-[#121212] text-xs font-semibold rounded-xl hover:border-[#D5B263] hover:text-[#D5B263] transition-colors flex items-center gap-1.5"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                    <span>Retake Style Quiz</span>
                                </button>
                            </div>

                            {/* Recommended Product Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {recommendedProducts.map((prod) => (
                                    <ProductCard
                                        key={prod.id}
                                        product={prod}
                                        onSelectProduct={onSelectProduct}
                                    />
                                ))}
                            </div>

                            <div className="p-4 bg-[#F7F4EE] rounded-2xl border border-[#D5B263]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#D5B263]" />
                                    <span>Want to test these recommendations on your actual photo?</span>
                                </div>
                                <button
                                    onClick={() => openVirtualFit(recommendedProducts[0])}
                                    className="px-5 py-2.5 bg-[#121212] text-[#D5B263] font-bold rounded-xl hover:bg-[#D5B263] hover:text-[#121212] transition-colors cursor-pointer"
                                >
                                    Launch Virtual Try-On for these pieces
                                </button>
                            </div>

                        </div>
                    )}

                </div>

            </div>
        </section>
    );
};

export default PersonalizedStyleQuiz;

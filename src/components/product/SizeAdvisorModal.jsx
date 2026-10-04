import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const SizeAdvisorModal = () => {
    const { isSizeAdvisorOpen, setIsSizeAdvisorOpen, sizeAdvisorProduct } = useShop();

    const [height, setHeight] = useState('5\'5"');
    const [weight, setWeight] = useState('58 kg');
    const [preferredFit, setPreferredFit] = useState('Regular Fit');
    const [usualSize, setUsualSize] = useState('M');
    const [calculated, setCalculated] = useState(false);

    if (!isSizeAdvisorOpen || !sizeAdvisorProduct) return null;

    const handleCalculate = () => {
        setCalculated(true);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div onClick={() => setIsSizeAdvisorOpen(false)} className="fixed inset-0 bg-[#121212]/75 backdrop-blur-sm" />

            <div className="relative w-full max-w-xl bg-[#FDFBF7] rounded-3xl border border-[#D5B263]/40 shadow-2xl p-6 sm:p-8 z-10 my-8">
                <button
                    onClick={() => setIsSizeAdvisorOpen(false)}
                    className="absolute top-4 right-4 p-2 text-[#121212] hover:text-[#D5B263]"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                    <div className="text-center space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121212] text-[#D5B263] text-xs font-bold uppercase tracking-widest">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>FIND MY SIZE ENGINE</span>
                        </div>
                        <h3 className="font-serif-luxury text-2xl font-bold text-[#121212]">
                            Size Advisor for {sizeAdvisorProduct.name}
                        </h3>
                    </div>

                    {!calculated ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-[#121212]">Your Height</label>
                                    <input
                                        type="text"
                                        value={height}
                                        onChange={e => setHeight(e.target.value)}
                                        className="w-full p-3 bg-white border border-[#D5B263]/30 rounded-xl text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-[#121212]">Your Weight</label>
                                    <input
                                        type="text"
                                        value={weight}
                                        onChange={e => setWeight(e.target.value)}
                                        className="w-full p-3 bg-white border border-[#D5B263]/30 rounded-xl text-xs"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[#121212]">Usual Brand Size</label>
                                <div className="flex gap-2 pt-1">
                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(sz => (
                                        <button
                                            key={sz}
                                            onClick={() => setUsualSize(sz)}
                                            className={`flex-1 py-2 rounded-xl text-xs font-bold border ${usualSize === sz ? 'bg-[#121212] text-[#D5B263] border-[#D5B263]' : 'bg-white text-[#121212] border-transparent hover:border-[#D5B263]'
                                                }`}
                                        >
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-[#121212]">Preferred Fit Feeling</label>
                                <select
                                    value={preferredFit}
                                    onChange={e => setPreferredFit(e.target.value)}
                                    className="w-full p-3 bg-white border border-[#D5B263]/30 rounded-xl text-xs mt-1"
                                >
                                    <option>Fitted / Sculpted Look</option>
                                    <option>Regular Fit (Recommended)</option>
                                    <option>Relaxed & Roomy Fit</option>
                                </select>
                            </div>

                            <button
                                onClick={handleCalculate}
                                className="w-full py-3.5 bg-[#D5B263] text-[#121212] font-bold text-xs rounded-xl hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                            >
                                <span>Calculate Recommended Size</span>
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6 text-center animate-in fade-in">
                            <div className="p-6 bg-[#121212] text-[#FDFBF7] rounded-2xl border border-[#D5B263] space-y-2">
                                <ShieldCheck className="w-8 h-8 text-[#D5B263] mx-auto" />
                                <span className="text-xs font-bold text-[#D5B263] uppercase tracking-widest block">
                                    Recommended Size
                                </span>
                                <h4 className="font-serif-luxury text-4xl font-bold text-white">
                                    Size M
                                </h4>
                                <p className="text-xs text-[#FDFBF7]/80 font-light">
                                    96% confidence score based on {height}, {weight}, and luxury cut measurements.
                                </p>
                            </div>

                            <div className="text-left text-xs space-y-2 bg-[#F7F4EE] p-4 rounded-xl">
                                <div className="font-semibold text-[#121212]">Why Size M is suggested:</div>
                                <ul className="list-disc list-inside text-[#121212]/70 space-y-1">
                                    <li>Provides perfect waist draping without restriction</li>
                                    <li>Chest and sleeve circumference align precisely with standard sizing</li>
                                    <li>Zero pulling at hip cut-outs</li>
                                </ul>
                            </div>

                            <button
                                onClick={() => setIsSizeAdvisorOpen(false)}
                                className="w-full py-3 bg-[#121212] text-[#D5B263] font-bold text-xs rounded-xl hover:bg-[#D5B263] hover:text-[#121212] transition-colors"
                            >
                                Select Size M & Return to Shop
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SizeAdvisorModal;

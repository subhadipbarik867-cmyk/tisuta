import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, ShoppingBag, Heart, ArrowRight, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { getImgUrl } from '../../utils/imageUtils';

export const TisutaAiStylistModal = ({ onSelectProduct }) => {
    const { isStylistOpen, setIsStylistOpen, stylistChat, sendStylistMessage, products, addToCart } = useShop();
    const [inputValue, setInputValue] = useState('');

    if (!isStylistOpen) return null;

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        sendStylistMessage(inputValue);
        setInputValue('');
    };

    const quickPrompts = [
        'What should I wear to a wedding?',
        'Build me an office outfit under ₹3000',
        'Give me a complete date-night outfit',
        'Which dress suits an hourglass body profile?',
        'Show me minimal midi dress with matching shoes'
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                onClick={() => setIsStylistOpen(false)}
                className="fixed inset-0 bg-[#121212]/80 backdrop-blur-md"
            />

            {/* Stylist Window */}
            <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl border border-[#D5B263]/40 shadow-2xl overflow-hidden z-10 flex flex-col h-[650px] max-h-[90vh]">
                
                {/* Header */}
                <div className="px-6 py-4 bg-[#121212] text-white flex items-center justify-between border-b border-[#D5B263]/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D5B263] to-[#8C6D58] p-0.5 flex items-center justify-center shadow-md">
                            <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-[#D5B263]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-serif-luxury text-base font-bold text-white">
                                    TISUTA AI Stylist Concierge
                                </h3>
                                <span className="px-2 py-0.5 bg-[#D5B263]/20 border border-[#D5B263]/40 text-[#D5B263] text-[9px] font-bold uppercase rounded-full">
                                    Live Haute AI
                                </span>
                            </div>
                            <p className="text-[10px] text-white/60">
                                Powered by neural style graphs & haute-couture silhouette models
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsStylistOpen(false)}
                        className="p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Chat Stream */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {stylistChat.map((msg, idx) => {
                        const isAi = msg.sender === 'ai';
                        const suggestedProducts = msg.suggestedOutfits
                            ? products.filter(p => msg.suggestedOutfits.includes(p.id))
                            : [];

                        return (
                            <div
                                key={idx}
                                className={`flex flex-col ${isAi ? 'items-start' : 'items-end'} space-y-2`}
                            >
                                <div className="flex items-center gap-2 text-[10px] text-[#121212]/50 font-bold uppercase tracking-wider">
                                    <span>{isAi ? '✦ TISUTA Stylist' : 'You'}</span>
                                    <span>•</span>
                                    <span>{msg.timestamp}</span>
                                </div>

                                <div
                                    className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                                        isAi
                                            ? 'bg-white text-[#121212] border border-[#D5B263]/30 shadow-sm'
                                            : 'bg-[#121212] text-[#FDFBF7]'
                                    }`}
                                >
                                    {msg.text}
                                </div>

                                {/* Shoppable Outfit Cards */}
                                {isAi && suggestedProducts.length > 0 && (
                                    <div className="w-full max-w-[90%] grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                        {suggestedProducts.map(prod => (
                                            <div
                                                key={prod.id}
                                                className="p-3 bg-white rounded-2xl border border-[#D5B263]/30 shadow-sm flex flex-col justify-between"
                                            >
                                                <div className="flex gap-3">
                                                    <img
                                                        src={getImgUrl(prod.images[0])}
                                                        alt={prod.name}
                                                        className="w-16 h-20 object-cover rounded-xl flex-shrink-0"
                                                    />
                                                    <div className="space-y-1 min-w-0">
                                                        <span className="text-[9px] font-bold text-[#D5B263] uppercase tracking-wider block">
                                                            {prod.brand}
                                                        </span>
                                                        <h5 className="font-serif-luxury text-xs font-bold text-[#121212] line-clamp-1">
                                                            {prod.name}
                                                        </h5>
                                                        <span className="text-xs font-bold text-[#121212] block">
                                                            ₹{prod.price.toLocaleString('en-IN')}
                                                        </span>
                                                        <span className="text-[9px] text-[#121212]/60 block font-light">
                                                            Fit: {prod.fit}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 mt-3 pt-2 border-t border-[#D5B263]/15">
                                                    <button
                                                        onClick={() => {
                                                            setIsStylistOpen(false);
                                                            if (onSelectProduct) onSelectProduct(prod);
                                                        }}
                                                        className="flex-1 py-1.5 bg-[#F7F4EE] text-[#121212] font-bold text-[10px] rounded-lg border border-[#D5B263]/30 hover:bg-[#121212] hover:text-[#D5B263] transition-colors"
                                                    >
                                                        Inspect
                                                    </button>
                                                    <button
                                                        onClick={() => addToCart(prod, 'M', prod.colors[0], 1)}
                                                        className="flex-1 py-1.5 bg-[#121212] text-[#D5B263] font-bold text-[10px] rounded-lg hover:bg-[#D5B263] hover:text-[#121212] transition-colors flex items-center justify-center gap-1"
                                                    >
                                                        <ShoppingBag className="w-3 h-3" />
                                                        <span>Add</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Prompt Suggestions */}
                <div className="px-6 py-2 bg-white/60 border-t border-[#D5B263]/20 flex gap-2 overflow-x-auto scrollbar-none">
                    {quickPrompts.map((p, i) => (
                        <button
                            key={i}
                            onClick={() => sendStylistMessage(p)}
                            className="px-3 py-1 bg-white border border-[#D5B263]/30 rounded-full text-[10px] font-medium text-[#121212] whitespace-nowrap hover:bg-[#121212] hover:text-[#D5B263] transition-all"
                        >
                            {p}
                        </button>
                    ))}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-4 bg-white border-t border-[#D5B263]/25 flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="Ask for an outfit, occasion styling, or budget alternative..."
                        className="flex-1 px-4 py-3 bg-[#F7F4EE] border border-[#D5B263]/40 rounded-xl text-xs font-medium text-[#121212] focus:outline-none focus:border-[#D5B263]"
                    />
                    <button
                        type="submit"
                        className="px-5 py-3 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                        <span>Style Me</span>
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TisutaAiStylistModal;

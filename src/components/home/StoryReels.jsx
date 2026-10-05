import React, { useState, useEffect } from 'react';
import { Sparkles, Play, X, ShoppingBag, ArrowRight, Heart, Volume2, VolumeX } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const STORY_DATA = [
    {
        id: 'story-1',
        title: 'Paris Runway 2026',
        author: 'Vogue Spotlight',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        media: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
        tag: 'Red Carpet Edits',
        productName: 'Aurelia Champagne Silk Draped Slip Dress',
        price: 14999,
        productId: 'tisuta-001'
    },
    {
        id: 'story-2',
        title: 'Zardozi Heritage',
        author: 'Artisanal Craft',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
        media: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
        tag: 'Festive Royal',
        productName: 'Kashmiri Zardozi Velvet Anarkali Set',
        price: 28999,
        productId: 'tisuta-002'
    },
    {
        id: 'story-3',
        title: 'Virtual Fit 3D',
        author: 'AI Tech Lab',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        media: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
        tag: '3D Simulation',
        productName: 'Verona Sculpted Corset Gown',
        price: 19999,
        productId: 'tisuta-006'
    },
    {
        id: 'story-4',
        title: 'Executive Luxe',
        author: 'Power Dressing',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop',
        media: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
        tag: 'Office Luxe',
        productName: 'Lumière Ivory Pleated Co-ord Set',
        price: 11999,
        productId: 'tisuta-004'
    },
    {
        id: 'story-5',
        title: 'French Net Couture',
        author: 'Atelier Tisuta',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
        media: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
        tag: 'Sheer Net Edit',
        productName: 'Elysian Sheer Embroidered French Illusion Net Top',
        price: 1499,
        productId: 'tp-net-sheer'
    }
];

export const StoryReels = () => {
    const { products, addToCart, openVirtualFit } = useShop();
    const [activeStory, setActiveStory] = useState(null);
    const [storyIndex, setStoryIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!activeStory) return;
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    handleNextStory();
                    return 0;
                }
                return prev + 2.5;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [activeStory, storyIndex]);

    const handleOpenStory = (story, idx) => {
        setActiveStory(story);
        setStoryIndex(idx);
        setProgress(0);
    };

    const handleNextStory = () => {
        if (storyIndex < STORY_DATA.length - 1) {
            setStoryIndex((prev) => prev + 1);
            setActiveStory(STORY_DATA[storyIndex + 1]);
            setProgress(0);
        } else {
            setActiveStory(null);
        }
    };

    const handlePrevStory = () => {
        if (storyIndex > 0) {
            setStoryIndex((prev) => prev - 1);
            setActiveStory(STORY_DATA[storyIndex - 1]);
            setProgress(0);
        }
    };

    const currentProduct = products.find((p) => p.id === activeStory?.productId) || products[0];

    return (
        <div className="w-full bg-[#0A0908] py-4 border-b border-[#D5B263]/20 overflow-x-auto select-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4 sm:gap-6 no-scrollbar">

                {/* Studio Badge */}
                <div className="flex flex-col items-center justify-center flex-shrink-0 pr-3 border-r border-white/10">
                    <div className="w-12 h-12 rounded-full bg-[#D5B263]/20 border border-[#D5B263] flex items-center justify-center text-[#D5B263] mb-1 shadow-lg">
                        <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-bold text-[#D5B263] tracking-widest uppercase">
                        STUDIO
                    </span>
                </div>

                {/* Story Circle Reels */}
                {STORY_DATA.map((story, idx) => (
                    <button
                        key={story.id}
                        onClick={() => handleOpenStory(story, idx)}
                        className="flex flex-col items-center gap-1.5 flex-shrink-0 group focus:outline-none cursor-pointer"
                    >
                        <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#D5B263] via-amber-200 to-[#4A1525] group-hover:scale-105 transition-transform duration-300 shadow-md">
                            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-black bg-black p-0.5">
                                <img
                                    src={story.media}
                                    alt={story.title}
                                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="absolute bottom-0 right-0 p-1 bg-[#D5B263] text-[#121212] rounded-full shadow-md">
                                <Play className="w-2.5 h-2.5 fill-[#121212]" />
                            </div>
                        </div>
                        <span className="text-[11px] font-medium text-[#FDFBF7]/90 tracking-wide line-clamp-1 max-w-[70px] text-center">
                            {story.title}
                        </span>
                    </button>
                ))}

            </div>

            {/* Full Screen Story Modal */}
            {activeStory && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
                    <div className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-[#D5B263]/40 flex flex-col justify-between p-5 text-white">

                        {/* Story Top Progress Bar */}
                        <div className="absolute top-3 left-4 right-4 z-20 flex gap-1.5">
                            {STORY_DATA.map((s, idx) => (
                                <div key={s.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#D5B263] transition-all duration-100 ease-linear"
                                        style={{
                                            width:
                                                idx === storyIndex
                                                    ? `${progress}%`
                                                    : idx < storyIndex
                                                        ? '100%'
                                                        : '0%'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Story Top Author Header */}
                        <div className="relative z-20 flex items-center justify-between pt-4">
                            <div className="flex items-center gap-2.5">
                                <img src={activeStory.avatar} alt="" className="w-9 h-9 rounded-full border border-[#D5B263]" />
                                <div>
                                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                        <span>{activeStory.title}</span>
                                        <span className="px-2 py-0.5 bg-[#D5B263] text-[#121212] text-[9px] font-bold uppercase rounded-full">
                                            {activeStory.tag}
                                        </span>
                                    </div>
                                    <div className="text-[10px] text-gray-300 font-light">{activeStory.author}</div>
                                </div>
                            </div>

                            <button
                                onClick={() => setActiveStory(null)}
                                className="p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Background Story Image/Media */}
                        <img
                            src={activeStory.media}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

                        {/* Click Navigation Handlers Left / Right */}
                        <div className="absolute inset-0 z-10 flex">
                            <div className="w-1/2 h-full cursor-pointer" onClick={handlePrevStory} />
                            <div className="w-1/2 h-full cursor-pointer" onClick={handleNextStory} />
                        </div>

                        {/* Bottom Shoppable Product Card Overlay */}
                        <div className="relative z-20 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-[#D5B263]/40 space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-[#D5B263] uppercase tracking-widest block">
                                        Featured Runway Garment
                                    </span>
                                    <h4 className="font-serif-luxury text-sm font-bold text-white line-clamp-1">
                                        {activeStory.productName}
                                    </h4>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-[#D5B263]">
                                        ₹{activeStory.price.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        addToCart(currentProduct, 'M', currentProduct.colors[0], 1);
                                        setActiveStory(null);
                                    }}
                                    className="flex-1 py-2.5 bg-[#D5B263] text-[#121212] font-bold text-xs rounded-xl hover:bg-[#C5A059] transition-all flex items-center justify-center gap-1.5 shadow-lg"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    <span>Shop Look Now</span>
                                </button>

                                <button
                                    onClick={() => {
                                        setActiveStory(null);
                                        openVirtualFit(currentProduct);
                                    }}
                                    className="px-3 py-2.5 bg-white/20 text-white rounded-xl hover:bg-white/30 text-xs font-bold flex items-center gap-1"
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-[#D5B263]" />
                                    <span>3D Try-On</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default StoryReels;

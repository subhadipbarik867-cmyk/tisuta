import React, { useState, useEffect } from 'react';
import { Sparkles, Play, X, ShoppingBag, ArrowRight, Heart, Crown, Volume2, VolumeX } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { getImgUrl } from '../../utils/imageUtils';

const STORY_DATA = [
    {
        id: 'story-1',
        title: 'Minimal Midi',
        author: 'Tisuta Atelier',
        avatar: getImgUrl('/images/products/minimal_midi_1.jpg'),
        media: getImgUrl('/images/products/minimal_midi_1.jpg'),
        tag: 'Minimal Midi',
        productName: 'Minimal Champagne Satin Midi Dress',
        price: 1499,
        productId: 'dr-minimal-midi-01'
    },
    {
        id: 'story-2',
        title: 'Royal Ethnic',
        author: 'Heritage Edit',
        avatar: getImgUrl('/images/products/ethnic_sets_1.jpg'),
        media: getImgUrl('/images/products/ethnic_sets_1.jpg'),
        tag: 'Royal Ethnic Set',
        productName: 'Kashmiri Tilla Embroidered Royal Anarkali Set',
        price: 1899,
        productId: 'es-anarkali-01'
    },
    {
        id: 'story-3',
        title: 'Silk Slip',
        author: 'Couture Slip',
        avatar: getImgUrl('/images/products/slip_style_1.jpg'),
        media: getImgUrl('/images/products/slip_style_1.jpg'),
        tag: 'Slip Style',
        productName: 'Mulberry Silk Cowl-Neck Slip Dress',
        price: 1299,
        productId: 'dr-slip-cowl-01'
    },
    {
        id: 'story-4',
        title: 'Off-Shoulder',
        author: 'Runway Bardot',
        avatar: getImgUrl('/images/products/off_shoulder_1.jpg'),
        media: getImgUrl('/images/products/off_shoulder_1.jpg'),
        tag: 'Off-Shoulder Top',
        productName: 'Bardot Ruched Off-Shoulder Top',
        price: 699,
        productId: 'tp-offshoulder-01'
    },
    {
        id: 'story-5',
        title: 'French Net Top',
        author: 'Net Er Couture',
        avatar: getImgUrl('/images/products/net_top_1.jpg'),
        media: getImgUrl('/images/products/net_top_1.jpg'),
        tag: 'Net Er Top',
        productName: 'Sheer French Illusion Net Er Top',
        price: 799,
        productId: 'tp-net-sheer-01'
    },
    {
        id: 'story-6',
        title: 'Peplum Kurti',
        author: 'Atelier Kurti',
        avatar: getImgUrl('/images/products/short_kurti_1.jpg'),
        media: getImgUrl('/images/products/short_kurti_1.jpg'),
        tag: 'Short Kurti',
        productName: 'Handblock Printed Flared Peplum Short Kurti',
        price: 899,
        productId: 'es-short-kurti-01'
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
        <div className="w-full bg-white/95 backdrop-blur-xl py-4 border-b border-[#D4AF37]/30 overflow-x-auto select-none shadow-[0_4px_25px_rgba(212,175,55,0.06)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4 sm:gap-6 no-scrollbar">

                {/* Studio Royale Badge */}
                <div className="flex flex-col items-center justify-center flex-shrink-0 pr-4 border-r border-[#D4AF37]/25">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#9E7D23] via-[#D4AF37] to-[#F5D77F] p-0.5 flex items-center justify-center shadow-md">
                        <div className="w-full h-full bg-[#141210] rounded-full flex items-center justify-center text-[#F5D77F]">
                            <Crown className="w-5 h-5 animate-pulse" />
                        </div>
                    </div>
                    <span className="text-[9px] font-cinzel font-black text-[#9E7D23] tracking-[0.25em] uppercase mt-1">
                        ROYALE
                    </span>
                </div>

                {/* Story Circle Reels */}
                {STORY_DATA.map((story, idx) => (
                    <button
                        key={story.id}
                        onClick={() => handleOpenStory(story, idx)}
                        className="flex flex-col items-center gap-1.5 flex-shrink-0 group focus:outline-none cursor-pointer"
                    >
                        <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-[#9E7D23] via-[#F5D77F] to-[#D4AF37] group-hover:scale-108 transition-all duration-300 shadow-[0_4px_14px_rgba(212,175,55,0.3)]">
                            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-white bg-white p-0.5 shadow-inner">
                                <img
                                    src={story.media}
                                    alt={story.title}
                                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="absolute bottom-0 right-0 p-1 bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#141210] rounded-full shadow-md border border-white">
                                <Play className="w-2.5 h-2.5 fill-[#141210]" />
                            </div>
                        </div>
                        <span className="text-[11px] font-cinzel font-semibold text-[#141210] tracking-wide line-clamp-1 max-w-[76px] text-center group-hover:text-[#9E7D23] transition-colors">
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

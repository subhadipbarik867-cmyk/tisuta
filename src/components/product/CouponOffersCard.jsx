import React, { useState } from 'react';
import { Tag, Check, Copy, Percent, Sparkles, ShieldAlert } from 'lucide-react';

export const CouponOffersCard = () => {
    const [copiedCode, setCopiedCode] = useState(null);

    const offers = [
        {
            code: 'TISUTA10',
            title: '10% Instant Couture Discount',
            description: 'Flat 10% OFF on all high fashion orders above ₹5,000.',
            discountText: '10% OFF',
            color: 'border-[#C5A059] bg-[#C5A059]/5'
        },
        {
            code: 'AJIOLUXE15',
            title: '15% Luxe Wardrobe Savings',
            description: 'Save 15% on orders above ₹10,000 across Ethnic & Gowns.',
            discountText: '15% OFF',
            color: 'border-stone-900 bg-stone-900/5'
        },
        {
            code: 'BANK500',
            title: 'Instant Bank Cashback',
            description: 'Flat ₹500 instant discount on HDFC / ICICI Credit Cards.',
            discountText: '₹500 OFF',
            color: 'border-emerald-700 bg-emerald-50'
        }
    ];

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2500);
    };

    return (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#C5A059]" />
                    <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                        Best Offers & Coupons
                    </h3>
                </div>
                <span className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase">
                    3 Applicable
                </span>
            </div>

            <div className="space-y-3">
                {offers.map((offer) => (
                    <div
                        key={offer.code}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${offer.color}`}
                    >
                        <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-stone-900 text-white font-mono font-bold text-[10px] rounded tracking-widest">
                                    {offer.code}
                                </span>
                                <span className="text-xs font-bold text-stone-900 truncate">
                                    {offer.title}
                                </span>
                            </div>
                            <p className="text-[11px] text-stone-500 font-light truncate">
                                {offer.description}
                            </p>
                        </div>

                        <button
                            onClick={() => handleCopy(offer.code)}
                            className="flex-shrink-0 px-3 py-1.5 bg-stone-900 text-white hover:bg-[#C5A059] hover:text-stone-900 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                        >
                            {copiedCode === offer.code ? (
                                <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span>Applied</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CouponOffersCard;

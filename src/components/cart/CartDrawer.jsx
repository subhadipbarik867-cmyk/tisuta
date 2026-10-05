import React, { useState } from 'react';
import { 
    X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag, Gift, 
    Sparkles, Check, Truck, Heart 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { getImgUrl } from '../../utils/imageUtils';

export const CartDrawer = ({ onNavigateCheckout }) => {
    const {
        isCartOpen,
        setIsCartOpen,
        cart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        cartTotal,
        cartSubtotal,
        cartMRP,
        cartSavings,
        couponDiscount,
        activeCoupon,
        applyCoupon,
        removeCoupon,
        giftWrap,
        setGiftWrap,
        isFreeShipping,
        freeShippingThreshold,
        shippingFee
    } = useShop();

    const [couponInput, setCouponInput] = useState('');
    const [couponFeedback, setCouponFeedback] = useState(null);

    if (!isCartOpen) return null;

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const progressToFreeShipping = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
    const amountNeededForFree = Math.max(0, freeShippingThreshold - cartSubtotal);

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (!couponInput.trim()) return;
        const result = applyCoupon(couponInput);
        setCouponFeedback(result);
        if (result.success) setCouponInput('');
    };

    const promoPills = ['TISUTA10', 'TISUTAFIRST', 'ROYAL20', 'FESTIVE50'];

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-[#121212]/70 backdrop-blur-sm transition-opacity"
            />

            {/* Slide-Over Drawer */}
            <div className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl z-10 flex flex-col border-l border-[#D5B263]/30">
                
                {/* Header */}
                <div className="px-6 py-5 bg-[#121212] text-white flex items-center justify-between border-b border-[#D5B263]/30">
                    <div className="flex items-center gap-2.5">
                        <ShoppingBag className="w-5 h-5 text-[#D5B263]" />
                        <h3 className="font-serif-luxury text-lg font-bold">
                            Haute Wardrobe Bag ({cartCount})
                        </h3>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-1.5 text-white/60 hover:text-white rounded-full hover:bg-white/10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Free Delivery Progress Indicator */}
                <div className="p-4 bg-white border-b border-[#D5B263]/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#121212]">
                        <span className="flex items-center gap-1.5">
                            <Truck className="w-4 h-4 text-[#D5B263]" />
                            {isFreeShipping ? (
                                <span className="text-green-700">✓ Complimentary Express Shipping Unlocked!</span>
                            ) : (
                                <span>Add ₹{amountNeededForFree.toLocaleString('en-IN')} for Free Express Delivery</span>
                            )}
                        </span>
                        <span className="text-[#D5B263]">{progressToFreeShipping}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#D5B263] to-[#B89647] transition-all duration-500 rounded-full"
                            style={{ width: `${progressToFreeShipping}%` }}
                        />
                    </div>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cart.length === 0 ? (
                        <div className="text-center py-20 space-y-4">
                            <ShoppingBag className="w-14 h-14 text-[#D5B263]/40 mx-auto" />
                            <h4 className="font-serif-luxury text-xl font-bold text-[#121212]">
                                Your Wardrobe Bag is Empty
                            </h4>
                            <p className="text-xs text-[#121212]/60 max-w-xs mx-auto">
                                Explore our minimal midi dresses, cowl satin slips, or royal Chanderi sets.
                            </p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="px-6 py-2.5 bg-[#121212] text-[#D5B263] font-bold text-xs rounded-xl shadow-md"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map((item, idx) => (
                            <div
                                key={`${item.product.id}-${item.size}-${item.color.name}-${idx}`}
                                className="p-3.5 bg-white rounded-2xl border border-[#D5B263]/25 shadow-sm flex gap-3 relative group"
                            >
                                <img
                                    src={getImgUrl(item.product.images[0])}
                                    alt={item.product.name}
                                    className="w-18 h-24 object-cover rounded-xl border border-stone-100 flex-shrink-0"
                                />

                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <span className="text-[9px] font-bold text-[#D5B263] uppercase tracking-wider block">
                                                {item.product.brand}
                                            </span>
                                            <h5 className="font-serif-luxury text-xs font-bold text-[#121212] line-clamp-1">
                                                {item.product.name}
                                            </h5>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id, item.size, item.color.name)}
                                            className="text-stone-400 hover:text-red-600 transition-colors p-1"
                                            title="Remove item"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    <div className="text-[11px] text-[#121212]/70 flex items-center gap-3">
                                        <span>Size: <strong>{item.size}</strong></span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <span
                                                className="w-2.5 h-2.5 rounded-full inline-block border border-black/20"
                                                style={{ backgroundColor: item.color.hex }}
                                            />
                                            {item.color.name}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-1">
                                        <div className="flex items-center border border-stone-200 rounded-lg bg-[#F7F4EE]">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.size, item.color.name, -1)}
                                                className="px-2.5 py-0.5 text-xs font-bold text-[#121212] hover:bg-stone-200 rounded-l-lg"
                                            >
                                                -
                                            </button>
                                            <span className="px-2 text-xs font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.size, item.color.name, 1)}
                                                className="px-2.5 py-0.5 text-xs font-bold text-[#121212] hover:bg-stone-200 rounded-r-lg"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <span className="font-serif-luxury text-sm font-bold text-[#121212]">
                                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Bottom Financials & Checkout Actions */}
                {cart.length > 0 && (
                    <div className="p-5 bg-white border-t border-[#D5B263]/30 space-y-4">
                        
                        {/* Coupon Engine */}
                        <div className="space-y-2">
                            {activeCoupon ? (
                                <div className="flex items-center justify-between p-2.5 bg-green-50 border border-green-200 rounded-xl text-xs">
                                    <div className="flex items-center gap-2">
                                        <Tag className="w-3.5 h-3.5 text-green-700" />
                                        <div>
                                            <span className="font-bold text-green-800">{activeCoupon.code}</span>
                                            <span className="text-[10px] text-green-700 block">{activeCoupon.description}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={removeCoupon}
                                        className="text-[10px] font-bold text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Promo Code (e.g. TISUTAFIRST)"
                                        value={couponInput}
                                        onChange={e => setCouponInput(e.target.value)}
                                        className="flex-1 px-3 py-2 bg-[#F7F4EE] border border-stone-200 rounded-xl text-xs uppercase font-bold"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-[#121212] text-[#D5B263] rounded-xl text-xs font-bold cursor-pointer"
                                    >
                                        Apply
                                    </button>
                                </form>
                            )}

                            {couponFeedback && (
                                <p className={`text-[10px] font-semibold ${couponFeedback.success ? 'text-green-700' : 'text-red-600'}`}>
                                    {couponFeedback.message}
                                </p>
                            )}
                        </div>

                        {/* Gift Wrapping Toggle */}
                        <div className="flex items-center justify-between p-2.5 bg-[#F7F4EE] rounded-xl border border-[#D5B263]/20 text-xs">
                            <label className="flex items-center gap-2 cursor-pointer font-medium">
                                <input
                                    type="checkbox"
                                    checked={giftWrap.enabled}
                                    onChange={e => setGiftWrap({ ...giftWrap, enabled: e.target.checked })}
                                    className="accent-[#121212]"
                                />
                                <Gift className="w-3.5 h-3.5 text-[#D5B263]" />
                                <span>Privé Gold Box Gift Wrapping (+₹250)</span>
                            </label>
                        </div>

                        {/* Financial Ledger */}
                        <div className="space-y-1.5 text-xs text-[#121212]/80 border-t border-stone-100 pt-3">
                            <div className="flex justify-between">
                                <span>Subtotal (MRP Value)</span>
                                <span>₹{cartMRP.toLocaleString('en-IN')}</span>
                            </div>
                            {cartSavings > 0 && (
                                <div className="flex justify-between text-green-700 font-medium">
                                    <span>Atelier Savings & Promotions</span>
                                    <span>- ₹{cartSavings.toLocaleString('en-IN')}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span>White-Glove Express Shipping</span>
                                <span>{shippingFee === 0 ? <strong className="text-green-700 font-bold uppercase text-[10px]">Complimentary</strong> : `₹${shippingFee}`}</span>
                            </div>
                            {giftWrap.enabled && (
                                <div className="flex justify-between">
                                    <span>Privé Gift Wrapping</span>
                                    <span>₹{giftWrap.cost}</span>
                                </div>
                            )}
                            <div className="flex justify-between font-serif-luxury text-base font-bold text-[#121212] pt-2 border-t border-stone-200">
                                <span>Final Order Value</span>
                                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        {/* Checkout CTA */}
                        <button
                            onClick={() => {
                                setIsCartOpen(false);
                                onNavigateCheckout();
                            }}
                            className="w-full py-4 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] font-bold text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <span>Proceed to Secure Checkout</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;

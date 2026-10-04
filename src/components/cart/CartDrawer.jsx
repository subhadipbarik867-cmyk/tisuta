import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Truck, Tag, ShieldCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartDrawer = ({ onNavigateCheckout }) => {
    const {
        isCartOpen,
        setIsCartOpen,
        cart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartMRP,
        cartSavings,
        isFreeShipping,
        freeShippingThreshold
    } = useShop();

    const [coupon, setCoupon] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);
    const [couponError, setCouponError] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');

    if (!isCartOpen) return null;

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (coupon.trim().toUpperCase() === 'TISUTA10') {
            setDiscountPercent(10);
            setCouponSuccess('10% VIP Luxury Discount Applied!');
            setCouponError('');
        } else if (coupon.trim().toUpperCase() === 'LUXURY20') {
            setDiscountPercent(20);
            setCouponSuccess('20% Privé Discount Applied!');
            setCouponError('');
        } else {
            setCouponError('Invalid coupon code. Try TISUTA10 or LUXURY20.');
            setCouponSuccess('');
        }
    };

    const finalPrice = cartTotal * (1 - discountPercent / 100);
    const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
    const shippingPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-[#121212]/75 backdrop-blur-sm transition-opacity animate-in fade-in"
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FDFBF7] shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 border-l border-[#D5B263]/30">

                {/* Header */}
                <div className="p-6 bg-[#121212] text-[#FDFBF7] flex items-center justify-between border-b border-[#D5B263]/30">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-[#D5B263]" />
                        <h3 className="font-serif-luxury text-xl font-bold text-[#FDFBF7]">
                            Shopping Wardrobe ({cart.reduce((a, b) => a + b.quantity, 0)})
                        </h3>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 text-[#FDFBF7]/70 hover:text-[#D5B263] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Free Shipping Progress Bar */}
                <div className="p-4 bg-[#F7F4EE] border-b border-[#D5B263]/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                        <div className="flex items-center gap-1.5 text-[#121212]">
                            <Truck className="w-4 h-4 text-[#D5B263]" />
                            <span>
                                {isFreeShipping
                                    ? '✓ You unlocked Complimentary Luxury Shipping!'
                                    : `Add ₹${amountToFreeShipping.toLocaleString('en-IN')} more for Free Express Delivery`}
                            </span>
                        </div>
                    </div>

                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#D5B263] transition-all duration-500 rounded-full"
                            style={{ width: `${shippingPercent}%` }}
                        />
                    </div>
                </div>

                {/* Cart Items List */}
                <div className="p-6 overflow-y-auto flex-1 space-y-4">
                    {cart.length > 0 ? (
                        cart.map((item, idx) => (
                            <div
                                key={`${item.product.id}-${item.size}-${item.color.name}`}
                                className="flex gap-4 p-4 bg-white rounded-2xl border border-[#D5B263]/20 shadow-sm relative group"
                            >
                                <img
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    className="w-20 h-24 object-cover rounded-xl bg-[#F7F4EE]"
                                />

                                <div className="flex-1 space-y-1.5">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-[9px] uppercase font-bold text-[#D5B263] block">
                                                {item.product.brand}
                                            </span>
                                            <h4 className="font-serif-luxury text-sm font-semibold text-[#121212] line-clamp-1">
                                                {item.product.name}
                                            </h4>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.product.id, item.size, item.color.name)}
                                            className="text-[#121212]/40 hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-[#121212]/60">
                                        <span>Size: <strong className="text-[#121212]">{item.size}</strong></span>
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                            <span className="w-2.5 h-2.5 rounded-full border" style={{ backgroundColor: item.color.hex }} />
                                            <span>{item.color.name}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-sm font-bold text-[#121212]">
                                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                                        </span>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center border border-[#121212]/20 rounded-lg overflow-hidden bg-[#F7F4EE]">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.size, item.color.name, -1)}
                                                className="p-1 hover:bg-[#D5B263] hover:text-[#121212] text-[#121212] transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="px-2.5 text-xs font-bold text-[#121212]">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.size, item.color.name, 1)}
                                                className="p-1 hover:bg-[#D5B263] hover:text-[#121212] text-[#121212] transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-16 text-center space-y-3">
                            <ShoppingBag className="w-12 h-12 text-[#D5B263] mx-auto opacity-50" />
                            <h4 className="font-serif-luxury text-lg font-semibold text-[#121212]">
                                Your Wardrobe is Waiting
                            </h4>
                            <p className="text-xs text-[#121212]/60 max-w-xs mx-auto">
                                Explore our fine silk gowns, zardozi kurtas, and tailored co-ords.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Summary & Checkout */}
                {cart.length > 0 && (
                    <div className="p-6 bg-white border-t border-[#D5B263]/30 space-y-4 shadow-xl">
                        {/* Promo Code Form */}
                        <form onSubmit={handleApplyCoupon} className="flex gap-2">
                            <div className="relative flex-1">
                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D5B263]" />
                                <input
                                    type="text"
                                    placeholder="Promo Code (TISUTA10)"
                                    value={coupon}
                                    onChange={e => setCoupon(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 bg-[#F7F4EE] border border-[#D5B263]/30 rounded-xl text-xs uppercase font-medium focus:outline-none focus:border-[#D5B263]"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#121212] text-[#D5B263] font-bold text-xs rounded-xl hover:bg-[#D5B263] hover:text-[#121212] transition-colors"
                            >
                                Apply
                            </button>
                        </form>

                        {couponSuccess && <p className="text-[11px] text-green-700 font-semibold">{couponSuccess}</p>}
                        {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}

                        {/* Price Calculations */}
                        <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between text-[#121212]/70">
                                <span>Subtotal MRP</span>
                                <span>₹{cartMRP.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-green-700 font-medium">
                                <span>Catalogue Discount</span>
                                <span>-₹{cartSavings.toLocaleString('en-IN')}</span>
                            </div>
                            {discountPercent > 0 && (
                                <div className="flex justify-between text-[#D5B263] font-bold">
                                    <span>VIP Promo ({discountPercent}%)</span>
                                    <span>-₹{((cartTotal * discountPercent) / 100).toLocaleString('en-IN')}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-[#121212]/70">
                                <span>Luxury Express Shipping</span>
                                <span>{isFreeShipping ? 'FREE' : '₹250'}</span>
                            </div>
                            <div className="flex justify-between text-base font-bold text-[#121212] pt-2 border-t border-[#D5B263]/20">
                                <span>Final Amount</span>
                                <span>₹{(finalPrice + (isFreeShipping ? 0 : 250)).toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        {/* Checkout CTA */}
                        <button
                            onClick={() => {
                                setIsCartOpen(false);
                                onNavigateCheckout();
                            }}
                            className="w-full py-4 bg-[#D5B263] text-[#121212] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                        >
                            <span>PROCEED TO CHECKOUT</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default CartDrawer;

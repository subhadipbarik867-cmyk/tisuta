import React, { useState } from 'react';
import { 
    ShieldCheck, Truck, CreditCard, Check, ArrowRight, Lock, Sparkles, 
    MapPin, Smartphone, Landmark, Banknote, QrCode, FileText, ChevronRight, Gift 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import { getImgUrl } from '../utils/imageUtils';

export const CheckoutPage = ({ onNavigatePage }) => {
    const { 
        cart, 
        cartTotal, 
        cartSubtotal, 
        cartMRP, 
        cartSavings, 
        shippingFee, 
        giftWrap, 
        activeCoupon, 
        loyalty, 
        user, 
        createOrder 
    } = useShop();

    const [step, setStep] = useState(1); // 1: Address, 2: Delivery, 3: Payment, 4: Confirmation
    const [selectedAddressId, setSelectedAddressId] = useState(user.addresses[0]?.id || 'addr-1');
    const [deliverySpeed, setDeliverySpeed] = useState('express'); // 'express' or 'standard'
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
    const [completedOrder, setCompletedOrder] = useState(null);

    // New Address Form
    const [addressForm, setAddressForm] = useState({
        fullName: user.name || 'Ananya Roy',
        phone: user.phone || '+91 98765 43210',
        addressLine: 'Apt 4B, Empire Heights, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050'
    });

    // Mock Card form
    const [cardDetails, setCardDetails] = useState({
        number: '•••• •••• •••• 4242',
        name: 'ANANYA ROY',
        expiry: '09/29',
        cvv: '•••'
    });

    const activeAddress = user.addresses.find(a => a.id === selectedAddressId) || addressForm;

    // Loyalty points deduction
    const loyaltyDeduction = useLoyaltyPoints ? Math.min(loyalty.pointsBalance, cartTotal) : 0;
    const finalPayable = Math.max(0, cartTotal - loyaltyDeduction);

    const handleCompleteOrder = (e) => {
        e.preventDefault();
        const orderData = {
            shippingDetails: activeAddress,
            paymentMethod: paymentMethod === 'upi' ? 'UPI (Google Pay / Instant)' : (paymentMethod === 'card' ? 'Tokenized Card (Ending in 4242)' : 'Cash on Delivery (COD)'),
            totalAmount: finalPayable,
            estimatedDelivery: deliverySpeed === 'express' ? 'Tomorrow by 5 PM' : '2-3 Business Days'
        };

        const newOrder = createOrder(orderData);
        setCompletedOrder(newOrder);
        setStep(4);
        try {
            confetti({ particleCount: 140, spread: 85, origin: { y: 0.5 } });
        } catch (e) {}
    };

    // STEP 4: ORDER CONFIRMED SCREEN
    if (step === 4 && completedOrder) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] text-[#121212] py-16 px-4 flex items-center justify-center">
                <div className="max-w-2xl w-full bg-white rounded-3xl border border-[#D5B263]/40 shadow-2xl p-8 md:p-12 text-center space-y-6">
                    <div className="w-16 h-16 bg-[#121212] text-[#D5B263] rounded-full flex items-center justify-center mx-auto shadow-lg border border-[#D5B263]/50">
                        <Check className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                        <span className="text-xs font-bold text-[#D5B263] uppercase tracking-widest block">
                            Order Placed with Master Atelier
                        </span>
                        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#121212]">
                            Thank You For Shopping TISUTA
                        </h1>
                        <p className="text-xs text-[#121212]/60 font-light">
                            Order Reference ID: <strong className="text-[#121212] font-semibold">{completedOrder.id}</strong>
                        </p>
                    </div>

                    <div className="p-6 bg-[#F7F4EE] rounded-2xl border border-[#D5B263]/30 text-left text-xs space-y-3">
                        <div className="flex justify-between font-bold text-[#121212] border-b border-[#D5B263]/20 pb-2">
                            <span>Delivery Address & Timing</span>
                            <span className="text-[#D5B263]">Estimated: {completedOrder.estimatedDelivery || 'Tomorrow'}</span>
                        </div>
                        <p className="font-bold text-[#121212]">{activeAddress.fullName}</p>
                        <p className="text-[#121212]/70">{activeAddress.addressLine}, {activeAddress.city} {activeAddress.pincode}</p>
                        <p className="text-[#121212]/70">Contact: {activeAddress.phone}</p>
                        <p className="text-[#121212]/70">Courier: Blue Dart Luxury White-Glove Service</p>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-[#D5B263]/20 flex items-center justify-between text-xs font-bold">
                        <span>Total Paid ({completedOrder.paymentMethod})</span>
                        <span className="font-serif-luxury text-lg text-[#121212]">₹{completedOrder.total.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={() => onNavigatePage('account')}
                            className="flex-1 py-4 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                        >
                            Track Live Order in Account
                        </button>
                        <button
                            onClick={() => onNavigatePage('home')}
                            className="flex-1 py-4 bg-[#F7F4EE] text-[#121212] hover:bg-stone-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                        >
                            Return to Storefront
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#121212] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D5B263]/30 pb-6 gap-4">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D5B263] block">
                            256-Bit TLS Bank Encrypted Gateway
                        </span>
                        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#121212]">
                            TISUTA Haute Checkout
                        </h1>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                        {[
                            { num: 1, label: 'Address' },
                            { num: 2, label: 'Delivery' },
                            { num: 3, label: 'Payment' }
                        ].map(st => (
                            <div key={st.num} className="flex items-center gap-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                                    step >= st.num
                                        ? 'bg-[#121212] text-[#D5B263]'
                                        : 'bg-stone-200 text-stone-600'
                                }`}>
                                    {st.num}
                                </span>
                                <span className={step >= st.num ? 'text-[#121212]' : 'text-[#121212]/40'}>
                                    {st.label}
                                </span>
                                {st.num < 3 && <ChevronRight className="w-3.5 h-3.5 text-stone-300" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Checkout Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* Left Stages (8 Cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* STEP 1: ADDRESS */}
                        {step === 1 && (
                            <div className="bg-white rounded-3xl border border-[#D5B263]/30 p-6 sm:p-8 space-y-6 shadow-sm">
                                <div className="flex items-center gap-2 border-b border-[#D5B263]/20 pb-4">
                                    <MapPin className="w-5 h-5 text-[#D5B263]" />
                                    <h3 className="font-serif-luxury text-xl font-bold text-[#121212]">
                                        Select Shipping Address
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {user.addresses.map(addr => (
                                        <div
                                            key={addr.id}
                                            onClick={() => setSelectedAddressId(addr.id)}
                                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-1.5 ${
                                                selectedAddressId === addr.id
                                                    ? 'border-[#121212] bg-[#F7F4EE] shadow-sm'
                                                    : 'border-stone-200 hover:border-[#D5B263]/50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-xs text-[#121212]">{addr.title}</span>
                                                {addr.isDefault && (
                                                    <span className="text-[9px] px-2 py-0.5 bg-[#D5B263] text-[#121212] font-bold rounded-full">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-[#121212] font-semibold">{addr.fullName}</p>
                                            <p className="text-xs text-[#121212]/70 leading-relaxed">
                                                {addr.addressLine}, {addr.city} - {addr.pincode}
                                            </p>
                                            <p className="text-xs text-[#121212]/60">{addr.phone}</p>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full sm:w-auto px-8 py-3.5 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                                >
                                    <span>Continue to Delivery Speed</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* STEP 2: DELIVERY SPEED */}
                        {step === 2 && (
                            <div className="bg-white rounded-3xl border border-[#D5B263]/30 p-6 sm:p-8 space-y-6 shadow-sm">
                                <div className="flex items-center justify-between border-b border-[#D5B263]/20 pb-4">
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-5 h-5 text-[#D5B263]" />
                                        <h3 className="font-serif-luxury text-xl font-bold text-[#121212]">
                                            Choose Delivery Speed
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setStep(1)}
                                        className="text-xs text-[#D5B263] font-bold hover:underline"
                                    >
                                        Edit Address
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    <div
                                        onClick={() => setDeliverySpeed('express')}
                                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                                            deliverySpeed === 'express'
                                                ? 'border-[#121212] bg-[#F7F4EE]'
                                                : 'border-stone-200'
                                        }`}
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-xs text-[#121212]">
                                                    Blue Dart Priority VIP White Glove
                                                </span>
                                                <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[9px] font-bold rounded-full">
                                                    Recommended
                                                </span>
                                            </div>
                                            <p className="text-xs text-[#121212]/60">
                                                Guaranteed Next-Day Doorstep Delivery with temperature-controlled garment boxes.
                                            </p>
                                        </div>
                                        <span className="font-bold text-xs text-green-700 uppercase">
                                            Complimentary
                                        </span>
                                    </div>

                                    <div
                                        onClick={() => setDeliverySpeed('standard')}
                                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                                            deliverySpeed === 'standard'
                                                ? 'border-[#121212] bg-[#F7F4EE]'
                                                : 'border-stone-200'
                                        }`}
                                    >
                                        <div className="space-y-1">
                                            <span className="font-bold text-xs text-[#121212]">
                                                Standard Atelier Ground Courier
                                            </span>
                                            <p className="text-xs text-[#121212]/60">
                                                Arrives in 3-4 Business Days via Delhivery Express.
                                            </p>
                                        </div>
                                        <span className="font-bold text-xs text-green-700 uppercase">
                                            Complimentary
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="px-6 py-3.5 bg-stone-100 text-[#121212] font-bold text-xs uppercase rounded-xl hover:bg-stone-200"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setStep(3)}
                                        className="flex-1 px-8 py-3.5 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                                    >
                                        <span>Proceed to Payment</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: PAYMENT GATEWAY */}
                        {step === 3 && (
                            <div className="bg-white rounded-3xl border border-[#D5B263]/30 p-6 sm:p-8 space-y-6 shadow-sm">
                                <div className="flex items-center justify-between border-b border-[#D5B263]/20 pb-4">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-[#D5B263]" />
                                        <h3 className="font-serif-luxury text-xl font-bold text-[#121212]">
                                            Select Secure Payment Gateway
                                        </h3>
                                    </div>
                                    <span className="text-[10px] text-green-700 font-bold flex items-center gap-1">
                                        <Lock className="w-3 h-3" /> PCI-DSS Compliant
                                    </span>
                                </div>

                                {/* Loyalty Points Redemption Strip */}
                                <div className="p-4 bg-[#F7F4EE] rounded-2xl border border-[#D5B263]/40 flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <span className="text-xs font-bold text-[#121212] flex items-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5 text-[#D5B263]" />
                                            <span>Redeem Royal Privé Rewards</span>
                                        </span>
                                        <p className="text-[11px] text-[#121212]/60">
                                            You have {loyalty.pointsBalance} Points available (Worth ₹{loyalty.pointsBalance}).
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setUseLoyaltyPoints(!useLoyaltyPoints)}
                                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                            useLoyaltyPoints
                                                ? 'bg-green-700 text-white'
                                                : 'bg-[#121212] text-[#D5B263]'
                                        }`}
                                    >
                                        {useLoyaltyPoints ? 'Applied (-₹' + loyaltyDeduction + ')' : 'Redeem Points'}
                                    </button>
                                </div>

                                {/* Payment Modes */}
                                <div className="space-y-3">
                                    {/* UPI */}
                                    <label
                                        onClick={() => setPaymentMethod('upi')}
                                        className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                                            paymentMethod === 'upi' ? 'border-[#121212] bg-[#F7F4EE]' : 'border-stone-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Smartphone className="w-5 h-5 text-[#D5B263]" />
                                            <div>
                                                <span className="font-bold text-xs text-[#121212] block">
                                                    UPI (Google Pay, PhonePe, Paytm, QR)
                                                </span>
                                                <span className="text-[10px] text-green-700 font-semibold">
                                                    Instant approval & zero gateway surcharge
                                                </span>
                                            </div>
                                        </div>
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === 'upi'}
                                            onChange={() => setPaymentMethod('upi')}
                                            className="accent-[#121212]"
                                        />
                                    </label>

                                    {/* Card */}
                                    <label
                                        onClick={() => setPaymentMethod('card')}
                                        className={`p-4 rounded-2xl border-2 flex flex-col cursor-pointer transition-all ${
                                            paymentMethod === 'card' ? 'border-[#121212] bg-[#F7F4EE]' : 'border-stone-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <CreditCard className="w-5 h-5 text-[#D5B263]" />
                                                <div>
                                                    <span className="font-bold text-xs text-[#121212] block">
                                                        Credit & Debit Cards (Tokenized Vault)
                                                    </span>
                                                    <span className="text-[10px] text-[#121212]/60">
                                                        Visa, Mastercard, American Express, RuPay
                                                    </span>
                                                </div>
                                            </div>
                                            <input
                                                type="radio"
                                                name="payment"
                                                checked={paymentMethod === 'card'}
                                                onChange={() => setPaymentMethod('card')}
                                                className="accent-[#121212]"
                                            />
                                        </div>

                                        {paymentMethod === 'card' && (
                                            <div className="mt-4 pt-4 border-t border-[#D5B263]/20 grid grid-cols-2 gap-3 text-xs">
                                                <div className="col-span-2">
                                                    <label className="text-[10px] text-stone-500 font-bold block mb-1">Card Number</label>
                                                    <input
                                                        type="text"
                                                        value={cardDetails.number}
                                                        readOnly
                                                        className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-mono text-xs"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-stone-500 font-bold block mb-1">Expiry</label>
                                                    <input
                                                        type="text"
                                                        value={cardDetails.expiry}
                                                        readOnly
                                                        className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-mono text-xs"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-stone-500 font-bold block mb-1">CVV</label>
                                                    <input
                                                        type="password"
                                                        value={cardDetails.cvv}
                                                        readOnly
                                                        className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-mono text-xs"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </label>

                                    {/* COD */}
                                    <label
                                        onClick={() => setPaymentMethod('cod')}
                                        className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                                            paymentMethod === 'cod' ? 'border-[#121212] bg-[#F7F4EE]' : 'border-stone-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Banknote className="w-5 h-5 text-[#D5B263]" />
                                            <div>
                                                <span className="font-bold text-xs text-[#121212] block">
                                                    Cash on Delivery (White Glove Handover)
                                                </span>
                                                <span className="text-[10px] text-[#121212]/60">
                                                    Verify and pay in cash or via mobile UPI at doorstep
                                                </span>
                                            </div>
                                        </div>
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === 'cod'}
                                            onChange={() => setPaymentMethod('cod')}
                                            className="accent-[#121212]"
                                        />
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => setStep(2)}
                                        className="px-6 py-3.5 bg-stone-100 text-[#121212] font-bold text-xs uppercase rounded-xl hover:bg-stone-200"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleCompleteOrder}
                                        className="flex-1 py-4 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Lock className="w-4 h-4" />
                                        <span>Authorize & Pay ₹{finalPayable.toLocaleString('en-IN')}</span>
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Summary Sidebar (4 Cols) */}
                    <div className="lg:col-span-4 bg-white rounded-3xl border border-[#D5B263]/30 p-6 space-y-5 shadow-sm sticky top-28">
                        <h4 className="font-serif-luxury text-base font-bold text-[#121212] border-b border-[#D5B263]/20 pb-3">
                            Order Summary ({cart.length} Items)
                        </h4>

                        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                            {cart.map((it, idx) => (
                                <div key={idx} className="flex gap-3 items-center">
                                    <img
                                        src={getImgUrl(it.product.images[0])}
                                        alt=""
                                        className="w-12 h-16 object-cover rounded-xl border border-stone-100 flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0 text-xs">
                                        <p className="font-serif-luxury font-bold text-[#121212] truncate">{it.product.name}</p>
                                        <p className="text-[10px] text-stone-500">Size: {it.size} • Qty: {it.quantity}</p>
                                        <p className="font-bold text-[#D5B263]">₹{(it.product.price * it.quantity).toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Breakdown */}
                        <div className="space-y-2 text-xs border-t border-stone-100 pt-3">
                            <div className="flex justify-between">
                                <span className="text-stone-600">Subtotal MRP</span>
                                <span>₹{cartMRP.toLocaleString('en-IN')}</span>
                            </div>
                            {cartSavings > 0 && (
                                <div className="flex justify-between text-green-700 font-semibold">
                                    <span>Promotional Savings</span>
                                    <span>- ₹{cartSavings.toLocaleString('en-IN')}</span>
                                </div>
                            )}
                            {useLoyaltyPoints && (
                                <div className="flex justify-between text-green-700 font-semibold">
                                    <span>Loyalty Points Applied</span>
                                    <span>- ₹{loyaltyDeduction.toLocaleString('en-IN')}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-stone-600">Express Courier Delivery</span>
                                <span className="text-green-700 font-bold uppercase text-[10px]">Complimentary</span>
                            </div>
                            <div className="flex justify-between font-serif-luxury text-lg font-bold text-[#121212] pt-2 border-t border-stone-200">
                                <span>Total Amount</span>
                                <span>₹{finalPayable.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <div className="p-3 bg-[#F7F4EE] rounded-xl border border-[#D5B263]/20 flex items-center gap-2 text-[10px] text-[#121212]/70">
                            <ShieldCheck className="w-4 h-4 text-[#D5B263] flex-shrink-0" />
                            <span>Complimentary 7-day pickup & return protection guaranteed on all couture orders.</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CheckoutPage;

import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, Check, ArrowRight, Lock, Sparkles, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';

export const CheckoutPage = ({ onNavigatePage }) => {
    const { cart, cartTotal, cartMRP, cartSavings, clearCart, createOrder } = useShop();

    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [completedOrder, setCompletedOrder] = useState(null);

    const [formData, setFormData] = useState({
        fullName: 'Aurelia Sharma',
        email: 'aurelia@tisutaluxury.com',
        phone: '+91 98765 43210',
        address: 'Suite 402, Royal Residency, Marine Drive',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400020'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCompleteOrder = (e) => {
        e.preventDefault();
        const newOrder = createOrder({
            shippingDetails: formData,
            paymentMethod,
            totalAmount: cartTotal
        });
        setCompletedOrder(newOrder);
        setStep(4);
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    };

    if (step === 4 && completedOrder) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] text-[#121212] py-16 px-4 flex items-center justify-center">
                <div className="max-w-2xl w-full bg-white rounded-3xl border border-[#D5B263]/40 shadow-2xl p-8 md:p-12 text-center space-y-6">
                    <div className="w-16 h-16 bg-[#D5B263] rounded-full flex items-center justify-center mx-auto text-[#121212] shadow-lg">
                        <Check className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                        <span className="text-xs font-bold text-[#D5B263] uppercase tracking-widest block">
                            Order Confirmed & Placed
                        </span>
                        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#121212]">
                            Thank You for Shopping TISUTA
                        </h1>
                        <p className="text-xs text-[#121212]/60 font-light">
                            Order Reference ID: <strong className="text-[#121212] font-semibold">{completedOrder.id}</strong>
                        </p>
                    </div>

                    <div className="p-6 bg-[#F7F4EE] rounded-2xl border border-[#D5B263]/30 text-left text-xs space-y-3">
                        <div className="flex justify-between font-bold text-[#121212] border-b border-[#D5B263]/20 pb-2">
                            <span>Delivery Address</span>
                            <span>Estimated Arrival: {completedOrder.estimatedDelivery}</span>
                        </div>
                        <p className="text-[#121212]/80">{formData.fullName}</p>
                        <p className="text-[#121212]/70">{formData.address}, {formData.city}, {formData.pincode}</p>
                        <p className="text-[#121212]/70">{formData.phone}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={() => onNavigatePage('account')}
                            className="flex-1 py-3.5 bg-[#121212] text-[#D5B263] font-bold text-xs rounded-xl hover:bg-[#D5B263] hover:text-[#121212] transition-colors"
                        >
                            Track Order in Customer Dashboard
                        </button>
                        <button
                            onClick={() => onNavigatePage('home')}
                            className="flex-1 py-3.5 bg-[#F7F4EE] text-[#121212] font-bold text-xs rounded-xl hover:bg-[#E5E2D9] transition-colors"
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#D5B263]/30 pb-6 mb-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#D5B263]">
                            256-Bit SSL Encrypted Checkout
                        </span>
                        <h1 className="font-serif-luxury text-3xl font-bold text-[#121212]">
                            Secure Order Checkout
                        </h1>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#121212]/60 font-semibold">
                        <Lock className="w-4 h-4 text-[#D5B263]" />
                        <span>Guaranteed Safe Payment</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Main Checkout Form Left (7 Cols) */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* Step 1: Address */}
                        <div className="p-6 bg-white rounded-2xl border border-[#D5B263]/30 shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-serif-luxury text-lg font-bold text-[#121212] flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[#121212] text-[#D5B263] text-xs flex items-center justify-center font-bold">1</span>
                                    <span>Shipping & Contact Information</span>
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-[#121212]">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-[#F7F4EE] border border-[#D5B263]/30 rounded-xl text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-[#121212]">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-[#F7F4EE] border border-[#D5B263]/30 rounded-xl text-xs"
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-1">
                                    <label className="text-xs font-semibold text-[#121212]">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-[#F7F4EE] border border-[#D5B263]/30 rounded-xl text-xs"
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-1">
                                    <label className="text-xs font-semibold text-[#121212]">Street Address & House No.</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-[#F7F4EE] border border-[#D5B263]/30 rounded-xl text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-[#121212]">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-[#F7F4EE] border border-[#D5B263]/30 rounded-xl text-xs"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-[#121212]">Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-[#F7F4EE] border border-[#D5B263]/30 rounded-xl text-xs"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Delivery Option */}
                        <div className="p-6 bg-white rounded-2xl border border-[#D5B263]/30 shadow-sm space-y-4">
                            <h3 className="font-serif-luxury text-lg font-bold text-[#121212] flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-[#121212] text-[#D5B263] text-xs flex items-center justify-center font-bold">2</span>
                                <span>Select Luxury Delivery Method</span>
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div className="p-4 border-2 border-[#D5B263] bg-[#F7F4EE] rounded-2xl space-y-1">
                                    <div className="flex justify-between items-center text-xs font-bold text-[#121212]">
                                        <span>Complimentary Express (2-3 Days)</span>
                                        <span className="text-green-700">FREE</span>
                                    </div>
                                    <p className="text-[11px] text-[#121212]/60">Tamper-proof luxury gift boxed packaging included.</p>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Payment */}
                        <div className="p-6 bg-white rounded-2xl border border-[#D5B263]/30 shadow-sm space-y-4">
                            <h3 className="font-serif-luxury text-lg font-bold text-[#121212] flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-[#121212] text-[#D5B263] text-xs flex items-center justify-center font-bold">3</span>
                                <span>Select Payment Gateway</span>
                            </h3>

                            <div className="space-y-3 pt-2">
                                {[
                                    { id: 'upi', name: 'Instant UPI / GPay / PhonePe / Paytm QR', desc: 'Fastest 1-click payment' },
                                    { id: 'card', name: 'Credit / Debit Card (Visa, Mastercard, Amex)', desc: 'Bank grade 256-bit encryption' },
                                    { id: 'cod', name: 'Cash on Delivery (COD)', desc: 'Available for orders up to ₹25,000' }
                                ].map(p => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setPaymentMethod(p.id)}
                                        className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${paymentMethod === p.id ? 'bg-[#121212] text-[#D5B263] border-[#D5B263]' : 'bg-[#F7F4EE] text-[#121212] border-transparent'
                                            }`}
                                    >
                                        <div>
                                            <div className="text-xs font-bold">{p.name}</div>
                                            <div className="text-[10px] opacity-70 font-light">{p.desc}</div>
                                        </div>
                                        {paymentMethod === p.id && <Check className="w-4 h-4 text-[#D5B263]" />}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleCompleteOrder}
                                className="w-full py-4 bg-[#D5B263] text-[#121212] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl mt-4"
                            >
                                <Lock className="w-4 h-4" />
                                <span>PAY & PLACE ORDER (₹{cartTotal.toLocaleString('en-IN')})</span>
                            </button>
                        </div>

                    </div>

                    {/* Right Order Summary Sidebar (5 Cols) */}
                    <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#D5B263]/30 shadow-sm space-y-6">
                        <h3 className="font-serif-luxury text-xl font-bold text-[#121212] border-b border-[#D5B263]/20 pb-4">
                            Order Summary ({cart.length} items)
                        </h3>

                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                            {cart.map((item, i) => (
                                <div key={i} className="flex gap-3 text-xs border-b border-gray-100 pb-3">
                                    <img src={item.product.images[0]} alt="" className="w-14 h-16 object-cover rounded-xl bg-[#F7F4EE]" />
                                    <div className="flex-1 space-y-1">
                                        <h5 className="font-serif-luxury font-semibold line-clamp-1">{item.product.name}</h5>
                                        <p className="text-[#121212]/50">Size: {item.size} • Qty: {item.quantity}</p>
                                        <span className="font-bold text-[#121212]">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 text-xs pt-4 border-t border-[#D5B263]/20">
                            <div className="flex justify-between text-[#121212]/70">
                                <span>Subtotal MRP</span>
                                <span>₹{cartMRP.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-green-700 font-semibold">
                                <span>Catalogue Discount</span>
                                <span>-₹{cartSavings.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-[#121212]/70">
                                <span>Luxury Express Courier</span>
                                <span>FREE</span>
                            </div>
                            <div className="flex justify-between text-base font-bold text-[#121212] pt-3 border-t border-[#D5B263]/20">
                                <span>Total Amount Payable</span>
                                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CheckoutPage;

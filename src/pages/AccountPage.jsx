import React, { useState } from 'react';
import { 
    User, Package, Heart, Sparkles, MapPin, Shield, Clock, CheckCircle2, 
    Star, ArrowRight, ShoppingBag, RotateCcw, Gift, Award, FileText, 
    Upload, AlertCircle, ChevronRight, X 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';

export const AccountPage = ({ onSelectProduct, onNavigatePage }) => {
    const { 
        user, 
        orders, 
        wishlist, 
        wishlistCollections, 
        savedLooks, 
        products, 
        openVirtualFit, 
        loyalty, 
        returns, 
        submitReturnRequest 
    } = useShop();

    const [activeTab, setActiveTab] = useState('orders'); // orders, wishlist, returns, loyalty, gifting, profile
    const [selectedWishlistColl, setSelectedWishlistColl] = useState('All Saved');
    
    // Return Request Modal State
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [returnOrderId, setReturnOrderId] = useState(orders[0]?.id || '');
    const [returnItemName, setReturnItemName] = useState('The Alix Minimalist Silk-Georgette Midi Dress');
    const [returnReason, setReturnReason] = useState('Size exchange needed (Need Size S)');
    const [returnType, setReturnType] = useState('Size Exchange (Complimentary)');

    // Digital Gift Card State
    const [giftAmount, setGiftAmount] = useState(5000);
    const [giftRecipient, setGiftRecipient] = useState('');
    const [giftMessage, setGiftMessage] = useState('Happy Birthday! Enjoy a bespoke shopping experience at TISUTA.');
    const [giftSuccess, setGiftSuccess] = useState(false);

    const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

    const TABS = [
        { id: 'orders', label: 'My Orders & Tracking', count: orders.length, icon: Package },
        { id: 'returns', label: 'Returns & Exchanges', count: returns.length, icon: RotateCcw },
        { id: 'wishlist', label: 'Curated Wishlists', count: wishlistedProducts.length, icon: Heart },
        { id: 'loyalty', label: 'Royal Rewards', count: `${loyalty.pointsBalance} Pts`, icon: Award },
        { id: 'looks', label: 'Saved 3D Looks', count: savedLooks.length, icon: Sparkles },
        { id: 'gifting', label: 'Digital Gift Cards', count: null, icon: Gift },
        { id: 'profile', label: 'Fit Profile & Address', count: null, icon: User }
    ];

    const STATUS_STEPS = ['Order Placed', 'Tailored & Inspected', 'Dispatched', 'Out for Delivery', 'Delivered'];

    const getStatusStep = (status) => {
        const map = { placed: 0, confirmed: 1, packed: 1, shipped: 2, in_transit: 2, out_for_delivery: 3, delivered: 4 };
        return map[status] ?? 2;
    };

    const handleCreateReturn = (e) => {
        e.preventDefault();
        submitReturnRequest(returnOrderId, returnItemName, returnReason, returnType);
        setShowReturnModal(false);
        alert('Return pickup scheduled! Blue Dart Luxury courier will arrive tomorrow for doorstep handover.');
    };

    const handleSendGiftCard = (e) => {
        e.preventDefault();
        if (!giftRecipient) return;
        setGiftSuccess(true);
        setTimeout(() => setGiftSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#121212]">
            
            {/* VIP Member Top Hero Header */}
            <div className="bg-[#121212] text-white px-6 py-14 relative overflow-hidden border-b border-[#D5B263]/30">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#D5B263]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D5B263] to-[#8C6D58] p-1 flex items-center justify-center shadow-xl">
                            <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center text-[#D5B263] text-2xl font-serif-luxury font-bold">
                                {user.name.charAt(0)}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-0.5 bg-[#D5B263] text-[#121212] text-[9px] font-bold uppercase rounded-full tracking-widest">
                                    {loyalty.tier} Member
                                </span>
                                <span className="text-xs text-white/50">✦ Member ID: TIS-88219</span>
                            </div>
                            <h1 className="font-serif-luxury text-3xl font-bold text-white">{user.name}</h1>
                            <p className="text-xs text-white/60 font-light">{user.email} • {user.phone}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => openVirtualFit()}
                            className="px-6 py-3 bg-[#D5B263] text-[#121212] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>3D Virtual Fit Studio</span>
                        </button>
                        <button
                            onClick={() => onNavigatePage('catalog', { category: 'all' })}
                            className="px-6 py-3 bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/20 transition-all border border-white/20 cursor-pointer"
                        >
                            Shop Haute Catalog
                        </button>
                    </div>
                </div>

                {/* KPI Metrics Row */}
                <div className="max-w-7xl mx-auto mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                    {[
                        { label: 'Active Orders', val: orders.length },
                        { label: 'Wishlist Silhouettes', val: wishlistedProducts.length },
                        { label: 'Royal Rewards Points', val: `${loyalty.pointsBalance} Pts` },
                        { label: 'Virtual Fit Scans', val: savedLooks.length }
                    ].map(st => (
                        <div key={st.label} className="p-4 bg-white/5 border border-[#D5B263]/20 rounded-2xl">
                            <span className="font-serif-luxury text-2xl font-bold text-[#D5B263]">{st.val}</span>
                            <p className="text-[11px] text-white/60 font-light mt-0.5">{st.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="bg-white border-b border-[#D5B263]/25 sticky top-[74px] z-30 shadow-sm overflow-x-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex">
                    {TABS.map(tab => {
                        const Icon = tab.icon;
                        const isCurrent = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 px-4 sm:px-5 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                                    isCurrent
                                        ? 'border-[#D5B263] text-[#121212] bg-[#FDFBF7]'
                                        : 'border-transparent text-[#121212]/50 hover:text-[#121212]'
                                }`}
                            >
                                <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#D5B263]' : ''}`} />
                                <span>{tab.label}</span>
                                {tab.count !== null && (
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                        isCurrent ? 'bg-[#121212] text-[#D5B263]' : 'bg-stone-100 text-stone-600'
                                    }`}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Tabs Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* TAB 1: ORDERS & TRACKING */}
                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-serif-luxury text-2xl font-bold text-[#121212]">
                                Order History & Live Delivery Status
                            </h3>
                            <button
                                onClick={() => setShowReturnModal(true)}
                                className="text-xs font-bold text-[#D5B263] hover:underline flex items-center gap-1"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Request Return or Size Exchange</span>
                            </button>
                        </div>

                        {orders.map((ord) => {
                            const stepIdx = getStatusStep(ord.status);
                            return (
                                <div key={ord.id} className="bg-white rounded-3xl border border-[#D5B263]/30 shadow-sm overflow-hidden space-y-6 p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D5B263]/20 gap-3">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-serif-luxury text-base font-bold text-[#121212]">{ord.id}</span>
                                                <span className="text-xs text-[#121212]/50">• Placed on {ord.date}</span>
                                            </div>
                                            <p className="text-xs text-[#121212]/60 mt-0.5">{ord.courier}</p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-green-50 text-green-800 text-[10px] font-bold uppercase rounded-full border border-green-200">
                                                Status: {ord.status.toUpperCase()}
                                            </span>
                                            <span className="font-serif-luxury text-lg font-bold text-[#121212]">
                                                ₹{ord.total.toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* 5-Step Progress Timeline */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                                            {STATUS_STEPS.map((st, i) => (
                                                <span key={st} className={i <= stepIdx ? 'text-[#D5B263]' : 'text-stone-300'}>
                                                    {st}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-[#D5B263] to-[#B89647] rounded-full transition-all duration-700"
                                                style={{ width: `${Math.min(100, ((stepIdx + 1) / STATUS_STEPS.length) * 100)}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Items */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {ord.items.map((it, idx) => (
                                            <div key={idx} className="flex gap-4 p-3 bg-[#F7F4EE] rounded-2xl border border-[#D5B263]/20 items-center">
                                                <img
                                                    src={it.product?.images?.[0]?.url || it.product?.images?.[0] || ''}
                                                    alt=""
                                                    className="w-16 h-20 object-cover rounded-xl"
                                                />
                                                <div className="space-y-1 min-w-0 text-xs">
                                                    <h5 className="font-serif-luxury font-bold text-[#121212] truncate">
                                                        {it.product?.name}
                                                    </h5>
                                                    <p className="text-stone-500">Size: {it.size} • Qty: {it.quantity}</p>
                                                    <span className="font-bold text-[#D5B263] block">
                                                        ₹{(it.product?.price || 0).toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* TAB 2: RETURNS & EXCHANGES */}
                {activeTab === 'returns' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-serif-luxury text-2xl font-bold text-[#121212]">
                                Returns & Size Exchanges Portal
                            </h3>
                            <button
                                onClick={() => setShowReturnModal(true)}
                                className="px-5 py-2.5 bg-[#121212] text-[#D5B263] rounded-xl text-xs font-bold uppercase tracking-wider"
                            >
                                Initiate New Return / Exchange
                            </button>
                        </div>

                        {returns.map(ret => (
                            <div key={ret.returnId} className="bg-white rounded-3xl border border-[#D5B263]/30 p-6 space-y-3 shadow-sm">
                                <div className="flex items-center justify-between border-b border-[#D5B263]/20 pb-3">
                                    <div>
                                        <span className="text-xs font-bold text-[#D5B263] uppercase tracking-widest">{ret.returnId}</span>
                                        <h4 className="font-serif-luxury text-base font-bold text-[#121212]">{ret.item}</h4>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-50 text-blue-800 text-[10px] font-bold rounded-full border border-blue-200">
                                        {ret.status}
                                    </span>
                                </div>
                                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                                    <div><span className="text-stone-400 block text-[10px]">Reason:</span> <strong>{ret.reason}</strong></div>
                                    <div><span className="text-stone-400 block text-[10px]">Requested Resolution:</span> <strong>{ret.requestedType}</strong></div>
                                    <div><span className="text-stone-400 block text-[10px]">Pickup Tracking:</span> <strong className="text-green-700">{ret.trackingNumber}</strong></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* TAB 3: CURATED WISHLISTS */}
                {activeTab === 'wishlist' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-serif-luxury text-2xl font-bold text-[#121212]">
                                Custom Wishlist Collections
                            </h3>
                            <span className="text-xs text-stone-500">
                                {wishlistedProducts.length} Silhouettes Saved
                            </span>
                        </div>

                        {/* Collection Pills */}
                        <div className="flex gap-2 pb-2 overflow-x-auto">
                            {Object.keys(wishlistCollections).map(colName => (
                                <button
                                    key={colName}
                                    onClick={() => setSelectedWishlistColl(colName)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                                        selectedWishlistColl === colName
                                            ? 'bg-[#121212] text-[#D5B263]'
                                            : 'bg-white border border-[#D5B263]/30 text-[#121212]/70 hover:border-[#D5B263]'
                                    }`}
                                >
                                    {colName}
                                </button>
                            ))}
                        </div>

                        {wishlistedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {wishlistedProducts.map(prod => (
                                    <ProductCard
                                        key={prod.id}
                                        product={prod}
                                        onSelectProduct={onSelectProduct}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center bg-white rounded-3xl border border-[#D5B263]/30 p-8 space-y-3">
                                <Heart className="w-12 h-12 text-[#D5B263] mx-auto opacity-50" />
                                <h4 className="font-serif-luxury text-xl font-bold">Your Wishlist is Empty</h4>
                                <p className="text-xs text-stone-500">Browse the catalog to add luxury garments to your collection.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 4: ROYAL LOYALTY REWARDS */}
                {activeTab === 'loyalty' && (
                    <div className="space-y-6 max-w-4xl">
                        <div className="bg-[#121212] text-white rounded-3xl p-8 border border-[#D5B263]/40 space-y-6 relative overflow-hidden shadow-xl">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <span className="text-[10px] text-[#D5B263] font-bold uppercase tracking-widest">
                                        Privé Membership Privilege
                                    </span>
                                    <h3 className="font-serif-luxury text-3xl font-bold text-white">
                                        {loyalty.tier}
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-bold text-[#D5B263] font-serif-luxury">
                                        {loyalty.pointsBalance}
                                    </span>
                                    <span className="text-xs text-white/50 block">Points (Worth ₹{loyalty.pointsBalance})</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-white/60">
                                    <span>Progress to Royal Diamond Tier</span>
                                    <span>{loyalty.lifetimePoints} / {loyalty.nextTierThreshold} Pts</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#D5B263] to-[#B89647] w-[89%]" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 space-y-2">
                                <span className="text-xs font-bold text-[#D5B263] uppercase tracking-wider block">
                                    Exclusive Tier Perks
                                </span>
                                <div className="grid sm:grid-cols-2 gap-3 text-xs text-white/80">
                                    {loyalty.perks.map((p, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-[#D5B263]" />
                                            <span>{p}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 5: SAVED 3D VIRTUAL FIT LOOKS */}
                {activeTab === 'looks' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-serif-luxury text-2xl font-bold text-[#121212]">
                                Saved 3D Virtual Fit Sessions
                            </h3>
                            <button
                                onClick={() => openVirtualFit()}
                                className="px-5 py-2.5 bg-[#121212] text-[#D5B263] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                            >
                                <Sparkles className="w-4 h-4" />
                                <span>New 3D Fitting Session</span>
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedLooks.map(look => (
                                <div key={look.id} className="bg-white rounded-3xl border border-[#D5B263]/30 overflow-hidden shadow-sm space-y-3 p-4">
                                    <img
                                        src={look.previewImage}
                                        alt=""
                                        className="w-full h-64 object-cover rounded-2xl"
                                    />
                                    <div className="flex items-center justify-between">
                                        <h5 className="font-serif-luxury font-bold text-sm text-[#121212]">{look.outfitName}</h5>
                                        <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full">
                                            {look.fitScore}% Fit Match
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#121212]/60">Recommended Size: <strong>{look.recommendedSize}</strong> • Saved {look.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 6: DIGITAL GIFTING */}
                {activeTab === 'gifting' && (
                    <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#D5B263]/30 p-8 space-y-6 shadow-sm">
                        <div className="text-center space-y-2">
                            <Gift className="w-10 h-10 text-[#D5B263] mx-auto" />
                            <h3 className="font-serif-luxury text-2xl font-bold text-[#121212]">
                                Send a TISUTA Digital Gift Card
                            </h3>
                            <p className="text-xs text-stone-500">
                                Deliver an instant bespoke luxury shopping experience via email or WhatsApp.
                            </p>
                        </div>

                        {giftSuccess ? (
                            <div className="p-6 bg-green-50 rounded-2xl border border-green-200 text-center space-y-2">
                                <CheckCircle2 className="w-10 h-10 text-green-700 mx-auto" />
                                <h4 className="font-serif-luxury text-lg font-bold text-green-900">Digital Gift Card Dispatched!</h4>
                                <p className="text-xs text-green-800">
                                    A luxury voucher code for ₹{giftAmount.toLocaleString('en-IN')} has been sent to {giftRecipient}.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSendGiftCard} className="space-y-4 text-xs">
                                <div>
                                    <label className="block text-stone-600 font-bold uppercase mb-1">Select Voucher Amount</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[2500, 5000, 10000, 25000].map(amt => (
                                            <button
                                                type="button"
                                                key={amt}
                                                onClick={() => setGiftAmount(amt)}
                                                className={`py-2 rounded-xl font-bold border transition-all ${
                                                    giftAmount === amt
                                                        ? 'bg-[#121212] text-[#D5B263] border-[#121212]'
                                                        : 'bg-[#F7F4EE] border-stone-200 text-[#121212]'
                                                }`}
                                            >
                                                ₹{amt.toLocaleString('en-IN')}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-stone-600 font-bold uppercase mb-1">Recipient Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={giftRecipient}
                                        onChange={e => setGiftRecipient(e.target.value)}
                                        placeholder="recipient@example.com"
                                        className="w-full p-3 bg-[#F7F4EE] border border-stone-300 rounded-xl"
                                    />
                                </div>

                                <div>
                                    <label className="block text-stone-600 font-bold uppercase mb-1">Personalized Message</label>
                                    <textarea
                                        rows={3}
                                        value={giftMessage}
                                        onChange={e => setGiftMessage(e.target.value)}
                                        className="w-full p-3 bg-[#F7F4EE] border border-stone-300 rounded-xl"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                                >
                                    Purchase & Dispatch Gift Voucher (₹{giftAmount.toLocaleString('en-IN')})
                                </button>
                            </form>
                        )}
                    </div>
                )}

                {/* TAB 7: PROFILE & ADDRESSES */}
                {activeTab === 'profile' && (
                    <div className="max-w-2xl space-y-6">
                        <div className="bg-white rounded-3xl border border-[#D5B263]/30 p-6 space-y-4">
                            <h4 className="font-serif-luxury text-lg font-bold text-[#121212] border-b border-[#D5B263]/20 pb-2">
                                Member Body Measurements & Profile
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                                <div><span className="text-stone-400 block text-[10px]">Height:</span> <strong>168 cm</strong></div>
                                <div><span className="text-stone-400 block text-[10px]">Body Shape:</span> <strong>Hourglass</strong></div>
                                <div><span className="text-stone-400 block text-[10px]">Bust:</span> <strong>34 in</strong></div>
                                <div><span className="text-stone-400 block text-[10px]">Waist:</span> <strong>27 in</strong></div>
                                <div><span className="text-stone-400 block text-[10px]">Hips:</span> <strong>36 in</strong></div>
                                <div><span className="text-stone-400 block text-[10px]">Preferred Fit:</span> <strong>Regular Tailored</strong></div>
                            </div>
                            <button
                                onClick={() => openVirtualFit()}
                                className="w-full py-3 bg-[#F7F4EE] text-[#121212] border border-[#D5B263]/40 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#121212] hover:text-[#D5B263] transition-colors"
                            >
                                Re-Calibrate Fit Profile with 3D Scanner
                            </button>
                        </div>
                    </div>
                )}

            </div>

            {/* RETURN REQUEST MODAL */}
            {showReturnModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div onClick={() => setShowReturnModal(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
                    <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#D5B263] p-6 sm:p-8 z-10 space-y-4 text-xs">
                        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                            <h3 className="font-serif-luxury text-lg font-bold text-[#121212]">
                                Schedule Return / Size Exchange
                            </h3>
                            <button onClick={() => setShowReturnModal(false)} className="p-1 text-stone-400 hover:text-black">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateReturn} className="space-y-3">
                            <div>
                                <label className="block text-stone-600 font-bold mb-1">Select Order Item</label>
                                <select
                                    value={returnItemName}
                                    onChange={e => setReturnItemName(e.target.value)}
                                    className="w-full p-2.5 bg-[#F7F4EE] border border-stone-300 rounded-xl"
                                >
                                    <option>The Alix Minimalist Silk-Georgette Midi Dress</option>
                                    <option>Sora Cowl-Neck Italian Satin Slip Dress</option>
                                    <option>Zoya Zari Embroidered Anarkali Kurta Set</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-stone-600 font-bold mb-1">Return / Exchange Reason</label>
                                <select
                                    value={returnReason}
                                    onChange={e => setReturnReason(e.target.value)}
                                    className="w-full p-2.5 bg-[#F7F4EE] border border-stone-300 rounded-xl"
                                >
                                    <option>Size too large (Request size S)</option>
                                    <option>Size too small (Request size L)</option>
                                    <option>Fabric texture / color preference change</option>
                                    <option>Defective / Stitch inspection needed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-stone-600 font-bold mb-1">Desired Resolution</label>
                                <select
                                    value={returnType}
                                    onChange={e => setReturnType(e.target.value)}
                                    className="w-full p-2.5 bg-[#F7F4EE] border border-stone-300 rounded-xl"
                                >
                                    <option>Size Exchange (Complimentary White Glove)</option>
                                    <option>Store Credits (+5% Bonus Credit)</option>
                                    <option>Original Payment Source Refund</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3.5 bg-[#121212] text-[#D5B263] font-bold text-xs uppercase rounded-xl hover:bg-[#D5B263] hover:text-[#121212] transition-colors mt-2"
                            >
                                Confirm & Book Blue Dart Doorstep Pickup
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountPage;

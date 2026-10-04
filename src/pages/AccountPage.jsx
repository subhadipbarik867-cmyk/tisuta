import React, { useState } from 'react';
import { User, Package, Heart, Sparkles, MapPin, Shield, Clock, CheckCircle2, Star, ArrowRight, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';

export const AccountPage = ({ onSelectProduct, onNavigatePage }) => {
    const { user, orders, wishlist, savedLooks, products, openVirtualFit } = useShop();
    const [activeTab, setActiveTab] = useState('orders');

    const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

    const memberName = user?.name || 'Valued Member';
    const memberEmail = user?.email || 'member@tisuta.com';

    const TABS = [
        { id: 'orders', label: 'My Orders', count: orders.length, icon: Package },
        { id: 'wishlist', label: 'Wishlist', count: wishlistedProducts.length, icon: Heart },
        { id: 'looks', label: 'Saved Looks', count: savedLooks.length, icon: Sparkles },
        { id: 'profile', label: 'Profile & Measurements', count: null, icon: User }
    ];

    const STATUS_STEPS = ['Order Placed', 'Tailored & Packed', 'In Transit', 'Out for Delivery', 'Delivered'];

    const getStatusStep = (status) => {
        const map = { placed: 0, confirmed: 1, packed: 1, shipped: 3, out_for_delivery: 4, delivered: 5 };
        return map[status] ?? 2;
    };

    return (
        <div className="min-h-screen bg-[#F5F3EF] text-[#0A0908]">

            {/* Hero Banner */}
            <div className="bg-[#0A0908] text-white px-6 py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1600&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0908] via-[#0A0908]/90 to-[#0A0908]/60" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8A6820] flex items-center justify-center text-[#0A0908] text-3xl font-serif-luxury font-bold shadow-2xl ring-4 ring-[#C5A059]/30">
                            {memberName.charAt(0)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-3 py-0.5 bg-[#C5A059] text-[#0A0908] text-[10px] font-bold uppercase rounded-full tracking-widest">
                                    PRIVÉ MEMBER
                                </span>
                            </div>
                            <h1 className="font-serif-luxury text-3xl font-bold text-white">{memberName}</h1>
                            <p className="text-sm text-white/60 font-light mt-0.5">{memberEmail}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => openVirtualFit()}
                            className="px-6 py-3 bg-[#C5A059] text-[#0A0908] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#D4B068] transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                        >
                            <Sparkles className="w-4 h-4" />
                            3D Virtual Fit Studio
                        </button>
                        <button
                            onClick={() => onNavigatePage('catalog', { category: 'all' })}
                            className="px-6 py-3 bg-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/20 transition-all border border-white/20 cursor-pointer"
                        >
                            Shop Couture Catalog
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="relative z-10 max-w-7xl mx-auto mt-10 grid grid-cols-3 md:grid-cols-3 gap-4">
                    {[
                        { label: 'Total Orders', value: orders.length },
                        { label: 'Wishlist Items', value: wishlistedProducts.length },
                        { label: 'Saved Looks', value: savedLooks.length }
                    ].map(stat => (
                        <div key={stat.label} className="bg-white/8 backdrop-blur border border-white/10 rounded-2xl p-4">
                            <span className="text-2xl font-serif-luxury font-bold text-[#C5A059]">{stat.value}</span>
                            <p className="text-xs text-white/50 mt-0.5 font-light">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b border-[#C5A059]/20 sticky top-20 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto">
                    {TABS.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 px-5 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${activeTab === tab.id
                                        ? 'border-[#C5A059] text-[#0A0908]'
                                        : 'border-transparent text-[#0A0908]/40 hover:text-[#0A0908]/80'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#C5A059]' : ''}`} />
                                <span>{tab.label}</span>
                                {tab.count !== null && (
                                    <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-[#C5A059] text-[#0A0908]' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* ORDERS TAB */}
                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        {orders.length === 0 ? (
                            <div className="text-center py-24">
                                <Package className="w-14 h-14 text-[#C5A059]/40 mx-auto mb-4" />
                                <h3 className="font-serif-luxury text-xl font-bold mb-2">No Orders Yet</h3>
                                <p className="text-sm text-gray-500 mb-6">Your couture wardrobe awaits.</p>
                                <button onClick={() => onNavigatePage('catalog', { category: 'all' })}
                                    className="px-8 py-3 bg-[#0A0908] text-[#C5A059] font-bold text-xs rounded-xl cursor-pointer hover:bg-[#1A1918] transition-colors">
                                    Explore Catalog
                                </button>
                            </div>
                        ) : orders.map((ord) => {
                            const stepIdx = getStatusStep(ord.status);
                            const displayTotal = ord.total ?? ord.totalAmount ?? 0;
                            return (
                                <div key={ord.id} className="bg-white rounded-2xl border border-[#C5A059]/20 shadow-sm overflow-hidden">
                                    {/* Order Header */}
                                    <div className="px-6 py-4 bg-[#0A0908] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div>
                                            <span className="text-xs text-[#C5A059] font-bold uppercase tracking-widest block">Order {ord.id}</span>
                                            <span className="text-xs text-white/50">{ord.date || ord.placedAt}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-[#C5A059]/20 text-[#C5A059] font-bold text-[10px] uppercase rounded-full border border-[#C5A059]/30">
                                                {ord.status}
                                            </span>
                                            <span className="text-base font-bold text-white">
                                                ₹{displayTotal.toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        {/* Tracking Progress Bar */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                {STATUS_STEPS.map((step, i) => (
                                                    <span key={step} className={`text-[9px] font-bold uppercase ${i <= stepIdx ? 'text-[#C5A059]' : 'text-gray-300'}`}>
                                                        {step}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#C5A059] to-[#E4C97A] rounded-full transition-all duration-700"
                                                    style={{ width: `${Math.min(100, (stepIdx / (STATUS_STEPS.length - 1)) * 100)}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Items */}
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {(ord.items || []).map((it, idx) => (
                                                <div key={idx} className="flex gap-3 items-center p-3 bg-[#F5F3EF] rounded-xl border border-[#C5A059]/15">
                                                    <img src={it.product?.images?.[0] || ''} alt="" className="w-14 h-16 object-cover rounded-lg flex-shrink-0" />
                                                    <div className="text-xs space-y-1 min-w-0">
                                                        <h5 className="font-serif-luxury font-bold text-[#0A0908] line-clamp-1">{it.product?.name}</h5>
                                                        <p className="text-gray-400">Size: {it.size} • Qty: {it.quantity}</p>
                                                        <span className="font-bold text-[#C5A059]">₹{((it.product?.price || 0) * it.quantity).toLocaleString('en-IN')}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* WISHLIST TAB */}
                {activeTab === 'wishlist' && (
                    <div>
                        {wishlistedProducts.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {wishlistedProducts.map(p => (
                                    <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 text-center space-y-4">
                                <Heart className="w-14 h-14 text-[#C5A059]/40 mx-auto" />
                                <h3 className="font-serif-luxury text-2xl font-bold">Your Wishlist is Empty</h3>
                                <p className="text-sm text-gray-400">Save garments you love for later.</p>
                                <button
                                    onClick={() => onNavigatePage('catalog', { category: 'all' })}
                                    className="px-8 py-3 bg-[#0A0908] text-[#C5A059] font-bold text-xs rounded-xl cursor-pointer"
                                >
                                    Explore Couture Catalog
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* SAVED LOOKS TAB */}
                {activeTab === 'looks' && (
                    <div>
                        {savedLooks.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {savedLooks.map((look) => (
                                    <div key={look.id} className="bg-white rounded-2xl overflow-hidden border border-[#C5A059]/20 shadow-sm">
                                        <div className="aspect-[4/5] relative overflow-hidden bg-[#0A0908]">
                                            <img src={look.previewImage} alt={look.outfitName} className="w-full h-full object-cover opacity-90" />
                                            <div className="absolute top-3 right-3 px-2.5 py-1 bg-green-600 text-white font-bold text-[10px] rounded-full shadow-md">
                                                {look.fitScore}% Fit Match
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/60 to-transparent" />
                                        </div>
                                        <div className="p-4 space-y-1">
                                            <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-wider">{look.date}</span>
                                            <h4 className="font-serif-luxury text-base font-bold">{look.outfitName}</h4>
                                            <p className="text-xs text-gray-400">Recommended Size: <strong>{look.recommendedSize}</strong></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 text-center">
                                <Sparkles className="w-14 h-14 text-[#C5A059]/40 mx-auto mb-4" />
                                <h3 className="font-serif-luxury text-2xl font-bold mb-2">No Saved Looks</h3>
                                <p className="text-sm text-gray-400 mb-6">Start a 3D Virtual Fit session to save outfit previews.</p>
                                <button onClick={() => openVirtualFit()}
                                    className="px-8 py-3 bg-[#0A0908] text-[#C5A059] font-bold text-xs rounded-xl cursor-pointer">
                                    Launch Virtual Fit Studio
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* PROFILE TAB */}
                {activeTab === 'profile' && (
                    <div className="max-w-2xl space-y-6">
                        <div className="bg-white rounded-2xl border border-[#C5A059]/20 p-6 space-y-4">
                            <h3 className="font-serif-luxury text-xl font-bold flex items-center gap-2">
                                <User className="w-5 h-5 text-[#C5A059]" />
                                Personal Details
                            </h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                {[
                                    { label: 'Full Name', value: memberName },
                                    { label: 'Email', value: memberEmail },
                                    { label: 'Phone', value: user?.phone || '+91 98765 43210' },
                                    { label: 'Membership', value: 'PRIVÉ Tier' }
                                ].map(item => (
                                    <div key={item.label} className="p-4 bg-[#F5F3EF] rounded-xl border border-[#C5A059]/10">
                                        <span className="text-xs text-gray-400 block mb-1">{item.label}</span>
                                        <span className="font-semibold text-[#0A0908] text-sm">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-[#C5A059]/20 p-6 space-y-4">
                            <h3 className="font-serif-luxury text-xl font-bold flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-[#C5A059]" />
                                Body Scan & Fit Profile
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Height', value: '168 cm' },
                                    { label: 'Body Shape', value: 'Hourglass' },
                                    { label: 'Bust', value: '34B' },
                                    { label: 'Waist', value: '27 in' },
                                    { label: 'Hips', value: '36 in' },
                                    { label: 'Preferred Size', value: 'M' }
                                ].map(item => (
                                    <div key={item.label} className="p-4 bg-[#F5F3EF] rounded-xl border border-[#C5A059]/10">
                                        <span className="text-xs text-gray-400 block mb-1">{item.label}</span>
                                        <span className="font-bold text-[#C5A059] text-sm">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => openVirtualFit()}
                                className="w-full py-3 bg-[#0A0908] text-[#C5A059] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#1A1918] transition-colors cursor-pointer flex items-center justify-center gap-2"
                            >
                                <Sparkles className="w-4 h-4" />
                                Update Measurements in 3D Virtual Fit
                            </button>
                        </div>

                        {/* Saved Addresses */}
                        {user?.addresses?.length > 0 && (
                            <div className="bg-white rounded-2xl border border-[#C5A059]/20 p-6 space-y-4">
                                <h3 className="font-serif-luxury text-xl font-bold flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-[#C5A059]" />
                                    Saved Addresses
                                </h3>
                                {user.addresses.map(addr => (
                                    <div key={addr.id} className="p-4 bg-[#F5F3EF] rounded-xl border border-[#C5A059]/10 text-sm">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-[#0A0908]">{addr.title}</span>
                                            {addr.isDefault && (
                                                <span className="text-[10px] px-2 py-0.5 bg-[#C5A059] text-[#0A0908] font-bold rounded-full">Default</span>
                                            )}
                                        </div>
                                        <p className="text-gray-500 text-xs">{addr.fullName} · {addr.addressLine}, {addr.city} {addr.pincode}</p>
                                        <p className="text-gray-400 text-xs">{addr.phone}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default AccountPage;

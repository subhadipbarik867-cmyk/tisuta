import React, { useState } from 'react';
import { LayoutDashboard, ShoppingBag, Package, TrendingUp, Sparkles, Plus, Edit, Trash2, Eye, ShieldCheck, ArrowUpRight, BarChart3, AlertTriangle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AdminDashboardPage = () => {
    const { products, adminState, updateProductStock, updateOrderStatus, addProduct } = useShop();

    const [activeTab, setActiveTab] = useState('overview');
    const [showAddModal, setShowAddModal] = useState(false);

    const [newProd, setNewProd] = useState({
        name: '',
        brand: 'TISUTA Privé',
        category: 'dresses',
        price: 18500,
        mrp: 24500,
        description: '',
        inStock: true,
        stockCount: 15
    });

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addProduct({
            ...newProd,
            images: [
                'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop'
            ],
            rating: 4.9,
            reviewCount: 1,
            sizes: ['S', 'M', 'L'],
            colors: [{ name: 'Royal Gold', hex: '#D5B263' }],
            isNewArrival: true
        });
        setShowAddModal(false);
        alert('New Garment Added to TISUTA Catalog!');
    };

    return (
        <div className="min-h-screen bg-[#121212] text-[#FDFBF7] py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Admin Top Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#D5B263]/30 pb-6 mb-8 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D5B263]/20 border border-[#D5B263]/40 text-[#D5B263] text-xs font-bold uppercase tracking-widest">
                            <ShieldCheck className="w-4 h-4" />
                            <span>TISUTA Enterprise Control Center</span>
                        </div>
                        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#FDFBF7] mt-1">
                            Brand Administration & Analytics
                        </h1>
                    </div>

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-6 py-3 bg-[#D5B263] text-[#121212] font-bold text-xs rounded-xl hover:bg-[#C5A059] transition-all flex items-center gap-2 cursor-pointer shadow-lg self-start md:self-auto"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add New Garment to CMS</span>
                    </button>
                </div>

                {/* Executive KPI Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-2 shadow-xl">
                        <div className="flex items-center justify-between text-xs text-[#D5B263] uppercase font-bold tracking-wider">
                            <span>Gross Revenue (2026)</span>
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="text-3xl font-bold font-serif-luxury text-white">
                            ₹{adminState.revenue.toLocaleString('en-IN')}
                        </div>
                        <p className="text-[11px] text-[#FDFBF7]/60 font-light">+28.4% from last luxury fashion drop</p>
                    </div>

                    <div className="p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-2 shadow-xl">
                        <div className="flex items-center justify-between text-xs text-[#D5B263] uppercase font-bold tracking-wider">
                            <span>Active Orders</span>
                            <ShoppingBag className="w-4 h-4 text-[#D5B263]" />
                        </div>
                        <div className="text-3xl font-bold font-serif-luxury text-white">
                            {adminState.totalOrders} Orders
                        </div>
                        <p className="text-[11px] text-green-400 font-light">12 Orders in VIP Tailoring Stage</p>
                    </div>

                    <div className="p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-2 shadow-xl">
                        <div className="flex items-center justify-between text-xs text-[#D5B263] uppercase font-bold tracking-wider">
                            <span>Virtual Try-On Sessions</span>
                            <Sparkles className="w-4 h-4 text-[#D5B263]" />
                        </div>
                        <div className="text-3xl font-bold font-serif-luxury text-white">
                            {adminState.virtualFitScans.toLocaleString('en-IN')}
                        </div>
                        <p className="text-[11px] text-[#D5B263] font-light">78% Try-On to Add-to-Cart Conversion</p>
                    </div>

                    <div className="p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-2 shadow-xl">
                        <div className="flex items-center justify-between text-xs text-[#D5B263] uppercase font-bold tracking-wider">
                            <span>Catalog Products</span>
                            <Package className="w-4 h-4 text-[#D5B263]" />
                        </div>
                        <div className="text-3xl font-bold font-serif-luxury text-white">
                            {products.length} Items
                        </div>
                        <p className="text-[11px] text-[#FDFBF7]/60 font-light">4 Active Categories</p>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex border-b border-[#D5B263]/30 mb-8 overflow-x-auto">
                    {[
                        { id: 'overview', label: 'Analytics & Revenue' },
                        { id: 'catalog', label: 'Product Catalog (CMS)' },
                        { id: 'orders', label: 'Order Dispatch Center' }
                    ].map(t => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            className={`py-3 px-6 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${activeTab === t.id
                                    ? 'border-[#D5B263] text-[#D5B263] bg-[#1A1A1A]'
                                    : 'border-transparent text-[#FDFBF7]/50 hover:text-white'
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* TAB 1: Catalog CMS */}
                {activeTab === 'catalog' && (
                    <div className="bg-[#1A1A1A] rounded-3xl p-6 border border-[#D5B263]/30 shadow-xl overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-[#D5B263]/20 text-[#D5B263] uppercase tracking-wider">
                                    <th className="pb-4">Garment</th>
                                    <th className="pb-4">Category</th>
                                    <th className="pb-4">Price</th>
                                    <th className="pb-4">Stock</th>
                                    <th className="pb-4">Virtual Scans</th>
                                    <th className="pb-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {products.map(p => (
                                    <tr key={p.id} className="hover:bg-white/5">
                                        <td className="py-4 flex items-center gap-3">
                                            <img src={p.images[0]} alt="" className="w-12 h-14 object-cover rounded-xl" />
                                            <div>
                                                <span className="font-bold text-white block font-serif-luxury text-sm">{p.name}</span>
                                                <span className="text-[10px] text-[#D5B263]">{p.brand}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 capitalize text-gray-300">{p.category}</td>
                                        <td className="py-4 font-bold text-white">₹{p.price.toLocaleString('en-IN')}</td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    value={p.stockCount}
                                                    onChange={e => updateProductStock(p.id, Number(e.target.value))}
                                                    className="w-16 p-1.5 bg-[#121212] border border-[#D5B263]/40 rounded-lg text-xs font-bold text-center"
                                                />
                                                {p.stockCount < 10 && (
                                                    <span className="text-[10px] text-yellow-500 font-bold flex items-center gap-1">
                                                        <AlertTriangle className="w-3 h-3" /> Low
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 text-[#D5B263] font-bold">142 Fits</td>
                                        <td className="py-4 text-right space-x-2">
                                            <button className="p-2 bg-white/10 rounded-lg hover:bg-[#D5B263] hover:text-[#121212] transition-colors">
                                                <Edit className="w-3.5 h-3.5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* TAB 2: Analytics */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-4">
                            <h3 className="font-serif-luxury text-xl font-bold text-white flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-[#D5B263]" />
                                <span>Monthly Luxury Sales Revenue</span>
                            </h3>
                            <div className="h-48 flex items-end justify-between gap-4 pt-8">
                                {[
                                    { m: 'Nov', v: 40 },
                                    { m: 'Dec', v: 65 },
                                    { m: 'Jan', v: 85 },
                                    { m: 'Feb', v: 70 },
                                    { m: 'Mar', v: 95 }
                                ].map(b => (
                                    <div key={b.m} className="flex-1 flex flex-col items-center gap-2">
                                        <div className="w-full bg-[#D5B263] rounded-t-xl" style={{ height: `${b.v}%` }} />
                                        <span className="text-xs text-gray-400">{b.m}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-4">
                            <h3 className="font-serif-luxury text-xl font-bold text-white flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-[#D5B263]" />
                                <span>Virtual Fit AI Conversion Engine</span>
                            </h3>
                            <p className="text-xs text-gray-300">
                                Customers who launch 3D body scans have a 3.4x higher purchase intent and zero return rate.
                            </p>
                            <div className="p-4 bg-[#121212] rounded-2xl border border-[#D5B263]/20 space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span>AI Size Match Accuracy</span>
                                    <span className="text-[#D5B263]">99.2% Precision</span>
                                </div>
                                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#D5B263] w-[99%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div onClick={() => setShowAddModal(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

                    <div className="relative w-full max-w-lg bg-[#1A1A1A] border border-[#D5B263] p-8 rounded-3xl text-white z-10 space-y-4">
                        <h3 className="font-serif-luxury text-2xl font-bold text-[#D5B263]">Add Garment to Catalog</h3>
                        <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
                            <div>
                                <label className="block text-gray-400 mb-1">Product Title</label>
                                <input
                                    type="text"
                                    required
                                    value={newProd.name}
                                    onChange={e => setNewProd({ ...newProd, name: e.target.value })}
                                    className="w-full p-3 bg-[#121212] border border-[#D5B263]/40 rounded-xl"
                                    placeholder="e.g. Silk Organza Cape Dress"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-gray-400 mb-1">Selling Price (₹)</label>
                                    <input
                                        type="number"
                                        value={newProd.price}
                                        onChange={e => setNewProd({ ...newProd, price: Number(e.target.value) })}
                                        className="w-full p-3 bg-[#121212] border border-[#D5B263]/40 rounded-xl"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1">MRP Price (₹)</label>
                                    <input
                                        type="number"
                                        value={newProd.mrp}
                                        onChange={e => setNewProd({ ...newProd, mrp: Number(e.target.value) })}
                                        className="w-full p-3 bg-[#121212] border border-[#D5B263]/40 rounded-xl"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3.5 bg-[#D5B263] text-[#121212] font-bold rounded-xl mt-4 cursor-pointer"
                            >
                                Publish Garment to Storefront
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboardPage;

import React, { useState } from 'react';
import { 
    LayoutDashboard, Package, ShoppingBag, Users, Layers, TrendingUp, 
    Sparkles, Plus, Edit, Trash2, Eye, ShieldCheck, ArrowUpRight, 
    BarChart3, AlertTriangle, Download, RefreshCw, CheckCircle2, 
    FileText, Tag, Database, Megaphone, Truck, RotateCcw, Award 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getImgUrl } from '../utils/imageUtils';

export const AdminDashboardPage = () => {
    const { 
        products, 
        adminState, 
        setAdminState, 
        orders, 
        returns, 
        updateOrderStatus, 
        addProduct, 
        updateProductStock, 
        deleteProduct 
    } = useShop();

    const [activeSection, setActiveSection] = useState('overview'); // overview, products, inventory, orders, cms, marketing, sellers, database
    const [selectedRole, setSelectedRole] = useState('Super Admin');
    const [showAddModal, setShowAddModal] = useState(false);
    const [invoiceOrder, setInvoiceOrder] = useState(null);
    const [csvUploadSuccess, setCsvUploadSuccess] = useState(false);

    // New Product Form State
    const [newGarment, setNewGarment] = useState({
        name: '',
        brand: 'ATELIER TISUTA',
        category: 'dresses',
        subCategory: 'midi',
        styleTag: 'Minimal midi dress',
        price: 2999,
        mrp: 4499,
        stockCount: 20,
        fabric: 'Double Silk Georgette',
        fit: 'Regular Tailored',
        occasion: 'Evening & Gala',
        description: ''
    });

    const roles = [
        'Super Admin',
        'Product Manager',
        'Inventory Manager',
        'Order Dispatch Manager',
        'Marketing Director',
        'Customer Support'
    ];

    const sidebarNav = [
        { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard },
        { id: 'products', label: 'Garment Catalog (CMS)', icon: Package },
        { id: 'inventory', label: 'Warehouse Inventory', icon: Layers },
        { id: 'orders', label: 'Order Dispatch Center', icon: ShoppingBag },
        { id: 'marketing', label: 'Campaigns & Coupons', icon: Megaphone },
        { id: 'sellers', label: 'Marketplace & Sellers', icon: Award },
        { id: 'database', label: 'Database & Schema Explorer', icon: Database }
    ];

    const handleAddGarment = (e) => {
        e.preventDefault();
        addProduct({
            ...newGarment,
            images: [
                { angle: 'Front Studio', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=90&w=1200&auto=format&fit=crop' }
            ],
            colors: [{ name: 'Pearl Ivory', hex: '#FDFBF7' }, { name: 'Onyx Black', hex: '#121212' }],
            sizes: ['XS', 'S', 'M', 'L', 'XL']
        });
        setShowAddModal(false);
        alert(`"${newGarment.name}" successfully published to TISUTA storefront!`);
    };

    const handleCsvUpload = () => {
        setCsvUploadSuccess(true);
        setTimeout(() => setCsvUploadSuccess(false), 3000);
    };

    const handleExportCSV = () => {
        const rows = [
            ['Product ID', 'Name', 'Category', 'Price', 'MRP', 'Stock', 'Rating'],
            ...products.map(p => [p.id, p.name, p.category, p.price, p.mrp, p.stockCount, p.rating])
        ];
        const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "TISUTA_Product_Catalog_2026.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-[#121212] text-[#FDFBF7] flex flex-col">
            
            {/* Top Enterprise Command Bar */}
            <header className="h-18 bg-[#1A1A1A] border-b border-[#D5B263]/30 px-6 sm:px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#D5B263] text-[#121212] rounded-xl font-bold">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-serif-luxury text-base font-bold text-white tracking-wide">
                                TISUTA Enterprise Control Center
                            </span>
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[9px] font-bold rounded-full uppercase border border-green-500/30">
                                Production v4.2
                            </span>
                        </div>
                        <p className="text-[10px] text-white/50">
                            Multi-Tenant Cloud • 99.99% Uptime • Bangalore & Mumbai Clusters
                        </p>
                    </div>
                </div>

                {/* Role Switcher & Export */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 bg-[#121212] px-3 py-1.5 rounded-xl border border-[#D5B263]/30 text-xs">
                        <span className="text-white/50 text-[10px] uppercase font-bold">Role:</span>
                        <select
                            value={selectedRole}
                            onChange={e => setSelectedRole(e.target.value)}
                            className="bg-transparent text-[#D5B263] font-bold focus:outline-none cursor-pointer"
                        >
                            {roles.map(r => <option key={r} value={r} className="bg-[#121212]">{r}</option>)}
                        </select>
                    </div>

                    <button
                        onClick={handleExportCSV}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors border border-white/20"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                    </button>

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-5 py-2 bg-[#D5B263] hover:bg-[#C5A059] text-[#121212] font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Garment</span>
                    </button>
                </div>
            </header>

            {/* Main Workbench: Sidebar + Content */}
            <div className="flex-1 flex flex-col md:flex-row">
                
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 bg-[#181818] border-r border-[#D5B263]/25 p-4 space-y-1">
                    {sidebarNav.map(item => {
                        const Icon = item.icon;
                        const isCurrent = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                                    isCurrent
                                        ? 'bg-[#D5B263] text-[#121212] shadow-md'
                                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}

                    <div className="pt-6 mt-6 border-t border-white/10 p-3 bg-[#121212] rounded-2xl space-y-2">
                        <span className="text-[10px] text-[#D5B263] font-bold uppercase tracking-wider block">
                            System Health
                        </span>
                        <p className="text-[11px] text-white/60">Payment Gateway: 100% OK</p>
                        <p className="text-[11px] text-white/60">3D Virtual Fit AI API: 42ms</p>
                        <p className="text-[11px] text-white/60">Blue Dart Webhook: Synced</p>
                    </div>
                </aside>

                {/* Workspace Stage */}
                <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto max-h-[calc(100vh-72px)]">
                    
                    {/* SECTION 1: OVERVIEW & EXECUTIVE KPIS */}
                    {activeSection === 'overview' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="font-serif-luxury text-3xl font-bold text-white">
                                    Executive Operations Dashboard
                                </h2>
                                <p className="text-xs text-white/60 mt-0.5">
                                    Real-time financial performance, luxury conversion ratios, and warehouse status
                                </p>
                            </div>

                            {/* KPI Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-2">
                                    <div className="flex items-center justify-between text-xs text-[#D5B263] uppercase font-bold tracking-wider">
                                        <span>Gross Luxury Sales</span>
                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div className="text-3xl font-bold font-serif-luxury text-white">
                                        ₹{adminState.revenue.toLocaleString('en-IN')}
                                    </div>
                                    <p className="text-[11px] text-green-400 font-light">+32.4% vs last seasonal collection drop</p>
                                </div>

                                <div className="p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-2">
                                    <div className="flex items-center justify-between text-xs text-[#D5B263] uppercase font-bold tracking-wider">
                                        <span>Total Orders (YTD)</span>
                                        <ShoppingBag className="w-4 h-4 text-[#D5B263]" />
                                    </div>
                                    <div className="text-3xl font-bold font-serif-luxury text-white">
                                        {adminState.totalOrders} Dispatches
                                    </div>
                                    <p className="text-[11px] text-white/60 font-light">Average Order Value: ₹{adminState.aov.toLocaleString('en-IN')}</p>
                                </div>

                                <div className="p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-2">
                                    <div className="flex items-center justify-between text-xs text-[#D5B263] uppercase font-bold tracking-wider">
                                        <span>Conversion & Returns</span>
                                        <Sparkles className="w-4 h-4 text-green-400" />
                                    </div>
                                    <div className="text-3xl font-bold font-serif-luxury text-white">
                                        {adminState.conversionRate}
                                    </div>
                                    <p className="text-[11px] text-green-400 font-light">Industry-leading low return rate: {adminState.returnRate}</p>
                                </div>

                                <div className="p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-2">
                                    <div className="flex items-center justify-between text-xs text-[#D5B263] uppercase font-bold tracking-wider">
                                        <span>3D Virtual Fit Scans</span>
                                        <Sparkles className="w-4 h-4 text-[#D5B263]" />
                                    </div>
                                    <div className="text-3xl font-bold font-serif-luxury text-white">
                                        {adminState.virtualFitScans.toLocaleString('en-IN')}
                                    </div>
                                    <p className="text-[11px] text-[#D5B263] font-light">78% Try-On to Add-to-Cart Conversion</p>
                                </div>
                            </div>

                            {/* Revenue Bar Chart & Try-On Intelligence */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-7 p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-serif-luxury text-xl font-bold text-white flex items-center gap-2">
                                            <BarChart3 className="w-5 h-5 text-[#D5B263]" />
                                            <span>Monthly Luxury Revenue (₹ Lakhs)</span>
                                        </h3>
                                        <span className="text-[10px] text-[#D5B263] font-bold">2026 Fiscal Year</span>
                                    </div>

                                    <div className="h-56 flex items-end justify-between gap-4 pt-8 border-b border-white/10 pb-2">
                                        {[
                                            { m: 'May', v: 45, l: '₹45L' },
                                            { m: 'Jun', v: 62, l: '₹62L' },
                                            { m: 'Jul', v: 78, l: '₹78L' },
                                            { m: 'Aug', v: 85, l: '₹85L' },
                                            { m: 'Sep', v: 94, l: '₹94L' },
                                            { m: 'Oct', v: 110, l: '₹1.1Cr' }
                                        ].map(b => (
                                            <div key={b.m} className="flex-1 flex flex-col items-center gap-2">
                                                <span className="text-[9px] text-[#D5B263] font-bold">{b.l}</span>
                                                <div
                                                    className="w-full bg-gradient-to-t from-[#8C6D58] to-[#D5B263] rounded-t-xl hover:brightness-125 transition-all"
                                                    style={{ height: `${b.v}%` }}
                                                />
                                                <span className="text-[10px] text-white/50">{b.m}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:col-span-5 p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-5">
                                    <h3 className="font-serif-luxury text-xl font-bold text-white flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-[#D5B263]" />
                                        <span>AI Fit Precision & Zero-Return Engine</span>
                                    </h3>
                                    <p className="text-xs text-white/70 leading-relaxed font-light">
                                        Customers utilizing 3D Virtual Fit avatars experience a 99.2% sizing precision rate, virtually eliminating size returns.
                                    </p>

                                    <div className="space-y-3 pt-2">
                                        <div>
                                            <div className="flex justify-between text-xs font-bold mb-1">
                                                <span>Hourglass Silhouette Precision</span>
                                                <span className="text-[#D5B263]">99.4%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#D5B263] w-[99%]" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs font-bold mb-1">
                                                <span>Straight & Rectangle Drape Match</span>
                                                <span className="text-[#D5B263]">98.7%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#D5B263] w-[98%]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 2: PRODUCTS CMS */}
                    {activeSection === 'products' && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="font-serif-luxury text-2xl font-bold text-white">
                                        Haute Catalog Management ({products.length} Garments)
                                    </h2>
                                    <p className="text-xs text-white/60">
                                        Modify selling price, stock quantities, or bulk import via CSV
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCsvUpload}
                                        className="px-4 py-2 bg-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/20 border border-white/20"
                                    >
                                        {csvUploadSuccess ? '✓ CSV Imported (12 SKUs)' : 'Simulate CSV Bulk Import'}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-[#1A1A1A] rounded-3xl p-6 border border-[#D5B263]/30 shadow-xl overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-[#D5B263]/25 text-[#D5B263] uppercase tracking-wider">
                                            <th className="pb-4">Silhouette & Brand</th>
                                            <th className="pb-4">Category</th>
                                            <th className="pb-4">Price / MRP</th>
                                            <th className="pb-4">Available Stock</th>
                                            <th className="pb-4">Rating</th>
                                            <th className="pb-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {products.map(p => (
                                            <tr key={p.id} className="hover:bg-white/5">
                                                <td className="py-4 flex items-center gap-3">
                                                    <img
                                                        src={getImgUrl(p.images[0])}
                                                        alt=""
                                                        className="w-12 h-16 object-cover rounded-xl"
                                                    />
                                                    <div>
                                                        <span className="font-bold text-white block font-serif-luxury text-sm">{p.name}</span>
                                                        <span className="text-[10px] text-[#D5B263]">{p.styleTag || p.brand}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 capitalize text-white/70">{p.category}</td>
                                                <td className="py-4 font-bold text-white">
                                                    <div>₹{p.price.toLocaleString('en-IN')}</div>
                                                    <div className="text-[10px] text-white/40 line-through">₹{p.mrp.toLocaleString('en-IN')}</div>
                                                </td>
                                                <td className="py-4">
                                                    <input
                                                        type="number"
                                                        value={p.stockCount}
                                                        onChange={e => updateProductStock(p.id, Number(e.target.value))}
                                                        className="w-20 p-1.5 bg-[#121212] border border-[#D5B263]/40 rounded-lg text-xs font-bold text-center text-white"
                                                    />
                                                </td>
                                                <td className="py-4 text-[#D5B263] font-bold">
                                                    ★ {p.rating} ({p.reviewCount})
                                                </td>
                                                <td className="py-4 text-right">
                                                    <button
                                                        onClick={() => deleteProduct(p.id)}
                                                        className="p-2 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors"
                                                        title="Delete garment"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* SECTION 3: INVENTORY BY WAREHOUSE */}
                    {activeSection === 'inventory' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="font-serif-luxury text-2xl font-bold text-white">
                                    Multi-Warehouse Inventory Control
                                </h2>
                                <p className="text-xs text-white/60">
                                    Live stock tracking across Mumbai Central, Delhi NCR, and Bangalore Hubs
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {adminState.warehouses.map(wh => (
                                    <div key={wh.name} className="p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-4">
                                        <h4 className="font-serif-luxury text-base font-bold text-[#D5B263]">
                                            {wh.name}
                                        </h4>
                                        <div className="space-y-1 text-xs">
                                            <p className="text-white/70">Units in Stock: <strong className="text-white">{wh.stockUnits} garments</strong></p>
                                            <p className="text-white/70">Storage Capacity: <strong className="text-green-400">{wh.capacity}</strong></p>
                                        </div>
                                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#D5B263]" style={{ width: wh.capacity }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SECTION 4: ORDERS DISPATCH */}
                    {activeSection === 'orders' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="font-serif-luxury text-2xl font-bold text-white">
                                    Order Administration & White-Glove Dispatch
                                </h2>
                                <p className="text-xs text-white/60">
                                    Inspect customer orders, advance status steps, and view printable invoices
                                </p>
                            </div>

                            <div className="bg-[#1A1A1A] rounded-3xl p-6 border border-[#D5B263]/30 space-y-4">
                                {orders.map(ord => (
                                    <div key={ord.id} className="p-4 bg-[#121212] rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="space-y-1 text-xs">
                                            <span className="font-serif-luxury text-sm font-bold text-white">{ord.id}</span>
                                            <p className="text-white/60">{ord.shippingAddress?.fullName} • {ord.courier}</p>
                                            <p className="font-bold text-[#D5B263]">Total Value: ₹{ord.total.toLocaleString('en-IN')}</p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <select
                                                value={ord.status}
                                                onChange={e => updateOrderStatus(ord.id, e.target.value, 4)}
                                                className="p-2 bg-[#1A1A1A] border border-[#D5B263]/40 text-[#D5B263] rounded-xl text-xs font-bold"
                                            >
                                                <option value="confirmed">Confirmed</option>
                                                <option value="packed">Packed</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                            </select>

                                            <button
                                                onClick={() => setInvoiceOrder(ord)}
                                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                                            >
                                                <FileText className="w-3.5 h-3.5" />
                                                <span>Tax Invoice</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SECTION 5: MARKETING & COUPONS */}
                    {activeSection === 'marketing' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="font-serif-luxury text-2xl font-bold text-white">
                                    Promotional Coupon & Push Marketing Suite
                                </h2>
                                <p className="text-xs text-white/60">
                                    Active promotional codes and instant retargeting campaign triggers
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-4">
                                    <h4 className="font-serif-luxury text-lg font-bold text-[#D5B263]">Active Atelier Coupons</h4>
                                    <div className="space-y-2 text-xs">
                                        <div className="p-3 bg-[#121212] rounded-xl border border-white/10 flex justify-between">
                                            <span className="font-bold text-white">TISUTA10</span>
                                            <span className="text-[#D5B263]">10% Off Entire Order</span>
                                        </div>
                                        <div className="p-3 bg-[#121212] rounded-xl border border-white/10 flex justify-between">
                                            <span className="font-bold text-white">TISUTAFIRST</span>
                                            <span className="text-[#D5B263]">Flat ₹1,500 Off</span>
                                        </div>
                                        <div className="p-3 bg-[#121212] rounded-xl border border-white/10 flex justify-between">
                                            <span className="font-bold text-white">ROYAL20</span>
                                            <span className="text-[#D5B263]">20% Royal VIP Discount</span>
                                        </div>
                                        <div className="p-3 bg-[#121212] rounded-xl border border-white/10 flex justify-between">
                                            <span className="font-bold text-white">FESTIVE50</span>
                                            <span className="text-[#D5B263]">₹2,000 Festive Voucher</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-4">
                                    <h4 className="font-serif-luxury text-lg font-bold text-[#D5B263]">Automated Marketing Triggers</h4>
                                    <div className="space-y-2 text-xs">
                                        <div className="p-3 bg-[#121212] rounded-xl border border-white/10 flex justify-between items-center">
                                            <span>Abandoned Cart Push (1hr)</span>
                                            <span className="text-green-400 font-bold">Enabled</span>
                                        </div>
                                        <div className="p-3 bg-[#121212] rounded-xl border border-white/10 flex justify-between items-center">
                                            <span>Price Drop Wishlist WhatsApp</span>
                                            <span className="text-green-400 font-bold">Enabled</span>
                                        </div>
                                        <div className="p-3 bg-[#121212] rounded-xl border border-white/10 flex justify-between items-center">
                                            <span>Runway Drop Early Access SMS</span>
                                            <span className="text-green-400 font-bold">Enabled</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 6: MARKETPLACE & SELLERS ARCHITECTURE */}
                    {activeSection === 'sellers' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="font-serif-luxury text-2xl font-bold text-white">
                                    Multi-Brand Marketplace Architecture
                                </h2>
                                <p className="text-xs text-white/60">
                                    Commission settlement, designer onboarding, and seller inventory synchronization
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                                {[
                                    { name: 'ATELIER TISUTA (In-House)', type: 'Flagship Atelier', commission: '0%', sales: '₹28,40,000' },
                                    { name: 'TISUTA HERITAGE WEAVES', type: 'Artisan Cooperative', commission: '12%', sales: '₹14,20,000' },
                                    { name: 'PARIS PRIVÉ DESIGNERS', type: 'International Partner', commission: '18%', sales: '₹6,32,000' }
                                ].map(s => (
                                    <div key={s.name} className="p-6 bg-[#1A1A1A] rounded-3xl border border-[#D5B263]/30 space-y-3">
                                        <h4 className="font-serif-luxury text-base font-bold text-white">{s.name}</h4>
                                        <p className="text-white/60">{s.type}</p>
                                        <div className="flex justify-between border-t border-white/10 pt-2 font-bold">
                                            <span>Platform Fee: {s.commission}</span>
                                            <span className="text-[#D5B263]">{s.sales}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SECTION 7: DATABASE SCHEMA EXPLORER */}
                    {activeSection === 'database' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="font-serif-luxury text-2xl font-bold text-white">
                                    PostgreSQL / GraphQL Database Architecture
                                </h2>
                                <p className="text-xs text-white/60">
                                    Relational schema with foreign keys, indexing, and multi-tenant scaling
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
                                {[
                                    {
                                        table: 'users',
                                        fields: ['id UUID PRIMARY KEY', 'email VARCHAR UNIQUE', 'phone VARCHAR', 'membership_tier ENUM', 'password_hash TEXT', 'created_at TIMESTAMP']
                                    },
                                    {
                                        table: 'products',
                                        fields: ['id VARCHAR PRIMARY KEY', 'name TEXT', 'category VARCHAR', 'sub_category VARCHAR', 'price NUMERIC', 'mrp NUMERIC', 'stock_count INT', 'fabric TEXT']
                                    },
                                    {
                                        table: 'orders',
                                        fields: ['id VARCHAR PRIMARY KEY', 'user_id UUID FK', 'total NUMERIC', 'status ENUM', 'payment_method VARCHAR', 'shipping_address JSONB', 'created_at TIMESTAMP']
                                    },
                                    {
                                        table: 'virtual_fit_sessions',
                                        fields: ['id UUID PRIMARY KEY', 'user_id UUID FK', 'height VARCHAR', 'bust_waist_hips JSONB', 'fit_score INT', 'recommended_size VARCHAR']
                                    },
                                    {
                                        table: 'styleboards',
                                        fields: ['id VARCHAR PRIMARY KEY', 'creator_id UUID FK', 'title TEXT', 'items TEXT[]', 'likes INT', 'bg_mood VARCHAR']
                                    },
                                    {
                                        table: 'audit_logs',
                                        fields: ['id UUID PRIMARY KEY', 'actor_id UUID', 'action VARCHAR', 'table_name VARCHAR', 'ip_address INET', 'timestamp TIMESTAMP']
                                    }
                                ].map(t => (
                                    <div key={t.table} className="p-5 bg-[#1A1A1A] rounded-2xl border border-[#D5B263]/30 space-y-3">
                                        <div className="flex items-center justify-between border-b border-[#D5B263]/20 pb-2">
                                            <span className="font-bold text-[#D5B263]">TABLE: {t.table}</span>
                                            <span className="text-[10px] text-white/40">Postgres 16</span>
                                        </div>
                                        <ul className="space-y-1 text-white/70 text-[11px]">
                                            {t.fields.map((f, i) => (
                                                <li key={i} className="truncate">• {f}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </main>
            </div>

            {/* ADD GARMENT MODAL */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div onClick={() => setShowAddModal(false)} className="fixed inset-0 bg-black/85 backdrop-blur-md" />
                    <div className="relative w-full max-w-xl bg-[#1A1A1A] border border-[#D5B263] p-8 rounded-3xl text-white z-10 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
                        <h3 className="font-serif-luxury text-2xl font-bold text-[#D5B263]">Add Garment to Catalog (CMS)</h3>
                        <form onSubmit={handleAddGarment} className="space-y-3">
                            <div>
                                <label className="block text-white/60 mb-1">Product Title</label>
                                <input
                                    type="text"
                                    required
                                    value={newGarment.name}
                                    onChange={e => setNewGarment({ ...newGarment, name: e.target.value })}
                                    className="w-full p-3 bg-[#121212] border border-[#D5B263]/40 rounded-xl text-white"
                                    placeholder="e.g. Minimalist Mulberry Silk Midi Dress"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-white/60 mb-1">Category</label>
                                    <select
                                        value={newGarment.category}
                                        onChange={e => setNewGarment({ ...newGarment, category: e.target.value })}
                                        className="w-full p-3 bg-[#121212] border border-[#D5B263]/40 rounded-xl text-white"
                                    >
                                        <option value="dresses">Dresses & One Pieces</option>
                                        <option value="tops">Tops & Blouses</option>
                                        <option value="ethnic">Kurtis & Ethnic Sets</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-white/60 mb-1">Style Silhouette</label>
                                    <input
                                        type="text"
                                        value={newGarment.styleTag}
                                        onChange={e => setNewGarment({ ...newGarment, styleTag: e.target.value })}
                                        className="w-full p-3 bg-[#121212] border border-[#D5B263]/40 rounded-xl text-white"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-white/60 mb-1">Selling Price (₹)</label>
                                    <input
                                        type="number"
                                        value={newGarment.price}
                                        onChange={e => setNewGarment({ ...newGarment, price: Number(e.target.value) })}
                                        className="w-full p-3 bg-[#121212] border border-[#D5B263]/40 rounded-xl text-white font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/60 mb-1">MRP Price (₹)</label>
                                    <input
                                        type="number"
                                        value={newGarment.mrp}
                                        onChange={e => setNewGarment({ ...newGarment, mrp: Number(e.target.value) })}
                                        className="w-full p-3 bg-[#121212] border border-[#D5B263]/40 rounded-xl text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/60 mb-1">Stock Units</label>
                                    <input
                                        type="number"
                                        value={newGarment.stockCount}
                                        onChange={e => setNewGarment({ ...newGarment, stockCount: Number(e.target.value) })}
                                        className="w-full p-3 bg-[#121212] border border-[#D5B263]/40 rounded-xl text-white"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-white/60 mb-1">Fabric & Material</label>
                                    <input
                                        type="text"
                                        value={newGarment.fabric}
                                        onChange={e => setNewGarment({ ...newGarment, fabric: e.target.value })}
                                        className="w-full p-3 bg-[#121212] border border-[#D5B263]/40 rounded-xl text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/60 mb-1">Tailored Fit</label>
                                    <input
                                        type="text"
                                        value={newGarment.fit}
                                        onChange={e => setNewGarment({ ...newGarment, fit: e.target.value })}
                                        className="w-full p-3 bg-[#121212] border border-[#D5B263]/40 rounded-xl text-white"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-[#D5B263] text-[#121212] font-bold text-xs uppercase tracking-wider rounded-xl mt-4 cursor-pointer hover:bg-white transition-colors"
                            >
                                Publish Silhouette to Live Storefront
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* INVOICE VIEWER MODAL */}
            {invoiceOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div onClick={() => setInvoiceOrder(null)} className="fixed inset-0 bg-black/85 backdrop-blur-md" />
                    <div className="relative w-full max-w-xl bg-white text-black p-8 rounded-3xl z-10 space-y-6">
                        <div className="flex justify-between items-start border-b border-stone-200 pb-4">
                            <div>
                                <span className="font-serif-luxury text-2xl font-bold tracking-widest text-[#D5B263]">TISUTA</span>
                                <p className="text-xs text-stone-500">Official Tax Invoice • GSTIN: 27AABCT1234F1Z9</p>
                            </div>
                            <span className="font-mono text-xs font-bold">{invoiceOrder.id}</span>
                        </div>

                        <div className="text-xs space-y-1">
                            <p><strong>Billed To:</strong> {invoiceOrder.shippingAddress?.fullName}</p>
                            <p>{invoiceOrder.shippingAddress?.addressLine}, {invoiceOrder.shippingAddress?.city}</p>
                            <p>Payment: {invoiceOrder.paymentMethod}</p>
                        </div>

                        <table className="w-full text-xs text-left">
                            <thead className="border-b border-stone-200 font-bold">
                                <tr>
                                    <th className="py-2">Item</th>
                                    <th className="py-2">Qty</th>
                                    <th className="py-2 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceOrder.items.map((it, i) => (
                                    <tr key={i} className="border-b border-stone-100">
                                        <td className="py-2">{it.product?.name} ({it.size})</td>
                                        <td className="py-2">{it.quantity}</td>
                                        <td className="py-2 text-right">₹{((it.product?.price || 0) * it.quantity).toLocaleString('en-IN')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-between font-bold text-sm pt-2">
                            <span>Total (Inclusive of 12% GST)</span>
                            <span>₹{invoiceOrder.total.toLocaleString('en-IN')}</span>
                        </div>

                        <button
                            onClick={() => { window.print(); setInvoiceOrder(null); }}
                            className="w-full py-3 bg-[#121212] text-[#D5B263] font-bold text-xs uppercase rounded-xl"
                        >
                            Print Tax Invoice
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminDashboardPage;

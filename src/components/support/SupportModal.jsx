import React, { useState } from 'react';
import { Headphones, X, Send, HelpCircle, FileText, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const SupportModal = () => {
    const { isSupportOpen, setIsSupportOpen, supportTickets, user } = useShop();
    const [activeTab, setActiveTab] = useState('concierge'); // concierge, ticket, faq
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: 'Welcome to TISUTA Privé Client Support. How can our concierge team assist you today? You can inquire regarding tailoring alterations, dispatch tracking, or initiate a size exchange.'
        }
    ]);
    const [inputMsg, setInputMsg] = useState('');
    const [ticketSubject, setTicketSubject] = useState('');
    const [ticketCategory, setTicketCategory] = useState('Tailoring & Fit');
    const [ticketDesc, setTicketDesc] = useState('');
    const [ticketSubmitted, setTicketSubmitted] = useState(false);

    if (!isSupportOpen) return null;

    const handleSendChat = (e) => {
        e.preventDefault();
        if (!inputMsg.trim()) return;
        const userText = inputMsg;
        setMessages(prev => [...prev, { sender: 'user', text: userText }]);
        setInputMsg('');

        setTimeout(() => {
            let reply = "Our client concierge has received your request and is reviewing your order details. A member of our styling atelier will respond in real time.";
            const low = userText.toLowerCase();
            if (low.includes('return') || low.includes('exchange')) {
                reply = "You can initiate a hassle-free 7-day home pickup or size exchange directly from your Account Dashboard under the Orders tab.";
            } else if (low.includes('delivery') || low.includes('track')) {
                reply = "All TISUTA orders are dispatched via Blue Dart Luxury Express with real-time GPS tracking and 2-4 business day white-glove doorstep delivery.";
            } else if (low.includes('alter') || low.includes('size')) {
                reply = "Royal Privé members enjoy complimentary master atelier tailoring. Submit a support ticket or visit our Bandra Atelier.";
            }
            setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
        }, 800);
    };

    const handleCreateTicket = (e) => {
        e.preventDefault();
        setTicketSubmitted(true);
        setTimeout(() => {
            setTicketSubmitted(false);
            setTicketSubject('');
            setTicketDesc('');
            setActiveTab('concierge');
        }, 2500);
    };

    const faqs = [
        { q: 'How does TISUTA 3D Virtual Fit calculate size recommendations?', a: 'Our proprietary computer-vision AI processes bust, waist, hips, and preferred drape tightness to match garments against digital atelier mannequin scans with 98.4% precision.' },
        { q: 'What is the return and exchange window?', a: 'We offer a 7-day complimentary white-glove return or exchange service with doorstep pickup across 18,000+ Indian pincodes.' },
        { q: 'Are fabrics 100% genuine silk and organic cotton?', a: 'Yes. Every TISUTA garment carries an authenticity seal and is certified pure mulberry silk, Chanderi weave, or organic mulmul cotton.' },
        { q: 'How do TISUTA Royal Rewards work?', a: 'Earn 1 point for every ₹10 spent, redeemable instantly at checkout without minimum order thresholds.' }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                onClick={() => setIsSupportOpen(false)}
                className="fixed inset-0 bg-[#121212]/80 backdrop-blur-md"
            />

            <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl border border-[#D5B263]/40 shadow-2xl overflow-hidden z-10 flex flex-col h-[600px] max-h-[90vh]">
                
                {/* Header */}
                <div className="px-6 py-4 bg-[#121212] text-white flex items-center justify-between border-b border-[#D5B263]/30">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#D5B263] text-[#121212] rounded-xl font-bold">
                            <Headphones className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-serif-luxury text-base font-bold">
                                TISUTA 24/7 Client Concierge
                            </h3>
                            <p className="text-[10px] text-white/60">
                                Dedicated support for haute orders, sizing, alterations & trousseau
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSupportOpen(false)}
                        className="p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#D5B263]/25 bg-white/70 px-6">
                    {[
                        { id: 'concierge', label: 'AI Concierge Chat', icon: MessageSquare },
                        { id: 'ticket', label: 'Open Support Ticket', icon: FileText },
                        { id: 'faq', label: 'Knowledge Base & FAQ', icon: HelpCircle }
                    ].map(t => {
                        const Icon = t.icon;
                        return (
                            <button
                                key={t.id}
                                onClick={() => setActiveTab(t.id)}
                                className={`flex items-center gap-1.5 py-3 px-4 text-xs font-bold transition-all border-b-2 ${
                                    activeTab === t.id
                                        ? 'border-[#D5B263] text-[#121212]'
                                        : 'border-transparent text-[#121212]/50 hover:text-[#121212]'
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{t.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* TAB 1: Chat Stream */}
                {activeTab === 'concierge' && (
                    <div className="flex-1 flex flex-col justify-between overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((m, idx) => (
                                <div
                                    key={idx}
                                    className={`flex flex-col ${m.sender === 'bot' ? 'items-start' : 'items-end'}`}
                                >
                                    <div
                                        className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                                            m.sender === 'bot'
                                                ? 'bg-white text-[#121212] border border-[#D5B263]/30 shadow-sm'
                                                : 'bg-[#121212] text-[#FDFBF7]'
                                        }`}
                                    >
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSendChat} className="p-4 bg-white border-t border-[#D5B263]/20 flex gap-2">
                            <input
                                type="text"
                                value={inputMsg}
                                onChange={e => setInputMsg(e.target.value)}
                                placeholder="Type your inquiry for instant concierge assistance..."
                                className="flex-1 px-4 py-3 bg-[#F7F4EE] border border-[#D5B263]/40 rounded-xl text-xs font-medium text-[#121212] focus:outline-none focus:border-[#D5B263]"
                            />
                            <button
                                type="submit"
                                className="px-5 py-3 bg-[#121212] text-[#D5B263] font-bold text-xs rounded-xl hover:bg-[#D5B263] hover:text-[#121212] transition-colors flex items-center gap-1.5"
                            >
                                <span>Send</span>
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        </form>
                    </div>
                )}

                {/* TAB 2: Ticket Submission */}
                {activeTab === 'ticket' && (
                    <div className="flex-1 overflow-y-auto p-6">
                        {ticketSubmitted ? (
                            <div className="text-center py-16 space-y-3">
                                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                                <h4 className="font-serif-luxury text-xl font-bold text-[#121212]">
                                    Support Ticket Successfully Lodged
                                </h4>
                                <p className="text-xs text-[#121212]/60">
                                    Ticket Reference ID: <strong>TCK-TIS-{Math.floor(1000 + Math.random() * 9000)}</strong>
                                </p>
                                <p className="text-xs text-[#121212]/60">
                                    Our Senior Atelier Representative will contact you via email and phone within 2 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleCreateTicket} className="space-y-4 max-w-lg mx-auto text-xs">
                                <div>
                                    <label className="block text-[#121212]/70 font-bold uppercase mb-1">Issue Category</label>
                                    <select
                                        value={ticketCategory}
                                        onChange={e => setTicketCategory(e.target.value)}
                                        className="w-full p-3 bg-white border border-[#D5B263]/40 rounded-xl font-medium text-[#121212]"
                                    >
                                        <option>Tailoring & Alterations</option>
                                        <option>Size Exchange Request</option>
                                        <option>Delivery Delay Escalation</option>
                                        <option>Payment / Invoice Inquiries</option>
                                        <option>VIP Bridal Trousseau Styling Consultation</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[#121212]/70 font-bold uppercase mb-1">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={ticketSubject}
                                        onChange={e => setTicketSubject(e.target.value)}
                                        placeholder="e.g. Alteration inquiry for Minimal Midi Dress"
                                        className="w-full p-3 bg-white border border-[#D5B263]/40 rounded-xl"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#121212]/70 font-bold uppercase mb-1">Detailed Description</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={ticketDesc}
                                        onChange={e => setTicketDesc(e.target.value)}
                                        placeholder="Please describe the specifications or requirements..."
                                        className="w-full p-3 bg-white border border-[#D5B263]/40 rounded-xl"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-[#121212] text-[#D5B263] hover:bg-[#D5B263] hover:text-[#121212] font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                                >
                                    Submit Ticket to Concierge Desk
                                </button>
                            </form>
                        )}
                    </div>
                )}

                {/* TAB 3: FAQ */}
                {activeTab === 'faq' && (
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {faqs.map((f, i) => (
                            <div key={i} className="p-4 bg-white rounded-2xl border border-[#D5B263]/25 space-y-1.5">
                                <h5 className="font-serif-luxury text-sm font-bold text-[#121212]">
                                    {f.q}
                                </h5>
                                <p className="text-xs text-[#121212]/70 leading-relaxed font-light">
                                    {f.a}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupportModal;

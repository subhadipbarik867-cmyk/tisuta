import React from 'react';
import { X, Bell, Package, Tag, Heart, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const NotificationDrawer = () => {
    const { isNotificationOpen, setIsNotificationOpen, notifications } = useShop();

    if (!isNotificationOpen) return null;

    const getIcon = (type) => {
        switch (type) {
            case 'order':
                return <Package className="w-4 h-4 text-[#D5B263]" />;
            case 'price_drop':
                return <Tag className="w-4 h-4 text-green-600" />;
            case 'creator':
                return <Sparkles className="w-4 h-4 text-[#D5B263]" />;
            default:
                return <Bell className="w-4 h-4 text-[#D5B263]" />;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                onClick={() => setIsNotificationOpen(false)}
                className="fixed inset-0 bg-[#121212]/60 backdrop-blur-sm"
            />

            <div className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl z-10 flex flex-col border-l border-[#D5B263]/30">
                {/* Header */}
                <div className="px-6 py-5 bg-[#121212] text-white flex items-center justify-between border-b border-[#D5B263]/30">
                    <div className="flex items-center gap-2.5">
                        <Bell className="w-5 h-5 text-[#D5B263]" />
                        <h3 className="font-serif-luxury text-base font-bold">
                            TISUTA Notification Hub
                        </h3>
                    </div>
                    <button
                        onClick={() => setIsNotificationOpen(false)}
                        className="p-1.5 text-white/60 hover:text-white rounded-full hover:bg-white/10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`p-4 rounded-2xl border transition-all space-y-1.5 ${
                                !notif.read
                                    ? 'bg-white border-[#D5B263]/60 shadow-sm'
                                    : 'bg-white/50 border-stone-200 opacity-75'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-[#F7F4EE] rounded-lg border border-[#D5B263]/30">
                                        {getIcon(notif.type)}
                                    </div>
                                    <span className="font-serif-luxury text-xs font-bold text-[#121212]">
                                        {notif.title}
                                    </span>
                                </div>
                                <span className="text-[10px] text-[#121212]/40 font-medium">
                                    {notif.time}
                                </span>
                            </div>

                            <p className="text-xs text-[#121212]/70 leading-relaxed font-light pl-8">
                                {notif.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer Channels Toggle */}
                <div className="p-5 bg-white border-t border-[#D5B263]/25 space-y-3 text-xs">
                    <div className="flex items-center justify-between text-[#121212]/60">
                        <span>Push Notifications</span>
                        <span className="text-green-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-[#121212]/60">
                        <span>VIP Concierge WhatsApp</span>
                        <span className="text-[#D5B263] font-bold">Connected</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationDrawer;

// @ts-nocheck
import React, { useContext } from "react";
import { MessageCircle } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { SOCIAL_LINKS } from "../data/sampleProducts";

export default function WhatsAppButton() {
    const { state } = useContext(AppContext);

    const handleWhatsAppClick = () => {
        const cartSummary = state.cart.length > 0
            ? state.cart.map(item => `• ${item.name} (Qty: ${item.quantity}) - ₹${item.offerPrice * item.quantity}`).join('\n')
            : '';

        const message = state.cart.length > 0
            ? `Hi! I'm interested in ordering:\n\n${cartSummary}\n\nPlease confirm availability.`
            : `Hi! I'm browsing your saree collection and would like to know more about your products.`;

        window.open(`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <button
            onClick={handleWhatsAppClick}
            className="fixed bottom-6 left-6 z-40 group"
            aria-label="Chat on WhatsApp"
        >
            <div className="relative">
                {/* Pulse Animation */}
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-30" />

                {/* Button */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg shadow-green-300/50 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                {/* Tooltip - Hidden on mobile */}
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
                    Chat with us!
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900" />
                </div>
            </div>
        </button>
    );
}

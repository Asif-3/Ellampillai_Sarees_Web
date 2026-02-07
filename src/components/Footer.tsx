// @ts-nocheck
import React, { useContext } from "react";
import {
    Phone, Mail, MapPin, Clock, Sparkles, Crown,
    Youtube, Instagram, MessageCircle, Award, Shield, Truck, RefreshCw, Star
} from "lucide-react";
import { AppContext } from "../context/AppContext";
import { SOCIAL_LINKS } from "../data/sampleProducts";

export default function Footer() {
    const { setCurrentPage } = useContext(AppContext);

    return (
        <footer className="relative overflow-hidden">
            {/* Premium Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1a0a10] to-black" />
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiNmZmYiLz4KPC9zdmc+')]" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-rose-500/10 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10 text-white">
                {/* Premium Trust Banner */}
                <div className="border-b border-white/10">
                    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
                        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-12">
                            {[
                                { icon: Crown, text: "Premium Quality", color: "text-amber-400" },
                                { icon: Truck, text: "Free Delivery", color: "text-blue-400" },
                                { icon: Shield, text: "100% Authentic", color: "text-green-400" },
                                { icon: RefreshCw, text: "Easy Returns", color: "text-purple-400" },
                                { icon: Star, text: "5000+ Happy Clients", color: "text-yellow-400" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 group">
                                    <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                                    <span className="text-xs sm:text-sm font-medium text-white/80 group-hover:text-white transition">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="container mx-auto px-3 sm:px-4 py-10 sm:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                        {/* Brand Section */}
                        <div className="text-center lg:text-left">
                            {/* Logo & Brand */}
                            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 mb-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full blur-lg opacity-50 animate-pulse" />
                                    <img
                                        src="/logo.png"
                                        alt="Harshal Textiles"
                                        className="relative w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-full border-2 border-amber-400/50"
                                    />
                                </div>
                                <div className="lg:pt-2">
                                    <h2 className="text-2xl sm:text-3xl font-bold font-display mb-1">
                                        <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                                            Harshal Textiles
                                        </span>
                                    </h2>
                                    <p className="text-amber-400/80 text-sm tracking-widest uppercase">Elampillai</p>
                                    <div className="flex items-center justify-center lg:justify-start gap-1 mt-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                        ))}
                                        <span className="text-xs text-gray-400 ml-1">Trusted Since 2015</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-400 leading-relaxed text-sm max-w-md mx-auto lg:mx-0 mb-6">
                                Experience the finest handloom sarees directly from the legendary weavers of Elampillai.
                                Each piece is a masterpiece of tradition and craftsmanship, delivered to your doorstep at factory prices.
                            </p>

                            {/* Social Links */}
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <span className="text-xs text-gray-500 uppercase tracking-wider">Follow Us</span>
                                <div className="w-8 h-px bg-gradient-to-r from-gray-600 to-transparent" />
                                <a
                                    href={SOCIAL_LINKS.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/20"
                                >
                                    <Youtube className="w-4 h-4" />
                                </a>
                                <a
                                    href={SOCIAL_LINKS.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/5 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 border border-white/10 hover:border-pink-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/20"
                                >
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a
                                    href={SOCIAL_LINKS.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/5 hover:bg-green-600 border border-white/10 hover:border-green-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/20"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="lg:pl-10 lg:border-l border-white/10">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-3 justify-center lg:justify-start">
                                <Sparkles className="w-5 h-5 text-amber-400" />
                                <span>Get In Touch</span>
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <a
                                    href="tel:+919597268293"
                                    className="group p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/30 rounded-xl transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Phone className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Call / WhatsApp</p>
                                            <p className="font-semibold text-white group-hover:text-amber-400 transition">{SOCIAL_LINKS.phone}</p>
                                        </div>
                                    </div>
                                </a>

                                <a
                                    href="mailto:harshaltex@gmail.com"
                                    className="group p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/30 rounded-xl transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                                            <p className="font-semibold text-white group-hover:text-amber-400 transition text-sm">harshaltex@gmail.com</p>
                                        </div>
                                    </div>
                                </a>

                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                                            <p className="font-semibold text-white text-sm">Elampillai, Tamil Nadu</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Hours</p>
                                            <p className="font-semibold text-white text-sm">Mon - Sat: 9AM - 9PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-500 text-xs">
                            <p>© 2026 Harshal Textiles. All rights reserved.</p>
                            <p className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Secure Shopping Experience
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

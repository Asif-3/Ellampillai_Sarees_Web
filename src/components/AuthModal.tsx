// @ts-nocheck
import React, { useContext, useState } from "react";
import { X, Eye, EyeOff, Mail, Lock, User, Phone, Sparkles } from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function AuthModal() {
    const { showAuth, setShowAuth, authMode, setAuthMode, login, register } = useContext(AppContext);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    if (!showAuth) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (authMode === "login") {
            login(formData.email, formData.password);
        } else {
            register(formData.name, formData.email, formData.phone, formData.password);
        }

        setIsLoading(false);
        setFormData({ name: "", email: "", phone: "", password: "" });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAuth(false)}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

            {/* Modal */}
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-[#8B1538] via-[#A91E4A] to-[#8B1538] p-8 text-center relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />

                    <button
                        onClick={() => setShowAuth(false)}
                        className="absolute top-4 right-4 text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="relative">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur">
                            <Sparkles className="w-10 h-10 text-yellow-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white font-display">
                            {authMode === "login" ? "Welcome Back!" : "Create Account"}
                        </h2>
                        <p className="text-white/80 mt-2">
                            {authMode === "login"
                                ? "Sign in to continue shopping"
                                : "Join us for exclusive deals"}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    {authMode === "register" && (
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter your name"
                                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#8B1538] focus:ring-4 focus:ring-[#8B1538]/10 transition outline-none"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="you@example.com"
                                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#8B1538] focus:ring-4 focus:ring-[#8B1538]/10 transition outline-none"
                                required
                            />
                        </div>
                    </div>

                    {authMode === "register" && (
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="10-digit mobile number"
                                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#8B1538] focus:ring-4 focus:ring-[#8B1538]/10 transition outline-none"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#8B1538] focus:ring-4 focus:ring-[#8B1538]/10 transition outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {authMode === "login" && (
                        <div className="flex justify-end">
                            <button type="button" className="text-sm text-[#8B1538] hover:underline">
                                Forgot password?
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition ${isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-[#8B1538] to-[#A91E4A] hover:from-[#6B0F28] hover:to-[#8B1538] text-white shadow-lg shadow-rose-200 hover:shadow-xl"
                            }`}
                    >
                        {isLoading ? (
                            <span className="inline-flex items-center gap-2">
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Please wait...
                            </span>
                        ) : (
                            authMode === "login" ? "Sign In" : "Create Account"
                        )}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-sm text-gray-400">or continue with</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition"
                        >
                            <Phone className="w-5 h-5 text-gray-600" />
                            Phone OTP
                        </button>
                    </div>

                    {/* Switch Mode */}
                    <p className="text-center text-gray-600">
                        {authMode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            type="button"
                            onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
                            className="text-[#8B1538] font-semibold hover:underline"
                        >
                            {authMode === "login" ? "Sign Up" : "Sign In"}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

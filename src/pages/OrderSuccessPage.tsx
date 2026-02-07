// @ts-nocheck
import React, { useContext } from "react";
import { CheckCircle, Package, ArrowRight, Home, Calendar, Truck } from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function OrderSuccessPage() {
    const { state, setCurrentPage } = useContext(AppContext);
    const lastOrder = state.orders[0];

    if (!lastOrder) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500">No order found</p>
                    <button onClick={() => setCurrentPage("home")} className="btn-primary mt-4">
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Success Animation */}
                    <div className="text-center mb-8">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                            <CheckCircle className="w-14 h-14 text-green-600" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3 font-display animate-fade-in-up">
                            Order Placed Successfully! 🎉
                        </h1>
                        <p className="text-gray-600 text-lg animate-fade-in-up stagger-1">
                            Thank you for shopping with Elampillai Sarees
                        </p>
                    </div>

                    {/* Order Details Card */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 animate-fade-in-up stagger-2">
                        <div className="bg-gradient-to-r from-[#8B1538] to-[#A91E4A] p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm">Order ID</p>
                                    <p className="text-xl font-bold">{lastOrder._id}</p>
                                </div>
                                <Package className="w-12 h-12 text-white/30" />
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Order Status Timeline */}
                            <div className="flex items-center justify-between">
                                {[
                                    { label: "Placed", icon: CheckCircle, active: true },
                                    { label: "Confirmed", icon: Package, active: false },
                                    { label: "Shipped", icon: Truck, active: false },
                                    { label: "Delivered", icon: Home, active: false }
                                ].map((step, idx) => (
                                    <React.Fragment key={step.label}>
                                        <div className="flex flex-col items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.active
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-gray-100 text-gray-400'
                                                }`}>
                                                <step.icon className="w-5 h-5" />
                                            </div>
                                            <span className={`text-xs mt-2 ${step.active ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                                                {step.label}
                                            </span>
                                        </div>
                                        {idx < 3 && (
                                            <div className={`flex-1 h-0.5 ${idx === 0 ? 'bg-green-500' : 'bg-gray-200'}`} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Order Items */}
                            <div className="border-t pt-6">
                                <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>
                                <div className="space-y-3">
                                    {lastOrder.items.map(item => (
                                        <div key={item._id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-3">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-800 truncate">{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-bold text-green-600">₹{item.offerPrice * item.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Delivery Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6">
                                <div className="bg-blue-50 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Truck className="w-5 h-5 text-blue-600" />
                                        <span className="font-medium text-gray-800">Estimated Delivery</span>
                                    </div>
                                    <p className="text-blue-700 font-bold">
                                        {estimatedDelivery.toLocaleDateString('en-IN', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long'
                                        })}
                                    </p>
                                </div>
                                <div className="bg-green-50 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Calendar className="w-5 h-5 text-green-600" />
                                        <span className="font-medium text-gray-800">Payment Status</span>
                                    </div>
                                    <p className="text-green-700 font-bold">
                                        {lastOrder.paymentMethod === "cod" ? "Pay on Delivery" : "Paid ✓"}
                                    </p>
                                </div>
                            </div>

                            {/* Delivery Address */}
                            <div className="bg-gray-50 rounded-xl p-4 border-t pt-6">
                                <h4 className="font-medium text-gray-800 mb-2">Delivering to</h4>
                                <p className="text-gray-600">
                                    {lastOrder.address.name}<br />
                                    {lastOrder.address.addressLine}, {lastOrder.address.landmark && `${lastOrder.address.landmark}, `}
                                    {lastOrder.address.city}, {lastOrder.address.state} - {lastOrder.address.pincode}<br />
                                    Phone: {lastOrder.address.phone}
                                </p>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center py-4 border-t">
                                <span className="text-xl font-bold text-gray-800">Order Total</span>
                                <span className="text-2xl font-bold text-green-600">₹{lastOrder.total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
                        <button
                            onClick={() => setCurrentPage("orders")}
                            className="flex-1 py-4 bg-gradient-to-r from-[#8B1538] to-[#A91E4A] text-white rounded-xl font-bold text-lg hover:from-[#6B0F28] hover:to-[#8B1538] transition inline-flex items-center justify-center gap-2"
                        >
                            Track Order <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setCurrentPage("products")}
                            className="flex-1 py-4 border-2 border-[#8B1538] text-[#8B1538] rounded-xl font-bold text-lg hover:bg-[#8B1538] hover:text-white transition"
                        >
                            Continue Shopping
                        </button>
                    </div>

                    {/* WhatsApp Support */}
                    <div className="mt-8 text-center animate-fade-in-up stagger-4">
                        <p className="text-gray-500 mb-3">Need help with your order?</p>
                        <a
                            href="https://wa.me/919597268293"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-green-600 font-semibold hover:underline"
                        >
                            📱 Chat with us on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

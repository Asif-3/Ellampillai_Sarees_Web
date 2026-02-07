// @ts-nocheck
import React, { useContext, useState } from "react";
import { X, Smartphone, Copy, Check, QrCode, CreditCard, ArrowRight, Shield, AlertCircle } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { UPI_CONFIG } from "../data/sampleProducts";

export default function UPIPayment({ amount, orderId, onSuccess, onClose }) {
    const { showToast } = useContext(AppContext);
    const [step, setStep] = useState(1);
    const [upiApp, setUpiApp] = useState("");
    const [copied, setCopied] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    const upiId = UPI_CONFIG.merchantVpa;
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(UPI_CONFIG.merchantName)}&am=${amount}&cu=${UPI_CONFIG.currency}&tn=Order${orderId}`;

    const copyUpiId = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        showToast("UPI ID copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    const openUPIApp = (app) => {
        setUpiApp(app);

        // Construct deep links for different apps
        let deepLink = upiLink;

        if (app === "gpay") {
            deepLink = `gpay://upi/pay?pa=${upiId}&pn=${encodeURIComponent(UPI_CONFIG.merchantName)}&am=${amount}&cu=INR&tn=Order${orderId}`;
        } else if (app === "phonepe") {
            deepLink = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(UPI_CONFIG.merchantName)}&am=${amount}&cu=INR&tn=Order${orderId}`;
        } else if (app === "paytm") {
            deepLink = `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(UPI_CONFIG.merchantName)}&am=${amount}&cu=INR&tn=Order${orderId}`;
        }

        window.open(deepLink, '_blank');
        setStep(2);
    };

    const verifyPayment = async () => {
        if (!transactionId.trim()) {
            showToast("Please enter transaction ID", "error");
            return;
        }

        setIsVerifying(true);
        // Simulate verification
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsVerifying(false);
        setStep(3);

        setTimeout(() => {
            onSuccess(transactionId);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/10 rounded-xl">
                            <Smartphone className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">UPI Payment</h2>
                            <p className="text-white/80 text-sm">Secure & Instant</p>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 flex justify-between items-center">
                        <span className="text-white/80">Amount to Pay</span>
                        <span className="text-3xl font-bold">₹{amount}</span>
                    </div>
                </div>

                {/* Step 1: Choose UPI App */}
                {step === 1 && (
                    <div className="p-6 space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-4">Pay using UPI App</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { id: "gpay", name: "Google Pay", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png", color: "from-blue-400 to-blue-600" },
                                    { id: "phonepe", name: "PhonePe", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1024px-PhonePe_Logo.svg.png", color: "from-purple-500 to-purple-700" },
                                    { id: "paytm", name: "Paytm", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/512px-Paytm_Logo_%28standalone%29.svg.png", color: "from-blue-500 to-cyan-500" }
                                ].map(app => (
                                    <button
                                        key={app.id}
                                        onClick={() => openUPIApp(app.id)}
                                        className="flex flex-col items-center gap-2 p-4 border-2 border-gray-100 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition"
                                    >
                                        <div className={`w-12 h-12 bg-gradient-to-br ${app.color} rounded-xl flex items-center justify-center text-white text-xl font-bold`}>
                                            {app.name[0]}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{app.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-4 text-sm text-gray-500">or pay using UPI ID</span>
                            </div>
                        </div>

                        {/* UPI ID Section */}
                        <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-sm text-gray-500 mb-2">UPI ID</p>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 font-mono text-lg">
                                    {upiId}
                                </div>
                                <button
                                    onClick={copyUpiId}
                                    className={`p-3 rounded-lg transition ${copied ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                                        }`}
                                >
                                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                                Open any UPI app and pay to this UPI ID
                            </p>
                        </div>

                        {/* Security Badge */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span>100% Secure Payment</span>
                        </div>
                    </div>
                )}

                {/* Step 2: Enter Transaction ID */}
                {step === 2 && (
                    <div className="p-6 space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-8 h-8 text-amber-600" />
                            </div>
                            <h3 className="font-bold text-xl text-gray-800 mb-2">Complete Payment</h3>
                            <p className="text-gray-500">
                                Complete the payment in {upiApp === "gpay" ? "Google Pay" : upiApp === "phonepe" ? "PhonePe" : "Paytm"} app
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Enter UPI Transaction ID / Reference Number
                                </label>
                                <input
                                    type="text"
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                    placeholder="e.g., 123456789012"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition outline-none"
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    You can find this in your UPI app payment history
                                </p>
                            </div>

                            <button
                                onClick={verifyPayment}
                                disabled={isVerifying}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 ${isVerifying
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
                                    }`}
                            >
                                {isVerifying ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Verifying Payment...
                                    </>
                                ) : (
                                    <>
                                        Verify Payment <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => setStep(1)}
                                className="w-full py-3 text-gray-600 font-medium hover:text-gray-800"
                            >
                                Try Different Payment Method
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Success */}
                {step === 3 && (
                    <div className="p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                            <Check className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
                        <p className="text-gray-500 mb-6">
                            Your order has been placed successfully
                        </p>
                        <div className="bg-gray-50 rounded-xl p-4 text-left">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">Transaction ID</span>
                                <span className="font-mono font-semibold">{transactionId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Amount Paid</span>
                                <span className="font-bold text-green-600">₹{amount}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

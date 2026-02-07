// @ts-nocheck
import React, { useContext, useState } from "react";
import {
  ChevronLeft, Lock, CreditCard, Smartphone, Building,
  Check, Truck, Shield, MapPin, User, Phone, Mail
} from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function CheckoutPage() {
  const { state, dispatch, setCurrentPage, showToast } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    name: state.user?.name || "",
    phone: "",
    email: state.user?.email || "",
    addressLine: "",
    landmark: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = state.cart.reduce((sum, item) => sum + item.offerPrice * item.quantity, 0);
  const shippingCharge = subtotal >= 1000 ? 0 : 50;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shippingCharge - discount;

  const validateAddress = () => {
    if (!address.name || !address.phone || !address.addressLine || !address.city || !address.state || !address.pincode) {
      showToast("Please fill all required fields", "error");
      return false;
    }
    if (!/^\d{10}$/.test(address.phone)) {
      showToast("Please enter a valid 10-digit phone number", "error");
      return false;
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      showToast("Please enter a valid 6-digit pincode", "error");
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (step === 1 && validateAddress()) {
      setStep(2);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order = {
      _id: 'ELM' + Date.now(),
      items: state.cart,
      total,
      subtotal,
      shippingCharge,
      discount,
      address,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid",
      status: 'PLACED',
      statusHistory: [{ state: 'PLACED', timestamp: new Date().toISOString() }],
      createdAt: new Date().toISOString()
    };

    dispatch({ type: 'ADD_ORDER', payload: order });
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem("elampillai_cart");

    setIsProcessing(false);
    showToast("Order placed successfully! 🎉");
    setCurrentPage('order-success');
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "FIRST10") {
      setCouponApplied(true);
      showToast("Coupon applied! 10% discount added 🎉");
    } else {
      showToast("Invalid coupon code", "error");
    }
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some beautiful sarees to checkout</p>
          <button onClick={() => setCurrentPage("products")} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B1538] to-[#A91E4A] py-6">
        <div className="container mx-auto px-4">
          <button
            onClick={() => setCurrentPage("products")}
            className="text-white/80 hover:text-white inline-flex items-center gap-2 mb-4"
          >
            <ChevronLeft className="w-5 h-5" /> Continue Shopping
          </button>
          <h1 className="text-3xl font-bold text-white font-display">Secure Checkout</h1>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-6">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-white' : 'text-white/50'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-yellow-400 text-amber-900' : 'bg-white/20'
                }`}>1</span>
              <span className="hidden sm:inline">Address</span>
            </div>
            <div className="w-12 h-0.5 bg-white/30" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-white' : 'text-white/50'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-yellow-400 text-amber-900' : 'bg-white/20'
                }`}>2</span>
              <span className="hidden sm:inline">Payment</span>
            </div>
            <div className="w-12 h-0.5 bg-white/30" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-white' : 'text-white/50'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-yellow-400 text-amber-900' : 'bg-white/20'
                }`}>3</span>
              <span className="hidden sm:inline">Confirm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 animate-fade-in-up">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-[#8B1538]" />
                  Delivery Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={address.name}
                        onChange={(e) => setAddress({ ...address, name: e.target.value })}
                        className="input-premium pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="input-premium pl-10"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Email for order updates"
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        className="input-premium pl-10"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                    <textarea
                      placeholder="House no, Building, Street, Area"
                      value={address.addressLine}
                      onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                      className="input-premium min-h-[100px]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                    <input
                      type="text"
                      placeholder="Nearby landmark (optional)"
                      value={address.landmark}
                      onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                      className="input-premium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="input-premium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                    <select
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="input-premium"
                    >
                      <option value="">Select State</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                    <input
                      type="text"
                      placeholder="6-digit pincode"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="input-premium"
                    />
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  className="mt-6 w-full btn-primary text-lg py-4"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in-up">
                {/* Address Summary */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Delivery Address</h3>
                      <p className="text-gray-600">
                        {address.name}<br />
                        {address.phone}<br />
                        {address.addressLine}, {address.landmark && `${address.landmark}, `}
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-[#8B1538] font-medium hover:underline"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-[#8B1538]" />
                    Payment Method
                  </h2>

                  <div className="space-y-3">
                    {/* Cash on Delivery */}
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${paymentMethod === "cod" ? 'border-[#8B1538] bg-rose-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="w-5 h-5 text-[#8B1538]"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay when you receive your order</p>
                      </div>
                      <span className="text-2xl">💵</span>
                    </label>

                    {/* UPI Payment */}
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${paymentMethod === "upi" ? 'border-[#8B1538] bg-rose-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="w-5 h-5 text-[#8B1538]"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">UPI Payment</p>
                        <p className="text-sm text-gray-500">Google Pay, PhonePe, Paytm, etc.</p>
                      </div>
                      <Smartphone className="w-8 h-8 text-purple-600" />
                    </label>

                    {/* Card Payment */}
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${paymentMethod === "card" ? 'border-[#8B1538] bg-rose-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="w-5 h-5 text-[#8B1538]"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">Credit/Debit Card</p>
                        <p className="text-sm text-gray-500">Visa, Mastercard, Rupay</p>
                      </div>
                      <CreditCard className="w-8 h-8 text-blue-600" />
                    </label>

                    {/* Net Banking */}
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${paymentMethod === "netbanking" ? 'border-[#8B1538] bg-rose-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="netbanking"
                        checked={paymentMethod === "netbanking"}
                        onChange={() => setPaymentMethod("netbanking")}
                        className="w-5 h-5 text-[#8B1538]"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">Net Banking</p>
                        <p className="text-sm text-gray-500">All major banks supported</p>
                      </div>
                      <Building className="w-8 h-8 text-green-600" />
                    </label>
                  </div>

                  {/* Payment Details for Card/UPI */}
                  {(paymentMethod === "card" || paymentMethod === "upi" || paymentMethod === "netbanking") && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <p className="text-blue-700 text-sm">
                        <Lock className="w-4 h-4 inline mr-1" />
                        You will be redirected to secure payment gateway after placing order.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className={`flex-1 py-4 rounded-xl font-bold text-lg transition ${isProcessing
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#8B1538] to-[#A91E4A] hover:from-[#6B0F28] hover:to-[#8B1538] text-white'
                        }`}
                    >
                      {isProcessing ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        `Place Order • ₹${total}`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {state.cart.map(item => (
                  <div key={item._id} className="flex gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-green-600">₹{item.offerPrice * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B1538]/20"
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={couponApplied || !couponCode}
                    className={`px-4 py-2 rounded-lg font-medium ${couponApplied
                        ? 'bg-green-100 text-green-600'
                        : 'bg-[#8B1538] text-white hover:bg-[#6B0F28]'
                      }`}
                  >
                    {couponApplied ? <Check className="w-5 h-5" /> : 'Apply'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Try: FIRST10 for 10% off</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({state.cart.length} items)</span>
                  <span>₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shippingCharge === 0 ? 'text-green-600 font-semibold' : ''}>
                    {shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}
                  </span>
                </div>

                {subtotal < 1000 && (
                  <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                    Add ₹{1000 - subtotal} more for free shipping!
                  </p>
                )}

                <div className="flex justify-between text-xl font-bold pt-3 border-t">
                  <span>Total</span>
                  <span className="text-green-600">₹{total}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>100% Secure Payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span>5-7 Days Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Lock className="w-5 h-5 text-purple-600" />
                  <span>SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// @ts-nocheck
import React, { useContext } from "react";
import { X, Minus, Plus, Trash2, ShoppingCart, ArrowRight, Tag } from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function CartDrawer() {
  const { state, dispatch, showCart, setShowCart, setCurrentPage, showToast } = useContext(AppContext);

  const updateQuantity = (id, newQty) => {
    dispatch({ type: "UPDATE_CART_QUANTITY", payload: { id, quantity: newQty } });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    showToast("Item removed from cart");
  };

  const subtotal = state.cart.reduce((sum, item) => sum + item.offerPrice * item.quantity, 0);
  const savedAmount = state.cart.reduce((sum, item) => sum + (item.price - item.offerPrice) * item.quantity, 0);
  const shippingCharge = subtotal >= 1000 ? 0 : 50;
  const total = subtotal + shippingCharge;

  const handleCheckout = () => {
    setShowCart(false);
    setCurrentPage("checkout");
  };

  if (!showCart) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      onClick={() => setShowCart(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />

      {/* Cart Panel */}
      <div
        className="relative bg-white w-full max-w-md h-full flex flex-col animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B1538] to-[#A91E4A] p-6">
          <div className="flex justify-between items-center text-white">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ShoppingCart className="w-7 h-7" />
              Cart ({state.cart.length})
            </h2>
            <button
              onClick={() => setShowCart(false)}
              className="p-2 hover:bg-white/10 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {savedAmount > 0 && (
            <div className="mt-3 flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
              <Tag className="w-4 h-4" />
              <span className="text-sm">You're saving ₹{savedAmount} on this order!</span>
            </div>
          )}
        </div>

        {/* Cart Items */}
        {state.cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="w-16 h-16 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6 text-center">
              Looks like you haven't added any sarees yet
            </p>
            <button
              onClick={() => { setShowCart(false); setCurrentPage("products"); }}
              className="btn-primary inline-flex items-center gap-2"
            >
              Start Shopping <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {state.cart.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 bg-gray-50 rounded-xl p-4 animate-fade-in-up"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.category}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-green-600">₹{item.offerPrice}</span>
                      {item.price !== item.offerPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{item.price}</span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t bg-white p-6 space-y-4">
              {/* Free Shipping Progress */}
              {subtotal < 1000 && (
                <div className="bg-amber-50 rounded-xl p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-amber-700">Add ₹{1000 - subtotal} for free shipping</span>
                    <span className="font-semibold text-amber-700">{Math.round(subtotal / 10)}%</span>
                  </div>
                  <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-500"
                      style={{ width: `${Math.min(100, subtotal / 10)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shippingCharge === 0 ? 'text-green-600 font-semibold' : ''}>
                    {shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-green-600">₹{total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-[#8B1538] to-[#A91E4A] text-white py-4 rounded-xl hover:from-[#6B0F28] hover:to-[#8B1538] transition font-bold text-lg shadow-lg shadow-rose-200 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Continue Shopping */}
              <button
                onClick={() => { setShowCart(false); setCurrentPage("products"); }}
                className="w-full text-[#8B1538] py-2 font-medium hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

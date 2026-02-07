// @ts-nocheck
import React, { useContext } from "react";
import {
  Package, ChevronRight, Truck, CheckCircle, Clock,
  XCircle, MapPin, Phone, Calendar, ArrowRight, ChevronLeft
} from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function OrdersPage() {
  const { state, setCurrentPage, setSelectedProduct } = useContext(AppContext);

  const getStatusColor = (status) => {
    switch (status) {
      case "PLACED": return "bg-blue-100 text-blue-700";
      case "CONFIRMED": return "bg-purple-100 text-purple-700";
      case "SHIPPED": return "bg-amber-100 text-amber-700";
      case "OUT_FOR_DELIVERY": return "bg-orange-100 text-orange-700";
      case "DELIVERED": return "bg-green-100 text-green-700";
      case "CANCELLED": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PLACED": return Clock;
      case "CONFIRMED": return CheckCircle;
      case "SHIPPED": return Truck;
      case "OUT_FOR_DELIVERY": return Truck;
      case "DELIVERED": return CheckCircle;
      case "CANCELLED": return XCircle;
      default: return Package;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (state.orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-16 h-16 text-blue-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No orders yet</h2>
          <p className="text-gray-500 mb-8">
            When you place an order, it will appear here
          </p>
          <button
            onClick={() => setCurrentPage("products")}
            className="btn-primary inline-flex items-center gap-2"
          >
            Start Shopping <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B1538] to-[#A91E4A] py-8">
        <div className="container mx-auto px-4">
          <button
            onClick={() => setCurrentPage("home")}
            className="text-white/80 hover:text-white inline-flex items-center gap-2 mb-4"
          >
            <ChevronLeft className="w-5 h-5" /> Back to Home
          </button>
          <h1 className="text-3xl font-bold text-white font-display flex items-center gap-3">
            <Package className="w-8 h-8" />
            My Orders
          </h1>
          <p className="text-white/80 mt-1">{state.orders.length} orders placed</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {state.orders.map((order, idx) => {
            const StatusIcon = getStatusIcon(order.status);

            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b">
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-bold text-gray-800">{order._id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Placed on</p>
                      <p className="font-medium text-gray-700">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-bold text-green-600 text-lg">₹{order.total}</p>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                    <StatusIcon className="w-5 h-5" />
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item._id}
                          className="flex gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition"
                          onClick={() => {
                            setSelectedProduct(item);
                            setCurrentPage("product-detail");
                          }}
                        >
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg shadow-sm"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{item.category} • {item.color}</p>
                            <div className="flex items-center gap-4">
                              <span className="text-green-600 font-bold">₹{item.offerPrice}</span>
                              <span className="text-gray-500">Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 self-center" />
                        </div>
                      ))}
                    </div>

                    {/* Delivery Info */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-[#8B1538]" />
                          Delivery Address
                        </h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="font-medium text-gray-800">{order.address.name}</p>
                          <p>{order.address.addressLine}</p>
                          {order.address.landmark && <p>{order.address.landmark}</p>}
                          <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                          <p className="flex items-center gap-2 mt-2 pt-2 border-t">
                            <Phone className="w-4 h-4" />
                            {order.address.phone}
                          </p>
                        </div>
                      </div>

                      {/* Order Timeline */}
                      {order.statusHistory && order.statusHistory.length > 0 && (
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[#8B1538]" />
                            Order Timeline
                          </h4>
                          <div className="space-y-3">
                            {order.statusHistory.map((status, sidx) => (
                              <div key={sidx} className="flex items-start gap-3">
                                <div className={`w-3 h-3 rounded-full mt-1.5 ${sidx === order.statusHistory.length - 1
                                    ? 'bg-green-500'
                                    : 'bg-gray-300'
                                  }`} />
                                <div>
                                  <p className="font-medium text-gray-800">
                                    {status.state.replace(/_/g, ' ')}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatDate(status.timestamp)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-3 border-t">
                  <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium text-sm">
                    Download Invoice
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium text-sm">
                    Track Order
                  </button>
                  {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                    <button className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-600 hover:bg-red-100 transition font-medium text-sm">
                      Cancel Order
                    </button>
                  )}
                  <button className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-green-600 hover:bg-green-100 transition font-medium text-sm ml-auto">
                    Need Help?
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

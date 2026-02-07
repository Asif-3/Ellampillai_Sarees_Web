// @ts-nocheck
import React, { useContext } from "react";
import { Package, ShoppingCart, Truck, Star } from "lucide-react";
import { AppContext } from "../../context/AppContext";

export default function AdminDashboard() {
  const { state, setCurrentPage } = useContext(AppContext);
  const stats = {
    totalProducts: state.products.length,
    totalOrders: state.orders.length,
    pendingOrders: state.orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length,
    revenue: state.orders.reduce((sum,o)=> sum + o.total, 0)
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow"><div className="flex items-center justify-between"><div><p className="text-blue-100 mb-1">Total Products</p><p className="text-3xl font-bold">{stats.totalProducts}</p></div><Package className="w-12 h-12 text-blue-200" /></div></div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow"><div className="flex items-center justify-between"><div><p className="text-green-100 mb-1">Total Orders</p><p className="text-3xl font-bold">{stats.totalOrders}</p></div><ShoppingCart className="w-12 h-12 text-green-200" /></div></div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow"><div className="flex items-center justify-between"><div><p className="text-orange-100 mb-1">Pending Orders</p><p className="text-3xl font-bold">{stats.pendingOrders}</p></div><Truck className="w-12 h-12 text-orange-200" /></div></div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow"><div className="flex items-center justify-between"><div><p className="text-purple-100 mb-1">Total Revenue</p><p className="text-3xl font-bold">₹{stats.revenue}</p></div><Star className="w-12 h-12 text-purple-200" /></div></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button onClick={()=>setCurrentPage('admin-products')} className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition text-left"><Package className="w-12 h-12 text-red-600 mb-4" /><h2 className="text-2xl font-bold mb-2">Manage Products</h2><p className="text-gray-600">Add, edit, or delete saree products</p></button>
        <button onClick={()=>setCurrentPage('admin-orders')} className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition text-left"><ShoppingCart className="w-12 h-12 text-red-600 mb-4" /><h2 className="text-2xl font-bold mb-2">Manage Orders</h2><p className="text-gray-600">View and update order status</p></button>
      </div>
    </div>
  );
}

// @ts-nocheck
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

export default function AdminOrders() {
  const { state, dispatch, setCurrentPage } = useContext(AppContext);
  const [filterStatus, setFilterStatus] = useState('');
  const filteredOrders = filterStatus ? state.orders.filter(o=> o.status === filterStatus) : state.orders;
  const handleStatusChange = (orderId, newStatus) => { dispatch({type:'UPDATE_ORDER_STATUS', payload:{orderId, status: newStatus}}); };
  const statusOptions = ['PLACED','PACKED','SHIPPED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED'];
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8"><h1 className="text-3xl font-bold">Manage Orders</h1><button onClick={()=>setCurrentPage('admin')} className="px-4 py-2 border rounded hover:bg-gray-100">Back to Dashboard</button></div>
      <div className="mb-6"><label className="font-semibold mr-4">Filter by Status:</label><select value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)} className="border rounded px-4 py-2"><option value="">All Orders</option>{statusOptions.map(s=> <option key={s} value={s}>{s}</option>)}</select></div>
      <div className="space-y-4">{filteredOrders.map(order=><div key={order._id} className="bg-white rounded-lg shadow p-6"><div className="flex justify-between items-start mb-4"><div><h3 className="text-xl font-bold">Order #{order._id}</h3><p className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</p><p className="text-gray-600">Customer: {order.address.name} - {order.address.phone}</p></div><div className="text-right"><p className="text-2xl font-bold text-green-600">₹{order.total}</p><div className="mt-2"><label className="block text-sm font-semibold mb-1">Update Status:</label><select value={order.status} onChange={(e)=>handleStatusChange(order._id, e.target.value)} className="border rounded px-3 py-1 text-sm">{statusOptions.map(s=> <option key={s} value={s}>{s}</option>)}</select></div></div></div><div className="border-t pt-4"><h4 className="font-semibold mb-2">Items:</h4><div className="space-y-2">{order.items.map(item=> <div key={item._id} className="flex items-center gap-4"><img src={item.thumbnail} alt={item.name} className="w-12 h-12 object-cover rounded" /><div className="flex-1"><p className="font-semibold text-sm">{item.name}</p><p className="text-sm text-gray-600">Qty: {item.quantity} × ₹{item.offerPrice}</p></div></div>)}</div></div><div className="border-t pt-4 mt-4"><h4 className="font-semibold mb-2">Delivery Address:</h4><p className="text-sm text-gray-700">{order.address.name} | {order.address.phone}<br />{order.address.addressLine}, {order.address.city}<br />{order.address.state} - {order.address.pincode}</p></div></div>)}</div>
      {filteredOrders.length === 0 && <div className="bg-white p-12 rounded-lg shadow text-center"><p className="text-gray-500">No orders found</p></div>}
    </div>
  );
}

// @ts-nocheck
import React, { useContext, useState } from "react";
import { Plus, X, Edit, Trash2 } from "lucide-react";
import { AppContext } from "../../context/AppContext";

export default function AdminProducts() {
  const { state, dispatch, setCurrentPage } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", category: "Soft Silk", subcategory: "Daily Wear", fabric: "Pure Silk", color: "", pattern: "", description: "", price: 0, offerPrice: 0, stock: 0, tags: "", thumbnail: "" });

  const handleSubmit = () => {
    if (!formData.name || !formData.thumbnail) { alert('Please fill required fields.'); return; }
    if (editingProduct) dispatch({type:'UPDATE_PRODUCT', payload: {...formData, _id: editingProduct._id}});
    else dispatch({type:'ADD_PRODUCT', payload: {...formData, _id: 'p'+Date.now(), rating:4.5}});
    resetForm();
  };
  const handleEdit = (product) => { setEditingProduct(product); setFormData(product); setShowForm(true); };
  const handleDelete = (id) => { if (confirm('Are you sure?')) dispatch({type:'DELETE_PRODUCT', payload: id}); };
  const resetForm = () => { setShowForm(false); setEditingProduct(null); setFormData({ name: "", category: "Soft Silk", subcategory: "Daily Wear", fabric: "Pure Silk", color: "", pattern: "", description: "", price: 0, offerPrice: 0, stock: 0, tags: "", thumbnail: "" }); };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <div className="flex gap-4">
          <button onClick={()=>setCurrentPage('admin')} className="px-4 py-2 border rounded hover:bg-gray-100">Back to Dashboard</button>
          <button onClick={()=>setShowForm(true)} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Product</button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={resetForm}><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-4">
              <input type="text" placeholder="Product Name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="w-full border rounded px-4 py-2" />
              <div className="grid grid-cols-2 gap-4">
                <select value={formData.category} onChange={(e)=>setFormData({...formData, category:e.target.value})} className="border rounded px-4 py-2"><option value="Soft Silk">Soft Silk</option><option value="Vairaoosi Silk">Vairaoosi Silk</option><option value="Kanjivaram">Kanjivaram</option></select>
                <input type="text" placeholder="Subcategory" value={formData.subcategory} onChange={(e)=>setFormData({...formData, subcategory:e.target.value})} className="border rounded px-4 py-2" />
              </div>
              <div className="grid grid-cols-3 gap-4"><input type="text" placeholder="Fabric" value={formData.fabric} onChange={(e)=>setFormData({...formData, fabric:e.target.value})} className="border rounded px-4 py-2" /><input type="text" placeholder="Color" value={formData.color} onChange={(e)=>setFormData({...formData, color:e.target.value})} className="border rounded px-4 py-2" /><input type="text" placeholder="Pattern" value={formData.pattern} onChange={(e)=>setFormData({...formData, pattern:e.target.value})} className="border rounded px-4 py-2" /></div>
              <textarea placeholder="Description" value={formData.description} onChange={(e)=>setFormData({...formData, description:e.target.value})} className="w-full border rounded px-4 py-2 h-24" />
              <div className="grid grid-cols-3 gap-4"><input type="number" placeholder="Price" value={formData.price||''} onChange={(e)=>setFormData({...formData, price:Number(e.target.value)})} className="border rounded px-4 py-2" /><input type="number" placeholder="Offer Price" value={formData.offerPrice||''} onChange={(e)=>setFormData({...formData, offerPrice:Number(e.target.value)})} className="border rounded px-4 py-2" /><input type="number" placeholder="Stock" value={formData.stock||''} onChange={(e)=>setFormData({...formData, stock:Number(e.target.value)})} className="border rounded px-4 py-2" /></div>
              <input type="text" placeholder="Tags (comma separated)" value={formData.tags} onChange={(e)=>setFormData({...formData, tags:e.target.value})} className="w-full border rounded px-4 py-2" />
              <input type="url" placeholder="Thumbnail Image URL" value={formData.thumbnail} onChange={(e)=>setFormData({...formData, thumbnail:e.target.value})} className="w-full border rounded px-4 py-2" />
              <div className="flex gap-4">
                <button onClick={handleSubmit} className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700">{editingProduct ? 'Update Product' : 'Add Product'}</button>
                <button onClick={resetForm} className="px-6 py-2 border rounded hover:bg-gray-100">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100"><tr><th className="px-4 py-3 text-left">Image</th><th className="px-4 py-3 text-left">Name</th><th className="px-4 py-3 text-left">Category</th><th className="px-4 py-3 text-left">Price</th><th className="px-4 py-3 text-left">Stock</th><th className="px-4 py-3 text-left">Actions</th></tr></thead>
          <tbody>{state.products.map(product=><tr key={product._id} className="border-t"><td className="px-4 py-3"><img src={product.thumbnail} alt={product.name} className="w-16 h-16 object-cover rounded" /></td><td className="px-4 py-3 font-semibold">{product.name}</td><td className="px-4 py-3">{product.category}</td><td className="px-4 py-3"><div className="flex flex-col"><span className="text-green-600 font-bold">₹{product.offerPrice}</span><span className="text-sm text-gray-500 line-through">₹{product.price}</span></div></td><td className="px-4 py-3">{product.stock}</td><td className="px-4 py-3"><div className="flex gap-2"><button onClick={()=>handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button><button onClick={()=>handleDelete(product._id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button></div></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

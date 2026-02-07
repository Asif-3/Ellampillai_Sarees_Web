// @ts-nocheck
import React, { useContext, useState, useEffect } from "react";
import {
  ChevronLeft, Star, Heart, Plus, Minus, ShoppingCart,
  Truck, Shield, RefreshCw, Share2, Check, ChevronRight,
  Zap, Award, Phone, MessageCircle
} from "lucide-react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetailPage() {
  const { state, dispatch, addToCart, addToWishlist, selectedProduct, setCurrentPage } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const isInWishlist = state.wishlist.some(p => p._id === selectedProduct?._id);
  const isGoldCategory = selectedProduct?.category === "1 Gram Gold";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const images = selectedProduct.images || [selectedProduct.thumbnail];
  const discount = Math.round(((selectedProduct.price - selectedProduct.offerPrice) / selectedProduct.price) * 100);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setQuantity(1);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setCurrentPage("checkout");
  };

  const similarProducts = state.products
    .filter(p => p.category === selectedProduct.category && p._id !== selectedProduct._id)
    .slice(0, 4);

  const recentlyViewed = state.recentlyViewed
    .filter(p => p._id !== selectedProduct._id)
    .slice(0, 4);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedProduct.name,
          text: `Check out this beautiful saree: ${selectedProduct.name} at just ₹${selectedProduct.offerPrice}`,
          url: window.location.href
        });
      } catch (err) {
        console.log("Share failed");
      }
    } else {
      // Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in ordering:\n\n*${selectedProduct.name}*\nPrice: ₹${selectedProduct.offerPrice}\nQuantity: ${quantity}\n\nPlease provide more details.`;
    window.open(`https://wa.me/919597268293?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => setCurrentPage("home")} className="hover:text-[#8B1538]">Home</button>
            <ChevronRight className="w-4 h-4" />
            <button onClick={() => setCurrentPage("products")} className="hover:text-[#8B1538]">All Sarees</button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-400 truncate max-w-[200px]">{selectedProduct.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => setCurrentPage("products")}
          className="flex items-center gap-2 text-[#8B1538] mb-6 hover:underline font-medium"
        >
          <ChevronLeft className="w-5 h-5" /> Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-zoom-in aspect-square"
              onClick={() => setShowZoom(true)}
            >
              <img
                src={images[selectedImage]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discount > 0 && (
                  <span className="badge-offer px-4 py-2 text-sm">{discount}% OFF</span>
                )}
                {isGoldCategory && (
                  <span className="badge-gold px-4 py-2 text-sm">🪙 1 Gram Gold</span>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={(e) => { e.stopPropagation(); addToWishlist(selectedProduct); }}
                className={`absolute top-4 right-4 p-3 rounded-full shadow-lg ${isInWishlist ? 'bg-rose-500 text-white' : 'bg-white text-gray-600 hover:bg-rose-500 hover:text-white'
                  } transition`}
              >
                <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${selectedImage === idx ? 'border-[#8B1538]' : 'border-transparent'
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category & Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${isGoldCategory ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                }`}>
                {selectedProduct.category}
              </span>
              {selectedProduct.isNew && <span className="badge-new">NEW</span>}
              {selectedProduct.isHot && <span className="badge-hot">HOT</span>}
            </div>

            {/* Title */}
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 font-display">
              {selectedProduct.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">{selectedProduct.rating} rating</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{selectedProduct.reviews || 0} reviews</span>
            </div>

            {/* Price */}
            <div className={`p-6 rounded-2xl mb-6 ${isGoldCategory
              ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200'
              : 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
              }`}>
              <div className="flex items-end gap-4 mb-2">
                <span className={`text-4xl font-bold ${isGoldCategory ? 'text-amber-600' : 'text-green-600'}`}>
                  ₹{selectedProduct.offerPrice}
                </span>
                {discount > 0 && (
                  <>
                    <span className="text-xl text-gray-400 line-through">₹{selectedProduct.price}</span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save ₹{selectedProduct.price - selectedProduct.offerPrice}
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-600 text-sm">Inclusive of all taxes • Free shipping on orders above ₹1000</p>
              {isGoldCategory && (
                <p className="text-amber-700 font-semibold mt-2">+ Shipping charges applicable</p>
              )}
            </div>

            {/* Stock Status */}
            <div className={`flex items-center gap-2 mb-6 ${selectedProduct.stock > 10 ? 'text-green-600' : 'text-orange-500'
              }`}>
              {selectedProduct.stock > 10 ? (
                <>
                  <Check className="w-5 h-5" />
                  <span className="font-semibold">In Stock ({selectedProduct.stock} available)</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">Only {selectedProduct.stock} left - Order soon!</span>
                </>
              )}
            </div>

            {/* Product Details Quick View */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
              <div>
                <span className="text-gray-500 text-sm">Fabric</span>
                <p className="font-semibold">{selectedProduct.fabric}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Color</span>
                <p className="font-semibold">{selectedProduct.color}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Pattern</span>
                <p className="font-semibold">{selectedProduct.pattern}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Blouse</span>
                <p className="font-semibold">Included</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-6 mb-6">
              <span className="font-semibold text-gray-700">Quantity:</span>
              <div className="flex items-center border-2 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-100 transition"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-8 py-3 bg-gray-50 font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                  className="px-4 py-3 hover:bg-gray-100 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <span className="text-gray-500">Max: {selectedProduct.stock}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg inline-flex items-center justify-center gap-2 transition ${isGoldCategory
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-900 hover:from-amber-400 hover:to-yellow-400 shadow-lg shadow-amber-200'
                  : 'bg-gradient-to-r from-[#8B1538] to-[#A91E4A] text-white hover:from-[#6B0F28] hover:to-[#8B1538] shadow-lg shadow-rose-200'
                  }`}
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                Add
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg border-2 border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538] hover:text-white transition"
              >
                Buy Now
              </button>
            </div>

            {/* WhatsApp Order */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg bg-green-500 hover:bg-green-600 text-white inline-flex items-center justify-center gap-3 transition mb-6"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              Order via WhatsApp
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#8B1538] transition"
            >
              <Share2 className="w-5 h-5" />
              Share this product
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t">
              <div className="flex flex-col items-center text-center">
                <Truck className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium">Free Delivery</span>
                <span className="text-xs text-gray-500">Above ₹1000</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-sm font-medium">100% Genuine</span>
                <span className="text-xs text-gray-500">Original products</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RefreshCw className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium">Easy Returns</span>
                <span className="text-xs text-gray-500">7 days policy</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Award className="w-8 h-8 text-amber-600 mb-2" />
                <span className="text-sm font-medium">Factory Direct</span>
                <span className="text-xs text-gray-500">Best prices</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          <div className="flex border-b overflow-x-auto">
            {["description", "details", "shipping", "reviews"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[100px] py-4 font-medium capitalize transition ${activeTab === tab
                  ? 'bg-[#8B1538] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 lg:p-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">{selectedProduct.description}</p>
                {isGoldCategory && (
                  <div className="mt-6 p-6 bg-amber-50 rounded-xl border border-amber-200">
                    <h4 className="font-bold text-amber-800 mb-3">🪙 Why 1 Gram Gold Saree?</h4>
                    <ul className="space-y-2 text-amber-700">
                      <li>✨ Body all over genuine quality Jari designs</li>
                      <li>🌈 Vibrant and rich colours</li>
                      <li>🎀 Contrast pallu & blouse included</li>
                      <li>💎 Premium tissue fabric</li>
                      <li>🏭 Direct from Harshal Textiles, Elampillai</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "details" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800">Product Specifications</h4>
                  <div className="space-y-3">
                    {[
                      { label: "Category", value: selectedProduct.category },
                      { label: "Subcategory", value: selectedProduct.subcategory },
                      { label: "Fabric", value: selectedProduct.fabric },
                      { label: "Color", value: selectedProduct.color },
                      { label: "Pattern", value: selectedProduct.pattern },
                      { label: "Blouse Piece", value: "Included (Contrast)" },
                      { label: "Saree Length", value: "5.5 meters" },
                      { label: "Blouse Length", value: "0.8 meters" },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between py-2 border-b">
                        <span className="text-gray-500">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800">Care Instructions</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Dry clean recommended for first wash</li>
                    <li>• Hand wash with mild detergent</li>
                    <li>• Do not wring or twist</li>
                    <li>• Dry in shade</li>
                    <li>• Iron on medium heat</li>
                    <li>• Store in cotton bag</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Truck className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Shipping Information</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Free shipping on orders above ₹1000</li>
                      <li>• Standard delivery: 5-7 business days</li>
                      <li>• Express delivery: 2-3 business days (extra charges apply)</li>
                      <li>• All India delivery available</li>
                      <li>• Cash on Delivery available for select locations</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <RefreshCw className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Returns & Exchange</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 7 days easy return policy</li>
                      <li>• Product must be unused with original tags</li>
                      <li>• Exchange available for size/color issues</li>
                      <li>• Refund processed within 5-7 business days</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">⭐</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">No reviews yet</h4>
                <p className="text-gray-500 mb-6">Be the first to review this product!</p>
                <button className="btn-primary">Write a Review</button>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold font-display mb-6">Similar Sarees</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {similarProducts.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold font-display mb-6">Recently Viewed</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {recentlyViewed.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      {showZoom && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowZoom(false)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={() => setShowZoom(false)}
          >
            <Plus className="w-8 h-8 rotate-45" />
          </button>
          <img
            src={images[selectedImage]}
            alt={selectedProduct.name}
            className="max-w-full max-h-full object-contain"
          />

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full"
                onClick={(e) => { e.stopPropagation(); setSelectedImage((selectedImage - 1 + images.length) % images.length); }}
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full"
                onClick={(e) => { e.stopPropagation(); setSelectedImage((selectedImage + 1) % images.length); }}
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

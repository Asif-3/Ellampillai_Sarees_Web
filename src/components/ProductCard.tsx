// @ts-nocheck
import React, { useContext, useState } from "react";
import { Heart, ShoppingCart, Eye, Sparkles } from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, viewProduct, state } = useContext(AppContext);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isInWishlist = state.wishlist.some(p => p._id === product._id);
  const isGoldCategory = product.category === "1 Gram Gold";
  const discount = Math.round(((product.price - product.offerPrice) / product.price) * 100);

  return (
    <div
      className={`group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 cursor-pointer ${isGoldCategory
        ? 'ring-1 ring-amber-300 shadow-md hover:shadow-xl hover:shadow-amber-200/50'
        : 'shadow-md hover:shadow-xl'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => viewProduct(product)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        {/* Skeleton Loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
        )}

        <img
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-105`}
        />

        {/* Badges - Top Left */}
        <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 flex flex-col gap-1 z-10">
          {isGoldCategory && (
            <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-900 text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-bold shadow-sm flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> 1G GOLD
            </span>
          )}
          {discount > 15 && (
            <span className="bg-green-500 text-white text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-bold shadow-sm">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button - Top Right */}
        <button
          onClick={(e) => { e.stopPropagation(); addToWishlist(product); }}
          className={`absolute top-1.5 sm:top-2 right-1.5 sm:right-2 z-10 p-1.5 sm:p-2 rounded-full shadow-md transition-all duration-300 ${isInWishlist
            ? 'bg-rose-500 text-white scale-100'
            : 'bg-white/90 text-gray-500 hover:bg-rose-500 hover:text-white'
            }`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>


      </div>

      {/* Product Info */}
      <div
        className="p-2 sm:p-3"
      >
        {/* Title */}
        <h3 className="font-medium text-gray-800 text-[11px] sm:text-sm line-clamp-2 mb-1.5 leading-snug group-hover:text-[#8B1538] transition-colors">
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-sm sm:text-lg font-bold ${isGoldCategory ? 'text-amber-600' : 'text-[#8B1538]'
              }`}>
              ₹{product.offerPrice}
            </span>
            {product.price !== product.offerPrice && (
              <span className="text-[9px] sm:text-xs text-gray-400 line-through">
                ₹{product.price}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product, 1); }}
            className={`p-1.5 sm:p-2 rounded-full shadow-sm transition-all duration-300 hover:scale-110 active:scale-95 ${isGoldCategory
              ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-900'
              : 'bg-gradient-to-r from-[#8B1538] to-[#A91E4A] text-white'
              }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Gold Shimmer Effect */}
      {isGoldCategory && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl sm:rounded-2xl">
          <div className="absolute -top-full -left-full w-[200%] h-[200%] bg-gradient-to-r from-transparent via-yellow-200/15 to-transparent rotate-45 animate-shimmer" />
        </div>
      )}
    </div>
  );
}

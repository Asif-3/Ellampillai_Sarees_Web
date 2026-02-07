// @ts-nocheck
import React, { useContext } from "react";
import { Heart, Trash2, ShoppingCart, ArrowRight, ChevronLeft } from "lucide-react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
    const { state, dispatch, setCurrentPage, addToCart, showToast } = useContext(AppContext);

    const removeFromWishlist = (productId) => {
        dispatch({ type: "REMOVE_FROM_WISHLIST", payload: productId });
        showToast("Removed from wishlist");
    };

    const moveToCart = (product) => {
        addToCart(product, 1);
        dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product._id });
    };

    const moveAllToCart = () => {
        state.wishlist.forEach(product => {
            addToCart(product, 1);
        });
        dispatch({ type: "CLEAR_WISHLIST" });
        showToast("All items moved to cart! 🛒");
    };

    if (state.wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-32 h-32 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart className="w-16 h-16 text-rose-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-8">
                        Save your favorite sarees here to buy them later
                    </p>
                    <button
                        onClick={() => setCurrentPage("products")}
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        Explore Sarees <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 py-8">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => setCurrentPage("home")}
                        className="text-white/80 hover:text-white inline-flex items-center gap-2 mb-4"
                    >
                        <ChevronLeft className="w-5 h-5" /> Back to Home
                    </button>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white font-display flex items-center gap-3">
                                <Heart className="w-8 h-8 fill-current" />
                                My Wishlist
                            </h1>
                            <p className="text-white/80 mt-1">{state.wishlist.length} saved items</p>
                        </div>

                        {state.wishlist.length > 0 && (
                            <button
                                onClick={moveAllToCart}
                                className="inline-flex items-center gap-2 bg-white text-rose-600 px-6 py-3 rounded-xl font-bold hover:bg-rose-50 transition"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Move All to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {state.wishlist.map((product, idx) => (
                        <div
                            key={product._id}
                            className="relative animate-fade-in-up"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                            <ProductCard product={product} />

                            {/* Quick Actions Overlay */}
                            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                                <button
                                    onClick={() => removeFromWishlist(product._id)}
                                    className="p-2 bg-white rounded-full shadow-lg text-red-500 hover:bg-red-50 transition"
                                    title="Remove from wishlist"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recommendations */}
                {state.products.filter(p => !state.wishlist.find(w => w._id === p._id)).length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold font-display mb-6">You May Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {state.products
                                .filter(p => !state.wishlist.find(w => w._id === p._id))
                                .slice(0, 4)
                                .map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

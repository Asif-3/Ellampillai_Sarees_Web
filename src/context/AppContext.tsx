// @ts-nocheck
import React, { createContext, useReducer, useState, useEffect } from "react";
import { SAMPLE_PRODUCTS } from "../data/sampleProducts";

// Types
interface Product {
  _id: string;
  name: string;
  category: string;
  subcategory: string;
  fabric: string;
  color: string;
  pattern: string;
  description: string;
  price: number;
  offerPrice: number;
  stock: number;
  thumbnail: string;
  images: string[];
  isNew?: boolean;
  isHot?: boolean;
  isOffer?: boolean;
  rating: number;
  reviews: number;
  tags: string[];
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  _id: string;
  items: CartItem[];
  total: number;
  address: any;
  paymentMethod: string;
  status: string;
  statusHistory: { state: string; timestamp: string }[];
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
}

interface State {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  user: User | null;
  wishlist: Product[];
  recentlyViewed: Product[];
  searchQuery: string;
}

// Initial State
const initialState: State = {
  products: SAMPLE_PRODUCTS,
  cart: [],
  orders: [],
  user: null,
  wishlist: [],
  recentlyViewed: [],
  searchQuery: ""
};

// Reducer
function appReducer(state: State, action: any): State {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "ADD_TO_CART": {
      const existingIndex = state.cart.findIndex(item => item._id === action.payload.product._id);
      if (existingIndex > -1) {
        const newCart = [...state.cart];
        newCart[existingIndex].quantity += action.payload.quantity;
        return { ...state, cart: newCart };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload.product, quantity: action.payload.quantity }]
      };
    }

    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter(item => item._id !== action.payload) };

    case "UPDATE_CART_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return { ...state, cart: state.cart.filter(item => item._id !== action.payload.id) };
      }
      const newCart = state.cart.map(item =>
        item._id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      return { ...state, cart: newCart };
    }

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "ADD_ORDER":
      return { ...state, orders: [action.payload, ...state.orders] };

    case "SET_ORDERS":
      return { ...state, orders: action.payload };

    case "SET_USER":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    case "ADD_TO_WISHLIST": {
      const exists = state.wishlist.find(item => item._id === action.payload._id);
      if (exists) {
        return { ...state, wishlist: state.wishlist.filter(item => item._id !== action.payload._id) };
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    }

    case "REMOVE_FROM_WISHLIST":
      return { ...state, wishlist: state.wishlist.filter(item => item._id !== action.payload) };

    case "CLEAR_WISHLIST":
      return { ...state, wishlist: [] };

    case "ADD_TO_RECENTLY_VIEWED": {
      const filtered = state.recentlyViewed.filter(item => item._id !== action.payload._id);
      return { ...state, recentlyViewed: [action.payload, ...filtered].slice(0, 10) };
    }

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    default:
      return state;
  }
}

// Context
export const AppContext = createContext<any>(null);

// Provider
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  // Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("elampillai_cart");
    const savedUser = localStorage.getItem("elampillai_user");
    const savedWishlist = localStorage.getItem("elampillai_wishlist");
    const savedOrders = localStorage.getItem("elampillai_orders");

    if (savedCart) {
      const cart = JSON.parse(savedCart);
      cart.forEach((item: CartItem) => {
        dispatch({ type: "ADD_TO_CART", payload: { product: item, quantity: item.quantity } });
      });
    }

    if (savedUser) {
      dispatch({ type: "SET_USER", payload: JSON.parse(savedUser) });
    }

    if (savedWishlist) {
      JSON.parse(savedWishlist).forEach((item: Product) => {
        dispatch({ type: "ADD_TO_WISHLIST", payload: item });
      });
    }

    if (savedOrders) {
      dispatch({ type: "SET_ORDERS", payload: JSON.parse(savedOrders) });
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("elampillai_cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("elampillai_user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("elampillai_user");
    }
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem("elampillai_wishlist", JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  useEffect(() => {
    localStorage.setItem("elampillai_orders", JSON.stringify(state.orders));
  }, [state.orders]);

  // Toast notification
  const showToast = (message: string, type: string = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Helper functions
  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
    showToast(`${product.name} added to cart! 🛒`);
  };

  const addToWishlist = (product: Product) => {
    const isInWishlist = state.wishlist.find(item => item._id === product._id);
    dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    showToast(isInWishlist ? "Removed from wishlist" : "Added to wishlist! ❤️");
  };

  const login = (email: string, password: string) => {
    // Simulated login
    const user: User = {
      _id: "user_" + Date.now(),
      name: email.split("@")[0],
      email,
      phone: "",
      isAdmin: email === "admin@elampillai.com"
    };
    dispatch({ type: "SET_USER", payload: user });
    setShowAuth(false);
    showToast(`Welcome back, ${user.name}! 👋`);
  };

  const register = (name: string, email: string, phone: string, password: string) => {
    const user: User = {
      _id: "user_" + Date.now(),
      name,
      email,
      phone,
      isAdmin: false
    };
    dispatch({ type: "SET_USER", payload: user });
    setShowAuth(false);
    showToast(`Welcome to Elampillai Sarees, ${name}! 🎉`);
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    showToast("Logged out successfully");
  };

  const viewProduct = (product: Product) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedProduct(product);
    dispatch({ type: "ADD_TO_RECENTLY_VIEWED", payload: product });
    setTimeout(() => setCurrentPage("product-detail"), 100); // Slight delay for scroll effect
  };

  const value = {
    state,
    dispatch,
    currentPage,
    setCurrentPage,
    selectedProduct,
    setSelectedProduct,
    selectedCategory,
    setSelectedCategory,
    showCart,
    setShowCart,
    showAuth,
    setShowAuth,
    authMode,
    setAuthMode,
    toast,
    showToast,
    addToCart,
    addToWishlist,
    login,
    register,
    logout,
    viewProduct
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

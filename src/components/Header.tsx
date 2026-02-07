// @ts-nocheck
import React, { useContext, useState, useEffect } from "react";
import {
  Menu, X, Search, ShoppingCart, Heart, User, ChevronDown,
  LogIn, LogOut, Package, Settings, Home, Grid, Phone
} from "lucide-react";
import { AppContext } from "../context/AppContext";
import { CATEGORIES, SOCIAL_LINKS } from "../data/sampleProducts";

export default function Header() {
  const {
    state, setCurrentPage, setShowCart, setShowAuth, setAuthMode,
    logout, setSelectedCategory, selectedCategory
  } = useContext(AppContext);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setShowMobileMenu(false);
  }, [selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      state.dispatch?.({ type: "SET_SEARCH_QUERY", payload: searchQuery });
      setCurrentPage("products");
      setShowSearch(false);
      setShowMobileMenu(false);
    }
  };

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = state.wishlist.length;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2'
        : 'bg-gradient-to-r from-[#8B1538] to-[#A91E4A] py-3'
        }`}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className={`lg:hidden p-2 rounded-lg transition ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <button
              onClick={() => { setCurrentPage("home"); setSelectedCategory(null); }}
              className="flex items-center gap-2 sm:gap-3 group"
            >
              <div className="relative">
                {/* Outer Rotating Ring */}
                <div className="absolute -inset-1 rounded-full border border-amber-400/20 animate-spin-slow" style={{ animationDuration: '8s' }} />

                {/* Pulsing Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/30 to-yellow-500/30 blur-md animate-pulse" />

                {/* Sparkle Dots */}
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute top-1/2 -right-0.5 -translate-y-1/2 w-1 h-1 bg-amber-400 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />

                {/* Logo Image */}
                <img
                  src="/logo.png"
                  alt="Harshal Textiles"
                  className="relative w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full ring-2 ring-amber-400/40 group-hover:ring-amber-400 transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <h1 className={`text-sm sm:text-lg font-bold font-display leading-tight transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'
                  }`}>
                  <span className="sm:hidden">Harshal</span>
                  <span className="hidden sm:inline">Harshal Textiles</span>
                </h1>
                <p className={`text-[9px] sm:text-xs transition-colors flex items-center gap-1 ${isScrolled ? 'text-amber-600' : 'text-yellow-300'}`}>
                  <span className="w-1 h-1 bg-current rounded-full animate-pulse" />
                  Elampillai
                </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => { setCurrentPage("home"); setSelectedCategory(null); }}
                className={`px-4 py-2 rounded-lg font-medium transition ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
                  }`}
              >
                Home
              </button>

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowCategoryDropdown(true)}
                onMouseLeave={() => setShowCategoryDropdown(false)}
              >
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition inline-flex items-center gap-1 ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
                    }`}
                >
                  Categories <ChevronDown className="w-4 h-4" />
                </button>

                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border py-2 animate-fade-in">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.name);
                          setCurrentPage("products");
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition"
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <div>
                          <p className="font-medium text-gray-800">{cat.name}</p>
                          <p className="text-xs text-gray-500">{cat.count} items</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setCurrentPage("products")}
                className={`px-4 py-2 rounded-lg font-medium transition ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
                  }`}
              >
                All Sarees
              </button>
            </nav>

            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sarees..."
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl transition outline-none ${isScrolled
                    ? 'bg-gray-100 focus:bg-white focus:ring-2 focus:ring-[#8B1538]/20 border border-gray-200'
                    : 'bg-white/10 text-white placeholder-white/60 focus:bg-white/20 border border-white/20'
                    }`}
                />
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`md:hidden p-2 rounded-lg transition ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setCurrentPage("wishlist")}
                className={`relative p-2 rounded-lg transition ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-rose-500 text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => setShowCart(true)}
                className={`relative p-2 rounded-lg transition ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-yellow-400 text-amber-900 text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center animate-bounce-soft">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User - Desktop */}
              <div className="hidden sm:block">
                {state.user ? (
                  <div className="relative group">
                    <button className={`p-2 rounded-lg transition ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                      }`}>
                      <User className="w-6 h-6" />
                    </button>

                    {/* User Dropdown */}
                    <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-2xl border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="px-4 py-3 border-b">
                        <p className="font-semibold text-gray-800">{state.user.name}</p>
                        <p className="text-sm text-gray-500">{state.user.email}</p>
                      </div>
                      <button
                        onClick={() => setCurrentPage("orders")}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                      >
                        <Package className="w-5 h-5 text-gray-400" />
                        My Orders
                      </button>
                      <button
                        onClick={() => setCurrentPage("wishlist")}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                      >
                        <Heart className="w-5 h-5 text-gray-400" />
                        Wishlist
                      </button>
                      {state.user.isAdmin && (
                        <button
                          onClick={() => setCurrentPage("admin")}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                        >
                          <Settings className="w-5 h-5 text-gray-400" />
                          Admin Panel
                        </button>
                      )}
                      <button
                        onClick={logout}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600"
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => { setShowAuth(true); setAuthMode("login"); }}
                    className={`px-4 py-2 rounded-lg font-medium transition inline-flex items-center gap-2 ${isScrolled
                      ? 'bg-[#8B1538] text-white hover:bg-[#6B0F28]'
                      : 'bg-white text-[#8B1538] hover:bg-yellow-50'
                      }`}
                  >
                    <LogIn className="w-4 h-4" /> Login
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showSearch && (
            <form onSubmit={handleSearch} className="md:hidden mt-3 animate-fade-in">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sarees..."
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:bg-white focus:text-gray-800 focus:placeholder-gray-400 transition"
                />
              </div>
            </form>
          )}
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-20" />

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setShowMobileMenu(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Menu Panel */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white animate-slide-in-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div className="bg-gradient-to-r from-[#8B1538] to-[#A91E4A] p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="Harshal Textiles"
                    className="w-12 h-12 object-contain rounded-full"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-white font-display">Harshal Textiles</h2>
                    <p className="text-yellow-300 text-sm">Elampillai</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 hover:bg-white/10 rounded-full text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {state.user ? (
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                    {state.user.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{state.user.name}</p>
                    <p className="text-white/70 text-sm">{state.user.email}</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setShowAuth(true); setAuthMode("login"); setShowMobileMenu(false); }}
                  className="w-full py-3 bg-white text-[#8B1538] rounded-xl font-bold inline-flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" /> Login / Sign Up
                </button>
              )}
            </div>

            {/* Menu Items */}
            <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              {/* Main Navigation */}
              <div className="space-y-1 mb-6">
                <button
                  onClick={() => { setCurrentPage("home"); setSelectedCategory(null); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium"
                >
                  <Home className="w-5 h-5 text-gray-400" /> Home
                </button>
                <button
                  onClick={() => { setCurrentPage("products"); setSelectedCategory(null); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium"
                >
                  <Grid className="w-5 h-5 text-gray-400" /> All Sarees
                </button>
                <button
                  onClick={() => { setCurrentPage("orders"); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium"
                >
                  <Package className="w-5 h-5 text-gray-400" /> My Orders
                </button>
                <button
                  onClick={() => { setCurrentPage("wishlist"); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium"
                >
                  <Heart className="w-5 h-5 text-gray-400" /> Wishlist
                  {wishlistCount > 0 && (
                    <span className="ml-auto bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full text-sm font-semibold">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                  Shop by Category
                </h3>
                <div className="space-y-1">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setCurrentPage("products");
                        setShowMobileMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700"
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span className="ml-auto text-sm text-gray-400">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="border-t pt-4">
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-green-50 text-green-700 rounded-xl font-medium"
                >
                  <Phone className="w-5 h-5" />
                  WhatsApp: {SOCIAL_LINKS.phone}
                </a>
              </div>

              {/* Logout */}
              {state.user && (
                <button
                  onClick={() => { logout(); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 font-medium mt-4"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// @ts-nocheck
import React, { useContext, useState, useMemo } from "react";
import { Filter, Grid, List, SlidersHorizontal, X, ChevronDown, Search } from "lucide-react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { CATEGORIES } from "../data/sampleProducts";

export default function ProductListPage() {
  const { state, selectedCategory, setSelectedCategory, setCurrentPage } = useContext(AppContext);
  const [filters, setFilters] = useState({
    category: selectedCategory || "",
    priceRange: "",
    color: "",
    sortBy: "popular"
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [localSearch, setLocalSearch] = useState("");

  // Get unique values for filters
  const uniqueColors = [...new Set(state.products.map(p => p.color))].filter(Boolean);
  const uniqueCategories = [...new Set(state.products.map(p => p.category))].filter(Boolean);

  const filteredProducts = useMemo(() => {
    let result = state.products.filter(product => {
      // Search filter
      if (state.searchQuery) {
        const searchLower = state.searchQuery.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.color.toLowerCase().includes(searchLower) ||
          product.fabric.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Local search filter
      if (localSearch) {
        const searchLower = localSearch.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.color.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && product.category !== filters.category) return false;

      // Price range filter
      if (filters.priceRange === "under500" && product.offerPrice >= 500) return false;
      if (filters.priceRange === "500-1000" && (product.offerPrice < 500 || product.offerPrice > 1000)) return false;
      if (filters.priceRange === "1000-2000" && (product.offerPrice < 1000 || product.offerPrice > 2000)) return false;
      if (filters.priceRange === "above2000" && product.offerPrice <= 2000) return false;

      // Color filter
      if (filters.color && product.color !== filters.color) return false;

      return true;
    });

    // Sorting
    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.offerPrice - b.offerPrice);
        break;
      case "price-high":
        result.sort((a, b) => b.offerPrice - a.offerPrice);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Popular - show hot and new items first
        result.sort((a, b) => {
          const aScore = (a.isHot ? 2 : 0) + (a.isNew ? 1 : 0);
          const bScore = (b.isHot ? 2 : 0) + (b.isNew ? 1 : 0);
          return bScore - aScore;
        });
    }

    return result;
  }, [state.products, state.searchQuery, filters, localSearch]);

  const clearFilters = () => {
    setFilters({ category: "", priceRange: "", color: "", sortBy: "popular" });
    setSelectedCategory(null);
    setLocalSearch("");
  };

  const activeFilterCount = [filters.category, filters.priceRange, filters.color].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#8B1538] to-[#A91E4A] py-8">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-white/70 mb-3">
            <button onClick={() => setCurrentPage("home")} className="hover:text-white">Home</button>
            <span className="mx-2">/</span>
            <span className="text-white">{selectedCategory || "All Sarees"}</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold text-white font-display">
            {selectedCategory || "All Sarees"}
          </h1>
          <p className="text-white/80 mt-2">
            {filteredProducts.length} products found
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Sort Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
          {/* Local Search */}
          <div className="flex-1 min-w-[200px] max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search in results..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1538]/20 focus:border-[#8B1538]"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="appearance-none bg-gray-100 border-0 rounded-lg px-4 py-2.5 pr-10 font-medium text-gray-700 cursor-pointer focus:ring-2 focus:ring-[#8B1538]/20"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden md:flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 ${viewMode === "grid" ? "bg-[#8B1538] text-white" : "bg-gray-100 text-gray-600"}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 ${viewMode === "list" ? "bg-[#8B1538] text-white" : "bg-gray-100 text-gray-600"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 bg-[#8B1538] text-white px-4 py-2.5 rounded-lg font-medium"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-yellow-400 text-amber-900 w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.category || filters.priceRange || filters.color || state.searchQuery) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>

            {state.searchQuery && (
              <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                Search: "{state.searchQuery}"
              </span>
            )}

            {filters.category && (
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                {filters.category}
                <button onClick={() => { setFilters({ ...filters, category: "" }); setSelectedCategory(null); }} className="hover:text-amber-900">
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}

            {filters.priceRange && (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {filters.priceRange.replace("-", " - ").replace("under", "Under ₹").replace("above", "Above ₹")}
                <button onClick={() => setFilters({ ...filters, priceRange: "" })} className="hover:text-green-900">
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}

            {filters.color && (
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {filters.color}
                <button onClick={() => setFilters({ ...filters, color: "" })} className="hover:text-blue-900">
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}

            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`
            ${showFilters ? "fixed inset-0 z-50 bg-white lg:relative lg:bg-transparent" : "hidden"} 
            lg:block w-full lg:w-72 flex-shrink-0
          `}>
            {/* Mobile filter header */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b bg-gradient-to-r from-[#8B1538] to-[#A91E4A] text-white">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 lg:p-0 max-h-[calc(100vh-80px)] lg:max-h-none overflow-y-auto">
              <div className="bg-white lg:rounded-xl lg:shadow-sm p-5 space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span>📁</span> Category
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={!filters.category}
                        onChange={() => { setFilters({ ...filters, category: "" }); setSelectedCategory(null); }}
                        className="w-4 h-4 text-[#8B1538] focus:ring-[#8B1538]"
                      />
                      <span>All Categories</span>
                    </label>
                    {uniqueCategories.map(cat => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === cat}
                          onChange={() => { setFilters({ ...filters, category: cat }); setSelectedCategory(cat); }}
                          className="w-4 h-4 text-[#8B1538] focus:ring-[#8B1538]"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span>💰</span> Price Range
                  </h4>
                  <div className="space-y-2">
                    {[
                      { value: "", label: "All Prices" },
                      { value: "under500", label: "Under ₹500" },
                      { value: "500-1000", label: "₹500 - ₹1000" },
                      { value: "1000-2000", label: "₹1000 - ₹2000" },
                      { value: "above2000", label: "Above ₹2000" },
                    ].map(range => (
                      <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.priceRange === range.value}
                          onChange={() => setFilters({ ...filters, priceRange: range.value })}
                          className="w-4 h-4 text-[#8B1538] focus:ring-[#8B1538]"
                        />
                        <span>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span>🎨</span> Color
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="color"
                        checked={!filters.color}
                        onChange={() => setFilters({ ...filters, color: "" })}
                        className="w-4 h-4 text-[#8B1538] focus:ring-[#8B1538]"
                      />
                      <span>All Colors</span>
                    </label>
                    {uniqueColors.map(color => (
                      <label key={color} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="color"
                          checked={filters.color === color}
                          onChange={() => setFilters({ ...filters, color })}
                          className="w-4 h-4 text-[#8B1538] focus:ring-[#8B1538]"
                        />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                  Clear All Filters
                </button>
              </div>

              {/* Category Quick Links */}
              <div className="bg-white lg:rounded-xl lg:shadow-sm p-5 mt-6">
                <h4 className="font-bold text-gray-800 mb-4">Quick Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setFilters({ ...filters, category: cat.name });
                        setSelectedCategory(cat.name);
                      }}
                      className={`p-3 rounded-lg text-center text-sm font-medium transition ${filters.category === cat.name
                        ? 'bg-[#8B1538] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      <span className="text-lg block mb-1">{cat.icon}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Apply Button */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-[#8B1538] text-white py-3 rounded-lg font-bold"
              >
                Show {filteredProducts.length} Products
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
                }`}>
                {filteredProducts.map((product, idx) => (
                  <div
                    key={product._id}
                    className="animate-fade-in-down"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

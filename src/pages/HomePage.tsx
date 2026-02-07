// @ts-nocheck
import React, { useContext, useState, useEffect, useRef } from "react";
import { Star, Sparkles, Truck, Shield, RefreshCw, Award, ArrowRight, Play, Crown, Zap, TrendingUp, Gem } from "lucide-react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, BANNERS } from "../data/sampleProducts";

export default function HomePage() {
  const { state, setCurrentPage, setSelectedCategory } = useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % BANNERS.length), 5000);

    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goldCollection = state.products.filter(p => p.category === "1 Gram Gold");
  const weddingSpecials = state.products.filter(p => p.subcategory === "Wedding Special" || p.subcategory === "Bridal");
  const offers = state.products.filter(p => p.isOffer || p.offerPrice < 700);
  const newArrivals = state.products.filter(p => p.isNew);

  const features = [
    { icon: Truck, title: "Free Shipping", desc: "On orders above ₹1000" },
    { icon: Shield, title: "100% Genuine", desc: "Authentic handloom sarees" },
    { icon: RefreshCw, title: "Easy Returns", desc: "7 days return policy" },
    { icon: Award, title: "Factory Direct", desc: "No middlemen" }
  ];

  return (
    <div className="min-h-screen">
      {/* Parallax Hero Banner */}
      <div
        ref={heroRef}
        className="relative h-[calc(100vh-64px)] min-h-[500px] overflow-hidden"
      >
        {BANNERS.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            {/* Parallax Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transform scale-110`}
              style={{ transform: `translateY(${offsetY * 0.5}px) scale(1.1)` }}
            />

            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Floating Particles */}
                <div className="absolute top-[10%] left-[5%] w-3 h-3 bg-yellow-400/60 rounded-full animate-float" style={{ animationDelay: '0s' }} />
                <div className="absolute top-[20%] left-[15%] w-4 h-4 bg-white/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute top-[30%] right-[10%] w-2 h-2 bg-yellow-300/50 rounded-full animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[60%] left-[8%] w-5 h-5 bg-white/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />

                {/* Spinning Rings */}
                <div className="absolute top-[5%] right-[5%] w-64 h-64 border border-white/10 rounded-full animate-spin-slow opacity-50" />
                <div className="absolute bottom-[10%] left-[5%] w-48 h-48 border-2 border-dashed border-white/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-transparent via-black/10 to-transparent animate-pulse" />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
              </div>

              {/* Main Content */}
              <div className="text-center px-4 sm:px-6 relative z-20 max-w-5xl mx-auto transform transition-transform duration-75" style={{ transform: `translateY(${offsetY * -0.2}px)` }}>
                {/* Premium Badge */}
                <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8 tracking-wider uppercase letter-spacing-2 shadow-2xl backdrop-blur-md border border-white/20 transform hover:scale-105 transition-all cursor-default ${idx === 0
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-amber-900'
                  : 'bg-white/10 text-white'
                  } animate-bounce-soft`}>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  {slide.badge}
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>

                {/* Title with Animation */}
                <h1 className="text-4xl sm:text-6xl lg:text-9xl font-bold mb-4 sm:mb-6 font-display leading-tight tracking-tight">
                  <span className={`block transform transition-all duration-1000 delay-100 ${idx === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${idx === 0 ? 'bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl filter brightness-110' : 'text-white drop-shadow-lg'}`}>
                    {slide.title}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className={`text-xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 text-white/95 font-light tracking-wide transform transition-all duration-1000 delay-300 ${idx === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  {slide.subtitle}
                </p>

                {/* Description */}
                <p className={`text-sm sm:text-lg text-white/80 mb-8 sm:mb-12 px-4 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1000 delay-500 ${idx === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-1000 delay-700 ${idx === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <button
                    onClick={() => setCurrentPage("products")}
                    className="group relative overflow-hidden bg-white text-black px-8 py-4 rounded-full font-bold text-sm sm:text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Shop Collection <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </button>
                  <a
                    href="https://youtube.com/@harshaltex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-sm sm:text-lg hover:bg-white/10 hover:border-white transition-all duration-300 inline-flex items-center justify-center gap-2 backdrop-blur-sm"
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> Watch Video
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-3 z-30">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-500 rounded-full ${idx === currentSlide
                ? 'w-12 h-1.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Features Strip */}
      <div className="bg-white border-b border-gray-100 py-6 sm:py-8 shadow-sm relative z-10 -mt-4 rounded-t-3xl sm:-mt-8 sm:rounded-t-[2.5rem]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="p-3 bg-rose-50 rounded-full text-[#8B1538] group-hover:bg-[#8B1538] group-hover:text-white transition-colors duration-300 shadow-sm">
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#8B1538] transition-colors">{feature.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-12 sm:py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-[#8B1538] font-bold tracking-widest text-xs uppercase mb-2 block animate-fade-in-down">Collections</span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4 text-gray-900 animate-fade-in-down stagger-1">
              Shop by Category
            </h2>
            <div className="w-24 h-1 bg-[#8B1538] mx-auto rounded-full mb-4 animate-scale-in" />
            <p className="text-gray-600 animate-fade-in-down stagger-2">Curated handloom treasures for the modern woman</p>
          </div>

          <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-6">
            {CATEGORIES.map((category, idx) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.name);
                  setCurrentPage("products");
                }}
                className={`group bg-white rounded-2xl p-4 sm:p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-amber-100 animate-fade-in-down stagger-${idx % 4}`}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-50 rounded-full flex items-center justify-center text-2xl sm:text-4xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  {category.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-[10px] sm:text-sm leading-tight group-hover:text-[#8B1538] transition-colors line-clamp-1">{category.name}</h3>
                <span className="text-[9px] sm:text-xs text-gray-400 mt-1 block group-hover:text-amber-600 transition-colors uppercase tracking-wider">{category.count} Items</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 1 Gram Gold Collection - Hero Section */}
      <section className="py-16 sm:py-24 bg-[#1a0b0b] relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-black to-black opacity-80" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-900/20 rounded-full blur-[100px] animate-pulse delay-700" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
              <Crown className="w-3 h-3" /> Exclusive
            </span>
            <h2 className="text-4xl sm:text-7xl font-bold font-display mb-6 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent drop-shadow-lg">
              The Gold Collection
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the grandeur of 1 Gram Gold Sarees. Meticulously crafted with premium tissue silk and authentic Zari work.
            </p>

            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="text-5xl sm:text-7xl font-bold text-yellow-500 font-display animate-pulse-glow">
                ₹450
                <span className="text-lg sm:text-2xl text-white/50 font-sans font-normal ml-2 line-through">₹1299</span>
              </div>
              <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                Limited Time Offer
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {goldCollection.slice(0, 4).map((product, idx) => (
              <div key={product._id} className={`transform hover:-translate-y-2 transition-transform duration-500 delay-${idx * 100}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <button
              onClick={() => {
                setSelectedCategory("1 Gram Gold");
                setCurrentPage("products");
              }}
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 font-bold rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Full Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 border-b border-gray-100 pb-6 text-left">
            <div>
              <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase mb-2 block">Fresh In Store</span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display text-gray-900">New Arrivals</h2>
            </div>
            <button
              onClick={() => setCurrentPage("products")}
              className="hidden sm:flex items-center gap-2 text-indigo-600 font-bold border-b-2 border-transparent hover:border-indigo-600 transition-all pb-1 group"
            >
              View All Products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {newArrivals.slice(0, 4).map((product, idx) => (
              <div key={product._id} className="animate-fade-in-down">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <button
              onClick={() => setCurrentPage("products")}
              className="text-indigo-600 font-bold inline-flex items-center gap-2"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Wedding Specials */}
      <section className="py-16 sm:py-24 bg-rose-50/50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-bold tracking-widest text-xs uppercase mb-2 block">Bridal Edit</span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4 text-gray-900">
              Wedding Collection
            </h2>
            <div className="w-24 h-1 bg-rose-400 mx-auto rounded-full mb-6" />
            <p className="text-gray-600 max-w-xl mx-auto">
              Make your special day unforgettable with our handpicked bridal Kanjivaram and Banarasi silk sarees.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {weddingSpecials.slice(0, 6).map((product, idx) => (
              <div key={product._id} className="transform hover:-translate-y-1 transition-all duration-300">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-16 bg-[#111] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold font-display mb-6">Quality You Can Trust</h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                At Harshal Textiles, we believe in preserving the art of weaving. Every saree is a masterpiece, crafted with passion and precision directly from the weavers of Elampillai.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <Gem className="w-8 h-8 text-amber-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Authentic Silk</h4>
                    <p className="text-sm text-gray-500">100% pure materials used</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <TrendingUp className="w-8 h-8 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Best Value</h4>
                    <p className="text-sm text-gray-500">Unbeatable factory prices</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-purple-500/20 blur-3xl rounded-full" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold text-xl">W</div>
                  <div>
                    <p className="font-bold">WhatsApp Ordering</p>
                    <p className="text-sm text-green-400">Instant & Personal</p>
                  </div>
                </div>
                <p className="text-gray-300 italic mb-6">"The quality of the saree is amazing! It looks exactly like the pictures. Thank you for the fast delivery."</p>
                <div className="flex items-center gap-2 text-yellow-500">
                  <Star className="fill-current w-4 h-4" />
                  <Star className="fill-current w-4 h-4" />
                  <Star className="fill-current w-4 h-4" />
                  <Star className="fill-current w-4 h-4" />
                  <Star className="fill-current w-4 h-4" />
                  <span className="text-gray-500 text-sm ml-2">- Happy Customer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

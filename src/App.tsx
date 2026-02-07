// @ts-nocheck
import React, { useContext } from "react";
import { AppContext, AppProvider } from "./context/AppContext";

// Pages
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import WishlistPage from "./pages/WishlistPage";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import AuthModal from "./components/AuthModal";
import WhatsAppButton from "./components/WhatsAppButton";

// Toast Component
function Toast() {
  const { toast } = useContext(AppContext);

  if (!toast) return null;

  return (
    <div className={`fixed bottom-24 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl animate-slide-in-right max-w-sm ${toast.type === "error"
      ? "bg-red-600 text-white"
      : toast.type === "warning"
        ? "bg-amber-500 text-white"
        : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      }`}>
      <p className="font-medium">{toast.message}</p>
    </div>
  );
}

// Main App Content
function AppContent() {
  const { currentPage } = useContext(AppContext);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "products":
        return <ProductListPage />;
      case "product-detail":
        return <ProductDetailPage />;
      case "checkout":
        return <CheckoutPage />;
      case "orders":
        return <OrdersPage />;
      case "order-success":
        return <OrderSuccessPage />;
      case "wishlist":
        return <WishlistPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <CartDrawer />
      <AuthModal />
      <WhatsAppButton />
      <Toast />
    </div>
  );
}

// App with Provider
export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

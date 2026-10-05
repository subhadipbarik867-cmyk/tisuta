import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { ShopByCategory } from './components/home/ShopByCategory';
import { NewArrivals } from './components/home/NewArrivals';
import { DiscoveryFeed } from './components/home/DiscoveryFeed';
import { TrendingEdits } from './components/home/TrendingEdits';
import { StoryReels } from './components/home/StoryReels';
import { PersonalizedStyleQuiz } from './components/home/PersonalizedStyleQuiz';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

// Modals & Interactive Innovation Suites
import { VirtualFitSuite } from './components/virtualFit/VirtualFitSuite';
import { ProductQuickViewModal } from './components/product/ProductQuickViewModal';
import { SizeAdvisorModal } from './components/product/SizeAdvisorModal';
import { InstantSearchModal } from './components/search/InstantSearchModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { TisutaAiStylistModal } from './components/ai/TisutaAiStylistModal';
import { TisutaStyleboardModal } from './components/styleboard/TisutaStyleboardModal';
import { ProductCompareModal } from './components/product/ProductCompareModal';
import { NotificationDrawer } from './components/notifications/NotificationDrawer';
import { SupportModal } from './components/support/SupportModal';

function MainAppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleNavigatePage = (pageName, params = {}) => {
    setCurrentPage(pageName);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product, initialMode = 'single') => {
    setSelectedProduct(product);
    handleNavigatePage('product-detail', { initialMode });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased text-[#121212] selection:bg-[#D5B263] selection:text-[#121212]">
      {/* Sticky Global Navigation */}
      <Navbar
        onNavigatePage={handleNavigatePage}
        currentPage={currentPage}
      />

      {/* Main View Router */}
      <main>
        {/* HOMEPAGE (Section 03, 04, 14, 15) */}
        {currentPage === 'home' && (
          <>
            <HeroSection onNavigatePage={handleNavigatePage} />
            <StoryReels onSelectProduct={handleSelectProduct} />
            <DiscoveryFeed onSelectProduct={handleSelectProduct} onNavigatePage={handleNavigatePage} />
            <ShopByCategory onNavigatePage={handleNavigatePage} />
            <NewArrivals onSelectProduct={handleSelectProduct} onNavigatePage={handleNavigatePage} />
            <TrendingEdits onNavigatePage={handleNavigatePage} />
            <PersonalizedStyleQuiz onNavigatePage={handleNavigatePage} />
          </>
        )}

        {/* CATALOG (Section 05, 07) */}
        {currentPage === 'catalog' && (
          <CatalogPage
            initialCategory={pageParams.category || 'all'}
            initialSubCategory={pageParams.subCategory || 'all'}
            initialEditTag={pageParams.editTag || null}
            initialSearch={pageParams.search || ''}
            onSelectProduct={handleSelectProduct}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {/* PRODUCT DETAIL PAGE (Section 08, 09, 12, 18) */}
        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            initialMode={pageParams.initialMode || 'single'}
            onSelectProduct={handleSelectProduct}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {/* CHECKOUT (Section 20) */}
        {currentPage === 'checkout' && (
          <CheckoutPage onNavigatePage={handleNavigatePage} />
        )}

        {/* VIP ACCOUNT, ORDERS, WISHLIST, RETURNS (Section 16, 22, 23, 24, 25) */}
        {currentPage === 'account' && (
          <AccountPage
            onSelectProduct={handleSelectProduct}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {/* ENTERPRISE CONTROL CENTER ADMIN (Section 28-38, 46, 47) */}
        {currentPage === 'admin' && (
          <AdminDashboardPage />
        )}
      </main>

      {/* Footer */}
      {currentPage !== 'admin' && (
        <Footer onNavigatePage={handleNavigatePage} />
      )}

      {/* Global Interactive Modals & Slide-Over Drawers */}
      <VirtualFitSuite />
      <ProductQuickViewModal />
      <SizeAdvisorModal />
      <InstantSearchModal onSelectProduct={handleSelectProduct} onNavigatePage={handleNavigatePage} />
      <CartDrawer onNavigateCheckout={() => handleNavigatePage('checkout')} />
      <TisutaAiStylistModal onSelectProduct={handleSelectProduct} />
      <TisutaStyleboardModal />
      <ProductCompareModal />
      <NotificationDrawer />
      <SupportModal />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ShopProvider>
        <MainAppContent />
      </ShopProvider>
    </ErrorBoundary>
  );
}

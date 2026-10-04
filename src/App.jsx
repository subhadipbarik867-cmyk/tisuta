import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { StoryReels } from './components/home/StoryReels';
import { ShopByCategory } from './components/home/ShopByCategory';
import { NewArrivals } from './components/home/NewArrivals';
import { TrendingEdits } from './components/home/TrendingEdits';
import { PersonalizedStyleQuiz } from './components/home/PersonalizedStyleQuiz';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { VirtualFitSuite } from './components/virtualFit/VirtualFitSuite';
import { ProductQuickViewModal } from './components/product/ProductQuickViewModal';
import { SizeAdvisorModal } from './components/product/SizeAdvisorModal';
import { InstantSearchModal } from './components/search/InstantSearchModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { OutfitMixerModal } from './components/outfitBuilder/OutfitMixerModal';

function MainAppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOutfitMixerOpen, setIsOutfitMixerOpen] = useState(false);

  const handleNavigatePage = (pageName, params = {}) => {
    setCurrentPage(pageName);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    handleNavigatePage('product-detail');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased text-[#121212] selection:bg-[#D5B263] selection:text-[#121212]">
      {/* Top Luxury Announcement Ribbon */}
      <AnnouncementBar />

      {/* Glassmorphism Navigation Bar */}
      <Navbar
        onNavigatePage={handleNavigatePage}
        currentPage={currentPage}
        onOpenOutfitMixer={() => setIsOutfitMixerOpen(true)}
      />

      {/* Main View Router */}
      <main>
        {currentPage === 'home' && (
          <>
            {/* Myntra Studio Story Reels */}
            <StoryReels />
            <HeroSection onNavigatePage={handleNavigatePage} />
            <ShopByCategory onNavigatePage={handleNavigatePage} />
            <NewArrivals onSelectProduct={handleSelectProduct} onNavigatePage={handleNavigatePage} />
            <TrendingEdits onNavigatePage={handleNavigatePage} />
            <PersonalizedStyleQuiz onSelectProduct={handleSelectProduct} />
          </>
        )}

        {currentPage === 'catalog' && (
          <CatalogPage
            initialCategory={pageParams.category || 'all'}
            initialEditTag={pageParams.editTag || null}
            onSelectProduct={handleSelectProduct}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onSelectProduct={handleSelectProduct}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage onNavigatePage={handleNavigatePage} />
        )}

        {currentPage === 'account' && (
          <AccountPage
            onSelectProduct={handleSelectProduct}
            onNavigatePage={handleNavigatePage}
          />
        )}

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
      <OutfitMixerModal isOpen={isOutfitMixerOpen} onClose={() => setIsOutfitMixerOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}

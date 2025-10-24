import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AgeVerification } from './components/AgeVerification';
import { FilterBar } from './components/FilterBar';
import { ShopByCategory } from './components/ShopByCategory';
import { CustomLabelCTA } from './components/CustomLabelCTA';
import { ProductDetail } from './components/ProductDetail';
import { ShoppingCart } from './components/ShoppingCart';
import { Checkout } from './components/Checkout';
import { LabelCustomizer } from './components/LabelCustomizer';
import { Footer } from './components/Footer';
import { Download } from 'lucide-react';

export default function App() {
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('All Wines');
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showLabelCustomizer, setShowLabelCustomizer] = useState(false);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setShowCheckout(true);
  };

  const downloadHTMLVersion = async () => {
    try {
      const response = await fetch('/label-customizer.html');
      const htmlContent = await response.text();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'casa-larga-label-customizer.html';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please check the console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AgeVerification />
      <Navigation 
        cartItemCount={3} 
        onCartClick={() => setIsCartOpen(true)}
        isLightBackground={showLabelCustomizer || showCheckout}
      />
      <ShoppingCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
      
      {showCheckout ? (
        <>
          <Checkout onBack={() => setShowCheckout(false)} />
          <Footer />
        </>
      ) : showLabelCustomizer ? (
        <>
          <LabelCustomizer onBack={() => setShowLabelCustomizer(false)} />
          <Footer />
        </>
      ) : showProductDetail ? (
        <>
          <ProductDetail onBack={() => setShowProductDetail(false)} />
          <Footer />
        </>
      ) : (
        <>
          <HeroSection />
          <FilterBar 
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <main>
            <ShopByCategory 
              selectedCategory={selectedCategory}
              sortBy={sortBy}
            />
            <CustomLabelCTA />
          </main>
          <Footer />
        </>
      )}
      
      {/* Floating demo buttons */}
      {!showCheckout && !showLabelCustomizer && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          <button
            onClick={downloadHTMLVersion}
            className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            title="Download standalone HTML version"
          >
            <Download className="h-5 w-5" />
            Download HTML
          </button>
          <button
            onClick={() => setShowLabelCustomizer(true)}
            className="bg-brown-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-brown-dark transition-colors"
          >
            Label Customizer
          </button>
          <button
            onClick={() => setShowProductDetail(!showProductDetail)}
            className="bg-brown-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-brown-dark transition-colors"
          >
            {showProductDetail ? 'Back to Shop' : 'View Product Detail'}
          </button>
        </div>
      )}
    </div>
  );
}
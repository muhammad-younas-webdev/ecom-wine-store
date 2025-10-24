import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  cartItemCount?: number;
  onCartClick?: () => void;
  isLightBackground?: boolean; // For pages with light backgrounds at the top
}

export function Navigation({ cartItemCount = 0, onCartClick, isLightBackground = false }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we should use dark elements (for light backgrounds)
  const useDarkElements = isLightBackground || isScrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      useDarkElements ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Bar - Logo centered */}
        <div className="relative flex items-center justify-center py-6">
          {/* Logo - Always Centered */}
          <div className="flex-shrink-0">
            <img 
              src="https://casalarga.casasite.com/wp-content/uploads/2025/08/Logo.svg"
              alt="Casa Larga"
              className="h-20 md:h-24 w-auto transition-all duration-300"
              style={{
                filter: useDarkElements ? 'brightness(0)' : 'none'
              }}
            />
          </div>

          {/* Icons - Desktop - Absolute positioned top right */}
          <div className="hidden lg:flex absolute right-0 top-6 items-center gap-4">
            <Button variant="ghost" size="icon" className={`transition-colors duration-300 ${
              useDarkElements ? 'text-black hover:text-brown-primary' : 'text-white hover:text-cream'
            }`}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className={`transition-colors duration-300 ${
              useDarkElements ? 'text-black hover:text-brown-primary' : 'text-white hover:text-cream'
            }`}>
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onCartClick}
              className={`relative transition-colors duration-300 ${
                useDarkElements ? 'text-black hover:text-brown-primary' : 'text-white hover:text-cream'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brown-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden absolute right-0 top-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors duration-300 ${
                useDarkElements ? 'text-black' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-8 pb-4">
          <a href="#" className={`nav-link transition-colors duration-300 ${
            useDarkElements ? 'text-black hover:text-brown-primary' : 'text-white hover:text-cream'
          }`}>SHOP</a>
          <a href="#" className={`nav-link transition-colors duration-300 ${
            useDarkElements ? 'text-black hover:text-brown-primary' : 'text-white hover:text-cream'
          }`}>VISIT</a>
          <a href="#" className={`nav-link transition-colors duration-300 ${
            useDarkElements ? 'text-black hover:text-brown-primary' : 'text-white hover:text-cream'
          }`}>WINES</a>
          <a href="#" className={`nav-link transition-colors duration-300 ${
            useDarkElements ? 'text-black hover:text-brown-primary' : 'text-white hover:text-cream'
          }`}>EVENTS</a>
          <a href="#" className={`nav-link transition-colors duration-300 ${
            useDarkElements ? 'text-black hover:text-brown-primary' : 'text-white hover:text-cream'
          }`}>PRIVATE EVENTS</a>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 bg-black/80 backdrop-blur-sm">
            <div className="flex flex-col gap-4">
              <a href="#" className="mobile-nav-link">SHOP</a>
              <a href="#" className="mobile-nav-link">VISIT</a>
              <a href="#" className="mobile-nav-link">WINES</a>
              <a href="#" className="mobile-nav-link">EVENTS</a>
              <a href="#" className="mobile-nav-link">PRIVATE EVENTS</a>
              <div className="flex items-center justify-center pt-4 border-t border-white/20 gap-4">
                <Button variant="ghost" size="icon" className="text-white">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white">
                  <User className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onCartClick}
                  className="relative text-white"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brown-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .nav-link {
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 500;
          text-decoration: none;
          padding: 0.5rem 0;
          transition: all 0.3s ease;
          letter-spacing: 0.05em;
          font-size: 0.875rem;
        }
        .nav-link:not(.text-black) {
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        .mobile-nav-link {
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 500;
          color: white;
          text-decoration: none;
          padding: 0.75rem 0;
          transition: color 0.3s ease;
          letter-spacing: 0.05em;
          text-align: center;
        }
        .mobile-nav-link:hover {
          color: var(--cream);
        }
      `}</style>
    </nav>
  );
}
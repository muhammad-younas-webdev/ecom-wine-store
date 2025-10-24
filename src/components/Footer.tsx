import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-light">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo and Company Info */}
          <div className="flex flex-col gap-6">
            <img 
              src="https://casalarga.casasite.com/wp-content/uploads/2025/08/Logo.svg"
              alt="Casa Larga"
              className="h-16 w-auto"
            />
            <p className="text-gray-medium">
              Crafting exceptional wines on the shores of Seneca Lake since 1974. 
              Experience the tradition and innovation of Finger Lakes winemaking.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-gray-medium hover:text-brown-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-medium hover:text-brown-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-medium hover:text-brown-primary">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-4">
            <h3 className="font-medium text-brown-dark">Shop</h3>
            <ul className="flex flex-col gap-3 text-gray-medium">
              <li><a href="#" className="hover:text-brown-primary transition-colors">All Wines</a></li>
              <li><a href="#" className="hover:text-brown-primary transition-colors">Red Wines</a></li>
              <li><a href="#" className="hover:text-brown-primary transition-colors">White Wines</a></li>
              <li><a href="#" className="hover:text-brown-primary transition-colors">Sparkling Wines</a></li>
              <li><a href="#" className="hover:text-brown-primary transition-colors">Dessert Wines</a></li>
              <li><a href="#" className="hover:text-brown-primary transition-colors">Wine Club</a></li>
              <li><a href="#" className="hover:text-brown-primary transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <h3 className="font-medium text-brown-dark">Services</h3>
            <ul className="flex flex-col gap-3 text-gray-medium">
              <li><a href="#" className="hover:text-brown-primary transition-colors">Custom Labels</a></li>
              <li><a href="#" className="hover:text-brown-primary transition-colors">Private Events</a></li>
              <li><a href="#" className="hover:text-brown-primary transition-colors">Wine Tastings</a></li>
              <li><a href="#" className="hover:text-brown-primary transition-colors">Corporate Gifts</a></li>
              <li><a href="#" className="hover:text-brown-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-brown-primary transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-medium text-brown-dark">Contact</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brown-primary mt-0.5 flex-shrink-0" />
                <div className="text-gray-medium flex flex-col">
                  <div>2287 Turk Hill Road</div>
                  <div>Fairport, NY 14450</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brown-primary flex-shrink-0" />
                <a href="tel:585-223-4210" className="text-gray-medium hover:text-brown-primary transition-colors">
                  (585) 223-4210
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brown-primary flex-shrink-0" />
                <a href="mailto:info@casalarga.com" className="text-gray-medium hover:text-brown-primary transition-colors">
                  info@casalarga.com
                </a>
              </div>
            </div>

            <div className="p-4 bg-cream rounded-lg flex flex-col gap-2">
              <h4 className="font-medium text-brown-dark">Tasting Room Hours</h4>
              <div className="text-sm text-gray-medium flex flex-col gap-1">
                <div>Mon-Thu: 11am-5pm</div>
                <div>Fri-Sat: 11am-6pm</div>
                <div>Sun: 12pm-5pm</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-light mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-medium">
              © 2024 Casa Larga Vineyards. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-medium">
              <a href="#" className="hover:text-brown-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brown-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brown-primary transition-colors">Age Verification</a>
            </div>
          </div>
          <div className="text-xs text-gray-medium mt-4 text-center md:text-left">
            Please drink responsibly. Must be 21 years of age or older to purchase alcoholic beverages.
          </div>
        </div>
      </div>
    </footer>
  );
}
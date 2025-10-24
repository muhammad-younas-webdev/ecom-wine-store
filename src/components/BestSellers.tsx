import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

const bestSellers = [
  {
    id: 1,
    name: 'Casa Larga Cabernet Sauvignon',
    vintage: 2021,
    type: 'Red Wine',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1652284299342-21749ba9baa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB3aW5lJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NTk4NDkzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isOnSale: true,
    description: 'Rich and bold with notes of dark cherry and oak'
  },
  {
    id: 2,
    name: 'Casa Larga Chardonnay',
    vintage: 2022,
    type: 'White Wine',
    price: 19.99,
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1534409385199-b60aa1bcffa0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHdpbmUlMjBib3R0bGV8ZW58MXx8fHwxNzU5OTE1NzgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isOnSale: false,
    description: 'Crisp and refreshing with citrus and vanilla notes'
  },
  {
    id: 3,
    name: 'Casa Larga Sparkling Riesling',
    vintage: 2021,
    type: 'Sparkling Wine',
    price: 32.99,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1634496173551-dd16f77fd47c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhzcGFya2xpbmclMjBjaGFtcGFnbmUlMjBib3R0bGV8ZW58MXx8fHwxNzU5OTI4OTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isOnSale: false,
    description: 'Elegant bubbles with floral and fruit aromatics'
  }
];

export function BestSellers() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="kicker text-sm mb-2">Customer Favorites</div>
          <h2 className="section-title text-4xl md:text-5xl mb-4">
            Best Selling Wines
          </h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">
            Discover why these exceptional wines have captured the hearts of our customers 
            and critics alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((wine) => (
            <div
              key={wine.id}
              className="wine-card p-6 relative group"
            >
              {wine.isOnSale && (
                <Badge className="absolute top-4 left-4 z-10 bg-red-500 hover:bg-red-600">
                  Sale
                </Badge>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white hover:text-brown-primary"
              >
                <Heart className="h-4 w-4" />
              </Button>

              <div className="relative mb-6 overflow-hidden rounded-xl">
                <ImageWithFallback
                  src={wine.image}
                  alt={wine.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{wine.rating}</span>
                  </div>
                  <span className="text-sm text-gray-medium">({wine.reviews} reviews)</span>
                </div>

                <div>
                  <span className="kicker text-xs block mb-1">{wine.type}</span>
                  <h3 className="font-medium text-brown-dark mb-1">
                    {wine.name}
                  </h3>
                  <p className="text-sm text-gray-medium italic">
                    Vintage {wine.vintage}
                  </p>
                </div>

                <p className="text-sm text-gray-medium">
                  {wine.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-medium text-brown-dark">
                      ${wine.price}
                    </span>
                    {wine.originalPrice && (
                      <span className="text-sm text-gray-medium line-through">
                        ${wine.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    size="icon"
                    className="bg-brown-light hover:bg-brown-primary text-white"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="btn-casa text-lg px-8 py-4">
            Shop All Best Sellers
          </Button>
        </div>
      </div>
    </section>
  );
}
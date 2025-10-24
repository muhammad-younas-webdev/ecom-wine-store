import { useState } from 'react';
import { ChevronRight, Minus, Plus, Heart, Share2, Award } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailProps {
  onBack: () => void;
}

export function ProductDetail({ onBack }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample product data
  const product = {
    id: 1,
    name: 'Petite Noir',
    fullName: 'Casa Larga Petite Noir 750Ml Nv',
    category: 'Red Wines',
    price: 11.99,
    image: 'https://www.lisasliquorbarn.com/img/casa-larga-petite-noir-1.png?w=1920&s=eb7372432aa8a85899c8b1445eff77ae',
    description: 'A light-bodied red wine with delicate fruit flavors and smooth tannins. Perfect for those who enjoy a softer red wine experience.',
    awards: [
      'Silver Medal - Finger Lakes Wine Competition 2023',
      '88 Points - Wine Enthusiast'
    ]
  };

  const relatedProducts = [
    {
      id: 2,
      name: 'Rosso',
      price: 9.99,
      image: 'https://www.lisasliquorbarn.com/img/089800002537.png?w=1920&s=82525ef2d78b05d33c6a1b3635b1ece9'
    },
    {
      id: 3,
      name: 'Tramonto',
      price: 11.99,
      image: 'https://www.lisasliquorbarn.com/img/089800006238.jpg?w=1920&s=7b3c8dac5efa55f12f0ced407190a5ce'
    },
    {
      id: 13,
      name: 'Cabernet/Merlot',
      price: 14.99,
      image: 'https://www.lisasliquorbarn.com/img/089800000335.jpg?w=1920&s=720e4be6942a1c7069aa07175ce4023c'
    },
    {
      id: 16,
      name: 'Pinot Noir',
      price: 16.99,
      image: 'https://www.lisasliquorbarn.com/img/casa-larga-petite-noir-1.png?w=1920&s=eb7372432aa8a85899c8b1445eff77ae'
    }
  ];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-white pt-32 md:pt-36">
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-brown-light/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={onBack} className="text-gray-medium hover:text-brown-primary transition-colors">
              Home
            </button>
            <ChevronRight className="h-4 w-4 text-gray-medium" />
            <button onClick={onBack} className="text-gray-medium hover:text-brown-primary transition-colors">
              Shop
            </button>
            <ChevronRight className="h-4 w-4 text-gray-medium" />
            <span className="text-gray-medium hover:text-brown-primary transition-colors cursor-pointer">
              {product.category}
            </span>
            <ChevronRight className="h-4 w-4 text-gray-medium" />
            <span className="text-brown-primary">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <div className="flex flex-col gap-6">
            <div className="bg-cream rounded-2xl p-8 md:p-12 flex items-center justify-center min-h-[400px] md:min-h-[600px]">
              <ImageWithFallback
                src={product.image}
                alt={product.fullName}
                className="max-w-full max-h-[500px] object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="text-sm text-brown-primary uppercase tracking-wider">
                {product.category}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-brown-dark">
                Casa Larga {product.name}
              </h1>
              <div className="text-2xl md:text-3xl text-brown-primary">
                ${product.price.toFixed(2)}
              </div>
            </div>

            {/* Awards */}
            {product.awards.length > 0 && (
              <div className="flex flex-col gap-2 p-4 bg-cream/50 rounded-xl border border-brown-light/20">
                {product.awards.map((award, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-brown-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-medium">{award}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="h-px bg-brown-light/20"></div>

            {/* Description */}
            <p className="text-gray-medium leading-relaxed">
              {product.description}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-3 border-2 border-brown-light/30 rounded-lg px-4 py-3">
                  <button
                    onClick={decrementQuantity}
                    className="text-brown-primary hover:text-brown-dark transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="text-lg min-w-[2rem] text-center">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="text-brown-primary hover:text-brown-dark transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <Button className="flex-1 btn-casa text-base h-auto py-4">
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Favorited' : 'Add to Favorites'}
                </Button>
                <Button
                  variant="outline"
                  className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Savings Banner */}
            <div className="p-6 bg-brown-primary/10 rounded-xl border border-brown-primary/20">
              <h3 className="text-brown-dark mb-2">Volume Savings</h3>
              <div className="flex flex-col gap-1 text-sm text-gray-medium">
                <div className="flex items-center justify-between">
                  <span>Buy 6 bottles:</span>
                  <span className="text-brown-primary">Save $5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Buy 12 bottles (case):</span>
                  <span className="text-brown-primary">Save $15</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 md:mt-24">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl mb-3">
              You May Also Like
            </h2>
            <p className="text-gray-medium">
              Explore more exceptional wines from our collection
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group flex flex-col items-center text-center">
                <div className="w-full h-48 md:h-64 mb-4 bg-cream rounded-xl p-4 flex items-center justify-center">
                  <ImageWithFallback
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <span className="block text-black text-sm">Casa Larga</span>
                  <span className="block text-black">{relatedProduct.name}</span>
                </div>
                <Button className="w-full max-w-[240px] h-12 bg-transparent border-2 border-black text-black hover:text-white rounded-none relative overflow-hidden transition-colors duration-300 before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-black before:transition-all before:duration-300 before:ease-in-out hover:before:left-0 before:z-0">
                  <span className="relative z-10 text-sm">View Details</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
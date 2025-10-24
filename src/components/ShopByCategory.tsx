import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Casa Larga Product Data
const mockProducts = [
  {
    id: 1,
    name: 'Casa Larga Petite Noir 750Ml Nv',
    category: 'Red Wines',
    price: 11.99,
    image: 'https://www.lisasliquorbarn.com/img/casa-larga-petite-noir-1.png?w=1920&s=eb7372432aa8a85899c8b1445eff77ae'
  },
  {
    id: 2,
    name: 'Casa Larga Rosso 750Ml Nv',
    category: 'Red Wines',
    price: 9.99,
    image: 'https://www.lisasliquorbarn.com/img/089800002537.png?w=1920&s=82525ef2d78b05d33c6a1b3635b1ece9'
  },
  {
    id: 3,
    name: 'Casa Larga Tramonto 750Ml Nv',
    category: 'Red Wines',
    price: 11.99,
    image: 'https://www.lisasliquorbarn.com/img/089800006238.jpg?w=1920&s=7b3c8dac5efa55f12f0ced407190a5ce'
  },
  {
    id: 4,
    name: 'Casa Larga Pallido 1.5L Nv',
    category: 'White Wines',
    price: 15.99,
    image: 'https://www.lisasliquorbarn.com/img/089800000137.jfif?w=1920&s=71f97edde60a1b307a746b52ec95ab63'
  },
  {
    id: 5,
    name: 'Casa Larga Bianco 1.5L Nv',
    category: 'White Wines',
    price: 15.99,
    image: 'https://www.lisasliquorbarn.com/img/089800002339.png?w=1920&s=4339b724b2ea50e3345ff87ddd51a71b'
  },
  {
    id: 6,
    name: 'Casa Larga CLV Chardonnay 750Ml NV',
    category: 'White Wines',
    price: 13.99,
    image: 'https://www.lisasliquorbarn.com/img/089800008836.jpeg?w=1920&s=e14c983739702f82e4d328d7330cf8f5'
  },
  {
    id: 7,
    name: 'Casa Larga Lilac Hill 750Ml NV',
    category: 'Rosé Wines',
    price: 10.99,
    image: 'https://www.lisasliquorbarn.com/img/casa-larga-lilac.jpg?w=1920&s=e04ed74afb9567ca0043bd69b0f9dc64'
  },
  {
    id: 8,
    name: '2023 Casa Larga Medium-Dry Riesling 750Ml',
    category: 'White Wines',
    price: 14.99,
    image: 'https://www.lisasliquorbarn.com/img/casa-larga-ries-med-dry-16-750.jpg?w=1920&s=f623e11967659bbd26c25db3eab15f9d'
  },
  {
    id: 9,
    name: 'Casa Larga Dolci Rosso 1.5L Nv',
    category: 'Red Wines',
    price: 15.99,
    image: 'https://www.lisasliquorbarn.com/img/089800002636.jpg?w=1920&s=6fb14d7bf9241d566ce7e610bd758158'
  },
  {
    id: 10,
    name: 'Casa Larga Lilac Hill 1.5L Nv',
    category: 'Rosé Wines',
    price: 15.99,
    image: 'https://www.lisasliquorbarn.com/img/089800000403.png?w=1920&s=0cb34b1f640916410063a66547226969'
  },
  {
    id: 11,
    name: '2022 Casa Larga Chardonnay/Riesling 750Ml',
    category: 'White Wines',
    price: 13.99,
    image: 'https://www.lisasliquorbarn.com/img/089805001078.png?w=1920&s=6b46f3e2a1e3deb64630a2f6c35e79e6'
  },
  {
    id: 12,
    name: 'Casa Larga Dolci Bianco 750Ml Nv',
    category: 'White Wines',
    price: 10.99,
    image: 'https://www.lisasliquorbarn.com/img/089800002230.png?w=1920&s=2e528a2a3bd6356a4273d9875f2a1306'
  },
  {
    id: 13,
    name: 'Casa Larga Cabernet/Merlot 750Ml Nv',
    category: 'Red Wines',
    price: 14.99,
    image: 'https://www.lisasliquorbarn.com/img/089800000335.jpg?w=1920&s=720e4be6942a1c7069aa07175ce4023c'
  },
  {
    id: 14,
    name: '2022 Casa Larga Vineyard Hill Riesling 750Ml',
    category: 'White Wines',
    price: 13.99,
    image: 'https://www.lisasliquorbarn.com/img/089800007235.webp?w=1920&s=397a11c8752b3da91eddd7ba6077a457'
  },
  {
    id: 15,
    name: '2022 Casa Larga Dry Riesling 750Ml',
    category: 'White Wines',
    price: 14.99,
    image: 'https://www.lisasliquorbarn.com/img/casa-larga-ries-med-dry-16-750-1.jpg?w=1920&s=d31296d374831e23f14b9d737ec7fc2b'
  },
  {
    id: 16,
    name: 'Casa Larga Pinot Noir 750Ml',
    category: 'Red Wines',
    price: 16.99,
    image: 'https://www.lisasliquorbarn.com/img/casa-larga-petite-noir-1.png?w=1920&s=eb7372432aa8a85899c8b1445eff77ae'
  }
];

interface ShopByCategoryProps {
  selectedCategory: string;
  sortBy: string;
}

export function ShopByCategory({ selectedCategory, sortBy }: ShopByCategoryProps) {

  // Filter products by category
  const filteredProducts = selectedCategory === 'All Wines' 
    ? mockProducts 
    : mockProducts.filter(product => product.category === selectedCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return 0; // Keep default order for featured
      case 'best-selling':
        return 0; // Keep default order for best selling
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'date-old':
        return 0; // Keep default order
      default:
        return 0;
    }
  });

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <div key={product.id} className="group flex flex-col items-center text-center">
              {/* Product Image */}
              <div className="w-full h-64 md:h-80 mb-4 flex items-center justify-center">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Name */}
              <div className="mb-4 flex flex-col gap-1">
                <span className="block text-black text-sm">Casa Larga</span>
                <span className="block text-black">{product.name.replace('Casa Larga ', '')}</span>
              </div>
              
              {/* Add to Cart Button */}
              <Button className="w-full max-w-[281.5px] h-12 bg-transparent border-2 border-black text-black hover:text-white rounded-none relative overflow-hidden transition-colors duration-300 before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-black before:transition-all before:duration-300 before:ease-in-out hover:before:left-0 before:z-0">
                <span className="relative z-10">ADD TO CART - ${product.price.toFixed(2)}</span>
              </Button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl text-gray-medium mb-4">
              No products found in this category
            </h3>
            <p className="text-gray-medium mb-8">
              Try selecting a different category or check back later for new additions.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
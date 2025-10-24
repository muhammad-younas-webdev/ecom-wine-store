import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout?: () => void;
}

export function ShoppingCart({ isOpen, onClose, onCheckout }: ShoppingCartProps) {
  // Sample cart items
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Petite Noir',
      price: 11.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1700893417207-99da24343476?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB3aW5lJTIwYm90dGxlfGVufDF8fHx8MTc1OTk0MDE0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Red Wine'
    },
    {
      id: 2,
      name: 'Tramonto',
      price: 11.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1733248113944-c4f7dc132dac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NTk4Mzk5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Red Wine'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 99 ? 0 : 12.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-light">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-brown-primary" />
            <h2 className="text-brown-dark">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5 text-gray-medium" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-light" />
              <div className="flex flex-col gap-2">
                <h3 className="text-gray-dark">Your cart is empty</h3>
                <p className="text-sm text-gray-medium">Add some wines to get started</p>
              </div>
              <Button onClick={onClose} className="btn-casa mt-4">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-light last:border-0">
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 bg-cream rounded-lg p-2 flex items-center justify-center">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-brown-primary uppercase tracking-wide">
                          {item.category}
                        </span>
                        <h4 className="text-gray-dark">Casa Larga {item.name}</h4>
                        <span className="text-brown-primary">${item.price.toFixed(2)}</span>
                      </div>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4 text-gray-medium hover:text-red-500" />
                      </button>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 w-fit border border-gray-light rounded-lg px-3 py-2">
                      <button
                        className="text-brown-primary hover:text-brown-dark transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm min-w-[1.5rem] text-center">{item.quantity}</span>
                      <button
                        className="text-brown-primary hover:text-brown-dark transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-sm text-gray-medium">
                      Item Total: <span className="text-brown-primary">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Order Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-light p-6 bg-cream/30">
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-medium">Subtotal</span>
                <span className="text-gray-dark">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-medium">Shipping</span>
                <span className="text-gray-dark">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-medium">Tax (Est.)</span>
                <span className="text-gray-dark">${tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-light my-2"></div>
              <div className="flex items-center justify-between">
                <span className="text-brown-dark">Total</span>
                <span className="text-brown-primary text-xl">${total.toFixed(2)}</span>
              </div>
            </div>

            {subtotal < 99 && (
              <div className="mb-4 p-3 bg-blue-primary/10 rounded-lg border border-blue-primary/20">
                <p className="text-xs text-gray-medium text-center">
                  Add <span className="text-brown-primary">${(99 - subtotal).toFixed(2)}</span> more for FREE shipping
                </p>
              </div>
            )}

            <Button className="w-full btn-casa py-4 text-base" onClick={onCheckout}>
              Proceed to Checkout
            </Button>            
          </div>
        )}
      </div>
    </>
  );
}
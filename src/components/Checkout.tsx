import { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CheckoutProps {
  onBack: () => void;
}

export function Checkout({ onBack }: CheckoutProps) {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);

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

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-cream/30 pt-32 md:pt-36 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-[20px] p-8 md:p-12 text-center shadow-lg">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-brown-dark mb-4">Order Confirmed!</h1>
            <p className="text-gray-medium mb-2">Thank you for your order</p>
            <p className="text-sm text-gray-medium mb-8">
              Order #CL-{Math.floor(Math.random() * 100000)}
            </p>
            
            <div className="bg-cream/50 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-medium mb-2">Confirmation sent to:</p>
              <p className="text-brown-dark">customer@example.com</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={onBack} className="btn-casa">
                Continue Shopping
              </Button>
              <Button variant="outline" className="border-brown-primary text-brown-primary hover:bg-brown-primary/10">
                View Order Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/30 pt-32 md:pt-36 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-medium hover:text-brown-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Cart</span>
        </button>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-brown-dark mb-2">Checkout</h1>
          <p className="text-gray-medium">Complete your order</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitOrder} className="flex flex-col gap-8">
              {/* Contact Information */}
              <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm">
                <h3 className="text-brown-dark mb-6">Contact Information</h3>
                <div className="grid gap-6">
                  <div>
                    <Label htmlFor="email">Email Address*</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number*</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      required
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm">
                <h3 className="text-brown-dark mb-6">Shipping Address</h3>
                <div className="grid gap-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name*</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name*</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Street Address*</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="123 Main Street"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="apartment">Apartment, Suite, etc.</Label>
                    <Input
                      id="apartment"
                      type="text"
                      placeholder="Apt 4B"
                      className="mt-2"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City*</Label>
                      <Input
                        id="city"
                        type="text"
                        placeholder="Rochester"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State*</Label>
                      <Input
                        id="state"
                        type="text"
                        placeholder="NY"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code*</Label>
                      <Input
                        id="zip"
                        type="text"
                        placeholder="14450"
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-brown-dark">Billing Address</h3>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="sameAsShipping"
                      checked={sameAsShipping}
                      onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                    />
                    <Label htmlFor="sameAsShipping" className="cursor-pointer text-sm">
                      Same as shipping
                    </Label>
                  </div>
                </div>

                {!sameAsShipping && (
                  <div className="grid gap-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingFirstName">First Name*</Label>
                        <Input
                          id="billingFirstName"
                          type="text"
                          placeholder="John"
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingLastName">Last Name*</Label>
                        <Input
                          id="billingLastName"
                          type="text"
                          placeholder="Doe"
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="billingAddress">Street Address*</Label>
                      <Input
                        id="billingAddress"
                        type="text"
                        placeholder="123 Main Street"
                        required
                        className="mt-2"
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="billingCity">City*</Label>
                        <Input
                          id="billingCity"
                          type="text"
                          placeholder="Rochester"
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingState">State*</Label>
                        <Input
                          id="billingState"
                          type="text"
                          placeholder="NY"
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingZip">ZIP Code*</Label>
                        <Input
                          id="billingZip"
                          type="text"
                          placeholder="14450"
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-brown-primary" />
                  <h3 className="text-brown-dark">Payment Information</h3>
                  <Lock className="w-4 h-4 text-gray-medium ml-auto" />
                </div>

                <div className="grid gap-6">
                  <div>
                    <Label htmlFor="cardNumber">Card Number*</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardName">Name on Card*</Label>
                    <Input
                      id="cardName"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiration Date*</Label>
                      <Input
                        id="expiry"
                        type="text"
                        placeholder="MM / YY"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV*</Label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-primary/10 rounded-lg border border-blue-primary/20 flex items-start gap-3">
                  <Lock className="w-4 h-4 text-blue-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-medium">
                    Your payment information is encrypted and secure. We never store your full credit card details.
                  </p>
                </div>
              </div>

              {/* Age Verification */}
              <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border-2 border-brown-primary/20">
                <div className="flex items-start gap-3">
                  <Checkbox id="ageConfirm" required className="mt-1" />
                  <Label htmlFor="ageConfirm" className="cursor-pointer">
                    I confirm that I am 21 years of age or older and agree to Casa Larga's{' '}
                    <a href="#" className="text-brown-primary hover:underline">Terms & Conditions</a>
                    {' '}and{' '}
                    <a href="#" className="text-brown-primary hover:underline">Privacy Policy</a>
                  </Label>
                </div>
              </div>

              {/* Submit Button - Mobile */}
              <div className="lg:hidden">
                <Button type="submit" className="w-full btn-casa py-4 text-base">
                  Place Order - ${total.toFixed(2)}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[20px] p-6 shadow-sm sticky top-36">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingBag className="w-5 h-5 text-brown-primary" />
                <h3 className="text-brown-dark">Order Summary</h3>
              </div>

              {/* Cart Items */}
              <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-gray-light">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0 bg-cream rounded-lg p-2 flex items-center justify-center relative">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                      />
                      <span className="absolute -top-2 -right-2 bg-brown-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <h4 className="text-sm text-gray-dark">Casa Larga {item.name}</h4>
                      <span className="text-xs text-gray-medium">{item.category}</span>
                      <span className="text-sm text-brown-primary">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
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

              {/* Submit Button - Desktop */}
              <div className="hidden lg:block">
                <Button 
                  type="submit" 
                  className="w-full btn-casa py-4 text-base"
                  onClick={handleSubmitOrder}
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
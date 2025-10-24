import { Image, Eye, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CustomLabelCTA() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 flex flex-col gap-4">
          <div className="kicker text-brown-primary">Make It Personal</div>
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-gray-medium max-w-2xl mx-auto">
            Create personalized wine labels for weddings, corporate events, special occasions, 
            or just to make your favorite bottle uniquely yours.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 md:mb-16">
          {/* Step 1 */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-brown-light/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex-1 flex flex-col items-center text-center gap-6">
              <div className="w-24 h-24 bg-brown-primary/10 rounded-full flex items-center justify-center relative flex-shrink-0">
                <Image className="h-12 w-12 text-brown-primary" strokeWidth={1.5} />
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-brown-primary text-white rounded-full flex items-center justify-center text-sm">1</span>
              </div>
              <h3 className="text-brown-dark tracking-wide uppercase text-sm">Choose a Label</h3>
              <p className="text-sm text-gray-medium leading-relaxed">
                Select from one of our easy to use templates or upload your own photo to begin
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-brown-light/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex-1 flex flex-col items-center text-center gap-6">
              <div className="w-24 h-24 bg-brown-primary/10 rounded-full flex items-center justify-center relative flex-shrink-0">
                <Eye className="h-12 w-12 text-brown-primary" strokeWidth={1.5} />
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-brown-primary text-white rounded-full flex items-center justify-center text-sm">2</span>
              </div>
              <h3 className="text-brown-dark tracking-wide uppercase text-sm">Preview & Save</h3>
              <p className="text-sm text-gray-medium leading-relaxed">
                Review your label and SAVE it in the program
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-brown-light/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex-1 flex flex-col items-center text-center gap-6">
              <div className="w-24 h-24 bg-brown-primary/10 rounded-full flex items-center justify-center relative flex-shrink-0">
                <ShoppingBag className="h-12 w-12 text-brown-primary" strokeWidth={1.5} />
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-brown-primary text-white rounded-full flex items-center justify-center text-sm">3</span>
              </div>
              <h3 className="text-brown-dark tracking-wide uppercase text-sm">Select Wine & Checkout</h3>
              <p className="text-sm text-gray-medium leading-relaxed">
                Select your wine from our Red, White or Blush Blends
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button className="btn-casa text-base md:text-lg px-8 py-4">
            Start Designing
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white text-base md:text-lg px-8 py-4 bg-white transition-colors duration-300"
          >
            View Examples
          </Button>
        </div>

        {/* Pricing Info */}
        <div className="bg-white p-6 md:p-8 rounded-2xl max-w-2xl mx-auto shadow-sm border border-brown-light/20">
          <div className="text-center flex flex-col gap-2">
            <h4 className="text-brown-dark">Starting at just $4.99 per label</h4>
            <p className="text-sm text-gray-medium">
              Volume discounts available. Minimum order of 12 bottles. Professional printing on premium paper.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
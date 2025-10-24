import { ChevronDown } from 'lucide-react';
import heroImage from 'figma:asset/2c60085256b8928431e38638aad5af431c29dc30.png';

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-start overflow-hidden pt-56 pb-12 md:pt-64 md:pb-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 mx-auto">
        <div className="max-w-2xl py-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Buy More. Save More.
          </h2>
          <p className="text-base md:text-lg text-white/90 leading-relaxed">
            Whether you're stocking up for the season or sharing your favorites with friends, every bottle brings you closer to savings.
            Get $5 off any 6 bottles and $15 off every case (12 bottles), mix and match your favorite Casa Larga wines.
          </p>
        </div>
      </div>
    </section>
  );
}
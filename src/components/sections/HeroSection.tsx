import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center text-foreground overflow-hidden">
      <div className="parallax-bg absolute inset-0 z-0 opacity-40 animated-gradient"></div>
      <div className="parallax-layer layer-1 absolute inset-0 z-10 hero-gradient-overlay"></div>
      {/* data-ai-hint: abstract geometric particles */}
      <div 
        className="parallax-layer layer-2 absolute inset-0 z-5 opacity-20" 
        style={{ 
          backgroundImage: `url('https://picsum.photos/seed/heroabstract/1920/1080')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
        data-ai-hint="abstract geometric"
      ></div>

      <div className="relative z-20 p-6 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-foreground">
          A Symphony of Elegance, Comfort & Freedom
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Experience electronic music amidst the majesty of nature, where the environment is the canvas for a unique event.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 px-8 rounded-full text-lg">
          <Link href="#tickets">Get Your Tickets</Link>
        </Button>
        <ArrowDown className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-8 h-8 text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
}

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MobileAdSection() {
  return (
    <section id="mobile-ad" className="md:hidden p-4 bg-gradient-to-br from-primary via-secondary to-background">
      <div className="max-w-sm mx-auto text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">READY TO DANCE?</h2>
        <p className="text-secondary-foreground mb-6">Limited tickets available. Don't miss out on the electronic music experience of the year!</p>
        <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
          {/* data-ai-hint: crowd dancing sunset */}
          <Image 
            src="https://picsum.photos/seed/mobiledance/400/300"
            alt="Dancing crowd at sunset"
            fill
            className="object-cover"
            data-ai-hint="crowd dancing sunset"
          />
        </div>
        <div className="flex justify-between items-center mb-4 text-left">
          <div>
            <p className="text-xs text-muted-foreground">DATE</p>
            <p className="text-foreground font-medium">July 15-18 2025</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">LOCATION</p>
            <p className="text-foreground font-medium">Mountain Valley</p>
          </div>
        </div>
        <Button asChild size="lg" className="w-full bg-gradient-to-r from-secondary to-primary text-primary-foreground font-bold">
          <Link href="#tickets">GET TICKETS NOW</Link>
        </Button>
      </div>
    </section>
  );
}

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface MerchItem {
  imageSrc: string;
  imageAlt: string;
  title: string;
  price: string;
  dataAiHint?: string;
}

export default function MerchCard({ item }: { item: MerchItem }) {
  return (
    <Card className="bg-card/30 backdrop-blur-md shadow-lg text-center merch-card-hover">
      <CardHeader className="p-0">
        <div className="aspect-square relative w-full rounded-t-lg overflow-hidden">
           {/* data-ai-hint provided dynamically */}
          <Image 
            src={item.imageSrc} 
            alt={item.imageAlt}
            fill
            className="object-cover"
            data-ai-hint={item.dataAiHint || "product fashion"}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <CardTitle className="text-xl font-semibold text-foreground">{item.title}</CardTitle>
        <p className="text-muted-foreground mt-1">{item.price}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

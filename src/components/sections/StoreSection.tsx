import MerchCard from '@/components/ui/MerchCard';

const merchItems = [
  { 
    imageSrc: "https://picsum.photos/seed/tshirt/400/400", 
    imageAlt: "Ataxia T-Shirt", 
    title: "ATAXIA Classic Tee", 
    price: "$30.00",
    dataAiHint: "minimalist t-shirt"
  },
  { 
    imageSrc: "https://picsum.photos/seed/hoodie/400/400", 
    imageAlt: "Ataxia Hoodie", 
    title: "ATAXIA Signature Hoodie", 
    price: "$65.00",
    dataAiHint: "stylish hoodie"
  },
  { 
    imageSrc: "https://picsum.photos/seed/cap/400/400", 
    imageAlt: "Ataxia Cap", 
    title: "ATAXIA Logo Cap", 
    price: "$25.00",
    dataAiHint: "baseball cap"
  },
];

export default function StoreSection() {
  return (
    <section id="store" className="py-20 px-6 bg-background/70 backdrop-blur-sm section-fade-in">
      <div className="container mx-auto">
        <h2>ATAXIA Merch</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Wear the vibe. Limited edition drops and classic designs available.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {merchItems.map((item, index) => (
            <MerchCard key={index} item={item} />
          ))}
        </div>
        <p className="text-center mt-12 text-muted-foreground/70">More items coming soon...</p>
      </div>
    </section>
  );
}

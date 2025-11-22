"use client";

import { useState } from "react";
import MerchCard from "@/components/ui/MerchCard";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Product {
  id: string;
  title: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  category: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "ATAXIA Logo Tee",
    price: 35,
    imageSrc: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Black t-shirt with white ATAXIA logo",
    category: "Apparel"
  },
  {
    id: "2",
    title: "Festival Hoodie",
    price: 65,
    imageSrc: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Oversized black hoodie",
    category: "Apparel"
  },
  {
    id: "3",
    title: "Rave Bucket Hat",
    price: 25,
    imageSrc: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Patterned bucket hat",
    category: "Accessories"
  },
  {
    id: "4",
    title: "Techno Tote Bag",
    price: 20,
    imageSrc: "https://images.unsplash.com/photo-1597484662317-c931389b2d58?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Canvas tote bag",
    category: "Accessories"
  },
  {
    id: "5",
    title: "Limited Edition Vinyl",
    price: 40,
    imageSrc: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Vinyl record",
    category: "Music"
  },
  {
    id: "6",
    title: "Water Bottle",
    price: 15,
    imageSrc: "https://images.unsplash.com/photo-1602143407151-011141920039?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Metal water bottle",
    category: "Accessories"
  }
];

export default function StorePage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Merch Store</h1>
          <p className="text-muted-foreground mt-2">Official ATAXIA Collection</p>
        </div>

        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Your Cart ({cart.length})</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex-1 overflow-hidden flex flex-col h-[calc(100vh-200px)]">
              <ScrollArea className="flex-1">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded overflow-hidden relative bg-muted">
                             <img src={item.imageSrc} alt={item.imageAlt} className="object-cover w-full h-full" />
                           </div>
                           <div>
                             <p className="font-medium">{item.title}</p>
                             <p className="text-sm text-muted-foreground">${item.price}</p>
                           </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              <div className="mt-auto pt-6">
                <Separator className="mb-4" />
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Checkout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="relative group h-full">
            <MerchCard
              item={{
                title: product.title,
                price: `$${product.price}`,
                imageSrc: product.imageSrc,
                imageAlt: product.imageAlt
              }}
              onAddToCart={() => addToCart(product)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

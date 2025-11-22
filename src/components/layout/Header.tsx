"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Music2, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'The Experience' },
  { href: '/#community', label: 'Community' },
  { href: '/store', label: 'Store' },
  { href: '/playlist-generator', label: 'AI Playlist' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 py-4 border-b border-border">
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-foreground hover:text-primary transition duration-300 flex items-center">
          <Music2 className="mr-2 h-7 w-7 text-accent" />
          ATAXIA
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground transition duration-300">
              {link.label}
            </Link>
          ))}

          {user ? (
             <div className="flex items-center gap-4">
                <Link href="/profile" className="text-sm font-medium hover:text-primary">
                   Profile
                </Link>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Logout
                </Button>
             </div>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Login</Link>
            </Button>
          )}

          <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/#tickets">Get Tickets</Link>
          </Button>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button could be added here */}
        </div>
      </nav>
    </header>
  );
}

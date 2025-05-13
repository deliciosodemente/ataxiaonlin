import Link from 'next/link';
import { Instagram, Facebook, Mail } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';

export default function Footer() {
  return (
    <footer id="contact" className="py-16 px-6 bg-background border-t border-border section-fade-in">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl mb-4 text-left text-foreground">Connect with ATAXIA</h2>
            <p className="text-muted-foreground mb-6 text-left">Stay updated on future events and news. Follow our journey.</p>
            <div className="flex justify-start space-x-6">
              <Link href="#" className="text-muted-foreground hover:text-accent transition duration-300" aria-label="Instagram">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition duration-300" aria-label="Facebook">
                <Facebook size={24} />
              </Link>
              <Link href="mailto:info@ataxia.com" className="text-muted-foreground hover:text-accent transition duration-300" aria-label="Email">
                <Mail size={24} />
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-2xl mb-4 text-left text-foreground">Collaborate & Suggest</h2>
            <p className="text-muted-foreground mb-6 text-left">Have an idea, want to collaborate, or provide feedback? Let us know!</p>
            <ContactForm />
          </div>
        </div>

        <div id="tickets" className="pt-16 text-center">
          <h2 className="text-2xl text-foreground">Tickets Coming Soon</h2>
          <p className="text-muted-foreground">Sign up for our newsletter via the contact form to be notified!</p>
        </div>

        <p className="text-muted-foreground mt-16 text-sm border-t border-border pt-8 text-center">&copy; {new Date().getFullYear()} ATAXIA Collective. All rights reserved.</p>
      </div>
    </footer>
  );
}

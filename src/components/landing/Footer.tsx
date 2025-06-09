import Link from 'next/link';
import { Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-card py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3 items-start">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-primary">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
              </svg>
              <span className="font-bold text-2xl font-headline text-foreground">EventLink</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Simplifying event invitations for everyone.
            </p>
          </div>
          
          <div className="grid gap-2">
            <h3 className="font-semibold text-foreground mb-2">Quick Links</h3>
            <Link href="#features" className="text-sm text-muted-foreground hover:text-accent transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-accent transition-colors">Pricing</Link>
            <Link href="#demos" className="text-sm text-muted-foreground hover:text-accent transition-colors">Demos</Link>
            <Link href="#contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">Contact Us</Link>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Connect With Us</h3>
            <div className="flex space-x-3 mb-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent" asChild>
                <Link href="https://x.com/eventlink" target="_blank" aria-label="EventLink on X">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent" asChild>
                <Link href="https://linkedin.com/company/eventlink" target="_blank" aria-label="EventLink on LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
               <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent" asChild>
                <Link href="mailto:contact@eventlink.com" aria-label="Contact EventLink via Email">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <p id="contact" className="text-sm text-muted-foreground">
              Contact: <a href="mailto:contact@eventlink.com" className="hover:text-accent underline">contact@eventlink.com</a>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EventLink. All rights reserved. Built for the American audience.
        </div>
      </div>
    </footer>
  );
}

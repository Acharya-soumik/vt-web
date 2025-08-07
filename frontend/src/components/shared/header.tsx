"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Menu, ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useFormContext } from "@/contexts/form-context";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openForm } = useFormContext();

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleOpenForm = () => {
    openForm();
    handleMobileMenuClose();
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 dark:bg-white dark:p-2 dark:rounded-lg dark:shadow-md">
          <Image src="/logo.png" alt="Vakil Tech" width={150} height={150} />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/about"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link 
            href="/pricing"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link 
            href="/contact"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                Products
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/send-a-legal-notice" className="cursor-pointer">
                  Legal Notice
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/consultation" className="cursor-pointer">
                  Consultation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/document-drafting" className="cursor-pointer">
                  Document Drafting
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/corporate-retainer" className="cursor-pointer">
                  Corporate Retainer
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={() => openForm()} size="sm">
            Get Started
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <div className="flex flex-col space-y-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Menu</h2>
                {/* <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMobileMenuClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close menu</span>
                </Button> */}
              </div>
              
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="text-left text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent"
                  onClick={handleMobileMenuClose}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-left text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent"
                  onClick={handleMobileMenuClose}
                >
                  About
                </Link>
                <Link
                  href="/pricing"
                  className="text-left text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent"
                  onClick={handleMobileMenuClose}
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  className="text-left text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent"
                  onClick={handleMobileMenuClose}
                >
                  Contact
                </Link>
                
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground px-3 py-1">
                    Services
                  </div>
                  <Link
                    href="/send-a-legal-notice"
                    className="block text-left text-muted-foreground hover:text-primary transition-colors py-2 px-6 rounded-md hover:bg-accent"
                    onClick={handleMobileMenuClose}
                  >
                    Legal Notice
                  </Link>
                  <Link
                    href="/consultation"
                    className="block text-left text-muted-foreground hover:text-primary transition-colors py-2 px-6 rounded-md hover:bg-accent"
                    onClick={handleMobileMenuClose}
                  >
                    Consultation
                  </Link>
                  <Link
                    href="/document-drafting"
                    className="block text-left text-muted-foreground hover:text-primary transition-colors py-2 px-6 rounded-md hover:bg-accent"
                    onClick={handleMobileMenuClose}
                  >
                    Document Drafting
                  </Link>
                  <Link
                    href="/corporate-retainer"
                    className="block text-left text-muted-foreground hover:text-primary transition-colors py-2 px-6 rounded-md hover:bg-accent"
                    onClick={handleMobileMenuClose}
                  >
                    Corporate Retainer
                  </Link>
                </div>
                
                <div className="pt-2">
                  <Button onClick={handleOpenForm} className="w-full">
                    Get Started
                  </Button>
                </div>
              </nav>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
} 
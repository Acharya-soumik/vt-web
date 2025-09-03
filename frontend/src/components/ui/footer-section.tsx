"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Facebook, Instagram, Linkedin, Moon, Sun, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
function Footerdemo() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <footer className="relative border-t bg-secondary text-secondary-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Vakil Tech"
                width={120}
                height={120}
                className="dark: dark:p-2 dark:rounded-lg dark:shadow-md"
              />
            </div>
            <p className="mb-6 text-muted-foreground">
              <b>vakiltech</b> connects legal professionals and clients, serving
              as a service aggregator to foster communication. We are not agents
              for lawyers; our role is to facilitate connections between lawyers
              and clients. You can{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => router.push("/terms-of-use")}
              >
                {" "}
                read more here.
              </span>
            </p>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal Services</h3>
            <nav className="space-y-2 text-sm">
              <Link
                href="/consultation"
                className="block transition-colors hover:text-primary"
              >
                Legal Consultation
              </Link>
              <Link
                href="/document-drafting"
                className="block transition-colors hover:text-primary"
              >
                Document Drafting
              </Link>
              <Link
                href="/corporate-retainer"
                className="block transition-colors hover:text-primary"
              >
                Corporate Retainer
              </Link>
              <Link
                href="/send-a-legal-notice"
                className="block transition-colors hover:text-primary"
              >
                Legal Notice
              </Link>
              <Link
                href="/contact"
                className="block transition-colors hover:text-primary"
              >
                Contact Us
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>Phone: +91 7047683995</p>
              <p>Email: help@vakiltech.in</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() =>
                        window.open("https://facebook.com/vakiltech", "_blank")
                      }
                    >
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() =>
                        (window.location.href = "mailto:contact@vakiltech.in")
                      }
                    >
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Email us at help@vakiltech.in</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() =>
                        window.open(
                          "https://www.instagram.com/vakil.tech/",
                          "_blank"
                        )
                      }
                    >
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() =>
                        window.open(
                          "https://www.linkedin.com/company/vakil-tech/",
                          "_blank"
                        )
                      }
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 vakiltech All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="transition-colors hover:text-primary"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/terms-of-use"
              className="transition-colors hover:text-primary"
            >
              Terms of Use
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { Footerdemo };

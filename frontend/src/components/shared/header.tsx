"use client";

import { useEffect, useState, type MouseEventHandler } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Menu, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useFormContext } from "@/contexts/form-context";
import { AlertCircle } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPaymentBanner, setShowPaymentBanner] = useState(false);
  const { openForm, paymentStatus, processPayment, isProcessingPayment } =
    useFormContext();

  const {
    logNavigationClick,
    logCTAClick,
    logServiceViewed,
    logPaymentBannerDismissed,
  } = useAnalytics();

  const BANNER_DISMISS_KEY = "vt-payment-banner-dismiss";
  const DISMISS_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleOpenForm = () => {
    logCTAClick(
      "header_cta",
      "Get Started",
      typeof window !== "undefined" ? window.location.pathname : undefined
    );
    openForm();
    handleMobileMenuClose();
  };

  // Track service page views when navigation occurs
  const handleNavigationClick = (
    elementType: string,
    elementText: string,
    destinationUrl: string
  ) => {
    logNavigationClick(elementType, elementText, destinationUrl);

    // Track service views for specific service pages
    if (destinationUrl.includes("/send-a-legal-notice")) {
      logServiceViewed("legal-notice", destinationUrl);
    } else if (destinationUrl.includes("/consultation")) {
      logServiceViewed("consultation", destinationUrl);
    } else if (destinationUrl.includes("/document-drafting")) {
      logServiceViewed("document-drafting", destinationUrl);
    } else if (destinationUrl.includes("/corporate-retainer")) {
      logServiceViewed("corporate-retainer", destinationUrl);
    }
  };

  // Decide whether to show payment banner, honoring a two-dismiss, 12-hour TTL session
  useEffect(() => {
    if (!(paymentStatus === "pending" || paymentStatus === "failed")) {
      setShowPaymentBanner(false);
      return;
    }

    try {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem(BANNER_DISMISS_KEY)
          : null;
      if (!raw) {
        setShowPaymentBanner(true);
        return;
      }
      const stored: { count?: number; firstAt?: string } = JSON.parse(raw);
      const count = Number(stored?.count || 0);
      const firstAt = stored?.firstAt
        ? new Date(stored.firstAt).getTime()
        : NaN;
      const now = Date.now();
      const expired =
        !Number.isFinite(firstAt) || now - firstAt > DISMISS_TTL_MS;
      if (expired) {
        try {
          localStorage.removeItem(BANNER_DISMISS_KEY);
        } catch {}
        setShowPaymentBanner(true);
        return;
      }
      if (count >= 2) {
        setShowPaymentBanner(false);
      } else {
        setShowPaymentBanner(true);
      }
    } catch {
      setShowPaymentBanner(true);
    }
  }, [paymentStatus]);

  const handleBannerClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      logPaymentBannerDismissed(
        paymentStatus === "failed" ? "failed_state" : "pending_state"
      );
    } catch {}
    try {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem(BANNER_DISMISS_KEY)
          : null;
      const nowIso = new Date().toISOString();
      if (!raw) {
        localStorage.setItem(
          BANNER_DISMISS_KEY,
          JSON.stringify({ count: 1, firstAt: nowIso })
        );
      } else {
        const stored: { count?: number; firstAt?: string } = JSON.parse(raw);
        const firstAtTime = stored?.firstAt
          ? new Date(stored.firstAt).getTime()
          : NaN;
        const expired =
          !Number.isFinite(firstAtTime) ||
          Date.now() - firstAtTime > DISMISS_TTL_MS;
        if (expired) {
          localStorage.setItem(
            BANNER_DISMISS_KEY,
            JSON.stringify({ count: 1, firstAt: nowIso })
          );
        } else {
          const nextCount = Math.min(2, Number(stored?.count || 0) + 1);
          localStorage.setItem(
            BANNER_DISMISS_KEY,
            JSON.stringify({
              count: nextCount,
              firstAt: stored?.firstAt || nowIso,
            })
          );
        }
      }
    } catch {}
    setShowPaymentBanner(false);
  };

  const handleBannerActivate = () => {
    if (!isProcessingPayment) {
      logCTAClick(
        "payment_banner",
        "Complete Payment",
        typeof window !== "undefined" ? window.location.pathname : undefined
      );
      processPayment();
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Top bar: logo on the left, nav on desktop, hamburger on mobile (right) */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 dark: dark:p-2 dark:rounded-lg dark:shadow-md"
            onClick={() =>
              handleNavigationClick("logo", "Vakil Tech Logo", "/")
            }
          >
            <Image src="/logo.png" alt="Vakil Tech" width={150} height={150} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 justify-end">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() => handleNavigationClick("nav_link", "Home", "/")}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() =>
                handleNavigationClick("nav_link", "About", "/about")
              }
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() =>
                handleNavigationClick("nav_link", "Pricing", "/pricing")
              }
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() =>
                handleNavigationClick("nav_link", "Contact", "/contact")
              }
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
                  <Link
                    href="/send-a-legal-notice"
                    className="cursor-pointer"
                    onClick={() =>
                      handleNavigationClick(
                        "dropdown_link",
                        "Legal Notice",
                        "/send-a-legal-notice"
                      )
                    }
                  >
                    Legal Notice
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/consultation"
                    className="cursor-pointer"
                    onClick={() =>
                      handleNavigationClick(
                        "dropdown_link",
                        "Consultation",
                        "/consultation"
                      )
                    }
                  >
                    Consultation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/document-drafting"
                    className="cursor-pointer"
                    onClick={() =>
                      handleNavigationClick(
                        "dropdown_link",
                        "Document Drafting",
                        "/document-drafting"
                      )
                    }
                  >
                    Document Drafting
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/corporate-retainer"
                    className="cursor-pointer"
                    onClick={() =>
                      handleNavigationClick(
                        "dropdown_link",
                        "Corporate Retainer",
                        "/corporate-retainer"
                      )
                    }
                  >
                    Corporate Retainer
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={handleOpenForm} size="sm">
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button (right aligned) */}
          <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={() =>
                  logNavigationClick("mobile_menu_button", "Menu", "#")
                }
              >
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
                    onClick={() => {
                      handleMobileMenuClose();
                      handleNavigationClick("mobile_nav_link", "Home", "/");
                    }}
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-left text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent"
                    onClick={() => {
                      handleMobileMenuClose();
                      handleNavigationClick(
                        "mobile_nav_link",
                        "About",
                        "/about"
                      );
                    }}
                  >
                    About
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-left text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent"
                    onClick={() => {
                      handleMobileMenuClose();
                      handleNavigationClick(
                        "mobile_nav_link",
                        "Pricing",
                        "/pricing"
                      );
                    }}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/contact"
                    className="text-left text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent"
                    onClick={() => {
                      handleMobileMenuClose();
                      handleNavigationClick(
                        "mobile_nav_link",
                        "Contact",
                        "/contact"
                      );
                    }}
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
                      onClick={() => {
                        handleMobileMenuClose();
                        handleNavigationClick(
                          "mobile_service_link",
                          "Legal Notice",
                          "/send-a-legal-notice"
                        );
                      }}
                    >
                      Legal Notice
                    </Link>
                    <Link
                      href="/consultation"
                      className="block text-left text-muted-foreground hover:text-primary transition-colors py-2 px-6 rounded-md hover:bg-accent"
                      onClick={() => {
                        handleMobileMenuClose();
                        handleNavigationClick(
                          "mobile_service_link",
                          "Consultation",
                          "/consultation"
                        );
                      }}
                    >
                      Consultation
                    </Link>
                    <Link
                      href="/document-drafting"
                      className="block text-left text-muted-foreground hover:text-primary transition-colors py-2 px-6 rounded-md hover:bg-accent"
                      onClick={() => {
                        handleMobileMenuClose();
                        handleNavigationClick(
                          "mobile_service_link",
                          "Document Drafting",
                          "/document-drafting"
                        );
                      }}
                    >
                      Document Drafting
                    </Link>
                    <Link
                      href="/corporate-retainer"
                      className="block text-left text-muted-foreground hover:text-primary transition-colors py-2 px-6 rounded-md hover:bg-accent"
                      onClick={() => {
                        handleMobileMenuClose();
                        handleNavigationClick(
                          "mobile_service_link",
                          "Corporate Retainer",
                          "/corporate-retainer"
                        );
                      }}
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

        {/* Attention-grabbing payment reminder banner (full width below top bar) */}
        {showPaymentBanner && (
          <div className="mt-2">
            <div
              role="button"
              tabIndex={0}
              onClick={handleBannerActivate}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleBannerActivate();
              }}
              aria-label="Payment pending, tap to complete"
              aria-disabled={isProcessingPayment}
              className={
                "relative w-full flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white shadow-sm ring-1 ring-inset ring-black/10 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-600 " +
                (isProcessingPayment
                  ? "opacity-80 cursor-not-allowed"
                  : "cursor-pointer animate-pulse")
              }
            >
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">
                {isProcessingPayment
                  ? "Opening secure payment..."
                  : paymentStatus === "failed"
                  ? "Payment failed. Tap to retry"
                  : "Payment pending. Tap to complete now"}
              </span>
              <button
                onClick={handleBannerClose}
                aria-label="Dismiss payment reminder"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded hover:bg-black/10 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

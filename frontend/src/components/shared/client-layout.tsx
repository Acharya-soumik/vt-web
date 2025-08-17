"use client";

import { Header } from "@/components/shared/header";
import { Footer } from "@/components/ui/footer";
import { FormProvider, useFormContext } from "@/contexts/form-context";
import { LeadFormModal } from "@/components/features/lead-form";
import { useAnalytics } from "@/hooks/use-analytics";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { Toaster } from "react-hot-toast";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const { logEnhancedPageView, logScrollDepth, logTimeOnPage, getPageType } =
    useAnalytics();
  const pathname = usePathname();
  const pageStartTime = useRef<number>(Date.now());
  const scrollDepthTracked = useRef<Set<number>>(new Set());

  // Track page view with enhanced parameters
  useEffect(() => {
    const pageType = getPageType(pathname);
    const pageTitle = document.title || "Vakil Tech";

    logEnhancedPageView(pathname, pageTitle, {
      page_type: pageType,
      referrer: typeof window !== "undefined" ? document.referrer : "",
      user_agent: typeof window !== "undefined" ? navigator.userAgent : "",
    });

    // Reset page tracking
    pageStartTime.current = Date.now();
    scrollDepthTracked.current.clear();
  }, [pathname, logEnhancedPageView, getPageType]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);

      // Track at 25%, 50%, 75%, and 100% scroll depths
      const trackingPoints = [25, 50, 75, 100];

      trackingPoints.forEach((point) => {
        if (
          scrollPercentage >= point &&
          !scrollDepthTracked.current.has(point)
        ) {
          scrollDepthTracked.current.add(point);
          logScrollDepth(point, pathname);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, logScrollDepth]);

  // Track time on page
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - pageStartTime.current) / 1000);
      if (timeSpent > 0) {
        logTimeOnPage(timeSpent, pathname);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const timeSpent = Math.round(
          (Date.now() - pageStartTime.current) / 1000
        );
        if (timeSpent > 0) {
          logTimeOnPage(timeSpent, pathname);
        }
      } else if (document.visibilityState === "visible") {
        pageStartTime.current = Date.now();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname, logTimeOnPage]);

  return (
    <FormProvider>
      <DeepLinkLeadFormOpener />
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="min-h-screen bg-background">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Lead Form Modal */}
      <LeadFormModal />

      {/* Toast Notifications */}
      <Toaster />
    </FormProvider>
  );
}

function DeepLinkLeadFormOpener() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { openForm, isFormOpen } = useFormContext();
  const handledRef = useRef<string | null>(null);

  const requestedService = useMemo(() => {
    const rawType = (searchParams.get("type") || "").toLowerCase().trim();
    if (!rawType) return null;

    // Normalize common aliases/typos to our canonical service ids
    const map: Record<
      string,
      | "legal-notice"
      | "consultation"
      | "document-drafting"
      | "corporate-retainer"
    > = {
      legalnotice: "legal-notice",
      "legal-notice": "legal-notice",
      legalnotivce: "legal-notice",
      "legal-notivce": "legal-notice",
      notice: "legal-notice",
      consultation: "consultation",
      consult: "consultation",
      document: "document-drafting",
      "document-drafting": "document-drafting",
      drafting: "document-drafting",
      retainer: "corporate-retainer",
      "corporate-retainer": "corporate-retainer",
    };

    return map[rawType] ?? null;
  }, [searchParams]);

  useEffect(() => {
    const key = `${pathname}?${searchParams.toString()}`;
    // Avoid reopening on re-renders if we've already handled this URL
    if (handledRef.current === key) return;

    if (requestedService) {
      // Open the form with service preselected
      openForm(requestedService);
      handledRef.current = key;
    }
  }, [pathname, searchParams, requestedService, openForm, isFormOpen]);

  return null;
}

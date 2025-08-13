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
  const { logPageView } = useAnalytics();
  const pathname = usePathname();

  useEffect(() => {
    logPageView(pathname);
  }, [pathname, logPageView]);

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

"use client";

import { Header } from "@/components/shared/header";
import { Footer } from "@/components/ui/footer";
import { FormProvider } from "@/contexts/form-context";
import { LeadFormModal } from "@/components/features/lead-form";
import { useAnalytics } from "@/hooks/use-analytics";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
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

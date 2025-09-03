import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { LeadFormData } from "@/types/lead-form";
import { getPaymentConfig, formatAmount } from "@/lib/payment-config";
import { useAnalytics } from "@/hooks/use-analytics";
import { useEffect } from "react";
import { useFormContext } from "@/contexts/form-context";
import { PayNowIllustration } from "@/components/ui/pay-now-illustration";

interface WhatsNextStepProps {
  formData: Partial<LeadFormData>;
  leadId?: string;
  submissionSuccess?: boolean;
}

export const WhatsNextStep = ({ formData, leadId }: WhatsNextStepProps) => {
  const { logEvent } = useAnalytics();
  const { paymentStatus } = useFormContext();

  useEffect(() => {
    if (formData && (formData.submissionSuccess || formData.paymentSuccess)) {
      logEvent("lead_form_success", {
        lead_id: leadId,
        payment_success: !!formData.paymentSuccess,
        payment_status: paymentStatus,
      });
    }
  }, [formData, leadId, logEvent, paymentStatus]);

  // Get payment amount for the service
  const getPaymentAmount = () => {
    const config = getPaymentConfig(formData.service || "consultation");
    return config ? formatAmount(config.amount) : "₹400";
  };

  // Render different content based on payment status
  const renderPaymentStatusContent = () => {
    switch (paymentStatus) {
      case "success":
        return (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10] }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mb-4 flex flex-col items-center"
            >
              <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-green-500 mb-3" />
              <PayNowIllustration width={120} height={80} className="mb-3" />
            </motion.div>
            <Card className="w-full shadow-lg border-green-200">
              <CardHeader className="pb-2 text-center">
                <CardTitle className="text-base sm:text-lg flex items-center justify-center gap-2 text-green-700">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                  Payment Successful!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-center">
                <p className="text-sm sm:text-base font-medium">
                  Thank you, {formData.name}!
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Payment of{" "}
                  <span className="font-semibold text-green-600">
                    {getPaymentAmount()}
                  </span>{" "}
                  processed!
                  <br />
                  <strong>ID:</strong> {formData.customId || leadId}
                  <br />
                  <br />
                  🎉 <strong>Priority support</strong> activated!
                  <br />
                  Expert will contact you within <strong>2-4 hours</strong>.
                </p>
                <div className="mt-3 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-xs sm:text-sm text-green-700">
                    <strong>Next Steps:</strong>
                    <br />
                    • Confirmation SMS/WhatsApp
                    <br />
                    • Legal team review
                    <br />
                    • Expert contact (2-4 hours)
                    <br />• Priority case handling
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        );

      case "failed":
        return (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mb-4 flex flex-col items-center"
            >
              <XCircle className="w-12 h-12 sm:w-14 sm:h-14 text-red-500 mb-3" />
              <PayNowIllustration width={120} height={80} className="mb-3" />
            </motion.div>
            <Card className="w-full shadow-lg border-red-200">
              <CardHeader className="pb-2 text-center">
                <CardTitle className="text-base sm:text-lg flex items-center justify-center gap-2 text-red-700">
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  Payment Failed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-center">
                <p className="text-sm sm:text-base font-medium">
                  Don&apos;t worry, {formData.name}!
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Ticket submitted! (ID: {formData.customId || leadId})<br />
                  Payment not completed.
                  <br />
                  <br />
                  Try payment again for priority support.
                </p>
                <div className="mt-3 p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-xs sm:text-sm text-yellow-700">
                    <strong>Priority Benefits:</strong>
                    <br />
                    • Faster response (2-4 vs 24-48 hours)
                    <br />
                    • Top priority handling
                    <br />
                    • Dedicated expert
                    <br />• Better outcomes
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        );

      case "pending":
        return (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mb-4 flex flex-col items-center"
            >
              <AlertCircle className="w-12 h-12 sm:w-14 sm:h-14 text-blue-500 mb-3" />
              <PayNowIllustration width={120} height={80} className="mb-3" />
            </motion.div>
            <Card className="w-full shadow-lg border-blue-200">
              <CardHeader className="pb-2 text-center">
                <CardTitle className="text-base sm:text-lg flex items-center justify-center gap-2 text-blue-700">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                  Processing Payment...
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-center">
                <p className="text-sm sm:text-base font-medium">
                  Please wait, {formData.name}!
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Processing payment of{" "}
                  <span className="font-semibold text-blue-600">
                    {getPaymentAmount()}
                  </span>
                  .<br />
                  Please don&apos;t close this window.
                </p>
                <div className="mt-3 p-2 sm:p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-xs sm:text-sm text-blue-700">
                    <strong>Processing...</strong>
                    <br />
                    • Verifying payment
                    <br />
                    • Securing priority status
                    <br />• Setting up support
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        );

      default:
        // Default success state (no payment attempted)
        return (
          <>
            <motion.div className="flex flex-col items-center">
              <PayNowIllustration width={120} height={80} className="mb-0" />
            </motion.div>
            <Card className="w-full shadow-lg">
              <CardHeader className="pb-2 text-center">
                <CardTitle className="text-base sm:text-lg flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                  Happy to help!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  We have received your request. Please pay the advance amount
                  of{" "}
                  <span className="font-semibold text-primary">
                    {getPaymentAmount()}
                  </span>{" "}
                  for priority support.
                </p>
                <p className="text-sm sm:text-base font-medium">
                  Thank you, {formData.name}, for choosing vakiltech!
                </p>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center min-h-[250px] sm:min-h-[300px] w-full max-w-sm mx-auto p-3"
    >
      {renderPaymentStatusContent()}
    </motion.div>
  );
};

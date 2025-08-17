"use client";

import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MultiStepForm } from "./multi-step-form";
import { useFormContext } from "@/contexts/form-context";
import { Loader2, CreditCard, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { getPaymentConfig, formatAmount } from "@/lib/payment-config";
import {
  Dialog as ConfirmDialog,
  DialogContent as ConfirmDialogContent,
  DialogDescription,
  DialogFooter as ConfirmDialogFooter,
  DialogHeader as ConfirmDialogHeader,
  DialogTitle as ConfirmDialogTitle,
} from "@/components/ui/dialog";

export const LeadFormModal = () => {
  const {
    currentStep,
    nextStep,
    prevStep,
    isFormOpen,
    closeForm,
    isSubmitting,
    submitForm,
    submissionError,
    formData,
    processPayment,
    isProcessingPayment,
    paymentStatus,
  } = useFormContext();

  const [isStepValid, setIsStepValid] = useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const [modalZIndex, setModalZIndex] = useState(50);

  // Manage z-index for payment modal compatibility
  useEffect(() => {
    if (isProcessingPayment) {
      // Lower our modal's z-index to allow Razorpay modal to appear above
      setModalZIndex(10);

      // Add a small delay to ensure Razorpay modal loads
      const timer = setTimeout(() => {
        // Force focus to any Razorpay elements that might be present
        const razorpayElements = document.querySelectorAll("[data-razorpay]");
        if (razorpayElements.length > 0) {
          // Ensure Razorpay modal is interactive
          document.body.style.overflow = "hidden";
        }
      }, 100);

      return () => {
        clearTimeout(timer);
        setModalZIndex(50);
        document.body.style.overflow = "";
      };
    } else {
      setModalZIndex(50);
      document.body.style.overflow = "";
    }
  }, [isProcessingPayment]);

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Personal Details";
      case 2:
        return "Service Selection";
      case 3:
        return "Review & Submit";
      case 4:
        if (paymentStatus === "success") {
          return "Payment Successful!";
        } else if (paymentStatus === "failed") {
          return "Payment Failed";
        } else {
          return "What's Next";
        }
      default:
        return "Get Legal Help";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Please provide your basic information to get started";
      case 2:
        return "Choose the legal service you need";
      case 3:
        return "Review your information and submit your ticket";
      case 4:
        if (paymentStatus === "success") {
          return "Your payment has been processed successfully!";
        } else if (paymentStatus === "failed") {
          return "Payment was not completed. You can try again or contact support.";
        } else {
          return "Your ticket is submitted! Next steps below.";
        }
      default:
        return "";
    }
  };

  // Get payment amount for the service
  const getPaymentAmount = () => {
    const config = getPaymentConfig(formData.service || "consultation");
    return config ? formatAmount(config.amount) : "₹400";
  };

  // Handle close attempt with confirmation for step 4
  const handleCloseAttempt = () => {
    // Don't allow closing if payment was successful
    if (paymentStatus === "success") {
      return;
    }

    if (currentStep === 4 && !formData.paymentSuccess) {
      setShowCloseConfirmation(true);
    } else {
      closeForm();
    }
  };

  const handleConfirmClose = () => {
    closeForm();
    setShowCloseConfirmation(false);
  };

  const handleCancelClose = () => {
    setShowCloseConfirmation(false);
  };

  // Handle pay advance
  const handlePayAdvance = () => {
    processPayment();
  };

  // Handle retry payment
  const handleRetryPayment = () => {
    // Reset payment status and try again
    processPayment();
  };

  return (
    <>
      <AnimatePresence>
        {isFormOpen && (
          <Dialog open={isFormOpen} onOpenChange={handleCloseAttempt}>
            <DialogContent
              className="w-[95vw] max-w-4xl h-[90svh] sm:h-[95dvh] max-h-[90svh] sm:max-h-[95dvh] flex flex-col p-0 mx-auto overflow-hidden touch-manipulation form-scroll-container"
              style={{ zIndex: modalZIndex }}
            >
              {/* Fixed Header */}
              <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
                <DialogTitle className="text-lg sm:text-xl font-semibold">
                  {getStepTitle()}
                </DialogTitle>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {getStepDescription()}
                </p>
              </DialogHeader>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-hidden">
                <MultiStepForm setIsStepValid={setIsStepValid} />

                {/* Error Display */}
                {submissionError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{submissionError}</p>
                  </div>
                )}
              </div>

              {/* Fixed Footer */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Step {currentStep} of 4
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    {currentStep > 1 && currentStep < 4 && (
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        size="sm"
                        className="sm:text-base"
                      >
                        Back
                      </Button>
                    )}
                    {currentStep === 3 ? (
                      <Button
                        onClick={submitForm}
                        disabled={isSubmitting}
                        size="sm"
                        className="min-w-[100px] sm:min-w-[120px] sm:text-base"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Ticket"
                        )}
                      </Button>
                    ) : currentStep === 4 &&
                      !formData.paymentSuccess &&
                      paymentStatus !== "success" ? (
                      <Button
                        onClick={
                          paymentStatus === "failed"
                            ? handleRetryPayment
                            : handlePayAdvance
                        }
                        disabled={isProcessingPayment}
                        size="sm"
                        className="min-w-[140px] sm:min-w-[160px] sm:text-base"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        {isProcessingPayment
                          ? "Processing..."
                          : paymentStatus === "failed"
                          ? "Retry Payment"
                          : `Pay ${getPaymentAmount()}`}
                      </Button>
                    ) : currentStep === 4 && paymentStatus === "success" ? (
                      <Button
                        onClick={closeForm}
                        size="sm"
                        className="min-w-[100px] sm:min-w-[120px] sm:text-base bg-green-600 hover:bg-green-700"
                      >
                        Close
                      </Button>
                    ) : currentStep < 3 ? (
                      <Button
                        onClick={nextStep}
                        size="sm"
                        className="min-w-[100px] sm:min-w-[120px] sm:text-base"
                        disabled={!isStepValid}
                      >
                        Continue
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Close Confirmation Dialog */}
      <ConfirmDialog
        open={showCloseConfirmation}
        onOpenChange={setShowCloseConfirmation}
      >
        <ConfirmDialogContent>
          <ConfirmDialogHeader>
            <ConfirmDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Wait! Don&apos;t miss out on priority support
            </ConfirmDialogTitle>
            <DialogDescription className="text-left">
              <p className="mb-3">By closing now, you&apos;ll miss out on:</p>
              <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                <li>
                  <strong>Priority support</strong> - Get faster response times
                </li>
                <li>
                  <strong>Dedicated attention</strong> - Your case gets bumped
                  to the top
                </li>
                <li>
                  <strong>Peace of mind</strong> - Secure your spot in our queue
                </li>
                <li>
                  <strong>Better outcomes</strong> - Early engagement leads to
                  better results
                </li>
              </ul>
              <p className="text-sm">
                Just{" "}
                <span className="font-semibold text-primary">
                  {getPaymentAmount()}
                </span>{" "}
                secures your priority status. Your legal matter deserves the
                best possible start!
              </p>
            </DialogDescription>
          </ConfirmDialogHeader>
          <ConfirmDialogFooter>
            <Button variant="outline" onClick={handleCancelClose}>
              Stay & Pay Advance
            </Button>
            <br />
            <Button onClick={handleConfirmClose} variant="secondary">
              Close Anyway
            </Button>
          </ConfirmDialogFooter>
        </ConfirmDialogContent>
      </ConfirmDialog>
    </>
  );
};

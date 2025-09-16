"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formElementVariants, staggerContainer } from "@/lib/animations";
import { LeadFormData } from "@/types/lead-form";
import { LucideIcon } from "lucide-react";
import {
  Shield,
  CheckCircle,
  CreditCard,
  Lock,
  Info,
  UserCheck,
  Phone,
  FileCheck,
  RefreshCw,
} from "lucide-react";
import { getPaymentConfig, formatAmount } from "@/lib/payment-config";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useFormContext } from "@/contexts/form-context";
import { useAnalytics } from "@/hooks/use-analytics";

interface PaymentStepProps {
  formData: Partial<LeadFormData>;
}

// Get payment config for the selected service
const getServicePrice = (service: string) => {
  const config = getPaymentConfig(service);
  return config ? formatAmount(config.amount) : "";
};

const getServiceName = (service: string) => {
  return service
    ? service.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "";
};

export const PaymentStep = ({ formData }: PaymentStepProps) => {
  const { submissionError, paymentError } = useFormContext();
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  const { logCTAClick } = useAnalytics();

  const service = formData.service || "";
  const name = formData.name || "";
  const servicePrice = getServicePrice(service);
  const serviceName = getServiceName(service);

  // Get service-specific configuration
  const getServiceConfig = (service: string) => {
    switch (service) {
      case "legal-notice":
        return {
          headerTitle: "Secure Payment",
          headerSubtitle: `${serviceName} for ${name}`,
          isAdvancePayment: true,
          totalPrice: "₹1499",
          crossedPrice: "₹1999",
          paymentLabel: "Advance Payment",
          steps: [
            {
              icon: Phone,
              title: "Help Desk Calls You under 30 mins",
              description: "We call to review your case details",
            },
            {
              icon: UserCheck,
              title: "Instant Lawyer Assignment",
              description: "an expert lawyer assigned to based on your case",
            },
            {
              icon: FileCheck,
              title: "Review and approve",
              description:
                "review the drafted notice and approve it to proceed",
            },
          ],
        };
      case "consultation":
        return {
          headerTitle: "Secure a Lawyer with an Advance",
          headerSubtitle: "Pay an advance so we can connect you with a lawyer",
          isAdvancePayment: false,
          totalPrice: null,
          crossedPrice: null,
          paymentLabel: "Full Payment",
          steps: [
            {
              icon: Phone,
              title: "Help Desk Calls You under 30 mins",
              description: "We call to understand your legal requirements",
            },
            {
              icon: UserCheck,
              title: "Expert Lawyer Assignment",
              description: "We match you with the right lawyer for your case",
            },
            {
              icon: FileCheck,
              title: "Consultation Scheduled",
              description: "Direct consultation call arranged with your lawyer",
            },
          ],
        };
      default:
        return {
          headerTitle: "Secure Payment",
          headerSubtitle: `${serviceName} for ${name}`,
          isAdvancePayment: true,
          totalPrice: null,
          crossedPrice: null,
          paymentLabel: "Payment",
          steps: [
            {
              icon: Phone,
              title: "Help Desk Calls You",
              description: "We call to review your requirements",
            },
            {
              icon: UserCheck,
              title: "Expert Assignment",
              description: "Expert assigned based on your needs",
            },
            {
              icon: FileCheck,
              title: "Service Delivery",
              description: "Professional service delivered on time",
            },
          ],
        };
    }
  };

  const config = getServiceConfig(service);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6 px-4 py-2 max-w-md mx-auto"
    >
      {/* Header with Asset */}
      <motion.div
        variants={formElementVariants}
        className="text-center space-y-3"
      >
        <div className="flex justify-center">
          <Image
            src="/pay_now.svg"
            alt="Secure Payment"
            width={80}
            height={50}
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* Compact Service Summary */}
      <motion.div variants={formElementVariants}>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-4 pb-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium text-sm">
                {serviceName}
              </span>
              {config.totalPrice && (
                <div className="text-right">
                  {config.crossedPrice && (
                    <span className="text-xs text-gray-500 line-through mr-1">
                      {config.crossedPrice}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-gray-700">
                    Total: {config.totalPrice}
                  </span>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">
                {config.paymentLabel}
              </span>
              <span className="text-xl font-bold text-primary">
                {servicePrice}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center gap-1 text-gray-600">
                <Lock className="w-3 h-3" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <span>100% refund available</span>
                <Dialog
                  open={isRefundDialogOpen}
                  onOpenChange={setIsRefundDialogOpen}
                >
                  <DialogTrigger asChild>
                    <button
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={() =>
                        logCTAClick(
                          "refund_policy_info",
                          "Refund Policy Info",
                          typeof window !== "undefined"
                            ? window.location.pathname
                            : undefined,
                          formData.service
                        )
                      }
                    >
                      <Info className="w-3 h-3 text-blue-600 cursor-pointer" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        100% Refund Policy
                      </h3>
                      <div className="space-y-3 text-sm text-gray-600">
                        <p>We offer a full refund if:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>
                            You&apos;re not satisfied with our service quality
                          </li>
                          <li>We cannot deliver the service as promised</li>
                          <li>You cancel within 24 hours of payment</li>
                        </ul>
                        <p className="font-medium text-gray-700">
                          No questions asked - your satisfaction is guaranteed.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Prominent What Happens After Payment Section */}
      <motion.div variants={formElementVariants}>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 text-center">
            What happens after you pay?
          </h3>
          <div className="space-y-3">
            {config.steps.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20"
                >
                  <div className="flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Error Messages */}
      {(submissionError || paymentError) && (
        <motion.div variants={formElementVariants}>
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">
              {submissionError || paymentError}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

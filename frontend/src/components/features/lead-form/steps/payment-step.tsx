"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formElementVariants, staggerContainer } from "@/lib/animations";
import { LeadFormData } from "@/types/lead-form";
import { Shield, CheckCircle, CreditCard, Lock, Info } from "lucide-react";
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

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6 px-4 py-2 max-w-md mx-auto"
    >
      {/* Header */}
      <motion.div
        variants={formElementVariants}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <Image
            src="/pay_now.svg"
            alt="Secure Payment"
            width={120}
            height={80}
            className="object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Secure Payment</h2>
        <p className="text-gray-600 text-base">
          {serviceName} for {name}
        </p>
      </motion.div>

      {/* Service Summary */}
      <motion.div variants={formElementVariants}>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">{serviceName}</span>
              <span className="text-2xl font-bold text-primary">
                {servicePrice}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Lock className="w-4 h-4" />
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
                      <Info className="w-4 h-4 text-blue-600 cursor-pointer" />
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

      {/* Key Benefits - Simplified */}
      <motion.div variants={formElementVariants}>
        <div className="grid grid-cols-2 gap-3 text-center">
          {[
            { icon: Shield, text: "Expert Legal Team" },
            { icon: CheckCircle, text: "Priority Service" },
            { icon: Lock, text: "Secure & Private" },
            { icon: CreditCard, text: "Instant Confirmation" },
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <IconComponent className="w-5 h-5 text-primary mx-auto mb-1" />
                <span className="text-xs text-gray-700 font-medium">
                  {item.text}
                </span>
              </div>
            );
          })}
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

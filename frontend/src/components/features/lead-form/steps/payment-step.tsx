"use client";

import React from "react";
import { motion } from "framer-motion";
import { formElementVariants, staggerContainer } from "@/lib/animations";
import { LeadFormData } from "@/types/lead-form";
import {
  Shield,
  CheckCircle,
  UserCheck,
  Phone,
  FileCheck,
  RefreshCw,
  Star,
} from "lucide-react";
import { getPaymentConfig, formatAmount } from "@/lib/payment-config";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  // Dynamic data for live feel
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Recovered ₹2 lakh stuck for 3 years. Finally got justice!",
      author: "Priya S.",
    },
    {
      text: "Got my security deposit back after landlord refused.",
      author: "Rahul M.",
    },
    {
      text: "Property dispute resolved in weeks. Saved my family home!",
      author: "Anita K.",
    },
    {
      text: "Got my security deposit back after landlord refused.",
      author: "Vikram P.",
    },
    {
      text: "Fired without pay. VakilTech helped me receive my FnF!",
      author: "Meera R.",
    },
  ];

  useEffect(() => {
    // Testimonial rotation every 5 seconds
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // 2 minutes

    // Booking count increment every 2 minutes, starting low and increasing
    return () => {
      clearInterval(testimonialInterval);
    };
  }, []);

  const service = formData.service || "";
  const name = formData.name || "";
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
            {
              icon: Shield,
              title: "Money Back Guarantee",
              description:
                "if you are not satisfied with the notice before approval, we will refund your money",
            },
          ],
        };
      case "consultation":
        return {
          headerTitle: "Get Your Legal Expert Today",
          headerSubtitle:
            "Personal lawyer assigned within 3 hours - guaranteed",
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
      className="flex flex-col h-full w-full"
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-6 w-full">
        {/* Header with Asset */}
        <motion.div variants={formElementVariants} className="text-center">
          <div className="flex justify-center p-0 m-0">
            <Image
              src="/pay_now.svg"
              alt="Secure Payment"
              width={70}
              height={50}
              className="object-contain p-0 m-0 relative -top-2"
            />
          </div>
          <div className="flex justify-center items-center gap-2 relative">
            <h2 className="text-xl ml-4 font-bold text-gray-900 p-0 m-0 leading-1 flex justify-center items-center gap-2 relative">
              You&apos;re Almost There!
            </h2>
            {/* <Image
              src="/icons/court-gavel.png"
              alt="Legal Guarantee"
              width={38}
              height={38}
              className="object-contain flex-shrink-0 relative -top-2"
            /> */}
          </div>
        </motion.div>

        {/* Compact Payment Structure */}
        <motion.div variants={formElementVariants}>
          <div className="text-center space-y-2">
            {/* Service & Pricing */}
            {service === "consultation" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-1"
              >
                <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Legal Consultation
                </h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl font-bold text-[#76bf76]">
                    ₹299
                  </span>
                  <span className="text-sm text-gray-600">one-time</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-1"
              >
                <h3 className="text-lg font-bold text-gray-600 uppercase tracking-wide">
                  Legal Notice
                </h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl font-bold text-[#76bf76]">
                    ₹499
                  </span>
                  <span className="text-sm text-gray-600 relative top-2 right-2">
                    advance
                  </span>
                </div>
                <hr />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="text-xs text-gray-600 py-1"
                >
                  + ₹1,000 after approval ={" "}
                  <span className="font-semibold text-gray-800">
                    ₹1,499 total
                  </span>{" "}
                  <span className="line-through text-gray-400">₹1,999</span>
                </motion.p>
              </motion.div>
            )}
            {/* Payment Methods Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex items-center justify-center gap-2 py-2 rounded bg-secondary/30 shadow-md p-0"
            >
              <Image
                src="/icons/razorpay.svg"
                alt="Razorpay"
                width={48}
                height={48}
                className="object-contain"
              />
              <Image
                src="/icons/gpay.png"
                alt="Google Pay"
                width={20}
                height={20}
                className="object-contain"
              />
              <Image
                src="/icons/phone-pe.png"
                alt="PhonePe"
                width={20}
                height={20}
                className="object-contain"
              />
              <div className="flex items-center gap-1 ml-1 rounded bg-secondary/30 p-1 leading-0">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span className="text-xs text-gray-600">
                  Secure & 100% refundable
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* What Happens Next */}
        <motion.div variants={formElementVariants}>
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">
              What&apos;s Next
            </h3>
            <div className="space-y-1">
              {config.steps.map((item, index) => {
                const IconComponent = item.icon;
                const isExpanded = expandedStep === index;

                return (
                  <div
                    key={index}
                    className="border border-gray-100 rounded-lg overflow-hidden"
                  >
                    <button
                      className="w-full cursor-pointer"
                      onClick={() => setExpandedStep(isExpanded ? null : index)}
                    >
                      <div className="flex items-center gap-3 py-3 px-3 hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        <h4 className="text-sm font-medium text-gray-900 flex-1 text-left">
                          {item.title}
                        </h4>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                          <RefreshCw className="w-3 h-3 text-gray-500" />
                        </motion.div>
                      </div>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                            opacity: { duration: 0.2 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 pt-0 border-t border-gray-100">
                            <motion.p
                              initial={{ y: -10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -10, opacity: 0 }}
                              transition={{ delay: 0.1, duration: 0.2 }}
                              className="text-sm text-gray-600 leading-relaxed pl-7"
                            >
                              {item.description}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
        {/* Social Proof */}
        <motion.div variants={formElementVariants}>
          <div className="bg-secondary/20 shadow rounded shadow-black p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold text-blue-900">
                4.9/5 rating from 3k+ clients
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTestimonial}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-xs text-secondary-foreground italic"
              >
                &quot;{testimonials[currentTestimonial].text}&quot; -{" "}
                <span className="font-semibold">
                  {testimonials[currentTestimonial].author}
                </span>
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
        {/* Error Messages */}
        {(submissionError || paymentError) && (
          <motion.div variants={formElementVariants}>
            <div className="bg-red-50 border border-red-200 p-3 text-center">
              <p className="text-sm text-red-600">
                {submissionError || paymentError}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

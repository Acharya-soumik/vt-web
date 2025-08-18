"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  serviceSelectionSchema,
  ServiceSelectionFormData,
} from "@/lib/validators/lead-form";
import { formElementVariants, staggerContainer } from "@/lib/animations";
import { useEffect, useRef, useState } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import {
  FileText,
  MessageSquare,
  Edit3,
  Building2,
  CheckCircle2,
} from "lucide-react";

interface ServiceSelectionStepProps {
  initialData?: Partial<ServiceSelectionFormData>;
  onNext: (data: ServiceSelectionFormData) => void;
  onDataUpdate?: (data: Partial<ServiceSelectionFormData>) => void;
  setIsStepValid?: (valid: boolean) => void;
}

const services = [
  {
    value: "legal-notice",
    label: "Legal Notice",
    description: "Send legal notices to individuals or organizations",
    price: "₹1,999",
    icon: FileText,
    features: ["Professional drafting", "Legal compliance", "Quick delivery"],
  },
  {
    value: "consultation",
    label: "Legal Consultation",
    description: "Get expert legal advice on your case",
    price: "₹299",
    icon: MessageSquare,
    features: ["Expert guidance", "Case analysis", "Action plan"],
  },
  {
    value: "document-drafting",
    label: "Document Drafting",
    description: "Professional legal document preparation",
    price: "₹2,999",
    icon: Edit3,
    features: ["Custom drafting", "Legal review", "Compliance check"],
  },
  {
    value: "corporate-retainer",
    label: "Corporate Retainer",
    description: "Ongoing legal support for businesses",
    price: "₹9,999",
    icon: Building2,
    features: ["Ongoing support", "Priority access", "Comprehensive coverage"],
  },
];

export const ServiceSelectionStep = ({
  initialData,
  onNext,
  onDataUpdate,
  setIsStepValid,
}: ServiceSelectionStepProps) => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [showDescriptionHint, setShowDescriptionHint] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ServiceSelectionFormData>({
    resolver: zodResolver(serviceSelectionSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  const { logServiceSelected, logFormFieldInteraction } = useAnalytics();

  useEffect(() => {
    if (setIsStepValid) setIsStepValid(isValid);
  }, [isValid, setIsStepValid]);

  // Reset hint when component mounts or when initialData changes
  useEffect(() => {
    setShowDescriptionHint(false);
  }, [initialData]);

  const selectedService = watch("service");

  const onSubmit = (data: ServiceSelectionFormData) => {
    onNext(data);
  };

  const handleServiceSelect = (value: string) => {
    setValue("service", value as ServiceSelectionFormData["service"], {
      shouldValidate: true,
    });
    // Update parent data when service is selected
    onDataUpdate?.({ service: value as ServiceSelectionFormData["service"] });

    // Track service selection
    logServiceSelected(value, 2, "form_step");

    // Show hint and scroll to description section
    setShowDescriptionHint(true);
    setTimeout(() => {
      if (descriptionRef.current) {
        descriptionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Focus on the textarea after scrolling
        const textarea = descriptionRef.current.querySelector("textarea");
        if (textarea) {
          setTimeout(() => {
            textarea.focus();
          }, 500);
        }
      }
    }, 300);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Compact Header */}
      <motion.div
        variants={formElementVariants}
        className="text-center space-y-1"
      >
        <h2 className="text-xl font-bold text-gray-900">
          Choose Your Legal Service
        </h2>
        <p className="text-gray-600 text-sm">
          Select the service that best matches your legal needs
        </p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <motion.div variants={formElementVariants} className="space-y-3">
          <div className="grid gap-3">
            {services.map((service) => {
              const IconComponent = service.icon;
              const isSelected = selectedService === service.value;

              return (
                <motion.div
                  key={service.value}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-200 border ${
                      isSelected
                        ? "ring-2 ring-primary border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/30 hover:bg-gray-50/30"
                    }`}
                    onClick={() => handleServiceSelect(service.value)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          {/* Service Icon */}
                          <div
                            className={`p-2 rounded-lg ${
                              isSelected
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>

                          {/* Service Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 text-base">
                                {service.label}
                              </h3>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                  }}
                                >
                                  <CheckCircle2 className="w-4 h-4 text-primary" />
                                </motion.div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {service.description}
                            </p>

                            {/* Features - Compact */}
                            <div className="flex flex-wrap gap-1">
                              {service.features
                                .slice(0, 2)
                                .map((feature, index) => (
                                  <span
                                    key={index}
                                    className={`text-xs px-2 py-0.5 rounded-md ${
                                      isSelected
                                        ? "bg-primary/15 text-primary"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {feature}
                                  </span>
                                ))}
                              {service.features.length > 2 && (
                                <span className="text-xs text-gray-500 px-1">
                                  +{service.features.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right ml-3">
                          <p
                            className={`text-lg font-bold ${
                              isSelected ? "text-primary" : "text-gray-900"
                            }`}
                          >
                            {service.price}
                          </p>
                          <p className="text-xs text-gray-500">Starting</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          {errors.service && (
            <motion.p
              className="text-sm text-destructive"
              variants={formElementVariants}
              initial="hidden"
              animate="visible"
            >
              {errors.service.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          ref={descriptionRef}
          variants={formElementVariants}
          className="space-y-2"
          animate={
            showDescriptionHint
              ? {
                  scale: [1, 1.01, 1],
                  transition: { duration: 0.3 },
                }
              : {}
          }
        >
          <div className="flex items-center gap-2">
            <Label htmlFor="serviceDetails" className="text-sm font-medium">
              Additional Details (Optional)
            </Label>
            {showDescriptionHint && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
              >
                💡 Add details to help us serve you better
              </motion.span>
            )}
          </div>
          <Textarea
            id="serviceDetails"
            placeholder="Please provide any additional details about your legal requirement..."
            {...register("serviceDetails")}
            rows={3}
            className={
              showDescriptionHint
                ? "ring-2 ring-primary/20 transition-all duration-300"
                : ""
            }
            onFocus={() =>
              logFormFieldInteraction("serviceDetails", "focus", 2)
            }
            onBlur={() => logFormFieldInteraction("serviceDetails", "blur", 2)}
          />
          {errors.serviceDetails && (
            <motion.p
              className="text-sm text-destructive"
              variants={formElementVariants}
              initial="hidden"
              animate="visible"
            >
              {errors.serviceDetails.message}
            </motion.p>
          )}
        </motion.div>

        {/* Hidden submit button for form validation */}
        <button type="submit" style={{ display: "none" }} />
      </form>
    </motion.div>
  );
};

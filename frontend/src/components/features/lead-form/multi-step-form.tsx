"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PersonalDetailsStep } from "./steps/personal-details-step";
import { PaymentStep } from "./steps/payment-step";
import { WhatsNextStep } from "./steps/whats-next-step";
import { stepVariants } from "@/lib/animations";
import { useFormContext } from "@/contexts/form-context";
import { useEffect } from "react";

interface MultiStepFormProps {
  setIsStepValid?: (valid: boolean) => void;
}

export const MultiStepForm = ({ setIsStepValid }: MultiStepFormProps) => {
  const { currentStep, formData, updateFormData, nextStep } = useFormContext();

  // Set step validity for steps that don't have form validation
  useEffect(() => {
    if (setIsStepValid) {
      // Only step 1 (personal details) should be validated via child
      // For non-validated steps, default to true so buttons are enabled
      setIsStepValid(currentStep !== 1 ? true : false);
    }
  }, [currentStep, setIsStepValid]);

  const handleStepComplete = (stepData: Record<string, unknown>) => {
    updateFormData(stepData);
    nextStep();
  };

  const handleFormDataUpdate = (stepData: Record<string, unknown>) => {
    updateFormData(stepData);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsStep
            initialData={formData}
            onNext={handleStepComplete}
            onDataUpdate={handleFormDataUpdate}
            setIsStepValid={setIsStepValid}
          />
        );
      case 2:
        return <PaymentStep formData={formData} />;
      case 3:
        return (
          <WhatsNextStep
            formData={formData}
            leadId={formData.leadId as string}
            submissionSuccess={formData.submissionSuccess as boolean}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-full flex flex-col">
      <div className="flex-1 overflow-y-auto touch-manipulation px-2 sm:px-4 form-scroll-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="w-full p-4"
          >
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

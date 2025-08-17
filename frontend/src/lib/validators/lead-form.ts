import { z } from "zod";
import { validatePhoneNumber, PhoneValidationResult } from "./phone-validation";
import { CountryCode } from "@/data/indian-cities";

// Step 1: Personal Details Validation
export const personalDetailsSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(200, "Location must be less than 200 characters")
    .trim(),
  whatsappNumber: z
    .string()
    .min(1, "Phone number is required")
    .trim()
    .refine(
      (val) => {
        // Basic format check - should start with + and contain digits
        return /^\+\d{7,15}$/.test(val);
      },
      {
        message: "Please enter a valid phone number with country code",
      }
    ),
  whatsappConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to WhatsApp communication to proceed",
  }),
});

// Custom validation function for phone number with country code
export const validatePhoneWithCountry = (
  phoneNumber: string,
  countryCode: CountryCode
): PhoneValidationResult => {
  return validatePhoneNumber(phoneNumber, countryCode);
};

// Step 2: Service Selection Validation
export const serviceSelectionSchema = z.object({
  service: z
    .enum([
      "legal-notice",
      "consultation",
      "document-drafting",
      "corporate-retainer",
      "legal-drafts-bundle",
    ])
    .refine((val) => val !== undefined, {
      message: "Please select a service",
    }),
  serviceDetails: z
    .string()
    .max(500, "Service details must be less than 500 characters")
    .optional(),
});

// Step 3: Payment Choice Validation
export const paymentChoiceSchema = z.object({
  paymentChoice: z
    .enum(["pay-advance", "submit-only"])
    .refine((val) => val !== undefined, {
      message: "Please select a payment option",
    }),
});

// Complete Form Validation
export const leadFormSchema = z.object({
  ...personalDetailsSchema.shape,
  ...serviceSelectionSchema.shape,
  // paymentChoice is set in step 4 only
  paymentChoice: z.enum(["pay-advance", "submit-only"]).optional(),
  step: z.number().min(1).max(4),
  submittedAt: z.union([z.date(), z.string().datetime()]).optional(),
});

export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
export type ServiceSelectionFormData = z.infer<typeof serviceSelectionSchema>;
export type PaymentChoiceFormData = z.infer<typeof paymentChoiceSchema>;
export type LeadFormData = z.infer<typeof leadFormSchema>;

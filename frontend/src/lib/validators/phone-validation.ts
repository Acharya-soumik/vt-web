import { CountryCode } from "@/data/indian-cities";

// Phone number validation patterns for different countries
export const phoneValidationPatterns: Record<
  string,
  { pattern: RegExp; minLength: number; maxLength: number; example: string }
> = {
  IN: {
    pattern: /^[6-9]\d{9}$/,
    minLength: 10,
    maxLength: 10,
    example: "9876543210",
  },
  US: {
    pattern: /^\d{10}$/,
    minLength: 10,
    maxLength: 10,
    example: "5551234567",
  },
  CA: {
    pattern: /^\d{10}$/,
    minLength: 10,
    maxLength: 10,
    example: "5551234567",
  },
  GB: {
    pattern: /^[1-9]\d{9,10}$/,
    minLength: 10,
    maxLength: 11,
    example: "7911123456",
  },
  AU: {
    pattern: /^[2-9]\d{8}$/,
    minLength: 9,
    maxLength: 9,
    example: "234567890",
  },
  DE: {
    pattern: /^[1-9]\d{10,11}$/,
    minLength: 11,
    maxLength: 12,
    example: "30123456789",
  },
  FR: {
    pattern: /^[1-9]\d{8}$/,
    minLength: 9,
    maxLength: 9,
    example: "123456789",
  },
  JP: {
    pattern: /^[1-9]\d{9}$/,
    minLength: 10,
    maxLength: 10,
    example: "9012345678",
  },
  SG: {
    pattern: /^[3,6,8,9]\d{7}$/,
    minLength: 8,
    maxLength: 8,
    example: "91234567",
  },
  AE: {
    pattern: /^[2-9]\d{8}$/,
    minLength: 9,
    maxLength: 9,
    example: "501234567",
  },
  SA: {
    pattern: /^[1-9]\d{8}$/,
    minLength: 9,
    maxLength: 9,
    example: "501234567",
  },
  NZ: {
    pattern: /^[2-9]\d{8}$/,
    minLength: 9,
    maxLength: 9,
    example: "212345678",
  },
  NL: {
    pattern: /^[1-9]\d{8}$/,
    minLength: 9,
    maxLength: 9,
    example: "612345678",
  },
  IT: {
    pattern: /^[3]\d{9}$/,
    minLength: 10,
    maxLength: 10,
    example: "3123456789",
  },
  ES: {
    pattern: /^[6-9]\d{8}$/,
    minLength: 9,
    maxLength: 9,
    example: "612345678",
  },
  BR: {
    pattern: /^[1-9]\d{10}$/,
    minLength: 11,
    maxLength: 11,
    example: "11987654321",
  },
  MX: {
    pattern: /^[1-9]\d{9}$/,
    minLength: 10,
    maxLength: 10,
    example: "5512345678",
  },
  KR: {
    pattern: /^[1-9]\d{9}$/,
    minLength: 10,
    maxLength: 10,
    example: "1012345678",
  },
  RU: {
    pattern: /^[1-9]\d{9}$/,
    minLength: 10,
    maxLength: 10,
    example: "9012345678",
  },
  CN: {
    pattern: /^[1-9]\d{10}$/,
    minLength: 11,
    maxLength: 11,
    example: "13812345678",
  },
};

// Default pattern for countries not in the list
const defaultPattern = {
  pattern: /^\d{7,15}$/,
  minLength: 7,
  maxLength: 15,
  example: "1234567890",
};

export interface PhoneValidationResult {
  isValid: boolean;
  error?: string;
  formattedNumber?: string;
}

export const validatePhoneNumber = (
  phoneNumber: string,
  countryCode: CountryCode
): PhoneValidationResult => {
  // Remove all non-digit characters
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  // Get validation pattern for the country
  const validation =
    phoneValidationPatterns[countryCode.code] || defaultPattern;

  // Check if number is empty
  if (!cleanNumber) {
    return {
      isValid: false,
      error: "Phone number is required",
    };
  }

  // Check length
  if (cleanNumber.length < validation.minLength) {
    return {
      isValid: false,
      error: `Phone number must be at least ${validation.minLength} digits`,
    };
  }

  if (cleanNumber.length > validation.maxLength) {
    return {
      isValid: false,
      error: `Phone number must be no more than ${validation.maxLength} digits`,
    };
  }

  // Check pattern
  if (!validation.pattern.test(cleanNumber)) {
    return {
      isValid: false,
      error: `Please enter a valid ${countryCode.name} phone number (e.g., ${validation.example})`,
    };
  }

  // Format the number with country code
  const formattedNumber = `${countryCode.dialCode}${cleanNumber}`;

  return {
    isValid: true,
    formattedNumber,
  };
};

export const formatPhoneNumber = (
  phoneNumber: string,
  countryCode: CountryCode
): string => {
  const cleanNumber = phoneNumber.replace(/\D/g, "");
  return `${countryCode.dialCode}${cleanNumber}`;
};

export const getPhoneNumberExample = (countryCode: CountryCode): string => {
  const validation =
    phoneValidationPatterns[countryCode.code] || defaultPattern;
  return `${countryCode.dialCode}${validation.example}`;
};

export const getPhoneNumberPlaceholder = (countryCode: CountryCode): string => {
  const validation =
    phoneValidationPatterns[countryCode.code] || defaultPattern;
  return `(e.g., ${validation.example})`;
};

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SimpleCombobox } from "@/components/ui/simple-combobox";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  personalDetailsSchema,
  PersonalDetailsFormData,
  validatePhoneWithCountry,
} from "@/lib/validators/lead-form";
import { formElementVariants, staggerContainer } from "@/lib/animations";
import {
  indianCities,
  IndianCity,
  countryCodes,
  CountryCode,
  defaultCountryCode,
} from "@/data/indian-cities";
import {
  getPhoneNumberExample,
  getPhoneNumberPlaceholder,
} from "@/lib/validators/phone-validation";
import { useState, useEffect } from "react";
import { useAnalytics } from "@/hooks/use-analytics";

interface PersonalDetailsStepProps {
  initialData?: Partial<PersonalDetailsFormData>;
  onNext: (data: PersonalDetailsFormData) => void;
  onDataUpdate?: (data: Partial<PersonalDetailsFormData>) => void;
  setIsStepValid?: (valid: boolean) => void;
}

export const PersonalDetailsStep = ({
  initialData,
  onNext,
  onDataUpdate,
  setIsStepValid,
}: PersonalDetailsStepProps) => {
  const [selectedCity, setSelectedCity] = useState<string>(
    initialData?.location || ""
  );
  const [filteredCities, setFilteredCities] = useState<IndianCity[]>([]);
  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCode>(defaultCountryCode);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneValidationError, setPhoneValidationError] = useState<string>("");
  const [phoneExample, setPhoneExample] = useState<string>(
    getPhoneNumberExample(defaultCountryCode)
  );
  const [phonePlaceholder, setPhonePlaceholder] = useState<string>(
    getPhoneNumberPlaceholder(defaultCountryCode)
  );

  const { logFormFieldInteraction, logFormValidationError } = useAnalytics();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: { whatsappConsent: true, ...initialData },
    mode: "onChange",
  });

  useEffect(() => {
    if (setIsStepValid) setIsStepValid(isValid);
  }, [isValid, setIsStepValid]);

  // Update city options when filtered cities change
  useEffect(() => {
    const options = filteredCities.map((city) => ({
      value: city.displayName,
      label: city.displayName,
    }));
    setCityOptions(options);
  }, [filteredCities]);

  // Initialize with all cities
  useEffect(() => {
    setFilteredCities(indianCities);
  }, []);

  // Initialize phone number from initialData if it exists
  useEffect(() => {
    if (initialData?.whatsappNumber) {
      const fullNumber = initialData.whatsappNumber;
      // Extract country code and phone number
      const country = countryCodes.find((c) =>
        fullNumber.startsWith(c.dialCode)
      );
      if (country) {
        setSelectedCountryCode(country);
        const phoneOnly = fullNumber.replace(country.dialCode, "");
        setPhoneNumber(phoneOnly);
        setPhoneExample(getPhoneNumberExample(country));
        setPhonePlaceholder(getPhoneNumberPlaceholder(country));
      }
    }
  }, [initialData?.whatsappNumber]);

  // Handle city selection
  const handleCitySelect = (cityDisplayName: string) => {
    setSelectedCity(cityDisplayName);
    setValue("location", cityDisplayName, { shouldValidate: true });
    // Update parent data when city is selected
    onDataUpdate?.({ location: cityDisplayName });

    // Track field interaction
    logFormFieldInteraction("location", "blur", 1);
  };

  const onSubmit = (data: PersonalDetailsFormData) => {
    onNext(data);
  };

  // Handle individual field changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onDataUpdate?.({ name: value });
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove country code if user enters it manually
    countryCodes.forEach((country) => {
      if (value.startsWith(country.dialCode)) {
        value = value.replace(country.dialCode, "");
      }
    });

    // Remove any non-digit characters except for the country code
    value = value.replace(/\D/g, "");

    setPhoneNumber(value);

    // Validate phone number
    const validation = validatePhoneWithCountry(value, selectedCountryCode);
    setPhoneValidationError(validation.error || "");

    if (validation.isValid && validation.formattedNumber) {
      setValue("whatsappNumber", validation.formattedNumber, {
        shouldValidate: true,
      });
      onDataUpdate?.({ whatsappNumber: validation.formattedNumber });
    } else {
      setValue("whatsappNumber", selectedCountryCode.dialCode + value, {
        shouldValidate: true,
      });
      onDataUpdate?.({ whatsappNumber: selectedCountryCode.dialCode + value });
    }
  };

  const handleCountryCodeChange = (value: string) => {
    const [countryCode, dialCode] = value.split("-");
    const country = countryCodes.find(
      (c) => c.code === countryCode && c.dialCode === dialCode
    );
    if (country) {
      setSelectedCountryCode(country);

      // Update phone example and placeholder for new country
      setPhoneExample(getPhoneNumberExample(country));
      setPhonePlaceholder(getPhoneNumberPlaceholder(country));

      // Re-validate phone number with new country code
      if (phoneNumber) {
        const validation = validatePhoneWithCountry(phoneNumber, country);
        setPhoneValidationError(validation.error || "");

        if (validation.isValid && validation.formattedNumber) {
          setValue("whatsappNumber", validation.formattedNumber, {
            shouldValidate: true,
          });
          onDataUpdate?.({ whatsappNumber: validation.formattedNumber });
        } else {
          setValue("whatsappNumber", country.dialCode + phoneNumber, {
            shouldValidate: true,
          });
          onDataUpdate?.({ whatsappNumber: country.dialCode + phoneNumber });
        }
      }
    }
  };

  // Track validation errors
  useEffect(() => {
    if (errors.name) {
      logFormValidationError("name", "required", 1);
    }
    if (errors.location) {
      logFormValidationError("location", "required", 1);
    }
    if (errors.whatsappNumber) {
      logFormValidationError("whatsappNumber", "invalid_format", 1);
    }
    if (phoneValidationError) {
      logFormValidationError("whatsappNumber", "validation_error", 1);
    }
  }, [
    errors.name,
    errors.location,
    errors.whatsappNumber,
    phoneValidationError,
    logFormValidationError,
  ]);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4 sm:space-y-6"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <motion.div variants={formElementVariants} className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            {...register("name")}
            onChange={(e) => {
              register("name").onChange(e);
              handleNameChange(e);
            }}
            onFocus={() => logFormFieldInteraction("name", "focus", 1)}
            onBlur={() => logFormFieldInteraction("name", "blur", 1)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <motion.p
              id="name-error"
              className="text-sm text-destructive"
              variants={formElementVariants}
              initial="hidden"
              animate="visible"
            >
              {errors.name.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div variants={formElementVariants} className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <SimpleCombobox
            options={cityOptions}
            value={selectedCity}
            onValueChange={handleCitySelect}
            placeholder="Search and select your city"
            searchPlaceholder="Search cities..."
            emptyMessage="No cities found. Try a different search term."
            className={errors.location ? "border-destructive" : ""}
          />
          {errors.location && (
            <motion.p
              id="location-error"
              className="text-sm text-destructive"
              variants={formElementVariants}
              initial="hidden"
              animate="visible"
            >
              {errors.location.message}
            </motion.p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Start typing to search for your city. The state will be
            automatically detected.
          </p>
        </motion.div>

        <motion.div variants={formElementVariants} className="space-y-2">
          <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
          <div className="flex gap-2">
            <Select
              value={`${selectedCountryCode.code}-${selectedCountryCode.dialCode}`}
              onValueChange={handleCountryCodeChange}
            >
              <SelectTrigger className="w-[120px] text-base">
                <SelectValue>
                  <span className="flex items-center gap-1">
                    <span>{selectedCountryCode.flag}</span>
                    <span>{selectedCountryCode.dialCode}</span>
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((country) => (
                  <SelectItem
                    key={country.code}
                    value={`${country.code}-${country.dialCode}`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                      <span className="text-muted-foreground">
                        {country.dialCode}
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="whatsappNumber"
              type="tel"
              placeholder={phonePlaceholder}
              className={`flex-1 ${
                phoneValidationError || errors.whatsappNumber
                  ? "border-destructive"
                  : phoneNumber && !phoneValidationError
                  ? "border-green-500"
                  : ""
              }`}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              onFocus={() =>
                logFormFieldInteraction("whatsappNumber", "focus", 1)
              }
              onBlur={() =>
                logFormFieldInteraction("whatsappNumber", "blur", 1)
              }
              aria-describedby={
                phoneValidationError || errors.whatsappNumber
                  ? "whatsapp-error"
                  : undefined
              }
            />
          </div>
          {(phoneValidationError || errors.whatsappNumber) && (
            <motion.p
              id="whatsapp-error"
              className="text-sm text-destructive"
              variants={formElementVariants}
              initial="hidden"
              animate="visible"
            >
              {phoneValidationError || errors.whatsappNumber?.message}
            </motion.p>
          )}
          {phoneNumber && !phoneValidationError && !errors.whatsappNumber && (
            <motion.p
              className="text-sm text-green-600"
              variants={formElementVariants}
              initial="hidden"
              animate="visible"
            >
              ✓ Valid phone number
            </motion.p>
          )}
          <p className="text-xs text-muted-foreground">
            Example: {phoneExample}
          </p>
        </motion.div>

        <motion.div variants={formElementVariants} className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <Checkbox
                id="whatsappConsent"
                defaultChecked={true}
                {...register("whatsappConsent")}
                onCheckedChange={(checked) => {
                  setValue("whatsappConsent", checked as boolean, {
                    shouldValidate: true,
                  });
                  onDataUpdate?.({ whatsappConsent: checked as boolean });
                  logFormFieldInteraction("whatsappConsent", "blur", 1);
                }}
              />
            </div>
            <div className="flex-1 space-y-1">
              <Label
                htmlFor="whatsappConsent"
                className="text-sm font-normal leading-relaxed cursor-pointer block"
              >
                I consent to receiving communication via WhatsApp *
              </Label>
              <p className="text-xs text-muted-foreground leading-relaxed">
                By checking this box, you agree to receive updates, legal
                advice, and payment details through WhatsApp at the number
                provided above.
              </p>
            </div>
          </div>
          {errors.whatsappConsent && (
            <motion.p
              id="consent-error"
              className="text-sm text-destructive"
              variants={formElementVariants}
              initial="hidden"
              animate="visible"
            >
              {errors.whatsappConsent.message}
            </motion.p>
          )}
        </motion.div>

        {/* Hidden submit button for form validation */}
        <button type="submit" style={{ display: "none" }} />
      </form>
    </motion.div>
  );
};

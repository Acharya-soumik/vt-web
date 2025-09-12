"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  Scale,
  CheckCircle,
  Mail,
  Phone,
  FileText,
  Clock,
} from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

interface LawyerApplication {
  fullName: string;
  email: string;
  phone: string;
  barCouncilNumber: string;
  availabilityType: string;
  resumeDriveLink: string;
}

export function CareerApplicationForm() {
  const { logFormSubmitted, logCTAClick } = useAnalytics();

  const [formData, setFormData] = useState<LawyerApplication>({
    fullName: "",
    email: "",
    phone: "",
    barCouncilNumber: "",
    availabilityType: "",
    resumeDriveLink: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: keyof LawyerApplication, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Log form submission for analytics
      logFormSubmitted("career_application", "no_payment", 1);

      // Use provided Google Drive link instead of uploading files
      const resumeUrl: string | null = formData.resumeDriveLink
        ? formData.resumeDriveLink
        : null;

      const response = await fetch("/api/lawyer-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          barCouncilNumber: formData.barCouncilNumber,
          availabilityType: formData.availabilityType,
          resumeUrl,
        }),
      });

      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ message: "Submission failed" }));
        throw new Error(error.message || "Submission failed");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availabilityTypes = [
    "Full-time",
    "Part-time",
    "Contract/Project-based",
    "Consulting",
    "Flexible",
  ];

  if (submitted) {
    return (
      <Card className="text-center max-w-2xl mx-auto">
        <CardContent className="p-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Application Received!</h2>
          <p className="text-muted-foreground mb-4">
            Thank you for applying! We&apos;ll review your application and get
            back to you within 3-5 business days.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                barCouncilNumber: "",
                availabilityType: "",
                resumeDriveLink: "",
              });
            }}
          >
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="apply" className="scroll-mt-28">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Users className="h-6 w-6 mr-3 text-primary" />
          Join Our Legal Team
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Simple Form Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <Input
                required
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 9876543210"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Bar Council Number */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Bar Council Enrollment Number *
              </label>
              <div className="relative">
                <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  required
                  value={formData.barCouncilNumber}
                  onChange={(e) =>
                    handleInputChange("barCouncilNumber", e.target.value)
                  }
                  placeholder="Your Bar Council enrollment number"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Availability Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Availability Type *
              </label>
              <select
                required
                value={formData.availabilityType}
                onChange={(e) =>
                  handleInputChange("availabilityType", e.target.value)
                }
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select availability</option>
                {availabilityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Resume Link */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Resume/CV Link (Google Drive) *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  required
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={formData.resumeDriveLink}
                  onChange={(e) =>
                    handleInputChange("resumeDriveLink", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Share your Google Drive link (make sure it&apos;s accessible to
                anyone with the link)
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
              onClick={() =>
                logCTAClick("career_form", "Submit Application", "/careers")
              }
            >
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  <Users className="h-4 w-4 mr-2" />
                  Join Our Legal Team
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

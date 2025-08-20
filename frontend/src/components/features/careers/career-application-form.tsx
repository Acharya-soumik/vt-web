"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  Scale,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  FileText,
  Clock,
  BookOpen,
  Trophy,
} from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

interface LawyerApplication {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  specialty: string;
  yearsOfPractice: string;
  barCouncilNumber: string;
  currentFirm: string;
  education: string;
  languages: string;
  notableAchievements: string;
  whyJoinUs: string;
  availabilityType: string;
  expectedCompensation: string;
  resumeFile: File | null;
}

export function CareerApplicationForm() {
  const { logFormSubmitted, logCTAClick } = useAnalytics();

  const [formData, setFormData] = useState<LawyerApplication>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    specialty: "",
    yearsOfPractice: "",
    barCouncilNumber: "",
    currentFirm: "",
    education: "",
    languages: "",
    notableAchievements: "",
    whyJoinUs: "",
    availabilityType: "",
    expectedCompensation: "",
    resumeFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: keyof LawyerApplication, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resumeFile: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Log form submission for analytics
      logFormSubmitted("career_application", "no_payment", 1);

      // Optional: handle resume upload separately to storage and get URL
      const resumeUrl: string | null = null;
      if (formData.resumeFile) {
        // For now, skip upload implementation; backend supports optional resumeUrl
        // Implement storage upload later if needed
      }

      const response = await fetch("/api/lawyer-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          specialty: formData.specialty,
          yearsOfPractice: formData.yearsOfPractice,
          barCouncilNumber: formData.barCouncilNumber,
          currentFirm: formData.currentFirm || null,
          education: formData.education,
          languages: formData.languages,
          notableAchievements: formData.notableAchievements || null,
          whyJoinUs: formData.whyJoinUs,
          availabilityType: formData.availabilityType,
          expectedCompensation: formData.expectedCompensation || null,
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

  const specialties = [
    "Corporate Law",
    "Criminal Law",
    "Civil Litigation",
    "Family Law",
    "Property Law",
    "Tax Law",
    "Labor & Employment Law",
    "Intellectual Property Law",
    "Constitutional Law",
    "Environmental Law",
    "Immigration Law",
    "Banking & Finance Law",
    "Cyber Law",
    "Consumer Law",
    "Other",
  ];

  const experienceRanges = [
    "0-2 years",
    "3-5 years",
    "6-10 years",
    "11-15 years",
    "16-20 years",
    "20+ years",
  ];

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
          <h2 className="text-2xl font-bold mb-2">
            Application Submitted Successfully!
          </h2>
          <p className="text-muted-foreground mb-4">
            Thank you for your interest in joining our expert legal team. We
            will review your application and get back to you within 3-5 business
            days.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                location: "",
                specialty: "",
                yearsOfPractice: "",
                barCouncilNumber: "",
                currentFirm: "",
                education: "",
                languages: "",
                notableAchievements: "",
                whyJoinUs: "",
                availabilityType: "",
                expectedCompensation: "",
                resumeFile: null,
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <FileText className="h-6 w-6 mr-3 text-primary" />
          Expert Lawyer Application Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <Input
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder="Enter your full name"
                />
              </div>
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
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location/City *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    required
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="Mumbai, Delhi, Bangalore, etc."
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Scale className="h-5 w-5 mr-2 text-primary" />
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Primary Specialty *
                </label>
                <select
                  required
                  value={formData.specialty}
                  onChange={(e) =>
                    handleInputChange("specialty", e.target.value)
                  }
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select your specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Years of Practice *
                </label>
                <select
                  required
                  value={formData.yearsOfPractice}
                  onChange={(e) =>
                    handleInputChange("yearsOfPractice", e.target.value)
                  }
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select experience range</option>
                  {experienceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bar Council Enrollment Number *
                </label>
                <Input
                  required
                  value={formData.barCouncilNumber}
                  onChange={(e) =>
                    handleInputChange("barCouncilNumber", e.target.value)
                  }
                  placeholder="Your Bar Council enrollment number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Current Firm/Organization
                </label>
                <Input
                  value={formData.currentFirm}
                  onChange={(e) =>
                    handleInputChange("currentFirm", e.target.value)
                  }
                  placeholder="Current workplace (optional)"
                />
              </div>
            </div>
          </div>

          {/* Education and Skills */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Education & Skills
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Educational Qualifications *
                </label>
                <Textarea
                  required
                  value={formData.education}
                  onChange={(e) =>
                    handleInputChange("education", e.target.value)
                  }
                  placeholder="List your law degree(s), institution(s), and any additional qualifications..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Languages (Hindi, English, etc.) *
                </label>
                <Input
                  required
                  value={formData.languages}
                  onChange={(e) =>
                    handleInputChange("languages", e.target.value)
                  }
                  placeholder="e.g., Hindi (Native), English (Fluent), Tamil (Conversational)"
                />
              </div>
            </div>
          </div>

          {/* Experience and Achievements */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-primary" />
              Experience & Achievements
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Notable Achievements & Cases
                </label>
                <Textarea
                  value={formData.notableAchievements}
                  onChange={(e) =>
                    handleInputChange("notableAchievements", e.target.value)
                  }
                  placeholder="Describe significant cases, awards, publications, or achievements that demonstrate your expertise..."
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Why do you want to join our team? *
                </label>
                <Textarea
                  required
                  value={formData.whyJoinUs}
                  onChange={(e) =>
                    handleInputChange("whyJoinUs", e.target.value)
                  }
                  placeholder="Tell us what motivates you to work with our expert legal team and how you can contribute..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Availability and Compensation */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Availability & Compensation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Resume/CV Upload
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Accepted formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
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
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

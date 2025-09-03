"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "@/contexts/form-context";
import { Mail, Phone } from "lucide-react";

export function ContactInfo() {
  const { openForm } = useFormContext();

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: ["+91 7047683995"],
      action: "Call us",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["help@vakiltech.in"],
      action: "Email us",
    },
  ];

  return (
    <div className="flex justify-center items-center gap-6 flex-wrap">
      {contactInfo.map((info, index) => (
        <Card
          key={index}
          className="text-center flex-wrap flex-1 hover:shadow-lg transition-all duration-300"
        >
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="text-primary">{info.icon}</div>
            </div>
            <CardTitle className="text-lg">{info.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {info.details.map((detail, detailIndex) => (
              <p
                key={detailIndex}
                className="text-sm text-muted-foreground mb-1"
              >
                {detail}
              </p>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="mt-4 w-full"
              onClick={() => {
                if (info.title === "Phone") {
                  window.location.href = "tel:+919876543210";
                } else if (info.title === "Email") {
                  window.location.href = "mailto:contact@vakiltech.in";
                } else if (info.title === "Business Hours") {
                  openForm("consultation");
                }
              }}
            >
              {info.action}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "@/contexts/form-context";

const DELIVERABLES = [
  "Professional legal notice drafted by an advocate",
  "Review of your facts and supporting documents",
  "1:1 consultation with an expert lawyer",
  "Dispatch via registered post/courier or email with proof",
  "Guidance on next legal steps if no response",
];

export function LegalNoticePayCard() {
  const [expanded, setExpanded] = useState(false);
  const { openForm } = useFormContext();

  const toggle = () => setExpanded((v) => !v);

  const visible = expanded ? DELIVERABLES : DELIVERABLES.slice(0, 3);

  return (
    <section className="py-8">
      <Card className="max-w-md mx-auto border-primary/20 bg-gradient-to-tr from-secondary/20 via-secondary/10 to-primary/5">
        <CardContent className="p-5">
          <h2 className="text-2xl font-semibold text-center mb-4 text-foreground">
            Send a Legal Notice
          </h2>

          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-muted-foreground">Total Charges</span>
            <span className="font-semibold text-foreground">₹1999</span>
          </div>

          <div className="border rounded-xl p-4 mb-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-semibold text-foreground">Pay Now</div>
                <div className="text-sm text-muted-foreground">(Advance)</div>
              </div>
              <div className="text-xl font-bold text-foreground">₹499</div>
            </div>

            {/* Minimal pricing breakdown */}
            <div className="flex items-center gap-2 mb-3 text-xs">
              <span className="px-2 py-1 rounded-full bg-background text-foreground border">
                ₹499 now
              </span>
              <span className="px-2 py-1 rounded-full bg-background text-muted-foreground border">
                ₹1500 later
              </span>
            </div>

            <div className="rounded-xl border bg-secondary/20 p-4">
              <div className="font-semibold mb-3 text-foreground">
                Deliverables *
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {visible.map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 mt-3">
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full"
                  onClick={toggle}
                >
                  {expanded ? (
                    <span className="flex items-center gap-1">
                      <ChevronUp className="h-4 w-4 animate-spin-slow" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <ChevronDown className="h-4 w-4 animate-spin-slow" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="text-sm font-medium mb-2 text-foreground">
              We Accept
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Image
                src="https://img.icons8.com/ios/50/visa.png"
                alt="visa"
                width={50}
                height={50}
              />
              <Image
                src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-google-pay-is-the-fast-simple-way-to-pay-online-in-stores-and-more-logo-color-tal-revivo.png"
                alt="gpay"
                width={24}
                height={24}
              />
              <Image
                src="https://img.icons8.com/color/48/paytm.png"
                alt="paytm"
                width={48}
                height={48}
              />
            </div>
          </div>

          <Button
            className="w-full text-base py-6"
            onClick={() => openForm("legal-notice")}
          >
            PAY NOW
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

export default LegalNoticePayCard;

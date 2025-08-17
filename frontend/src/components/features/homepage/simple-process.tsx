"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface ProcessStep {
  icon: string;
  title: string;
  description: string;
  svgPath: string;
}

interface SimpleProcessProps {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
  className?: string;
}

export function SimpleProcess({
  title,
  subtitle,
  steps,
  className = "",
}: SimpleProcessProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className={`p-8 bg-card border rounded-lg ${className}`}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto px-4">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <motion.div
              className="w-20 h-20 mx-auto mb-4 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
            >
              <Image
                src={step.svgPath}
                alt={step.title}
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.h3
              className="text-md font-semibold mb-3 text-foreground"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2 + 0.1,
              }}
            >
              {step.title}
            </motion.h3>
            <motion.p
              className="text-muted-foreground text-xs"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2 + 0.2,
              }}
            >
              {step.description}
            </motion.p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Briefcase,
  MessageCircle,
  Star,
  Award,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useFormContext } from "@/contexts/form-context";

export interface Expert {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
  reviews: number;
  experience: number;
  languages: string[];
  image: string;
  isOnline?: boolean;
  location?: string;
}

interface ExpertCarouselProps {
  experts: Expert[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ExpertCarousel({
  experts,
  title = "Consult top experts across legal areas",
  subtitle,
  className = "",
}: ExpertCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const { openForm } = useFormContext();

  useEffect(() => {
    setIsClient(true);

    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, experts.length - itemsPerView);

  const nextSlide = () => {
    setSlideDirection("next");
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlideDirection("prev");
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Autoplay: advance slides every 4s unless paused (hover/touch)
  // Placed before any conditional returns to keep hook order stable across renders
  useEffect(() => {
    if (isPaused || !isClient) return;
    if (experts.length <= itemsPerView) return;
    const intervalId = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(intervalId);
  }, [isPaused, isClient, maxIndex]);

  const maskName = (name: string) => {
    const parts = name.split(" ");
    if (parts.length === 1) {
      return (
        parts[0].slice(0, 2) + "*".repeat(Math.max(0, parts[0].length - 2))
      );
    }
    return (
      parts[0].slice(0, 2) +
      "*".repeat(Math.max(0, parts[0].length - 2)) +
      " " +
      parts[1].slice(0, 3) +
      "*".repeat(Math.max(0, parts[1].length - 3))
    );
  };

  const getExpertiseIcon = (expertise: string) => {
    if (
      expertise.toLowerCase().includes("money") ||
      expertise.toLowerCase().includes("cheque")
    ) {
      return <Briefcase className="w-4 h-4 text-green-600" />;
    }
    if (
      expertise.toLowerCase().includes("family") ||
      expertise.toLowerCase().includes("matrimonial")
    ) {
      return <CheckCircle2 className="w-4 h-4 text-pink-600" />;
    }
    if (
      expertise.toLowerCase().includes("cyber") ||
      expertise.toLowerCase().includes("crime")
    ) {
      return <Award className="w-4 h-4 text-red-600" />;
    }
    if (
      expertise.toLowerCase().includes("corporate") ||
      expertise.toLowerCase().includes("business")
    ) {
      return <Star className="w-4 h-4 text-blue-600" />;
    }
    return <CheckCircle2 className="w-4 h-4 text-primary" />;
  };

  if (!experts || experts.length === 0 || !isClient) {
    return null;
  }

  const visibleExperts = experts.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  // If we're at the end and don't have enough items, wrap around
  if (visibleExperts.length < itemsPerView && currentIndex > 0) {
    const remainingCount = itemsPerView - visibleExperts.length;
    const wrappedExperts = experts.slice(0, remainingCount);
    visibleExperts.push(...wrappedExperts);
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Navigation Buttons - Only show if more items than can be displayed */}
          {experts.length > itemsPerView && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full  shadow-lg border-2 hover:shadow-xl transition-all duration-300 md:block hidden"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full  shadow-lg border-2 hover:shadow-xl transition-all duration-300 md:block hidden"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Cards Container */}
          <div className="overflow-hidden md:mx-16 mx-0">
            <motion.div
              key={currentIndex}
              initial={{
                x: slideDirection === "next" ? 300 : -300,
                opacity: 0,
              }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) {
                  nextSlide();
                } else if (info.offset.x > 50) {
                  prevSlide();
                }
              }}
              className={`grid gap-6 ${
                itemsPerView === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              {visibleExperts.map((expert, index) => (
                <Card
                  key={`${expert.id}-${currentIndex}-${index}`}
                  className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-white/95 via-white/80 to-secondary/20 hover:from-white to-secondary/30"
                >
                  <CardContent className="p-6">
                    {/* Rating and Online Status */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-foreground">
                          {expert.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({expert.reviews})
                        </span>
                      </div>
                      {expert.isOnline && (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-600 font-medium">
                            Online
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Expert Name with Professional Title */}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-foreground">
                        Advocate {maskName(expert.name)}
                      </h3>
                      <div className="flex items-center justify-center space-x-2 mt-1">
                        <Award className="w-3 h-3 text-amber-500" />
                        <p className="text-xs text-primary font-medium">
                          Senior Legal Consultant
                        </p>
                        <Award className="w-3 h-3 text-amber-500" />
                      </div>
                    </div>

                    {/* Expertise with Icons */}
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        {getExpertiseIcon(expert.expertise[0])}
                        <p className="text-sm font-medium text-foreground">
                          {expert.expertise[0]}
                        </p>
                      </div>
                      {expert.expertise.length > 1 && (
                        <p className="text-xs text-muted-foreground">
                          +{expert.expertise.length - 1} more specializations
                        </p>
                      )}
                    </div>

                    {/* Experience with Professional Icon */}
                    <div className="flex items-center justify-center mb-3 text-sm bg-primary/5 rounded-lg p-2">
                      <Briefcase className="w-4 h-4 mr-2 text-primary" />
                      <span className="font-semibold text-foreground">
                        {expert.experience}+ years Experience
                      </span>
                    </div>

                    {/* Location */}
                    {expert.location && (
                      <div className="flex items-center justify-center text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                        <span className="font-medium">{expert.location}</span>
                      </div>
                    )}

                    {/* Languages */}
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="truncate">
                        {expert.languages.slice(0, 3).join(", ")}
                      </span>
                      {expert.languages.length > 3 && (
                        <span className="ml-1">
                          +{expert.languages.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-center mt-2">
                      <Button
                        size="sm"
                        onClick={() => openForm("consultation")}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-md text-xs py-0 my-0"
                      >
                        Consult Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Mobile Navigation Buttons */}
          {experts.length > itemsPerView && itemsPerView === 1 && (
            <div className="flex justify-center mt-6 space-x-4 md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className=" shadow-md"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className=" shadow-md"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}

          {/* Dots Indicator */}
          {experts.length > itemsPerView && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({
                length: Math.ceil(experts.length / itemsPerView),
              }).map((_, index) => {
                const pageIndex = index * itemsPerView;
                const isActive =
                  currentIndex >= pageIndex &&
                  currentIndex < pageIndex + itemsPerView;

                return (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? "bg-primary" : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentIndex(pageIndex)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

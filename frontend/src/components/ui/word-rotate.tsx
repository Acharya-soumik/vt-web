"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<"h1">;
  className?: string;
  // Typewriter options
  typeSpeedMs?: number;
  pauseMs?: number;
  showCursor?: boolean;
  cursorClassName?: string;
  eraseBeforeNext?: boolean;
  eraseSpeedMs?: number;
}

export function WordRotate({
  words,
  duration = 2500,
  framerProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
  typeSpeedMs = 50,
  pauseMs = 1200,
  showCursor = true,
  cursorClassName,
  eraseBeforeNext = false,
  eraseSpeedMs = 35,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any running timers
  const clearTimers = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  // Handle typewriter effect when the current word is visible
  useEffect(() => {
    // Backwards-compat: if legacy `duration` is passed, use it as the pause before rotating
    const computedPauseMs =
      pauseMs === 1200 && duration !== 2500 ? duration : pauseMs;
    if (!isVisible) return;
    const currentWord = words[index] ?? "";

    // If still typing
    if (typedText.length < currentWord.length) {
      typingTimeoutRef.current = setTimeout(() => {
        setTypedText(currentWord.slice(0, typedText.length + 1));
      }, typeSpeedMs);
      return;
    }

    // Finished typing current word: pause, optionally erase, then rotate
    pauseTimeoutRef.current = setTimeout(() => {
      if (eraseBeforeNext) {
        const eraseNext = () => {
          setTypedText((prev) => {
            if (prev.length <= 0) {
              // Once erased, trigger exit to rotate
              setIsVisible(false);
              return prev;
            }
            typingTimeoutRef.current = setTimeout(eraseNext, eraseSpeedMs);
            return prev.slice(0, -1);
          });
        };
        typingTimeoutRef.current = setTimeout(eraseNext, eraseSpeedMs);
      } else {
        // Trigger exit to rotate to the next word
        setIsVisible(false);
      }
    }, computedPauseMs);
  }, [
    isVisible,
    index,
    typedText,
    words,
    typeSpeedMs,
    pauseMs,
    eraseBeforeNext,
    eraseSpeedMs,
    duration,
  ]);

  const handleExitComplete = () => {
    // Move to next word, reset typing, and show again
    setIndex((prevIndex) => (prevIndex + 1) % words.length);
    setTypedText("");
    setIsVisible(true);
  };

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        {isVisible && (
          <motion.h1
            key={words[index]}
            className={cn(className)}
            {...framerProps}
          >
            <span>{typedText}</span>
            {showCursor && (
              <motion.span
                aria-hidden
                className={cn(
                  "inline-block w-[1px] align-baseline",
                  cursorClassName
                )}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                |
              </motion.span>
            )}
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
}

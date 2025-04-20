"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion";
import { cn } from "@/lib/utils";

type TextEffectProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  preset?: "fade-in" | "fade-in-blur" | "slide-up" | "slide-down";
  per?: "character" | "word" | "line";
  delay?: number;
  staggerDelay?: number;
  speedSegment?: number;
};

export function TextEffect({
  children,
  as: Component = "div",
  className,
  preset = "fade-in",
  per = "word",
  delay = 0,
  staggerDelay = 0.05,
  speedSegment = 0.05,
}: TextEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [segments, setSegments] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      let segmentArray: string[] = [];
      
      if (per === "character") {
        segmentArray = children.split("");
      } else if (per === "word") {
        segmentArray = children.split(/\s+/).filter(Boolean);
      } else if (per === "line") {
        segmentArray = children.split(/\n/).filter(Boolean);
      }
      
      setSegments(segmentArray);
      setLoaded(true);
    }
  }, [children, per]);

  const getVariants = () => {
    switch (preset) {
      case "fade-in":
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              duration: 0.5,
            }
          }
        };
      case "fade-in-blur":
        return {
          hidden: { 
            opacity: 0,
            filter: "blur(8px)",
          },
          visible: { 
            opacity: 1,
            filter: "blur(0px)",
            transition: { 
              duration: 0.5,
            }
          }
        };
      case "slide-up":
        return {
          hidden: { 
            opacity: 0,
            y: 20,
          },
          visible: { 
            opacity: 1,
            y: 0,
            transition: { 
              type: "spring",
              stiffness: 300,
              damping: 30,
            }
          }
        };
      case "slide-down":
        return {
          hidden: { 
            opacity: 0,
            y: -20,
          },
          visible: { 
            opacity: 1,
            y: 0,
            transition: { 
              type: "spring",
              stiffness: 300,
              damping: 30,
            }
          }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  if (!loaded) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component className={cn("inline-block", className)} ref={containerRef}>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        style={{ display: "inline" }}
      >
        {segments.map((segment, index) => (
          <motion.span
            key={index}
            variants={getVariants()}
            transition={{ 
              duration: segment.length * speedSegment,
            }}
            style={{ 
              display: per === "line" ? "block" : "inline-block",
              whiteSpace: per === "character" ? "pre" : undefined,
              marginRight: per === "word" ? "0.25em" : undefined,
            }}
          >
            {segment}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

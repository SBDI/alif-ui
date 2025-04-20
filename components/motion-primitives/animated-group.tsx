"use client";

import React from "react";
import { motion, Variants } from "motion";
import { cn } from "@/lib/utils";

type AnimatedGroupProps = {
  children: React.ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  initial?: string;
  animate?: string;
  transition?: any;
  viewport?: any;
};

export function AnimatedGroup({
  children,
  className,
  variants = {
    container: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
        },
      },
    },
  },
  initial = "hidden",
  animate = "visible",
  transition,
  viewport,
  ...props
}: AnimatedGroupProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      animate={animate}
      variants={variants.container}
      transition={transition}
      viewport={viewport}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return (
            <motion.div key={index} variants={variants.item}>
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
}

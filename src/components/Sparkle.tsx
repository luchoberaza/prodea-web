"use client";

import { motion } from "framer-motion";

interface SparkleProps {
  size?: number;
  color?: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function Sparkle({
  size = 20,
  color = "#F2A65A",
  className = "",
  delay = 0,
  duration = 3,
}: SparkleProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      animate={{
        scale: [0.8, 1.3, 0.8],
        rotate: [0, 180, 360],
        opacity: [0.3, 1, 0.3],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
    </motion.svg>
  );
}

"use client";

import { useEffect, useRef, ReactNode } from "react";
import { motion, useInView, useAnimation, Variant } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fade-up" | "fade-left" | "fade-right" | "scale" | "fade-in";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const variants: Record<string, { hidden: Variant; visible: Variant }> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.3, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      const offset = scrolled * speed;
      el.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface MarqueeProps {
  text: string;
  className?: string;
  duration?: number;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}

export function Marquee({
  text,
  className = "",
  duration = 20,
  size = "lg",
  color,
}: MarqueeProps) {
  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-4xl md:text-5xl",
    lg: "text-5xl md:text-7xl",
    xl: "text-6xl md:text-9xl",
  };

  const repeatedText = Array(8).fill(text).join(" \u00B7 ");

  return (
    <div className={`marquee ${className}`}>
      <div
        className={`marquee-inner ${sizeClasses[size]}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <span
          className="marquee-text"
          style={color ? { color } : undefined}
        >
          {repeatedText}
        </span>
        <span
          className="marquee-text"
          style={color ? { color } : undefined}
        >
          {repeatedText}
        </span>
      </div>
    </div>
  );
}

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function CountUp({ end, duration = 2, suffix = "", className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      if (ref.current) {
        ref.current.textContent = Math.floor(start).toLocaleString() + suffix;
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration, suffix, isInView]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}

"use client";

import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        {
          "bg-[var(--color-primary)]/10 text-[var(--color-primary)]":
            variant === "default",
          "bg-[var(--color-surface)] text-[var(--color-muted)]":
            variant === "secondary",
          "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300": variant === "success",
          "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300": variant === "warning",
          "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300": variant === "danger",
        },
        className
      )}
      {...props}
    />
  );
}

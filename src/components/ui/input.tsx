import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border-2 border-border dark:border-white/10 bg-white dark:bg-slate-800 px-4 py-2 text-sm text-navy dark:text-slate-200 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

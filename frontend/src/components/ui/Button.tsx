"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

const variants = {
  primary: "bg-[var(--terra)] text-white hover:bg-[var(--forest)] border-transparent",
  secondary: "bg-[var(--forest)] text-white hover:bg-[var(--terra)] border-transparent",
  outline: "bg-transparent text-[var(--ink-mid)] border-[var(--rule)] hover:bg-[var(--cream)] hover:text-[var(--ink)]",
  ghost: "bg-transparent text-[var(--ink-mid)] border-transparent hover:bg-[var(--cream)] hover:text-[var(--ink)]",
  danger: "bg-[var(--terra)] text-white hover:bg-red-600 border-transparent",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded",
        "border transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus:outline-none focus:ring-2 focus:ring-[var(--terra)] focus:ring-offset-2",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

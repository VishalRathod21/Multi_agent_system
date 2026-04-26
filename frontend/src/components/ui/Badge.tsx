"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  className?: string;
}

const variants = {
  default: "bg-[var(--cream)] text-[var(--ink-soft)] border-[var(--rule)]",
  primary: "bg-[var(--terra)] text-white border-transparent",
  success: "bg-[var(--forest)] text-white border-transparent",
  warning: "bg-[var(--gold)] text-white border-transparent",
  danger: "bg-red-500 text-white border-transparent",
  info: "bg-[var(--sky)] text-white border-transparent",
};

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

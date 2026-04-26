"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("bg-[var(--white)] border border-[var(--rule)] p-6 rounded", className)}>
      <div className="space-y-4">
        <div className="h-6 bg-[var(--cream)] rounded animate-pulse w-2/3" />
        <div className="h-4 bg-[var(--cream)] rounded animate-pulse w-full" />
        <div className="h-4 bg-[var(--cream)] rounded animate-pulse w-4/5" />
      </div>
    </div>
  );
}

export function SkeletonRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 p-4", className)}>
      <div className="h-10 w-10 bg-[var(--cream)] rounded animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-[var(--cream)] rounded animate-pulse w-1/3" />
        <div className="h-3 bg-[var(--cream)] rounded animate-pulse w-1/4" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex gap-4 p-4 bg-[var(--cream)]">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-4 bg-[var(--paper)] rounded animate-pulse flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border-b border-[var(--rule)]">
          {[1, 2, 3, 4, 5].map((j) => (
            <div key={j} className="h-4 bg-[var(--cream)] rounded animate-pulse flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonGrid({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

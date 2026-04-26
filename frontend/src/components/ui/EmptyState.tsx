"use client";

import { motion } from "framer-motion";
import { Search, FileX, FolderOpen, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: "search" | "file" | "folder" | "inbox";
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const icons = {
  search: Search,
  file: FileX,
  folder: FolderOpen,
  inbox: Inbox,
};

export default function EmptyState({ 
  icon = "inbox", 
  title, 
  description, 
  action,
  className 
}: EmptyStateProps) {
  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center",
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-[var(--cream)] border border-[var(--rule)] flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[var(--ink-soft)]" strokeWidth={1.5} />
      </div>
      <h3 className="font-[var(--font-dm-serif)] text-xl text-[var(--ink)] mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-[var(--ink-mid)] text-sm max-w-sm mb-6">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-[var(--terra)] text-white text-sm font-medium rounded
                     hover:bg-[var(--forest)] transition-colors duration-200"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}

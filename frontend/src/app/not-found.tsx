"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Home, AlertTriangle, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full text-center"
      >
        {/* Icon */}
        <div className="w-20 h-20 bg-[var(--terra)]/10 border border-[var(--terra)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-[var(--terra)]" />
        </div>

        {/* Error Code */}
        <h1 className="font-[var(--font-dm-serif)] text-8xl text-[var(--terra)] mb-2">
          404
        </h1>

        {/* Title */}
        <h2 className="font-[var(--font-dm-serif)] text-2xl text-[var(--ink)] mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-[var(--ink-mid)] font-[var(--font-dm-mono)] text-sm mb-8">
          The page you are looking for does not exist or has been moved.
          Please check the URL or return to the home page.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="flex-1">
            <Button variant="primary" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[var(--rule)]"
              style={{
                animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`
              }}
            />
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

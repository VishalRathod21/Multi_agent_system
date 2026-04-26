"use client";

import FormattedContent from "./FormattedContent";

interface ResultCardProps {
  icon: string;
  title: string;
  subtitle: string;
  content: string;
  color?: "blue" | "yellow" | "green" | "red" | "purple" | "gray";
}

const colorStyles = {
  blue: {
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
    border: "border-blue-200",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  yellow: {
    iconBg: "bg-amber-100",
    iconText: "text-amber-600",
    border: "border-amber-200",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  green: {
    iconBg: "bg-emerald-100",
    iconText: "text-emerald-600",
    border: "border-emerald-200",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  red: {
    iconBg: "bg-red-100",
    iconText: "text-red-600",
    border: "border-red-200",
    badge: "bg-red-50 text-red-700 border-red-200",
  },
  purple: {
    iconBg: "bg-purple-100",
    iconText: "text-purple-600",
    border: "border-purple-200",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
  gray: {
    iconBg: "bg-gray-100",
    iconText: "text-gray-600",
    border: "border-gray-200",
    badge: "bg-gray-50 text-gray-700 border-gray-200",
  },
};

export default function ResultCard({ icon, title, subtitle, content, color = "gray" }: ResultCardProps) {
  const styles = colorStyles[color];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className={`flex items-center gap-4 p-6 border-b ${styles.border} bg-gradient-to-r ${styles.iconBg}/10`}>
        <div className={`w-14 h-14 rounded-xl ${styles.iconBg} flex items-center justify-center text-2xl shadow-sm`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className={`text-xs font-mono tracking-wider uppercase ${styles.badge} inline-block px-3 py-1 rounded-full mt-2 border`}>
            {subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 bg-white">
        <div className="max-w-3xl">
          <FormattedContent content={content} />
        </div>
      </div>
    </div>
  );
}

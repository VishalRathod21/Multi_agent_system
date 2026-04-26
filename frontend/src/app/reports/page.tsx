"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { 
  FileText, Search, Plus, Eye, Download, Archive, 
  Star, Clock, FileEdit, CheckCircle2 
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  topic: string;
  date: string;
  status: "published" | "draft" | "archived";
  wordCount: number;
  rating: number;
}

const initialReports: Report[] = [
  { id: "1", title: "AI Agents Architecture Analysis", topic: "AI Agents", date: "2024-04-24 14:30", status: "published", wordCount: 2456, rating: 4.8 },
  { id: "2", title: "Market Trends Q1 2024 Report", topic: "Market Trends", date: "2024-04-24 12:15", status: "published", wordCount: 1823, rating: 4.5 },
  { id: "3", title: "Climate Technology Solutions Overview", topic: "Climate Tech", date: "2024-04-24 10:00", status: "draft", wordCount: 3124, rating: 0 },
  { id: "4", title: "Quantum Computing Advances 2024", topic: "Quantum Computing", date: "2024-04-23 18:45", status: "published", wordCount: 2891, rating: 4.9 },
  { id: "5", title: "Startup Funding Analysis Report", topic: "Startup Ideas", date: "2024-04-23 16:20", status: "archived", wordCount: 1567, rating: 4.2 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function StatusBadge({ status }: { status: string }) {
  const configs = {
    published: { variant: "success" as const, icon: CheckCircle2 },
    draft: { variant: "info" as const, icon: FileEdit },
    archived: { variant: "default" as const, icon: Archive },
  };
  const config = configs[status as keyof typeof configs] || configs.published;
  const Icon = config.icon;
  
  return (
    <Badge variant={config.variant} className="flex items-center gap-1 capitalize">
      <Icon className="w-3 h-3" />
      {status}
    </Badge>
  );
}

function StarRating({ rating }: { rating: number }) {
  if (rating === 0) return <span className="text-[var(--ink-soft)] text-sm">Not rated</span>;
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= Math.floor(rating)
              ? "fill-[var(--gold)] text-[var(--gold)]"
              : "text-[var(--rule)]"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-[var(--ink)]">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = reports.filter((report) => {
    const matchesFilter = filter === "all" || report.status === filter;
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: reports.length,
    published: reports.filter((r) => r.status === "published").length,
    draft: reports.filter((r) => r.status === "draft").length,
    archived: reports.filter((r) => r.status === "archived").length,
    avgRating: reports.filter((r) => r.rating > 0).reduce((acc, r) => acc + r.rating, 0) / 
               reports.filter((r) => r.rating > 0).length || 0,
    totalWords: reports.reduce((acc, r) => acc + r.wordCount, 0),
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-[var(--font-dm-serif)] text-3xl md:text-4xl text-[var(--ink)] mb-2">
              Research Reports
            </h1>
            <p className="text-[var(--ink-mid)] font-[var(--font-dm-mono)] text-sm tracking-wide">
              Manage and organize your research outputs
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-soft)]" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[var(--white)] border border-[var(--rule)] rounded text-sm text-[var(--ink)] placeholder:text-[var(--ink-soft)] focus:outline-none focus:border-[var(--terra)] focus:ring-1 focus:ring-[var(--terra)] w-full sm:w-64"
              />
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Reports", value: stats.total, icon: FileText },
            { label: "Published", value: stats.published, icon: CheckCircle2 },
            { label: "Drafts", value: stats.draft, icon: FileEdit },
            { label: "Avg Rating", value: stats.avgRating.toFixed(1), icon: Star },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-[var(--white)] border border-[var(--rule)] p-4 rounded"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4 text-[var(--terra)]" />
                <span className="text-[10px] font-[var(--font-dm-mono)] tracking-[2px] text-[var(--ink-soft)] uppercase">
                  {stat.label}
                </span>
              </div>
              <div className="font-[var(--font-dm-serif)] text-2xl text-[var(--forest)]">
                {stat.value}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {["all", "published", "draft", "archived"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-[11px] font-[var(--font-dm-mono)] tracking-[2px] uppercase rounded transition-all duration-200 ${
                filter === f
                  ? "bg-[var(--forest)] text-white"
                  : "bg-[var(--cream)] text-[var(--ink-mid)] hover:bg-[var(--paper)]"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Reports Grid */}
        {filteredReports.length === 0 ? (
          <EmptyState
            icon="folder"
            title="No reports found"
            description={searchQuery ? "No reports match your search." : "Start by creating your first research report."}
            action={{ label: "Create Report", onClick: () => {} }}
          />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredReports.map((report, index) => (
              <motion.div key={report.id} variants={itemVariants}>
                <Card hover className="h-full flex flex-col">
                  <CardContent className="p-5 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[var(--ink)] text-lg leading-tight truncate">
                          {report.title}
                        </h3>
                        <p className="text-sm text-[var(--ink-soft)] mt-1">{report.topic}</p>
                      </div>
                      <StatusBadge status={report.status} />
                    </div>

                    {/* Meta */}
                    <div className="space-y-2 py-3 border-y border-[var(--rule)] mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--ink-soft)] flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {report.date}
                        </span>
                        <span className="font-[var(--font-dm-mono)] text-[var(--ink-mid)]">
                          {report.wordCount.toLocaleString()} words
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--ink-soft)]">Rating</span>
                        <StarRating rating={report.rating} />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      <Button variant="secondary" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </MainLayout>
  );
}

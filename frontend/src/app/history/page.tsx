"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { Download, Trash2, Eye, FileText, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface ResearchHistory {
  id: string;
  topic: string;
  date: string;
  status: "completed" | "failed" | "running";
  duration: string;
  agents: string[];
}

const initialHistory: ResearchHistory[] = [
  { id: "1", topic: "AI Agents Architecture", date: "2024-04-24 14:30", status: "completed", duration: "3m 24s", agents: ["search", "reader", "writer", "critic"] },
  { id: "2", topic: "Market Trends Q1 2024", date: "2024-04-24 12:15", status: "completed", duration: "2m 45s", agents: ["search", "reader", "writer", "critic"] },
  { id: "3", topic: "Climate Technology Solutions", date: "2024-04-24 10:00", status: "failed", duration: "1m 12s", agents: ["search", "reader"] },
  { id: "4", topic: "Quantum Computing Advances", date: "2024-04-23 18:45", status: "completed", duration: "4m 30s", agents: ["search", "reader", "writer", "critic"] },
  { id: "5", topic: "Startup Funding Analysis", date: "2024-04-23 16:20", status: "running", duration: "1m 05s", agents: ["search", "reader", "writer"] },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

function StatusBadge({ status }: { status: string }) {
  const configs = {
    completed: { variant: "success" as const, icon: CheckCircle },
    failed: { variant: "danger" as const, icon: XCircle },
    running: { variant: "info" as const, icon: Loader2 },
  };
  const config = configs[status as keyof typeof configs] || configs.completed;
  const Icon = config.icon;
  
  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="w-3 h-3" />
      {status.toUpperCase()}
    </Badge>
  );
}

function AgentTag({ agent }: { agent: string }) {
  const icons: Record<string, string> = {
    search: "🔍", reader: "📖", writer: "✍️", critic: "🎯"
  };
  
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--cream)] border border-[var(--rule)] rounded text-[10px] font-[var(--font-dm-mono)] text-[var(--ink-mid)]">
      <span>{icons[agent] || "•"}</span>
      <span className="uppercase">{agent}</span>
    </span>
  );
}

export default function HistoryPage() {
  const [history, setHistory] = useState<ResearchHistory[]>(initialHistory);
  const [filter, setFilter] = useState<string>("all");

  const filteredHistory = filter === "all" 
    ? history 
    : history.filter(h => h.status === filter);

  const stats = {
    total: history.length,
    completed: history.filter(h => h.status === "completed").length,
    failed: history.filter(h => h.status === "failed").length,
    running: history.filter(h => h.status === "running").length,
    successRate: Math.round((history.filter(h => h.status === "completed").length / history.length) * 100),
  };

  const handleDelete = (id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id));
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
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-[var(--font-dm-serif)] text-3xl md:text-4xl text-[var(--ink)] mb-2">
              Research History
            </h1>
            <p className="text-[var(--ink-mid)] font-[var(--font-dm-mono)] text-sm tracking-wide">
              View and manage your past research sessions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="danger" size="sm" onClick={() => setHistory([])}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Sessions", value: stats.total, color: "text-[var(--ink)]" },
            { label: "Completed", value: stats.completed, color: "text-[var(--forest)]" },
            { label: "Failed", value: stats.failed, color: "text-[var(--terra)]" },
            { label: "Success Rate", value: `${stats.successRate}%`, color: "text-[var(--forest)]" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-[var(--white)] border border-[var(--rule)] p-4 rounded"
            >
              <div className="text-[10px] font-[var(--font-dm-mono)] tracking-[2px] text-[var(--ink-soft)] uppercase mb-1">
                {stat.label}
              </div>
              <div className={`font-[var(--font-dm-serif)] text-2xl ${stat.color}`}>
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
          {["all", "completed", "running", "failed"].map((f) => (
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

        {/* History Table */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {filteredHistory.length === 0 ? (
              <EmptyState
                icon="file"
                title="No history found"
                description={filter !== "all" ? `No ${filter} sessions found.` : "Your research history will appear here."}
                action={{ label: "Start Research", onClick: () => window.location.href = "/" }}
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--cream)] border-b border-[var(--rule)]">
                    <tr>
                      <th className="px-6 py-4 text-left text-[11px] font-[var(--font-dm-mono)] tracking-[2px] text-[var(--ink-soft)] uppercase">
                        Session
                      </th>
                      <th className="px-6 py-4 text-left text-[11px] font-[var(--font-dm-mono)] tracking-[2px] text-[var(--ink-soft)] uppercase">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-[11px] font-[var(--font-dm-mono)] tracking-[2px] text-[var(--ink-soft)] uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-[11px] font-[var(--font-dm-mono)] tracking-[2px] text-[var(--ink-soft)] uppercase">
                        Duration
                      </th>
                      <th className="px-6 py-4 text-left text-[11px] font-[var(--font-dm-mono)] tracking-[2px] text-[var(--ink-soft)] uppercase">
                        Agents
                      </th>
                      <th className="px-6 py-4 text-right text-[11px] font-[var(--font-dm-mono)] tracking-[2px] text-[var(--ink-soft)] uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--rule)]">
                    {filteredHistory.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-[var(--cream)]/50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[var(--cream)] border border-[var(--rule)] rounded flex items-center justify-center">
                              <FileText className="w-5 h-5 text-[var(--ink-soft)]" />
                            </div>
                            <div>
                              <p className="font-medium text-[var(--ink)]">{item.topic}</p>
                              <p className="text-[11px] text-[var(--ink-soft)] font-[var(--font-dm-mono)]">ID: {item.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[var(--ink-mid)] font-[var(--font-dm-mono)]">
                          {item.date}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-[var(--ink-mid)] font-[var(--font-dm-mono)]">
                            <Clock className="w-4 h-4" />
                            {item.duration}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {item.agents.map(agent => (
                              <AgentTag key={agent} agent={agent} />
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDelete(item.id)}
                              className="text-[var(--terra)] hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </MainLayout>
  );
}

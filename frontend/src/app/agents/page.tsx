"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Settings, Play, Pause, Activity, Clock, TrendingUp } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  role: string;
  status: "active" | "idle" | "error";
  performance: number;
  lastRun: string;
  totalRuns: number;
  successRate: number;
}

const initialAgents: Agent[] = [
  { id: "search", name: "Search Agent", role: "Web Crawler", status: "idle", performance: 95, lastRun: "2 hours ago", totalRuns: 42, successRate: 98 },
  { id: "reader", name: "Reader Agent", role: "Document Parser", status: "active", performance: 88, lastRun: "5 mins ago", totalRuns: 38, successRate: 94 },
  { id: "writer", name: "Writer Agent", role: "Content Synthesizer", status: "idle", performance: 92, lastRun: "1 hour ago", totalRuns: 35, successRate: 96 },
  { id: "critic", name: "Critic Agent", role: "Quality Validator", status: "idle", performance: 90, lastRun: "3 hours ago", totalRuns: 33, successRate: 93 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const toggleAgentStatus = (id: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id 
        ? { ...agent, status: agent.status === "active" ? "idle" : "active" }
        : agent
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="success">ACTIVE</Badge>;
      case "error": return <Badge variant="danger">ERROR</Badge>;
      default: return <Badge variant="default">IDLE</Badge>;
    }
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
          className="mb-8"
        >
          <h1 className="font-[var(--font-dm-serif)] text-3xl md:text-4xl text-[var(--ink)] mb-2">
            Agent Management
          </h1>
          <p className="text-[var(--ink-mid)] font-[var(--font-dm-mono)] text-sm tracking-wide">
            Configure and monitor your multi-agent research pipeline
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Agents", value: agents.length.toString(), icon: Activity },
            { label: "Active Now", value: agents.filter(a => a.status === "active").length.toString(), icon: Play },
            { label: "Avg Performance", value: `${Math.round(agents.reduce((a, b) => a + b.performance, 0) / agents.length)}%`, icon: TrendingUp },
            { label: "Total Runs", value: agents.reduce((a, b) => a + b.totalRuns, 0).toString(), icon: Clock },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-[var(--white)] border border-[var(--rule)] p-5 rounded"
            >
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="w-5 h-5 text-[var(--terra)]" />
                <span className="text-[10px] font-[var(--font-dm-mono)] tracking-[2px] text-[var(--ink-soft)] uppercase">
                  {stat.label}
                </span>
              </div>
              <div className="font-[var(--font-dm-serif)] text-3xl text-[var(--forest)]">
                {stat.value}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Agent Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {agents.map((agent) => (
            <motion.div key={agent.id} variants={itemVariants}>
              <Card 
                hover 
                className={cn(
                  "transition-all duration-300",
                  selectedAgent === agent.id && "ring-2 ring-[var(--terra)]"
                )}
                onClick={() => setSelectedAgent(agent.id === selectedAgent ? null : agent.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[var(--cream)] border border-[var(--rule)] rounded flex items-center justify-center">
                        <span className="text-2xl">
                          {agent.id === "search" ? "🔍" : 
                           agent.id === "reader" ? "📖" : 
                           agent.id === "writer" ? "✍️" : "🎯"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--ink)] text-lg">{agent.name}</h3>
                        <p className="text-sm text-[var(--ink-soft)] font-[var(--font-dm-mono)] tracking-wide">
                          {agent.role}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(agent.status)}
                  </div>

                  {/* Performance Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-[var(--ink-soft)] font-[var(--font-dm-mono)]">Performance</span>
                      <span className="text-[var(--forest)] font-medium">{agent.performance}%</span>
                    </div>
                    <div className="w-full bg-[var(--cream)] rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-[var(--forest)] h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${agent.performance}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 py-3 border-t border-[var(--rule)] text-center">
                    <div>
                      <div className="text-lg font-[var(--font-dm-serif)] text-[var(--forest)]">{agent.totalRuns}</div>
                      <div className="text-[9px] text-[var(--ink-soft)] font-[var(--font-dm-mono)] tracking-wide">TOTAL RUNS</div>
                    </div>
                    <div>
                      <div className="text-lg font-[var(--font-dm-serif)] text-[var(--forest)]">{agent.successRate}%</div>
                      <div className="text-[9px] text-[var(--ink-soft)] font-[var(--font-dm-mono)] tracking-wide">SUCCESS</div>
                    </div>
                    <div>
                      <div className="text-lg font-[var(--font-dm-serif)] text-[var(--forest)]">{agent.lastRun}</div>
                      <div className="text-[9px] text-[var(--ink-soft)] font-[var(--font-dm-mono)] tracking-wide">LAST RUN</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-[var(--rule)]">
                    <Button
                      variant={agent.status === "active" ? "secondary" : "primary"}
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAgentStatus(agent.id);
                      }}
                    >
                      {agent.status === "active" ? (
                        <><Pause className="w-4 h-4" /> Stop</>
                      ) : (
                        <><Play className="w-4 h-4" /> Start</>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}

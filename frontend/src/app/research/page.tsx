"use client";

import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowRight, Sparkles, History, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

const recentTopics = [
  { name: "AI Agents", count: 12 },
  { name: "Market Trends", count: 8 },
  { name: "Climate Tech", count: 5 },
];

const quickActions = [
  { name: "New Research", icon: Sparkles, href: "/", color: "bg-[var(--terra)]" },
  { name: "View History", icon: History, href: "/history", color: "bg-[var(--forest)]" },
  { name: "Reports", icon: TrendingUp, href: "/reports", color: "bg-[var(--sky)]" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ResearchPage() {
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
            Research Dashboard
          </h1>
          <p className="text-[var(--ink-mid)] font-[var(--font-dm-mono)] text-sm tracking-wide">
            Start new research sessions and track your progress
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {quickActions.map((action) => (
            <motion.div key={action.name} variants={itemVariants}>
              <Link href={action.href}>
                <Card 
                  hover 
                  className="h-full cursor-pointer group"
                >
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-110`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--ink)] text-lg">{action.name}</h3>
                      <p className="text-sm text-[var(--ink-soft)]">Click to get started</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[var(--ink-soft)] group-hover:text-[var(--terra)] group-hover:translate-x-1 transition-all" />
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Research */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[var(--terra)]" />
                  Active Research
                </CardTitle>
                <CardDescription>
                  Currently running research sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 bg-[var(--cream)] border border-[var(--rule)] rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-[var(--ink-soft)]" />
                  </div>
                  <p className="text-[var(--ink-mid)] mb-4">No active research sessions</p>
                  <Link href="/">
                    <Button size="sm">Start New Research</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
                <CardDescription>
                  Your most researched subjects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTopics.map((topic, index) => (
                    <div
                      key={topic.name}
                      className="flex items-center justify-between p-3 bg-[var(--cream)] border border-[var(--rule)] rounded hover:border-[var(--terra)] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-[var(--forest)] text-white rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </span>
                        <span className="font-medium text-[var(--ink)]">{topic.name}</span>
                      </div>
                      <span className="text-sm text-[var(--ink-soft)] font-[var(--font-dm-mono)]">
                        {topic.count} sessions
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tips Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="h-full bg-gradient-to-br from-[var(--forest)] to-[var(--forest-lt)] text-white">
              <CardHeader>
                <CardTitle className="text-white">Pro Tips</CardTitle>
                <CardDescription className="text-white/70">
                  Get the most out of Cortex
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--gold)]">•</span>
                    Use Deep Research mode for comprehensive analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--gold)]">•</span>
                    Combine multiple agents for better results
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--gold)]">•</span>
                    Review agent feedback in the Live Activity panel
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--gold)]">•</span>
                    Export your research history regularly
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
}

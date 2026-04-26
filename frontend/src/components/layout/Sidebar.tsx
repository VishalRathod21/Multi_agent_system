"use client";

import { useState, useEffect } from "react";

interface Agent {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  status: "standby" | "running" | "done";
}

const defaultAgents: Agent[] = [
  { id: "search", name: "Search", desc: "Web crawler · source discovery", emoji: "🔍", status: "standby" },
  { id: "reader", name: "Reader", desc: "Document parser · extraction", emoji: "📖", status: "running" },
  { id: "writer", name: "Writer", desc: "Synthesis · report drafting", emoji: "✍️", status: "standby" },
  { id: "critic", name: "Critic", desc: "QA validator · fact checker", emoji: "🎯", status: "standby" },
];

export default function Sidebar() {
  const [agents, setAgents] = useState<Agent[]>(defaultAgents);
  const [completed, setCompleted] = useState(0);
  const [active, setActive] = useState(1);
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(8 + Math.random() * 14));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAgentClick = (id: string) => {
    setAgents(prev => prev.map(agent => ({
      ...agent,
      status: agent.id === id ? "running" : "standby"
    })));
    setActive(1);
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "running":
        return "border-[#F5C842] bg-[#FEF3DC]";
      case "done":
        return "border-[#A8D5B5] bg-[#D8F3DC]";
      default:
        return "border-[#E8E4DA] bg-[#F8F6F1]";
    }
  };

  const getBadgeClasses = (status: string) => {
    switch (status) {
      case "running":
        return "bg-[#D4820A] text-white";
      case "done":
        return "bg-[#2D6A4F] text-white";
      default:
        return "bg-[#F8F6F1] text-[#9A9A8E] border border-[#E8E4DA]";
    }
  };

  const getProgressClasses = (status: string) => {
    switch (status) {
      case "running":
        return "bg-[#D4820A] animate-[panim_3s_ease-in-out_infinite]";
      case "done":
        return "bg-[#2D6A4F] w-full";
      default:
        return "bg-[#9A9A8E] w-0";
    }
  };

  return (
    <>
      {/* Header */}
      <div className="px-7 py-7 pb-5 border-b border-[#E8E4DA]">
        <div className="font-serif text-[22px] font-bold text-[#1A1A18] mb-1">Live Activity</div>
        <div className="font-mono text-[10px] text-[#9A9A8E] tracking-[1.5px]">REAL-TIME AGENT EXECUTION</div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 border-b border-[#E8E4DA]">
        <div className="px-4 py-[18px] border-r border-[#E8E4DA] text-center">
          <div className="font-serif text-[28px] font-bold text-[#1A1A18] leading-none">{completed}</div>
          <div className="font-mono text-[9px] text-[#9A9A8E] tracking-[1.5px] mt-1">COMPLETED</div>
        </div>
        <div className="px-4 py-[18px] border-r border-[#E8E4DA] text-center">
          <div className="font-serif text-[28px] font-bold text-[#1A1A18] leading-none">{active}</div>
          <div className="font-mono text-[9px] text-[#9A9A8E] tracking-[1.5px] mt-1">ACTIVE</div>
        </div>
        <div className="px-4 py-[18px] text-center">
          <div className="font-serif text-[28px] font-bold text-[#1A1A18] leading-none">{latency}ms</div>
          <div className="font-mono text-[9px] text-[#9A9A8E] tracking-[1.5px] mt-1">LATENCY</div>
        </div>
      </div>

      {/* Agents Header */}
      <div className="px-7 py-5 pb-3 flex items-center gap-2">
        <span className="font-bold text-[13px] tracking-[0.3px]">Agents</span>
        <div className="ml-auto flex items-center gap-[5px] font-mono text-[10px] text-[#40B97A] tracking-[1px]">
          <div className="w-[7px] h-[7px] rounded-full bg-[#40B97A] animate-pulse" />
          Live
        </div>
      </div>

      {/* Agents List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-2">
        {agents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => handleAgentClick(agent.id)}
            className={`flex items-center gap-[14px] px-4 py-[14px] rounded-[12px] border-[1.5px] cursor-pointer transition-all relative overflow-hidden hover:border-[#D0CBBB] hover:-translate-x-[2px] ${getStatusClasses(agent.status)} ${agent.status === "running" ? 'after:content-[""] after:absolute after:top-0 after:left-[-100%] after:w-[60%] after:h-full after:bg-gradient-to-r after:from-transparent after:via-white/35 after:to-transparent after:animate-[shimmer_2.2s_ease-in-out_infinite]' : ''}`}
          >
            <div className={`w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[17px] shrink-0 bg-white border border-[#E8E4DA] ${agent.status === "running" ? 'bg-white/70 border-[rgba(212,130,10,0.3)]' : ''}`}>
              {agent.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[14px] text-[#1A1A18]">{agent.name}</div>
              <div className="font-mono text-[10px] text-[#9A9A8E] tracking-[0.5px] mt-[2px]">{agent.desc}</div>
            </div>
            <div className="flex flex-col items-end gap-[6px] shrink-0">
              <div className={`font-mono text-[9px] tracking-[1.5px] font-medium px-[9px] py-[3px] rounded-full ${getBadgeClasses(agent.status)}`}>
                {agent.status === "running" ? "RUNNING" : agent.status === "done" ? "DONE" : "STANDBY"}
              </div>
              <div className="w-[60px] h-[3px] rounded-full bg-black/8 overflow-hidden">
                <div className={`h-full rounded-full ${getProgressClasses(agent.status)}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Log */}
      <div className="border-t border-[#E8E4DA] px-5 py-[14px]">
        <div className="font-mono text-[9px] tracking-[2px] text-[#9A9A8E] mb-2">SYSTEM LOG</div>
        <div className="flex items-baseline gap-2 font-mono text-[11px] leading-[1.9] text-[#4A4A44]">
          <span className="text-[#40B97A]">[OK]</span>
          <span>Agent pool initialised — 4 threads ready</span>
        </div>
        <div className="flex items-baseline gap-2 font-mono text-[11px] leading-[1.9] text-[#4A4A44]">
          <span className="text-[#D4820A]">[—]</span>
          <span>Awaiting query input…</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes panim {
          0% { width: 52% }
          50% { width: 84% }
          100% { width: 52% }
        }
        @keyframes shimmer {
          to { left: 160% }
        }
      `}</style>
    </>
  );
}

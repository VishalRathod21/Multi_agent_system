"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-[68px] bg-white border-b border-[#E8E4DA] flex items-center px-10 gap-0 font-sans">
      {/* Logo */}
      <div className="flex items-center gap-[14px]">
        <div className="w-[36px] h-[36px] rounded-[10px] bg-[#1A1A18] flex items-center justify-center font-serif text-[16px] text-white italic">
          Cx
        </div>
        <div>
          <div className="font-extrabold text-[18px] tracking-[-0.3px] text-[#1A1A18]">
            Cortex
          </div>
          <div className="font-mono text-[10px] text-[#9A9A8E] tracking-[1px] mt-[1px]">
            AI RESEARCH CENTRE
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-[1px] h-[32px] bg-[#E8E4DA] mx-8" />

      {/* Status */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-[7px] font-mono text-[11px] text-[#4A4A44] tracking-[0.5px]">
          <div className="w-[7px] h-[7px] rounded-full bg-[#40B97A] animate-pulse" />
          System online
        </div>
        <div className="flex items-center gap-[7px] font-mono text-[11px] text-[#4A4A44] tracking-[0.5px]">
          <div className="w-[7px] h-[7px] rounded-full bg-[#F5C842]" />
          4 agents ready
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Clock */}
      <div className="font-mono text-[13px] text-[#9A9A8E] tracking-[1px]">
        {time}
      </div>
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#F8F6F1] flex flex-col font-sans text-[#1A1A18]">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 flex flex-col relative overflow-y-auto">
          {children}
        </main>
        <aside className="w-[360px] bg-white border-l border-[#E8E4DA] flex flex-col overflow-hidden hidden lg:flex">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}

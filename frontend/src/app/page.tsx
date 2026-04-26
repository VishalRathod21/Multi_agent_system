"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ResultCard from "@/components/ResultCard";

interface ResearchResult {
  topic: string;
  chosen_url: string | null;
  search: string;
  reader: string;
  writer: string;
  critic: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"quick" | "deep">("quick");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);

  const suggestions = [
    "AI Agents",
    "Startup Ideas",
    "Market Trends",
    "Deep Learning",
    "Quantum Computing",
    "Climate Tech",
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResult(null);
    try {
      const response = await fetch("http://localhost:8001/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: query }),
      });
      const data = await response.json();
      console.log("Research result:", data);
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to run research. Please check if backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    setQuery(topic);
  };

  return (
    <MainLayout>
      {/* Background Shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[-55%] w-[500px] h-[500px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(212,130,10,0.06)_0%,transparent_70%)]" />

      {/* Content */}
      <div className={`px-[72px] ${result ? 'pt-8' : 'py-[60px]'} relative z-10 ${result ? '' : 'flex-1 flex flex-col justify-center'}`}>
        {/* Eyebrow */}
        <p className="font-mono text-[11px] tracking-[3px] text-[#D4820A] mb-4">
          RESEARCH · SYNTHESISE · DISCOVER
        </p>

        {/* Headline */}
        <h1 className="font-serif text-[52px] leading-[1.1] font-bold text-[#1A1A18] mb-[10px]">
          What do you<br />want to <em className="text-[#D4820A] italic">learn</em><br />today?
        </h1>

        {/* Sub Copy */}
        <p className="text-[15px] text-[#9A9A8E] leading-[1.6] mb-10 max-w-[420px]">
          Ask anything. Cortex deploys AI agents to search, read, and write a comprehensive answer for you.
        </p>

        {/* Search Input */}
        <div className="bg-white border-[1.5px] border-[#1A1A18] rounded-[14px] overflow-hidden flex items-center transition-shadow max-w-[560px] focus-within:shadow-[0_0_0_3px_rgba(212,130,10,0.2)] focus-within:border-[#D4820A]">
          <div className="px-4 pl-5 text-[#9A9A8E]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-[18px] h-[18px]">
              <circle cx="11" cy="11" r="7"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a topic, question, or idea…"
            className="flex-1 border-none outline-none font-sans text-[15px] text-[#1A1A18] bg-transparent py-4"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="m-[6px] px-[22px] py-[10px] bg-[#1A1A18] border-none rounded-[10px] text-white font-sans font-bold text-[14px] cursor-pointer transition-all whitespace-nowrap shrink-0 hover:bg-[#D4820A] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Running..." : "Research →"}
          </button>
        </div>

        {/* Topics Label */}
        <p className="font-mono text-[10px] tracking-[2px] text-[#9A9A8E] mt-7 mb-3">
          SUGGESTED TOPICS
        </p>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 max-w-[560px]">
          {suggestions.map((topic) => (
            <button
              key={topic}
              onClick={() => handleTopicClick(topic)}
              className={`px-4 py-2 bg-white border-[1.5px] rounded-full text-[13px] font-medium cursor-pointer transition-all select-none ${
                selectedTopic === topic
                  ? "border-[#D4820A] text-[#D4820A] bg-[#FEF3DC]"
                  : "border-[#E8E4DA] text-[#4A4A44] hover:border-[#D4820A] hover:text-[#D4820A] hover:bg-[#FEF3DC]"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-[10px] mt-6 items-center">
          <span className="font-mono text-[10px] tracking-[2px] text-[#9A9A8E] mr-1">MODE</span>
          <button
            onClick={() => setMode("quick")}
            className={`flex items-center gap-[7px] px-[18px] py-[9px] rounded-full border-[1.5px] text-[13px] font-bold cursor-pointer transition-all ${
              mode === "quick"
                ? "bg-[#1A1A18] border-[#1A1A18] text-white"
                : "bg-transparent border-[#E8E4DA] text-[#9A9A8E] hover:border-[#4A4A44] hover:text-[#4A4A44]"
            }`}
          >
            <div className={`w-[7px] h-[7px] rounded-full ${mode === "quick" ? "bg-[#40B97A]" : "bg-[#9A9A8E] opacity-40"}`} />
            Quick
          </button>
          <button
            onClick={() => setMode("deep")}
            className={`flex items-center gap-[7px] px-[18px] py-[9px] rounded-full border-[1.5px] text-[13px] font-bold cursor-pointer transition-all ${
              mode === "deep"
                ? "bg-[#1A1A18] border-[#1A1A18] text-white"
                : "bg-transparent border-[#E8E4DA] text-[#9A9A8E] hover:border-[#4A4A44] hover:text-[#4A4A44]"
            }`}
          >
            <div className={`w-[7px] h-[7px] rounded-full ${mode === "deep" ? "bg-[#40B97A]" : "bg-[#9A9A8E] opacity-40"}`} />
            Deep Research
          </button>
        </div>
      </div>

      {/* Results Display */}
      {result && (
        <div className="px-[72px] pb-[60px] border-t border-[#E8E4DA]">
          <h2 className="font-serif text-[28px] font-bold text-[#1A1A18] mb-6">Research Results</h2>
          
          {/* Topic */}
          <div className="mb-8">
            <span className="font-mono text-[10px] tracking-[2px] text-[#9A9A8E]">TOPIC</span>
            <p className="font-serif text-[22px] font-bold text-[#1A1A18] mt-2">{result.topic}</p>
          </div>

          <div className="space-y-6 max-w-4xl">
            {result.chosen_url && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-bold text-[18px] text-gray-900 mb-3">🔗 Selected Source</h3>
                <a href={result.chosen_url} target="_blank" rel="noopener noreferrer" className="text-[#D4820A] hover:underline break-all text-sm">
                  {result.chosen_url}
                </a>
              </div>
            )}
            
            <ResultCard
              icon="🔍"
              title="Search Agent"
              subtitle="Web Crawler"
              content={result.search || "No search results available"}
              color="blue"
            />
            
            <ResultCard
              icon="📖"
              title="Reader Agent"
              subtitle="Document Parser"
              content={result.reader || "No reader analysis available"}
              color="yellow"
            />
            
            <ResultCard
              icon="✍️"
              title="Writer Agent"
              subtitle="Content Synthesizer"
              content={result.writer || "No synthesis available"}
              color="green"
            />
            
            <ResultCard
              icon="🎯"
              title="Critic Agent"
              subtitle="QA Validator"
              content={result.critic || "No critique available"}
              color="red"
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
}

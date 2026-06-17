"use client";

import React, { useEffect, useRef } from "react";
import { Terminal, Shield } from "lucide-react";

interface LogMessage {
  timestamp: string;
  timeOffset: string;
  agent: string;
  status: string;
  message: string;
}

interface AgentTerminalProps {
  displayedLogs: LogMessage[];
  simState: "normal" | "earthquake" | "flood";
}

export const AgentTerminal: React.FC<AgentTerminalProps> = ({
  displayedLogs,
}) => {
  const consoleScreenRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the bottom of the terminal on new logs without scrolling the whole page
  useEffect(() => {
    if (consoleScreenRef.current) {
      consoleScreenRef.current.scrollTo({
        top: consoleScreenRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [displayedLogs]);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mt-10 w-full">
      <div className="glass-panel border border-cyber-border rounded-xl overflow-hidden shadow-glass-shadow cyber-corner-box">
        {/* Terminal Header */}
        <div className="bg-black/80 px-5 py-3 border-b border-cyber-border/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-cyber-cyan animate-pulse" />
            <span className="font-orbitron font-bold text-xs tracking-wider text-white">
              COGNITIVE AGENTS DECISION LOG TERMINAL
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono text-cyber-gray">
            <span className="flex items-center gap-1">
              <Shield size={12} className="text-cyber-success" />
              Consensus: <span className="text-cyber-success font-bold">100% SECURE</span>
            </span>
            <span className="hidden sm:inline text-cyber-cyan/30">|</span>
            <span className="hidden sm:inline">Channel: 868M_MESH</span>
            <span className="text-cyber-cyan/30">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-cyber-orange rounded-full animate-ping" />
              STREAMING
            </span>
          </div>
        </div>

        {/* Console Screen */}
        <div
          ref={consoleScreenRef}
          className="bg-slate-950/90 p-5 font-mono text-xs text-cyber-gray min-h-[300px] max-h-[400px] overflow-y-auto flex flex-col gap-3 scrollbar-thin select-none relative scanline-effect"
        >
          {/* Subtle grid lines background overlay */}
          <div className="absolute inset-0 cyber-grid-dense opacity-[0.03] pointer-events-none" />

          {/* Static initialization code lines */}
          <div className="opacity-50 text-[10px] border-b border-cyber-border/10 pb-2">
            <div>&gt;&gt; SHINKANSEN SWARM AI ARCHITECTURE BOOTSTRAPPED SUCCESS.</div>
            <div>&gt;&gt; NODE ADDRESS: L0-MAGLEV-SHI-Z4 // PRIVATE MESH ACTIVE.</div>
            <div>&gt;&gt; SYNCED GEOPHONE SENSOR ARRAY: 1,200 NODES OPERATIONAL.</div>
          </div>

          {/* Render Log Messages */}
          {displayedLogs.map((log, index) => {
            const isAlert = log.status === "EMERGENCY_ALERT" || log.status === "CRITICAL";
            const isSolving = log.status === "SOLVING" || log.status === "PROCESSING";
            
            let colorClass = "text-cyber-cyan";
            let prefix = "[INFO]";
            if (isAlert) {
              colorClass = "text-cyber-alert font-bold";
              prefix = "[ALERT]";
            } else if (isSolving) {
              colorClass = "text-cyber-orange";
              prefix = "[SOLVING]";
            } else if (log.status === "SUCCESS" || log.status === "RESOLVED" || log.status === "MONITORING" && log.message.includes("🟢") || log.message.includes("✅")) {
              colorClass = "text-cyber-success";
              prefix = "[RESOLVED]";
            }

            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-start gap-1 border-l-2 border-cyber-border/20 pl-3 py-0.5 hover:bg-white/5 transition-colors rounded-r"
              >
                {/* Timestamp & Offset */}
                <div className="flex gap-2 text-[10px] text-cyber-gray shrink-0 font-bold">
                  <span>[{log.timestamp}]</span>
                  <span className="text-cyber-orange">{log.timeOffset}</span>
                </div>

                {/* Source Agent */}
                <div className="text-white shrink-0 font-bold min-w-[130px] text-[11px]">
                  {log.agent}
                </div>

                {/* Log Content */}
                <div className={`leading-relaxed break-words ${colorClass}`}>
                  <span className="text-[10px] opacity-75 mr-1.5 font-bold font-mono">
                    {prefix}
                  </span>
                  {log.message}
                </div>
              </div>
            );
          })}

          {/* Dynamic blinking cursor line */}
          <div className="flex items-center gap-1.5 pl-3 border-l-2 border-transparent">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
            <span className="text-cyber-cyan text-[11px] animate-pulse">
              Awaiting telemetry signals...
            </span>
            <span className="animate-flicker">_</span>
          </div>
        </div>

        {/* Terminal Footer Info */}
        <div className="bg-black/90 border-t border-cyber-border/20 px-5 py-2 flex items-center justify-between text-[9px] font-mono text-cyber-gray">
          <span>PACKETS RX: {displayedLogs.length * 12 + 254} | TX: {displayedLogs.length * 8 + 104}</span>
          <span>MESH ERROR RATE: 0.000%</span>
          <span>NODE: SHINKANSEN_MASTER</span>
        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import { TrainData, AgentStatus } from "@/utils/mockData";
import { Activity, Gauge, Navigation, Zap, ShieldAlert, Cpu } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardStatsProps {
  trains: TrainData[];
  agents: AgentStatus[];
  riskScore: number;
  simState: "normal" | "earthquake" | "flood";
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  trains,
  agents,
  riskScore,
  simState,
}) => {
  // Seismic wiggling wave logic
  const [wavePoints, setWavePoints] = useState<number[]>(Array(40).fill(25));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setWavePoints((prev) => {
      const nextPoints = [...prev.slice(1)];
      let newPoint = 25; // center vertical line in 50px height box

      if (simState === "earthquake") {
        // High frequency, high amplitude seismic vibrations
        newPoint = 25 + (Math.random() - 0.5) * 45;
      } else if (simState === "flood") {
        // Slow rising sinusoidal water wave
        newPoint = 25 + Math.sin(tick * 0.4) * 20 + (Math.random() - 0.5) * 5;
      } else {
        // Normal micro-vibration
        newPoint = 25 + (Math.random() - 0.5) * 6;
      }
      nextPoints.push(newPoint);
      return nextPoints;
    });
  }, [tick, simState]);

  // Generate SVG path for the wave
  const pathD = wavePoints
    .map((y, index) => `${index === 0 ? "M" : "L"} ${index * 8} ${y}`)
    .join(" ");

  return (
    <section className="grid lg:grid-cols-12 gap-6 w-full max-w-7xl mx-auto px-4 md:px-8 mt-6">
      {/* Train 1 & 2 Cards (Left - 8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <h2 className="text-lg font-orbitron font-bold text-cyber-cyan tracking-wider flex items-center gap-2 border-b border-cyber-border/40 pb-2">
          <Navigation size={18} /> ACTIVE TRAIN TELEMETRY CORRIDORS
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {trains.map((train) => {
            const isEmergency = train.status === "Emergency Stop" || train.status === "Decelerating";
            const isDiverted = train.status === "Diverted";

            return (
              <div
                key={train.id}
                className={`relative glass-panel rounded-xl p-5 border overflow-hidden transition-all duration-300 ${
                  isEmergency
                    ? "border-cyber-alert/50 shadow-red-glow/20"
                    : isDiverted
                    ? "border-cyber-orange/50 shadow-orange-glow/20"
                    : "border-cyber-border hover:border-cyber-cyan/50 shadow-glass-shadow"
                } cyber-corner-box`}
              >
                {/* Glowing alert ring when emergency */}
                {isEmergency && (
                  <div className="absolute inset-0 bg-cyber-alert/5 animate-pulse-slow pointer-events-none" />
                )}

                {/* Train Name and status header */}
                <div className="flex items-start justify-between border-b border-cyber-border/20 pb-3">
                  <div>
                    <h3 className="font-orbitron font-black text-sm text-white">{train.name}</h3>
                    <p className="text-[10px] font-mono text-cyber-gray mt-0.5">{train.route}</p>
                  </div>
                  <span
                    className={`font-mono text-[9px] px-2 py-0.5 rounded border ${
                      isEmergency
                        ? "bg-red-950/40 border-red-500/50 text-cyber-alert font-bold animate-pulse"
                        : isDiverted
                        ? "bg-orange-950/40 border-cyber-orange/50 text-cyber-orange font-bold"
                        : "bg-green-950/40 border-cyber-success/50 text-cyber-success"
                    }`}
                  >
                    {train.status.toUpperCase()}
                  </span>
                </div>

                {/* Main Speed Indicator */}
                <div className="my-5 flex items-baseline justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-cyber-gray tracking-wider">LIVE BOGIE SPEED</span>
                    <span className="text-4xl font-black font-orbitron text-white mt-1 flex items-baseline gap-1">
                      {train.speed}
                      <span className="text-xs font-mono font-normal text-cyber-gray">KM/H</span>
                    </span>
                  </div>
                  <Gauge size={32} className={isEmergency ? "text-cyber-alert animate-bounce" : "text-cyber-cyan"} />
                </div>

                {/* Technical readouts grid */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-cyber-border/20 text-xs font-mono">
                  {/* Vibration */}
                  <div className="flex items-center gap-2 bg-black/20 p-2 border border-cyber-border/10 rounded">
                    <Activity size={14} className="text-cyber-cyan" />
                    <div>
                      <div className="text-[8px] text-cyber-gray">VIBRATION</div>
                      <div className="font-bold text-white">{train.vibration.toFixed(1)} Hz</div>
                    </div>
                  </div>

                  {/* Battery */}
                  <div className="flex items-center gap-2 bg-black/20 p-2 border border-cyber-border/10 rounded">
                    <Zap size={14} className="text-cyber-orange" />
                    <div>
                      <div className="text-[8px] text-cyber-gray">CAPACITOR</div>
                      <div className="font-bold text-white">{train.battery}%</div>
                    </div>
                  </div>

                  {/* Brakes */}
                  <div className="flex items-center gap-2 bg-black/20 p-2 border border-cyber-border/10 rounded">
                    <ShieldAlert size={14} className="text-cyber-alert" />
                    <div>
                      <div className="text-[8px] text-cyber-gray">BRAKES</div>
                      <div className="font-bold text-white">{train.brakes}</div>
                    </div>
                  </div>

                  {/* Cabin Location */}
                  <div className="flex items-center gap-2 bg-black/20 p-2 border border-cyber-border/10 rounded">
                    <Navigation size={14} className="text-cyber-cyan" />
                    <div>
                      <div className="text-[8px] text-cyber-gray">LOCATION</div>
                      <div className="font-bold text-white truncate max-w-[90px]">{train.location.split(" (")[0]}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real-time Oscilloscope/Seismograph Screen */}
        <div className="glass-panel border border-cyber-border rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden cyber-corner-box">
          <div className="flex items-center justify-between">
            <span className="font-orbitron font-bold text-xs text-cyber-cyan tracking-wider flex items-center gap-1.5">
              <Activity size={14} /> DYNAMIC SEISMIC & HYDRO WAVE MONITOR
            </span>
            <span className="font-mono text-[9px] text-cyber-gray">
              {simState === "earthquake"
                ? "WARNING: CRITICAL FREQUENCY RANGE EXCEEDED"
                : simState === "flood"
                ? "ALERT: HYDROLOGICAL DISPLACEMENT DETECTED"
                : "STATUS: NORMAL SEISMIC TELEMETRY"}
            </span>
          </div>

          <div className="bg-black/50 border border-cyber-cyan/15 rounded-lg h-16 relative flex items-center px-4 overflow-hidden">
            {/* Grid background lines */}
            <div className="absolute inset-0 cyber-grid-dense opacity-20" />
            <div className="absolute left-0 right-0 h-[1px] bg-cyber-cyan/10" style={{ top: "50%" }} />

            {/* Glowing wave path */}
            <svg className="w-full h-full absolute inset-0 z-10" preserveAspectRatio="none" viewBox="0 0 320 50">
              <path
                d={pathD}
                fill="none"
                stroke={
                  simState === "earthquake"
                    ? "#ef4444"
                    : simState === "flood"
                    ? "#ff6c00"
                    : "#00f3ff"
                }
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-100"
              />
            </svg>

            {/* Glowing sweep dot */}
            <span className={`absolute right-4 w-2 h-2 rounded-full z-20 ${
              simState === "earthquake" ? "bg-cyber-alert animate-ping" : simState === "flood" ? "bg-cyber-orange animate-ping" : "bg-cyber-cyan animate-ping"
            }`} />
          </div>
        </div>
      </div>

      {/* Disaster Meter & AI Agent Panel (Right - 4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <h2 className="text-lg font-orbitron font-bold text-cyber-cyan tracking-wider flex items-center gap-2 border-b border-cyber-border/40 pb-2">
          <Cpu size={18} /> THREAT ASSESSMENT
        </h2>

        {/* Disaster risk dial card */}
        <div className="glass-panel border border-cyber-border rounded-xl p-5 flex flex-col items-center justify-center text-center relative overflow-hidden cyber-corner-box">
          <span className="text-[10px] font-mono text-cyber-gray tracking-widest block mb-4 uppercase">
            Systemic Hazard Risk Index
          </span>

          {/* Radial progress ring */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG circle container */}
            <svg className="w-full h-full transform -rotate-90">
              {/* Back track */}
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="rgba(6,182,212,0.08)"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Foreground stroke */}
              <motion.circle
                cx="72"
                cy="72"
                r="60"
                stroke={riskScore > 50 ? "#ef4444" : riskScore > 10 ? "#ff6c00" : "#00f3ff"}
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 60}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 60 * (1 - riskScore / 100),
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>

            {/* Center percentage text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-black font-orbitron ${
                riskScore > 50 ? "text-cyber-alert text-glitch shadow-red-glow/20" : riskScore > 10 ? "text-cyber-orange" : "text-cyber-cyan"
              }`} data-text={`${riskScore}%`}>
                {riskScore}%
              </span>
              <span className="text-[8px] font-mono text-cyber-gray mt-0.5 tracking-wider">
                {riskScore > 60 ? "CRITICAL HAZARD" : riskScore > 10 ? "MITIGATING..." : "SAFE ZONE"}
              </span>
            </div>
          </div>

          <div className="mt-4 text-xs font-mono text-cyber-gray flex flex-col gap-1 w-full text-left bg-black/20 p-2.5 border border-cyber-border/10 rounded">
            <div className="flex justify-between">
              <span>ACTIVE ANOMALY:</span>
              <span className="text-white font-bold">
                {simState === "earthquake" ? "SEISMIC WAVE L4" : simState === "flood" ? "FLOOD CREST WATER" : "NONE"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>SYS BRAKING ENGAGED:</span>
              <span className="text-white font-bold">{simState !== "normal" ? "YES" : "NO"}</span>
            </div>
          </div>
        </div>

        {/* AI Agent Status Tracker Card */}
        <div className="glass-panel border border-cyber-border rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden cyber-corner-box">
          <span className="text-[10px] font-mono text-cyber-gray tracking-widest block uppercase border-b border-cyber-border/20 pb-2">
            Multi-Agent Node Status
          </span>

          <div className="flex flex-col gap-4">
            {agents.map((agent) => {
              const isActive = agent.status !== "IDLE" && agent.status !== "MONITORING";
              return (
                <div key={agent.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-orbitron text-white flex items-center gap-1.5">
                      {agent.name}
                    </span>
                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                      agent.status === "EMERGENCY_ALERT"
                        ? "bg-red-950/40 border-red-500/50 text-cyber-alert font-bold animate-pulse"
                        : agent.status === "SOLVING"
                        ? "bg-orange-950/40 border-cyber-orange/50 text-cyber-orange font-bold animate-pulse"
                        : "bg-black/40 border-cyber-border/20 text-cyber-cyan"
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${
                        agent.status === "EMERGENCY_ALERT" ? "bg-red-500" : agent.status === "SOLVING" ? "bg-orange-500" : "bg-cyber-cyan"
                      } ${isActive ? "animate-ping" : ""}`} />
                      {agent.status}
                    </span>
                  </div>
                  <div className="bg-black/30 border border-cyber-border/10 rounded p-2 text-[10px] font-mono text-cyber-gray min-h-[36px] flex items-center">
                    {isActive ? (
                      <span className="text-white flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 bg-cyber-orange rounded-full animate-ping" />
                        {agent.thinking}
                      </span>
                    ) : (
                      <span>{agent.thinking}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

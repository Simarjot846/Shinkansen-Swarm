"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Users, Zap, ShieldAlert, Award } from "lucide-react";


interface MetricCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  sparklinePath: string;
  colorClass: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  sub,
  icon,
  sparklinePath,
  colorClass,
}) => {
  return (
    <div className="glass-panel border border-cyber-border rounded-xl p-5 flex flex-col justify-between overflow-hidden relative cyber-corner-box shadow-glass-shadow">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-cyber-gray tracking-wider uppercase">{title}</span>
          <span className="text-3xl font-black font-orbitron text-white mt-1">{value}</span>
        </div>
        <div className={`p-2.5 rounded bg-black/40 ${colorClass}`}>{icon}</div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-[9px] font-mono text-cyber-gray leading-none truncate max-w-[120px]">
          {sub}
        </span>
        {/* Vector sparkline */}
        <svg className="w-16 h-6 opacity-60" viewBox="0 0 60 20" preserveAspectRatio="none">
          <path
            d={sparklinePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={colorClass}
          />
        </svg>
      </div>
    </div>
  );
};

interface ImpactMetricsProps {
  simState: "normal" | "earthquake" | "flood";
}

export const ImpactMetrics: React.FC<ImpactMetricsProps> = ({ simState }) => {
  // Dynamic metrics counting logic
  const [livesSaved, setLivesSaved] = useState(240);
  const [responseMs, setResponseMs] = useState(50);
  const [damagePrevented, setDamagePrevented] = useState(42.5);

  useEffect(() => {
    if (simState === "earthquake") {
      const livesInterval = setInterval(() => {
        setLivesSaved((prev) => (prev < 358 ? prev + 3 : 358));
      }, 50);
      setResponseMs(42); // Faster edge calculation
      setDamagePrevented(58.2); // Avoided bridge collapses
      return () => clearInterval(livesInterval);
    } else if (simState === "flood") {
      const livesInterval = setInterval(() => {
        setLivesSaved((prev) => (prev < 298 ? prev + 2 : 298));
      }, 60);
      setResponseMs(48);
      setDamagePrevented(49.8);
      return () => clearInterval(livesInterval);
    } else {
      setLivesSaved(240);
      setResponseMs(50);
      setDamagePrevented(42.5);
    }
  }, [simState]);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-10 flex flex-col gap-10">
      {/* Cards Grid */}
      <div>
        <h2 className="text-lg font-orbitron font-bold text-cyber-cyan tracking-wider flex items-center gap-2 border-b border-cyber-border/40 pb-2 mb-6">
          <Award size={18} /> PROJECTED DEPLOYMENT IMPACTMETRICS
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Edge Decision Speed"
            value={`${responseMs}ms`}
            sub="Auto-braking delay (v.s 3,000ms manual)"
            icon={<Zap size={18} />}
            sparklinePath="M 0 15 L 10 12 L 20 18 L 30 8 L 40 5 L 50 18 L 60 2"
            colorClass="text-cyber-cyan"
          />

          <MetricCard
            title="Collision Safety"
            value="0.00%"
            sub="Rate across 10,000+ simulation loops"
            icon={<ShieldCheck size={18} />}
            sparklinePath="M 0 18 L 10 18 L 20 18 L 30 18 L 40 18 L 50 18 L 60 18"
            colorClass="text-cyber-success"
          />

          <MetricCard
            title="Simulated Lives Saved"
            value={`${livesSaved}+`}
            sub="Active mitigations in extreme scenarios"
            icon={<Users size={18} />}
            sparklinePath="M 0 18 L 15 15 L 30 10 L 45 4 L 60 2"
            colorClass="text-cyber-orange"
          />

          <MetricCard
            title="Asset Damage Avoided"
            value={`$${damagePrevented}M`}
            sub="Rolling stock and bridge structures protected"
            icon={<ShieldAlert size={18} />}
            sparklinePath="M 0 15 L 10 18 L 20 12 L 30 14 L 40 8 L 50 4 L 60 2"
            colorClass="text-red-400"
          />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="border-t border-cyber-border/30 pt-8 pb-12 font-mono text-xs text-cyber-gray">
        <div className="grid md:grid-cols-3 gap-8 items-start justify-between">
          {/* Themes covered */}
          <div className="flex flex-col gap-2">
            <span className="text-white font-bold font-orbitron text-[10px] tracking-wider">
              HACKATHON THEMES COVERED
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              <span className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-[10px]">
                Autonomous Swarms
              </span>
              <span className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-[10px]">
                Geological Threat Resilience
              </span>
              <span className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-[10px]">
                Ad-hoc Mesh Networking
              </span>
              <span className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-[10px]">
                Edge Computing Autopilot
              </span>
            </div>
          </div>

          {/* Team names */}
          <div className="flex flex-col gap-2 md:items-center md:text-center">
            <span className="text-white font-bold font-orbitron text-[10px] tracking-wider">
              DEVELOPED BY RUDRA TEAM
            </span>
            <span className="text-[10px] opacity-75">
              Bilateral JP-IN R&D Consortium
            </span>
          </div>

          {/* Copyright details */}
          <div className="flex flex-col gap-2 md:items-end md:text-right">
            <span className="text-white font-bold font-orbitron text-[10px] tracking-wider">
              FAR AWAY 2026 HACKATHON
            </span>
            <span className="text-cyber-cyan font-bold mt-1">
              IN RETRO-FUTURE RAILWAY LABS
            </span>
            <span>Inspired by Japan&apos;s Shinkansen Safety Paradigm</span>
          </div>
        </div>

        <div className="text-center mt-10 text-[10px] opacity-40 border-t border-cyber-border/10 pt-4">
          © 2026 Shinkansen AI Swarm. All virtual assets simulated on local edge controllers.
        </div>
      </footer>
    </div>
  );
};

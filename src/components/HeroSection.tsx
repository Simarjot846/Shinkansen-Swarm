"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, ShieldAlert, Cpu, Activity, Info, X } from "lucide-react";

interface HeroSectionProps {
  simState: "normal" | "earthquake" | "flood";
  triggerEarthquake: () => void;
  triggerFlood: () => void;
  resetSimulation: () => void;
  playClick: () => void;
  riskScore: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  simState,
  triggerEarthquake,
  triggerFlood,
  resetSimulation,
  playClick,
  riskScore,
}) => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showSimDropdown, setShowSimDropdown] = useState(false);

  const handleTriggerClick = (type: "earthquake" | "flood") => {
    playClick();
    setShowSimDropdown(false);
    if (type === "earthquake") triggerEarthquake();
    if (type === "flood") triggerFlood();
  };

  const handleResetClick = () => {
    playClick();
    resetSimulation();
  };

  return (
    <header className="relative w-full overflow-hidden border-b border-cyber-border glass-panel py-6 px-4 md:px-8 scanline-effect">
      {/* Background Animated Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyber-orange/10 rounded-full blur-3xl -z-10 animate-pulse-slow" style={{ animationDelay: "2s" }} />

      {/* Cyber Grid Lines Overlay */}
      <div className="absolute inset-0 cyber-grid-dense opacity-30 pointer-events-none -z-10" />

      {/* Top Banner Area */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo & Collaboration Badges */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-orange drop-shadow-md">
              SHINKANSEN AI SWARM
            </span>
            <div className="flex items-center gap-1.5 bg-black/40 border border-cyber-border rounded-full px-2.5 py-0.5 text-xs text-cyber-cyan">
              <span className="w-1.5 h-1.5 bg-cyber-cyan rounded-full animate-ping" />
              <span>LIVE CORE ACTIVE</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyber-gray">
            <span className="flex items-center gap-1 bg-white/5 border border-white/10 rounded px-1.5 py-0.5">
              🇯🇵 JP-IN COLLABORATION 🇮🇳
            </span>
            <span className="text-cyber-cyan">/</span>
            <span>FAR AWAY 2026 HACKATHON</span>
            <span className="text-cyber-cyan">/</span>
            <span className="text-cyber-orange border border-cyber-orange/30 px-1 rounded bg-cyber-orange/10 font-bold">
              SYSTEM CODE: S-AI-SWARM-26
            </span>
          </div>
        </div>

        {/* Live Indicators & Floating Badge */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end text-right">
            <span className="text-[10px] font-mono text-cyber-gray tracking-widest">
              SIMULATION INTEGRITY
            </span>
            <span className="text-sm font-orbitron font-semibold text-cyber-cyan">
              99.998% SECURE
            </span>
          </div>

          {/* Japan Badge */}
          <div className="relative overflow-hidden flex items-center gap-2 border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan px-3 py-1.5 rounded-md text-xs font-bold font-orbitron cyber-corner-box shadow-cyan-glow">
            <span className="text-[14px]">日</span>
            <span className="font-mono text-[10px] opacity-75 font-normal tracking-wide">
              TOKYO LABS
            </span>
          </div>
        </div>
      </div>

      {/* Hero Title & Main Actions */}
      <div className="max-w-7xl mx-auto mt-8 md:mt-12 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 flex flex-col gap-4">
          <div className="inline-flex max-w-fit items-center gap-2 bg-gradient-to-r from-red-950/40 to-transparent border-l-2 border-cyber-orange px-3 py-1 text-xs text-cyber-orange font-mono">
            <ShieldAlert size={14} className="animate-pulse" />
            <span>DISASTER-RESILIENT INFRASTRUCTURE SYSTEMS DEVELOPMENT</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-orbitron tracking-tight leading-tight">
            Autonomous{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-orange drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]">
              Disaster-Resilient
            </span>{" "}
            <br />
            Railway + Drone Swarm
          </h1>

          <p className="text-cyber-gray max-w-2xl text-sm md:text-base leading-relaxed">
            Inspired by Japan&apos;s Shinkansen safety systems. We combine edge computing, multi-agent AI consensus, and autonomous aerial drone swarms connected over private LoRa mesh networks to guarantee train survival during massive geological events.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            {/* Watch Demo */}
            <button
              onClick={() => {
                playClick();
                setShowDemoModal(true);
              }}
              className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyber-cyan/50 text-white font-mono text-sm px-5 py-3 rounded-md transition-all duration-300"
            >
              <Info size={16} className="text-cyber-cyan group-hover:scale-110 transition-transform" />
              <span>System Specs</span>
            </button>

            {/* Trigger Simulation */}
            <div className="relative">
              <button
                onClick={() => {
                  playClick();
                  setShowSimDropdown(!showSimDropdown);
                }}
                className={`flex items-center gap-2 border text-sm font-mono font-bold px-6 py-3 rounded-md transition-all duration-300 ${
                  simState !== "normal"
                    ? "bg-cyber-orange/10 border-cyber-orange text-cyber-orange animate-pulse shadow-orange-glow"
                    : "bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/20 shadow-cyan-glow"
                }`}
              >
                <Activity size={16} className={simState !== "normal" ? "animate-spin" : ""} />
                <span>
                  {simState !== "normal" ? "Simulating Hazard..." : "Trigger Simulation"}
                </span>
              </button>

              <AnimatePresence>
                {showSimDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-50 left-0 mt-2 w-64 glass-panel border border-cyber-border rounded-lg shadow-glass-shadow p-2 flex flex-col gap-1"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-mono text-cyber-gray border-b border-cyber-border/40 uppercase tracking-widest">
                      Select Hazard Vector
                    </div>
                    <button
                      onClick={() => handleTriggerClick("earthquake")}
                      className="flex items-center gap-2.5 w-full hover:bg-red-950/20 border border-transparent hover:border-red-500/20 text-left px-3 py-2.5 rounded font-mono text-xs text-red-400 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <div>
                        <div className="font-bold text-white">Earthquake Magnitude 6.7</div>
                        <div className="text-[9px] opacity-75">Tectonic shear, automatic brake deceleration</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleTriggerClick("flood")}
                      className="flex items-center gap-2.5 w-full hover:bg-blue-950/20 border border-transparent hover:border-blue-500/20 text-left px-3 py-2.5 rounded font-mono text-xs text-blue-400 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <div>
                        <div className="font-bold text-white">Severe Flood Bypass</div>
                        <div className="text-[9px] opacity-75">Water limit warning, track diversion</div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reset Simulation */}
            {simState !== "normal" && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleResetClick}
                className="flex items-center gap-2 bg-cyber-success/10 border border-cyber-success hover:bg-cyber-success/20 text-cyber-success font-mono text-sm px-4 py-3 rounded-md transition-all shadow-[0_0_10px_rgba(16,185,129,0.2)]"
              >
                <RefreshCw size={14} className="animate-spin" style={{ animationDuration: "3s" }} />
                <span>Reset Grid</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Live System Stats Overlay Panel */}
        <div className="md:col-span-4 glass-panel border border-cyber-border rounded-lg p-5 flex flex-col gap-4 relative overflow-hidden cyber-corner-box">
          <div className="absolute top-0 right-0 w-16 h-16 bg-cyber-cyan/5 rounded-full blur-xl -z-10" />
          <div className="flex items-center justify-between border-b border-cyber-border/40 pb-2">
            <span className="font-orbitron font-bold text-xs tracking-wider text-cyber-cyan flex items-center gap-2">
              <Cpu size={14} /> LIVE GRID TELEMETRY
            </span>
            <span className="font-mono text-[9px] text-cyber-gray bg-white/5 border border-white/10 px-1 rounded">
              NODE V.2.1
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-black/30 border border-cyber-border/40 rounded p-2 flex flex-col">
              <span className="text-[9px] text-cyber-gray">GRID STATUS</span>
              <span className={`font-bold mt-1 ${simState !== "normal" ? "text-cyber-orange" : "text-cyber-success"}`}>
                {simState === "normal" ? "STABLE / CLEAR" : "EMERGENCY ENGAGED"}
              </span>
            </div>

            <div className="bg-black/30 border border-cyber-border/40 rounded p-2 flex flex-col">
              <span className="text-[9px] text-cyber-gray">DISASTER RISK</span>
              <span className={`font-bold mt-1 ${riskScore > 40 ? "text-cyber-alert font-orbitron animate-pulse" : "text-cyber-cyan"}`}>
                {riskScore}%
              </span>
            </div>

            <div className="bg-black/30 border border-cyber-border/40 rounded p-2 flex flex-col">
              <span className="text-[9px] text-cyber-gray">DRONE CONSENSUS</span>
              <span className="text-white font-bold mt-1">MESH ON (99.8%)</span>
            </div>

            <div className="bg-black/30 border border-cyber-border/40 rounded p-2 flex flex-col">
              <span className="text-[9px] text-cyber-gray">AUTOPILOT SWARM</span>
              <span className="text-cyber-cyan font-bold mt-1">SYNCED (50ms)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Demo overlay modal */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl glass-panel border border-cyber-border rounded-xl p-6 relative overflow-hidden"
            >
              {/* Scanline Sweep inside modal */}
              <div className="absolute inset-0 scanline-effect opacity-10 pointer-events-none" />

              <div className="flex items-center justify-between border-b border-cyber-border/40 pb-3 mb-4">
                <h3 className="text-lg font-orbitron font-bold text-cyber-cyan flex items-center gap-2">
                  <Cpu size={18} /> SHINKANSEN AI SWARM ARCHITECTURE
                </h3>
                <button
                  onClick={() => {
                    playClick();
                    setShowDemoModal(false);
                  }}
                  className="hover:text-cyber-orange transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-4 font-mono text-xs text-cyber-gray leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
                <div className="bg-black/40 border border-cyber-border/30 rounded p-4">
                  <span className="text-white font-bold block mb-1">🚅 1. Decoupled Autonomous Edge Node</span>
                  Each Shinkansen cabin runs a localized neural processing node capable of microsecond brake triggers. Independent of central cloud networks, it utilizes deep learning models to predict track failures from accelerometers (geophones) placed along the bogie.
                </div>

                <div className="bg-black/40 border border-cyber-border/30 rounded p-4">
                  <span className="text-white font-bold block mb-1">🛸 2. Drone Swarm Reconnaissance Network</span>
                  In case of track anomalies or seismic trigger, a payload bay opens dynamically. A swarm of heavy-lift quadcopters launches via IMU triggers, projecting solid-state LiDAR sensors downwards to verify track geometry, bridges, and tunnels, bypassing visual inspection delays.
                </div>

                <div className="bg-black/40 border border-cyber-border/30 rounded p-4">
                  <span className="text-white font-bold block mb-1">📶 3. LoRa Multi-Hop Mesh Communications</span>
                  When main electrical grids collapse, communication remains active. A proprietary ad-hoc multi-hop LoRa mesh network synchronizes the train speed database with drones and secondary trains up to 25 km away, keeping communication paths alive even in absolute blackout zones.
                </div>

                <div className="bg-black/40 border border-cyber-border/30 rounded p-4 text-cyber-orange border-cyber-orange/30 bg-cyber-orange/5">
                  <span className="font-bold block mb-1">🛠️ KiCad Schematic Status: Approved</span>
                  A hardware prototype comprising STM32H7 processor nodes and RF mesh transmitters has been routed in KiCad and fabricated. Detailed schematics are viewable in the hardware panel below.
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    playClick();
                    setShowDemoModal(false);
                  }}
                  className="bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan font-mono text-xs px-4 py-2 rounded hover:bg-cyber-cyan/30 transition-all shadow-cyan-glow"
                >
                  CLOSE ARCHITECTURE DIAGRAM
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

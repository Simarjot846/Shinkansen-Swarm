"use client";

import React from "react";
import dynamic from "next/dynamic";
import { AlertTriangle, RefreshCw, Compass, ShieldAlert, Cpu } from "lucide-react";
import { motion } from "framer-motion";

// Dynamically import the Canvas sub-component with SSR disabled
const Simulation3DCanvas = dynamic(() => import("./Simulation3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] md:h-[450px] bg-black/40 flex flex-col items-center justify-center border border-cyber-border/20 rounded-lg">
      <div className="w-10 h-10 border-4 border-t-cyber-cyan border-cyber-border rounded-full animate-spin" />
      <span className="font-mono text-xs text-cyber-gray mt-4 tracking-widest uppercase">
        Initializing 3D Simulation Engine...
      </span>
    </div>
  ),
});

interface Simulation3DProps {
  simState: "normal" | "earthquake" | "flood";
  triggerEarthquake: () => void;
  triggerFlood: () => void;
  resetSimulation: () => void;
  playClick: () => void;
}

export const Simulation3D: React.FC<Simulation3DProps> = ({
  simState,
  triggerEarthquake,
  triggerFlood,
  resetSimulation,
  playClick,
}) => {
  const isEmergency = simState !== "normal";

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mt-10 w-full">
      <div className="glass-panel border border-cyber-border rounded-xl p-5 md:p-6 relative overflow-hidden cyber-corner-box">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyber-border/30 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isEmergency ? "bg-cyber-alert animate-ping" : "bg-cyber-success animate-pulse"}`} />
            <div>
              <h2 className="text-xl font-orbitron font-black tracking-wider text-white">
                3D COGNITIVE SIMULATION CORRIDOR
              </h2>
              <p className="text-[10px] font-mono text-cyber-gray mt-0.5 uppercase tracking-wider">
                Virtual Twin: Fuji-Shizuoka Corridor (L0 Maglev System)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-cyber-gray bg-black/30 border border-cyber-border/20 px-3 py-1.5 rounded">
            <span className="flex items-center gap-1.5">
              <Compass size={14} className="text-cyber-cyan animate-spin" style={{ animationDuration: "12s" }} />
              Rotate: Left-Click + Drag
            </span>
            <span className="text-cyber-cyan/30">|</span>
            <span>Zoom: Scroll</span>
            <span className="text-cyber-cyan/30">|</span>
            <span>Pan: Right-Click + Drag</span>
          </div>
        </div>

        {/* 3D Scene Viewport */}
        <div className="relative border border-cyber-border/40 rounded-lg overflow-hidden bg-[#01030e] w-full h-[350px] md:h-[450px]">
          {/* Scanline Overlay */}
          <div className="absolute inset-0 scanline-effect opacity-[0.06] pointer-events-none z-10" />

          {/* WebGL Canvas */}
          <Simulation3DCanvas simState={simState} />

          {/* Left HUD readout overlay */}
          <div className="absolute top-4 left-4 z-10 font-mono text-[10px] bg-black/75 border border-cyber-border/40 rounded p-3 flex flex-col gap-2 pointer-events-none text-cyber-gray w-52">
            <div className="flex items-center justify-between border-b border-cyber-border/20 pb-1.5">
              <span className="text-white font-bold text-xs font-orbitron text-cyber-cyan">VEHICLE DATA</span>
              <span className="text-[8px] bg-cyber-cyan/10 px-1 border border-cyber-cyan/20 text-cyber-cyan">
                TELEMETRY
              </span>
            </div>
            <div className="flex justify-between">
              <span>POSITION:</span>
              <span className="text-white font-bold">SHIZUOKA (Z4)</span>
            </div>
            <div className="flex justify-between">
              <span>MAGLEV POWER:</span>
              <span className="text-white font-bold">12,400 kW</span>
            </div>
            <div className="flex justify-between">
              <span>DRONE BAY SECT:</span>
              <span className={`font-bold ${isEmergency ? "text-cyber-orange" : "text-cyber-cyan"}`}>
                {isEmergency ? "DEP-OPEN (12/12)" : "SECURED / DOCKED"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>RADAR SCAN:</span>
              <span className="text-cyber-success font-bold">AUTO-ACTIVE</span>
            </div>
          </div>

          {/* Bottom HUD warning alert flash */}
          {isEmergency && (
            <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border px-5 py-3 rounded-lg flex items-center gap-3 backdrop-blur-md ${
                  simState === "earthquake"
                    ? "bg-red-950/75 border-red-500/50 text-red-400"
                    : "bg-orange-950/75 border-orange-500/50 text-orange-400"
                }`}
              >
                <AlertTriangle size={18} className="animate-bounce" />
                <div className="font-mono text-xs">
                  <span className="font-bold uppercase tracking-wider block">
                    {simState === "earthquake" ? "🚨 SEISMIC EMERGENCY TRIGGERED" : "🌊 WATER LEVEL DEVIATION ALERT"}
                  </span>
                  <span className="text-[10px] opacity-80">
                    {simState === "earthquake"
                      ? "Earthquake magnitude exceeding 6.5. Decelerating to 0 km/h. Drone scan engaged."
                      : "Corridor bypass switch points engaged. Re-routing Train-Alpha via line 2-B."}
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* 3D Action Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <button
            onClick={() => {
              playClick();
              triggerEarthquake();
            }}
            className={`flex items-center justify-center gap-2 border text-xs font-mono font-bold py-3.5 px-4 rounded-lg transition-all ${
              simState === "earthquake"
                ? "bg-red-950/40 border-red-500 text-red-500 shadow-red-glow animate-pulse"
                : "bg-black/40 border-cyber-border hover:border-red-500/50 hover:bg-red-500/5 text-cyber-gray hover:text-white"
            }`}
          >
            <ShieldAlert size={16} />
            <span>TRIGGER EARTHQUAKE SIMULATION</span>
          </button>

          <button
            onClick={() => {
              playClick();
              triggerFlood();
            }}
            className={`flex items-center justify-center gap-2 border text-xs font-mono font-bold py-3.5 px-4 rounded-lg transition-all ${
              simState === "flood"
                ? "bg-orange-950/40 border-cyber-orange text-cyber-orange shadow-orange-glow animate-pulse"
                : "bg-black/40 border-cyber-border hover:border-cyber-orange/50 hover:bg-cyber-orange/5 text-cyber-gray hover:text-white"
            }`}
          >
            <Cpu size={16} />
            <span>TRIGGER FLOOD DIVERSION</span>
          </button>

          <button
            onClick={() => {
              playClick();
              resetSimulation();
            }}
            className={`flex items-center justify-center gap-2 border text-xs font-mono font-bold py-3.5 px-4 rounded-lg transition-all bg-cyber-cyan/5 border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 hover:border-cyber-cyan`}
          >
            <RefreshCw size={14} className={simState !== "normal" ? "animate-spin" : ""} />
            <span>RESET SIMULATION GRID</span>
          </button>
        </div>
      </div>
    </section>
  );
};

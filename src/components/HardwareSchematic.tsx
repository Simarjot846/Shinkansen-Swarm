"use client";

import React, { useState } from "react";
import { HARDWARE_COMPONENTS, HardwareComponent } from "@/utils/mockData";
import { Cpu, Info } from "lucide-react";
import * as Icons from "lucide-react";

interface HardwareSchematicProps {
  playClick: () => void;
}

export const HardwareSchematic: React.FC<HardwareSchematicProps> = ({ playClick }) => {
  const [selectedComp, setSelectedComp] = useState<HardwareComponent>(HARDWARE_COMPONENTS[0]);
  const [hoveredCompId, setHoveredCompId] = useState<string | null>(null);

  const handleComponentSelect = (comp: HardwareComponent) => {
    playClick();
    setSelectedComp(comp);
  };

  // Dynamically resolve icon names to Lucide icons
  const renderIcon = (iconName: string, className: string) => {
    const LucideIcon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[iconName];
    if (LucideIcon) {
      return <LucideIcon className={className} size={18} />;
    }
    return <Cpu className={className} size={18} />;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mt-10 w-full">
      <div className="glass-panel border border-cyber-border rounded-xl p-5 md:p-6 relative overflow-hidden cyber-corner-box">
        {/* Animated grid lines background overlay */}
        <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none -z-10" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyber-border/30 pb-4 mb-6">
          <div>
            <h2 className="text-xl font-orbitron font-black tracking-wider text-white flex items-center gap-2">
              <Cpu size={22} className="text-cyber-orange" />
              HARDWARE INTEGRATION NODE
            </h2>
            <p className="text-[10px] font-mono text-cyber-gray mt-0.5 uppercase tracking-wider">
              Edge Swarm Telemetry Board - KiCad Layout V1.0
            </p>
          </div>

          {/* Badge Planned for Offline Round */}
          <div className="relative overflow-hidden flex items-center gap-2 border border-cyber-orange/40 bg-cyber-orange/10 text-cyber-orange px-3.5 py-2 rounded-md text-xs font-bold font-orbitron shadow-orange-glow animate-orange-pulse">
            <span className="w-2 h-2 rounded-full bg-cyber-orange animate-ping" />
            <span>PLANNED FOR OFFLINE ROUND</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* KiCad Interactive SVG Diagram (Left - 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="text-xs font-mono text-cyber-gray tracking-wider uppercase flex items-center gap-1.5">
              <Info size={14} className="text-cyber-cyan" /> Click components on the board to view edge schematic detail
            </span>

            {/* Simulated PCB Layout container */}
            <div className="bg-[#020813] border border-cyber-border/40 rounded-lg p-6 relative flex items-center justify-center min-h-[300px] md:min-h-[350px]">
              <div className="absolute inset-0 scanline-effect opacity-[0.04] pointer-events-none" />

              {/* PCB Visual Board SVG */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 500 320"
                className="max-w-[460px] md:max-w-none filter drop-shadow-[0_4px_20px_rgba(0,243,255,0.1)]"
              >
                {/* Board Background */}
                <rect
                  x="10"
                  y="10"
                  width="480"
                  height="300"
                  rx="16"
                  fill="#031e1c"
                  stroke={selectedComp ? "#00f3ff" : "rgba(6, 182, 212, 0.4)"}
                  strokeWidth="2.5"
                  className="transition-colors duration-300"
                />

                {/* Ground plane copper grid lines */}
                <pattern id="pcb-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 243, 255, 0.04)" strokeWidth="0.8" />
                </pattern>
                <rect x="15" y="15" width="470" height="290" rx="12" fill="url(#pcb-grid)" />

                {/* Gold plated mounting holes */}
                <circle cx="30" cy="30" r="8" fill="none" stroke="#eab308" strokeWidth="2" />
                <circle cx="30" cy="30" r="4" fill="#020813" />
                <circle cx="470" cy="30" r="8" fill="none" stroke="#eab308" strokeWidth="2" />
                <circle cx="470" cy="30" r="4" fill="#020813" />
                <circle cx="30" cy="290" r="8" fill="none" stroke="#eab308" strokeWidth="2" />
                <circle cx="30" cy="290" r="4" fill="#020813" />
                <circle cx="470" cy="290" r="8" fill="none" stroke="#eab308" strokeWidth="2" />
                <circle cx="470" cy="290" r="4" fill="#020813" />

                {/* Copper traces (interactive glowing paths) */}
                <path
                  d="M 120 160 L 250 160 M 250 160 L 250 90 M 250 160 L 370 160 M 250 160 L 250 230"
                  fill="none"
                  stroke="rgba(0, 243, 255, 0.25)"
                  strokeWidth="1.5"
                />
                <path
                  d="M 120 170 L 230 170 L 230 220"
                  fill="none"
                  stroke="rgba(255, 108, 0, 0.25)"
                  strokeWidth="1.5"
                />
                <path
                  d="M 370 170 L 270 170 L 270 100"
                  fill="none"
                  stroke="rgba(16, 185, 129, 0.25)"
                  strokeWidth="1.5"
                />

                {/* Highlight active traces based on selection */}
                {selectedComp.designator === "U1" && (
                  <g>
                    <path d="M 120 160 L 250 160 M 250 160 L 250 90 M 250 160 L 370 160 M 250 160 L 250 230" fill="none" stroke="#00f3ff" strokeWidth="2" className="animate-pulse" />
                    <circle cx="250" cy="160" r="3" fill="#00f3ff" />
                  </g>
                )}
                {selectedComp.designator === "U2" && (
                  <path d="M 120 170 L 230 170 L 230 220" fill="none" stroke="#ff6c00" strokeWidth="2" />
                )}

                {/* 1. U1: Swarm Core MCU (Center) */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleComponentSelect(HARDWARE_COMPONENTS[0])}
                  onMouseEnter={() => setHoveredCompId("U1")}
                  onMouseLeave={() => setHoveredCompId(null)}
                >
                  <rect
                    x="215"
                    y="125"
                    width="70"
                    height="70"
                    rx="6"
                    fill={selectedComp.designator === "U1" || hoveredCompId === "U1" ? "#022d3a" : "#0f172a"}
                    stroke={selectedComp.designator === "U1" ? "#00f3ff" : "rgba(6, 182, 212, 0.4)"}
                    strokeWidth="2"
                  />
                  {/* Pin connectors details */}
                  <line x1="210" y1="135" x2="215" y2="135" stroke="#eab308" strokeWidth="2" />
                  <line x1="210" y1="145" x2="215" y2="145" stroke="#eab308" strokeWidth="2" />
                  <line x1="210" y1="155" x2="215" y2="155" stroke="#eab308" strokeWidth="2" />
                  <line x1="210" y1="165" x2="215" y2="165" stroke="#eab308" strokeWidth="2" />
                  <line x1="215" y1="135" x2="215" y2="175" stroke="rgba(255,255,255,0.05)" />
                  <text x="250" y="165" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    U1
                  </text>
                  <text x="250" y="180" fill="#00f3ff" fontSize="7" textAnchor="middle" fontFamily="monospace">
                    STM32H7
                  </text>
                </g>

                {/* 2. U2: LoRa Mesh (Top Center) */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleComponentSelect(HARDWARE_COMPONENTS[1])}
                  onMouseEnter={() => setHoveredCompId("U2")}
                  onMouseLeave={() => setHoveredCompId(null)}
                >
                  <rect
                    x="220"
                    y="40"
                    width="60"
                    height="50"
                    rx="4"
                    fill={selectedComp.designator === "U2" || hoveredCompId === "U2" ? "#022d3a" : "#0f172a"}
                    stroke={selectedComp.designator === "U2" ? "#ff6c00" : "rgba(6, 182, 212, 0.4)"}
                    strokeWidth="2"
                  />
                  {/* Antennas tracks */}
                  <path d="M 250 40 L 250 20 M 245 20 L 255 20 M 247 23 L 253 23" stroke="#eab308" strokeWidth="1.5" />
                  <text x="250" y="70" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    U2
                  </text>
                  <text x="250" y="82" fill="#ff6c00" fontSize="7" textAnchor="middle" fontFamily="monospace">
                    SX1262
                  </text>
                </g>

                {/* 3. U3: IMU Sensor (Left Center) */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleComponentSelect(HARDWARE_COMPONENTS[2])}
                  onMouseEnter={() => setHoveredCompId("U3")}
                  onMouseLeave={() => setHoveredCompId(null)}
                >
                  <rect
                    x="60"
                    y="135"
                    width="60"
                    height="50"
                    rx="4"
                    fill={selectedComp.designator === "U3" || hoveredCompId === "U3" ? "#022d3a" : "#0f172a"}
                    stroke={selectedComp.designator === "U3" ? "#00f3ff" : "rgba(6, 182, 212, 0.4)"}
                    strokeWidth="2"
                  />
                  <text x="90" y="165" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    U3
                  </text>
                  <text x="90" y="177" fill="#00f3ff" fontSize="7" textAnchor="middle" fontFamily="monospace">
                    BMI270
                  </text>
                </g>

                {/* 4. U4: LiDAR Controller (Right Center) */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleComponentSelect(HARDWARE_COMPONENTS[3])}
                  onMouseEnter={() => setHoveredCompId("U4")}
                  onMouseLeave={() => setHoveredCompId(null)}
                >
                  <rect
                    x="380"
                    y="135"
                    width="60"
                    height="50"
                    rx="4"
                    fill={selectedComp.designator === "U4" || hoveredCompId === "U4" ? "#022d3a" : "#0f172a"}
                    stroke={selectedComp.designator === "U4" ? "#00f3ff" : "rgba(6, 182, 212, 0.4)"}
                    strokeWidth="2"
                  />
                  <text x="410" y="165" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    U4
                  </text>
                  <text x="410" y="177" fill="#00f3ff" fontSize="7" textAnchor="middle" fontFamily="monospace">
                    FPGA_LDR
                  </text>
                </g>

                {/* 5. U5: Servo Motor Driver (Bottom Center) */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleComponentSelect(HARDWARE_COMPONENTS[4])}
                  onMouseEnter={() => setHoveredCompId("U5")}
                  onMouseLeave={() => setHoveredCompId(null)}
                >
                  <rect
                    x="220"
                    y="230"
                    width="60"
                    height="50"
                    rx="4"
                    fill={selectedComp.designator === "U5" || hoveredCompId === "U5" ? "#022d3a" : "#0f172a"}
                    stroke={selectedComp.designator === "U5" ? "#00f3ff" : "rgba(6, 182, 212, 0.4)"}
                    strokeWidth="2"
                  />
                  <text x="250" y="260" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    U5
                  </text>
                  <text x="250" y="272" fill="#00f3ff" fontSize="7" textAnchor="middle" fontFamily="monospace">
                    PCA9685
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* Component Details Glossary (Right - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-cyber-gray tracking-widest block uppercase border-b border-cyber-border/20 pb-2 mb-4">
                Component Technical Readouts
              </span>

              {/* Component Card List */}
              <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-1">
                {HARDWARE_COMPONENTS.map((comp) => {
                  const isSelected = selectedComp.designator === comp.designator;
                  return (
                    <button
                      key={comp.designator}
                      onClick={() => handleComponentSelect(comp)}
                      className={`flex items-center justify-between text-left p-2.5 border rounded transition-all ${
                        isSelected
                          ? "bg-cyber-cyan/10 border-cyber-cyan text-white shadow-cyan-glow"
                          : "bg-black/30 border-cyber-border/20 hover:border-cyber-border/60 text-cyber-gray"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded bg-black/40 ${isSelected ? "text-cyber-cyan" : "text-cyber-gray"}`}>
                          {renderIcon(comp.iconName, "")}
                        </div>
                        <div>
                          <div className="text-xs font-bold font-orbitron">{comp.name}</div>
                          <div className="text-[9px] font-mono opacity-85 mt-0.5">{comp.specs}</div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-cyber-cyan">
                        {comp.designator}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Component Description Box */}
            <div className="mt-6 glass-panel border border-cyber-border/40 rounded-lg p-4 bg-black/20 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-cyber-border/20 pb-2 mb-2">
                <span className="font-bold text-white uppercase text-[11px] flex items-center gap-1.5">
                  {renderIcon(selectedComp.iconName, "text-cyber-orange")}
                  {selectedComp.name} ({selectedComp.designator})
                </span>
                <span className="text-[8px] bg-cyber-orange/10 border border-cyber-orange/30 text-cyber-orange px-1 rounded uppercase font-bold">
                  Active Spec
                </span>
              </div>
              <div className="text-cyber-cyan text-[11px] mb-1.5 font-bold">
                ROLE: {selectedComp.role}
              </div>
              <p className="text-cyber-gray leading-relaxed text-[11px]">
                {selectedComp.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

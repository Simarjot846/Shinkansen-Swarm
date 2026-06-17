"use client";

import React, { useState, useEffect, useRef } from "react";
import { HeroSection } from "@/components/HeroSection";
import { DashboardStats } from "@/components/DashboardStats";
import { Simulation3D } from "@/components/Simulation3D";
import { AgentTerminal } from "@/components/AgentTerminal";
import { HardwareSchematic } from "@/components/HardwareSchematic";
import { ImpactMetrics } from "@/components/ImpactMetrics";
import { useSynthAudio } from "@/hooks/useSynthAudio";
import {
  INITIAL_TRAINS,
  INITIAL_AGENTS,
  EARTHQUAKE_LOG_STEPS,
  FLOOD_LOG_STEPS,
  TrainData,
  AgentStatus,
} from "@/utils/mockData";

interface LogMessage {
  timestamp: string;
  timeOffset: string;
  agent: string;
  status: string;
  message: string;
}

export default function Home() {
  const audio = useSynthAudio();
  const [simState, setSimState] = useState<"normal" | "earthquake" | "flood">("normal");
  const [riskScore, setRiskScore] = useState(1);
  const [trains, setTrains] = useState<TrainData[]>(INITIAL_TRAINS);
  const [agents, setAgents] = useState<AgentStatus[]>(INITIAL_AGENTS);
  const [displayedLogs, setDisplayedLogs] = useState<LogMessage[]>([]);
  
  // Timeout references for step tracking
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Format helper for console timestamps
  const getTimestamp = () => {
    const d = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const msPad = (n: number) => n.toString().padStart(3, "0");
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${msPad(d.getMilliseconds())}`;
  };

  // Pre-populate terminal with normal bootup messages
  useEffect(() => {
    const bootLogs: LogMessage[] = [
      {
        timestamp: getTimestamp(),
        timeOffset: "T-0.5s",
        agent: "Prediction Agent",
        status: "MONITORING",
        message: "📡 Geophone networks connected. Baseline seismicity: 0.04g. All channels clear."
      },
      {
        timestamp: getTimestamp(),
        timeOffset: "T-0.3s",
        agent: "Routing Agent",
        status: "MONITORING",
        message: "🛤️ Double-track block locks verified. Dynamic switch gears active. Speed limits set to 320km/h."
      },
      {
        timestamp: getTimestamp(),
        timeOffset: "T-0.1s",
        agent: "Swarm Coordinator",
        status: "MONITORING",
        message: "🛸 Drone bays locked. 12 quadcopters synced. Battery grids charging at 100% capacity."
      }
    ];
    setDisplayedLogs(bootLogs);

    // Keep adding a random log line during idle/normal state to feel alive
    const normalLogger = setInterval(() => {
      if (simState === "normal") {
        const idleMessages = [
          { agent: "Prediction Agent", msg: "🟢 Ambient seismic baseline stable. Weather data normal." },
          { agent: "Routing Agent", msg: "🛤️ Block clearances synchronized. Signal corridors green." },
          { agent: "Swarm Coordinator", msg: "🛸 Multi-hop LoRa mesh telemetry verified with train bogies. Latency 2ms." }
        ];
        const selected = idleMessages[Math.floor(Math.random() * idleMessages.length)];
        
        setDisplayedLogs((prev) => [
          ...prev,
          {
            timestamp: getTimestamp(),
            timeOffset: "T+0.0s",
            agent: selected.agent,
            status: "MONITORING",
            message: selected.msg
          }
        ]);
        
        // Randomly flicker train stats slightly to show active sensor telemetry
        setTrains((prevTrains) =>
          prevTrains.map((t) => ({
            ...t,
            vibration: parseFloat((1.5 + Math.random() * 0.8).toFixed(2)),
            battery: t.battery > 80 ? t.battery - (Math.random() > 0.8 ? 1 : 0) : 98
          }))
        );
      }
    }, 6000);

    return () => {
      clearInterval(normalLogger);
      clearAllSimulationTimeouts();
    };
  }, [simState]);

  const clearAllSimulationTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const resetSimulation = () => {
    clearAllSimulationTimeouts();
    audio.stopSiren();
    setSimState("normal");
    setRiskScore(1);
    setTrains(INITIAL_TRAINS);
    setAgents(INITIAL_AGENTS);
    
    // Log resetting trigger
    setDisplayedLogs((prev) => [
      ...prev,
      {
        timestamp: getTimestamp(),
        timeOffset: "RESET",
        agent: "Routing Agent",
        status: "SUCCESS",
        message: "🟢 Grid reset broadcasted. Normal speeds and corridor routing restored."
      }
    ]);
  };

  // Run Earthquake Disaster scenario
  const triggerEarthquake = () => {
    if (simState !== "normal") resetSimulation();
    
    clearAllSimulationTimeouts();
    setSimState("earthquake");
    setRiskScore(45);
    audio.startSiren();

    const steps = EARTHQUAKE_LOG_STEPS;
    let accumulatedTime = 0;

    steps.forEach((step, idx) => {
      const timeout = setTimeout(() => {
        // 1. Play specific audio elements based on action
        if (step.message.includes("Deploying Drone Swarm") || step.message.includes("LiDAR")) {
          audio.playDroneLaunch();
        } else if (idx === steps.length - 1) {
          audio.stopSiren();
          audio.playSuccessChime();
        } else {
          audio.playWarningBeep();
        }

        // 2. Append step message
        setDisplayedLogs((prev) => [
          ...prev,
          {
            timestamp: getTimestamp(),
            timeOffset: step.timeOffset,
            agent: step.agent,
            status: step.status,
            message: step.message,
          },
        ]);

        // 3. Update Train 1 properties dynamically (Train 2 stays unaffected/safe)
        setTrains((prevTrains) =>
          prevTrains.map((t) => {
            if (t.id === "train-1") {
              return {
                ...t,
                speed: step.systemState.trainSpeed,
                status: step.systemState.trainStatus as TrainData["status"],
                vibration: step.systemState.trainVibration,
                brakes: step.systemState.brakes,
              };
            }
            // Train 2 slows down slightly to a safe siding in Zone 2
            if (t.id === "train-2" && idx >= 1) {
              return {
                ...t,
                speed: idx >= 6 ? 120 : 0,
                status: idx >= 6 ? "Resuming" : "Emergency Stop",
                brakes: idx >= 6 ? "Controlled Brake" : "Active 100%",
              };
            }
            return t;
          })
        );

        // 4. Update Agents thinking bubble & state
        setAgents((prevAgents) =>
          prevAgents.map((ag) => {
            if (ag.name.includes(step.agent.split(" ")[0])) {
              return {
                ...ag,
                status: step.status as AgentStatus["status"],
                thinking: `COMPLETED: ${step.message.slice(0, 50)}...`,
              };
            }
            return ag;
          })
        );

        // 5. Update Risk score
        setRiskScore(step.systemState.risk);
      }, accumulatedTime);

      timeoutsRef.current.push(timeout);
      // Accumulate delays: 1.5 seconds step intervals for high tension telemetry view
      accumulatedTime += 1700;
    });
  };

  // Run Flood Disaster scenario
  const triggerFlood = () => {
    if (simState !== "normal") resetSimulation();

    clearAllSimulationTimeouts();
    setSimState("flood");
    setRiskScore(38);
    audio.startSiren();

    const steps = FLOOD_LOG_STEPS;
    let accumulatedTime = 0;

    steps.forEach((step, idx) => {
      const timeout = setTimeout(() => {
        // 1. Audio triggers
        if (step.message.includes("Pathfinding Drones")) {
          audio.playDroneLaunch();
        } else if (idx === steps.length - 1) {
          audio.stopSiren();
          audio.playSuccessChime();
        } else {
          audio.playWarningBeep();
        }

        // 2. Log append
        setDisplayedLogs((prev) => [
          ...prev,
          {
            timestamp: getTimestamp(),
            timeOffset: step.timeOffset,
            agent: step.agent,
            status: step.status,
            message: step.message,
          },
        ]);

        // 3. Update Train 1 pathing bypass properties
        setTrains((prevTrains) =>
          prevTrains.map((t) => {
            if (t.id === "train-1") {
              return {
                ...t,
                speed: step.systemState.trainSpeed,
                status: step.systemState.trainStatus as TrainData["status"],
                vibration: step.systemState.trainVibration,
                brakes: step.systemState.brakes,
                location: idx >= 1 ? "Bypass Line 2-B" : t.location,
              };
            }
            return t;
          })
        );

        // 4. Update Agents
        setAgents((prevAgents) =>
          prevAgents.map((ag) => {
            if (ag.name.includes(step.agent.split(" ")[0])) {
              return {
                ...ag,
                status: step.status as AgentStatus["status"],
                thinking: `COMPLETED: ${step.message.slice(0, 50)}...`,
              };
            }
            return ag;
          })
        );

        // 5. Update Risk
        setRiskScore(step.systemState.risk);
      }, accumulatedTime);

      timeoutsRef.current.push(timeout);
      accumulatedTime += 1700;
    });
  };

  return (
    <main className="min-h-screen bg-cyber-bg text-foreground overflow-y-auto pb-12">
      {/* 1. Hero / Header area */}
      <HeroSection
        simState={simState}
        triggerEarthquake={triggerEarthquake}
        triggerFlood={triggerFlood}
        resetSimulation={resetSimulation}
        playClick={audio.playClick}
        riskScore={riskScore}
      />

      {/* 2. Live Dashboard Telemetry Dials & Risk Gauge */}
      <DashboardStats
        trains={trains}
        agents={agents}
        riskScore={riskScore}
        simState={simState}
      />

      {/* 3. Interactive 3D WebGL Simulation Section */}
      <Simulation3D
        simState={simState}
        triggerEarthquake={triggerEarthquake}
        triggerFlood={triggerFlood}
        resetSimulation={resetSimulation}
        playClick={audio.playClick}
      />

      {/* 4. Hardware KiCad Inspector */}
      <HardwareSchematic playClick={audio.playClick} />

      {/* 5. Live Multi-Agent Log Terminal */}
      <AgentTerminal displayedLogs={displayedLogs} simState={simState} />

      {/* 6. Impact Metrics & Project Footer */}
      <ImpactMetrics simState={simState} />
    </main>
  );
}

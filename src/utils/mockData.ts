export interface TrainData {
  id: string;
  name: string;
  route: string;
  speed: number; // km/h
  status: "Operational" | "Decelerating" | "Emergency Stop" | "Diverted" | "Resuming";
  vibration: number; // Hz (sensor readout)
  battery: number; // %
  brakes: string; // "Disengaged" | "Engaging" | "Active 100%" | "Controlled Brake"
  passengers: number;
  location: string;
}

export interface AgentStatus {
  id: string;
  name: string;
  role: string;
  status: "IDLE" | "MONITORING" | "PROCESSING" | "EMERGENCY_ALERT" | "SOLVING";
  thinking: string;
}

export const INITIAL_TRAINS: TrainData[] = [
  {
    id: "train-1",
    name: "Shinkansen Swarm-Alpha (Series L0)",
    route: "Tokyo - Nagoya - Kyoto",
    speed: 320,
    status: "Operational",
    vibration: 1.8,
    battery: 94,
    brakes: "Disengaged",
    passengers: 820,
    location: "Near Shizuoka (Zone 4)"
  },
  {
    id: "train-2",
    name: "Shinkansen Swarm-Beta (Series E7)",
    route: "Mumbai - Ahmedabad (Bullet Corridor)",
    speed: 280,
    status: "Operational",
    vibration: 2.1,
    battery: 89,
    brakes: "Disengaged",
    passengers: 640,
    location: "Surat Approach (Zone 2)"
  }
];

export const INITIAL_AGENTS: AgentStatus[] = [
  {
    id: "agent-pred",
    name: "Prediction Agent 🔮",
    role: "Seismic & Climate Warning System",
    status: "MONITORING",
    thinking: "Analyzing live telemetry from 1,200 geophone sensors and meteorological feeds..."
  },
  {
    id: "agent-route",
    name: "Routing Agent 🛣️",
    role: "Dynamic Pathing & Safe Halt Autopilot",
    status: "MONITORING",
    thinking: "Verifying block signaling systems and track switch lock integrity..."
  },
  {
    id: "agent-swarm",
    name: "Swarm Coordinator 🛸",
    role: "Aerial Drone Network Control",
    status: "MONITORING",
    thinking: "Drones docked. Batterypacks charging at 100W. Telemetry signal normal..."
  }
];

// Steps for Earthquake Disaster Scenario
export const EARTHQUAKE_LOG_STEPS = [
  {
    timeOffset: "T+0.0s",
    agent: "Prediction Agent",
    status: "EMERGENCY_ALERT",
    message: "⚠️ CRITICAL: Seismic activity detected! Magnitude 6.7 in Shizuoka (Zone 4). P-wave propagation warning issued.",
    systemState: {
      trainSpeed: 180,
      trainStatus: "Decelerating",
      trainVibration: 14.5,
      brakes: "Engaging",
      risk: 45
    }
  },
  {
    timeOffset: "T+0.8s",
    agent: "Routing Agent",
    status: "SOLVING",
    message: "🛑 EMERGENCY HALT broadcasted to Swarm-Alpha. Automatically locking tracks. Diverting Swarm-Beta to siding in Zone 2.",
    systemState: {
      trainSpeed: 90,
      trainStatus: "Emergency Stop",
      trainVibration: 28.2,
      brakes: "Active 100%",
      risk: 75
    }
  },
  {
    timeOffset: "T+1.5s",
    agent: "Swarm Coordinator",
    status: "SOLVING",
    message: "🛸 Swarm-Alpha speed: 0 km/h. Safe halt confirmed. Deploying Drone Swarm (12 units) from Cargo Bay C for structural integrity checks.",
    systemState: {
      trainSpeed: 0,
      trainStatus: "Emergency Stop",
      trainVibration: 0.2,
      brakes: "Active 100%",
      risk: 98
    }
  },
  {
    timeOffset: "T+3.2s",
    agent: "Swarm Coordinator",
    status: "PROCESSING",
    message: "🔍 LiDAR Sweep: Drones scanning Fuji River Bridge structural piers. Analyzing structural feedback metrics.",
    systemState: {
      trainSpeed: 0,
      trainStatus: "Emergency Stop",
      trainVibration: 0.1,
      brakes: "Active 100%",
      risk: 85
    }
  },
  {
    timeOffset: "T+5.0s",
    agent: "Prediction Agent",
    status: "MONITORING",
    message: "📊 Seismograph update: Peak ground acceleration stabilized. No critical landslides reported in Zone 4.",
    systemState: {
      trainSpeed: 0,
      trainStatus: "Emergency Stop",
      trainVibration: 0.1,
      brakes: "Active 100%",
      risk: 50
    }
  },
  {
    timeOffset: "T+7.2s",
    agent: "Swarm Coordinator",
    status: "SOLVING",
    message: "✅ Scanning complete. 99.8% structural integrity verified for bridge & rails. Drones returning to charging bays.",
    systemState: {
      trainSpeed: 0,
      trainStatus: "Emergency Stop",
      trainVibration: 0.1,
      brakes: "Active 100%",
      risk: 15
    }
  },
  {
    timeOffset: "T+9.0s",
    agent: "Routing Agent",
    status: "MONITORING",
    message: "🟢 All Clear. Rail corridor unlocked. Authorizing Swarm-Alpha restart. Restricted speed of 120 km/h active.",
    systemState: {
      trainSpeed: 120,
      trainStatus: "Resuming",
      trainVibration: 1.2,
      brakes: "Controlled Brake",
      risk: 4
    }
  }
];

// Steps for Flood/Landslide Scenario
export const FLOOD_LOG_STEPS = [
  {
    timeOffset: "T+0.0s",
    agent: "Prediction Agent",
    status: "EMERGENCY_ALERT",
    message: "🌊 WARNING: Ultrasonic sensors report water levels exceeded warning mark (5.8m) at Tone River bridge.",
    systemState: {
      trainSpeed: 300,
      trainStatus: "Decelerating",
      trainVibration: 2.5,
      brakes: "Engaging",
      risk: 38
    }
  },
  {
    timeOffset: "T+0.9s",
    agent: "Routing Agent",
    status: "SOLVING",
    message: "🛤️ DIVERTIING: Calculating alternative route. Setting track switch points for Bypass Line 2-B.",
    systemState: {
      trainSpeed: 160,
      trainStatus: "Diverted",
      trainVibration: 3.1,
      brakes: "Controlled Brake",
      risk: 60
    }
  },
  {
    timeOffset: "T+2.0s",
    agent: "Swarm Coordinator",
    status: "SOLVING",
    message: "🛸 Pathfinding Drones launched. Dynamic mapping of Bypass Line 2-B. Obstruction search active.",
    systemState: {
      trainSpeed: 120,
      trainStatus: "Diverted",
      trainVibration: 2.8,
      brakes: "Controlled Brake",
      risk: 80
    }
  },
  {
    timeOffset: "T+4.5s",
    agent: "Swarm Coordinator",
    status: "PROCESSING",
    message: "🔍 LiDAR confirms Bypass Line 2-B free of mudslides and debris. Rail geometry within safe tolerances.",
    systemState: {
      trainSpeed: 120,
      trainStatus: "Diverted",
      trainVibration: 2.8,
      brakes: "Controlled Brake",
      risk: 40
    }
  },
  {
    timeOffset: "T+6.5s",
    agent: "Routing Agent",
    status: "SOLVING",
    message: "🔒 Bypass switch locks engaged. Normal signaling overridden. Commencing bypass run.",
    systemState: {
      trainSpeed: 180,
      trainStatus: "Diverted",
      trainVibration: 2.0,
      brakes: "Disengaged",
      risk: 20
    }
  },
  {
    timeOffset: "T+8.2s",
    agent: "Swarm Coordinator",
    status: "MONITORING",
    message: "✅ Path cleared. Drones successfully docked and charging. Autopilot handing back corridor locks.",
    systemState: {
      trainSpeed: 240,
      trainStatus: "Operational",
      trainVibration: 1.9,
      brakes: "Disengaged",
      risk: 5
    }
  }
];

// Hardware components data
export interface HardwareComponent {
  name: string;
  designator: string;
  iconName: string;
  desc: string;
  role: string;
  specs: string;
}

export const HARDWARE_COMPONENTS: HardwareComponent[] = [
  {
    name: "Swarm Core MCU",
    designator: "U1",
    iconName: "Cpu",
    role: "Central processing & real-time telemetry processing",
    desc: "Dual-core ARM Cortex-M7 running at 480 MHz. Manages low-latency communications and handles localized fail-safe logic.",
    specs: "STM32H747XI, 2MB Flash, 1MB RAM"
  },
  {
    name: "LoRa Mesh Transceiver",
    designator: "U2",
    iconName: "Radio",
    role: "Ad-hoc Train-to-Train & Train-to-Drone mesh communication",
    desc: "Long-range RF module operating on 868/915 MHz with custom ad-hoc routing firmware. Survives main grid outages.",
    specs: "SX1262 LoRa, +22dBm, Mesh Protocol"
  },
  {
    name: "IMU Seismic Sensor",
    designator: "U3",
    iconName: "Activity",
    role: "High-precision vibration & deceleration monitoring",
    desc: "6-axis ultra-low-noise IMU designed to detect early-onset P-waves and track cabin vibration in real time.",
    specs: "BMI270, 16-bit Accelerometer/Gyro"
  },
  {
    name: "LiDAR Controller",
    designator: "U4",
    iconName: "Eye",
    role: "Direct obstacle detection interface",
    desc: "Co-processor interfacing with solid-state optical sensors to scan up to 200m ahead of the cabin.",
    specs: "Custom FPGA logic, SPI/CAN-FD bus"
  },
  {
    name: "Drone Dock Servo Controller",
    designator: "U5",
    iconName: "Wrench",
    role: "Automated hangar door & launch mechanism",
    desc: "Coordinates servo motors to open launch bays, lift drones to flight decks, and secure locking latches.",
    specs: "PCA9685, 16-Channel 12-bit PWM"
  }
];

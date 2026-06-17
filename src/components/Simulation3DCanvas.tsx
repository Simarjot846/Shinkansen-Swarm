"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

interface SceneContentProps {
  simState: "normal" | "earthquake" | "flood";
}

// 1. Train Sub-component
interface TrainProps {
  simState: "normal" | "earthquake" | "flood";
  trainRef: React.RefObject<THREE.Group>;
}

const Train: React.FC<TrainProps> = ({ simState, trainRef }) => {
  const speedRef = useRef(0.015); // Normal speed factor
  const thetaRef = useRef(0); // Current angle along track

  useFrame(() => {
    // Interpolate speed based on state
    let targetSpeed = 0.015;
    if (simState === "earthquake" || simState === "flood") {
      targetSpeed = 0; // Emergency brake stops the train
    }

    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, 0.05);
    thetaRef.current += speedRef.current;

    // Oval path equation
    const rx = 12;
    const rz = 6;
    const x = rx * Math.cos(thetaRef.current);
    const z = rz * Math.sin(thetaRef.current);
    const y = 0.15; // Raised slightly above ground

    if (trainRef.current) {
      trainRef.current.position.set(x, y, z);

      // Tangent angle for rotation (facing direction)
      const dx = -rx * Math.sin(thetaRef.current);
      const dz = rz * Math.cos(thetaRef.current);
      const angle = Math.atan2(dx, dz);
      trainRef.current.rotation.y = angle + Math.PI;
    }
  });

  return (
    <group ref={trainRef}>
      {/* Locomotive Cab (Glowing nose) */}
      <mesh position={[0, 0.2, 0.8]}>
        <boxGeometry args={[0.5, 0.4, 0.8]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Sleek Bullet Nose */}
      <mesh position={[0, 0.1, 1.3]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.48, 0.2, 0.4]} />
        <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={0.6} />
      </mesh>

      {/* Carriage 1 */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.46, 0.4, 0.6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Carriage 2 */}
      <mesh position={[0, 0.2, -0.7]}>
        <boxGeometry args={[0.46, 0.4, 0.6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Connection elements */}
      <mesh position={[0, 0.1, -0.35]}>
        <boxGeometry args={[0.2, 0.1, 0.2]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0, 0.1, 0.4]}>
        <boxGeometry args={[0.2, 0.1, 0.2]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Glow windows stripe */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.48, 0.08, 1.8]} />
        <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

// 2. Drone Swarm Sub-component
interface DroneSwarmProps {
  trainRef: React.RefObject<THREE.Group>;
  simState: "normal" | "earthquake" | "flood";
}

const DroneSwarm: React.FC<DroneSwarmProps> = ({ trainRef, simState }) => {
  const droneRefs = useRef<THREE.Group[]>([]);
  const hoverOffset = useRef(0);

  // Initialize refs array
  droneRefs.current = [];

  const dronesData = useMemo(() => {
    return [
      { id: 1, offset: [-0.4, 0.8, 0.4] },
      { id: 2, offset: [0.4, 0.8, 0.4] },
      { id: 3, offset: [-0.4, 0.8, -0.4] },
      { id: 4, offset: [0.4, 0.8, -0.4] },
    ];
  }, []);

  useFrame((state) => {
    if (!trainRef.current) return;
    const trainPos = trainRef.current.position;

    hoverOffset.current += 0.05;
    const time = state.clock.getElapsedTime();

    droneRefs.current.forEach((drone, idx) => {
      if (!drone) return;

      const data = dronesData[idx];
      let targetX = trainPos.x + data.offset[0];
      let targetY = trainPos.y + data.offset[1] + Math.sin(hoverOffset.current + idx) * 0.15;
      let targetZ = trainPos.z + data.offset[2];

      // If disaster state, drones deploy from train and fly to scan the bridge (top center: 0, 0.5, 6)
      if (simState === "earthquake" || simState === "flood") {
        const theta = time * 2.5 + idx * (Math.PI / 2);
        // Circular search orbit around the hazard zone (Fuji Bridge at x=0, z=6)
        targetX = 0 + Math.cos(theta) * 1.5;
        targetY = 2.0 + Math.sin(time * 3 + idx) * 0.2;
        targetZ = 6 + Math.sin(theta) * 1.5;
      }

      // Smoothly interpolate (lerp) drone positions
      drone.position.x = THREE.MathUtils.lerp(drone.position.x, targetX, 0.08);
      drone.position.y = THREE.MathUtils.lerp(drone.position.y, targetY, 0.08);
      drone.position.z = THREE.MathUtils.lerp(drone.position.z, targetZ, 0.08);
      
      // Face the search target if active
      if (simState !== "normal") {
        drone.rotation.y = time * 2 + idx;
      } else {
        drone.rotation.y = 0;
      }
    });
  });

  return (
    <>
      {dronesData.map((d, index) => (
        <group
          key={d.id}
          ref={(el) => {
            if (el) droneRefs.current[index] = el;
          }}
          position={[d.offset[0], d.offset[1], d.offset[2]]}
        >
          {/* Drone Body */}
          <mesh>
            <boxGeometry args={[0.15, 0.05, 0.15]} />
            <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.8} />
          </mesh>
          {/* Rotor lights */}
          <mesh position={[0, 0.04, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color={simState !== "normal" ? "#ff6c00" : "#00f3ff"}
              emissive={simState !== "normal" ? "#ff6c00" : "#00f3ff"}
              emissiveIntensity={1.2}
            />
          </mesh>
          {/* Propellers */}
          <mesh position={[-0.08, 0.03, -0.08]}>
            <cylinderGeometry args={[0.06, 0.06, 0.01, 8]} />
            <meshStandardMaterial color="#1e293b" opacity={0.5} transparent />
          </mesh>
          <mesh position={[0.08, 0.03, -0.08]}>
            <cylinderGeometry args={[0.06, 0.06, 0.01, 8]} />
            <meshStandardMaterial color="#1e293b" opacity={0.5} transparent />
          </mesh>
          <mesh position={[-0.08, 0.03, 0.08]}>
            <cylinderGeometry args={[0.06, 0.06, 0.01, 8]} />
            <meshStandardMaterial color="#1e293b" opacity={0.5} transparent />
          </mesh>
          <mesh position={[0.08, 0.03, 0.08]}>
            <cylinderGeometry args={[0.06, 0.06, 0.01, 8]} />
            <meshStandardMaterial color="#1e293b" opacity={0.5} transparent />
          </mesh>

          {/* Scanning beams when simulation active */}
          {(simState === "earthquake" || simState === "flood") && (
            <group>
              {/* Visible laser scan cone */}
              <mesh position={[0, -0.8, 0]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.01, 0.8, 1.6, 16, 1, true]} />
                <meshBasicMaterial
                  color="#00f3ff"
                  opacity={0.15}
                  transparent
                  side={THREE.DoubleSide}
                />
              </mesh>
              {/* Actual spotlight down onto track */}
              <spotLight
                position={[0, 0, 0]}
                target-position={[0, -2, 0]}
                intensity={8}
                distance={5}
                angle={0.6}
                penumbra={0.5}
                color="#00f3ff"
                castShadow
              />
            </group>
          )}
        </group>
      ))}
    </>
  );
};

// 3. Scene Content Wrapper
const SceneContent: React.FC<SceneContentProps> = ({ simState }) => {
  const trainRef = useRef<THREE.Group>(null);
  const waterRef = useRef<THREE.Mesh>(null);
  const bridgeRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.GridHelper>(null);

  useEffect(() => {
    if (gridRef.current) {
      const mat = gridRef.current.material as THREE.LineBasicMaterial;
      mat.transparent = true;
      mat.opacity = 0.15;
    }
  }, []);
  
  // Track parameters
  const trackPoints = useMemo(() => {
    const points = [];
    const count = 72;
    const rx = 12;
    const rz = 6;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const x = rx * Math.cos(theta);
      const z = rz * Math.sin(theta);
      points.push({ x, z, angle: theta });
    }
    return points;
  }, []);

  useFrame(() => {

    // 1. Water Rise animation during Flood disaster
    if (waterRef.current) {
      const targetY = simState === "flood" ? 0.35 : -1.5;
      waterRef.current.position.y = THREE.MathUtils.lerp(waterRef.current.position.y, targetY, 0.05);
    }

    // 2. Bridge vibration during Earthquake disaster
    if (bridgeRef.current) {
      if (simState === "earthquake") {
        bridgeRef.current.position.x = (Math.random() - 0.5) * 0.12;
        bridgeRef.current.position.y = (Math.random() - 0.5) * 0.06;
      } else {
        bridgeRef.current.position.set(0, 0, 0);
      }
    }
  });

  return (
    <>
      {/* High-tech starfield / nebula grid */}
      <Stars radius={100} depth={50} count={2500} factor={6} saturation={0.5} fade speed={1.5} />
      <ambientLight intensity={simState !== "normal" ? 0.25 : 0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f3ff" />
      <pointLight position={[-10, 8, -10]} intensity={0.8} color="#ff6c00" />

      {/* Cyber Grid Base Plane */}
      <gridHelper ref={gridRef} args={[40, 40, "#00f3ff", "#0f172a"]} position={[0, -0.01, 0]} />

      {/* The Railway Loop */}
      <group>
        {trackPoints.map((pt, i) => (
          <group key={i} position={[pt.x, 0.02, pt.z]} rotation={[0, -pt.angle + Math.PI / 2, 0]}>
            {/* Sleeper box */}
            <mesh>
              <boxGeometry args={[0.8, 0.03, 0.15]} />
              <meshStandardMaterial color="#1e293b" roughness={0.8} />
            </mesh>
            {/* Left rail */}
            <mesh position={[-0.26, 0.03, 0]}>
              <boxGeometry args={[0.04, 0.04, 0.2]} />
              <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={0.4} />
            </mesh>
            {/* Right rail */}
            <mesh position={[0.26, 0.03, 0]}>
              <boxGeometry args={[0.04, 0.04, 0.2]} />
              <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={0.4} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Fuji River Bridge Structure (placed at x=0, z=6) */}
      <group ref={bridgeRef}>
        {/* River bed under track */}
        <mesh position={[0, -0.2, 6]} rotation={[0, 0, 0]}>
          <boxGeometry args={[4.2, 0.3, 2.0]} />
          <meshStandardMaterial color="#020617" roughness={0.9} />
        </mesh>

        {/* Bridge Piers */}
        <mesh position={[-1.5, -0.5, 6]}>
          <cylinderGeometry args={[0.15, 0.15, 1.0, 8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>
        <mesh position={[1.5, -0.5, 6]}>
          <cylinderGeometry args={[0.15, 0.15, 1.0, 8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>

        {/* Arched Truss */}
        <mesh position={[0, 0.65, 6]} rotation={[0, 0, 0]}>
          <boxGeometry args={[3.2, 0.08, 0.8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.95} />
        </mesh>
        {/* Left red truss arch indicator */}
        <mesh position={[0, 0.8, 6.4]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 3.2, 8]} />
          <meshStandardMaterial
            color={simState === "earthquake" ? "#ef4444" : "#ff6c00"}
            emissive={simState === "earthquake" ? "#ef4444" : "#ff6c00"}
            emissiveIntensity={simState !== "normal" ? 1.0 : 0.3}
          />
        </mesh>
      </group>

      {/* Flood rising water mesh plane */}
      <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 6]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial
          color="#1d4ed8"
          roughness={0.1}
          metalness={0.9}
          opacity={0.65}
          transparent
          wireframe
        />
      </mesh>

      {/* Train and Drone instances */}
      <Train simState={simState} trainRef={trainRef} />
      <DroneSwarm trainRef={trainRef} simState={simState} />
    </>
  );
};

// Main Export containing R3F Canvas
export default function Simulation3DCanvas({ simState }: SceneContentProps) {
  return (
    <Canvas
      camera={{ position: [0, 8, 15], fov: 45 }}
      shadows
      className="w-full h-full min-h-[350px] md:min-h-[450px]"
    >
      <SceneContent simState={simState} />
      <OrbitControls maxPolarAngle={Math.PI / 2.1} minDistance={5} maxDistance={25} />
    </Canvas>
  );
}

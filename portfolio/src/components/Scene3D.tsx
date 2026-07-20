"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.12 + mouse.y * 0.3;
    meshRef.current.rotation.y = t * 0.16 + mouse.x * 0.3;
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.55} />
    </mesh>
  );
}

function InnerGlow() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = -t * 0.08;
    meshRef.current.rotation.z = t * 0.05;
  });
  return (
    <mesh ref={meshRef} scale={1.05}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.25} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <FloatingShape />
      <InnerGlow />
    </Canvas>
  );
}

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text3D, Float, Environment } from "@react-three/drei";
import { useState, useEffect, useRef, Suspense } from "react";
import { gsap } from "gsap";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Componente de estrellas 3D
const Stars3D = () => {
  const starsRef = useRef();
  const [starPositions, setStarPositions] = useState([]);

  useEffect(() => {
    // Generar posiciones aleatorias para las estrellas
    const positions = [];
    for (let i = 0; i < 200; i++) {
      positions.push([
        (Math.random() - 0.5) * 20, // x
        (Math.random() - 0.5) * 20, // y
        (Math.random() - 0.5) * 20  // z
      ]);
    }
    setStarPositions(positions);
  }, []);

  // Animación de las estrellas
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005;
      starsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <group ref={starsRef}>
      {starPositions.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial 
            color={Math.random() > 0.7 ? "#60a5fa" : "#ffffff"} 
            transparent 
            opacity={Math.random() * 0.8 + 0.2}
          />
        </mesh>
      ))}
    </group>
  );
};
export default Stars3D;

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

// Hero principal
const ServiciosHero3D = () => {
  return (
    <section className="relative h-screen bg-gradient-to-br from-[#090c1b] via-[#0c172a] to-[#1e293b] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={<LoadingSpinner />}>
          {/* Luces */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          {/* Estrellas 3D flotantes */}
          <Stars3D />
          
          {/* Título 3D */}
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
            <Text3D 
              font="/fonts/helvetiker_regular.typeface.json" // Fuente por defecto de Three.js
              size={0.8}
              height={0.1}
              position={[0, 1, 0]}
              castShadow
            >
              SERVICIOS
              <meshStandardMaterial 
                color="#60a5fa" 
                emissive="#1e40af"
                emissiveIntensity={0.2}
              />
            </Text3D>
          </Float>

          {/* Subtítulo */}
          <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
            <Text3D 
              font="/fonts/helvetiker_regular.typeface.json"
              size={0.3}
              height={0.05}
              position={[0, 0, 0]}
            >
              INFINITOS
              <meshStandardMaterial 
                color="#a855f7" 
                emissive="#7c3aed"
                emissiveIntensity={0.1}
              />
            </Text3D>
          </Float>
          
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
      
      {/* Overlay con info */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center text-white max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <div className="text-lg text-blue-300 mb-2 opacity-80">Hotel Hilbert presenta</div>
            <h1 className="text-2xl md:text-3xl font-light mb-4 opacity-90">
              Experiencias de Lujo
            </h1>
          </div>
          
          <p className="text-lg opacity-70 mb-8">
            Cada servicio diseñado para superar el infinito
          </p>

          {/* Indicador de scroll */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-auto">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center cursor-pointer hover:border-white/80 transition-colors">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente de loading
const LoadingSpinner = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#60a5fa" wireframe />
    </mesh>
  );
};

export default ServiciosHero3D;
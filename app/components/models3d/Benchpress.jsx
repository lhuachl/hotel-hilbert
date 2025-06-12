//Benchpress.jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useGLTFModel } from '../../hooks/useGLTFmodel';

export default function Benchpress({ scale = 1, autoRotate = true }) {
  const groupRef = useRef();
  const mixerRef = useRef();

  // 🎯 Cargar modelo local
  const { scene,  loading, error } = useGLTFModel('/models/benchpress.glb');

  // 🔄 Animación por frame
  useFrame((state, delta) => {
    // Actualizar animaciones del modelo
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    
    // Rotación automática suave
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  // 🔄 Estados de carga
  if (loading) return <LoadingBenchpress />;
  if (error) return <ErrorBenchpress error={error} />;
  if (!scene) return null;

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.15}>
      <group 
        ref={groupRef} 
        scale={scale}
        position={[0, -0.5, 0]} // Centrar en el suelo
      >
        <primitive object={scene.clone()} />
      </group>
    </Float>
  );
}

// 🔄 Componente de loading personalizado
function LoadingBenchpress() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Barra de pesas temporal */}
      <mesh ref={meshRef} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      
      {/* Pesas */}
      <mesh position={[0, 0.5, 1]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
      <mesh position={[0, 0.5, -1]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
      
      {/* Base de bench */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.3, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

// ❌ Componente de error
function ErrorBenchpress({ error }) {
  console.error('Benchpress loading error:', error);
  
  return (
    <group>
      {/* Mostrar un benchpress básico como fallback */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>
      
      <mesh position={[0, 0.5, 1]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#ff6666" />
      </mesh>
      <mesh position={[0, 0.5, -1]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#ff6666" />
      </mesh>
      
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.3, 0.4]} />
        <meshStandardMaterial color="#cc3333" />
      </mesh>
      
      {/* Texto de error */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  );
}
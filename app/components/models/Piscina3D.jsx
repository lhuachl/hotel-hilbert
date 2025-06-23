import React, { useRef } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import useGLTFModel from '../../hooks/useGLTFModel';

// Piscina3D con animaciones, placeholder y manejo de errores
export default function Piscina3D({ scale = 1, autoRotate = true }) {
  const groupRef = useRef();
  const mixerRef = useRef();
  const { scene, loading, error } = useGLTFModel('/models/piscina.glb');

  useFrame((_, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta);
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;
  if (!scene) return null;

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.15}>
      <group ref={groupRef} scale={scale} position={[0, -0.5, 0]}>
        <primitive object={scene.clone()} />
      </group>
    </Float>
  );
}

// Placeholder de carga
function LoadingComponent() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime) * 0.2;
      meshRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.5) * 0.1;
    }
  });
  return (
    <group>
      <mesh ref={meshRef} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2]} />
        <meshStandardMaterial color="#4299e1" />
      </mesh>
      <mesh position={[0, 0.5, 1]}> <cylinderGeometry args={[0.25, 0.25, 0.15]} /><meshStandardMaterial color="#63b3ed" /></mesh>
      <mesh position={[0, 0.5, -1]}> <cylinderGeometry args={[0.25, 0.25, 0.15]} /><meshStandardMaterial color="#63b3ed" /></mesh>
      <mesh position={[0, 0, 0]}> <boxGeometry args={[1.5, 0.3, 0.4]} /><meshStandardMaterial color="#90cdf4" /></mesh>
    </group>
  );
}

// Fallback de error
function ErrorComponent({ error }) {
  console.error('Error cargando modelo Piscina3D:', error);
  return (
    <group>
      <mesh position={[0, 0.5, 0]}> <cylinderGeometry args={[0.05, 0.05, 2]} /><meshStandardMaterial color="#ff4444" /></mesh>
      <mesh position={[0, 0.5, 1]}> <cylinderGeometry args={[0.25, 0.25, 0.15]} /><meshStandardMaterial color="#ff6666" /></mesh>
      <mesh position={[0, 0.5, -1]}> <cylinderGeometry args={[0.25, 0.25, 0.15]} /><meshStandardMaterial color="#ff6666" /></mesh>
      <mesh position={[0, 0, 0]}> <boxGeometry args={[1.5, 0.3, 0.4]} /><meshStandardMaterial color="#cc3333" /></mesh>
      <mesh position={[0, 1, 0]}> <sphereGeometry args={[0.1]} /><meshBasicMaterial color="red" /></mesh>
    </group>
  );
}

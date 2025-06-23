import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import useGLTFModel from '../../hooks/useGLTFModel';

export default function Restaurante3D() {
  const { scene, loading, error } = useGLTFModel('/models/restaurante.glb');

  if (loading) return <div className="text-center">Cargando modelo...</div>;
  if (error) return <div className="text-center text-red-500">Error al cargar modelo</div>;

  return (
    <div className="w-full h-64">
      <Canvas camera={{ position: [0, 1, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <primitive object={scene} />
        <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} />
      </Canvas>
    </div>
  );
}

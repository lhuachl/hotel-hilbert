import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// Componente de campo de estrellas
const StarField = ({ count = 5000 }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  // Generar posiciones aleatorias para las estrellas
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Distribuir estrellas en una esfera
      const radius = Math.random() * 25 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Colores variados para las estrellas
      const starType = Math.random();
      if (starType < 0.6) {
        // Estrellas blancas/azuladas
        colors[i * 3] = 0.8 + Math.random() * 0.2;     // R
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // G  
        colors[i * 3 + 2] = 1.0;                       // B
      } else if (starType < 0.8) {
        // Estrellas azules
        colors[i * 3] = 0.3 + Math.random() * 0.3;     // R
        colors[i * 3 + 1] = 0.5 + Math.random() * 0.3; // G
        colors[i * 3 + 2] = 1.0;                       // B
      } else {
        // Estrellas doradas/naranjas
        colors[i * 3] = 1.0;                           // R
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3; // G
        colors[i * 3 + 2] = 0.3 + Math.random() * 0.3; // B
      }
    }
    
    return [positions, colors];
  }, [count]);

  // Animación continua
  useFrame((state, delta) => {
    if (ref.current) {
      // Rotación lenta del campo de estrellas
      ref.current.rotation.x += delta * 0.05;
      ref.current.rotation.y += delta * 0.03;
      
      // Efecto de parpadeo
      const time = state.clock.getElapsedTime();
      ref.current.material.opacity = 0.6 + Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group>
      <Points
        ref={ref}
        positions={positions}
        colors={colors}
        stride={3}
        frustumCulled={false}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <PointMaterial
          transparent
          vertexColors
          size={hovered ? 2 : 1.5}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// Nebulosas de fondo
const Nebula = () => {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.z = time * 0.02;
      ref.current.rotation.y = time * 0.01;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -15]} scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        transparent
        uniforms={{
          time: { value: 0 },
          color1: { value: new THREE.Color('#1e3a8a') },
          color2: { value: new THREE.Color('#7c3aed') },
          color3: { value: new THREE.Color('#059669') }
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          varying vec2 vUv;
          
          float noise(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
          }
          
          void main() {
            vec2 uv = vUv * 2.0 - 1.0;
            float dist = length(uv);
            
            float n1 = noise(uv * 3.0 + time * 0.1);
            float n2 = noise(uv * 5.0 + time * 0.15);
            float n3 = noise(uv * 8.0 - time * 0.1);
            
            vec3 color = mix(color1, color2, n1);
            color = mix(color, color3, n2 * 0.5);
            
            float alpha = (1.0 - dist) * 0.1 * n3;
            
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
};

// Planetas/lunas distantes
const DistantPlanets = () => {
  const planetsRef = useRef();

  useFrame((state) => {
    if (planetsRef.current) {
      const time = state.clock.getElapsedTime();
      planetsRef.current.children.forEach((planet, index) => {
        planet.rotation.y = time * (0.1 + index * 0.05);
        planet.position.x = Math.sin(time * (0.2 + index * 0.1)) * (5 + index * 2);
        planet.position.z = Math.cos(time * (0.15 + index * 0.08)) * (8 + index * 3) - 20;
      });
    }
  });

  return (
    <group ref={planetsRef}>
      {/* Planeta azul */}
      <mesh position={[-8, 2, -25]} scale={0.3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Planeta púrpura */}
      <mesh position={[6, -3, -30]} scale={0.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#9333ea"
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Luna pequeña */}
      <mesh position={[0, 4, -18]} scale={0.1}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#e5e7eb"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

// Componente principal del campo de estrellas
const StarField3D = ({ className = "", interactive = true }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 75,
          near: 0.1,
          far: 100
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Luces ambientales */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#60a5fa" />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#a855f7" />
        
        {/* Nebulosas de fondo */}
        <Nebula />
        
        {/* Campo principal de estrellas */}
        <StarField count={3000} />
        
        {/* Estrellas adicionales más lejanas */}
        <group position={[0, 0, -10]} scale={1.5}>
          <StarField count={2000} />
        </group>
        
        {/* Planetas distantes */}
        <DistantPlanets />
        
        {/* Controles opcionales para interacción */}
        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.2}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
        )}
      </Canvas>
    </div>
  );
};

export default StarField3D;
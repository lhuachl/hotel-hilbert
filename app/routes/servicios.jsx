import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Suspense } from "react";
import Navbar from "../components/estaticos/Navbar";
import Footer from "../components/estaticos/Footer";
import Benchpress from "../components/models3d/Benchpress";

export const meta = () => [
  { title: "Servicios 3D | Hotel Hilbert" },
  { name: "description", content: "Explora nuestros servicios premium en 3D." },
];

export default function Servicios() {
  return (
    <>
      <Navbar />

      <div style={{ width: "100%", height: "80vh" }}>
        <Canvas
          shadows
          camera={{ position: [0, 1.2, 4], fov: 50 }}
          style={{ background: "#f0f0f0" }}
        >
          {/* Luces */}
          <ambientLight intensity={0.3} />
          <directionalLight
            castShadow
            position={[2, 5, 2]}
            intensity={1}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* Controles */}
          <OrbitControls
            enablePan
            enableZoom
            enableRotate
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />

          {/* Cielo/Reflexiones */}
          <Environment preset="warehouse" />

          {/* Sombra de contacto */}
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -0.75, 0]}
            opacity={0.4}
            width={5}
            height={5}
            blur={2}
            far={1.5}
          />

          {/* Modelo 3D */}
          <Suspense fallback={null}>
            <Benchpress scale={1.2} autoRotate={true} />
          </Suspense>
        </Canvas>
      </div>

      <Footer />
    </>
  );
}
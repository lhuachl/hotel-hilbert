import  { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import Piscina3D from '../models3d/Piscina3D'

export default function PiscinaCard() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
      
      {/* Lado izquierdo: Modelo 3D */}
      <div className="md:w-1/2 h-64 md:h-96 bg-gray-100">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            Cargando modelo 3D…
          </div>
        }>
          <Canvas
            shadows
            camera={{ position: [0, 1.2, 4], fov: 50 }}
            className="w-full h-full"
          >
            <ambientLight intensity={0.3} />
            <directionalLight
              castShadow
              position={[2, 5, 2]}
              intensity={1}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
            />
            <Environment preset="warehouse" />
            <ContactShadows
              rotation-x={Math.PI / 2}
              position={[0, -0.75, 0]}
              opacity={0.4}
              width={5}
              height={5}
              blur={2}
              far={1.5}
            />
            <Piscina3D scale={1.2} autoRotate />
          </Canvas>
        </Suspense>
      </div>

      {/* Lado derecho: Descripción */}
      <div className="md:w-1/2 p-6 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-2">Piscina de Última Generación</h2>
        <p className="text-gray-700 mb-4">
          Nuestra piscina está equipada con tecnología de punta, 
          iluminación LED y un diseño moderno para que disfrutes de un 
          ambiente relajante y refrescante durante tu estancia.
        </p>
        <a href="/servicios" className="inline-block text-blue-600 hover:underline">
          Ver todos los servicios
        </a>
      </div>
    </div>
  )
}
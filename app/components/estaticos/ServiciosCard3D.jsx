import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import Navbar from "../components/estaticos/Navbar";
import Footer from "../components/estaticos/Footer";
import ServiciosHero3D from "../components/estaticos/ServiciosHero3D";

// Importar modelos 3D

//import Piscina3D from "../components/models/Piscina3D";
//import Restaurante3D from "../components/models/Restaurante3D";
//import Campana3D from "../components/models/Campana3D";
//import Maletin3D from "../components/models/Maletin3D";
//import Auto3D from "../components/models/Auto3D";

export const meta = () => {
  return [
    { title: "Servicios 3D | Hotel Hilbert" },
    { name: "description", content: "Explora nuestros servicios premium en 3D." },
  ];
};

export default function Servicios() {
  
  // Array de servicios directamente aquí
  const serviciosData = [
    {
      id: 1,
      nombre: "Piscina Infinita",
      descripcion: "Sumérgete en una experiencia única con vistas panorámicas al océano. Nuestra piscina infinita de 25 metros te ofrece la sensación de nadar hacia el horizonte.",
      icono: "🏊‍♀️",
      categoria: "RECREACIÓN",
      modelComponent: <Piscina3D />,
      horario: "24/7",
      precio: "Incluido",
      rating: "4.9",
      caracteristicas: [
        "Vista panorámica al océano",
        "Agua climatizada todo el año", 
        "Bar acuático integrado",
        "Área para niños separada"
      ],
      incluye: [
        "Acceso ilimitado para huéspedes",
        "Toallas premium de cortesía",
        "Servicio de bebidas en el agua",
        "Equipo de snorkel disponible"
      ]
    },
    {
      id: 2,
      nombre: "Restaurante Gourmet",
      descripcion: "Una experiencia culinaria extraordinaria dirigida por nuestro chef con estrella Michelin.",
      icono: "🍽️", 
      categoria: "GASTRONOMÍA",
      modelComponent: <Restaurante3D />,
      horario: "7:00 - 23:00",
      precio: "$85",
      rating: "4.8",
      caracteristicas: [
        "Chef con estrella Michelin",
        "Menú degustación exclusivo",
        "Carta de vinos premium",
        "Terraza con vista al mar"
      ],
      incluye: [
        "Menú à la carte completo",
        "Menú degustación de 7 tiempos",
        "Maridaje de vinos disponible",
        "Servicio de sommelier"
      ]
    },
    {
      id: 3,
      nombre: "Gimnasio Premium",
      descripcion: "Centro de fitness de última generación con equipamiento Technogym y entrenadores personales certificados.",
      icono: "💪",
      categoria: "FITNESS",
      modelComponent: <Gym3D />,
      horario: "24/7",
      precio: "Incluido", 
      rating: "4.7",
      caracteristicas: [
        "Equipamiento Technogym",
        "Entrenadores certificados",
        "Clases grupales diarias",
        "Área de cardio panorámica"
      ],
      incluye: [
        "Acceso completo al gimnasio",
        "Sesión de entrenamiento personal",
        "Clases de yoga y pilates",
        "Toallas y agua de cortesía"
      ]
    },
    {
      id: 4,
      nombre: "Servicio VIP",
      descripcion: "Atención personalizada las 24 horas con nuestro equipo de concierge especializado.",
      icono: "🛎️",
      categoria: "CONCIERGE",
      modelComponent: <Campana3D />,
      horario: "24/7",
      precio: "Incluido",
      rating: "4.9",
      caracteristicas: [
        "Concierge personal dedicado",
        "Reservas en restaurantes exclusivos",
        "Tours privados personalizados",
        "Asistencia multiidioma"
      ],
      incluye: [
        "Servicio de concierge 24/7",
        "Reservas en restaurantes",
        "Organización de tours",
        "Servicio de traslados"
      ]
    },
    {
      id: 5,
      nombre: "Centro de Negocios",
      descripcion: "Instalaciones ejecutivas de clase mundial para el viajero de negocios moderno.",
      icono: "💼",
      categoria: "NEGOCIOS",
      modelComponent: <Maletin3D />,
      horario: "24/7",
      precio: "Incluido",
      rating: "4.6",
      caracteristicas: [
        "Salas de juntas equipadas",
        "Tecnología de videoconferencia",
        "Servicio de secretaría",
        "Internet de alta velocidad"
      ],
      incluye: [
        "Acceso a salas de juntas",
        "Equipo de videoconferencia HD",
        "Servicio de impresión",
        "Secretaría ejecutiva"
      ]
    },
    {
      id: 6,
      nombre: "Transporte VIP",
      descripcion: "Flota de vehículos de lujo para traslados exclusivos.",
      icono: "🚗",
      categoria: "TRANSPORTE", 
      modelComponent: <Auto3D />,
      horario: "24/7",
      precio: "$150",
      rating: "4.8",
      caracteristicas: [
        "Flota de vehículos de lujo",
        "Choferes profesionales bilingües",
        "Servicio puerta a puerta",
        "Vehículos climatizados"
      ],
      incluye: [
        "Traslado aeropuerto-hotel",
        "Servicio dentro de la ciudad",
        "Excursiones personalizadas",
        "WiFi en todos los vehículos"
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <ServiciosHero3D />
      
      {/* Sección de servicios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Servicios <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Premium</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada servicio diseñado para crear experiencias inolvidables
            </p>
          </div>

          {/* Cards de servicios */}
          <div className="space-y-20">
            {serviciosData.map((servicio, index) => (
              <ServicioCard 
                key={servicio.id} 
                servicio={servicio} 
                reverse={index % 2 !== 0}
              />
            ))}
          </div>

        </div>
      </section>
      
      <Footer />
    </>
  );
}

// Componente de card directamente en el mismo archivo
function ServicioCard({ servicio, reverse = false }) {
  return (
    <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
      reverse ? 'lg:grid-flow-col-dense' : ''
    }`}>
      
      {/* Sección 3D */}
      <div className={`${reverse ? 'lg:col-start-2' : ''}`}>
        <div className="relative h-96 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl overflow-hidden shadow-2xl">
          
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={<LoadingCube />}>
              
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} />
              
              {servicio.modelComponent}
              
              <OrbitControls 
                enableZoom={false} 
                autoRotate
                autoRotateSpeed={2}
                enablePan={false}
              />
              
              <Environment preset="sunset" />
              
            </Suspense>
          </Canvas>

          {/* Overlay */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
            <div className="text-2xl mb-1">{servicio.icono}</div>
            <div className="text-xs opacity-80">Interactivo</div>
          </div>

        </div>
      </div>

      {/* Sección de contenido */}
      <div className={`space-y-6 ${reverse ? 'lg:col-start-1' : ''}`}>
        
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="text-4xl">{servicio.icono}</div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {servicio.categoria}
            </span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {servicio.nombre}
          </h3>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {servicio.descripcion}
          </p>
        </div>

        {/* Características */}
        <div className="grid grid-cols-2 gap-4">
          {servicio.caracteristicas.map((caracteristica, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 font-medium">{caracteristica}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{servicio.horario}</div>
              <div className="text-sm text-gray-600">Disponibilidad</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{servicio.precio}</div>
              <div className="text-sm text-gray-600">Desde</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{servicio.rating}⭐</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
          </div>
        </div>

        {/* Lo que incluye */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-gray-900">¿Qué incluye?</h4>
          <ul className="space-y-2">
            {servicio.incluye.map((item, index) => (
              <li key={index} className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
            Reservar Ahora
          </button>
          <button className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-4 px-8 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
            Más Información
          </button>
        </div>

      </div>
    </div>
  );
}

// Loading component
function LoadingCube() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#60a5fa" wireframe />
    </mesh>
  );
}
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import RoomCard from "../dinamicos/RoomCard";

// Array de habitaciones de ejemplo para mostrar contenido estático
const defaultRooms = [
  {
    id: 1,
    name: "Suite Deluxe",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
    ],
    isPopular: true,
    price: 180,
    originalPrice: 220,
    available: 4,
    rating: 4.9,
    size: "45m²",
    guests: 3,
    beds: "1 King, 1 Sofá cama",
    description: "Amplia suite con vista al mar, sala de estar, jacuzzi privado y todas las comodidades premium.",
    amenities: ["🛁", "🌅", "☕", "📶", "🧖‍♂️", "🦽", "🧺", "🧴"],
    features: [
      "Desayuno incluido",
      "Late check-out",
      "WiFi Premium",
      "Minibar",
      "Room service 24h"
    ],
    type: "suite"
  },
  {
    id: 2,
    name: "Habitación Doble",
    gallery: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
    ],
    isPopular: false,
    price: 120,
    originalPrice: 120,
    available: 2,
    rating: 4.5,
    size: "28m²",
    guests: 2,
    beds: "2 Matrimoniales",
    description: "Habitación cómoda ideal para parejas o amigos. Incluye WiFi y desayuno buffet.",
    amenities: ["🛁", "📶", "🥐", "🛏️"],
    features: ["Desayuno incluido", "WiFi", "Aire acondicionado"],
    type: "doble"
  },
  {
    id: 3,
    name: "Suite Familiar",
    gallery: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80"
    ],
    isPopular: true,
    price: 250,
    originalPrice: 300,
    available: 1,
    rating: 4.8,
    size: "65m²",
    guests: 5,
    beds: "2 Queen, 1 Sofá cama",
    description: "Perfecta para familias. Espacio amplio y zona de juegos para niños.",
    amenities: ["🛁", "🎮", "📶", "🧸"],
    features: ["Desayuno incluido", "Zona de juegos", "WiFi Premium"],
    type: "familiar"
  },
  // ...puedes agregar más habitaciones si quieres
];

const FeaturedRooms = ({ 
  title = "Nuestras Habitaciones", 
  showFilters = false, 
  maxRooms = null,
  rooms = null 
}) => {
  const sectionRef = useRef(null);
  const roomsGridRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const roomsData = rooms || defaultRooms;
  const displayRooms = maxRooms ? roomsData.slice(0, maxRooms) : roomsData;
  
  const filteredRooms = selectedFilter === 'all' 
    ? displayRooms 
    : displayRooms.filter(room => room.type === selectedFilter);

  useEffect(() => {
    if (roomsGridRef.current) {
      gsap.fromTo(roomsGridRef.current.children,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [selectedFilter]);

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </div>

        {/* Grid de habitaciones */}
        <div ref={roomsGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏨</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No hay habitaciones disponibles</h3>
            <p className="text-gray-600">Intenta con otro filtro o revisa más tarde</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedRooms;
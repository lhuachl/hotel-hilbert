import { useRef, useState } from "react";
import { gsap } from "gsap";

const RoomCard = ({ room }) => {
  const cardRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);

  const handleImageChange = (index) => {
    gsap.to(cardRef.current.querySelector('.room-image'), {
      scale: 0.95,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        setCurrentImage(index);
        gsap.to(cardRef.current.querySelector('.room-image'), {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  };

  return (
    <div 
      ref={cardRef}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full"
    >
      {/* Imagen con gallery */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={room.gallery[currentImage]}
          alt={room.name}
          className="room-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {room.isPopular && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center shadow">
              🔥 Popular
            </span>
          )}
          {room.originalPrice > room.price && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow">
              -{Math.round((1 - room.price/room.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Precio */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow">
          <div className="text-center">
            {room.originalPrice > room.price && (
              <div className="text-xs line-through opacity-70">${room.originalPrice}</div>
            )}
            <div className="text-lg font-bold">${room.price}/noche</div>
          </div>
        </div>

        {/* Gallery dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {room.gallery.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImage === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Disponibilidad */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm shadow">
          <span className={`font-semibold ${room.available > 5 ? 'text-green-600' : room.available > 0 ? 'text-orange-600' : 'text-red-600'}`}>
            {room.available > 0 ? `${room.available} disponibles` : 'Sin disponibilidad'}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {room.name}
          </h3>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm font-semibold text-gray-600">{room.rating}</span>
          </div>
        </div>

        {/* Info rápida */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <span>📐</span>
            <span>{room.size}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>👥</span>
            <span>{room.guests} huéspedes</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🛏️</span>
            <span>{room.beds}</span>
          </div>
        </div>

        {/* Descripción - altura fija para simetría */}
        <p className="text-gray-600 mb-4 line-clamp-2 min-h-[48px]">
          {room.description}
        </p>

        {/* Amenities - altura fija para simetría */}
        <div className="flex flex-wrap gap-2 mb-4 min-h-[32px]">
          {room.amenities.slice(0, 6).map((amenity, index) => (
            <span key={index} className="text-2xl" title="Amenidad">
              {amenity}
            </span>
          ))}
        </div>

        {/* Features destacadas - altura fija para simetría */}
        <div className="mb-6 min-h-[80px] flex flex-col justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-2">Incluye:</div>
            <div className="space-y-1">
              {room.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </div>
              ))}
              {room.features.length > 3 && (
                <div className="text-sm text-blue-600 font-medium">
                  +{room.features.length - 3} más
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botones - siempre pegados abajo */}
        <div className="mt-auto space-y-3">
          <button 
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
              room.available > 0
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={room.available === 0}
          >
            {room.available > 0 ? 'Reservar Ahora' : 'Sin Disponibilidad'}
          </button>
          
          <button className="w-full py-3 px-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
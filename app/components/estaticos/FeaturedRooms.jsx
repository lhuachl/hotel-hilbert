import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturedRooms = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const rooms = [
    {
      id: 1,
      name: "Suite Presidential",
      price: 500,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: ["Vista al océano", "Jacuzzi privado", "Balcón amplio"],
      description: "La suite más lujosa con vistas panorámicas"
    },
    {
      id: 2,
      name: "Deluxe Ocean View",
      price: 250,
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: ["Vista parcial al mar", "Cama king size", "Minibar"],
      description: "Elegancia y confort con toques de lujo"
    },
    {
      id: 3,
      name: "Standard Plus",
      price: 120,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: ["Cama queen", "Escritorio", "Cafetera"],
      description: "Comodidad y estilo a precio accesible"
    }
  ];

  useEffect(() => {
    // Animación del título
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de las cards
    gsap.fromTo(cardsRef.current,
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Nuestras <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Habitaciones</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada habitación diseñada para ofrecerte la máxima comodidad y lujo
          </p>
        </div>

        {/* Grid de habitaciones */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              ref={el => cardsRef.current[index] = el}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -10,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
            >
              {/* Imagen */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${room.price}/noche
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {room.name}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {room.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {room.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Botón */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform group-hover:scale-105">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <a 
            href="/habitaciones"
            className="inline-flex items-center bg-white text-blue-600 font-bold py-4 px-8 rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
          >
            Ver Todas las Habitaciones
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
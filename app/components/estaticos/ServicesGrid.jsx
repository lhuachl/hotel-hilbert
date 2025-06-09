import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesGrid = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    {
      id: 1,
      title: "WiFi de Alta Velocidad",
      description: "Internet gratuito en todas las áreas del hotel",
      icon: "📶",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Piscina Infinita",
      description: "Relájate en nuestra piscina con vista panorámica",
      icon: "🏊‍♀️",
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 3,
      title: "Spa & Wellness",
      description: "Tratamientos de relajación y bienestar",
      icon: "🧘‍♀️",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "Restaurante Gourmet",
      description: "Cocina internacional con chef reconocido",
      icon: "🍽️",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Gimnasio 24/7",
      description: "Equipamiento moderno disponible todo el día",
      icon: "💪",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 6,
      title: "Servicio a la Habitación",
      description: "Atención personalizada las 24 horas",
      icon: "🛎️",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 7,
      title: "Centro de Negocios",
      description: "Salas de reuniones y servicios ejecutivos",
      icon: "💼",
      color: "from-gray-500 to-slate-500"
    },
    {
      id: 8,
      title: "Transporte VIP",
      description: "Traslados al aeropuerto y tours privados",
      icon: "🚗",
      color: "from-indigo-500 to-purple-500"
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
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de las cards con efecto de onda
    gsap.fromTo(cardsRef.current,
      { y: 60, opacity: 0, rotationY: 45 },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: {
          each: 0.15,
          from: "start"
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Nuestros <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Servicios</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Disfruta de amenidades de clase mundial diseñadas para hacer tu estadía inolvidable
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => cardsRef.current[index] = el}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -8,
                  scale: 1.02,
                  duration: 0.3,
                  ease: "power2.out"
                });
                
                // Efecto de glow en el gradiente
                gsap.to(e.currentTarget.querySelector('.gradient-bg'), {
                  scale: 1.1,
                  opacity: 0.1,
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out"
                });
                
                gsap.to(e.currentTarget.querySelector('.gradient-bg'), {
                  scale: 1,
                  opacity: 0,
                  duration: 0.3
                });
              }}
            >
              {/* Background gradient (invisible por defecto) */}
              <div className={`gradient-bg absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-300`}></div>
              
              {/* Contenido */}
              <div className="relative z-10">
                {/* Icono */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                {/* Título */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                
                {/* Descripción */}
                <p className="text-gray-600 group-hover:text-gray-100 transition-colors duration-300">
                  {service.description}
                </p>
                
                {/* Indicador de hover */}
                <div className="mt-4 flex items-center text-blue-600 group-hover:text-white transition-colors duration-300">
                  <span className="text-sm font-semibold">Saber más</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center">
            <p className="text-gray-600 mb-4 text-lg">
              ¿Necesitas algo específico? Nuestro equipo está aquí para ayudarte
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Contactar Concierge
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
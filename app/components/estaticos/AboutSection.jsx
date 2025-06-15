import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    // Parallax de imagen
    gsap.to(imageRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Animación del contenido
    gsap.fromTo(contentRef.current.children,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de estadísticas (números contadores)
    statsRef.current.forEach((stat, index) => {
      if (stat) {
        const finalValue = stat.dataset.value;
        gsap.fromTo(stat, 
          { textContent: 0 },
          {
            textContent: finalValue,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Imagen */}
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden group">
            <img 
              ref={imageRef}
              src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Hotel Hilbert Lobby"
              className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            
            {/* Badge flotante */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-gray-900">Est. 1995</span>
            </div>
          </div>

          {/* Contenido */}
          <div ref={contentRef} className="space-y-6">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              Sobre Nosotros
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Una experiencia <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">infinita</span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Inspirado en el matemático David Hilbert y su concepto del infinito, 
              nuestro hotel redefine los límites de la hospitalidad de lujo.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              Cada habitación es un universo único de comodidad y elegancia. 
              Desde nuestras suites presidenciales hasta nuestros servicios de clase mundial, 
              ofrecemos experiencias que trascienden lo ordinario.
            </p>

            {/* Stats animados */}
            <div className="grid grid-cols-3 gap-8 py-8 border-t border-gray-200">
              <div className="text-center group">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <span ref={el => statsRef.current[0] = el} data-value="∞">0</span>
                </div>
                <div className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Habitaciones Disponibles</div>
              </div>
              
              <div className="text-center group">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <span ref={el => statsRef.current[1] = el} data-value="69">0</span>+
                </div>
                <div className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Años de Excelencia</div>
              </div>
              
              <div className="text-center group">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <span ref={el => statsRef.current[2] = el} data-value="1000">0</span>%
                </div>
                <div className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Satisfacción Garantizada</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
                Nuestra Historia
              </button>
              
              <button className="border-2 border-blue-600 text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
                Ver Galería
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
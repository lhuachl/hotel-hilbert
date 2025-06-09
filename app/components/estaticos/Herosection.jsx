import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugin GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/* 
  AuroraField: Capa de auroras animadas (parallax y color shift)
*/
const AuroraField = () => {
  const auroraRef = useRef(null);

  useEffect(() => {
    // Animación de ondulación parallax y shift de colores
    gsap.to(auroraRef.current.children, {
      y: (i) => gsap.utils.random(-20, 20),
      x: (i) => gsap.utils.random(-30, 30),
      filter: "blur(40px)",
      repeat: -1,
      yoyo: true,
      duration: 5,
      stagger: 0.3,
      ease: "sine.inOut"
    });
  }, []);

  // Capas de auroras
  const auroras = [
    {
      id: 1,
      className: "aurora-bg aurora-1",
      style: {
        left: "10%",
        top: "15%",
        width: "50vw",
        height: "25vw",
        background: "radial-gradient(circle at 30% 60%, #8b5cf6 0%, #1e293b 80%)",
        opacity: 0.7
      }
    },
    {
      id: 2,
      className: "aurora-bg aurora-2",
      style: {
        right: "0%",
        top: "30%",
        width: "60vw",
        height: "25vw",
        background: "radial-gradient(circle at 70% 40%, #38bdf8 10%, transparent 80%)",
        opacity: 0.5
      }
    },
    {
      id: 3,
      className: "aurora-bg aurora-3",
      style: {
        left: "20%",
        bottom: "5%",
        width: "40vw",
        height: "18vw",
        background: "radial-gradient(circle at 60% 80%, #22d3ee 30%, transparent 90%)",
        opacity: 0.4
      }
    },
    {
      id: 4,
      className: "aurora-bg aurora-4",
      style: {
        right: "10%",
        bottom: "15%",
        width: "30vw",
        height: "18vw",
        background: "radial-gradient(circle at 80% 80%, #f0abfc 10%, transparent 80%)",
        opacity: 0.4
      }
    }
  ];

  return (
    <div ref={auroraRef} className="absolute inset-0 pointer-events-none select-none z-[1]">
      {auroras.map(a => (
        <div
          key={a.id}
          className={a.className}
          style={{
            position: "absolute",
            ...a.style,
            filter: "blur(70px)",
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
};

/* 
  Capa de estrellas animadas
*/
const StarField = () => {
  const starsRef = useRef(null);

  useEffect(() => {
    const stars = starsRef.current.children;
    Array.from(stars).forEach((star) => {
      gsap.to(star, {
        opacity: Math.random() * 0.7 + 0.25,
        scale: Math.random() * 0.7 + 0.5,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 4,
        ease: "power2.inOut"
      });
    });
  }, []);

  // Generamos las estrellas con posiciones y tamaños aleatorios
  const stars = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2.5 + 0.7
  }));

  return (
    <div ref={starsRef} className="absolute inset-0 pointer-events-none select-none z-[2]">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute bg-white opacity-80 rounded-full"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            filter: "blur(0.5px)",
            boxShadow: "0 0 5px 1.5px #fff6"
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const auroraContainerRef = useRef(null);
  const starsContainerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Seguimiento de mouse para parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Animación de entrada secuencial con GSAP
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.25, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.7"
    )
    .fromTo(buttonsRef.current.children,
      { y: 30, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.18, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Parallax en scroll: aurora, estrellas
    gsap.to(auroraContainerRef.current, {
      yPercent: -32,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    gsap.to(starsContainerRef.current, {
      yPercent: -38,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Fade out de contenido al hacer scroll (solo subtítulo y botones)
    gsap.to([subtitleRef.current, buttonsRef.current], {
      opacity: 0,
      y: -100,
      ease: "power2.out",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "50% top",
        scrub: true
      }
    });
  }, []);

  // Parallax con mouse (aurora y estrellas)
  useEffect(() => {
    gsap.to(auroraContainerRef.current, {
      x: (mousePosition.x - 50) * 0.8,
      y: (mousePosition.y - 50) * 0.6,
      duration: 2.2,
      ease: "power2.out"
    });
    gsap.to(starsContainerRef.current, {
      x: (mousePosition.x - 50) * 0.45,
      y: (mousePosition.y - 50) * 0.32,
      duration: 2.2,
      ease: "power2.out"
    });
  }, [mousePosition]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-[#090c1b] via-[#0c172a] to-[#1e293b] overflow-hidden"
    >
      {/* Aurora background parallax */}
      <div ref={auroraContainerRef} className="absolute inset-0 w-full h-full scale-110 z-[1]">
        <AuroraField />
      </div>
      {/* Star parallax */}
      <div ref={starsContainerRef} className="absolute inset-0 w-full h-full z-[2] pointer-events-none">
        <StarField />
      </div>
      {/* Overlay oscuro/blureado */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2.5px] z-[3]"></div>
      {/* Contenido principal */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl cursor-default hero-title"
          onMouseEnter={() => {
            gsap.to(titleRef.current, {
              scale: 1.07,
              duration: 0.3,
              ease: "power2.out"
            });
          }}
          onMouseLeave={() => {
            gsap.to(titleRef.current, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }}
        >
          Hotel Hilbert
        </h1>
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed"
        >
          Donde cada noche es infinitamente especial <span role="img" aria-label="estrella">✨</span>
        </p>
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            className="group bg-gradient-to-r from-indigo-900 via-violet-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-400 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hero-btn-primary"
            onMouseEnter={(e) => {
              gsap.to(e.target, {
                boxShadow: "0 20px 40px rgba(34,211,238,0.27), 0 0 32px 6px #6366f1cc",
                duration: 0.4
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, {
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                duration: 0.35
              });
            }}
          >
            <span className="group-hover:animate-pulse">Explorar Habitaciones</span>
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-10 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm hero-btn-secondary">
            Reservar Ahora
          </button>
        </div>
      </div>
      {/* Indicador de scroll animado */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2 tracking-widest">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
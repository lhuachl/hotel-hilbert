'use client';

import { useState, useEffect, useRef } from 'react';
import { Link } from '@remix-run/react';

export const meta = () => [
  { title: "Iniciar Sesión | Hotel Hilbert" },
  { name: "description", content: "Accede a tu cuenta del Hotel Hilbert" },
  { property: "og:title", content: "Login - Hotel Hilbert" },
  { property: "og:description", content: "Inicia sesión en tu cuenta" }
];

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Referencias para animaciones GSAP
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const particlesRef = useRef([]);
  const backgroundRef = useRef(null);
  const starsRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadGSAP = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Crear partículas y estrellas
        createParticles();
        createStars();

        // Timeline de animaciones
        const tl = gsap.timeline();

        // Animación inicial del container con efecto 3D
        tl.fromTo(containerRef.current, 
          { 
            opacity: 0,
            scale: 0.8,
            rotationY: 25,
            z: -200
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 1.4,
            ease: "back.out(1.7)"
          }
        );

        // Animación del título con efecto de escritura
        tl.fromTo(titleRef.current?.querySelectorAll('.title-word') || [],
          {
            opacity: 0,
            y: -80,
            rotationX: 90,
            scale: 0.5
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(2)"
          }, "-=0.8"
        );

        // Animación secuencial de inputs con efecto de deslizamiento
        inputRefs.current.forEach((input, index) => {
          if (input) {
            tl.fromTo(input,
              {
                opacity: 0,
                x: -120,
                rotationY: 45,
                scale: 0.9
              },
              {
                opacity: 1,
                x: 0,
                rotationY: 0,
                scale: 1,
                duration: 0.7,
                ease: "power3.out"
              }, `-=${0.6 - (index * 0.1)}`
            );
          }
        });

        // Animación del botón con rebote
        tl.fromTo(buttonRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
            rotationZ: -5
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationZ: 0,
            duration: 0.8,
            ease: "back.out(2)"
          }, "-=0.4"
        );

        // Animación continua del fondo
        gsap.to(backgroundRef.current, {
          backgroundPosition: "400% 400%",
          duration: 25,
          repeat: -1,
          ease: "none"
        });

        // Animación de las estrellas
        if (starsRef.current) {
          Array.from(starsRef.current.children).forEach((star) => {
            gsap.to(star, {
              opacity: Math.random() * 0.8 + 0.2,
              scale: Math.random() * 0.7 + 0.3,
              rotation: 360,
              duration: Math.random() * 4 + 3,
              repeat: -1,
              yoyo: true,
              delay: Math.random() * 3,
              ease: "power2.inOut"
            });
          });
        }

        // Configurar animaciones hover
        setupHoverAnimations(gsap);

      } catch (error) {
        console.error('Error loading GSAP:', error);
      }
    };

    loadGSAP();
  }, []);

  const createParticles = () => {
    const container = containerRef.current;
    if (!container) return;

    // Limpiar partículas existentes
    particlesRef.current.forEach(p => p.remove());
    particlesRef.current = [];

    for (let i = 0; i < 35; i++) {
      const particle = document.createElement('div');
      const colors = ['bg-blue-400/20', 'bg-purple-400/15', 'bg-emerald-400/15', 'bg-amber-400/10'];
      const sizes = ['w-1 h-1', 'w-1.5 h-1.5', 'w-0.5 h-0.5'];
      
      particle.className = `absolute ${colors[i % colors.length]} ${sizes[i % sizes.length]} rounded-full pointer-events-none`;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (2 + Math.random() * 3) + 's';
      particle.classList.add('animate-pulse');
      
      container.appendChild(particle);
      particlesRef.current.push(particle);
    }
  };

  const createStars = () => {
    const starsContainer = starsRef.current;
    if (!starsContainer) return;

    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      star.innerHTML = '✦';
      star.className = 'absolute text-blue-200/30 pointer-events-none select-none';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.fontSize = (Math.random() * 12 + 8) + 'px';
      
      starsContainer.appendChild(star);
    }
  };

  const setupHoverAnimations = (gsap) => {
    // Hover mejorado en inputs
    inputRefs.current.forEach((input, index) => {
      if (input) {
        input.addEventListener('mouseenter', () => {
          gsap.to(input, {
            scale: 1.02,
            y: -2,
            boxShadow: "0 12px 30px rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(59, 130, 246, 0.5)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        input.addEventListener('mouseleave', () => {
          gsap.to(input, {
            scale: 1,
            y: 0,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        input.addEventListener('focus', () => {
          gsap.to(input, {
            scale: 1.01,
            borderColor: "rgba(59, 130, 246, 0.8)",
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2), 0 8px 25px rgba(59, 130, 246, 0.15)",
            duration: 0.2
          });
        });

        input.addEventListener('blur', () => {
          gsap.to(input, {
            scale: 1,
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            duration: 0.2
          });
        });
      }
    });

    // Hover sofisticado en botón
    if (buttonRef.current) {
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          y: -3,
          rotationY: 2,
          boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4), 0 0 20px rgba(147, 51, 234, 0.3)",
          duration: 0.3,
          ease: "power2.out"
        });
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          y: 0,
          rotationY: 0,
          boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3), 0 0 15px rgba(147, 51, 234, 0.2)",
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Animación de carga mejorada
    if (typeof window !== 'undefined') {
      const { gsap } = await import('gsap');
      
      // Efecto de pulsación en el botón
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });

      // Efecto de loading en el formulario
      gsap.to(formRef.current, {
        opacity: 0.8,
        scale: 0.98,
        filter: "blur(1px)",
        duration: 0.4,
        ease: "power2.out"
      });
    }

    // Simular autenticación
    setTimeout(async () => {
      setIsLoading(false);
      
      // Resetear animaciones
      if (typeof window !== 'undefined') {
        const { gsap } = await import('gsap');
        gsap.to(formRef.current, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.3,
          ease: "power2.out"
        });
      }
      
      console.log('Login attempt:', formData);
    }, 2500);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fondo con paleta oscura del hotel */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              #090c1b 0%, 
              #0c172a 25%, 
              #1e293b 50%, 
              #0f172a 75%, 
              #1e1b4b 100%
            )
          `,
          backgroundSize: '400% 400%'
        }}
      />

      {/* Efectos de luz ambiental */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Overlay con patrón geométrico */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2L74 40h-2zm4 0l4-4v2L78 40h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Estrellas de fondo */}
      <div ref={starsRef} className="absolute inset-0 pointer-events-none" />

      {/* Container principal */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-md p-8"
        style={{ perspective: '1200px' }}
      >
        {/* Formulario con glassmorphism mejorado */}
        <div 
          ref={formRef}
          className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10 p-8"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.08) 0%, 
                rgba(255, 255, 255, 0.03) 100%
              )
            `,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              0 0 0 1px rgba(255, 255, 255, 0.05)
            `
          }}
        >
          {/* Efectos de brillo internos */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/3 via-transparent to-blue-500/5 pointer-events-none rounded-3xl" />
          <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute bottom-0 right-1/4 w-1/3 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
          
          {/* Logo/Icono del hotel */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10 mb-4">
              <span className="text-2xl">🏨</span>
            </div>
          </div>
          
          {/* Título */}
          <div className="text-center mb-8">
            <h1 ref={titleRef} className="text-3xl font-bold mb-3 leading-tight">
              <span className="title-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400 mr-2">
                Bienvenido
              </span>
              <span className="title-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-400 mr-2">
                de
              </span>
              <span className="title-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-400">
                vuelta
              </span>
            </h1>
            <p className="text-gray-300/80 text-sm font-medium">
              Hotel Hilbert • Portal de Acceso
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email mejorado */}
            <div>
              <label className="block text-sm font-semibold text-gray-200/90 mb-3">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  Correo electrónico
                </span>
              </label>
              <input
                ref={el => inputRefs.current[0] = el}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400/70 focus:outline-none transition-all duration-300 backdrop-blur-sm font-medium text-sm"
                placeholder="tu@email.com"
                style={{
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                }}
              />
            </div>

            {/* Password mejorado */}
            <div>
              <label className="block text-sm font-semibold text-gray-200/90 mb-3">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Contraseña
                </span>
              </label>
              <div className="relative">
                <input
                  ref={el => inputRefs.current[1] = el}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400/70 focus:outline-none transition-all duration-300 backdrop-blur-sm pr-12 font-medium text-sm"
                  placeholder="••••••••••"
                  style={{
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-200 p-1 rounded-lg hover:bg-white/10"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me y forgot password */}
            <div 
              ref={el => inputRefs.current[2] = el}
              className="flex items-center justify-between"
            >
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500/50 focus:ring-2 transition-all duration-200"
                />
                <span className="ml-3 text-sm text-gray-300/90 group-hover:text-white transition-colors duration-200 font-medium">
                  Recordarme
                </span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline font-medium"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón de submit mejorado */}
            <button
              ref={buttonRef}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group text-sm"
              style={{
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3), 0 0 15px rgba(147, 51, 234, 0.2)'
              }}
            >
              {/* Efecto de brillo animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              
              <span className="relative flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    INICIAR SESIÓN
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Enlaces adicionales */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-gray-300/80 text-sm">
              ¿No tienes cuenta?{' '}
              <Link 
                to="/register" 
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link 
              to="/" 
              className="text-gray-400/80 hover:text-white text-sm transition-colors duration-200 inline-flex items-center group font-medium"
            >
              <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Hotel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
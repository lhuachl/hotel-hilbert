import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const starsRef = useRef(null);
  const contentRef = useRef(null);

  // Datos del footer
  const quickLinks = [
    { name: "Inicio", href: "/" },
    { name: "Habitaciones", href: "/habitaciones" },
    { name: "Servicios", href: "/servicios" },
    { name: "Reservas", href: "/reservas" },
    { name: "Contacto", href: "/contacto" }
  ];

  const services = [
    { name: "Spa & Wellness", href: "/spa" },
    { name: "Restaurante", href: "/restaurante" },
    { name: "Centro de Negocios", href: "/negocios" },
    { name: "Piscina", href: "/piscina" },
    { name: "Gimnasio", href: "/gimnasio" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "📘", href: "#" },
    { name: "Instagram", icon: "📸", href: "#" },
    { name: "Twitter", icon: "🐦", href: "#" },
    { name: "LinkedIn", icon: "💼", href: "#" }
  ];

  useEffect(() => {
    // Estrellas animadas en el footer
    const stars = starsRef.current.children;
    Array.from(stars).forEach((star) => {
      gsap.to(star, {
        opacity: Math.random() * 0.8 + 0.2,
        scale: Math.random() * 0.8 + 0.5,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2,
        ease: "power2.inOut"
      });
    });

    // Animación de entrada del contenido
    gsap.fromTo(contentRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  // Generar estrellas para el footer
  const generateFooterStars = () => {
    const stars = [];
    for (let i = 0; i < 30; i++) {
      stars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1
      });
    }
    return stars;
  };

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden"
    >
      {/* Estrellas de fondo */}
      <div ref={starsRef} className="absolute inset-0 pointer-events-none">
        {generateFooterStars().map(star => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full opacity-60"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}
      </div>

      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Contenido principal */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Sección superior */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          
          {/* Logo y descripción */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Hotel Hilbert
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Donde cada noche es infinitamente especial. Experiencias de lujo 
              que trascienden lo ordinario.
            </p>
            
            {/* Certificaciones */}
            <div className="flex space-x-4">
              <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                5⭐ Premium
              </div>
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                Eco Friendly
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-blue-300">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block group"
                  >
                    <span className="group-hover:text-blue-400">→</span> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-purple-300">Servicios</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.href}
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block group"
                  >
                    <span className="group-hover:text-purple-400">→</span> {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-green-300">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold">Ubicación</p>
                  <p className="text-sm">Av. Infinito 123, Paradise City</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-semibold">Reservas</p>
                  <p className="text-sm">+1 (555) 123-HOTEL</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm">info@hotelhilbert.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold mb-4">
              Suscríbete a nuestras <span className="text-blue-400">ofertas especiales</span>
            </h4>
            <p className="text-gray-300 mb-6">
              Recibe descuentos exclusivos y noticias de eventos especiales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Redes sociales y copyright */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Redes sociales */}
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl hover:bg-white/20 hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right text-gray-400">
              <p className="mb-1">© 2024 Hotel Hilbert. Todos los derechos reservados.</p>
              <p className="text-sm">
                Diseñado con ❤️ para experiencias infinitas
              </p>
            </div>
          </div>
        </div>

        {/* Botón volver arriba */}
        <div className="text-center mt-8">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
          >
            <span className="group-hover:-translate-y-1 inline-block transition-transform duration-300">
              ⬆️ Volver arriba
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
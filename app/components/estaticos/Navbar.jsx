import { Link, useLocation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navLinks = [
  { href: "/", label: "Inicio", icon: "🏠" },
  { href: "/habitaciones", label: "Habitaciones", icon: "🛏️" },
  { href: "/servicios", label: "Servicios", icon: "🛎️" },
  { href: "/historia", label: "Historia", icon: "📞" },
  { href: "/login", label: "Login", icon: "📧" },
];

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const starsRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animaciones
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(logoRef.current,
      { x: -50, opacity: 0, scale: 0.8 },
      { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    )
    .fromTo(navRef.current.querySelectorAll(".nav-item"),
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
      "-=0.5"
    );

    // Estrellas
    if (starsRef.current) {
      Array.from(starsRef.current.children).forEach((star) => {
        gsap.to(star, {
          opacity: Math.random() * 0.6 + 0.3,
          scale: Math.random() * 0.5 + 0.5,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 2,
          ease: "power2.inOut"
        });
      });
    }
  }, []);

  const isActive = (href) => location.pathname === href;

  const generateNavStars = () => {
    return Array.from({length: 15}, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 1 + 0.5
    }));
  };

  // 🎨 ESTILOS CENTRALIZADOS (todo oscuro, no más blanco)
  const navbarClasses = isScrolled
    ? "bg-gradient-to-r from-[#090c1b] via-[#0c172a] to-[#1e293b] backdrop-blur-xl shadow-2xl py-4 border-b border-blue-500/30"
    : "bg-gradient-to-r from-[#090c1b]/90 via-[#0c172a]/90 to-[#1e293b]/90 backdrop-blur-md py-8";

  const logoClasses = isScrolled
    ? "text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
    : "text-4xl text-white drop-shadow-lg";

  const linkClasses = (active) => {
    const base = "flex items-center space-x-2 transition-all duration-300 relative overflow-hidden group-hover:scale-105 rounded-full";
    const size = isScrolled ? "px-4 py-2" : "px-6 py-3";
    
    if (active) {
      return `${base} ${size} bg-blue-600/80 text-white backdrop-blur-sm border border-blue-400/50 shadow-lg`;
    }
    
    return `${base} ${size} text-gray-300 hover:bg-white/10 hover:text-white`;
  };

  const ctaClasses = isScrolled
    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600";

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${navbarClasses}`}>
        
        {/* Estrellas solo cuando no hay scroll */}
        {!isScrolled && (
          <div ref={starsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            {generateNavStars().map(star => (
              <div
                key={star.id}
                className="absolute bg-blue-200 rounded-full opacity-60"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
              />
            ))}
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div ref={logoRef} className="flex-shrink-0 relative z-10">
              <Link to="/" className="group">
                <h1 className={`font-bold transition-all duration-300 group-hover:scale-105 ${logoClasses}`}>
                  Hotel Hilbert
                </h1>
                <div className="h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2" ref={navRef}>
              {navLinks.map((link) => (
                <div key={link.href} className="nav-item relative group">
                  <Link to={link.href} className={linkClasses(isActive(link.href))}>
                    <span className={`relative z-10 ${isScrolled ? 'text-lg' : 'text-xl'}`}>
                      {link.icon}
                    </span>
                    <span className={`font-medium relative z-10 ${isScrolled ? 'text-base' : 'text-lg'}`}>
                      {link.label}
                    </span>
                  </Link>
                </div>
              ))}
              
              {/* CTA Button */}
              <div className="nav-item ml-4">
                <Link 
                  to="/reservar"
                  className={`px-6 py-2 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${ctaClasses}`}
                >
                  ✨ Reservar Ahora
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={isMobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20">
              <div className="space-y-2 pt-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    to={link.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(link.href)
                        ? 'bg-blue-600/50 text-white font-semibold'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
                
                <div className="pt-4">
                  <Link 
                    to="/reservar"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <span>✨</span>
                    <span>Reservar Ahora</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
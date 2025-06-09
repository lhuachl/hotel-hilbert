import { Link } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/habitaciones", label: "Habitaciones" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Tu animación original + logo
    const tl = gsap.timeline();
    
    if (logoRef.current) {
      tl.fromTo(logoRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
    
    tl.fromTo(
      navRef.current.querySelectorAll("li"),
      { y: -40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
      },
      "-=0.3"
    );
  }, []);

  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        {/* Logo simple */}
        <div ref={logoRef} className="navbar-logo">
          <Link to="/">
           <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
  Hotel Hilbert
</h1>
          </Link>
        </div>

        {/* Tu navegación original */}
        <ul className="navbar-list" ref={navRef}>
          {navLinks.map((link) => (
            <li key={link.href} className="navbar-item">
              <Link to={link.href} className="navbar-link">
                {link.label}
              </Link>
            </li>
          ))}
          
          {/* Espacio para login cuando lo explores */}
          <li className="navbar-item">
            <Link to="/login" className="navbar-link navbar-login">
              Iniciar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
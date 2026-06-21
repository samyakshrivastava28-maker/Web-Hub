import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const LOGO_URL = "https://ik.imagekit.io/hx85ktgzm/S-Web-Hub-Logo.webp";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' }
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="relative group flex items-center">
            <img 
              src={LOGO_URL} 
              alt="S-Web Hub Logo" 
              className="h-14 md:h-20 w-auto transition-transform duration-500 group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link 
              to="/contact" 
              className="px-6 py-2.5 text-sm font-semibold text-black bg-white hover:bg-white/90 transition-colors rounded-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#050505] flex flex-col px-6 py-8"
          >
            <div className="flex justify-between items-center mb-16">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img src={LOGO_URL} alt="Logo" className="h-10 w-auto" />
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 mt-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-medium text-white tracking-tight"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 text-2xl font-medium text-white/50 hover:text-white"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

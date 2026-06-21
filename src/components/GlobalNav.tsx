import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const LOGO_URL = "https://ik.imagekit.io/hx85ktgzm/S-Web-Hub-logo%20(1).webp";

interface NavLink {
  label: string;
  path: string;
}

interface NavGroup {
  title: string;
  links: NavLink[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Agency",
    links: [
      { label: "Home", path: "/" },
      { label: "About Services", path: "/services" },
      { label: "Portfolio", path: "/portfolio" },
      { label: "Pricing", path: "/pricing" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Email Us", path: "/contact" },
      { label: "WhatsApp", path: "/contact" },
      { label: "Book Consultation", path: "/contact" },
    ],
  },
];

export default function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userProfile, logout, backendError } = useAuth();
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {backendError && (
        <div className="fixed top-0 left-0 right-0 z-[100000] bg-red-600 text-white text-xs md:text-sm font-semibold text-center py-2 px-4 shadow-lg flex items-center justify-center gap-2 border-b border-red-700/50">
          ⚠️ {backendError} Please check your Firebase Console configuration.
        </div>
      )}
      {/* ── Fixed Top Bar ── */}
      <div
        className="fixed left-0 right-0 z-[10000] transition-all duration-500"
        style={{
          top: backendError ? '36px' : '0',
          paddingTop: 'env(safe-area-inset-top, 0px)',
          backgroundColor: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="flex items-center justify-between px-5 md:px-8 h-16 md:h-[72px]">
          {/* Logo — visually dominant */}
          <Link to="/" className="group flex items-center gap-3" onClick={closeMenu}>
            <div className="w-11 h-11 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-lg transition-transform duration-500 group-hover:scale-110 border-2 border-white/20 flex-shrink-0">
              <img
                src={LOGO_URL}
                alt="S-Web Hub Logo"
                className="w-[120%] h-[120%] object-cover"
              />
            </div>
            <span className="text-white font-semibold text-sm md:text-base tracking-tight hidden sm:block">
              S-Web Hub
            </span>
          </Link>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            {currentUser ? (
              <div className="hidden md:flex items-center gap-3">
                {currentUser.email === 'webhub2811@gmail.com' && (
                  <button
                    onClick={() => { navigate('/host-dashboard'); closeMenu(); }}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold text-sm bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all duration-300 hover:scale-[1.02] shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                  >
                    Host Panel
                  </button>
                )}
                <button
                  onClick={() => { navigate('/dashboard'); closeMenu(); }}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold text-sm bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]"
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform"
                  >
                    {userProfile?.photoURL ? (
                      <img src={userProfile.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-bold text-white">{getInitials(userProfile?.name || currentUser.email || 'U')}</span>
                    )}
                  </button>
                  <AnimatePresence>
                    {isProfileOpen && (
                      <>
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          exit={{ opacity: 0 }} 
                          className="fixed inset-0 z-40" 
                          onClick={() => setIsProfileOpen(false)} 
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-3 w-64 bg-[#0A0A0A] border border-white/[0.08] rounded-2xl shadow-2xl z-50 overflow-hidden"
                        >
                          <div className="p-4 border-b border-white/[0.08]">
                            <p className="text-sm font-semibold text-white truncate">{userProfile?.name || 'User'}</p>
                            <p className="text-xs text-white/40 truncate">{userProfile?.email || currentUser.email}</p>
                          </div>
                          <div className="p-2 flex flex-col gap-1">
                            <button onClick={() => { navigate('/dashboard'); setIsProfileOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3 transition-colors">
                              <LayoutDashboard className="w-4 h-4" /> Dashboard
                            </button>
                            <button onClick={() => { setIsProfileOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3 transition-colors">
                              <Settings className="w-4 h-4" /> Account Settings
                            </button>
                            <button onClick={async () => { 
                              console.log("[AUTH] Logout initiated");
                              await logout(); 
                              setIsProfileOpen(false); 
                              navigate('/');
                              console.log("[AUTH] Logout completed");
                            }} className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-3 transition-colors mt-1">
                              <LogOut className="w-4 h-4" /> Logout
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => { navigate('/login', { state: { from: location.pathname } }); closeMenu(); }}
                  className="flex items-center justify-center px-5 py-2.5 rounded-full font-semibold text-sm bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { navigate('/register', { state: { from: location.pathname } }); closeMenu(); }}
                  className="flex items-center justify-center px-5 py-2.5 rounded-full font-semibold text-sm bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-[1.02]"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Hamburger — large touch target (48px+) */}
            <button
              onClick={() => setIsOpen(prev => !prev)}
              className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95"
              style={{
                backgroundColor: isOpen ? 'rgba(255,255,255,0.15)' : (scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.06)'),
              }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="w-5 flex flex-col items-center justify-center gap-[5px]">
                <span
                  className="block h-[1.5px] w-5 bg-white rounded-full transition-all duration-400 origin-center"
                  style={{
                    transform: isOpen ? 'rotate(45deg) translateY(3.25px)' : 'none',
                  }}
                />
                <span
                  className="block h-[1.5px] bg-white rounded-full transition-all duration-400 origin-center"
                  style={{
                    width: isOpen ? '20px' : '14px',
                    transform: isOpen ? 'rotate(-45deg) translateY(-3.25px)' : 'none',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Fullscreen Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[9998] bg-black/50"
            />

            {/* Menu Panel — simple slide down, no heavy clip-path */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[9999] bg-[#0A0A0A] overflow-y-auto overscroll-contain"
              style={{
                paddingTop: 'calc(env(safe-area-inset-top, 0px) + 5rem)',
                paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2rem)',
              }}
            >
              <div className="max-w-lg mx-auto px-6 md:px-8">
                {/* Nav Groups */}
                <div className="space-y-10">
                  {NAV_GROUPS.map((group, gi) => (
                    <motion.div
                      key={group.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + gi * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/35 mb-5 font-medium">{group.title}</p>
                      <div className="space-y-0.5">
                        {group.links.map((link, li) => (
                          <motion.div
                            key={link.label}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + gi * 0.08 + li * 0.04, duration: 0.35 }}
                          >
                            <Link
                              to={link.path}
                              onClick={closeMenu}
                              className="group/link flex items-center justify-between py-4 border-b border-white/[0.06] active:bg-white/5 transition-colors duration-200 -mx-3 px-3 rounded-lg"
                            >
                              <span className="text-[22px] md:text-[28px] font-medium text-white/90 group-hover/link:text-white transition-colors tracking-tight">
                                {link.label}
                              </span>
                              <ArrowUpRight className="w-5 h-5 text-white/25 group-hover/link:text-white/70 transition-all duration-300" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="mt-14 pt-8 border-t border-white/[0.08]"
                >
                  {currentUser ? (
                    <div className="flex flex-col gap-3">
                      {currentUser.email === 'webhub2811@gmail.com' && (
                        <button
                          onClick={() => { navigate('/host-dashboard'); closeMenu(); }}
                          className="flex-1 py-4 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-base font-semibold active:scale-[0.98] transition-transform duration-200"
                        >
                          Host Panel
                        </button>
                      )}
                      <button
                        onClick={() => { navigate('/dashboard'); closeMenu(); }}
                        className="flex-1 py-4 bg-white/10 text-white border border-white/20 rounded-full text-base font-semibold active:scale-[0.98] transition-transform duration-200"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={async () => { 
                          console.log("[AUTH] Logout initiated");
                          await logout(); 
                          closeMenu(); 
                          navigate('/');
                          console.log("[AUTH] Logout completed");
                        }}
                        className="py-4 px-6 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-base font-semibold active:scale-[0.98] transition-transform duration-200"
                      >
                        <LogOut className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <button
                        onClick={() => { navigate('/login', { state: { from: location.pathname } }); closeMenu(); }}
                        className="flex-1 py-4 bg-white/10 text-white border border-white/20 rounded-full text-base font-semibold active:scale-[0.98] transition-transform duration-200"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => { navigate('/register', { state: { from: location.pathname } }); closeMenu(); }}
                        className="flex-1 py-4 bg-white text-black rounded-full text-base font-semibold active:scale-[0.98] transition-transform duration-200"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                  <p className="text-center text-white/25 text-xs mt-4 tracking-wide">
                    Premium websites & AI automation
                  </p>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

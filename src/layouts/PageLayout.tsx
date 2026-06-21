import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

const authRoutes = ['/login', '/register', '/forgot-password', '/dashboard', '/phone-number'];

export default function PageLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isAuthRoute = authRoutes.includes(location.pathname);

  const variants = isAuthRoute
    ? {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.02 },
      }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
      };

  return (
    <motion.div
      key={location.pathname}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: isAuthRoute ? 0.6 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}

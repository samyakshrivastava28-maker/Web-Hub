import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import MobileDeviceFrame from './MobileDeviceFrame';

export interface ProductDetails {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  features: string[];
  Component: React.ComponentType;
}

interface MobileProductPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetails | null;
}

export default function MobileProductPreviewModal({ isOpen, onClose, product }: MobileProductPreviewModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100000] bg-[#050505]/90 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100001] bg-[#0A0A0B] overflow-y-auto overscroll-none"
          >
            {/* Sticky Header with Close Button */}
            <div 
              className="sticky top-0 z-[100002] flex justify-between items-center px-5 py-4 bg-gradient-to-b from-[#0A0A0B] to-transparent pointer-events-none"
              style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }}
            >
              <div /> {/* spacer */}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 pointer-events-auto active:scale-95 transition-transform"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-5 pb-24" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6rem)' }}>
              
              {/* Device Frame Hero */}
              <div className="w-full max-w-[85vw] mx-auto mb-10 mt-2">
                <MobileDeviceFrame>
                  <product.Component />
                </MobileDeviceFrame>
              </div>

              {/* Product Info */}
              <div className="max-w-md mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h2 className="text-3xl font-semibold tracking-tighter mb-2 text-white">{product.title}</h2>
                  <p className="text-white/50 text-sm tracking-wide uppercase font-medium mb-6">{product.subtitle}</p>
                  
                  <div className="w-full h-px bg-white/10 mb-6" />

                  <h3 className="text-lg font-medium mb-3 text-white">Overview</h3>
                  <p className="text-white/60 font-light leading-relaxed mb-8">
                    {product.overview}
                  </p>

                  <h3 className="text-lg font-medium mb-4 text-white">Key Features</h3>
                  <ul className="space-y-4 mb-10">
                    {product.features.map((feature, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1), duration: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 size={20} className="text-white/40 shrink-0 mt-0.5" />
                        <span className="text-white/80 leading-relaxed font-light">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <button 
                    onClick={onClose}
                    className="w-full py-4 bg-white text-black rounded-xl font-semibold text-base active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    Close Preview
                  </button>
                </motion.div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

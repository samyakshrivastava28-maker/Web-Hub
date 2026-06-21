import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Phone, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SoftAurora from '../components/SoftAurora';

export default function Onboarding() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  
  const { updateUserPhone } = useAuth();
  const navigate = useNavigate();

  // Mouse tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      return setError('Please enter a valid phone number.');
    }
    
    try {
      setError('');
      setLoading(true);
      setLoadingText('Saving Phone Number...');
      
      console.time('Phone Setup Flow');
      
      await updateUserPhone(phone);
      
      setLoadingText('Finishing Setup...');
      
      // Navigate immediately since writes are non-blocking
      window.scrollTo(0, 0);
      navigate('/');
      console.log("[AUTH] Homepage redirect completed (Phone Save)");
      
      console.timeEnd('Phone Setup Flow');
    } catch (err: any) {
      setError('Unable to save phone number. Please try again.');
      setLoading(false);
      setLoadingText('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-20">
        <SoftAurora color1="#0EA5E9" color2="#3B82F6" speed={0.15} brightness={0.3} />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto px-6" style={{ perspective: 1200 }}>
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-white/10 rounded-3xl blur-md" style={{ transform: "translateZ(-10px)" }} />
          
          <div className="relative bg-[#0A0A0B]/80 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl" style={{ transform: "translateZ(20px)" }}>
            
            <h2 className="text-3xl font-semibold mb-2 tracking-tight">Complete Profile</h2>
            <p className="text-white/40 mb-8 text-sm">We need your phone number to complete the onboarding process and secure your account.</p>
            
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/50 ml-1">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-white/70 transition-colors" />
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-white"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 mt-6 bg-white text-black rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> {loadingText || 'Loading...'}</>
                ) : (
                  <>Complete Setup <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

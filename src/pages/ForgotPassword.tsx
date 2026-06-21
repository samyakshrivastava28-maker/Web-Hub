import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Mail, Loader2, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SecureRecoveryBg from '../components/backgrounds/SecureRecoveryBg';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { resetPassword } = useAuth();

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
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your inbox for further instructions.');
    } catch (err: any) {
      setError('Failed to reset password. Verify your email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060504] text-white overflow-hidden relative">
      {/* Secure Recovery Background — warm aurora waves */}
      <SecureRecoveryBg />

      {/* Ambient depth layers — warm amber tones */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] bg-orange-500/4 rounded-full blur-[120px]" />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 z-[2] opacity-[0.012]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 w-full max-w-lg mx-auto px-6" style={{ perspective: 1200 }}>
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-10"
        >
          <Link to="/" className="inline-block">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/20 shadow-lg shadow-amber-500/10">
              <img src="https://ik.imagekit.io/hx85ktgzm/S-Web-Hub-logo%20(1).webp" alt="S-Web Hub Logo" className="w-[120%] h-[120%] object-cover" />
            </div>
          </Link>
        </motion.div>

        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative"
        >
          {/* Multi-layer glow border — warm amber */}
          <div className="absolute -inset-[1px] bg-gradient-to-br from-amber-500/15 via-transparent to-orange-400/15 rounded-3xl blur-sm" style={{ transform: "translateZ(-5px)" }} />
          <div className="absolute -inset-[2px] bg-gradient-to-tr from-amber-400/8 via-white/5 to-yellow-400/8 rounded-3xl blur-md" style={{ transform: "translateZ(-10px)" }} />
          
          {/* Glass card */}
          <div 
            className="relative bg-[#0c0a07]/85 backdrop-blur-2xl border border-white/[0.08] p-8 md:p-10 rounded-3xl overflow-hidden"
            style={{ 
              transform: "translateZ(20px)",
              boxShadow: "0 0 80px -20px rgba(245, 158, 11, 0.06), 0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
            }}
          >
            {/* Inner light reflection */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
            <div className="absolute top-0 left-0 w-24 h-24 bg-amber-500/5 blur-3xl rounded-full" />
            
            <Link to="/login" className="inline-flex items-center gap-2 text-white/35 hover:text-amber-300/70 transition-colors text-sm mb-8 font-medium group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to login
            </Link>

            {/* Security icon badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-400/80" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Reset Password</h2>
                <p className="text-white/30 text-xs mt-0.5">Secure recovery process</p>
              </div>
            </div>

            <p className="text-white/35 mb-8 text-sm font-light leading-relaxed">Enter your email and we'll send you a link to securely reset your password.</p>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium"
              >
                {error}
              </motion.div>
            )}
            
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-medium flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" /> {message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/25 group-focus-within:text-amber-400/70 transition-colors duration-300" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-amber-500/30 focus:bg-white/[0.06] focus:shadow-[0_0_20px_-5px_rgba(245,158,11,0.1)] transition-all duration-300 text-white placeholder:text-white/20"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-amber-400 hover:to-orange-400 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden shadow-lg shadow-amber-500/15"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
              </button>
            </form>

            {/* Bottom trust note */}
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-[11px] text-white/20 font-light">
                Your account security is our priority. Reset links expire after 24 hours.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NeuralNetworkBg from '../components/backgrounds/NeuralNetworkBg';

declare global {
  interface Window {
    grecaptcha: any;
  }
}


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, loginWithGoogle, currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  // Removed the useEffect redirect loop to fix infinite loading issues

  // Mouse tilt effect for the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);

      // Verify reCAPTCHA
      if (window.grecaptcha && window.grecaptcha.enterprise) {
        await new Promise<void>((resolve, reject) => {
          window.grecaptcha.enterprise.ready(async () => {
            try {
              const token = await window.grecaptcha.enterprise.execute('6LejKistAAAAADnrM2_zwmV5y3qODkNszPAkf5vQ', {action: 'LOGIN'});
              
              // Verify on backend
              const API_BASE = import.meta.env.DEV ? 'http://localhost:8888/.netlify/functions' : '/.netlify/functions';
              const res = await fetch(`${API_BASE}/verify-recaptcha`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, recaptchaAction: 'LOGIN' })
              });
              
              if (!res.ok) throw new Error('Security verification failed.');
              const data = await res.json();
              if (!data.valid || data.score < 0.3) throw new Error('Suspicious activity detected. Please try again.');
              
              resolve();
            } catch (err) {
              reject(err);
            }
          });
        });
      }

      const { profile } = await login(email, password);
      if (!profile?.phoneNumber) {
        window.scrollTo(0, 0);
        navigate('/phone-number');
        console.log("[AUTH] Redirected to Phone Number page (Login - Missing Phone)");
      } else {
        window.scrollTo(0, 0);
        navigate('/');
        console.log("[AUTH] Homepage redirect completed (Login)");
      }
    } catch (err: any) {
      const code = err.code || '';
      console.error("Login Error:", err);
      if (code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else if (code === 'auth/invalid-credential') {
        setError('Incorrect email or password. Please try again.');
      } else {
        setError(err.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030308] text-white overflow-x-hidden relative">
      {/* Neural Network Background — "Digital Intelligence" */}
      <NeuralNetworkBg />

      {/* Ambient depth layers */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/6 rounded-full blur-[130px]" />
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-cyan-500/4 rounded-full blur-[100px]" />
      </div>

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 z-[2] opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-12 flex flex-col lg:flex-row items-center justify-between min-h-screen gap-16 lg:gap-8">
        
        {/* Left Side: Brand Statement */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/" className="inline-block mb-12 lg:mb-20">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/20 shadow-lg shadow-blue-500/10">
                <img src="https://ik.imagekit.io/hx85ktgzm/S-Web-Hub-logo%20(1).webp" alt="S-Web Hub Logo" className="w-[120%] h-[120%] object-cover" />
              </div>
            </Link>

            {/* Accent badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-300/90">Secure Portal</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6 leading-[1.05]">
              Digital<br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">Intelligence.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/35 font-light tracking-tight max-w-md leading-relaxed">
              Access your AI systems, automation workflows, and project dashboards. Your command center awaits.
            </p>
          </motion.div>
        </div>

        {/* Right Side: Floating Auth Card */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end" style={{ perspective: 1200 }}>
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full max-w-md relative"
          >
            {/* Multi-layer glow border */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20 rounded-3xl blur-sm" style={{ transform: "translateZ(-5px)" }} />
            <div className="absolute -inset-[2px] bg-gradient-to-tr from-blue-400/10 via-white/5 to-indigo-400/10 rounded-3xl blur-md" style={{ transform: "translateZ(-10px)" }} />
            
            {/* Glass card */}
            <div 
              className="relative bg-[#08090e]/85 backdrop-blur-2xl border border-white/[0.08] p-8 md:p-10 rounded-3xl overflow-hidden"
              style={{ 
                transform: "translateZ(20px)",
                boxShadow: "0 0 80px -20px rgba(60, 100, 255, 0.08), 0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
              }}
            >
              {/* Inner light reflection */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />

              <h2 className="text-3xl font-semibold mb-2 tracking-tight">Welcome Back</h2>
              <p className="text-white/35 mb-8 text-sm font-light">Enter your credentials to access your dashboard.</p>
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/25 group-focus-within:text-blue-400/70 transition-colors duration-300" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.06] focus:shadow-[0_0_20px_-5px_rgba(60,100,255,0.1)] transition-all duration-300 text-white placeholder:text-white/20"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/25 group-focus-within:text-blue-400/70 transition-colors duration-300" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-12 pr-12 py-3.5 focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.06] focus:shadow-[0_0_20px_-5px_rgba(60,100,255,0.1)] transition-all duration-300 text-white placeholder:text-white/20"
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/30 focus:ring-offset-0 focus:ring-1 cursor-pointer transition-all accent-blue-500" />
                    <span className="text-sm text-white/40 group-hover:text-white/70 transition-colors">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-white/40 hover:text-blue-400/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-blue-400 hover:to-blue-500 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden shadow-lg shadow-blue-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </form>

              <div className="mt-6 flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold">OR</span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              <button 
                type="button"
                onClick={async () => {
                  try {
                    setLoading(true);
                    const { profile } = await loginWithGoogle();
                    if (!profile?.phoneNumber) {
                      window.scrollTo(0, 0);
                      navigate('/phone-number');
                      console.log("[AUTH] Redirected to Phone Number page (Google Login - Missing Phone)");
                    } else {
                      window.scrollTo(0, 0);
                      navigate('/');
                      console.log("[AUTH] Homepage redirect completed (Google Login)");
                    }
                  } catch (err: any) {
                    console.error("Google Login Error:", err);
                    const code = err.code || '';
                    if (code === 'auth/popup-closed-by-user') {
                      setError('Google sign in was cancelled.');
                    } else {
                      setError(err.message || 'Google sign in failed. Please try again.');
                    }
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className="w-full py-3.5 mt-6 bg-white/[0.04] border border-white/[0.07] text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-white/[0.08] hover:border-white/[0.12] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div className="mt-8 text-center">
                <p className="text-sm text-white/35">
                  Don't have an account? <Link to="/register" className="text-blue-400/80 hover:text-blue-300 hover:underline font-medium transition-colors">Create one</Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

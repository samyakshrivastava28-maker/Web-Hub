import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, User, Sparkles, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import GeometricGrowthBg from '../components/backgrounds/GeometricGrowthBg';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  
  const { register, loginWithGoogle, currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  // Removed the useEffect redirect loop to fix infinite loading issues

  // Mouse tilt effect for the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
    
    if (!name || !email || !phone || !password || !confirmPassword) {
      return setError('Please fill in all fields.');
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    if (phone.length < 10) {
      return setError('Please enter a valid phone number.');
    }
    
    try {
      setError('');
      setLoading(true);
      setLoadingText('Creating Account...');
      
      // Verify reCAPTCHA
      if (window.grecaptcha && window.grecaptcha.enterprise) {
        await new Promise<void>((resolve, reject) => {
          window.grecaptcha.enterprise.ready(async () => {
            try {
              const token = await window.grecaptcha.enterprise.execute('6LejKistAAAAADnrM2_zwmV5y3qODkNszPAkf5vQ', {action: 'SIGNUP'});
              
              // Verify on backend
              const API_BASE = import.meta.env.DEV ? 'http://localhost:8888/.netlify/functions' : '/.netlify/functions';
              const res = await fetch(`${API_BASE}/verify-recaptcha`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, recaptchaAction: 'SIGNUP' })
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
      
      console.time('Signup Flow');
      
      await register(email, password, name, phone);
      
      setLoadingText('Finishing Setup...');
      
      // Navigate directly to homepage
      window.scrollTo(0, 0);
      navigate('/');
      console.log("[AUTH] Homepage redirect completed (Email Signup)");
      
      console.timeEnd('Signup Flow');
    } catch (err: any) {
      const code = err.code || '';
      console.error("Signup Error:", err);
      if (code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError(err.message || 'Failed to create an account. Please try again.');
      }
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030806] text-white overflow-x-hidden relative">
      {/* Geometric Growth Background — "Creation & Growth" */}
      <GeometricGrowthBg />

      {/* Ambient depth layers — blue/sky tones */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-sky-600/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/6 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-[25%] w-[250px] h-[250px] bg-indigo-400/4 rounded-full blur-[100px]" />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 z-[2] opacity-[0.012]" style={{
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
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/20 shadow-lg shadow-sky-500/10">
                <img src="https://ik.imagekit.io/hx85ktgzm/S-Web-Hub-logo%20(1).webp" alt="S-Web Hub Logo" className="w-[120%] h-[120%] object-cover" />
              </div>
            </Link>

            {/* Accent badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-sky-300/90">Join Network</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
              Create.<br/>Build. <span className="text-sky-400">Grow.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/35 font-light tracking-tight max-w-md leading-relaxed">
              Join an elite network of businesses leveraging AI-powered systems, custom development, and intelligent automation.
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
            <div className="absolute -inset-[1px] bg-gradient-to-br from-sky-500/20 via-transparent to-blue-500/20 rounded-3xl blur-sm" style={{ transform: "translateZ(-5px)" }} />
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-white/10 rounded-3xl blur-md" style={{ transform: "translateZ(-10px)" }} />
            
            {/* Glass card */}
            <div 
              className="relative bg-[#070e0a]/85 backdrop-blur-2xl border border-white/[0.08] p-8 md:p-10 rounded-3xl overflow-hidden"
              style={{ 
                transform: "translateZ(20px)",
                boxShadow: "0 0 80px -20px rgba(14, 165, 233, 0.08), 0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
              }}
            >
              {/* Inner light reflection */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/10 to-transparent" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full" />

              <h2 className="text-3xl font-semibold mb-2 tracking-tight">Create Account</h2>
              
              <p className="text-white/40 text-sm mt-8 text-center flex items-center justify-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-sky-500/70" /> 256-bit Encryption
                <span className="mx-2 text-white/10">•</span>
                <Shield className="w-3.5 h-3.5 text-blue-500/70" /> SOC 2 Compliant
              </p>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 group-focus-within:text-sky-400/70 transition-colors duration-300" />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-sky-500/30 focus:bg-white/[0.06] focus:shadow-[0_0_20px_-5px_rgba(14,165,233,0.1)] transition-all duration-300 text-white text-sm placeholder:text-white/20"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 group-focus-within:text-sky-400/70 transition-colors duration-300" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-sky-500/30 focus:bg-white/[0.06] focus:shadow-[0_0_20px_-5px_rgba(14,165,233,0.1)] transition-all duration-300 text-white text-sm placeholder:text-white/20"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 ml-1">Phone Number</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 group-focus-within:text-sky-400/70 transition-colors duration-300 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-sky-500/30 focus:bg-white/[0.06] focus:shadow-[0_0_20px_-5px_rgba(14,165,233,0.1)] transition-all duration-300 text-white text-sm placeholder:text-white/20"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 group-focus-within:text-sky-400/70 transition-colors duration-300" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:border-sky-500/30 focus:bg-white/[0.06] focus:shadow-[0_0_20px_-5px_rgba(14,165,233,0.1)] transition-all duration-300 text-white text-sm placeholder:text-white/20"
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 ml-1">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 group-focus-within:text-sky-400/70 transition-colors duration-300" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:border-sky-500/30 focus:bg-white/[0.06] focus:shadow-[0_0_20px_-5px_rgba(14,165,233,0.1)] transition-all duration-300 text-white text-sm placeholder:text-white/20"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 mt-2 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> {loadingText || 'Loading...'}</>
                  ) : (
                    <>Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </form>

              <div className="mt-5 flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold">OR</span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              <button 
                type="button"
                onClick={async () => {
                  try {
                    setLoading(true);
                    setLoadingText('Connecting Google...');
                    
                    console.time('Google Signup Flow');
                    const { profile } = await loginWithGoogle();
                    
                    setLoadingText('Finishing Setup...');
                    
                    if (!profile?.phoneNumber) {
                      window.scrollTo(0, 0);
                      navigate('/phone-number');
                      console.log("[AUTH] Redirected to Phone Number page (Missing Phone)");
                    } else {
                      window.scrollTo(0, 0);
                      navigate('/');
                      console.log("[AUTH] Homepage redirect completed (Google Signup)");
                    }
                    console.timeEnd('Google Signup Flow');
                  } catch (err: any) {
                    console.error("Google Signup Error:", err);
                    const code = err.code || '';
                    if (code === 'auth/popup-closed-by-user') {
                      setError('Google sign up was cancelled.');
                    } else if (code === 'auth/account-exists-with-different-credential') {
                      setError('An account already exists with the same email address.');
                    } else {
                      setError(err.message || 'Google sign up failed. Please try again.');
                    }
                  } finally {
                    setLoading(false);
                    setLoadingText('');
                  }
                }}
                disabled={loading}
                className="w-full py-3.5 mt-5 bg-white/[0.04] border border-white/[0.07] text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-white/[0.08] hover:border-white/[0.12] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div className="mt-6 text-center">
                <span className="text-white/40">Already have an account? </span>
                <Link to="/login" className="text-sky-400 hover:text-sky-300 font-semibold transition-colors">
                  Sign in
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

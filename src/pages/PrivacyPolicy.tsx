import { useEffect } from 'react';
import { motion } from 'motion/react';
import Galaxy from '../components/Galaxy';
import { ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const }
});

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Information Collected",
      content: "We collect information you provide directly to us through contact forms, onboarding sequences, and when you create an account. This includes your name, email address, phone number, and any project details you submit."
    },
    {
      title: "Authentication Data",
      content: "S-Web Hub uses Google Firebase Authentication to securely manage your login credentials. We support both Email/Password and Google Sign-In methods. Your passwords are encrypted and never visible to our staff."
    },
    {
      title: "Analytics & Cookies",
      content: "We use essential cookies to maintain your session and secure your account. We may also use analytics tools to understand how visitors interact with our website to improve our services and user experience."
    },
    {
      title: "Data Security",
      content: "We implement enterprise-grade security measures to protect your personal information. Our database operates on Google Cloud infrastructure (Firestore) with strict security rules restricting unauthorized access."
    },
    {
      title: "Third-Party Services",
      content: "We integrate with trusted third-party providers including Google Authentication for secure logins and Resend for transactional email delivery. These providers adhere to strict data privacy standards and only receive the data necessary to perform their functions."
    },
    {
      title: "Data Retention & User Rights",
      content: "We retain your data as long as your account is active. You have the right to request access to, correction of, or deletion of your personal data at any time by contacting our support team."
    }
  ];

  return (
    <div className="w-full bg-[#050505] text-white selection:bg-white/20 overflow-x-hidden pt-32 pb-24 relative font-sans min-h-screen">
      
      {/* 🌌 GALAXY BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.25]">
        <Galaxy 
          mouseRepulsion={false}
          mouseInteraction={false}
          density={0.3}
          glowIntensity={0.2}
          saturation={0.5}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] mb-6">
            <Shield size={16} className="text-emerald-400" />
            <span className="text-xs md:text-sm font-medium tracking-wide text-white/80 uppercase">Data Protection</span>
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
            Privacy Policy
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-lg text-white/50 font-light">
            How we collect, use, and protect your personal information.
          </motion.p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div 
              key={i}
              {...fadeUp(0.1 * (i + 1))}
              className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 relative overflow-hidden"
            >
              <h2 className="text-xl font-semibold tracking-tight mb-4 text-white/90">{section.title}</h2>
              <p className="text-white/60 leading-relaxed font-light">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div {...fadeUp(1)} className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white/50 text-sm">
            <p className="mb-1">Last updated: June 2026</p>
            <p>For privacy inquiries, contact: <a href="mailto:webhub2811@gmail.com" className="text-emerald-400 hover:underline">webhub2811@gmail.com</a></p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors">
            Contact Privacy Team <ArrowRight size={18} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

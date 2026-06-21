import { useEffect } from 'react';
import { motion } from 'motion/react';
import Galaxy from '../components/Galaxy';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const }
});

export default function AgencyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const policies = [
    {
      title: "Project Start Policy",
      points: [
        "Minimum 30% advance payment is required before work begins.",
        "No project work starts until the advance payment is received.",
        "Remaining payment schedule may be agreed upon separately based on milestones."
      ]
    },
    {
      title: "Domain Policy",
      points: [
        "Domain purchase is NOT included in website pricing.",
        "Clients must purchase and own their own domain name.",
        "S-Web Hub can assist with DNS setup and domain connection.",
        "S-Web Hub does not purchase or own domains on behalf of clients."
      ]
    },
    {
      title: "Client Responsibility",
      points: [
        "Client is fully responsible for all content, products, services, and activities on their website.",
        "Client is responsible for complying with all local laws and regulations regarding their business."
      ]
    },
    {
      title: "Liability Disclaimer",
      points: [
        "S-Web Hub is not responsible for illegal, fraudulent, copyrighted, misleading, harmful, or unlawful content published by clients.",
        "S-Web Hub is not responsible for actions taken by website visitors, customers, or third parties.",
        "Ownership and responsibility for website content remain entirely with the client."
      ]
    },
    {
      title: "Hosting & Third-Party Services",
      points: [
        "Third-party services may have separate pricing and policies.",
        "Hosting costs, domain costs, premium plugins, APIs, and subscriptions are not included unless explicitly agreed in writing."
      ]
    },
    {
      title: "Project Changes",
      points: [
        "Major changes requested after the initial approval may require additional charges.",
        "Scope changes and feature additions will affect pricing and delivery timelines."
      ]
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
            <FileText size={16} className="text-blue-400" />
            <span className="text-xs md:text-sm font-medium tracking-wide text-white/80 uppercase">Official Documentation</span>
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
            Agency Policy
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-lg text-white/50 font-light">
            Please read these policies carefully before engaging with our services.
          </motion.p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {policies.map((policy, i) => (
            <motion.section 
              key={i}
              {...fadeUp(0.1 * (i + 1))}
              className="p-8 md:p-10 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
              
              <h2 className="text-2xl font-semibold tracking-tight mb-6 relative z-10">{policy.title}</h2>
              <ul className="space-y-4 relative z-10">
                {policy.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 size={20} className="text-blue-400 mt-0.5 shrink-0" />
                    <span className="text-white/70 leading-relaxed font-light">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div {...fadeUp(0.8)} className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/50 text-sm">Have questions about our policies?</p>
          <Link to="/contact" className="inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors">
            Contact Support <ArrowRight size={18} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

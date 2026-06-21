import { useEffect } from 'react';
import { motion } from 'motion/react';
import Galaxy from '../components/Galaxy';
import { ArrowRight, Scale, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const }
});

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Services Offered",
      content: "S-Web Hub provides custom website development, AI automation solutions, lead generation systems, and digital business infrastructure. All services are subject to the specific scope outlined in the individual project agreement."
    },
    {
      title: "2. Client Responsibilities",
      content: "Clients must provide necessary materials, branding assets, and feedback in a timely manner. Delays in client feedback may affect project timelines. Clients are fully responsible for the legality and accuracy of all content they provide."
    },
    {
      title: "3. Payment Terms",
      content: "A minimum 30% non-refundable advance payment is required to commence any project. The remaining balance is structured around project milestones. Final delivery of files, source code, or live deployment will only occur upon receipt of full payment."
    },
    {
      title: "4. Intellectual Property",
      content: "Upon full payment, the client owns the final design and content of their website. S-Web Hub retains the right to display the completed project in our portfolio and marketing materials unless a strict NDA is agreed upon."
    },
    {
      title: "5. Domain & Hosting Ownership",
      content: "Clients are entirely responsible for purchasing and renewing their own domain names. While S-Web Hub handles technical setup and deployment, we do not claim ownership of client domains or host them on our personal billing accounts."
    },
    {
      title: "6. Limitation of Liability",
      content: "S-Web Hub is not liable for any indirect, incidental, special, or consequential damages resulting from the use of our services, including but not limited to loss of profits, data, or business interruption. We are not responsible for malicious actions taken by third parties against your digital infrastructure."
    },
    {
      title: "7. Termination Rights",
      content: "Either party may terminate the project agreement if the other party breaches material terms. In the event of termination by the client after work has begun, the initial 30% deposit is non-refundable, and the client will be billed for any work completed beyond that amount."
    },
    {
      title: "8. Dispute Resolution",
      content: "Any disputes arising from these terms will first be addressed through good faith negotiation. If unresolved, disputes will be subject to the jurisdiction of the courts corresponding to S-Web Hub's operational headquarters."
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
            <Scale size={16} className="text-purple-400" />
            <span className="text-xs md:text-sm font-medium tracking-wide text-white/80 uppercase">Legal Agreement</span>
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
            Terms of Service
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-lg text-white/50 font-light">
            These terms govern your use of S-Web Hub services and products.
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
          <p className="text-white/50 text-sm">Need clarification on any of these terms?</p>
          <Link to="/contact" className="inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors">
            Contact Us <ArrowRight size={18} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

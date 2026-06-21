import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, PhoneCall, Mail, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import SideRays from '../components/SideRays';

const contactMethods = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "Start a conversation about your project",
    buttonText: "Chat On WhatsApp",
    link: "https://wa.me/918305500767",
    icon: MessageCircle,
    color: "emerald"
  },
  {
    id: "call",
    title: "Phone",
    description: "Let's discuss your requirements",
    buttonText: "Call Us",
    link: "tel:+918305500767",
    icon: PhoneCall,
    color: "blue"
  },
  {
    id: "email",
    title: "Email",
    description: "Send project details directly",
    buttonText: "Send Email",
    link: "mailto:webhub2811@gmail.com",
    icon: Mail,
    color: "purple"
  },
  {
    id: "instagram",
    title: "Instagram",
    description: "See updates and recent work",
    buttonText: "View Instagram",
    link: "https://www.instagram.com/webhub2811/",
    icon: Instagram,
    color: "pink"
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Connect professionally",
    buttonText: "View LinkedIn",
    link: "https://www.linkedin.com/in/samyak-shrivastava-24809740b/",
    icon: Linkedin,
    color: "sky"
  }
];

export default function Contact() {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-white/20 selection:text-white pb-24 overflow-hidden relative">
      <div className="fixed inset-0 z-0 opacity-100 pointer-events-none w-full h-screen block">
        <SideRays
          speed={2.5}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={2}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1.0}
        />
      </div>

      <div className="relative z-10 pt-32 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-8 block">
            GET IN TOUCH
          </span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-white leading-[1.05] mb-6">
            Let's Build Something <br className="hidden md:block" /> Extraordinary.
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Ready to transform your business with a premium digital solution? Reach out through any of the channels below.
          </p>
        </motion.div>

        {/* Bento Grid Layout for Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          
          {/* Primary Action: WhatsApp (Spans 4 columns) */}
          <div className="md:col-span-4 h-full">
             <ContactCard data={contactMethods[0]} featured={true} />
          </div>

          {/* Secondary Action: Call (Spans 2 columns) */}
          <div className="md:col-span-2 h-full">
             <ContactCard data={contactMethods[1]} />
          </div>

          {/* Email (Spans 2 columns) */}
          <div className="md:col-span-2 h-full">
             <ContactCard data={contactMethods[2]} />
          </div>

          {/* Instagram (Spans 2 columns) */}
          <div className="md:col-span-2 h-full">
             <ContactCard data={contactMethods[3]} />
          </div>

          {/* LinkedIn (Spans 2 columns) */}
          <div className="md:col-span-2 h-full">
             <ContactCard data={contactMethods[4]} />
          </div>

        </div>
      </div>
    </div>
  );
}

function ContactCard({ data, featured = false }: { data: any, featured?: boolean }) {
  const Icon = data.icon;
  
  // Define exact Tailwind classes to prevent PurgeCSS dropping dynamic classes
  const colorMap: Record<string, { bg: string, text: string, shadow: string, border: string, glow: string }> = {
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-500', shadow: 'shadow-emerald-500/20', border: 'border-emerald-500/30', glow: 'bg-emerald-500/10' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', shadow: 'shadow-blue-500/20', border: 'border-blue-500/30', glow: 'bg-blue-500/10' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-500', shadow: 'shadow-purple-500/20', border: 'border-purple-500/30', glow: 'bg-purple-500/10' },
    pink: { bg: 'bg-pink-500', text: 'text-pink-500', shadow: 'shadow-pink-500/20', border: 'border-pink-500/30', glow: 'bg-pink-500/10' },
    sky: { bg: 'bg-sky-500', text: 'text-sky-500', shadow: 'shadow-sky-500/20', border: 'border-sky-500/30', glow: 'bg-sky-500/10' }
  };

  const theme = colorMap[data.color];

  return (
    <motion.a
      href={data.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative flex flex-col justify-between p-8 md:p-10 rounded-3xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] block h-full min-h-[280px] hover:${theme.border}`}
    >
      {/* Dynamic Hover Glow */}
      <div className={`absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${theme.glow} -z-10`} />
      
      {/* Animated Gradient Orb */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full ${theme.bg} opacity-5 blur-[60px] group-hover:opacity-20 transition-opacity duration-700`} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-auto">
          <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:${theme.text} group-hover:border-white/20 transition-colors duration-500`}>
            <Icon size={24} />
          </div>
          
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
            <ArrowUpRight size={18} className="text-white" />
          </div>
        </div>

        <div className="mt-12 relative z-10">
          <h3 className={`font-medium mb-3 ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'} group-hover:text-white transition-colors duration-500`}>
            {data.title}
          </h3>
          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed mb-8 max-w-[90%]">
            {data.description}
          </p>
          
          <div className="inline-flex items-center gap-3">
             <span className={`text-sm font-semibold tracking-wide ${theme.text}`}>
               {data.buttonText}
             </span>
             <motion.div 
               className={`h-px w-8 ${theme.bg} group-hover:w-16 transition-all duration-500`}
             />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

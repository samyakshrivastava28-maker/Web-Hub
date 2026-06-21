import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 pt-16 pb-8 px-6 md:px-12 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-4 max-w-sm">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
            S-WEB<span className="text-blue-500">HUB</span>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed">
            Premium custom web platforms, AI automation, and lead generation systems designed to scale your business to the next level.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest">Navigation</h4>
            <Link to="/pricing" className="text-white/50 hover:text-white transition-colors text-sm">Pricing</Link>
            <Link to="/portfolio" className="text-white/50 hover:text-white transition-colors text-sm">Portfolio</Link>
            <Link to="/contact" className="text-white/50 hover:text-white transition-colors text-sm">Contact</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest">Legal</h4>
            <Link to="/privacy-policy" className="text-white/50 hover:text-white transition-colors text-sm">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-white/50 hover:text-white transition-colors text-sm">Terms of Service</Link>
            <Link to="/agency-policy" className="text-white/50 hover:text-white transition-colors text-sm">Agency Policy</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest">Socials</h4>
            <a href="#" className="text-white/50 hover:text-white transition-colors text-sm inline-flex items-center gap-1">LinkedIn <ArrowUpRight size={14} /></a>
            <a href="#" className="text-white/50 hover:text-white transition-colors text-sm inline-flex items-center gap-1">Twitter <ArrowUpRight size={14} /></a>
            <a href="#" className="text-white/50 hover:text-white transition-colors text-sm inline-flex items-center gap-1">Instagram <ArrowUpRight size={14} /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-xs">
          &copy; {currentYear} S-Web Hub. All rights reserved.
        </p>
        <p className="text-white/30 text-xs">
          Designed and Engineered for Scale.
        </p>
      </div>
    </footer>
  );
}

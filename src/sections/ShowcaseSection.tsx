import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import BrowserFrame from '../components/BrowserFrame';
import MobileDeviceFrame from '../components/MobileDeviceFrame';
import VeldaraMockup from '../components/VeldaraMockup';
import OrbisNftMockup from '../components/OrbisNftMockup';
import SecurifyMockup from '../components/SecurifyMockup';
import LinkFlowMockup from '../components/LinkFlowMockup';

interface ShowcaseItem {
  title: string;
  subtitle: string;
  tags: string[];
  url: string;
  Component: React.ComponentType;
}

const SHOWCASES: ShowcaseItem[] = [
  {
    title: "Veldara",
    subtitle: "Immersive 3D worlds on the web.",
    tags: ["Three.js", "Scroll Video", "Interactive"],
    url: "https://veldara.example.com",
    Component: VeldaraMockup,
  },
  {
    title: "Orbis.Nft",
    subtitle: "Space-Themed NFT Collection Landing Page.",
    tags: ["NFT", "Video BG", "Dark Theme"],
    url: "https://orbis.nft",
    Component: OrbisNftMockup,
  },
  {
    title: "Securify SaaS",
    subtitle: "Data Security Landing Page with High-Contrast Typography.",
    tags: ["B2B SaaS", "Video BG", "Dark Mode"],
    url: "https://securify.example.com",
    Component: SecurifyMockup,
  },
  {
    title: "LinkFlow Platform",
    subtitle: "Seamless Boomerang Video Backgrounds & Custom Cursors.",
    tags: ["SaaS", "Boomerang", "Neue Haas"],
    url: "https://linkflow.ai",
    Component: LinkFlowMockup,
  },
];

/* ── Mobile Carousel ── */
function MobileShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.offsetWidth * 0.85 + 16; // card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, SHOWCASES.length - 1));
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Scrollable carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-5 px-5 scrollbar-hide"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {SHOWCASES.map((item, i) => (
          <div
            key={item.title}
            className="flex-shrink-0 snap-center"
            style={{ width: '80vw' }}
          >
            {/* Phone-style premium frame */}
            <div className="relative group/card">
              <MobileDeviceFrame>
                <item.Component />
              </MobileDeviceFrame>

              {/* Card info - positioned below the phone frame */}
              <div className="mt-6 text-center px-2">
                <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">{item.title}</h3>
                <p className="text-[13px] text-white/50 leading-relaxed mb-4">{item.subtitle}</p>
                <div className="flex gap-1.5 flex-wrap justify-center">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] uppercase tracking-wider text-white/60 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-2">
        {SHOWCASES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              scrollRef.current?.scrollTo({
                left: i * (window.innerWidth * 0.85 + 16),
                behavior: 'smooth',
              });
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Desktop Showcase (unchanged) ── */
function DesktopShowcase() {
  return (
    <div className="space-y-32">
      {SHOWCASES.map((item) => (
        <motion.div 
          key={item.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8 group"
        >
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <h3 className="text-3xl md:text-4xl font-medium mb-2">{item.title}</h3>
              <p className="text-lg text-white/50">{item.subtitle}</p>
            </div>
            <div className="flex gap-2">
              {item.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-xs text-white/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="w-full aspect-[16/9] lg:h-[700px]">
            <BrowserFrame url={item.url}>
              <item.Component />
            </BrowserFrame>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Main Section ── */
export default function ShowcaseSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="py-16 md:py-32 px-5 md:px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-10 md:mb-24 text-center md:text-left"
      >
        <h2 className="text-3xl md:text-6xl font-medium tracking-tighter mb-4 md:mb-6">
          The Type of Websites We Make.
        </h2>
        <p className="text-base md:text-xl text-white/50 font-light leading-relaxed max-w-3xl">
          We don't just build websites; we engineer cinematic digital experiences.
        </p>
      </motion.div>

      {isMobile ? <MobileShowcase /> : <DesktopShowcase />}
    </section>
  );
}

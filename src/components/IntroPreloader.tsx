import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const DESKTOP_VIDEO = "https://res.cloudinary.com/ditkqli2i/video/upload/v1781707607/S-Web_Hub_logo_reveal_202606172012_1_wrf0nn.mp4";
const MOBILE_VIDEO = "https://res.cloudinary.com/ditkqli2i/video/upload/v1781707617/S-Web_Hub_logo_reveal_202606172012_b6mfxt.mp4";

interface IntroPreloaderProps {
  onIntroComplete?: () => void;
}

export default function IntroPreloader({ onIntroComplete }: IntroPreloaderProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('swebhub_intro_seen');
    if (hasSeenIntro === 'true') {
      setShowIntro(false);
      onIntroComplete?.();
      return;
    }

    setIsMobile(window.innerWidth < 768);

    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }

    // Fallback: auto-dismiss after 8 seconds if video stalls
    const timeout = setTimeout(() => {
      handleVideoEnd();
    }, 8000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVideoEnd = useCallback(() => {
    localStorage.setItem('swebhub_intro_seen', 'true');
    setShowIntro(false);
    onIntroComplete?.();
  }, [onIntroComplete]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-black flex items-center justify-center"
        >
          {/* 
            Video fitting strategy:
            - Mobile: object-contain so the ENTIRE animation is visible without cropping.
              The video was designed for mobile — preserve its full composition.
            - Desktop: object-cover to fill the viewport cinematically.
          */}
          <video
            ref={videoRef}
            src={isMobile ? MOBILE_VIDEO : DESKTOP_VIDEO}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onError={handleVideoEnd}
            className="w-full h-full object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

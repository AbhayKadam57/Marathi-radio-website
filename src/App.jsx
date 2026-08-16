import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";
import HeroSection from "./components/HeroSection";
import Information from "./components/Information";
import Background from "./components/Background";
import Lenis from "lenis";
import MusicPlayer from "./components/music/MusicPlayer";
import AakshwaniLogo from "/aakashwani_logo.png";
import Footer from "./components/Footer";

function App() {
  const scrollRef = useRef(null);
  const introAudioRef = useRef(null);
  const [showIntro, setShowIntro] = useState(true);
  const [introAudioEnded, setIntroAudioEnded] = useState(false);

  useEffect(() => {
    const target = scrollRef.current;
    if (!target) return;

    const lenis = new Lenis({
      wrapper: target,
      smoothWheel: true,
      duration: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!showIntro) return;

    const audio = new Audio("/intro_music.mp3");
    introAudioRef.current = audio;
    audio.volume = 0.2;

    audio.addEventListener("ended", () => {
      setIntroAudioEnded(true);
    });

    audio.play().catch(() => {
      setIntroAudioEnded(true);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      introAudioRef.current = null;
    };
  }, [showIntro]);

  return (
    <>
      <div className={showIntro ? "fixed inset-0 z-[200]" : "hidden"}>
        <div className="absolute inset-0 bg-[#050708]/5" />
        <div className="absolute inset-0 backdrop-blur-[6px]" />

        <div className="relative flex h-full items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center text-center text-[#f9efe8]"
          >
            <motion.img
              src={AakshwaniLogo}
              alt="Aakashwani logo"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="h-auto w-16 object-contain sm:w-20 md:w-24 lg:w-28 xl:w-32"
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="marathi-title mt-3 text-[2.4rem] leading-none text-[#f9efe8] md:text-[5rem]"
            >
              आकाशवाणी
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="marathi-title mt-2 text-[1rem] leading-none text-[#f9efe8]/90 md:text-[2rem]"
            >
              (ऑल इंडिया रेडिओ - All India Radio)
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
              className="mt-5 space-y-1 text-sm text-[#f6e7dd] lg:mt-10 lg:text-base"
            >
              <p>नमस्कार श्रोतेहो.</p>
              <p>आपण ऐकत आहात आकाशवाणी मुंबई केंद्र.</p>
              <p>आता आपल्या सेवेत सादर करीत आहोत आजच्या कार्यक्रमाची सुरुवात.</p>
              <p>आपल्या दिवसाची सुरुवात आनंददायी आणि मंगलमय व्हावी, यासाठी ऐका सुंदर संगीताची सुरेल मैफल.</p>
            </motion.div>

            <motion.button
              type="button"
              onClick={() => setShowIntro(false)}
              disabled={!introAudioEnded}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className={`mt-8 inline-flex items-center justify-center gap-3 rounded-full border px-5 py-3 text-sm font-medium uppercase tracking-[0.22em] shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm transition ${
                introAudioEnded
                  ? "border-[#f5d6bc]/25 bg-[#2d1d16]/70 text-[#f8e8dd] hover:scale-[1.02]"
                  : "cursor-not-allowed border-[#f5d6bc]/10 bg-[#2d1d16]/30 text-[#f8e8dd]/50"
              }`}
            >
              <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#f5d6bc]/20 bg-[#1a1513] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                <img src="/disc.png" alt="Music disc" className="h-full w-full object-cover opacity-90" />
                <span className="absolute inset-0 flex items-center justify-center rounded-full bg-[#120d0b]/20">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#f7efe8]" aria-hidden="true">
                    <path d="M8 5.5v13l10-6.5-10-6.5Z" />
                  </svg>
                </span>
              </span>
              <span className="flex flex-col items-center leading-none text-center">
                <span className="text-[12px] lg:text-[1.2rem] mt-1">ऐका आता</span>
                <span className="mt-1 text-[10px] tracking-[0.18em] text-[#f4d9c4]/80">
                  
                </span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div
        className={
          showIntro
            ? "pointer-events-none select-none blur-[10px] grayscale-[0.08]"
            : ""
        }
      >
        <Background ref={scrollRef}>
          <HeroSection />
          <Information />
          <Footer/>
        </Background>
        <MusicPlayer />
      </div>
    </>
  );
}

export default App;

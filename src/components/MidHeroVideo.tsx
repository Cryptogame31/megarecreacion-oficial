import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, MessageCircle, Sparkles, Flame, Star, ShieldCheck, HeartHandshake } from 'lucide-react';
import { DISPLAY_PHONE, DISPLAY_PHONE_2 } from '../data/mockData';
import { createWhatsAppUrl, triggerPartyConfetti } from '../utils/confetti';

const HERO_4_VIDEO_URL = '/videos/tiktok_7531409107518065976.mp4';

export const MidHeroVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
        }
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleCtaClick = (isSecondPhone = false) => {
    triggerPartyConfetti();
  };

  return (
    <section
      id="show-en-vivo-video"
      className="relative min-h-[80vh] lg:min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-black border-y-4 border-pink-500/40 my-10 lg:my-16 shadow-[0_0_50px_rgba(236,72,153,0.3)]"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src={HERO_4_VIDEO_URL}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center scale-105 filter brightness-90 contrast-110"
        />

        {/* Cinematic Multi-Layer Gradient Overlays for Extreme Contrast & Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#100224] via-[#100224]/65 to-black/80 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/45 to-[#100224]/90 pointer-events-none" />

        {/* Dynamic Colorful Glows */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/25 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Floating Interactive Video Audio / Play Controls */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-30 flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={toggleMute}
          className="p-2.5 sm:p-3 rounded-full bg-purple-950/90 hover:bg-purple-900 text-white backdrop-blur-xl border border-pink-500/50 shadow-2xl transition-all hover:scale-110 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold cursor-pointer group"
          title={isMuted ? 'Activar Sonido del Video' : 'Silenciar Video'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400 group-hover:scale-110 transition-transform" />
              <span className="hidden xs:inline text-pink-300">Activar Audio</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 animate-pulse" />
              <span className="hidden xs:inline text-emerald-300">Audio Activado</span>
            </>
          )}
        </button>

        <button
          onClick={togglePlay}
          className="p-2.5 sm:p-3 rounded-full bg-purple-950/90 hover:bg-purple-900 text-white backdrop-blur-xl border border-pink-500/50 shadow-2xl transition-all hover:scale-110 cursor-pointer"
          title={isPlaying ? 'Pausar Video' : 'Reproducir Video'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
          ) : (
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400 ml-0.5" />
          )}
        </button>
      </div>

      {/* Main Foreground Content */}
      <div className="relative max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 w-full z-20 py-16 sm:py-20 text-center flex flex-col items-center justify-center space-y-4 sm:space-y-7">
        
        {/* Ribbon Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block badge-flyer-yellow px-4 sm:px-6 py-1.5 sm:py-2 rounded-2xl shadow-xl max-w-full"
        >
          <span className="text-[11px] sm:text-sm md:text-base font-black text-purple-950 uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-600 animate-bounce shrink-0" />
            <span className="truncate">¡SHOWS 100% EN VIVO & MÁXIMA ENERGÍA!</span>
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-600 animate-bounce shrink-0" />
          </span>
        </motion.div>

        {/* 3D Gold Extruded Title */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[1.08] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] max-w-4xl break-words"
        >
          ¡LA ALEGRÍA QUE TU FIESTA MERECE EN{' '}
          <span className="text-3d-gold block sm:inline">
            MEDELLÍN
          </span>!
        </motion.h2>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-sm sm:text-xl text-slate-100 font-medium max-w-2xl leading-relaxed drop-shadow-md px-2"
        >
          Disfruta la magia de personajes hiperrealistas, música, dinámicas interactivas y momentos inolvidables para los niños y toda la familia.
        </motion.p>

        {/* Highlight Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-sm"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-purple-950/90 border border-pink-500/50 backdrop-blur-md shadow-lg text-white font-extrabold">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 fill-yellow-300 shrink-0" />
            <span>Tarifa Personajes $180.000 / hora</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-purple-950/90 border border-cyan-400/50 backdrop-blur-md shadow-lg text-white font-extrabold">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 shrink-0" />
            <span>Trajes de Lujo & Recreadores Profesionales</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-purple-950/90 border border-emerald-400/50 backdrop-blur-md shadow-lg text-white font-extrabold">
            <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            <span>Cobertura Todo el Valle de Aburrá</span>
          </div>
        </motion.div>

        {/* WhatsApp CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full max-w-xl pt-2"
        >
          <motion.a
            id="mid-hero-whatsapp-btn-1"
            href={createWhatsAppUrl('¡Hola Mega Recreación! Vi el video del show en vivo y quiero cotizar para mi fiesta en Medellín.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCtaClick(false)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-neon-pink w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4.5 rounded-2xl text-white font-extrabold text-sm sm:text-base shadow-[0_0_35px_rgba(236,72,153,0.7)] cursor-pointer min-h-[48px]"
          >
            <MessageCircle className="w-5 h-5 fill-white shrink-0" />
            <span>WhatsApp: {DISPLAY_PHONE}</span>
          </motion.a>

          <motion.a
            id="mid-hero-whatsapp-btn-2"
            href={createWhatsAppUrl('¡Hola Mega Recreación! Quiero reservar personajes y animación para mi evento.', true)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCtaClick(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-neon-green w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4.5 rounded-2xl text-white font-extrabold text-sm sm:text-base shadow-[0_0_30px_rgba(16,185,129,0.7)] cursor-pointer min-h-[48px]"
          >
            <MessageCircle className="w-5 h-5 fill-white shrink-0" />
            <span>WhatsApp: {DISPLAY_PHONE_2}</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

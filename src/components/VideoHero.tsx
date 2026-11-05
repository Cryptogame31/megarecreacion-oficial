import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, MessageCircle, Sparkles, ChevronDown, Calendar, Clock, Award, PartyPopper, Users } from 'lucide-react';
import { DISPLAY_PHONE, DISPLAY_PHONE_2, LOGO_URL } from '../data/mockData';
import { createWhatsAppUrl, triggerPartyConfetti } from '../utils/confetti';

const HERO_VIDEO_URL = '/videos/tiktok_7491716209595944247.mp4';
const FALLBACK_VIDEO_URL = 'https://vicflix.expandete.cloud/REPLICASMEGA/Hero1.mp4';

interface VideoHeroProps {
  onOpenBooking?: () => void;
}

export const VideoHero: React.FC<VideoHeroProps> = ({ onOpenBooking }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState(HERO_VIDEO_URL);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [videoSrc]);

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

  const handleCtaClick = () => {
    triggerPartyConfetti();
  };

  const handleBookingClick = () => {
    triggerPartyConfetti();
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.location.href = '/reservar';
    }
  };

  return (
    <section
      id="inicio"
      className="relative w-full min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#060212] select-none"
    >
      {/* Fullscreen Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={videoSrc}
          poster="/images/mega_infantil_hero.jpg"
          onError={() => {
            if (videoSrc !== FALLBACK_VIDEO_URL) setVideoSrc(FALLBACK_VIDEO_URL);
          }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.62] contrast-110 saturate-125 transition-transform duration-1000"
        />

        {/* Multi-layered Festive Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 25%, rgba(88, 28, 135, 0.28) 0%, rgba(10, 4, 28, 0.78) 65%, rgba(3, 6, 17, 0.97) 100%)',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#030611]/90 via-[#030611]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030611] via-[#030611]/80 to-transparent pointer-events-none" />
      </div>

      {/* Sound & Play Controls */}
      <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-8 z-30 flex items-center gap-2.5">
        <button
          onClick={toggleMute}
          className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-purple-950/85 hover:bg-purple-900/95 text-white backdrop-blur-xl border border-pink-500/40 shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all hover:scale-105 cursor-pointer text-xs sm:text-sm font-bold group"
          title={isMuted ? 'Activar Sonido del Video' : 'Silenciar Video'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-pink-400" />
              <span className="hidden xs:inline text-slate-200 group-hover:text-white">Activar Audio</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="hidden xs:inline text-emerald-300">Audio Activo</span>
            </>
          )}
        </button>

        <button
          onClick={togglePlay}
          className="p-2.5 sm:p-3 rounded-full bg-purple-950/85 hover:bg-purple-900 text-white backdrop-blur-xl border border-pink-500/40 shadow-2xl transition-all hover:scale-110 cursor-pointer"
          title={isPlaying ? 'Pausar Video' : 'Reproducir Video'}
        >
          {isPlaying ? <Pause className="w-4 h-4 text-cyan-400" /> : <Play className="w-4 h-4 text-amber-400 fill-amber-400 ml-0.5" />}
        </button>
      </div>

      {/* Main Content Foreground */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 pt-24 sm:pt-28 pb-16 sm:pb-20 text-center flex flex-col items-center justify-center space-y-5 sm:space-y-6">
        
        {/* Brand Mascot Logo Floating Coin + Experience Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <div className="relative">
            <img
              src={LOGO_URL}
              alt="Logo Oficial Mega Recreación"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.65)]"
            />
            <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full border border-white shadow">
              +20 AÑOS
            </span>
          </div>

          <div className="inline-block badge-flyer-pink px-4 sm:px-6 py-2 rounded-2xl shadow-xl">
            <span className="text-xs sm:text-sm md:text-base font-black text-white uppercase tracking-wider flex items-center justify-center gap-2 drop-shadow">
              <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300 shrink-0" />
              <span>¡MEGA RECREACIÓN MEDELLÍN — TODO PARA TU FIESTA!</span>
              <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300 shrink-0" />
            </span>
          </div>
        </motion.div>

        {/* Big Ultra-Impact Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-[1.05] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] max-w-5xl"
        >
          FIESTAS INFANTILES,{' '}
          <span className="text-3d-gold block sm:inline">
            INFLABLES, SHOWS
          </span>{' '}
          & EVENTOS INOLVIDABLES
        </motion.h1>

        {/* Quick Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="flex flex-wrap items-center justify-center gap-2 max-w-4xl"
        >
          {[
            '🎪 Paquete Mega $180.000',
            '🔥 Mega Max (Transporte + Hora Loca) $190.000',
            '🎭 Mega Fiesta (2 Recreacionistas) $260.000',
            '🏰 Mega Alegría (Con Inflable) $650.000',
            '👑 Mega Pack Todo Incluido $1.550.000',
            '🍼 Baby Shower & Adultos $300.000',
            '🏢 Pausas Activas & Empresas'
          ].map((pill, idx) => (
            <a
              key={idx}
              href="#servicios"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-pink-600/80 border border-white/20 text-white text-xs sm:text-sm font-bold backdrop-blur-md transition-all hover:scale-105 shadow"
            >
              {pill}
            </a>
          ))}
        </motion.div>

        {/* Punchy Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-xl text-slate-100 font-medium max-w-3xl leading-relaxed drop-shadow-md px-2"
        >
          Más de 20 años creando sonrisas en Medellín, Envigado, Sabaneta, Bello, Itagüí y todo Antioquia: Recreación dirigida, Pintacaritas, Payasos, Títeres, Magia, Personajes Disney, Decoración y Refrigerios.
        </motion.p>

        {/* Direct Online Booking Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="w-full max-w-xl"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleBookingClick}
            id="video-hero-online-booking-btn"
            className="w-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-lg px-6 py-4 rounded-2xl shadow-[0_0_35px_rgba(234,179,8,0.75)] border-2 border-white flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-slate-950 shrink-0" />
            <span>📅 ¡Cotizar y Reservar Fecha en Línea Ahora!</span>
          </motion.button>
        </motion.div>

        {/* Call to Action Buttons: Both Official WhatsApp lines */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xl"
        >
          <motion.a
            id="hero-video-whatsapp-btn-1"
            href={createWhatsAppUrl('¡Hola Mega Recreación! Vi su página web y quiero cotizar un paquete para mi evento en Medellín.', false)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-neon-pink w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-white font-extrabold text-sm sm:text-base shadow-[0_0_35px_rgba(236,72,153,0.7)] cursor-pointer min-h-[50px]"
          >
            <MessageCircle className="w-5 h-5 fill-white shrink-0" />
            <span>WhatsApp: {DISPLAY_PHONE}</span>
          </motion.a>

          <motion.a
            id="hero-video-whatsapp-btn-2"
            href={createWhatsAppUrl('¡Hola Mega Recreación! Vi su página web y quiero cotizar un paquete para mi evento en Medellín.', true)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-neon-green w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-white font-extrabold text-sm sm:text-base shadow-[0_0_35px_rgba(16,185,129,0.7)] cursor-pointer min-h-[50px]"
          >
            <MessageCircle className="w-5 h-5 fill-white shrink-0" />
            <span>WhatsApp: {DISPLAY_PHONE_2}</span>
          </motion.a>
        </motion.div>

        {/* Scroll Down Cue */}
        <motion.a
          href="#servicios"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="pt-3 text-slate-300 hover:text-yellow-300 flex flex-col items-center gap-1 transition-colors cursor-pointer"
        >
          <span className="text-xs font-black uppercase tracking-widest">Ver Todos los Paquetes Oficiales y Precios</span>
          <ChevronDown className="w-5 h-5 text-pink-400 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
};

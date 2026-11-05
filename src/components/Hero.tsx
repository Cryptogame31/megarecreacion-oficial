import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, Star, Calendar, ShieldCheck, Flame, Play, Eye, CheckCircle2, Zap, Clock, Smile, Heart, ThumbsUp } from 'lucide-react';
import { HERO_TEAM_IMG, FLYER_PROMO_IMG, FLYER_PROMO_FALLBACK_URL, LOGO_URL, LOGO_FALLBACK_URL, DISPLAY_PHONE, DISPLAY_PHONE_2 } from '../data/mockData';
import { createWhatsAppUrl, triggerPartyConfetti } from '../utils/confetti';

interface CharacterPreview {
  id: string;
  name: string;
  tag: string;
  imgUrl: string;
  color: string;
  glowColor: string;
  bgGradient: string;
}

const FEATURED_CHARACTERS: CharacterPreview[] = [
  {
    id: 'chase',
    name: 'Chase Paw Patrol',
    tag: 'Misión de Cumpleaños & Patrulla',
    imgUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/delivery_chase_desayuno_sorpresa_feliz_dia.jpeg',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    bgGradient: 'from-blue-600/30 via-purple-950 to-black',
  },
  {
    id: 'superheroina',
    name: 'Mujer Maravilla & Heroínas',
    tag: 'Poder, Acción & Animación',
    imgUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_wonder_woman_animadora_nina_cargando_01.jpeg',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    bgGradient: 'from-red-600/30 via-purple-950 to-black',
  },
  {
    id: 'woody',
    name: 'Woody Toy Story',
    tag: 'Aventura en la Torta & Amistad',
    imgUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_woody_toystory_ninos_torta_decoracion.jpeg',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    bgGradient: 'from-amber-600/30 via-purple-950 to-black',
  },
  {
    id: 'unicornio',
    name: 'Unicornio Mágico',
    tag: 'Desayunos Sorpresa & Ternura',
    imgUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_unicornio_nina_globo_feliz_cumple_01.jpeg',
    color: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    bgGradient: 'from-pink-600/30 via-purple-950 to-black',
  },
  {
    id: 'spiderman',
    name: 'Spiderman Marvel',
    tag: 'Acrobacias & Superpoderes',
    imgUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_spiderman_nino_6anos_decoracion.jpeg',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    bgGradient: 'from-red-600/30 via-purple-950 to-black',
  },
  {
    id: 'elsa',
    name: 'Elsa Frozen Disney',
    tag: 'Magia de Hielo & Cuentos',
    imgUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_elsa_frozen_nina_cumpleanera_emmy.jpeg',
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    bgGradient: 'from-cyan-600/30 via-purple-950 to-black',
  },
];

interface HeroProps {
  onOpenBooking?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [showFlyerModal, setShowFlyerModal] = useState(false);
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);

  const activeChar = FEATURED_CHARACTERS[selectedCharIndex];

  // 3D Mouse Parallax Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const floatX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const floatY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleBookNow = (isSecondPhone = false) => {
    triggerPartyConfetti();
  };

  const handleOnlineBookingClick = () => {
    triggerPartyConfetti();
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.location.href = '/reservar';
    }
  };

  const handleSelectChar = (index: number) => {
    setSelectedCharIndex(index);
    triggerPartyConfetti();
  };

  return (
    <section
      id="hero-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[96vh] pt-20 pb-16 lg:pt-28 lg:pb-20 flex items-center justify-center overflow-hidden bg-aurora perspective-2000"
    >
      {/* Celebration Atmosphere Glow Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.65, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/12 w-80 h-80 sm:w-[36rem] sm:h-[36rem] bg-pink-600/30 rounded-full blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/12 w-80 h-80 sm:w-[36rem] sm:h-[36rem] bg-cyan-500/30 rounded-full blur-[130px] pointer-events-none"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-purple-700/25 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating 3D Party Elements (Confetti, Stars, Balloons) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <motion.div
          style={{ x: floatX, y: floatY }}
          className="w-full h-full relative"
        >
          {/* Party Balloons */}
          <span className="absolute top-[8%] left-[4%] text-4xl sm:text-5xl animate-float-slow opacity-90 drop-shadow-[0_0_20px_rgba(236,72,153,0.9)]">🎈</span>
          <span className="absolute top-[18%] right-[5%] text-4xl sm:text-5xl animate-float-reverse opacity-90 drop-shadow-[0_0_20px_rgba(6,182,212,0.9)]">🎈</span>
          <span className="absolute bottom-[20%] left-[6%] text-3xl sm:text-4xl animate-float-slow opacity-85 drop-shadow-[0_0_15px_rgba(245,158,11,0.9)]">🎈</span>
          <span className="absolute bottom-[25%] right-[8%] text-3xl sm:text-4xl animate-float-reverse opacity-85 drop-shadow-[0_0_15px_rgba(168,85,247,0.9)]">🎈</span>
          
          {/* Sparkles and Confetti */}
          <span className="absolute top-[12%] right-[18%] text-3xl animate-float-slow opacity-85">🎉</span>
          <span className="absolute top-[35%] left-[2%] text-3xl animate-float-reverse opacity-80">⭐</span>
          <span className="absolute top-[60%] right-[3%] text-4xl animate-float-slow opacity-90">✨</span>
          <span className="absolute bottom-[10%] left-[22%] text-2xl animate-float-slow opacity-75">🍭</span>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Flyer Main Poster Container with 3D Depth */}
        <div className="glass-realistic rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-10 lg:p-12 border-2 border-pink-500/50 shadow-[0_25px_80px_rgba(0,0,0,0.85)] relative overflow-hidden bg-gradient-to-b from-[#24084f]/90 via-[#190439]/95 to-[#0e0222]">
          
          {/* Festive Top Lighting Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-pink-500/30 to-transparent blur-2xl pointer-events-none" />

          {/* 1. Header Section: Exact Flyer Title Hierarchy */}
          <div className="flex flex-col items-center text-center space-y-2.5 sm:space-y-3 relative z-10">
            
            {/* Top Ribbon Badge: ¡ALQUILA A TUS */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block badge-flyer-pink px-4 sm:px-9 py-1.5 sm:py-2 rounded-2xl -rotate-1 transform shadow-xl cursor-default max-w-full"
            >
              <h2 className="text-xs sm:text-lg md:text-xl font-black text-white uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 drop-shadow-md">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 fill-yellow-300 shrink-0" />
                <span>¡ALQUILA A TUS</span>
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 fill-yellow-300 shrink-0" />
              </h2>
            </motion.div>

            {/* Main 3D Cartoon Pop Word: PERSONAJES */}
            <motion.h1
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-[2.6rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-[0.95] text-3d-gold select-none transform hover:scale-[1.02] transition-transform duration-300 break-words max-w-full"
            >
              PERSONAJES
            </motion.h1>

            {/* Sub Ribbon Badge: FAVORITOS! */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block badge-flyer-cyan px-5 sm:px-10 py-1.5 sm:py-2 rounded-2xl rotate-1 transform shadow-xl cursor-default max-w-full"
            >
              <span className="text-sm sm:text-xl md:text-2xl font-black text-white uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                FAVORITOS!
              </span>
            </motion.div>

            {/* 2. Massive Glowing Price Plaque: $180.000 POR HORA */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-3 sm:mt-4 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#1d063e]/95 border-3 sm:border-4 border-pink-500 shadow-[0_0_40px_rgba(236,72,153,0.7)] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 relative w-full sm:w-auto"
            >
              {/* Giant Price Text */}
              <div className="text-3xl sm:text-6xl md:text-7xl font-black text-white tracking-tight drop-shadow-[0_4px_15px_rgba(236,72,153,0.9)] flex items-center">
                $180.000
              </div>

              {/* Gold "POR HORA" Pill with Clock */}
              <div className="flex items-center gap-2 badge-flyer-yellow px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-lg transform sm:rotate-2">
                <span className="text-xs sm:text-xl font-black uppercase text-purple-950 tracking-wider">
                  POR HORA
                </span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-pink-600 flex items-center justify-center text-white shadow">
                  <Clock className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
            </motion.div>

          </div>

          {/* 3. Interactive 4-Photo Showcase Grid (Arched Style from Flyer) */}
          <div className="mt-10 relative z-10">
            
            {/* Spiky Stickers Flanking the Showcase */}
            <div className="hidden lg:block absolute -left-6 top-1/3 -translate-y-1/2 z-20 w-44">
              <motion.div
                animate={{ rotate: [-6, -2, -6], scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="badge-starburst-green p-5 text-center text-white font-black text-xs uppercase leading-tight drop-shadow-xl shadow-2xl"
              >
                <div className="pt-2 pb-2">
                  DIVERSIÓN QUE CREA RECUERDOS INOLVIDABLES
                </div>
              </motion.div>
            </div>

            <div className="hidden lg:block absolute -right-6 top-1/3 -translate-y-1/2 z-20 w-44">
              <motion.div
                animate={{ rotate: [6, 2, 6], scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="badge-starburst-cyan p-5 text-center text-white font-black text-xs uppercase leading-tight drop-shadow-xl shadow-2xl"
              >
                <div className="pt-2 pb-2">
                  ALEGRÍA QUE SE VE, Y SE SIENTE
                </div>
              </motion.div>
            </div>

            {/* The 4 Arched Photo Cards from the Flyer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              {FEATURED_CHARACTERS.slice(0, 4).map((char, index) => {
                const isSelected = selectedCharIndex === index;
                return (
                  <motion.div
                    key={char.id}
                    whileHover={{ y: -8, scale: 1.03 }}
                    onClick={() => handleSelectChar(index)}
                    className={`relative rounded-3xl overflow-hidden cursor-pointer border-4 transition-all duration-300 shadow-2xl flex flex-col group ${
                      isSelected
                        ? 'border-yellow-300 shadow-[0_0_30px_rgba(253,224,71,0.8)] scale-[1.02]'
                        : 'border-pink-500/70 hover:border-cyan-300'
                    }`}
                  >
                    {/* Character Photo in Arched Frame */}
                    <div className="relative aspect-[3/4] bg-purple-950 overflow-hidden">
                      <img
                        src={char.imgUrl}
                        alt={char.name}
                        loading="eager"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback to gallery Spiderman/Woody if network hiccup
                          (e.target as HTMLImageElement).src = 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_spiderman_nino_6anos_decoracion.jpeg';
                        }}
                      />
                      
                      {/* Gentle bottom gradient for crystal clear text legibility while keeping photo luminous */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#100224]/90 via-black/20 to-transparent pointer-events-none" />

                      {/* Top Pill Tag */}
                      <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                        <span className="text-[10px] sm:text-xs font-black bg-pink-600 text-white px-2.5 py-0.5 rounded-full shadow-lg border border-pink-400/40">
                          {char.name.split(' ')[0]}
                        </span>
                        {isSelected && (
                          <span className="w-3 h-3 rounded-full bg-yellow-300 shadow-[0_0_10px_#fde047] animate-ping" />
                        )}
                      </div>

                      {/* Bottom Info on Card */}
                      <div className="absolute bottom-2.5 left-2 right-2 text-center pointer-events-none">
                        <p className="text-xs sm:text-sm font-black text-white leading-tight font-display drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                          {char.name}
                        </p>
                        <p className="text-[10px] text-yellow-300 font-extrabold truncate drop-shadow">
                          {char.tag}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile stickers */}
            <div className="grid grid-cols-2 gap-3 mt-4 lg:hidden">
              <div className="badge-starburst-green p-3 text-center text-white font-black text-[11px] uppercase leading-tight shadow-md">
                DIVERSIÓN QUE CREA RECUERDOS INOLVIDABLES
              </div>
              <div className="badge-starburst-cyan p-3 text-center text-white font-black text-[11px] uppercase leading-tight shadow-md">
                ALEGRÍA QUE SE VE, Y SE SIENTE
              </div>
            </div>

          </div>

          {/* 4. Mascot & 3D Logo Centerpiece */}
          <div className="mt-8 flex flex-col items-center justify-center text-center relative z-10">
            <motion.div
              whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <img
                src={LOGO_URL}
                alt="Mega Recreación Mascota Oficial"
                referrerPolicy="no-referrer"
                className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border-4 border-yellow-300 shadow-[0_0_40px_rgba(234,179,8,0.75)] object-cover bg-white transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('vicflix.expandete.cloud')) {
                    target.src = LOGO_FALLBACK_URL;
                  }
                }}
              />
              <span className="absolute -bottom-1 -right-1 text-2xl drop-shadow-md">🎪</span>
            </motion.div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider uppercase text-3d-cyan mt-3">
              Mega Recreación
            </h3>
            <p className="text-xs sm:text-sm text-pink-200 font-bold">
              ¡La empresa líder en eventos infantiles y empresariales de Medellín!
            </p>
          </div>

          {/* 5. Four Trust Pillars (Exact Match with Flyer Icons) */}
          <div className="mt-8 pt-6 border-t-2 border-pink-500/30 grid grid-cols-2 md:grid-cols-4 gap-3 text-center relative z-10">
            
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-purple-950/80 border border-pink-500/40 shadow-md">
              <div className="w-8 h-8 rounded-full bg-pink-500/30 flex items-center justify-center text-pink-300 mb-1.5">
                <Smile className="w-5 h-5" />
              </div>
              <span className="text-[11px] sm:text-xs font-black text-white uppercase tracking-wider">
                PERSONAJES QUE ENCANTAN
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-purple-950/80 border border-pink-500/40 shadow-md">
              <div className="w-8 h-8 rounded-full bg-emerald-500/30 flex items-center justify-center text-emerald-300 mb-1.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] sm:text-xs font-black text-white uppercase tracking-wider">
                100% SEGURO Y CONFIABLE
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-purple-950/80 border border-pink-500/40 shadow-md">
              <div className="w-8 h-8 rounded-full bg-amber-500/30 flex items-center justify-center text-amber-300 mb-1.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[11px] sm:text-xs font-black text-white uppercase tracking-wider">
                ANIMACIÓN DE CALIDAD
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-purple-950/80 border border-pink-500/40 shadow-md">
              <div className="w-8 h-8 rounded-full bg-yellow-500/30 flex items-center justify-center text-yellow-300 mb-1.5">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="text-[11px] sm:text-xs font-black text-white uppercase tracking-wider">
                DIVERSIÓN GARANTIZADA
              </span>
            </div>

          </div>

          {/* 6. Magenta Banner: ★ ¡PERFECTO PARA CUMPLEAÑOS Y EVENTOS! ★ */}
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 py-3 px-4 text-center border-2 border-yellow-300 shadow-xl relative z-10">
            <h4 className="text-sm sm:text-base md:text-lg font-black text-white uppercase tracking-wider flex items-center justify-center gap-2">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              ¡PERFECTO PARA CUMPLEAÑOS Y EVENTOS!
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            </h4>
          </div>

          {/* 6.1 DIRECT ONLINE BOOKING WITH WOMPI BUTTON */}
          <div className="mt-4 relative z-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOnlineBookingClick}
              id="btn-hero-book-online-wompi"
              className="w-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-xl p-4 sm:p-5 rounded-2xl shadow-[0_0_35px_rgba(234,179,8,0.6)] border-3 border-white flex items-center justify-center gap-3 cursor-pointer"
            >
              <Calendar className="w-6 h-6 text-slate-950 shrink-0" />
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <span>⚡ ¡Reserva en Línea y Escoge Fecha!</span>
                <span className="bg-pink-600 text-white text-xs sm:text-sm font-black px-2.5 py-0.5 rounded-full shadow">
                  Pago Seguro Wompi
                </span>
              </div>
            </motion.button>
          </div>

          {/* 7. WhatsApp Contact Banner (Both Numbers: 319 718 8973 | 316 304 8505) */}
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 relative z-10">
            
            {/* Line 1 */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={createWhatsAppUrl(`¡Hola Mega Recreación! Vi la promoción de los personajes a $180.000/hora y quiero cotizar para mi evento.`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleBookNow(false)}
              className="flex items-center justify-center gap-2.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 text-white font-black text-sm sm:text-lg shadow-[0_0_30px_rgba(16,185,129,0.6)] border-2 border-white cursor-pointer min-h-[48px]"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white shrink-0" />
              <span>WhatsApp: {DISPLAY_PHONE}</span>
            </motion.a>

            {/* Line 2 */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={createWhatsAppUrl(`¡Hola Mega Recreación! Quiero cotizar personajes y recreación para mi fiesta en Medellín.`, true)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleBookNow(true)}
              className="flex items-center justify-center gap-2.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 text-white font-black text-sm sm:text-lg shadow-[0_0_30px_rgba(16,185,129,0.6)] border-2 border-white cursor-pointer min-h-[48px]"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white shrink-0" />
              <span>WhatsApp: {DISPLAY_PHONE_2}</span>
            </motion.a>

          </div>

          {/* Button to view flyer preview modal */}
          <div className="mt-4 flex justify-center relative z-10">
            <button
              onClick={() => setShowFlyerModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-950/90 hover:bg-pink-600/30 text-pink-300 hover:text-white border border-pink-500/50 text-xs sm:text-sm font-bold transition shadow cursor-pointer"
            >
              <Eye className="w-4 h-4 text-pink-400" />
              <span>Ver Flyer Promocional Completo</span>
            </button>
          </div>

        </div>

      </div>

      {/* Promo Flyer Lightbox Modal */}
      <AnimatePresence>
        {showFlyerModal && (
          <div
            id="promo-flyer-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
            onClick={() => setShowFlyerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-lg w-full bg-slate-900/95 rounded-3xl p-5 border border-pink-500/60 shadow-[0_0_50px_rgba(236,72,153,0.4)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h3 className="font-display text-lg font-bold text-white">Flyer Oficial Mega Recreación</h3>
                </div>
                <button
                  onClick={() => setShowFlyerModal(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-black border border-white/10 shadow-2xl">
                <img
                  src={FLYER_PROMO_IMG}
                  alt="Flyer Personajes Mega Recreación"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('vicflix.expandete.cloud')) {
                      target.src = FLYER_PROMO_FALLBACK_URL;
                    }
                  }}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href={createWhatsAppUrl('¡Hola Mega Recreación! Vi el flyer y quiero reservar con la tarifa de $180.000/hora.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    triggerPartyConfetti();
                    setShowFlyerModal(false);
                  }}
                  className="btn-neon-green flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-xs shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{DISPLAY_PHONE}</span>
                </a>

                <a
                  href={createWhatsAppUrl('¡Hola Mega Recreación! Vi el flyer y quiero reservar con la tarifa de $180.000/hora.', true)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    triggerPartyConfetti();
                    setShowFlyerModal(false);
                  }}
                  className="btn-neon-green flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-xs shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{DISPLAY_PHONE_2}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};


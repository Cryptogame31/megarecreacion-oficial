import React from 'react';
import { motion } from 'motion/react';
import { VIDEOS, TIKTOK_VIDEOS } from '../data/mockData';
import { Sparkles, Video, MessageCircle, Film, ExternalLink } from 'lucide-react';
import { createWhatsAppUrl, triggerPartyConfetti } from '../utils/confetti';

export const VideosSection: React.FC = () => {
  return (
    <section id="videos" className="py-20 lg:py-28 relative overflow-hidden bg-aurora">
      {/* Dynamic Ambient Cyan & Magenta Glow */}
      <div className="absolute top-1/3 right-10 w-[32rem] h-[32rem] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[32rem] h-[32rem] bg-pink-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <Video className="w-4 h-4 text-cyan-400" />
            Videos Reales en Acción
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            ¡ASÍ SE VIVE LA FIESTA <span className="bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-300 bg-clip-text text-transparent">EN VIVO!</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium">
            Mira la energía arrolladora, el baile y la alegría auténtica capturada en video directamente por los papás y clientes en Medellín.
          </p>

          {/* Direct TikTok Social Buttons in Header */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {TIKTOK_VIDEOS.map((tt) => (
              <motion.a
                key={tt.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={tt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-pink-500/40 hover:border-pink-400 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer group"
              >
                <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-pink-500 to-cyan-400 flex items-center justify-center text-[10px] shadow">
                  🎵
                </span>
                <span className="group-hover:text-pink-300 transition-colors">{tt.label}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Video Cards Grid with 3D Pop (Native HTML5 Videos) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VIDEOS.map((vid, idx) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-realistic rounded-3xl overflow-hidden border border-cyan-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between group hover:border-cyan-400 transition-all duration-300 relative"
            >
              {/* Backlight Ambient Glow behind card */}
              <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

              <div>
                {/* Badge Header */}
                <div className="p-4 bg-slate-900/95 border-b border-white/10 flex items-center justify-between">
                  <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-cyan-400" />
                    {vid.badge}
                  </span>
                  <span className="text-[11px] text-slate-300 font-bold bg-slate-800 px-3 py-1 rounded-full border border-white/10">
                    {vid.duration}
                  </span>
                </div>

                {/* HTML5 Native Video Element with Rounded Framing */}
                <div className="relative aspect-[9/16] sm:aspect-[4/5] bg-black">
                  <video
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                    playsInline
                  >
                    <source src={vid.videoUrl} type="video/mp4" />
                    Tu navegador no soporta la reproducción de video HTML5.
                  </video>
                </div>

                {/* Video Info */}
                <div className="p-5 space-y-2 bg-slate-900/80">
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    {vid.description}
                  </p>
                </div>
              </div>

              {/* Card Action */}
              <div className="p-5 pt-0 bg-slate-900/80">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={createWhatsAppUrl(`¡Hola Mega Recreación! Vi el video de "${vid.title}" y quiero una animación con esa misma energía para mi fiesta.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerPartyConfetti()}
                  className="btn-neon-cyan w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-black text-xs sm:text-sm shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Quiero este Show en mi Fiesta</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Networks & TikTok Channels Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/90 via-slate-900 to-pink-950/80 border border-pink-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 p-0.5 shadow-[0_0_25px_rgba(236,72,153,0.4)] shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl">
                🎵
              </div>
            </div>
            <div>
              <h4 className="font-black text-white text-base sm:text-lg">
                ¡Síguenos en TikTok y mira más videos virales!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Publicamos coreografías, momentos graciosos, hora loca y entregas sorpresa todas las semanas.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="https://vt.tiktok.com/ZSVQPMVH7/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>▶ Ver TikTok Show en Vivo</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="https://vt.tiktok.com/ZSVQPevb5/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-cyan-500/40 font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>▶ Ver TikTok Coreografías</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom Custom Character Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-8 p-6 sm:p-8 rounded-3xl glass-realistic border border-cyan-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-black text-white text-base sm:text-lg">¿Quieres un personaje o show personalizado?</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">Cuéntanos tu idea o temática y la hacemos realidad con vestuario impecable y música especial.</p>
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href={createWhatsAppUrl('¡Hola Mega Recreación! Quiero consultar la posibilidad de un show o personaje personalizado.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => triggerPartyConfetti()}
            className="btn-neon-pink w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-black text-xs sm:text-sm shadow-lg shrink-0 cursor-pointer"
          >
            <span>Consultar Show a Medida</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};


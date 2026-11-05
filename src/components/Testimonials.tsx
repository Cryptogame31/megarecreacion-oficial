import React from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, CheckCircle, MapPin, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonios" className="py-20 lg:py-28 relative overflow-hidden bg-aurora">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.25)]">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            Opiniones Reales de Clientes
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            FAMILIAS Y EMPRESAS QUE <span className="bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-300 bg-clip-text text-transparent">CELEBRAN CON NOSOTROS</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium">
            Nuestra mayor satisfacción son las sonrisas y la tranquilidad de quienes nos confían sus fechas más especiales.
          </p>
        </motion.div>

        {/* Testimonials Grid with 3D Pop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-realistic rounded-3xl p-6 sm:p-7 border border-white/15 hover:border-amber-400/50 shadow-[0_20px_45px_rgba(0,0,0,0.6)] flex flex-col justify-between group transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 w-9 h-9 text-white/10 group-hover:text-amber-400/30 transition-colors pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Stars with Glowing Aura */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic font-medium">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-5 mt-5 border-t border-white/10 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      {t.name}
                      {t.verified && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" title="Cliente Verificado" />
                      )}
                    </h4>
                    <p className="text-xs text-slate-400 font-semibold">{t.role}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-pink-300 font-bold bg-pink-500/15 px-3 py-1 rounded-full border border-pink-500/30">
                    <MapPin className="w-3 h-3 text-pink-400" />
                    <span>{t.location}</span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-cyan-300 font-bold">
                  Servicio: {t.serviceType}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

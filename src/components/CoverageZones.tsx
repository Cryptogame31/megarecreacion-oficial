import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Sparkles, Navigation, Clock, ShieldAlert, Truck, CheckCircle2 } from 'lucide-react';
import { MUNICIPALITIES } from '../data/mockData';
import { createWhatsAppUrl, triggerPartyConfetti } from '../utils/confetti';

export const CoverageZones: React.FC = () => {
  return (
    <section id="cobertura" className="py-20 relative overflow-hidden bg-[#030611]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-realistic rounded-3xl p-8 sm:p-12 border border-pink-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          {/* Radar Ambient Pulse Effect in Background */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 text-xs font-black uppercase tracking-wider border border-pink-500/40 shadow-sm">
                <Navigation className="w-4 h-4 text-pink-400" />
                Cobertura Total en Antioquia
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                ¡LLEGAMOS A CUALQUIER RINCÓN DEL <span className="bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">VALLE DE ABURRÁ!</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                Contamos con transporte propio y logística puntual. Atendemos en salones sociales de unidades residenciales, fincas de recreo, colegios, empresas, parques y casas familiares.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-white/10">
                  <Truck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-extrabold text-white uppercase">Transporte Seguro</h4>
                    <p className="text-[11px] text-slate-400 font-medium">Llegamos 20 minutos antes para alistamiento</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-white/10">
                  <Clock className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-extrabold text-white uppercase">Horarios Flexibles</h4>
                    <p className="text-[11px] text-slate-400 font-medium">Lunes a Domingo y festivos</p>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href={createWhatsAppUrl('¡Hola Mega Recreación! Quiero consultar la disponibilidad de animación para mi ubicación.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerPartyConfetti()}
                  className="btn-neon-pink inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-black text-sm shadow-lg cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Consultar Cobertura para mi Zona</span>
                </motion.a>
              </div>
            </div>

            {/* Municipalities Interactive Pins Grid */}
            <div className="lg:col-span-6 bg-slate-900/95 rounded-2xl p-6 sm:p-7 border border-white/15 shadow-2xl">
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-400" />
                Zonas y Municipios de Atención Frecuente:
              </h3>
              
              <div className="flex flex-wrap gap-2.5">
                {MUNICIPALITIES.map((mun, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-pink-500/20 text-slate-200 hover:text-pink-300 border border-white/10 hover:border-pink-500/50 text-xs font-bold transition shadow-sm cursor-default"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]"></span>
                    {mun}
                  </motion.span>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-pink-500/15 border border-pink-500/30 text-xs text-pink-200 flex items-center gap-3 shadow-inner font-medium">
                <Sparkles className="w-5 h-5 text-pink-400 shrink-0" />
                <span>¿Tu evento es en una finca en Guarne, Copacabana, Girardota o Santa Elena? ¡También vamos con todo el combo!</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, CheckCircle2, Eye, X, Calendar, GraduationCap, MapPin, Clock, Users, Flame } from 'lucide-react';
import { SERVICES, DISPLAY_PHONE, DISPLAY_PHONE_2 } from '../data/mockData';
import { ServiceCategory } from '../types';
import { createWhatsAppUrl, triggerPartyConfetti } from '../utils/confetti';

interface BentoServicesProps {
  onOpenBooking?: (service?: 'personaje-show' | 'desayuno-sorpresa' | 'pausa-activa') => void;
}

const CATEGORY_TABS: { id: ServiceCategory; label: string; emoji: string }[] = [
  { id: 'todos', label: 'Todos los Planes', emoji: '✨' },
  { id: 'infantil', label: 'Recreación Infantil & Personajes', emoji: '🎪' },
  { id: 'todo-incluido', label: 'Combos Con Inflable & Todo Incluido', emoji: '🏰' },
  { id: 'adultos-baby', label: 'Baby Shower & Adultos', emoji: '🍼' },
  { id: 'empresarial', label: 'Empresas & Pausas Activas', emoji: '🏢' },
  { id: 'adicionales', label: 'Inflables, Decoración y Comidas', emoji: '🍔' },
];

export const BentoServices: React.FC<BentoServicesProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('todos');
  const [activeMediaModal, setActiveMediaModal] = useState<{ url: string; title: string } | null>(null);

  const filteredServices = selectedCategory === 'todos'
    ? SERVICES
    : SERVICES.filter((s) => s.category === selectedCategory);

  const handleCta = () => {
    triggerPartyConfetti();
  };

  const handleBooking = (serviceId: string) => {
    triggerPartyConfetti();
    if (onOpenBooking) {
      if (serviceId.includes('empresarial')) {
        onOpenBooking('pausa-activa');
      } else {
        onOpenBooking('personaje-show');
      }
    } else {
      window.location.href = '/reservar';
    }
  };

  return (
    <section id="servicios" className="py-20 lg:py-28 relative overflow-hidden bg-aurora">
      {/* Background Lighting Caustics */}
      <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] bg-pink-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[30rem] h-[30rem] bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          id="precios"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto space-y-4 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/40 text-pink-300 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-[0_0_20px_rgba(236,72,153,0.25)]">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Catálogo Oficial Mega Recreación — Precios Transparentes
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight uppercase">
            PAQUETES Y SERVICIOS PARA <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">TODA OCASIÓN</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-medium">
            Selecciona la categoría de tu evento o explora todos nuestros paquetes verificados con recreacionistas profesionales, inflables, decoración, personajes y banquete.
          </p>
        </motion.div>

        {/* Interactive Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white border-yellow-300 shadow-[0_0_25px_rgba(236,72,153,0.6)] scale-105'
                    : 'bg-slate-900/80 text-slate-300 border-white/15 hover:border-pink-500/50 hover:text-white'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="glass-realistic rounded-3xl border border-pink-500/35 hover:border-yellow-400/70 shadow-[0_20px_50px_rgba(0,0,0,0.65)] flex flex-col justify-between overflow-hidden group"
            >
              {/* Top Image Banner */}
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <img
                    src={service.mainImage}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090418] via-black/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-purple-950/90 border border-pink-400/50 text-pink-200 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md">
                      {service.badge}
                    </span>
                    {service.popularTag && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 text-xs font-black shadow-lg">
                        {service.popularTag}
                      </span>
                    )}
                  </div>

                  {/* Flyer Preview Button if available */}
                  {service.flyerImage && (
                    <button
                      onClick={() => setActiveMediaModal({ url: service.flyerImage!, title: service.title })}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/75 hover:bg-pink-600 text-white text-xs font-bold border border-white/25 backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
                    >
                      <Eye className="w-3.5 h-3.5 text-yellow-300" />
                      <span>Ver Pieza Oficial</span>
                    </button>
                  )}

                  {/* Price Overlay Bottom Left */}
                  <div className="absolute bottom-3 left-3">
                    <div className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      {service.priceText}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-xs font-bold text-amber-300 mb-1">
                      {service.priceNote}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-pink-300 mt-1">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 pt-2 border-t border-white/10">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 space-y-2.5">
                <a
                  href={createWhatsAppUrl(service.whatsappMessage, false)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCta}
                  className="btn-neon-pink w-full py-3.5 px-4 rounded-2xl text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                  <span>{service.ctaText} ({DISPLAY_PHONE})</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={createWhatsAppUrl(service.whatsappMessage, true)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCta}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600/25 hover:bg-emerald-600/40 border border-emerald-400/40 text-emerald-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Línea 2: {DISPLAY_PHONE_2}</span>
                  </a>

                  <button
                    onClick={() => handleBooking(service.id)}
                    className="py-2.5 px-3 rounded-xl bg-amber-400/20 hover:bg-amber-400/35 border border-amber-400/50 text-amber-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Agendar Online</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* BANNER ESPECIAL: ACADEMIA MEGA RECREACIÓN (TRABAJA CON NOSOTROS)          */}
        {/* ========================================================================= */}
        <motion.div
          id="academia-mega"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 rounded-3xl overflow-hidden border-2 border-yellow-400/60 bg-gradient-to-r from-[#170936] via-[#1f0b47] to-[#0c1938] shadow-[0_0_50px_rgba(234,179,8,0.25)] grid grid-cols-1 lg:grid-cols-12 items-center"
        >
          <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden">
            <img
              src="/images/mega_academia_recreacionistas.jpg"
              alt="Academia Mega Recreación Medellín - Formación de Recreacionistas"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-transparent to-[#170936]/95" />
            <div className="absolute top-4 left-4 bg-yellow-400 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <GraduationCap className="w-4 h-4" />
              <span>CONVOCATORIA ABIERTA</span>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-extrabold uppercase">
              <Flame className="w-4 h-4 text-amber-400" />
              Comunidad & Formación de Talento Mega Recreación
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              ¿QUIERES TRABAJAR COMO RECREACIONISTA EN <span className="text-yellow-300">MEGA RECREACIÓN</span>?
            </h3>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Únete a nuestra familia y fórmate en pintacaritas, globoflexia, manejo de grupos, animación de fiestas, shows infantiles y recreación corporativa. Participa en nuestros eventos de fin de semana en todo Medellín.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Clock className="w-6 h-6 text-yellow-400 shrink-0" />
                <div>
                  <div className="text-[11px] uppercase text-slate-400 font-bold">Día y Hora</div>
                  <div className="text-sm font-black text-white">Jueves — 4:00 PM</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-pink-400 shrink-0" />
                <div>
                  <div className="text-[11px] uppercase text-slate-400 font-bold">Lugar en Medellín</div>
                  <div className="text-sm font-black text-white">Cra. 46 # 62-28 (Salón Sarahy)</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Users className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[11px] uppercase text-slate-400 font-bold">Canal Oficial</div>
                  <div className="text-sm font-black text-white">Grupo Telegram Activo</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={createWhatsAppUrl('¡Hola Mega Recreación! Quiero inscribirme a las capacitaciones de los jueves a las 4:00 PM (Carrera 46 # 62-28) para trabajar como recreacionista.', false)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCta}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl transition-transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Inscribirme a la Capacitación del Jueves</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal Lightbox para ver el Flyer Oficial del Paquete */}
      <AnimatePresence>
        {activeMediaModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMediaModal(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-slate-900 rounded-3xl border border-pink-500/50 overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
                <h4 className="text-white font-black text-base">{activeMediaModal.title} — Pieza Oficial</h4>
                <button
                  onClick={() => setActiveMediaModal(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-pink-600 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 max-h-[80vh] overflow-y-auto flex justify-center bg-black">
                <img
                  src={activeMediaModal.url}
                  alt={activeMediaModal.title}
                  className="max-h-[72vh] w-auto object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryCategory, GalleryItem } from '../types';
import { Sparkles, Eye, MessageCircle, X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { createWhatsAppUrl, triggerPartyConfetti } from '../utils/confetti';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories: { id: GalleryCategory; label: string; icon: string }[] = [
    { id: 'todos', label: 'Todos', icon: '✨' },
    { id: 'cumpleanos', label: 'Cumpleaños & Fiestas', icon: '🎂' },
    { id: 'colegios', label: 'Colegios & Halloween', icon: '🎃' },
    { id: 'navidad', label: 'Navidad & Papá Noel', icon: '🎄' },
    { id: 'portafolio', label: 'Portafolio & Disfraces', icon: '🎭' },
  ];

  const filteredItems =
    selectedCategory === 'todos'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const currentLightboxItem: GalleryItem | null =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="galeria" className="py-20 lg:py-28 relative overflow-hidden bg-[#030611]">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-600/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/40 text-pink-300 text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_0_20px_rgba(236,72,153,0.25)]">
            <Sparkles className="w-4 h-4 text-pink-400" />
            Galería Fotográfica Real
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            MIRA LA MAGIA DE <span className="bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-300 bg-clip-text text-transparent">NUESTROS EVENTOS</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium">
            Fotografías 100% reales en cumpleaños, jardines, colegios y empresas en Medellín y el Valle de Aburrá.
          </p>

          {/* Filter Pills with Motion Layout & Horizontal Mobile Scroll */}
          <div className="flex items-center sm:justify-center gap-1.5 sm:gap-2 pt-2 sm:pt-4 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:flex-wrap">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative shrink-0 flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'text-white shadow-[0_0_20px_rgba(236,72,153,0.6)] scale-105'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/10'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Gallery Grid with 2 columns on mobile for optimal visual density */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setLightboxIndex(index)}
                className="glass-realistic rounded-2xl overflow-hidden group cursor-pointer border border-white/15 hover:border-pink-500/60 shadow-xl hover:shadow-[0_15px_30px_rgba(236,72,153,0.3)] transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3.5 rounded-full bg-pink-500/90 text-white backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.8)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Character Tag Pill */}
                  <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[11px] font-bold text-white shadow">
                    {item.tag}
                  </div>
                </div>

                {/* Card Bottom Meta */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-slate-900/60">
                  <div>
                    <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider block">
                      {item.categoryName}
                    </span>
                    <h3 className="font-bold text-sm text-white line-clamp-1 group-hover:text-pink-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Cinematic Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {currentLightboxItem && lightboxIndex !== null && (
          <div
            id="gallery-lightbox-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/95 backdrop-blur-2xl"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl border border-pink-500/40 shadow-[0_0_60px_rgba(236,72,153,0.3)] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header */}
              <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-pink-500 text-white font-bold px-2.5 py-0.5 rounded-full">
                    {currentLightboxItem.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {lightboxIndex + 1} de {filteredItems.length}
                  </span>
                </div>

                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Photo with Controls */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={currentLightboxItem.imageUrl}
                  alt={currentLightboxItem.title}
                  className="max-h-full max-w-full object-contain"
                />

                {/* Left/Right Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/80 hover:bg-pink-600 text-white border border-white/20 shadow-xl transition-all hover:scale-110 cursor-pointer"
                  title="Anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/80 hover:bg-pink-600 text-white border border-white/20 shadow-xl transition-all hover:scale-110 cursor-pointer"
                  title="Siguiente"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Lightbox Footer Actions */}
              <div className="p-4 sm:p-6 bg-slate-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-display text-base sm:text-lg font-bold text-white">
                    {currentLightboxItem.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {currentLightboxItem.description}
                  </p>
                </div>

                <a
                  href={createWhatsAppUrl(`¡Hola Mega Recreación! Vi la foto de "${currentLightboxItem.title}" en su galería y quiero cotizar ese personaje/servicio.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerPartyConfetti()}
                  className="btn-neon-pink w-full sm:w-auto px-6 py-3 rounded-xl text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shrink-0 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Quiero este Personaje</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

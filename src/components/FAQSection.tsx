import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data/mockData';
import { HelpCircle, ChevronDown, MessageCircle, Sparkles } from 'lucide-react';
import { createWhatsAppUrl, triggerPartyConfetti } from '../utils/confetti';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="preguntas" className="py-20 relative overflow-hidden bg-aurora">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            Preguntas Frecuentes
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            RESOLVEMOS TUS <span className="bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-300 bg-clip-text text-transparent">DUDAS AL INSTANTE</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium">
            Todo lo que necesitas saber antes de contratar tu evento con Mega Recreación Medellín.
          </p>
        </motion.div>

        {/* Accordion List with Spring Physics */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`glass-realistic rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isOpen ? 'border-pink-500/60 shadow-[0_10px_30px_rgba(236,72,153,0.25)]' : 'border-white/15 hover:border-white/30'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-extrabold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-2 rounded-full text-pink-400 shrink-0 ${
                      isOpen ? 'bg-pink-500/25 shadow-sm' : 'bg-slate-800'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-200 leading-relaxed border-t border-white/10 pt-3.5 font-medium">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Question CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 text-center p-7 rounded-3xl glass-realistic border border-white/15 shadow-2xl"
        >
          <p className="text-sm sm:text-base text-slate-200 font-bold mb-4">
            ¿Tienes otra pregunta específica sobre tu fecha, espacio o personaje?
          </p>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href={createWhatsAppUrl('¡Hola Mega Recreación! Tengo una pregunta sobre la animación para mi evento en Medellín.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => triggerPartyConfetti()}
            className="btn-neon-green inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white font-extrabold text-sm shadow-xl cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Preguntar directamente al WhatsApp (319 718 8973)</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

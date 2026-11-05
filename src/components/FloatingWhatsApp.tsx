import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Sparkles, Send, Calendar } from 'lucide-react';
import { DISPLAY_PHONE, LOGO_URL, LOGO_FALLBACK_URL } from '../data/mockData';
import { createWhatsAppUrl, triggerPartyConfetti } from '../utils/confetti';

interface FloatingWhatsAppProps {
  onOpenBooking?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');

  const quickPrompts = [
    '¡Hola! Quiero cotizar un personaje infantil ($180k/h).',
    'Hola, deseo información para Pausas Activas en mi empresa.',
    'Quiero programar un Desayuno Sorpresa con entrega mágica.',
    '¿Tienen disponibilidad para este fin de semana?',
  ];

  const handleSend = (textToSend?: string) => {
    triggerPartyConfetti();
    const finalMsg = textToSend || quickMessage || '¡Hola Mega Recreación! Quiero cotizar una fiesta en Medellín.';
    const url = createWhatsAppUrl(finalMsg);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleBookingClick = () => {
    triggerPartyConfetti();
    setIsOpen(false);
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.location.href = '/reservar';
    }
  };

  return (
    <div id="floating-whatsapp-container" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      
      {/* Quick Popup Chat Box with Motion Spring Physics */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="whatsapp-chat-popup"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mb-3 w-[calc(100vw-2rem)] max-w-sm glass-realistic bg-slate-950/95 rounded-3xl overflow-hidden border border-emerald-500/50 shadow-[0_20px_50px_rgba(16,185,129,0.3)]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 p-4 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={LOGO_URL}
                    alt="Mega Recreación Asesor"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow bg-white"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('vicflix.expandete.cloud')) {
                        target.src = LOGO_FALLBACK_URL;
                      }
                    }}
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full shadow-[0_0_6px_#10b981]"></span>
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight font-display">Mega Recreación Medellín</h4>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-medium">
                    <span>🟢 En línea ahora</span> • <span>{DISPLAY_PHONE}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-emerald-100 hover:text-white hover:bg-white/15 transition cursor-pointer"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Bubble Simulation */}
            <div className="p-4 space-y-3 bg-slate-900/90 text-xs text-slate-200">
              <div className="p-3.5 rounded-2xl rounded-tl-none bg-slate-800 border border-white/10 shadow-sm leading-relaxed font-medium">
                👋 ¡Hola! Soy el asesor oficial de <strong>Mega Recreación</strong> en Medellín. ¿En qué podemos ayudarte hoy para hacer de tu fiesta un momento épico?
              </div>

              {/* Direct Booking button in popup */}
              <button
                onClick={handleBookingClick}
                className="w-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black p-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md border border-white cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>⚡ ¡Reserva en Línea y Paga con Wompi!</span>
              </button>

              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Opciones rápidas de cotización:
                </p>
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-800/90 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-white transition text-xs flex items-center justify-between cursor-pointer group"
                  >
                    <span className="truncate mr-1 font-medium">{prompt}</span>
                    <Send className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Input Box */}
            <div className="p-3 bg-slate-950 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                placeholder="Escribe tu consulta aquí..."
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                className="flex-1 bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
              />
              <button
                onClick={() => handleSend()}
                className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white shadow-md transition cursor-pointer"
                aria-label="Enviar por WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Orb with Realistic Pulsing Energy Waves */}
      <motion.button
        id="floating-whatsapp-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative group p-4 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white shadow-[0_0_35px_rgba(16,185,129,0.7)] flex items-center justify-center cursor-pointer border border-white/30"
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulsing Energy Waves */}
        <span className="absolute -inset-1.5 rounded-full bg-emerald-400/40 animate-ping pointer-events-none -z-10" />
        <span className="absolute -inset-3 rounded-full bg-emerald-500/20 animate-pulse-glow pointer-events-none -z-20" />

        <MessageCircle className="w-8 h-8 fill-white group-hover:rotate-12 transition-transform" />

        {/* Unread Alert Beacon */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-pink-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-[8px] font-black shadow">
          1
        </span>
      </motion.button>
    </div>
  );
};

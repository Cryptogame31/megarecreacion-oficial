import React from 'react';
import { LOGO_URL, LOGO_FALLBACK_URL, DISPLAY_PHONE, DISPLAY_PHONE_2 } from '../data/mockData';
import { MessageCircle, Phone, MapPin, Heart, Sparkles, Clock, ShieldCheck, Mail, Star, Calendar } from 'lucide-react';
import { createWhatsAppUrl, triggerPartyConfetti } from '../utils/confetti';

interface FooterProps {
  onOpenBooking?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const handleBooking = () => {
    triggerPartyConfetti();
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.location.href = '/reservar';
    }
  };
  return (
    <footer id="footer" className="bg-[#0f0222] border-t border-pink-500/30 pt-16 pb-12 relative overflow-hidden text-slate-400">
      
      {/* Top Floating Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-pink-500/20">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="Logo Mega Recreación Medellín"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border-2 border-yellow-300 shadow-md bg-white"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('vicflix.expandete.cloud')) {
                    target.src = LOGO_FALLBACK_URL;
                  }
                }}
              />
              <div>
                <h3 className="font-display text-lg font-black text-white leading-tight">
                  MEGA <span className="text-3d-gold">RECREACIÓN</span>
                </h3>
                <span className="text-xs text-pink-400 font-bold block">Medellín & Valle de Aburrá</span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              Expertos en hacer realidad los sueños de los niños y llevar la mejor energía a fiestas infantiles, colegios y empresas en Antioquia con más de 20 personajes.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Servicio 100% Garantizado y Seguro</span>
            </div>
          </div>

          {/* Col 2: Servicios Principales */}
          <div className="space-y-3">
            <h4 className="font-display text-white text-sm font-bold tracking-wider uppercase">
              Nuestros Servicios
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={handleBooking}
                  className="text-yellow-300 hover:text-white font-bold transition flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                  <span>⚡ Reservar en Línea (Wompi)</span>
                </button>
              </li>
              <li>
                <a href="#card-personajes-infantiles" className="hover:text-yellow-300 transition flex items-center gap-1.5 font-medium">
                  <span>🎭</span> Réplicas de Personajes ($180k/h)
                </a>
              </li>
              <li>
                <a href="#card-pausas-activas" className="hover:text-cyan-300 transition flex items-center gap-1.5 font-medium">
                  <span>💼</span> Pausas Activas Empresariales
                </a>
              </li>
              <li>
                <a href="#card-desayunos-sorpresa" className="hover:text-pink-300 transition flex items-center gap-1.5 font-medium">
                  <span>🎁</span> Desayunos Sorpresa con Personaje
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-yellow-300 transition flex items-center gap-1.5 font-medium">
                  <span>🎪</span> Recreación Integral & Minitecas
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-pink-300 transition flex items-center gap-1.5 font-medium">
                  <span>🎄</span> Shows Temáticos & Papá Noel
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Cobertura & Horarios */}
          <div className="space-y-3">
            <h4 className="font-display text-white text-sm font-bold tracking-wider uppercase">
              Horarios & Cobertura
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Atención y Eventos:</strong>
                  <span>Lunes a Domingo (6:00 AM - 10:00 PM)</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Sede Principal:</strong>
                  <span>Medellín, Antioquia (Valle de Aburrá & Oriente)</span>
                </div>
              </div>
            </div>
          </div>

            {/* Col 4: Contacto Inmediato & Redes */}
          <div className="space-y-3">
            <h4 className="font-display text-white text-sm font-bold tracking-wider uppercase">
              Líneas & Redes Sociales
            </h4>
            <p className="text-xs text-slate-300">
              ¿Quieres reservar tu fecha o ver más videos en vivo?
            </p>

            <div className="flex flex-col gap-2">
              <a
                href={createWhatsAppUrl('¡Hola Mega Recreación! Deseo cotizar y apartar fecha para mi fiesta.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerPartyConfetti()}
                className="btn-neon-green flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white font-bold text-xs sm:text-sm shadow-lg w-full"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {DISPLAY_PHONE}</span>
              </a>

              <a
                href={createWhatsAppUrl('¡Hola Mega Recreación! Deseo cotizar y apartar fecha para mi fiesta.', true)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerPartyConfetti()}
                className="btn-neon-pink flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white font-bold text-xs sm:text-sm shadow-lg w-full"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {DISPLAY_PHONE_2}</span>
              </a>

              {/* TikTok Social Media Links */}
              <div className="pt-1 flex flex-col gap-1.5">
                <a
                  href="https://vt.tiktok.com/ZSVQPMVH7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-pink-500/30 hover:border-pink-400 text-pink-300 font-bold text-xs transition-all shadow cursor-pointer"
                >
                  <span>🎵 TikTok: Show de Fiesta en Vivo</span>
                </a>
                <a
                  href="https://vt.tiktok.com/ZSVQPevb5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-bold text-xs transition-all shadow cursor-pointer"
                >
                  <span>🔥 TikTok: Baile & Personajes</span>
                </a>
              </div>
            </div>

            <div className="text-center text-[11px] text-yellow-300 font-bold">
              <span>¡Respondemos en menos de 5 minutos!</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Mega Recreación Medellín. Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center gap-1 text-slate-300">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" />
            <span>para las familias y empresas de Medellín</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

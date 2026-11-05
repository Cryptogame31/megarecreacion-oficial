import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, Phone, Menu, X, Calendar, Flame, CreditCard } from 'lucide-react';
import { LOGO_URL, LOGO_FALLBACK_URL, DISPLAY_PHONE, DISPLAY_PHONE_2 } from '../data/mockData';
import { createWhatsAppUrl, triggerPartyConfetti } from '../utils/confetti';

interface NavbarProps {
  onOpenBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#hero-video-section' },
    { name: 'Personajes', href: '#hero-section' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Videos', href: '#videos' },
    { name: 'Testimonios', href: '#testimonios' },
    { name: 'Cobertura', href: '#cobertura' },
    { name: 'Preguntas', href: '#preguntas' },
  ];

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-lg shadow-black/60 py-2.5 sm:py-3 bg-[#120329]/90 border-b border-pink-500/30'
          : 'bg-gradient-to-b from-[#14022c]/95 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <a
            href="#hero-section"
            className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-yellow-300 shadow-md shadow-pink-500/40 group-hover:border-cyan-400 transition-colors bg-white">
                <img
                  src={LOGO_URL}
                  alt="Mega Recreación Medellín Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('vicflix.expandete.cloud')) {
                      target.src = LOGO_FALLBACK_URL;
                    }
                  }}
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 text-[10px] text-white items-center justify-center font-bold">★</span>
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1 font-display">
                MEGA <span className="text-3d-gold">RECREACIÓN</span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-cyan-300 tracking-wider uppercase">
                Medellín & Valle de Aburrá
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-purple-950/70 p-1.5 rounded-full border border-pink-500/30 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-xs xl:text-sm font-bold text-slate-200 hover:text-white hover:bg-pink-600/40 hover:border-pink-500/50 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Direct Phone, Booking & WhatsApp CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Direct Booking Button */}
            <button
              onClick={handleBookingClick}
              id="btn-nav-booking-online"
              className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-xs xl:text-sm px-4 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer border border-white"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Reserva en Línea</span>
              <span className="bg-pink-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full ml-0.5">Wompi</span>
            </button>

            <div className="hidden xl:flex flex-col items-end text-xs font-bold text-slate-300">
              <a
                href={`tel:+57${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                className="flex items-center gap-1 hover:text-yellow-300 transition-colors"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>{DISPLAY_PHONE}</span>
              </a>
              <a
                href={`tel:+57${DISPLAY_PHONE_2.replace(/\s+/g, '')}`}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <span>{DISPLAY_PHONE_2}</span>
              </a>
            </div>

            <a
              href={createWhatsAppUrl('¡Hola Mega Recreación! Me gustaría información y cotizar una fiesta.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCtaClick}
              className="btn-neon-pink px-4 py-2 sm:px-4 sm:py-2.5 rounded-full font-black text-xs sm:text-sm text-white flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Cotizar</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleBookingClick}
              id="btn-nav-mobile-book"
              className="bg-yellow-400 text-slate-950 px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1 shadow"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reservar</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-purple-950/90 text-slate-200 hover:text-white border border-pink-500/40"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-t border-pink-500/30 px-4 pt-3 pb-6 mt-2 shadow-2xl bg-[#170433]/95 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            
            {/* Primary booking button inside mobile menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleBookingClick();
              }}
              className="w-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-slate-950 font-black py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg mb-2 cursor-pointer border border-white"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Reservar Personaje en Línea (Pago Wompi)</span>
            </button>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-200 hover:bg-pink-600/30 hover:text-pink-300 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <Sparkles className="w-3.5 h-3.5 text-pink-400 opacity-60" />
              </a>
            ))}
            <div className="pt-3 border-t border-pink-500/30 flex flex-col gap-2">
              <a
                href={createWhatsAppUrl('¡Hola Mega Recreación! Deseo cotizar un evento.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handleCtaClick();
                  setMobileMenuOpen(false);
                }}
                className="btn-neon-pink w-full py-3 rounded-xl font-extrabold text-sm text-white flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {DISPLAY_PHONE}</span>
              </a>

              <a
                href={createWhatsAppUrl('¡Hola Mega Recreación! Deseo cotizar un evento.', true)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handleCtaClick();
                  setMobileMenuOpen(false);
                }}
                className="btn-neon-green w-full py-3 rounded-xl font-extrabold text-sm text-white flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {DISPLAY_PHONE_2}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

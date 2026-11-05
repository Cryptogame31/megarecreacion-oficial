import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VideoHero } from './components/VideoHero';
import { Hero } from './components/Hero';
import { Metrics } from './components/Metrics';
import { BentoServices } from './components/BentoServices';
import { MidHeroVideo } from './components/MidHeroVideo';
import { GallerySection } from './components/GallerySection';
import { VideosSection } from './components/VideosSection';
import { Testimonials } from './components/Testimonials';
import { CoverageZones } from './components/CoverageZones';
import { FAQSection } from './components/FAQSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { PaymentSuccessPage } from './components/PaymentSuccessPage';
import { BookingPage } from './components/BookingPage';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const getInitialRoute = () => {
    if (typeof window === 'undefined') return 'home';
    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();

    if (pathname.includes('/pagook') || hash.includes('pagook') || search.includes('pagook')) {
      return 'pagook';
    }
    if (pathname.includes('/reservar') || hash.includes('reservar') || search.includes('reservar')) {
      return 'reservar';
    }
    return 'home';
  };

  const [currentRoute, setCurrentRoute] = useState<'home' | 'pagook' | 'reservar'>(getInitialRoute);
  const [bookingServiceType, setBookingServiceType] = useState<'personaje-show' | 'desayuno-sorpresa' | 'pausa-activa'>('personaje-show');
  
  // Estado para el Modal Rápido de Cotización / Reserva conectado a n8n
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDefaultPkg, setModalDefaultPkg] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (pathname.includes('/pagook') || hash.includes('pagook') || search.includes('pagook')) {
        setCurrentRoute('pagook');
      } else if (pathname.includes('/reservar') || hash.includes('reservar') || search.includes('reservar')) {
        if (search.includes('desayuno') || hash.includes('desayuno')) {
          setBookingServiceType('desayuno-sorpresa');
        } else if (search.includes('pausa') || hash.includes('pausa') || search.includes('bienestar') || hash.includes('empresa')) {
          setBookingServiceType('pausa-activa');
        }
        setCurrentRoute('reservar');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleGoHome = () => {
    window.history.pushState(null, '', '/');
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Abre el modal rápido de n8n o la página completa según se requiera
  const handleOpenQuickBooking = (packageName?: string) => {
    setModalDefaultPkg(packageName);
    setIsModalOpen(true);
  };

  const handleNavigateToBooking = (service?: 'personaje-show' | 'desayuno-sorpresa' | 'pausa-activa') => {
    // Al pulsar cotizar/reservar en la landing, abrimos el modal interactivo conectado a n8n
    handleOpenQuickBooking();
  };

  if (currentRoute === 'pagook') {
    return <PaymentSuccessPage onGoHome={handleGoHome} />;
  }

  if (currentRoute === 'reservar') {
    return <BookingPage onGoHome={handleGoHome} initialServiceType={bookingServiceType} />;
  }

  return (
    <div className="min-h-screen bg-[#030611] text-slate-100 font-sans selection:bg-pink-500 selection:text-white relative">
      {/* Top Fixed Header Navigation */}
      <Navbar onOpenBooking={() => handleOpenQuickBooking()} />

      {/* Main Sections Flow */}
      <main>
        {/* 1. First Hero Video Experience */}
        <VideoHero onOpenBooking={() => handleOpenQuickBooking()} />

        {/* 2. Interactive 3D Characters Showcase & Booking */}
        <Hero onOpenBooking={() => handleOpenQuickBooking('Show Personaje Disney / Favorito (1 Hora)')} />

        {/* 3. Key Trust Metrics & Animated Counters */}
        <Metrics />

        {/* 4. Bento Grid of Services & Transparent Prices */}
        <BentoServices onOpenBooking={() => handleOpenQuickBooking()} />

        {/* 5. Live Show Action Hero Video Showcase */}
        <MidHeroVideo />

        {/* 6. Filterable Interactive Photo Gallery & Lightbox */}
        <GallerySection />

        {/* 6. Real Action Videos Showcase (HTML5 Players) */}
        <VideosSection />

        {/* 7. 5-Star Verified Colombian Testimonials */}
        <Testimonials />

        {/* 8. Valle de Aburrá Coverage Zones */}
        <CoverageZones />

        {/* 9. Interactive FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Footer with Contact & Legal */}
      <Footer onOpenBooking={() => handleOpenQuickBooking()} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp onOpenBooking={() => handleOpenQuickBooking()} />

      {/* Modal Formulario de Captura Directo a n8n, Sheets y Telegram */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultPackage={modalDefaultPkg}
      />
    </div>
  );
}

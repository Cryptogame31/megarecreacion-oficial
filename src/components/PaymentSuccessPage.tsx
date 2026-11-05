import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  MessageCircle, 
  Phone, 
  Calendar, 
  PartyPopper, 
  ShieldCheck, 
  ArrowLeft,
  Heart,
  FileCheck2,
  Copy,
  Check
} from 'lucide-react';
import { LOGO_URL, LOGO_FALLBACK_URL, DISPLAY_PHONE, DISPLAY_PHONE_2 } from '../data/mockData';
import { createWhatsAppUrl, triggerPartyConfetti } from '../utils/confetti';

interface PaymentSuccessPageProps {
  onGoHome: () => void;
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ onGoHome }) => {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  // Read URL query parameters if present (e.g. from payment gateway like Wompi, ePayco, Bold, MercadoPago)
  const [params, setParams] = useState<{
    ref?: string;
    amount?: string;
    service?: string;
  }>({});

  useEffect(() => {
    // Fire festive confetti on page enter
    triggerPartyConfetti();
    const timer = setTimeout(() => {
      triggerPartyConfetti();
    }, 900);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Parse URL params
    const searchParams = new URLSearchParams(window.location.search);
    const ref = searchParams.get('ref') || searchParams.get('reference') || searchParams.get('id') || searchParams.get('id_transaccion');
    const amount = searchParams.get('amount') || searchParams.get('monto') || searchParams.get('valor');
    const service = searchParams.get('service') || searchParams.get('servicio') || searchParams.get('plan');

    if (ref || amount || service) {
      setParams({
        ref: ref || undefined,
        amount: amount || undefined,
        service: service || undefined,
      });
    }

    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(label);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const whatsappUrlLine1 = createWhatsAppUrl(
    params.ref 
      ? `¡Hola Mega Recreación! 👋 Acabo de realizar el pago de mi servicio (Ref: ${params.ref}). Quedo atento a la confirmación de mis datos.`
      : `¡Hola Mega Recreación! 👋 Acabo de realizar el pago de mi evento. Adjunto mi comprobante para que confirmemos los datos.`
  );

  const whatsappUrlLine2 = createWhatsAppUrl(
    params.ref 
      ? `¡Hola Mega Recreación! 👋 Acabo de realizar el pago de mi servicio (Ref: ${params.ref}). Quedo atento a la confirmación de mis datos.`
      : `¡Hola Mega Recreación! 👋 Acabo de realizar el pago de mi evento. Adjunto mi comprobante para que confirmemos los datos.`,
    true
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090d1f] via-[#050714] to-[#02040a] text-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6 relative overflow-hidden">
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-emerald-500/15 via-pink-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-yellow-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Top Brand Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between z-10 mb-6">
        <button
          onClick={onGoHome}
          id="btn-back-home-top"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-full px-4 py-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-pink-400" />
          <span>Volver al Inicio</span>
        </button>

        <div className="flex items-center gap-2.5">
          <img
            src={LOGO_URL}
            alt="Logo Mega Recreación"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('vicflix.expandete.cloud')) {
                target.src = LOGO_FALLBACK_URL;
              }
            }}
            className="w-10 h-10 rounded-full border-2 border-yellow-300 shadow-md bg-white object-cover"
          />
          <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 text-base sm:text-lg">
            MEGA RECREACIÓN
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto w-full z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden"
        >
          {/* Top celebratory banner bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-yellow-400 to-pink-500" />

          {/* Success Animated Badge */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'backOut' }}
              className="relative mb-5"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-500/20 border-4 border-emerald-400 flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.6)]">
                <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-400 drop-shadow-md" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-slate-950 p-2 rounded-full shadow-lg">
                <PartyPopper className="w-5 h-5" />
              </div>
            </motion.div>

            {/* Main Thank You Heading */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Transacción Aprobada Exitosamente
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-black text-white leading-tight mb-3">
              ¡Muchas Gracias por Tu Pago! 🎉
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-lg mb-6">
              Tu pago ha sido <span className="text-emerald-400 font-bold">registrado con éxito</span> en Mega Recreación. ¡Estamos muy emocionados de ser parte de tu gran celebración!
            </p>

            {/* Highlighted Notice Box (Call notification & schedule) */}
            <div className="w-full bg-slate-950/70 border-2 border-yellow-400/40 rounded-2xl p-5 sm:p-6 mb-6 text-left relative overflow-hidden shadow-inner">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-xl text-yellow-300 shrink-0 mt-0.5">
                  <Clock className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                    Próximo Paso: Confirmación de Datos
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Pronto un asesor oficial de Mega Recreación se comunicará con usted para confirmar la fecha, lugar, horarios y todos los datos de su evento.
                  </p>
                  
                  <div className="mt-3 inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/40 px-3 py-1.5 rounded-lg text-yellow-200 text-xs sm:text-sm font-semibold">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                    <span>Horario de atención y llamadas: <strong>9:00 a.m. – 4:00 p.m.</strong></span>
                  </div>

                  <p className="text-slate-400 text-xs italic pt-1">
                    * Si realizaste tu pago fuera de este horario, no te preocupes: tu reserva está guardada y te contactaremos en nuestro primer turno del día siguiente.
                  </p>
                </div>
              </div>
            </div>

            {/* Optional Transaction Details card if query parameters exist */}
            {(params.ref || params.amount || params.service) && (
              <div className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 mb-6 text-left text-xs sm:text-sm text-slate-300 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-slate-200 pb-1 border-b border-slate-700/50 mb-2">
                  <FileCheck2 className="w-4 h-4 text-cyan-400" />
                  <span>Resumen de la Transacción</span>
                </div>
                {params.service && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Servicio / Plan:</span>
                    <span className="font-semibold text-white">{params.service}</span>
                  </div>
                )}
                {params.amount && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Monto Cancelado:</span>
                    <span className="font-semibold text-emerald-400">{params.amount}</span>
                  </div>
                )}
                {params.ref && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Referencia de Pago:</span>
                    <span className="font-mono text-cyan-300 font-semibold">{params.ref}</span>
                  </div>
                )}
              </div>
            )}

            {/* WhatsApp Direct Confirmation Buttons */}
            <div className="w-full space-y-3 mb-6">
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                ¿Deseas enviar tu comprobante de inmediato por WhatsApp?
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Line 1 */}
                <a
                  href={whatsappUrlLine1}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-pagook-whatsapp-1"
                  className="flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                  <span>WhatsApp Principal ({DISPLAY_PHONE})</span>
                </a>

                {/* Line 2 */}
                <a
                  href={whatsappUrlLine2}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-pagook-whatsapp-2"
                  className="flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-white border border-emerald-500/30 font-bold px-4 py-3.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Línea 2 ({DISPLAY_PHONE_2})</span>
                </a>
              </div>
            </div>

            {/* Trust and return button */}
            <div className="pt-4 border-t border-slate-800 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Garantía de servicio 100% verificado en Medellín</span>
              </div>

              <button
                onClick={onGoHome}
                id="btn-pagook-return-home"
                className="text-pink-400 hover:text-pink-300 font-semibold underline underline-offset-4 cursor-pointer hover:scale-105 transition-transform"
              >
                ← Volver al sitio principal
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer info */}
      <footer className="max-w-2xl mx-auto w-full text-center z-10 mt-6 text-xs text-slate-500">
        <p>Mega Recreación Medellín & Valle de Aburrá • Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

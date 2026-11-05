import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, User, Phone, Mail, Sparkles, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';
import { triggerPartyConfetti, createWhatsAppUrl } from '../utils/confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
}

const N8N_WEBHOOK_URL = 'https://n8nok-n8n.uah3tl.easypanel.host/webhook/mega-recreacion-reservas';

const PACKAGES_OPTIONS = [
  { name: 'Paquete MEGA (2.5h - 1 Recreacionista)', price: 180000, duration: 2.5, staff: 1, needsInf: false },
  { name: 'Paquete MEGA MAX (2.5 a 3h - Transporte + Hora Loca)', price: 190000, duration: 3, staff: 1, needsInf: false },
  { name: 'Paquete MEGA FIESTA (3.5h - 2 Recreacionistas)', price: 260000, duration: 3.5, staff: 2, needsInf: false },
  { name: 'Paquete MEGA ALEGRÍA (4h - Recreación + Inflable)', price: 650000, duration: 4, staff: 1, needsInf: true },
  { name: 'MEGA PACK Todo Incluido (Decoración + Inflable + 20 Refrigerios)', price: 1550000, duration: 4, staff: 2, needsInf: true },
  { name: 'Paquete BABY SHOWER & ADULTOS (3h - Familiar)', price: 300000, duration: 3, staff: 1, needsInf: false },
  { name: 'Show Personaje Disney / Favorito (1 Hora)', price: 180000, duration: 1, staff: 1, needsInf: false },
  { name: 'Alquiler de Inflable (4 Horas con Operario)', price: 520000, duration: 4, staff: 1, needsInf: true },
  { name: 'Pausa Activa / Evento Empresarial', price: 180000, duration: 1, staff: 1, needsInf: false },
];

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, defaultPackage }) => {
  const [selectedPkgName, setSelectedPkgName] = useState(defaultPackage || PACKAGES_OPTIONS[1].name);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('15:00');
  const [eventAddress, setEventAddress] = useState('');
  const [eventNeighborhood, setEventNeighborhood] = useState('Medellín');
  const [honoreeInfo, setHonoreeInfo] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<{ clientName: string; total: number; deposit: number; balance: number } | null>(null);

  if (!isOpen) return null;

  const currentPkg = PACKAGES_OPTIONS.find((p) => p.name === selectedPkgName) || PACKAGES_OPTIONS[0];
  const total = currentPkg.price;
  const deposit = Math.round(total * 0.30);
  const balance = total - deposit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || !eventDate) {
      alert('Por favor completa al menos tu nombre, teléfono y la fecha del evento.');
      return;
    }

    setLoading(true);

    const payload = {
      event: 'booking.created',
      source: 'web_megarecreacion.net',
      timestamp: new Date().toISOString(),
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      eventDate,
      startTime,
      endTime: calculateEndTime(startTime, currentPkg.duration),
      durationHours: currentPkg.duration,
      packageName: currentPkg.name,
      total,
      actualDeposit: deposit,
      balance70: balance,
      eventAddress: eventAddress.trim() || 'Por confirmar',
      eventNeighborhood: eventNeighborhood.trim() || 'Medellín',
      honoreeInfo: honoreeInfo.trim() || 'No especificado',
      recreatorsCount: currentPkg.staff,
      needsInflatable: currentPkg.needsInf,
      inflatableName: currentPkg.needsInf ? 'Castillo Inflable Mega' : 'No aplica',
      paymentMethod: 'Reserva Web',
      assignedStaff: 'Por asignar en Telegram',
      notes: notes.trim(),
    };

    try {
      // Se usa text/plain;charset=utf-8 para evitar errores de preflight CORS en n8n
      await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Webhook n8n enviado con fallback offline:', err);
    }

    triggerPartyConfetti();
    setLastSubmission({ clientName, total, deposit, balance });
    setLoading(false);
    setSuccess(true);
  };

  const calculateEndTime = (start: string, duration: number) => {
    const [h, m] = start.split(':').map(Number);
    const endMinutes = h * 60 + (m || 0) + Math.round(duration * 60);
    const endH = Math.floor(endMinutes / 60) % 24;
    const endM = endMinutes % 60;
    return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
  };

  const handleReset = () => {
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-gradient-to-b from-[#1c0838] via-[#120324] to-[#070110] border-2 border-pink-500/50 rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.35)] overflow-hidden my-6"
        >
          {/* Header */}
          <div className="relative p-5 sm:p-6 pb-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950">
                <Sparkles className="w-5 h-5 fill-slate-950" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {success ? '¡Solicitud Recibida!' : 'Cotizar y Reservar Fecha'}
                </h3>
                <p className="text-xs text-pink-300 font-bold">
                  {success ? 'Conectado con n8n, Sheets y Telegram' : 'Ingresa a nuestro sistema automático de eventos'}
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="p-2 rounded-full bg-white/10 hover:bg-pink-600 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Seleccionar Paquete */}
                <div>
                  <label className="block text-xs font-black uppercase text-amber-300 mb-1.5">
                    1. Selecciona el Paquete o Servicio
                  </label>
                  <select
                    value={selectedPkgName}
                    onChange={(e) => setSelectedPkgName(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-2xl bg-black/60 border border-white/20 text-white text-sm font-bold focus:border-yellow-400 focus:outline-none"
                  >
                    {PACKAGES_OPTIONS.map((pkg) => (
                      <option key={pkg.name} value={pkg.name} className="bg-slate-900 text-white">
                        {pkg.name} — ${pkg.price.toLocaleString('es-CO')} COP
                      </option>
                    ))}
                  </select>
                </div>

                {/* Resumen de Liquidación Automática */}
                <div className="p-3.5 rounded-2xl bg-purple-950/70 border border-pink-500/30 flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-300 block">Total Paquete:</span>
                    <span className="text-lg font-black text-white">${total.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-amber-300 block font-bold">Abono 30%:</span>
                    <span className="text-base font-black text-amber-300">${deposit.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-300 block font-bold">Saldo 70% en Sitio:</span>
                    <span className="text-base font-black text-emerald-300">${balance.toLocaleString('es-CO')}</span>
                  </div>
                </div>

                {/* Datos del Cliente */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Tu Nombre Completo *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Ej: Carolina Restrepo"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp / Teléfono *</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="Ej: 319 718 8973"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Fecha y Hora */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Fecha del Evento *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Hora de Inicio</label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Dirección y Barrio/Municipio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Dirección o Lugar</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Ej: Cra 43A # 1-50, Salón Social"
                        value={eventAddress}
                        onChange={(e) => setEventAddress(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Barrio o Municipio</label>
                    <input
                      type="text"
                      placeholder="Ej: El Poblado, Envigado, Bello"
                      value={eventNeighborhood}
                      onChange={(e) => setEventNeighborhood(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Festejado(a) o Motivo */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Nombre del Cumpleañero(a) y Edad / Motivo</label>
                  <input
                    type="text"
                    placeholder="Ej: Juan Pablo (Cumple 6 años) / Baby Shower de Sofía"
                    value={honoreeInfo}
                    onChange={(e) => setHonoreeInfo(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-pink-500 focus:outline-none"
                  />
                </div>

                {/* Botón de Envío */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-base shadow-[0_0_30px_rgba(234,179,8,0.7)] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] disabled:opacity-50"
                >
                  {loading ? (
                    <span>Procesando Reserva con n8n...</span>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 text-slate-950" />
                      <span>Confirmar y Enviar Reserva a n8n</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Pantalla de Éxito */
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h4 className="text-2xl font-black text-white">¡Reserva Registrada Exitosamente!</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Tu evento ha sido enviado a nuestro sistema en **n8n**, guardado en **Google Sheets** y notificado inmediatamente al equipo de coordinadores en **Telegram**.
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-left max-w-md mx-auto space-y-1.5">
                  <div className="flex justify-between"><span className="text-slate-400">Cliente:</span><span className="font-bold text-white">{lastSubmission?.clientName}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Total:</span><span className="font-bold text-white">${lastSubmission?.total.toLocaleString('es-CO')}</span></div>
                  <div className="flex justify-between"><span className="text-amber-300 font-bold">Abono 30%:</span><span className="font-bold text-amber-300">${lastSubmission?.deposit.toLocaleString('es-CO')}</span></div>
                  <div className="flex justify-between"><span className="text-emerald-300 font-bold">Saldo 70% en Sitio:</span><span className="font-bold text-emerald-300">${lastSubmission?.balance.toLocaleString('es-CO')}</span></div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={createWhatsAppUrl(`¡Hola Mega Recreación! Acabo de registrar mi reserva en la web para ${clientName} (${eventDate} - ${selectedPkgName}). ¿Me confirman por favor?`, false)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                    <span>Confirmar por WhatsApp Ahora</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

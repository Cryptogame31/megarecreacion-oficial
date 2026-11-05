import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, User, Phone, Mail, Sparkles, CheckCircle2, MessageCircle, CreditCard, ShieldCheck, PartyPopper, Check, Gift } from 'lucide-react';
import { triggerPartyConfetti, createWhatsAppUrl } from '../utils/confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
}

const N8N_WEBHOOK_URL = 'https://n8nok-n8n.uah3tl.easypanel.host/webhook/mega-recreacion-reservas';
const WOMPI_CHECKOUT_URL = 'https://checkout.wompi.co/l/VPOS_acmaNg';

interface PackageOption {
  id: string;
  name: string;
  shortName: string;
  price: number;
  duration: number;
  staff: number;
  needsInf: boolean;
  category: 'principal' | 'adicional';
  tag?: string;
}

const PACKAGES_OPTIONS: PackageOption[] = [
  { id: 'pkg-mega', name: 'Paquete MEGA (2.5h - Pintacaritas, Payaso y Magia)', shortName: 'Paquete MEGA', price: 180000, duration: 2.5, staff: 1, needsInf: false, category: 'principal' },
  { id: 'pkg-megamax', name: 'Paquete MEGA MAX (2.5 a 3h - Transporte Incluido + Hora Loca)', shortName: 'Paquete MEGA MAX', price: 190000, duration: 3, staff: 1, needsInf: false, category: 'principal', tag: '¡Más Pedido! 🔥' },
  { id: 'pkg-megafiesta', name: 'Paquete MEGA FIESTA (3.5h - 2 Recreacionistas, Títeres y Magia)', shortName: 'Paquete MEGA FIESTA', price: 260000, duration: 3.5, staff: 2, needsInf: false, category: 'principal' },
  { id: 'pkg-megaalegria', name: 'Paquete MEGA ALEGRÍA (4h - Recreación + Castillo Inflable)', shortName: 'Paquete MEGA ALEGRÍA', price: 650000, duration: 4, staff: 1, needsInf: true, category: 'principal', tag: 'Combo Inflable 🏰' },
  { id: 'pkg-megapack', name: 'MEGA PACK VIP Todo Incluido (Decoración + Inflable + 20 Refrigerios)', shortName: 'MEGA PACK Todo Incluido', price: 1550000, duration: 4, staff: 2, needsInf: true, category: 'principal', tag: 'Cero Estrés 👑' },
  { id: 'pkg-babyshower', name: 'Paquete BABY SHOWER & ADULTOS (3h - Juegos Modernos + Transporte)', shortName: 'Baby Shower / Adultos', price: 300000, duration: 3, staff: 1, needsInf: false, category: 'principal' },
  { id: 'pkg-empresarial', name: 'Pausa Activa & Evento Empresarial (1h Recreacionista)', shortName: 'Evento Empresarial', price: 180000, duration: 1, staff: 1, needsInf: false, category: 'principal' },
  // Servicios Adicionales o Combinables
  { id: 'add-personaje-1h', name: 'Show Personaje Disney / Favorito Completo (1 Hora)', shortName: 'Personaje Disney (1h)', price: 180000, duration: 1, staff: 1, needsInf: false, category: 'adicional', tag: 'Show Musical ⭐' },
  { id: 'add-personaje-30m', name: 'Personaje Disney Promo (1/2 Hora adicional a tu paquete)', shortName: 'Personaje Disney (1/2h)', price: 80000, duration: 0.5, staff: 1, needsInf: false, category: 'adicional', tag: 'Promo +$80k ✨' },
  { id: 'add-inflable', name: 'Alquiler Castillo Inflable (4 Horas con Operario + Transporte)', shortName: 'Castillo Inflable (4h)', price: 520000, duration: 4, staff: 1, needsInf: true, category: 'adicional' },
  { id: 'add-decoracion', name: 'Decoración Temática Personalizada con Globos y Backing', shortName: 'Decoración Temática', price: 480000, duration: 0, staff: 1, needsInf: false, category: 'adicional' },
  { id: 'add-horaloca', name: 'Adicional Hora Loca o Globoflexia Especial', shortName: 'Hora Loca / Globoflexia', price: 30000, duration: 0.5, staff: 0, needsInf: false, category: 'adicional' },
  { id: 'add-sonido', name: 'Alquiler Bafle Profesional 6" USB con Música', shortName: 'Bafle de Sonido', price: 45000, duration: 0, staff: 0, needsInf: false, category: 'adicional' },
];

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['pkg-megamax']);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('15:00');
  const [eventAddress, setEventAddress] = useState('');
  const [eventNeighborhood, setEventNeighborhood] = useState('Medellín');
  const [honoreeInfo, setHonoreeInfo] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<{
    clientName: string;
    packagesSummary: string;
    total: number;
    deposit: number;
    balance: number;
  } | null>(null);

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Al menos 1 seleccionado
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const selectedItems = PACKAGES_OPTIONS.filter((p) => selectedIds.includes(p.id));
  const total = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const deposit = Math.round(total * 0.30);
  const balance = total - deposit;
  const maxDuration = Math.max(...selectedItems.map((i) => i.duration), 2.5);
  const totalStaff = Math.max(...selectedItems.map((i) => i.staff), 1);
  const needsInf = selectedItems.some((i) => i.needsInf);
  const packagesSummary = selectedItems.map((i) => i.shortName).join(' + ');

  const calculateEndTime = (start: string, duration: number) => {
    const [h, m] = start.split(':').map(Number);
    const endMinutes = h * 60 + (m || 0) + Math.round(duration * 60);
    const endH = Math.floor(endMinutes / 60) % 24;
    const endM = endMinutes % 60;
    return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || !clientEmail.trim() || !eventDate) {
      alert('Por favor completa tu nombre, WhatsApp, correo electrónico y la fecha mágica de tu celebración.');
      return;
    }

    setLoading(true);

    const primaryPkg = selectedItems[0] || PACKAGES_OPTIONS[1];
    const extraAddons = selectedItems.slice(1).map((item) => ({
      name: item.shortName,
      price: item.price,
    }));

    const payload = {
      event: 'booking.created',
      source: 'web_megarecreacion.net',
      timestamp: new Date().toISOString(),
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      eventDate,
      startTime,
      endTime: calculateEndTime(startTime, maxDuration),
      durationHours: maxDuration,
      packageName: packagesSummary,
      selectedServices: selectedItems.map((i) => ({ id: i.id, name: i.name, price: i.price })),
      addons: extraAddons,
      total,
      actualDeposit: deposit,
      balance70: balance,
      eventAddress: eventAddress.trim() || 'Por confirmar',
      eventNeighborhood: eventNeighborhood.trim() || 'Medellín',
      honoreeInfo: honoreeInfo.trim() || 'Celebración Especial',
      recreatorsCount: totalStaff,
      needsInflatable: needsInf,
      inflatableName: needsInf ? 'Castillo Inflable Mega' : 'No aplica',
      paymentMethod: 'Pre-Reserva Web (Pendiente Abono 30%)',
      assignedStaff: 'Por asignar por Coordinador',
    };

    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Pre-reserva registrada:', err);
    }

    triggerPartyConfetti();
    setLastSubmission({ clientName, packagesSummary, total, deposit, balance });
    setLoading(false);
    setSuccess(true);
  };

  const handleReset = () => {
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#1e083a] via-[#130426] to-[#080112] border-2 border-pink-500/60 rounded-3xl shadow-[0_0_60px_rgba(236,72,153,0.45)] overflow-hidden my-4"
        >
          {/* Header Dopamínico */}
          <div className="relative p-5 sm:p-6 pb-4 border-b border-white/15 flex items-center justify-between bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 text-slate-950 shadow-lg">
                <PartyPopper className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                  {success ? '🎉 ¡Tu Pre-Reserva Mágica Está Lista!' : '✨ ¡Diseña la Fiesta de tus Sueños!'}
                </h3>
                <p className="text-xs sm:text-sm text-amber-300 font-bold">
                  {success
                    ? 'Asegura tu cupo VIP hoy mismo y prepárate para celebrar en grande'
                    : 'Puedes elegir 1, 2 o todos los servicios que quieras combinar'}
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
          <div className="p-5 sm:p-6 max-h-[78vh] overflow-y-auto space-y-5">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Selector Múltiple de Servicios */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs sm:text-sm font-black uppercase text-yellow-300 flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-pink-400" />
                      1. Elige tus Paquetes y Adicionales (Toca para sumar 1 o más):
                    </label>
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-pink-500/25 border border-pink-400/50 text-pink-200">
                      {selectedItems.length} seleccionado{selectedItems.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                    {PACKAGES_OPTIONS.map((pkg) => {
                      const isSelected = selectedIds.includes(pkg.id);
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => toggleService(pkg.id)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-2.5 select-none ${
                            isSelected
                              ? 'bg-gradient-to-r from-pink-600/35 to-purple-700/35 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]'
                              : 'bg-black/45 border-white/15 hover:border-pink-400/50'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                              isSelected
                                ? 'bg-yellow-400 border-white text-slate-950'
                                : 'bg-white/5 border-white/30 text-transparent'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-black text-white truncate">{pkg.shortName}</span>
                              {pkg.tag && (
                                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 shrink-0">
                                  {pkg.tag}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">{pkg.name}</p>
                            <span className="text-xs font-black text-yellow-300 mt-1 block">
                              ${pkg.price.toLocaleString('es-CO')} COP
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Resumen Dopamínico de Inversión (30% / 70%) */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-purple-950/90 border-2 border-yellow-400/50 shadow-lg space-y-2">
                  <div className="text-xs font-extrabold text-pink-300 truncate">
                    🎈 Tu Combo Mágico: <span className="text-white">{packagesSummary}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-center">
                    <div>
                      <span className="text-[11px] text-slate-300 block">Valor Total Fiesta</span>
                      <span className="text-base sm:text-lg font-black text-white">${total.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="bg-yellow-400/15 rounded-xl py-1 border border-yellow-400/40">
                      <span className="text-[11px] text-yellow-300 block font-extrabold">Congela con 30%</span>
                      <span className="text-base sm:text-lg font-black text-yellow-300">${deposit.toLocaleString('es-CO')}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-emerald-300 block font-bold">70% el Día del Show</span>
                      <span className="text-base sm:text-lg font-black text-emerald-300">${balance.toLocaleString('es-CO')}</span>
                    </div>
                  </div>
                </div>

                {/* Datos del Cliente (Incluyendo Correo para el Funnel de 7 Emails) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">Tu Nombre *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-pink-400" />
                      <input
                        type="text"
                        required
                        placeholder="Ej: Carolina Restrepo"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">Tu WhatsApp *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-emerald-400" />
                      <input
                        type="tel"
                        required
                        placeholder="Ej: 319 718 8973"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">Tu Correo (Para enviar Propuesta) *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-cyan-400" />
                      <input
                        type="email"
                        required
                        placeholder="tucorreo@gmail.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Fecha, Hora, Lugar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">Fecha de la Fiesta *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-yellow-400" />
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">Hora de Inicio</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-4 h-4 text-pink-400" />
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">Barrio / Municipio</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-amber-400" />
                      <input
                        type="text"
                        placeholder="Ej: Poblado, Envigado, Bello"
                        value={eventNeighborhood}
                        onChange={(e) => setEventNeighborhood(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Dirección y Homenajeado */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">Dirección o Salón Social</label>
                    <input
                      type="text"
                      placeholder="Ej: Unidad Residencial / Salón de Eventos"
                      value={eventAddress}
                      onChange={(e) => setEventAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-yellow-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">Nombre del Festejado(a) y Edad</label>
                    <input
                      type="text"
                      placeholder="Ej: Matías (Cumple 5 años)"
                      value={honoreeInfo}
                      onChange={(e) => setHonoreeInfo(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-black/50 border border-white/20 text-white text-sm focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Botón Dopamínico de Envío */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg shadow-[0_0_35px_rgba(234,179,8,0.75)] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] disabled:opacity-50"
                >
                  {loading ? (
                    <span>✨ Preparando la Magia de tu Celebración...</span>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 fill-slate-950 text-slate-950" />
                      <span>🎉 ¡Activar mi Pre-Reserva VIP y Recibir Propuesta!</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* ========================================================================= */
              /* PANTALLA DOPAMÍNICA DE PRE-RESERVA E INSTRUCCIONES DE CONFIRMACIÓN        */
              /* ========================================================================= */
              <div className="py-3 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 mx-auto flex items-center justify-center text-slate-950 shadow-[0_0_35px_rgba(250,204,21,0.7)]">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div className="space-y-2">
                  <span className="px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-wider">
                    ⏳ Estado: Pre-Reserva Activa — Cupo Bloqueado Temporalmente
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black text-white">
                    ¡Felicidades, {lastSubmission?.clientName}! 🥳
                  </h4>
                  <p className="text-sm text-slate-200 max-w-lg mx-auto leading-relaxed">
                    Ya enviamos los detalles mágicos a tu correo <strong className="text-yellow-300">{clientEmail}</strong>. Un **Asesor de Experiencias de Mega Recreación** se comunicará contigo muy pronto para validar todos los detalles de tu fiesta.
                  </p>
                </div>

                {/* Resumen y Regla de Oro de Reserva */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-pink-500/40 text-left space-y-3">
                  <div className="text-xs font-black uppercase text-pink-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    Instrucciones para Garantizar y Congelar tu Fecha al 100%:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Recuerda que tu solicitud se encuentra como <strong>Pre-Reserva</strong>. Para bloquear definitivamente a tus recreacionistas, personajes o inflables en nuestra agenda oficial, realiza el <strong>abono del 30% (${lastSubmission?.deposit.toLocaleString('es-CO')} COP)</strong> por nuestra pasarela segura Wompi o coordínalo directo con nuestro asesor en WhatsApp:
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
                    <div className="p-2 rounded-xl bg-black/40">
                      <span className="text-slate-400 block">Total Combo</span>
                      <span className="font-black text-white text-sm">${lastSubmission?.total.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-yellow-400/20 border border-yellow-400/50">
                      <span className="text-yellow-300 block font-bold">Abono 30% Hoy</span>
                      <span className="font-black text-yellow-300 text-sm">${lastSubmission?.deposit.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                      <span className="text-emerald-300 block font-bold">70% en tu Fiesta</span>
                      <span className="font-black text-emerald-300 text-sm">${lastSubmission?.balance.toLocaleString('es-CO')}</span>
                    </div>
                  </div>
                </div>

                {/* Botones de Acción: Wompi 30% o WhatsApp Asesor */}
                <div className="space-y-3 pt-1">
                  <a
                    href={WOMPI_CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(234,179,8,0.75)] transition-transform hover:scale-[1.02]"
                  >
                    <CreditCard className="w-5 h-5 text-slate-950 shrink-0" />
                    <span>💳 Pagar Abono del 30% (${lastSubmission?.deposit.toLocaleString('es-CO')}) en Línea con Wompi</span>
                  </a>

                  <a
                    href={createWhatsAppUrl(
                      `¡Hola Mega Recreación! 🎉 Acabo de hacer mi Pre-Reserva en la web:\n\n• Nombre: ${lastSubmission?.clientName}\n• Fecha: ${eventDate} (${startTime})\n• Servicios: ${lastSubmission?.packagesSummary}\n• Total: $${lastSubmission?.total.toLocaleString('es-CO')}\n• Abono 30%: $${lastSubmission?.deposit.toLocaleString('es-CO')}\n\nQuiero validar los detalles con un asesor y confirmar mi fecha.`,
                      false
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-transform hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-5 h-5 fill-white shrink-0" />
                    <span>📲 Hablar con un Asesor por WhatsApp para Validar Detalles</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="text-xs text-slate-400 hover:text-white underline pt-1 cursor-pointer"
                  >
                    Volver a la página principal
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

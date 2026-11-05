import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  ArrowLeft, 
  MessageCircle, 
  Star, 
  PartyPopper,
  Info,
  Gift,
  Heart,
  ChevronRight,
  ExternalLink,
  Flame,
  Check,
  Search,
  HelpCircle,
  Building2,
  Zap
} from 'lucide-react';
import { 
  LOGO_URL, 
  LOGO_FALLBACK_URL, 
  DISPLAY_PHONE, 
  DISPLAY_PHONE_2, 
  MUNICIPALITIES 
} from '../data/mockData';
import { createWhatsAppUrl, triggerPartyConfetti } from '../utils/confetti';

interface BookingCharacter {
  id: string;
  name: string;
  tagline: string;
  category: string;
  categoryKey: 'infantiles' | 'disney' | 'superheroes' | 'videojuegos' | 'paw-patrol' | 'granja' | 'temporada' | 'custom';
  imageUrl: string;
  fallbackUrl: string;
  popular: boolean;
  color: string;
  price: string;
  features: string[];
}

const BOOKING_CHARACTERS: BookingCharacter[] = [
  // 🐷 INFANTILES
  {
    id: 'peppa-pig',
    name: 'Peppa Pig',
    tagline: 'Ternura, juegos y rondas para los más chiquitos',
    category: '🐷 Infantiles',
    categoryKey: 'infantiles',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_peppa_pig_nina_torta_4anos.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: true,
    color: '#ec4899',
    price: '$180.000 COP',
    features: ['Especial 1 a 4 años', 'Ronda de Peppa', 'Fotos ilimitadas', 'Momento de torta'],
  },
  {
    id: 'plim-plim',
    name: 'Plim Plim',
    tagline: 'Héroe del corazón con valores, canciones y magia',
    category: '🐷 Infantiles',
    categoryKey: 'infantiles',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/fiesta_infantil_plim_plim_ninas_circo.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: true,
    color: '#ef4444',
    price: '$180.000 COP',
    features: ['Canciones de Plim Plim', 'Dinámicas de valores', 'Abrazo cariñoso', 'Fotos con la torta'],
  },
  {
    id: 'tasha',
    name: 'Tasha (Backyardigans)',
    tagline: 'Aventuras musicales llenas de ritmo e imaginación',
    category: '🐷 Infantiles',
    categoryKey: 'infantiles',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/catalogo_grupal_personajes_sarahy_celebraciones.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: false,
    color: '#f59e0b',
    price: '$180.000 COP',
    features: ['Bailes infantiles', 'Rondas de jardín', 'Fotos con invitados', 'Piñata'],
  },
  {
    id: 'muneca-lol',
    name: 'Muñeca LOL Surprise',
    tagline: 'Moda, brillo, sorpresas y coreografías divertidas',
    category: '🐷 Infantiles',
    categoryKey: 'infantiles',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/delivery_lol_surprise_desayuno_feliz_cumple.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: true,
    color: '#ec4899',
    price: '$180.000 COP',
    features: ['Desfile de cumpleaños', 'Globos y sorpresas', 'Música pop infantil', 'Fotos de ensueño'],
  },
  {
    id: 'unicornio',
    name: 'Unicornio Mágico',
    tagline: 'Magia de arcoíris, dulzura y momentos inolvidables',
    category: '🐷 Infantiles',
    categoryKey: 'infantiles',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_unicornio_nina_globo_feliz_cumple_01.jpeg',
    fallbackUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_elsa_frozen_nina_cumpleanera_emmy.jpeg',
    popular: true,
    color: '#a855f7',
    price: '$180.000 COP',
    features: ['Fiestas de niñas', 'Globos y magia', 'Música de cuentos', 'Recuerdos inolvidables'],
  },

  // 🏰 DISNEY Y CUENTOS
  {
    id: 'mickey',
    name: 'Mickey Mouse',
    tagline: 'El ícono mundial de Disney con su traje de gala',
    category: '🏰 Disney y Cuentos',
    categoryKey: 'disney',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/catalogo_grupal_personajes_sarahy_celebraciones.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: true,
    color: '#e11d48',
    price: '$180.000 COP',
    features: ['Animación de torta', 'Baile interactivo', 'Fotos ilimitadas', 'Música temática'],
  },
  {
    id: 'minnie',
    name: 'Minnie Mouse',
    tagline: 'Ternura, lazo gigante y vestidos de ensueño',
    category: '🏰 Disney y Cuentos',
    categoryKey: 'disney',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_minnie_bebe_1ano_torta_mesa_roja.jpeg',
    fallbackUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/fiesta_nocturna_woody_mario_minnie_chicas_01.jpeg',
    popular: true,
    color: '#ec4899',
    price: '$180.000 COP',
    features: ['Especial para 1 a 5 añitos', 'Ronda infantil', 'Momento de la piñata', 'Abrazo cariñoso'],
  },
  {
    id: 'mickey-bebe',
    name: 'Mickey Bebé',
    tagline: 'Versión tierna especial para bautizos y primeros añitos',
    category: '🏰 Disney y Cuentos',
    categoryKey: 'disney',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/catalogo_grupal_personajes_sarahy_celebraciones.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: false,
    color: '#3b82f6',
    price: '$180.000 COP',
    features: ['Primer añito', 'Canciones de cuna y bebés', 'Sesión fotográfica', 'Ternura'],
  },
  {
    id: 'minnie-bebe',
    name: 'Minnie Bebé',
    tagline: 'Dulzura absoluta para la celebración de 1 a 2 años',
    category: '🏰 Disney y Cuentos',
    categoryKey: 'disney',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_minnie_bebe_1ano_torta_mesa_roja.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: false,
    color: '#f43f5e',
    price: '$180.000 COP',
    features: ['Primer y segundo añito', 'Rondas suaves', 'Fotos con la familia', 'Acompañamiento'],
  },
  {
    id: 'woody',
    name: 'Woody (Toy Story)',
    tagline: '¡Hay una serpiente en mi bota! Amistad y aventuras',
    category: '🏰 Disney y Cuentos',
    categoryKey: 'disney',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_woody_toystory_ninos_torta_decoracion.jpeg',
    fallbackUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/fiesta_nocturna_woody_mario_minnie_chicas_01.jpeg',
    popular: true,
    color: '#f59e0b',
    price: '$180.000 COP',
    features: ['Música Yo Soy Tu Amigo Fiel', 'Dinámicas del vaquero', 'Canto de torta', 'Fotos'],
  },
  {
    id: 'blanca-nieves',
    name: 'Blanca Nieves',
    tagline: 'Cuento de hadas clásico con vestido de princesa real',
    category: '🏰 Disney y Cuentos',
    categoryKey: 'disney',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/catalogo_grupal_personajes_sarahy_celebraciones.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: false,
    color: '#eab308',
    price: '$180.000 COP',
    features: ['Canciones de princesas', 'Coronación o vals', 'Fotos mágicas', 'Ronda'],
  },
  {
    id: 'el-sombrerero',
    name: 'El Sombrerero Loco',
    tagline: 'Magia, locura sana y fiesta de no cumpleaños',
    category: '🏰 Disney y Cuentos',
    categoryKey: 'disney',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/catalogo_grupal_personajes_sarahy_celebraciones.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: false,
    color: '#10b981',
    price: '$180.000 COP',
    features: ['Teatralidad divertida', 'Juegos de ingenio', 'Animación de torta', 'Fotos'],
  },
  {
    id: 'morgana',
    name: 'Morgana / Hechicera',
    tagline: 'Fantasía, misterio teatral y animación temática',
    category: '🏰 Disney y Cuentos',
    categoryKey: 'disney',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/disfraz_wednesday_addams_animadora_pose.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: false,
    color: '#8b5cf6',
    price: '$180.000 COP',
    features: ['Hechizos divertidos', 'Música de fantasía', 'Dinámicas en grupo', 'Fotos'],
  },

  // 🦸‍♀️ SUPERHÉROES
  {
    id: 'spiderman',
    name: 'Spiderman (Hombre Araña)',
    tagline: 'Acrobacias, poses arácnidas y acción total',
    category: '🦸‍♀️ Superhéroes',
    categoryKey: 'superheroes',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_spiderman_nino_6anos_decoracion.jpeg',
    fallbackUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/foto_grupal_equipo_megarecreacion_payasos_spiderman.jpeg',
    popular: true,
    color: '#ef4444',
    price: '$180.000 COP',
    features: ['Entrenamiento arácnido', 'Poses de superhéroe', 'Animación de piñata', 'Fotos épicas'],
  },
  {
    id: 'mujer-maravilla',
    name: 'Mujer Maravilla',
    tagline: 'Poder, liderazgo y animación de acción para todos',
    category: '🦸‍♀️ Superhéroes',
    categoryKey: 'superheroes',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_wonder_woman_animadora_nina_cargando_01.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: true,
    color: '#dc2626',
    price: '$180.000 COP',
    features: ['Misión de superhéroes', 'Lazo de la verdad', 'Baile dinámico', 'Fotos'],
  },
  {
    id: 'batman',
    name: 'Batman (Caballero de la Noche)',
    tagline: 'El protector de Ciudad Gótica llega a tu fiesta',
    category: '🦸‍♀️ Superhéroes',
    categoryKey: 'superheroes',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/foto_grupal_equipo_megarecreacion_payasos_spiderman.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: false,
    color: '#475569',
    price: '$180.000 COP',
    features: ['Entrada triunfal', 'Música de acción', 'Fotos con batiposes', 'Torta'],
  },

  // 🎮 VIDEOJUEGOS
  {
    id: 'mario',
    name: 'Mario Bros',
    tagline: '¡El fontanero más querido de los videojuegos!',
    category: '🎮 Videojuegos',
    categoryKey: 'videojuegos',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/delivery_mario_bros_desayuno_es_mi_cumple.jpeg',
    fallbackUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/fiesta_nocturna_woody_mario_minnie_chicas_01.jpeg',
    popular: true,
    color: '#ef4444',
    price: '$180.000 COP',
    features: ['Entrega de sorpresas', 'Divertidas dinámicas', 'Canciones de Mario', 'Sesión de fotos'],
  },
  {
    id: 'sonic',
    name: 'Sonic 💙⚡',
    tagline: '¡Velocidad supersónica, música y diversión extrema!',
    category: '🎮 Videojuegos',
    categoryKey: 'videojuegos',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/catalogo_grupal_personajes_sarahy_celebraciones.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: true,
    color: '#2563eb',
    price: '$180.000 COP',
    features: ['Carreras divertidas', 'Música de Sonic', 'Poses de velocidad', 'Fotos'],
  },

  // 🐾 PAW PATROL
  {
    id: 'chase',
    name: 'Chase (Paw Patrol)',
    tagline: '¡La patrulla canina lista para salvar el día!',
    category: '🐾 Paw Patrol',
    categoryKey: 'paw-patrol',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/delivery_chase_desayuno_sorpresa_feliz_dia.jpeg',
    fallbackUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/evento_escolar_chase_ninos_regalos_colegio.jpeg',
    popular: true,
    color: '#1d4ed8',
    price: '$180.000 COP',
    features: ['Misión de rescate', 'Canciones de Paw Patrol', 'Acompañamiento en torta', 'Fotos'],
  },
  {
    id: 'skye',
    name: 'Skye (Paw Patrol)',
    tagline: '¡Este cachorro vuela alto con piruetas y alegría!',
    category: '🐾 Paw Patrol',
    categoryKey: 'paw-patrol',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/evento_escolar_chase_ninos_regalos_colegio.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: true,
    color: '#f43f5e',
    price: '$180.000 COP',
    features: ['Bailes aéreos', 'Rondas de cachorros', 'Fotos con los niños', 'Piñata'],
  },

  // 🐮 GRANJA Y ANIMALES
  {
    id: 'vaca',
    name: 'La Vaca (Granja)',
    tagline: 'Canciones campestres y bailes para la primera infancia',
    category: '🐮 Granja y Animales',
    categoryKey: 'granja',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/catalogo_grupal_personajes_sarahy_celebraciones.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: false,
    color: '#16a34a',
    price: '$180.000 COP',
    features: ['Canción de la vaca', 'Bailes interactivos', 'Fotos familiares', 'Torta'],
  },
  {
    id: 'animales-granja',
    name: 'Animales de Granja',
    tagline: 'Caballito, cerdito y amigos del corral en tu fiesta',
    category: '🐮 Granja y Animales',
    categoryKey: 'granja',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/catalogo_grupal_personajes_sarahy_celebraciones.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: false,
    color: '#65a30d',
    price: '$180.000 COP',
    features: ['Rondas campestres', 'Sonidos de animalitos', 'Juegos infantiles', 'Fotos'],
  },
  {
    id: 'otros-animales',
    name: 'Otros Personajes de Animales',
    tagline: 'Mascotas, fauna y caracterizaciones especiales',
    category: '🐮 Granja y Animales',
    categoryKey: 'granja',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/catalogo_grupal_personajes_sarahy_celebraciones.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: false,
    color: '#0d9488',
    price: '$180.000 COP',
    features: ['Disfraz temático', 'Animación dinámica', 'Fotos ilimitadas', 'Canto de cumpleaños'],
  },

  // 🎅 TEMPORADA
  {
    id: 'papanoel',
    name: 'Santa Claus / Papá Noel',
    tagline: 'La magia de la Navidad con traje aterciopelado',
    category: '🎅 Temporada',
    categoryKey: 'temporada',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/navidad_papa_noel_familia_merry_christmas.jpeg',
    fallbackUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/flyer_papa_noel_navidad_megarecreacion_contacto.jpeg',
    popular: true,
    color: '#dc2626',
    price: '$180.000 COP',
    features: ['Entrega de regalos', 'Novenas familiares', 'Traje real aterciopelado', 'Fotos navideñas'],
  },

  // ✨ OTRO PERSONAJE PERSONALIZADO
  {
    id: 'otro-personaje',
    name: '✨ Otro Personaje Especial',
    tagline: '¿Buscas otro personaje? ¡Escríbenos cuál necesitas y te lo confirmamos!',
    category: '✨ Personalizado',
    categoryKey: 'custom',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/catalogo_grupal_personajes_sarahy_celebraciones.jpeg',
    fallbackUrl: LOGO_FALLBACK_URL,
    popular: true,
    color: '#eab308',
    price: '$180.000 COP',
    features: ['Consulta personalizada', 'Atención directa por WhatsApp', 'Confirmación inmediata', 'Fotos y show'],
  },
];

const CATEGORY_TABS = [
  { key: 'all', label: 'Todos', emoji: '✨' },
  { key: 'infantiles', label: 'Infantiles', emoji: '🐷' },
  { key: 'disney', label: 'Disney & Cuentos', emoji: '🏰' },
  { key: 'superheroes', label: 'Superhéroes', emoji: '🦸‍♀️' },
  { key: 'videojuegos', label: 'Videojuegos', emoji: '🎮' },
  { key: 'paw-patrol', label: 'Paw Patrol', emoji: '🐾' },
  { key: 'granja', label: 'Granja & Animales', emoji: '🐮' },
  { key: 'temporada', label: 'Temporada', emoji: '🎅' },
];

const TIME_SLOTS = [
  { id: 'morning-1', label: 'Mañana Temprano (6:30 AM - 8:30 AM)', tag: 'Ideal Desayunos Sorpresa ⭐' },
  { id: 'morning-2', label: 'Mañana (9:00 AM - 11:00 AM)', tag: 'Desayunos & Jardines' },
  { id: 'morning-3', label: 'Mediodía (11:30 AM - 1:30 PM)', tag: 'Almuerzos & Jardines' },
  { id: 'afternoon-1', label: 'Tarde Temprano (2:00 PM - 4:00 PM)', tag: 'Muy Solicitado' },
  { id: 'afternoon-2', label: 'Tarde Central (4:00 PM - 6:00 PM)', tag: 'Horario Cumpleaños ⭐' },
  { id: 'night-1', label: 'Noche (6:30 PM - 8:30 PM)', tag: 'Fiestas & Hora Loca' },
];

export type BookingServiceType = 'personaje-show' | 'desayuno-sorpresa' | 'pausa-activa';

// Enlaces de Wompi independientes para cada servicio (por ahora en desarrollo el mismo link)
export const WOMPI_LINKS: Record<BookingServiceType, string> = {
  'personaje-show': 'https://checkout.wompi.co/l/VPOS_acmaNg',
  'desayuno-sorpresa': 'https://checkout.wompi.co/l/VPOS_acmaNg', // Enlace independiente Wompi para Desayunos Sorpresa
  'pausa-activa': 'https://checkout.wompi.co/l/VPOS_acmaNg', // Enlace independiente Wompi para Pausas Activas & Bienestar
};

const WOMPI_PAYMENT_URL = 'https://checkout.wompi.co/l/VPOS_acmaNg';

interface BookingPageProps {
  onGoHome: () => void;
  initialServiceType?: BookingServiceType;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onGoHome, initialServiceType = 'personaje-show' }) => {
  // Service Type Switcher ('personaje-show' | 'desayuno-sorpresa' | 'pausa-activa')
  const [serviceType, setServiceType] = useState<BookingServiceType>(initialServiceType);

  // Form State
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('mickey');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customCharacterName, setCustomCharacterName] = useState<string>('');

  // Desayuno sorpresa options
  const [breakfastPreference, setBreakfastPreference] = useState<string>('Pancakes con frutas frescas, jugo natural y golosinas');

  // Pausa Activa options
  const [pausaPlan, setPausaPlan] = useState<'1-recreador' | '2-recreadores'>('1-recreador');
  const [companyName, setCompanyName] = useState<string>('');
  const [pausaObjective, setPausaObjective] = useState<string>('Risoterapia & Estiramiento Antiestrés');

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    // Default to Saturday or next day
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState<string>('afternoon-2');
  const [customTime, setCustomTime] = useState<string>('');
  
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [municipality, setMunicipality] = useState<string>('Medellín (Todas las Comunas)');
  const [address, setAddress] = useState<string>('');
  const [eventType, setEventType] = useState<string>('Cumpleaños Infantil');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerPartyConfetti();
  }, []);

  const selectedCharacter = BOOKING_CHARACTERS.find((c) => c.id === selectedCharacterId) || BOOKING_CHARACTERS[0];
  const selectedSlotObj = TIME_SLOTS.find((s) => s.id === selectedSlot) || TIME_SLOTS[3];

  const effectivePrice = serviceType === 'pausa-activa' && pausaPlan === '2-recreadores' ? '$300.000 COP' : '$180.000 COP';

  const handleSelectCharacter = (id: string) => {
    setSelectedCharacterId(id);
    triggerPartyConfetti();
  };

  const filteredCharacters = BOOKING_CHARACTERS.filter((char) => {
    const matchesCategory = selectedCategoryKey === 'all' || char.categoryKey === selectedCategoryKey || char.categoryKey === 'custom';
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || char.name.toLowerCase().includes(query) || char.tagline.toLowerCase().includes(query) || char.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const effectiveCharacterName = selectedCharacter.id === 'otro-personaje' && customCharacterName.trim()
    ? `Personalizado: ${customCharacterName.trim()}`
    : selectedCharacter.name;

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!fullName.trim()) errors.fullName = 'Por favor ingresa tu nombre completo';
    if (!phone.trim() || phone.trim().length < 7) errors.phone = 'Ingresa un número de WhatsApp válido (ej. 3197188973)';
    if (!selectedDate) errors.selectedDate = 'Selecciona la fecha de tu evento';
    if (!address.trim()) errors.address = 'Indica la sede, empresa o dirección de la actividad';
    if (selectedCharacterId === 'otro-personaje' && !customCharacterName.trim()) {
      errors.customCharacter = 'Por favor escribe el nombre del personaje que deseas';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayWithWompi = () => {
    if (!validateForm()) {
      // Scroll to form fields
      const formEl = document.getElementById('booking-form-section');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    triggerPartyConfetti();

    // Store booking details in localStorage in case user returns from payment
    try {
      localStorage.setItem('mega_last_booking', JSON.stringify({
        serviceType: serviceType,
        serviceTitle: serviceType === 'desayuno-sorpresa' 
          ? 'Desayuno Sorpresa & Entrega Mágica' 
          : serviceType === 'pausa-activa'
          ? `Pausa Activa & Bienestar (${pausaPlan === '2-recreadores' ? '2 Recreadores/Personajes' : '1 Recreador/Perro Policía'})`
          : 'Show de Réplica de Personaje',
        character: effectiveCharacterName,
        breakfastPreference: serviceType === 'desayuno-sorpresa' ? breakfastPreference : undefined,
        pausaPlan: serviceType === 'pausa-activa' ? pausaPlan : undefined,
        companyName: serviceType === 'pausa-activa' ? companyName : undefined,
        pausaObjective: serviceType === 'pausa-activa' ? pausaObjective : undefined,
        date: selectedDate,
        time: customTime || selectedSlotObj.label,
        name: fullName,
        phone: phone,
        municipality: municipality,
        address: address,
        eventType: serviceType === 'desayuno-sorpresa' ? 'Desayuno / Entrega Sorpresa' : serviceType === 'pausa-activa' ? 'Pausa Activa Empresarial' : eventType,
        notes: specialNotes,
        price: effectivePrice,
        wompiUrl: WOMPI_LINKS[serviceType],
        timestamp: new Date().toISOString(),
      }));
    } catch {
      // Ignore storage errors
    }

    // Open Wompi payment gateway corresponding to selected service
    const targetWompiUrl = WOMPI_LINKS[serviceType] || WOMPI_PAYMENT_URL;
    window.location.href = targetWompiUrl;
  };

  const getWhatsAppBookingMessage = () => {
    if (serviceType === 'pausa-activa') {
      return `¡Hola Mega Recreación! 🏢 Deseo reservar una *Pausa Activa & Bienestar Empresarial*:
🏢 *Empresa / Organización:* ${companyName || 'Por definir'}
👥 *Modalidad:* ${pausaPlan === '2-recreadores' ? '2 Recreadores / Personajes ($300.000 COP)' : '1 Recreador / Perro Policía ($180.000 COP)'}
🎭 *Personaje / Temática:* ${effectiveCharacterName}
🎯 *Enfoque:* ${pausaObjective}
📅 *Fecha:* ${selectedDate}
⏰ *Hora:* ${customTime || selectedSlotObj.label}
👤 *Contacto:* ${fullName || 'Por definir'}
📱 *Teléfono:* ${phone || 'Por definir'}
📍 *Sede / Dirección:* ${municipality} - ${address || 'Medellín'}
${specialNotes ? `📝 *Detalles Adicionales:* ${specialNotes}` : ''}

¿Me confirman disponibilidad para proceder con el pago de ${effectivePrice} por el enlace de Wompi de Pausas Activas? Muchas gracias.`;
    }

    if (serviceType === 'desayuno-sorpresa') {
      return `¡Hola Mega Recreación! 🎁 Deseo reservar un *Desayuno Sorpresa & Entrega Mágica* con *${effectiveCharacterName}*:
📅 *Fecha de Entrega:* ${selectedDate}
⏰ *Hora de Entrega:* ${customTime || selectedSlotObj.label}
🥞 *Menú / Preferencia:* ${breakfastPreference}
👤 *Quién Recibe / Contacto:* ${fullName || 'Por definir'}
📱 *Teléfono:* ${phone || 'Por definir'}
📍 *Dirección de Entrega:* ${municipality} - ${address || 'Medellín'}
${specialNotes ? `📝 *Dedicatoria o Notas:* ${specialNotes}` : ''}

¿Me confirman disponibilidad para proceder con el pago de $180.000 por el enlace de Wompi de Desayunos Sorpresa? Muchas gracias.`;
    }

    return `¡Hola Mega Recreación! 👋 Deseo reservar en línea a *${effectiveCharacterName}* para mi evento:
📅 *Fecha:* ${selectedDate}
⏰ *Hora:* ${customTime || selectedSlotObj.label}
👤 *Nombre:* ${fullName || 'Por definir'}
📱 *Teléfono:* ${phone || 'Por definir'}
📍 *Lugar:* ${municipality} - ${address || 'Medellín'}
🎉 *Tipo de Evento:* ${eventType}
${specialNotes ? `📝 *Notas:* ${specialNotes}` : ''}

¿Me confirman disponibilidad para proceder con el pago de $180.000 por el enlace de Wompi? Muchas gracias.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#08031d] via-[#040212] to-[#020108] text-slate-100 py-6 sm:py-10 px-3 sm:px-6 relative overflow-hidden">
      
      {/* Dynamic Background Atmospheric Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-cyan-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-purple-700/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Top Header & Brand Bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between z-10 mb-8 sm:mb-12">
        <button
          onClick={onGoHome}
          id="btn-booking-back-top"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-pink-500/30 rounded-full px-4 py-2.5 transition-all shadow cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-pink-400" />
          <span>Volver al Inicio</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-yellow-300 shadow-md bg-white">
            <img
              src={LOGO_URL}
              alt="Mega Recreación Logo"
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
          <div className="hidden sm:flex flex-col">
            <span className="font-display font-black text-white text-base leading-tight">
              MEGA <span className="text-yellow-300">RECREACIÓN</span>
            </span>
            <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
              Reserva Oficial en Línea
            </span>
          </div>
        </div>

        {/* Support Phone Quick Link */}
        <a
          href={createWhatsAppUrl('¡Hola! Tengo una duda antes de reservar por la página.')}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 rounded-full px-3.5 py-1.5 hover:bg-emerald-900/60 transition"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Asistencia WhatsApp: {DISPLAY_PHONE}</span>
        </a>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Page Hero Title & Service Type Switcher */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs sm:text-sm font-black uppercase tracking-wider mb-4 shadow"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span>Sistema Seguro de Reserva con Enlaces Wompi Independientes</span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl font-display font-black text-white leading-tight mb-3">
            {serviceType === 'desayuno-sorpresa' ? (
              <>
                Reserva tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-pink-400">Desayuno Sorpresa</span>
              </>
            ) : serviceType === 'pausa-activa' ? (
              <>
                Reserva tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-teal-300">Pausa Activa & Bienestar</span>
              </>
            ) : (
              <>
                Reserva Tu Personaje <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300">en Línea</span>
              </>
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            {serviceType === 'desayuno-sorpresa'
              ? 'Sorprende en su cumpleaños con su personaje favorito entregando el desayuno a domicilio con música, globos y abrazo mágico.'
              : serviceType === 'pausa-activa'
              ? 'Transforma la jornada de tu equipo con dinámicas antiestrés, risoterapia, bailoterapia, ergonomía y la visita de nuestro icónico Perro Policía (Chase) o personajes temáticos.'
              : 'Escoge tu personaje favorito, selecciona tu fecha y hora en Medellín o el Valle de Aburrá, y asegura tu cupo de forma inmediata con pago 100% seguro.'}
          </p>

          {/* SERVICE TYPE TOGGLE BUTTONS (3 SERVICES) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-md max-w-3xl mx-auto w-full">
            <button
              type="button"
              onClick={() => {
                setServiceType('personaje-show');
                setEventType('Cumpleaños Infantil');
                triggerPartyConfetti();
              }}
              id="btn-service-type-show"
              className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                serviceType === 'personaje-show'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] border border-pink-400/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>🎭 Show de Personajes</span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">$180k</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setServiceType('pausa-activa');
                setEventType('Pausa Activa / Bienestar Empresarial');
                setSelectedCharacterId('chase');
                triggerPartyConfetti();
              }}
              id="btn-service-type-pausa"
              className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                serviceType === 'pausa-activa'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-400/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>🏢 Pausas Activas</span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">$180k / $300k</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setServiceType('desayuno-sorpresa');
                setEventType('Desayuno Sorpresa / Entrega');
                triggerPartyConfetti();
              }}
              id="btn-service-type-desayuno"
              className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                serviceType === 'desayuno-sorpresa'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-[0_0_20px_rgba(245,158,11,0.4)] border border-amber-400/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>🎁 Desayunos Sorpresa</span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">$180k</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Character Selection & Form (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            
            {/* PASO 1: Selector de Personajes & Planes */}
            <section className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-pink-600 text-white font-black flex items-center justify-center text-sm shadow">
                    1
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-display font-black text-white">
                      {serviceType === 'pausa-activa'
                        ? 'Selecciona la Modalidad & Personaje de tu Pausa Activa'
                        : serviceType === 'desayuno-sorpresa'
                        ? 'Escoge el Personaje para la Entrega Sorpresa'
                        : 'Escoge tu Personaje Favorito'}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {serviceType === 'pausa-activa'
                        ? '1 o 2 recreadores con dinámicas de ergonomía, risoterapia y activación'
                        : 'Disponibles para animación de fiestas, piñatas, sorpresas y fotos'}
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-auto text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full">
                  {BOOKING_CHARACTERS.length} Opciones en Catálogo
                </span>
              </div>

              {/* Selector de Modalidad / Plan para Pausas Activas */}
              {serviceType === 'pausa-activa' && (
                <div className="mb-6 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    Selecciona el Plan de Pausa Activa Empresarial
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setPausaPlan('1-recreador');
                        triggerPartyConfetti();
                      }}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        pausaPlan === '1-recreador'
                          ? 'bg-cyan-900/70 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                          : 'bg-slate-950/80 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                            1 Recreador / Personaje
                          </span>
                          {pausaPlan === '1-recreador' && <CheckCircle2 className="w-4 h-4 text-cyan-300" />}
                        </div>
                        <h4 className="font-bold text-white text-sm mt-1.5">Perro Policía o Personaje Temático</h4>
                        <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                          Ideal para oficinas, salas de juntas y equipos medianos. Risoterapia, pausas activas y dinamización.
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-slate-400">1 Hora Completa</span>
                        <span className="font-black text-cyan-300 text-base">$180.000 COP</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPausaPlan('2-recreadores');
                        triggerPartyConfetti();
                      }}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        pausaPlan === '2-recreadores'
                          ? 'bg-cyan-900/70 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                          : 'bg-slate-950/80 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                            2 Recreadores / Personajes ⭐ Full
                          </span>
                          {pausaPlan === '2-recreadores' && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                        </div>
                        <h4 className="font-bold text-white text-sm mt-1.5">Doble Recreador / Pareja Temática</h4>
                        <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                          Recomendado para IPS, plantas de producción, emisoras y grupos grandes. Mayor cobertura y energía.
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-slate-400">1 Hora Completa</span>
                        <span className="font-black text-emerald-300 text-base">$300.000 COP</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Disclaimer / Helpful Note Banner */}
              <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-purple-950/70 via-pink-950/50 to-slate-900 border border-pink-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
                <div className="flex items-start gap-2.5">
                  <span className="text-2xl shrink-0 mt-0.5">🎭</span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-yellow-300">
                      ¿Buscas un personaje que no ves en la lista?
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-snug">
                      Estos son algunos de nuestros personajes principales. ¡Pregúntanos por WhatsApp por el que desees y con gusto te lo conseguimos!
                    </p>
                  </div>
                </div>
                <a
                  href={createWhatsAppUrl('¡Hola Mega Recreación! 🎭 Me gustaría consultar por la disponibilidad de un personaje temático que no vi en el catálogo de reservas web.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-ask-custom-char-whatsapp"
                  className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow cursor-pointer self-stretch sm:self-auto text-center"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>

              {/* Search Bar & Category Filters */}
              <div className="space-y-3 mb-5">
                {/* Search input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar personaje (ej. Sonic, Peppa, Vaca, Batman, Mario...)"
                    className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-pink-500 rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Category Pills Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-pink-500/20 no-scrollbar">
                  {CATEGORY_TABS.map((tab) => {
                    const isTabActive = selectedCategoryKey === tab.key;
                    const count = tab.key === 'all' 
                      ? BOOKING_CHARACTERS.length 
                      : BOOKING_CHARACTERS.filter(c => c.categoryKey === tab.key).length;

                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setSelectedCategoryKey(tab.key)}
                        id={`category-tab-${tab.key}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                          isTabActive
                            ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-500/20 border border-pink-400/40'
                            : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        <span>{tab.emoji}</span>
                        <span>{tab.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isTabActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grid of Characters */}
              {filteredCharacters.length === 0 ? (
                <div className="text-center py-8 px-4 rounded-2xl bg-slate-950/40 border border-dashed border-slate-800">
                  <p className="text-sm text-slate-300 font-semibold mb-2">
                    No encontramos ningún personaje con "{searchQuery}"
                  </p>
                  <p className="text-xs text-slate-400 mb-4">
                    Pero no te preocupes, ¡tenemos acceso a casi cualquier personaje en Medellín!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategoryKey('all');
                      handleSelectCharacter('otro-personaje');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-bold shadow hover:bg-pink-500 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Seleccionar "Preguntar por Otro Personaje"</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                  {filteredCharacters.map((char) => {
                    const isSelected = char.id === selectedCharacterId;
                    return (
                      <div
                        key={char.id}
                        onClick={() => handleSelectCharacter(char.id)}
                        id={`char-card-${char.id}`}
                        className={`relative rounded-2xl p-3 sm:p-3.5 border-2 transition-all cursor-pointer flex gap-3 items-center group overflow-hidden ${
                          isSelected
                            ? 'bg-gradient-to-r from-pink-950/90 via-purple-950/90 to-slate-950 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.35)] scale-[1.01]'
                            : 'bg-slate-950/60 border-slate-800/90 hover:border-pink-500/50 hover:bg-slate-900/80'
                        }`}
                      >
                        {/* Character Thumbnail */}
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-slate-700/80 bg-slate-900">
                          <img
                            src={char.imageUrl}
                            alt={char.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.src.includes('vicflix.expandete.cloud')) {
                                target.src = char.fallbackUrl;
                              }
                            }}
                          />
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pink-500 text-white flex items-center justify-center shadow">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        {/* Character Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[9px] uppercase tracking-wider font-bold text-pink-400 bg-pink-950/60 px-1.5 py-0.5 rounded">
                              {char.category}
                            </span>
                            {char.popular && (
                              <span className="text-[9px] font-bold text-yellow-300 flex items-center gap-0.5">
                                <Flame className="w-2.5 h-2.5 fill-yellow-400" /> Top
                              </span>
                            )}
                          </div>

                          <h3 className="font-display font-black text-white text-sm sm:text-base leading-tight truncate">
                            {char.name}
                          </h3>
                          
                          <p className="text-[11px] text-slate-300 line-clamp-1 mb-1">
                            {char.tagline}
                          </p>

                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-emerald-400 text-xs">{char.price} <span className="text-[9px] text-slate-400 font-normal">/ hora</span></span>
                            <span className={`text-[10px] ${isSelected ? 'text-pink-300 font-bold' : 'text-slate-400'}`}>
                              {isSelected ? '✓ Seleccionado' : 'Elegir'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Custom Character input if 'otro-personaje' selected */}
              {selectedCharacterId === 'otro-personaje' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-2xl bg-yellow-950/30 border border-yellow-500/40"
                >
                  <label className="block text-xs font-bold text-yellow-300 mb-1.5">
                    ¿Cuál es el personaje que deseas para tu fiesta? *
                  </label>
                  <input
                    type="text"
                    value={customCharacterName}
                    onChange={(e) => setCustomCharacterName(e.target.value)}
                    placeholder="Ej. Mirabel (Encanto), Bluey, Capitán América, etc."
                    className="w-full bg-slate-950 border border-yellow-500/50 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {formErrors.customCharacter && (
                    <p className="text-[11px] text-red-400 mt-1">{formErrors.customCharacter}</p>
                  )}
                  <p className="text-[10px] text-slate-400 mt-1.5">
                    💡 Nos comunicaremos contigo por WhatsApp para confirmarte fotos del traje y disponibilidad exacta para tu fecha.
                  </p>
                </motion.div>
              )}

              {/* Selected Character Mini Highlights */}
              <div className="mt-4 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
                <span className="font-semibold text-pink-300 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  Incluye con {effectiveCharacterName}:
                </span>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  {selectedCharacter.features.map((feat, idx) => (
                    <span key={idx} className="bg-slate-900 px-2 py-0.5 rounded-md border border-slate-700 text-slate-200">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* PASO 2: Selección de Fecha y Franja Horaria */}
            <section className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-5 sm:p-7 shadow-xl relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-cyan-600 text-white font-black flex items-center justify-center text-sm shadow">
                  2
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-display font-black text-white">
                    Fecha y Horario del Evento
                  </h2>
                  <p className="text-xs text-slate-400">
                    Selecciona el día de la celebración y la franja de llegada
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Date Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-cyan-400" />
                    Fecha del Evento *
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    id="input-booking-date"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-white font-medium text-sm transition outline-none"
                  />
                  {formErrors.selectedDate && (
                    <p className="text-rose-400 text-xs mt-1 font-semibold">{formErrors.selectedDate}</p>
                  )}

                  {/* Quick date presets */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        const d = new Date();
                        setSelectedDate(d.toISOString().split('T')[0]);
                      }}
                      className="text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg transition"
                    >
                      Hoy
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 1);
                        setSelectedDate(d.toISOString().split('T')[0]);
                      }}
                      className="text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg transition"
                    >
                      Mañana
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const d = new Date();
                        const day = d.getDay();
                        const diff = day === 6 ? 7 : (6 - day);
                        d.setDate(d.getDate() + diff);
                        setSelectedDate(d.toISOString().split('T')[0]);
                      }}
                      className="text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-yellow-300 px-2.5 py-1 rounded-lg transition"
                    >
                      Próximo Sábado
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const d = new Date();
                        const day = d.getDay();
                        const diff = day === 0 ? 7 : (7 - day);
                        d.setDate(d.getDate() + diff);
                        setSelectedDate(d.toISOString().split('T')[0]);
                      }}
                      className="text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 px-2.5 py-1 rounded-lg transition"
                    >
                      Próximo Domingo
                    </button>
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Franja Horaria Estimada *
                  </label>
                  <div className="space-y-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSlotActive = selectedSlot === slot.id && !customTime;
                      return (
                        <div
                          key={slot.id}
                          onClick={() => {
                            setSelectedSlot(slot.id);
                            setCustomTime('');
                          }}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                            isSlotActive
                              ? 'bg-cyan-950/70 border-cyan-400 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${isSlotActive ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]' : 'bg-slate-600'}`} />
                            <span>{slot.label}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {slot.tag}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Optional Custom Hour */}
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="O especifica tu hora exacta (ej: 3:30 PM)"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Realtime Availability Badge */}
              <div className="mt-5 p-3 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 flex items-center gap-3 text-xs text-emerald-300">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white">¡{selectedCharacter.name} tiene disponibilidad activa!</span>
                  <p className="text-slate-300 text-[11px]">
                    El personaje está listo para agendar en la fecha seleccionada ({selectedDate}).
                  </p>
                </div>
              </div>
            </section>

            {/* PASO 3: Datos de Contacto y Lugar */}
            <section id="booking-form-section" className="bg-slate-900/80 backdrop-blur-xl border border-yellow-500/30 rounded-3xl p-5 sm:p-7 shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-yellow-500 text-slate-950 font-black flex items-center justify-center text-sm shadow">
                  3
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-display font-black text-white">
                    Datos del Responsable y Lugar
                  </h2>
                  <p className="text-xs text-slate-400">
                    Información para coordinar la llegada del personaje y confirmación
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-yellow-400" />
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Carolina Gómez"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                    }}
                    id="input-booking-name"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-yellow-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition"
                  />
                  {formErrors.fullName && (
                    <p className="text-rose-400 text-xs mt-1 font-semibold">{formErrors.fullName}</p>
                  )}
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-yellow-400" />
                    WhatsApp / Teléfono *
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej. 319 718 8973"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                    }}
                    id="input-booking-phone"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-yellow-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition"
                  />
                  {formErrors.phone && (
                    <p className="text-rose-400 text-xs mt-1 font-semibold">{formErrors.phone}</p>
                  )}
                </div>

                {/* Municipality */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                    Municipio *
                  </label>
                  <select
                    value={municipality}
                    onChange={(e) => setMunicipality(e.target.value)}
                    id="select-booking-municipality"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-yellow-400 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition"
                  >
                    {MUNICIPALITIES.map((mun, idx) => (
                      <option key={idx} value={mun} className="bg-slate-950 text-white">
                        {mun}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Address / Barrio */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                    Barrio / Salón Social / Dirección *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Laureles / Edificio Los Álamos apto 402"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (formErrors.address) setFormErrors({ ...formErrors, address: '' });
                    }}
                    id="input-booking-address"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-yellow-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition"
                  />
                  {formErrors.address && (
                    <p className="text-rose-400 text-xs mt-1 font-semibold">{formErrors.address}</p>
                  )}
                </div>

                {/* Event Type / Desayuno Options / Pausa Activa Options */}
                {serviceType === 'desayuno-sorpresa' ? (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-amber-400" />
                      Opción de Menú & Sorpresa para el Desayuno
                    </label>
                    <select
                      value={breakfastPreference}
                      onChange={(e) => setBreakfastPreference(e.target.value)}
                      className="w-full bg-slate-950 border border-amber-500/50 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition"
                    >
                      <option value="Pancakes con frutas frescas, miel, jugo natural y golosinas">
                        🥞 Pancakes con frutas frescas, miel, jugo natural y golosinas
                      </option>
                      <option value="Sándwich gourmet de jamón y queso, fruta, jugo y chocolates">
                        🥪 Sándwich gourmet de jamón y queso, fruta, jugo y chocolates
                      </option>
                      <option value="Waffles dulces con arequipe, fresas, yogurt y mensaje festivo">
                        🧇 Waffles dulces con arequipe, fresas, yogurt y mensaje festivo
                      </option>
                      <option value="Opción Personalizada / Consultar menú preferido con asesor">
                        ✨ Opción Personalizada (Coordinar ingredientes por WhatsApp)
                      </option>
                    </select>
                    <p className="text-[11px] text-amber-300/80 mt-1">
                      🎁 Incluye bandeja decorada, globos temáticos, personaje entregando en vivo y canto del cumpleaños.
                    </p>
                  </div>
                ) : serviceType === 'pausa-activa' ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1.5 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                        Empresa / IPS / Entidad
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Clínica Las Américas / Radio Tiempo / Empresa XYZ"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1.5 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        Enfoque de la Dinámica
                      </label>
                      <select
                        value={pausaObjective}
                        onChange={(e) => setPausaObjective(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition"
                      >
                        <option value="Risoterapia & Estiramiento Antiestrés">Risoterapia & Estiramiento Antiestrés</option>
                        <option value="Bailoterapia & Actividad Física">Bailoterapia & Actividad Física</option>
                        <option value="Ergonomía, Postura & Movilidad">Ergonomía, Postura & Movilidad</option>
                        <option value="Integración & Dinámicas de Equipo">Integración & Dinámicas de Equipo</option>
                        <option value="Aniversario Corporativo / Celebración Especial">Aniversario Corporativo / Celebración</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-yellow-400" />
                      Tipo de Celebración
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 focus:border-yellow-400 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition"
                    >
                      <option value="Cumpleaños Infantil">Cumpleaños Infantil</option>
                      <option value="Evento Escolar / Guardería">Evento Escolar / Guardería</option>
                      <option value="Fiesta Familiar / Bautizo">Fiesta Familiar / Bautizo</option>
                      <option value="Celebración Navideña / Novena">Celebración Navideña / Novena</option>
                      <option value="Evento Corporativo / Empresa">Evento Corporativo / Empresa</option>
                    </select>
                  </div>
                )}

                {/* Special Notes / Dedication */}
                <div className={serviceType === 'desayuno-sorpresa' ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-yellow-400" />
                    {serviceType === 'desayuno-sorpresa' 
                      ? 'Nombre del Homenajeado y Dedicatoria Especial' 
                      : serviceType === 'pausa-activa'
                      ? 'Área / Dpto / Número de Colaboradores / NIT (Opcional)'
                      : 'Nombre Cumpleañero / Notas (Opcional)'}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      serviceType === 'desayuno-sorpresa' 
                        ? 'Ej. Para Martín en sus 6 añitos: ¡Te amamos tus papás!' 
                        : serviceType === 'pausa-activa'
                        ? 'Ej. Sede El Poblado, piso 4, aprox. 25 colaboradores'
                        : 'Ej. Cumpleaños de Sofi (5 años)'
                    }
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-yellow-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition"
                  />
                </div>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Order Summary & Wompi Payment Card (4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6 space-y-5">
            
            {/* Ticket de Reserva */}
            <div className="bg-gradient-to-b from-[#180530] via-[#100322] to-[#0a0216] border-2 border-pink-500/50 rounded-3xl p-6 shadow-[0_0_40px_rgba(236,72,153,0.25)] relative overflow-hidden">
              {/* Decorative ticket notch */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#08031d] border-b-2 border-pink-500/50" />
              
              <div className="flex items-center justify-between border-b border-pink-500/30 pb-4 mb-4 pt-2">
                <div className="flex items-center gap-2">
                  <PartyPopper className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-display font-black text-white text-lg">
                    Resumen de Reserva
                  </h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-600/30 text-pink-300 border border-pink-500/40 px-2.5 py-1 rounded-full">
                  100% Confirmada
                </span>
              </div>

              {/* Character Snapshot */}
              <div className="flex items-center gap-3 p-3 bg-slate-950/70 border border-purple-500/30 rounded-2xl mb-4">
                <img
                  src={selectedCharacter.imageUrl}
                  alt={selectedCharacter.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-xl object-cover border border-pink-500/40 bg-slate-900 shrink-0"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('vicflix.expandete.cloud')) {
                      target.src = selectedCharacter.fallbackUrl;
                    }
                  }}
                />
                <div>
                  <span className="text-[10px] text-pink-400 uppercase font-bold tracking-wider">
                    {serviceType === 'desayuno-sorpresa' 
                      ? 'Personaje de Entrega' 
                      : serviceType === 'pausa-activa'
                      ? 'Personaje / Recreador'
                      : 'Personaje Seleccionado'}
                  </span>
                  <h4 className="font-display font-black text-white text-base">
                    {effectiveCharacterName}
                  </h4>
                  <p className="text-xs text-emerald-400 font-bold">
                    {serviceType === 'desayuno-sorpresa' 
                      ? 'Desayuno Sorpresa + Entrega Mágica' 
                      : serviceType === 'pausa-activa'
                      ? `Pausa Activa (${pausaPlan === '2-recreadores' ? '2 Recreadores' : '1 Recreador'})`
                      : 'Show de 1 Hora Completa'}
                  </p>
                </div>
              </div>

              {/* Reservation Meta Details */}
              <div className="space-y-2.5 text-xs text-slate-300 border-b border-purple-900/60 pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-cyan-400" /> Fecha:
                  </span>
                  <span className="font-bold text-white">{selectedDate || 'No seleccionada'}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> Hora:
                  </span>
                  <span className="font-bold text-white">{customTime || selectedSlotObj.label}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Zona:
                  </span>
                  <span className="font-bold text-white truncate max-w-[170px]">{municipality}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-cyan-400" /> Servicio:
                  </span>
                  <span className="font-bold text-white truncate max-w-[170px]">
                    {serviceType === 'desayuno-sorpresa' 
                      ? 'Desayuno Sorpresa' 
                      : serviceType === 'pausa-activa'
                      ? `Pausa Activa (${pausaPlan === '2-recreadores' ? '2 Pers.' : '1 Pers.'})`
                      : eventType}
                  </span>
                </div>

                {serviceType === 'pausa-activa' && companyName && (
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Empresa:
                    </span>
                    <span className="font-bold text-cyan-300 truncate max-w-[170px]">{companyName}</span>
                  </div>
                )}

                {serviceType === 'desayuno-sorpresa' && (
                  <div className="pt-1 text-[11px] text-amber-300/90 bg-amber-950/30 p-2 rounded-lg border border-amber-500/20">
                    <span className="font-semibold block">🥞 Menú Seleccionado:</span>
                    <span className="text-slate-300 line-clamp-2">{breakfastPreference}</span>
                  </div>
                )}
              </div>

              {/* Total Price */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-xs text-slate-400 block">Total del Servicio:</span>
                  <span className="text-2xl sm:text-3xl font-black text-white font-display">
                    {effectivePrice}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-500/30 px-2 py-1 rounded">
                    Tarifa Oficial 2026
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Incluye transporte Medellín</span>
                </div>
              </div>

              {/* PRIMARY WOMPI BUTTON */}
              <button
                onClick={handlePayWithWompi}
                id="btn-pay-wompi-checkout"
                className="w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 hover:from-emerald-300 hover:to-teal-500 text-slate-950 font-black text-base sm:text-lg py-4 px-5 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer border-2 border-white mb-3"
              >
                <CreditCard className="w-5 h-5 text-slate-950 shrink-0" />
                <span>Pagar Ahora con Wompi</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-300 mb-4 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pago procesado por <strong>Wompi (Bancolombia)</strong> • Nequi, PSE y Tarjetas</span>
              </div>

              {/* Secondary WhatsApp Inquire button */}
              <a
                href={createWhatsAppUrl(getWhatsAppBookingMessage())}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-booking-whatsapp-inquiry"
                className="w-full bg-slate-900 hover:bg-slate-800 text-pink-300 hover:text-white border border-pink-500/40 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Consultar o Enviar Datos por WhatsApp</span>
              </a>

              {/* Trust Box */}
              <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Un asesor de Mega Recreación se contactará (9am - 4pm) para reconfirmar dirección y hora.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Garantía de puntualidad y trajes limpios en perfecto estado.</span>
                </div>
              </div>
            </div>

            {/* Direct Line Support */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
              <p className="font-semibold text-slate-300 mb-1">¿Prefieres pagar por transferencia directa?</p>
              <p className="text-[11px]">Aceptamos Bancolombia, Nequi y Daviplata comunicándote a nuestras líneas oficiales:</p>
              <div className="mt-2 flex justify-center gap-4 font-bold text-yellow-400">
                <span>📞 {DISPLAY_PHONE}</span>
                <span>📞 {DISPLAY_PHONE_2}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center z-10 mt-12 pt-6 border-t border-slate-900 text-xs text-slate-500">
        <p>Mega Recreación Medellín • Pasarela de Pago Wompi Colombia • Todos los derechos reservados</p>
      </footer>

    </div>
  );
};

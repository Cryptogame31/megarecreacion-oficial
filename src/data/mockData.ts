import { ServiceItem, GalleryItem, VideoItem, Testimonial, FaqItem } from '../types';

export const PHONE_NUMBER = '573197188973';
export const DISPLAY_PHONE = '319 718 8973';
export const PHONE_NUMBER_2 = '573163048505';
export const DISPLAY_PHONE_2 = '316 304 8505';

export const LOGO_URL = '/logo_megarecreacion.jpg';
export const LOGO_FALLBACK_URL = '/logo.jpg';
export const HERO_TEAM_IMG = '/images/mega_infantil_hero.jpg';
export const FLYER_PROMO_IMG = '/catalogo/Mega.jpg';
export const FLYER_PROMO_FALLBACK_URL = '/catalogo/Mega Max1.jpg';

export const SERVICES: ServiceItem[] = [
  {
    id: 'paquete-mega',
    category: 'infantil',
    title: 'Paquete MEGA (Plan Base)',
    subtitle: '2.5 Horas de alegría con Pintacaritas, Show de Payaso y Magia',
    badge: 'Recreación Infantil',
    priceText: '$180.000 COP',
    priceNote: '+ Transporte según zona | 1 Recreacionista (2.5 Horas)',
    description: 'Nuestro plan insignia para cumpleaños llenos de color y sonrisas. Un recreacionista experto transforma tu casa, salón social o unidad residencial con dinámicas interactivas, magia participativa y carcajadas.',
    mainImage: '/images/mega_infantil_hero.jpg',
    flyerImage: '/catalogo/Mega.jpg',
    galleryImages: [
      { url: '/catalogo/Mega.jpg', caption: 'Ficha Oficial Paquete MEGA ($180.000)' },
      { url: 'https://vicflix.expandete.cloud/REPLICASMEGA/fiesta_infantil_plim_plim_ninas_circo.jpeg', caption: 'Animación y juegos infantiles' }
    ],
    features: [
      'Duración oficial: 2 horas y media (2.5 horas) con 1 recreacionista',
      'Pintacaritas con diseños divertidos e hipoalergénicos',
      'Recreación dirigida con rondas, juegos y dinámicas por edades',
      'Show de Payaso cómico familiar y Show de Magia infantil',
      'Adicionales promo: Hora Loca o Globoflexia (+$30.000) | Show Personaje Disney 1h ($180.000)'
    ],
    popularTag: 'Plan Base Favorito ⭐',
    ctaText: 'Reservar Paquete MEGA',
    whatsappMessage: '¡Hola Mega Recreación! Quiero cotizar y reservar el Paquete MEGA ($180.000 - 2.5 horas) para mi fiesta.'
  },
  {
    id: 'paquete-mega-max',
    category: 'infantil',
    title: 'Paquete MEGA MAX (Transporte Incluido)',
    subtitle: '2.5 a 3 Horas con Hora Loca, Espuma, Antifaces y Globoflexia',
    badge: '¡El Más Pedido!',
    priceText: '$190.000 COP',
    priceNote: 'Transporte Incluido (Área Metropolitana) | 1 Recreacionista',
    description: 'La experiencia completa sin costos ocultos de transporte en el Valle de Aburrá. Incluye pintacaritas, competencias para niños y adultos, globoflexia para cada niño y una espectacular Hora Loca con espuma y antifaces.',
    mainImage: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_wonder_woman_animadora_nina_cargando_01.jpeg',
    flyerImage: '/catalogo/Mega Max1.jpg',
    galleryImages: [
      { url: '/catalogo/Mega Max1.jpg', caption: 'Ficha Oficial Paquete MEGA MAX ($190.000)' },
      { url: '/catalogo/Mega Max.jpg', caption: 'Detalle de beneficios Mega Max' }
    ],
    features: [
      'Transporte 100% INCLUIDO en el Área Metropolitana ($170k serv + $20k transp)',
      'Duración de 2.5 a 3 horas con 1 recreacionista profesional',
      'Pintacaritas + Recreación dirigida + Concursos musicales de baile',
      'Globoflexia: cada niño recibe su figura con globos de recuerdo',
      'Animación de Hora Loca incluida (con espuma, antifaces y accesorios)'
    ],
    popularTag: 'Más Vendido 🔥',
    ctaText: 'Reservar MEGA MAX ($190k)',
    whatsappMessage: '¡Hola Mega Recreación! Quiero reservar el Paquete MEGA MAX ($190.000 con transporte incluido y Hora Loca).'
  },
  {
    id: 'paquete-mega-fiesta',
    category: 'infantil',
    title: 'Paquete MEGA FIESTA (Doble Recreacionista + Transporte)',
    subtitle: '3.5 Horas para hasta 30 niños con Payasos, Títeres, Magia, Festiglobos y Transporte Incluido',
    badge: 'Grupos hasta 30 Niños',
    priceText: '$300.000 COP',
    priceNote: 'Transporte Incluido (Área Metropolitana) | 2 Recreacionistas (3.5 Horas)',
    description: 'Diseñado para fiestas grandes donde quieres el doble de energía y atención sin preocuparte por el transporte. Dos recreacionistas en escena presentando show de títeres, payasos, magia infantil, hora loca y festiglobos con transporte incluido.',
    mainImage: 'https://vicflix.expandete.cloud/REPLICASMEGA/evento_escolar_olaf_frozen_ninos_patio.jpeg',
    flyerImage: '/catalogo/Mega fiesta.jpg',
    galleryImages: [
      { url: '/catalogo/Mega fiesta.jpg', caption: 'Ficha Oficial Paquete MEGA FIESTA ($300.000)' },
      { url: 'https://vicflix.expandete.cloud/REPLICASMEGA/evento_escolar_chase_ninos_regalos_colegio.jpeg', caption: 'Animación para grupos grandes' }
    ],
    features: [
      'Transporte 100% INCLUIDO en Medellín y Área Metropolitana',
      '2 Recreacionistas profesionales durante 3 horas y media (3.5 horas)',
      'Capacidad ideal hasta 30 niños con control y diversión total',
      'Show de Payasos + Show de Títeres + Show de Magia Infantil',
      'Concursos musicales, Hora Loca y Festiglobos',
      'Opcional: Alquiler de Cabina de 8" ($100.000) o Cabina de 14" ($250.000)'
    ],
    popularTag: 'Doble Recreacionista 🎭',
    ctaText: 'Reservar MEGA FIESTA ($300k)',
    whatsappMessage: '¡Hola Mega Recreación! Me interesa el Paquete MEGA FIESTA ($300.000 con 2 recreacionistas, 3.5 horas y transporte incluido).'
  },
  {
    id: 'paquete-mega-alegria',
    category: 'todo-incluido',
    title: 'Paquete MEGA ALEGRÍA (Recreación + Inflable)',
    subtitle: '4 Horas de Castillo Inflable + Recreación Completa y Transporte Incluido',
    badge: 'Combo Con Inflable',
    priceText: '$800.000 COP',
    priceNote: '4 Horas | Recreacionista + Inflable + Transporte Incluido',
    description: '¡La combinación favorita de los niños! Llevamos nuestro castillo inflable profesional junto con toda la recreación dirigida, pintacaritas, magia y concursos durante 4 horas inolvidables con transporte incluido.',
    mainImage: 'https://vicflix.expandete.cloud/REPLICASMEGA/halloween_chase_castillo_inflable_exterior.jpeg',
    flyerImage: '/catalogo/Mega Alegrgia.jpg',
    galleryImages: [
      { url: '/catalogo/Mega Alegrgia.jpg', caption: 'Ficha Oficial Paquete MEGA ALEGRÍA ($800.000)' },
      { url: '/catalogo/Inflables.jpg', caption: 'Nuestros Inflables Certificados' }
    ],
    features: [
      '4 Horas de servicio continuo con transporte incluido en Área Metropolitana',
      'Castillo Inflable seguro y desinfectado con montaje incluido',
      '1 Recreacionista profesional dirigiendo juegos, rondas y competencias',
      'Pintacaritas, globoflexia, magia y animación del Feliz Cumpleaños',
      'Ideal para fincas, jardines, salones sociales y unidades residenciales'
    ],
    popularTag: 'Combo Estrella 🏰',
    ctaText: 'Reservar MEGA ALEGRÍA ($800k)',
    whatsappMessage: '¡Hola Mega Recreación! Quiero cotizar el Paquete MEGA ALEGRÍA ($800.000 con Inflable + Recreación 4 horas).'
  },
  {
    id: 'mega-pack-todo-incluido',
    category: 'todo-incluido',
    title: 'MEGA PACK (Fiesta Todo Incluido)',
    subtitle: 'Recreación + Inflable + Decoración Temática + 20 Refrigerios',
    badge: 'All-Inclusive VIP',
    priceText: '$1.550.000 COP',
    priceNote: '4 Horas | Incluye 20 niños (Niño adicional: $34.000)',
    description: 'Despreocúpate de absolutamente todo y disfruta como un invitado más. Montamos la decoración temática de lujo, el castillo inflable, toda la recreación y los 20 refrigerios para los niños.',
    mainImage: '/images/mega_inflables_decoracion.jpg',
    flyerImage: '/catalogo/Mega pack.jpg',
    galleryImages: [
      { url: '/catalogo/Mega pack.jpg', caption: 'Ficha Oficial MEGA PACK Todo Incluido ($1.550.000)' },
      { url: '/catalogo/Decoraciones.jpg', caption: 'Decoraciones Temáticas Personalizadas' }
    ],
    features: [
      'Todo resuelto en un solo paquete durante 4 horas (Transporte incluido)',
      'Decoración temática profesional con arco orgánico de globos y mobiliario',
      'Castillo Inflable con operario + Recreacionista profesional',
      '20 Refrigerios deliciosos incluidos (Niño adicional por solo $34.000)',
      'Show de payasos, magia, pintacaritas, hora loca y animación de torta'
    ],
    popularTag: 'Cero Estrés 👑',
    ctaText: 'Reservar MEGA PACK VIP',
    whatsappMessage: '¡Hola Mega Recreación! Quiero información y disponibilidad para el MEGA PACK Todo Incluido ($1.550.000).'
  },
  {
    id: 'personajes-infantiles',
    category: 'infantil',
    title: 'Réplicas de Personajes Disney & Favoritos',
    subtitle: 'Más de 20 personajes hiperrealistas: Mickey, Minnie, Chase, Spiderman, Elsa, Mario y más',
    badge: 'Show Musical & Fotos',
    priceText: '$180.000 COP',
    priceNote: '1 Hora Show Completo ($180.000 COP) | Alquiler exclusivamente por hora',
    description: 'Llevamos la magia del cine y la TV a tu celebración. Trajes acolchados de lujo 100% idénticos, baile coreográfico, acompañamiento en la torta, piñata y sesión de fotos ilimitada.',
    mainImage: 'https://vicflix.expandete.cloud/REPLICASMEGA/catalogo_grupal_personajes_sarahy_celebraciones.jpeg',
    flyerImage: '/catalogo/persoajes disey.jpg',
    galleryImages: [
      { url: '/catalogo/persoajes disey.jpg', caption: 'Catálogo Oficial Personajes Disney ($180.000)' },
      { url: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_spiderman_nino_6anos_decoracion.jpeg', caption: 'Spiderman en acción' },
      { url: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_woody_toystory_ninos_torta_decoracion.jpeg', caption: 'Woody Toy Story' }
    ],
    features: [
      'Más de 20 personajes: Paw Patrol, Disney, Marvel, Mario Bros, Plim Plim, Peppa Pig',
      'Alquiler exclusivamente por hora completa: 1 Hora de Show Musical y Fotos ($180.000 COP)',
      'Trajes limpios, acolchados y de acabado hiperrealista de la más alta calidad',
      'Animación del Feliz Cumpleaños, entrega de regalos y fotos con toda la familia',
      'Disponibles también para Desayunos Sorpresa y Colegios'
    ],
    popularTag: 'Magia Real ✨',
    ctaText: 'Escoger Personaje Favorito',
    whatsappMessage: '¡Hola Mega Recreación! Quiero cotizar un Personaje Disney / Infantil para mi evento.'
  },
  {
    id: 'baby-shower-adultos',
    category: 'adultos-baby',
    title: 'Baby Shower & Recreación para Adultos',
    subtitle: '3 Horas de juegos modernos, risas sin pena, dinámicas familiares y Hora Loca',
    badge: 'Familiar & Adultos',
    priceText: '$300.000 COP',
    priceNote: '3 Horas | 1 Recreacionista Experto | Transporte Incluido',
    description: 'Olvídate de las reuniones aburridas. Diseñamos Baby Showers emotivos y fiestas de adultos llenas de humor sano, concursos por equipos, retos musicales y una Hora Loca inolvidable.',
    mainImage: '/images/mega_baby_shower.jpg',
    flyerImage: '/catalogo/Baby Shower.jpg',
    galleryImages: [
      { url: '/catalogo/Baby Shower.jpg', caption: 'Ficha Oficial Paquete Baby Shower ($300.000)' },
      { url: '/images/mega_adultos_hora_loca.jpg', caption: 'Hora Loca y Recreación para Adultos' },
      { url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1024,h=984,fit=crop/AoPGEz1R1OsWeKgR/baby-shower-YBg4oo8JExukaKjb.jpeg', caption: 'Baby Shower Real Mega Recreación' }
    ],
    features: [
      'Duración oficial: 3 horas continuas con transporte incluido',
      'Juegos modernos y dinámicos donde participan todos los invitados sin incomodar',
      'Materiales y elementos para los concursos incluidos (teteros, pañales, retos)',
      'Animación especial para apertura de regalos y bendición de los papás',
      'También disponible modalidad Recreación y Hora Loca para Cumpleaños de Adultos'
    ],
    popularTag: '100% Diversión Familiar 🍼🎉',
    ctaText: 'Reservar Baby Shower / Adultos',
    whatsappMessage: '¡Hola Mega Recreación! Quiero reservar el paquete de Baby Shower / Recreación de Adultos ($300.000 - 3 horas).'
  },
  {
    id: 'pausas-activas-empresariales',
    category: 'empresarial',
    title: 'Eventos Empresariales & Pausas Activas',
    subtitle: 'Salud ocupacional, integración corporativa, Día de la Familia y Bienestar Laboral',
    badge: 'Corporativo & SST',
    priceText: 'Desde $250.000 COP',
    priceNote: '1h (1 Recreador + Bafle): $250.000 | 2h (2 Recreadores + Bafle): $450.000',
    description: 'Activamos la energía y el bienestar de tu empresa con pausas activas creativas, bailoterapia, dinámicas antiestrés, visita del famoso Perro Policía y sonido incluido.',
    mainImage: '/images/mega_empresarial_pausas.jpg',
    galleryImages: [
      { url: 'https://vicflix.expandete.cloud/REPLICASMEGA/pausa_activa_perro_policia_radio_tiempo_1059fm.jpeg', caption: 'Pausa Activa en Radio Tiempo 105.9 FM' },
      { url: 'https://vicflix.expandete.cloud/REPLICASMEGA/pausa_activa_perro_policia_radio_olimpica_stereo.jpeg', caption: 'Show en Olímpica Stereo Medellín' },
      { url: 'https://vicflix.expandete.cloud/REPLICASMEGA/pausa_activa_perro_policia_ips_cruz_roja_equipo.jpeg', caption: 'Bienestar en IPS Cruz Roja Antioquia' }
    ],
    features: [
      'Pausa Activa 1 Hora (1 recreacionista con bafle pequeño incluido): $250.000 COP',
      'Pausa Activa 2 Horas (2 recreacionistas con bafle pequeño incluido): $450.000 COP',
      'Dinámicas de integración, trabajo en equipo y prevención del estrés laboral (SST)',
      'Show especial opcional con personaje Perro Policía o recreacionistas de alta energía',
      'Entregamos cotización formal corporativa y cuenta de cobro / facturación empresarial'
    ],
    popularTag: 'Aliado de Empresas 🏆',
    ctaText: 'Cotizar Pausa Activa',
    whatsappMessage: '¡Hola Mega Recreación! Quiero solicitar una cotización de Pausas Activas / Bienestar Empresarial.'
  },
  {
    id: 'inflables-decoracion-comidas',
    category: 'adicionales',
    title: 'Decoración Temática, Inflables & Cabinas de Sonido',
    subtitle: 'Alquila servicios individuales o complementa tu celebración a la medida',
    badge: 'Servicios Individuales',
    priceText: 'Desde $100.000 COP',
    priceNote: 'Cabina 8": $100k | Cabina 14": $250k | Decoración: $480k | Inflable 4h: $520k',
    description: 'Montaje profesional de decoración temática con globos, mobiliario y luces, alquiler de castillos inflables seguros y cabinas de sonido profesionales para cualquier espacio.',
    mainImage: '/catalogo/Inflables.jpg',
    flyerImage: '/catalogo/Pasabocas.jpg',
    galleryImages: [
      { url: '/catalogo/Decoraciones.jpg', caption: 'Decoración Temática ($480.000)' },
      { url: '/catalogo/Inflables.jpg', caption: 'Alquiler de Inflables 4 Horas ($520.000)' },
      { url: '/catalogo/Pasabocas.jpg', caption: 'Pasabocas y Comidas Rápidas' }
    ],
    features: [
      'Decoración Temática ($480.000 COP): Arco en globos + 1 backing o fondo + 2 cilindros + número luminoso + nombre de regalo personalizado',
      'Alquiler Cabina de Sonido 8" con micrófono y Bluetooth ($100.000 COP)',
      'Alquiler Cabina de Sonido Profesional 14" Gran Potencia ($250.000 COP)',
      'Alquiler Castillo Inflable por 4 horas con operario y transporte incluido ($520.000 COP)',
      'Comidas rápidas para eventos (Perros calientes, hamburguesas, pizzas) y pasabocas'
    ],
    popularTag: 'A tu Medida 🎈🔊',
    ctaText: 'Cotizar Adicionales',
    whatsappMessage: '¡Hola Mega Recreación! Quiero cotizar Decoración Temática ($480.000), Cabinas de Sonido o Inflables para mi evento.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-hero-1',
    title: 'Fiesta Infantil Todo Incluido con Inflable y Magia',
    category: 'cumpleanos',
    categoryName: 'Cumpleaños y Fiestas',
    imageUrl: '/images/mega_infantil_hero.jpg',
    description: 'Recreación dirigida, pintacaritas, show de magia y castillo inflable en Medellín.',
    tag: 'Paquete Mega Alegría'
  },
  {
    id: 'gal-hero-2',
    title: 'Montaje VIP Mega Pack: Decoración + Inflable + Banquete',
    category: 'cumpleanos',
    categoryName: 'Cumpleaños y Fiestas',
    imageUrl: '/images/mega_inflables_decoracion.jpg',
    description: 'Arcos orgánicos de globos, tobogán inflable gigante y estación de comidas rápidas.',
    tag: 'Mega Pack VIP'
  },
  {
    id: 'gal-hero-3',
    title: 'Baby Shower Familiar de Lujo en el Valle de Aburrá',
    category: 'portafolio',
    categoryName: 'Baby Shower & Adultos',
    imageUrl: '/images/mega_baby_shower.jpg',
    description: '3 horas de juegos modernos, animación emotiva y risas garantizadas para toda la familia.',
    tag: 'Baby Shower $300k'
  },
  {
    id: 'gal-hero-4',
    title: 'Hora Loca Neón y Rumba para Adultos',
    category: 'portafolio',
    categoryName: 'Baby Shower & Adultos',
    imageUrl: '/images/mega_adultos_hora_loca.jpg',
    description: 'Espuma, antifaces, cañones de confeti y animación de alto voltaje para fiestas de adultos.',
    tag: 'Hora Loca Adultos'
  },
  {
    id: 'gal-hero-5',
    title: 'Pausas Activas y Bienestar Corporativo en Medellín',
    category: 'colegios',
    categoryName: 'Empresas & Colegios',
    imageUrl: '/images/mega_empresarial_pausas.jpg',
    description: 'Integración empresarial, salud ocupacional y recreación corporativa de alto impacto.',
    tag: 'Empresariales'
  },
  {
    id: 'gal-1',
    title: 'Cumpleaños Emmy con Elsa de Frozen',
    category: 'cumpleanos',
    categoryName: 'Cumpleaños y Fiestas',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_elsa_frozen_nina_cumpleanera_emmy.jpeg',
    description: 'La princesa de la casa viviendo un cuento de hadas real en su fiesta temática de Frozen en Medellín.',
    tag: 'Elsa Frozen'
  },
  {
    id: 'gal-2',
    title: 'Peppa Pig en Fiesta de 4 Añitos',
    category: 'cumpleanos',
    categoryName: 'Cumpleaños y Fiestas',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_peppa_pig_nina_torta_4anos.jpeg',
    description: 'Mucha ternura y alegría junto a la torta en la celebración infantil de 4 años.',
    tag: 'Peppa Pig'
  },
  {
    id: 'gal-4',
    title: 'Show Infantil Plim Plim en el Circo',
    category: 'cumpleanos',
    categoryName: 'Cumpleaños y Fiestas',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/fiesta_infantil_plim_plim_ninas_circo.jpeg',
    description: 'El héroe del corazón Plim Plim llenando de canciones, magia y valores la fiesta.',
    tag: 'Plim Plim'
  },
  {
    id: 'gal-5b',
    title: 'Spiderman en Fiesta Temática',
    category: 'cumpleanos',
    categoryName: 'Cumpleaños y Fiestas',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_spiderman_nino_6anos_decoracion.jpeg',
    description: 'El hombre araña salvando el día con juegos, acrobacias y la emoción de los pequeños.',
    tag: 'Spiderman Marvel'
  },
  {
    id: 'gal-6',
    title: 'Evento Escolar con Chase Patrulla Canina',
    category: 'colegios',
    categoryName: 'Empresas & Colegios',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/evento_escolar_chase_ninos_regalos_colegio.jpeg',
    description: 'Visita institucional y entrega de detalles escolares en guarderías y colegios del Valle de Aburrá.',
    tag: 'Paw Patrol'
  },
  {
    id: 'gal-8',
    title: 'Halloween Chase & Castillo Inflable',
    category: 'colegios',
    categoryName: 'Empresas & Colegios',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/halloween_chase_castillo_inflable_exterior.jpeg',
    description: 'Festival de disfraces y juegos inflables en jardines infantiles y conjuntos residenciales.',
    tag: 'Halloween Inflables'
  },
  {
    id: 'gal-10',
    title: 'Papá Noel en Familia: Nochebuena Mágica',
    category: 'navidad',
    categoryName: 'Navidad & Papá Noel',
    imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/navidad_papa_noel_familia_merry_christmas.jpeg',
    description: 'Visitas a hogares, novenas navideñas y entrega de regalos con Papá Noel real.',
    tag: 'Papá Noel Familiar'
  }
];

export const TIKTOK_VIDEOS = [
  {
    id: 'tiktok-1',
    title: '¡La Fiesta Infantil Perfecta en Medellín! Inflables, Decoración y Shows',
    url: 'https://vt.tiktok.com/ZSp2hoDF4/',
    label: '🎬 Ver en TikTok (@megarecreacion31)',
    tag: '+20 Años de Experiencia'
  },
  {
    id: 'tiktok-2',
    title: 'Mega Recreación Medellín: Todo para tu Fiesta o Reunión Social',
    url: 'https://vt.tiktok.com/ZSp2BkEFm/',
    label: '🔥 Ver en TikTok (@megarecreacion31)',
    tag: 'Eventos & Recreación'
  },
  {
    id: 'tiktok-3',
    title: 'Shows en Vivo, Alegría y Personajes Inolvidables',
    url: 'https://vt.tiktok.com/ZSp2BG26H/',
    label: '✨ Ver en TikTok (@megarecreacion31)',
    tag: 'Diversión Total'
  }
];

export const SOCIAL_LINKS = {
  tiktok: 'https://www.tiktok.com/@megarecreacion31',
  tiktokVideo1: 'https://vt.tiktok.com/ZSp2hoDF4/',
  tiktokVideo2: 'https://vt.tiktok.com/ZSp2BkEFm/',
  whatsapp1: 'https://wa.me/573197188973',
  whatsapp2: 'https://wa.me/573163048505'
};

export const VIDEOS: VideoItem[] = [
  {
    id: 'vid-tiktok-1',
    title: '¡Todo para tu Fiesta Infantil en Medellín! (+20 Años Creando Sonrisas)',
    description: 'Inflables, decoración temática, recreación dirigida, shows de magia, payasos, comida y pura felicidad en un solo lugar.',
    videoUrl: '/videos/tiktok_7491716209595944247.mp4',
    externalUrl: 'https://vt.tiktok.com/ZSp2hoDF4/',
    badge: '🌟 Video Oficial Destacado',
    duration: 'Mega Recreación Oficial'
  },
  {
    id: 'vid-tiktok-2',
    title: 'Mega Recreación Medellín: Todo para tu Fiesta o Reunión Social',
    description: 'Mira cómo transformamos cualquier espacio en una celebración inolvidable para niños, jóvenes y adultos en todo el Valle de Aburrá.',
    videoUrl: '/videos/tiktok_7531409107518065976.mp4',
    externalUrl: 'https://vt.tiktok.com/ZSp2BkEFm/',
    badge: '🎉 Eventos Sociales & Familiares',
    duration: 'TikTok Viral'
  },
  {
    id: 'vid-tiktok-3',
    title: 'Shows en Vivo, Concursos y Energía al 100%',
    description: 'Nuestros recreacionistas profesionales poniendo a bailar, reír y participar a todos los invitados de principio a fin.',
    videoUrl: '/videos/tiktok_7465293897493679365.mp4',
    externalUrl: 'https://vt.tiktok.com/ZSp2BG26H/',
    badge: '🔥 Recreación en Vivo',
    duration: 'Show Garantizado'
  },
  {
    id: 'vid-1',
    title: 'Entrega Sorpresa de Chase (Paw Patrol)',
    description: '¡Emoción pura! Mira la reacción inolvidable cuando Chase llega con los globos y la música a sorprender en casa.',
    videoUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/video_chase_cumple_sorpresa_lucia.mp4',
    badge: '🐾 Entrega Sorpresa',
    duration: 'Evento Real en Medellín'
  },
  {
    id: 'vid-2',
    title: 'Celebración Escolar Masiva: LOL, Chase & Minnie',
    description: 'Cientos de niños cantando y bailando en el colegio con la presencia estelar de sus personajes favoritos.',
    videoUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/video_evento_escolar_lol_chase_minnie.mp4',
    badge: '🏫 Show Escolar Masivo',
    duration: 'Institución Educativa'
  },
  {
    id: 'vid-3',
    title: 'Fiesta Nocturna & Hora Loca: Mario, Minnie & Woody',
    description: '¡La hora loca más prendida de Antioquia! Dinámicas, luces, baile sin parar y la mejor energía para todas las edades.',
    videoUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/video_fiesta_nocturna_minnie_mario_woody.mp4',
    badge: '🕺 Hora Loca & Baile Neón',
    duration: 'Fiesta Nocturna'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Carolina Restrepo Valencia',
    location: 'El Poblado, Medellín',
    role: 'Mamá de Juan Pablo (6 años)',
    comment: 'Contratamos el Paquete Mega Alegría con el inflable y Spiderman. ¡Fue espectacular! Llegaron 30 minutos antes, los niños gozaron el show de magia y pintacaritas de principio a fin.',
    stars: 5,
    serviceType: 'Paquete Mega Alegría ($800.000)',
    verified: true
  },
  {
    id: 'test-2',
    name: 'Dr. Andrés Felipe Gómez',
    location: 'Laureles, Medellín',
    role: 'Líder de Talento Humano IPS',
    comment: 'Contratamos la pausa activa y jornada de bienestar para 80 colaboradores y fue un éxito rotundo. Rompieron la rutina con un humor sano y muy profesional. 100% recomendados.',
    stars: 5,
    serviceType: 'Pausas Activas Empresariales',
    verified: true
  },
  {
    id: 'test-3',
    name: 'Laura Sofía Giraldo',
    location: 'Envigado, Antioquia',
    role: 'Futura Mamá (Baby Shower)',
    comment: 'Tenía miedo de los juegos pesados de antes, pero el recreacionista de Mega Recreación hizo un Baby Shower hermoso, moderno y súper divertido. Hasta los abuelos participaron felices.',
    stars: 5,
    serviceType: 'Paquete Baby Shower ($300.000)',
    verified: true
  },
  {
    id: 'test-4',
    name: 'Sebastián Jaramillo',
    location: 'Bello (Niquía)',
    role: 'Papá de Matías y Luciana',
    comment: 'Elegimos el Mega Pack Todo Incluido de $1.550.000 y fue la mejor decisión. La decoración quedó de revista, los refrigerios deliciosos y el inflable mantuvo a los 20 niños felices las 4 horas.',
    stars: 5,
    serviceType: 'Mega Pack Todo Incluido',
    verified: true
  },
  {
    id: 'test-5',
    name: 'Marcela Echeverri',
    location: 'Sabaneta, Antioquia',
    role: 'Mamá de Sofía (4 años)',
    comment: 'El Paquete Mega Max de $190.000 incluye hasta el transporte y la hora loca con espuma. Por ese precio no hay nada igual en Medellín, los recreacionistas tienen un carisma increíble.',
    stars: 5,
    serviceType: 'Paquete Mega Max ($190.000)',
    verified: true
  }
];

export const FAQS: FaqItem[] = [
  {
    question: '¿Cuáles son los paquetes de recreación infantil y qué precios tienen?',
    answer: 'Contamos con 5 planes principales transparentes: 1) Paquete MEGA por $180.000 + transporte (2.5h, 1 recreacionista, pintacaritas, payaso y magia). 2) Paquete MEGA MAX por $190.000 con transporte incluido en Área Metropolitana (2.5 a 3h, incluye Hora Loca con espuma y globoflexia). 3) Paquete MEGA FIESTA por $300.000 con transporte incluido (3.5h, 2 recreacionistas, títeres, payasos, magia y festiglobos). 4) Paquete MEGA ALEGRÍA por $800.000 (4h de Recreación + Castillo Inflable + transporte incluido). 5) MEGA PACK Todo Incluido por $1.550.000 (Recreación + Inflable + Decoración de lujo + 20 refrigerios).',
    category: 'Precios'
  },
  {
    question: '¿Cuánto cuesta el show de personajes infantiles y réplicas Disney?',
    answer: 'El alquiler de réplicas de personajes Disney, Marvel, Nickelodeon o temáticos tiene un valor de $180.000 COP por 1 hora de show completo musical, coreografías, acompañamiento en piñata, torta y fotos sin límite. Los personajes se contratan exclusivamente por hora.',
    category: 'Personajes'
  },
  {
    question: '¿Qué planes de Pausas Activas y Bienestar Empresarial ofrecen?',
    answer: 'Para empresas y salud ocupacional (SST) disponemos de dos planes: 1) Pausa Activa 1 Hora con 1 recreacionista y bafle pequeño incluido por $250.000 COP. 2) Pausa Activa 2 Horas con 2 recreacionistas y bafle pequeño incluido por $450.000 COP.',
    category: 'Empresarial'
  },
  {
    question: '¿Qué incluye la Decoración Temática y cuánto cuesta?',
    answer: 'Nuestra Decoración Temática tiene un valor de $480.000 COP e incluye: Arco orgánico en globos + 1 backing o fondo temático + 2 cilindros decorativos + número luminoso + nombre de regalo personalizado para el homenajeado.',
    category: 'Decoración'
  },
  {
    question: '¿Tienen alquiler de sonido para fiestas?',
    answer: 'Sí. Ofrecemos alquiler de cabinas de sonido con micrófono y Bluetooth: Cabina de 8 pulgadas por $100.000 COP, o Cabina Profesional de 14 pulgadas de gran potencia por $250.000 COP.',
    category: 'Sonido'
  },
  {
    question: '¿Qué zonas cubren en Medellín y Antioquia?',
    answer: 'Cubrimos todo el Valle de Aburrá: Medellín (todas las comunas), Envigado, Sabaneta, Itagüí, Bello, La Estrella, Caldas, Copacabana y Girardota. También vamos al Oriente Antioqueño (Rionegro, Llanogrande, El Retiro, Guarne) y San Félix.',
    category: 'Cobertura'
  },
  {
    question: '¿Cómo funciona el paquete de Baby Shower y Recreación para Adultos?',
    answer: 'El Paquete Baby Shower tiene un valor de $300.000 COP por 3 horas con 1 recreacionista experto y transporte incluido en el Área Metropolitana. Incluye todos los materiales para juegos modernos y familiares, concursos musicales y animación de entrega de regalos.',
    category: 'Baby Shower'
  },
  {
    question: '¿Cómo puedo trabajar como recreacionista en Mega Recreación?',
    answer: '¡Nos encanta formar nuevos talentos! Realizamos capacitaciones presenciales todos los JUEVES a las 4:00 p. m. en el Salón de Banquetes Sarahy (Carrera 46 # 62-28, Medellín). Escríbenos al WhatsApp 319 718 8973 para unirte a nuestra comunidad de Telegram y asistir este jueves.',
    category: 'Academia Mega'
  },
  {
    question: '¿Con cuánto tiempo debo reservar y cómo se realiza el pago?',
    answer: 'Puedes pre-reservar desde nuestra web o directamente en las líneas de WhatsApp 319 718 8973 y 316 304 8505. Para asegurar fecha y hora solicitamos un abono del 30% a través de nuestra pasarela de pagos Wompi (tarjetas de crédito, débito, PSE, Nequi, Bancolombia) o transferencia, y el 70% restante se cancela el día del evento.',
    category: 'Reservas'
  }
];

export const METRICS = [
  { value: '+20 Años', label: 'De Experiencia', sublabel: 'Líderes en Medellín y Antioquia' },
  { value: '+5.000', label: 'Fiestas y Eventos', sublabel: 'Niños, Familias y Empresas Felices' },
  { value: '100%', label: 'Puntualidad Paisa', sublabel: 'Llegamos antes de tu evento' },
  { value: '4.9 ★', label: 'Calificación Real', sublabel: 'Respaldo y Confianza Total' }
];

export const MUNICIPALITIES = [
  'Medellín (Todas las Zonas)',
  'Envigado',
  'Sabaneta',
  'Itagüí',
  'Bello',
  'La Estrella',
  'Caldas',
  'Copacabana',
  'Girardota',
  'Rionegro & Oriente'
];

export const CHARACTERS_DISCLAIMER_NOTE = '✨ Los personajes infantiles y réplicas de lujo se alquilan exclusivamente por hora completa ($180.000 COP), con show musical, coreografías y fotos ilimitadas.';

export interface CharacterCategoryItem {
  id: string;
  name: string;
  emoji: string;
  badgeColor: string;
  characters: {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    popular?: boolean;
  }[];
}

export const CHARACTER_CATEGORIES: CharacterCategoryItem[] = [
  {
    id: 'infantiles',
    name: 'Infantiles',
    emoji: '👶',
    badgeColor: 'from-pink-500 to-rose-500',
    characters: [
      {
        id: 'peppa-pig',
        name: 'Peppa Pig',
        description: 'Ternura, juegos y rondas para los más pequeños',
        imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_peppa_pig_nina_torta_4anos.jpeg',
        popular: true
      },
      {
        id: 'plim-plim',
        name: 'Plim Plim',
        description: 'El payasito héroe del corazón con magia y canciones',
        imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/fiesta_infantil_plim_plim_ninas_circo.jpeg',
        popular: true
      },
      {
        id: 'lol-surprise',
        name: 'Muñeca LOL Surprise',
        description: 'Glamour, baile moderno y pasarela para las niñas',
        imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/delivery_lol_surprise_desayuno_feliz_cumple.jpeg',
        popular: true
      },
      {
        id: 'unicornio',
        name: 'Unicornio Mágico',
        description: 'Fantasía de colores, destellos y fotos encantadoras',
        imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_unicornio_nina_globo_feliz_cumple_01.jpeg'
      }
    ]
  },
  {
    id: 'disney-cuentos',
    name: 'Disney y Cuentos',
    emoji: '🏰',
    badgeColor: 'from-blue-500 to-indigo-600',
    characters: [
      {
        id: 'mickey-minnie',
        name: 'Mickey & Minnie Mouse',
        description: 'Los clásicos infaltables para primeros añitos y fiestas mágicas',
        imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_minnie_bebe_1ano_torta_mesa_roja.jpeg',
        popular: true
      },
      {
        id: 'elsa-olaf',
        name: 'Elsa & Olaf (Frozen)',
        description: 'Aventura congelada con las canciones favoritas de Disney',
        imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_elsa_frozen_nina_cumpleanera_emmy.jpeg',
        popular: true
      },
      {
        id: 'woody',
        name: 'Woody (Toy Story)',
        description: '¡Hay una serpiente en mi bota! Juegos vaqueros y diversión',
        imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_woody_toystory_ninos_torta_decoracion.jpeg',
        popular: true
      }
    ]
  },
  {
    id: 'superheroes-gamer',
    name: 'Superhéroes & Gamer',
    emoji: '🦸‍♂️',
    badgeColor: 'from-red-500 to-amber-500',
    characters: [
      {
        id: 'spiderman',
        name: 'Spiderman (Hombre Araña)',
        description: 'Acrobacias, entrenamiento de superhéroes y fotos épicas',
        imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_spiderman_nino_6anos_decoracion.jpeg',
        popular: true
      },
      {
        id: 'wonder-woman',
        name: 'Mujer Maravilla & Batman',
        description: 'Liga de la Justicia lista para la acción',
        imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/cumple_wonder_woman_animadora_nina_cargando_01.jpeg',
        popular: true
      },
      {
        id: 'mario-sonic',
        name: 'Mario Bros & Sonic',
        description: 'Competencias de videojuegos en la vida real',
        imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/fiesta_nocturna_woody_mario_minnie_chicas_01.jpeg',
        popular: true
      }
    ]
  },
  {
    id: 'paw-patrol',
    name: 'Paw Patrol & Navidad',
    emoji: '🐾',
    badgeColor: 'from-cyan-500 to-blue-600',
    characters: [
      {
        id: 'chase-skye',
        name: 'Chase & Skye (Paw Patrol)',
        description: '¡La patrulla canina lista para salvar el cumpleaños!',
        imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/delivery_chase_desayuno_sorpresa_feliz_dia.jpeg',
        popular: true
      },
      {
        id: 'santa-claus',
        name: 'Papá Noel / Santa Claus',
        description: 'Novenas navideñas y entrega de regalos en diciembre',
        imageUrl: 'https://vicflix.expandete.cloud/REPLICASMEGA/navidad_papa_noel_familia_merry_christmas.jpeg',
        popular: true
      }
    ]
  }
];

export const CHARACTERS_LIST = [
  'Paquete MEGA ($180.000 - 2.5h)',
  'Paquete MEGA MAX ($190.000 - Transporte + Hora Loca)',
  'Paquete MEGA FIESTA ($300.000 - 2 Recreacionistas + Transporte)',
  'Paquete MEGA ALEGRÍA ($800.000 - Recreación + Inflable 4h)',
  'MEGA PACK Todo Incluido ($1.550.000)',
  'Paquete BABY SHOWER ($300.000 - 3h)',
  'Recreación para Adultos & Hora Loca',
  'Pausa Activa 1h ($250.000 con Bafle)',
  'Pausa Activa 2h ($450.000 - 2 Recreadores + Bafle)',
  'Alquiler de Inflables ($520.000)',
  'Decoración Temática: Globos + Backing + Cilindros + Luces ($480.000)',
  'Cabina Sonido 8" ($100.000) / Cabina 14" ($250.000)',
  'Personaje Disney / Favorito 1 Hora ($180.000)',
  'Pasabocas y Comidas Rápidas'
];

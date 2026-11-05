export type ServiceCategory = 'todos' | 'infantil' | 'todo-incluido' | 'adultos-baby' | 'empresarial' | 'adicionales';

export interface ServiceItem {
  id: string;
  category?: ServiceCategory;
  title: string;
  subtitle: string;
  badge: string;
  priceText: string;
  priceNote?: string;
  description: string;
  mainImage: string;
  flyerImage?: string;
  galleryImages: { url: string; caption: string }[];
  features: string[];
  popularTag?: string;
  ctaText: string;
  whatsappMessage: string;
}

export type GalleryCategory = 'todos' | 'cumpleanos' | 'colegios' | 'navidad' | 'portafolio';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryName: string;
  imageUrl: string;
  description: string;
  tag: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  externalUrl?: string;
  platform?: 'mp4' | 'tiktok';
  badge: string;
  duration?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role: string;
  comment: string;
  stars: number;
  serviceType: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
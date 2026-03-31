import { Product } from './types';

export const PERFUMES: Product[] = [
  {
    id: '1',
    name: 'Nuit Étoilée',
    brand: 'UrbanVibe',
    price: 185,
    description: 'Una fragancia misteriosa que captura la esencia de una noche bajo las estrellas. Notas profundas de sándalo y jazmín nocturno.',
    notes: ['Jazmín', 'Sándalo', 'Ámbar'],
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    category: 'Oriental'
  },
  {
    id: '2',
    name: 'Aube Rosée',
    brand: 'UrbanVibe',
    price: 150,
    description: 'La frescura del amanecer en un jardín de rosas. Ligera, floral y eternamente elegante.',
    notes: ['Rosa de Mayo', 'Peonía', 'Almizcle Blanco'],
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    category: 'Floral'
  },
  {
    id: '3',
    name: 'Cédre Argenté',
    brand: 'UrbanVibe',
    price: 165,
    description: 'Una explosión de madera noble y especias frías. Para el espíritu audaz y sofisticado.',
    notes: ['Cedro', 'Pimienta Negra', 'Vetiver'],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    category: 'Amaderado'
  },
  {
    id: '4',
    name: 'Soleil d\'Or',
    brand: 'UrbanVibe',
    price: 140,
    description: 'Cítricos vibrantes bañados por el sol del Mediterráneo. Energía pura en cada gota.',
    notes: ['Bergamota', 'Neroli', 'Limón Siciliano'],
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
    category: 'Cítrico'
  }
];

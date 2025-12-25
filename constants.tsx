
import { VideoContent, BrandPartner } from './types';

export const VIDEO_DATA: VideoContent[] = [
  {
    id: 'auto-1',
    title: 'The Rush',
    category: 'Automotive',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920',
    videoUrl: 'automative2.mp4',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder
    description: 'A high-speed exploration of luxury  vehicles.'
  },
  {
    id: 'auto-2',
    title: 'Midnight Precision',
    category: 'Automotive',
    thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920',
    videoUrl: '/automative1.mp4',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder
    description: 'Showcasing the engineering marvel of contemporary supercars.'
  },
  {
    id: 'corp-1',
    title: 'Tech Summit 2024',
    category: 'Corporate',
    thumbnail: 'litmus_thumbnail.png',
    videoUrl: '/coperate1.mp4',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder
    description: 'Capturing the scale and innovation of Litmus7 summit.'
  },
  {
    id: 'concert-1',
    title: 'Echoes in the Dark',
    category: 'Concerts',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1920',
    videoUrl: '/concert1.mp4',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder
    description: 'The raw energy of live performance, captured cinematically.'
  }
];

export const BRANDS: BrandPartner[] = [
  { name: 'JK Tyres', logo: '/jk_tyres.png' },
  { name: 'Litmus7', logo: '/kia.png' },
  { name: 'KIA', logo: '/litmus_7.jpeg' },
  { name: 'Gokulam', logo: '/gokulam.png' }
];
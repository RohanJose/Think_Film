
import { VideoContent, BrandPartner } from './types';

export const VIDEO_DATA: VideoContent[] = [
  {
    id: 'auto-1',
    title: 'The Rush',
    category: 'Automotive',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920',
    videoUrl: 'automative2.webm',
    youtubeId: '9O5uwYhQGNw',
    description: 'A high-speed exploration of luxury vehicles.'
  },
  {
    id: 'auto-2',
    title: 'Midnight Precision',
    category: 'Automotive',
    thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920',
    videoUrl: '/automative1.webm',
    youtubeId: 'Jdk7xznnWhg',
    description: 'Showcasing the engineering marvel of contemporary supercars.'
  },
  {
    id: 'corp-1',
    title: 'Tech Summit 2024',
    category: 'Corporate',
    thumbnail: 'litmus_thumbnail.png',
    videoUrl: '/coperate1.webm',
    youtubeId: 'C9U7qmiFusw',
    description: 'Capturing the scale and innovation of Litmus7 summit.'
  },
  {
    id: 'concert-1',
    title: 'Echoes in the Dark',
    category: 'Concerts',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1920',
    videoUrl: '/concert1.webm',
    youtubeId: 'p774Dv6ndLc',
    description: 'The raw energy of live performance, captured cinematically.'
  }
];

export interface ShowcaseItem {
  id: string;
  title: string;
  isPortrait?: boolean;
}

export const YOUTUBE_SHOWCASE: Record<string, ShowcaseItem[]> = {
  Automotive: [


    { id: 'uJRZrJurAk0', title: 'Vertical Rush', isPortrait: true }, // Added portrait reference
  
    { id: 'udmrIsmHEhQ', title: 'Kia' },
    { id: 'LD2rHiyYRUk', title: 'Energy' },
   
  ],
  Corporate: [
    { id: 'ihaqSJmFrJs', title: 'Kia' },
    { id: 'C9U7qmiFusw', title: 'Litmus 7' },
    
    
  ],
  Concerts: [
    { id: 'LY2nzfCvfn4', title: 'Bacardi Event', isPortrait: true },
    { id: 'p774Dv6ndLc', title: 'Electric Energy' },

 
    { id: 'nZ3xYJwOE0c', title: 'Live Vision' }
  ]
};

export const BRANDS: BrandPartner[] = [
  { name: 'JK Tyres', logo: '/jk_tyres.png' },
  { name: 'Litmus7', logo: '/kia.png' },
  { name: 'KIA', logo: '/litmus_7.jpeg' },
  { name: 'Gokulam', logo: '/gokulam.png' },
  { name: 'bacardi', logo: '/bacardi.png' },
  { name: 'spotify', logo: '/spotify_logo.jpg' },
  { name: 'Moonlight', logo: '/moonlight.png' },
  { name: 'Ritu', logo: '/ritu_logo.png' }
];

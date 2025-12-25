
export interface VideoContent {
  id: string;
  title: string;
  category: 'Automotive' | 'Corporate' | 'Concerts';
  thumbnail: string;
  videoUrl: string;
  description: string;
  youtubeId?: string; // Optional field for YouTube embeds
}

export interface BrandPartner {
  name: string;
  logo: string;
}
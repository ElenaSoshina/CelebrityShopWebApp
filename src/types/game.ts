export interface GameImage {
  imageUrl: string;
}

export interface GameItem {
  name: string;
  type: string;
  region: string;
  details: string;
  price: number;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  instruction: string;
  images: GameImage[];
  items: GameItem[];
  category: 'pc' | 'shooter' | 'supersell';
} 
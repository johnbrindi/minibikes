export interface Bike {
  id: string;
  name: string;
  shortName?: string;
  color: string;
  description: string;
  price: number;
  image: string;
  images: string[];
}

export interface Review {
  text: string;
  author: string;
  location: string;
  stars: number;
}

export interface Part {
  id: string;
  name: string;
  price: number;
  category: string;
}
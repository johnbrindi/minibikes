import { Bike, Review, Part } from './types';

export const BIKES: Bike[] = [
  { id: 'lil-hustler', name: 'Built to order: Lil\' Hustler Minibike', shortName: 'Lil Hustler', color: '#e8b800', description: 'The original handcrafted', price: 1200, image: '/pictures/bike.jpeg', images: ['/pictures/bike.jpeg', '/pictures/bike-side-view.jpeg', '/pictures/bike1.jpeg', '/pictures/bike1-compplete-view.jpeg', '/pictures/bike1-back-view.jpeg'] },
  { id: 'hustler-v200-chopper', name: 'Hustler V200 Chopper', shortName: 'Hustler Customs', color: '#8B2FC9', description: 'Beast on wheels with extra grip.', price: 1400, image: '/pictures/purple-bike.jpeg', images: ['/pictures/purple-bike.jpeg', '/pictures/purple-bike-side-view.jpeg', '/pictures/purple-bike-back-view.jpeg'] },
  { id: 'hustler-badboy-chopper', name: 'Built to order: Hustler Badboy Chopper', shortName: 'Hustler Badboy Chopper', color: '#c0392b', description: 'A timeless vintage stance.', price: 1350, image: '/pictures/color-bike.jpeg', images: ['/pictures/color-bike.jpeg', '/pictures/color-bike-side-view.jpeg', '/pictures/color-bike-engine-view.jpeg', '/pictures/color-bike-back-view.jpeg'] },
  { id: 'hustler-fatboy', name: 'Built to order: Hustler Fatboy', shortName: 'Hustler Fatboy', color: '#2c7a4b', description: 'Born to run wild and free.', price: 1300, image: '/pictures/orange-bike-top-view.jpeg', images: ['/pictures/orange-bike-top-view.jpeg', '/pictures/orange-bike-front-view.jpeg'] },
];

export const REVIEWS: Review[] = [
  { text: 'Met Tim at Kumeu Hotrod Show, bought Lil Hustler for grandson but enjoys it himself', author: 'Jack P.', location: 'Auckland', stars: 5 },
  { text: 'Bought three bikes, used as corporate gift. Amazing build quality and attention to detail.', author: 'Sarah W.', location: 'Sydney, AU', stars: 5 },
  { text: 'Fatboy arrived well packaged, ready to ride in minutes. Best weekend toy ever.', author: 'Mike T.', location: 'Los Angeles, USA', stars: 5 },
  { text: 'Absolutely love my new Hustler Customs bike! The color is stunning and it rides incredibly smooth.', author: 'Emma R.', location: 'Miami, FL', stars: 5 },
  { text: 'Great customer service and fast shipping. The bike was exactly as described.', author: 'David L.', location: 'Houston, TX', stars: 5 },
  { text: 'Purchased the Badboy Chopper and it exceeded all expectations. The vintage look is awesome.', author: 'Chris M.', location: 'Chicago, IL', stars: 5 },
];

export const PARTS: Part[] = [
  { id: 'perf-exhaust', name: 'Performance Exhaust', price: 120, category: 'Engine' },
  { id: 'upgrade-seat', name: 'Upgrade Seat Kit', price: 85, category: 'Body' },
  { id: 'racing-tyres', name: 'Racing Tyres (Pair)', price: 140, category: 'Wheels' },
  { id: 'air-filter', name: 'High-Flow Air Filter', price: 45, category: 'Engine' },
  { id: 'headlight-kit', name: 'LED Headlight Kit', price: 95, category: 'Lighting' },
  { id: 'throttle-cable', name: 'Heavy Duty Throttle Cable', price: 30, category: 'Controls' },
];
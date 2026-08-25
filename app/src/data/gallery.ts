export interface GalleryImage {
  id: string;
  src: string;
  category: 'food' | 'drinks' | 'ambiance';
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  { id: '1', src: '/images/dish-mezze.jpg', category: 'food', alt: 'Mediterranean mezze platter' },
  { id: '2', src: '/images/dish-couscous.jpg', category: 'food', alt: 'Algerian couscous' },
  { id: '3', src: '/images/gallery-3.jpg', category: 'drinks', alt: 'Cocktail being poured' },
  { id: '4', src: '/images/gallery-4.jpg', category: 'ambiance', alt: 'Restaurant interior' },
  { id: '5', src: '/images/dish-tagine.jpg', category: 'food', alt: 'Seafood tagine' },
  { id: '6', src: '/images/gallery-6.jpg', category: 'ambiance', alt: 'Outdoor terrace dining' },
  { id: '7', src: '/images/gallery-1.jpg', category: 'food', alt: 'Mediterranean feast spread' },
  { id: '8', src: '/images/gallery-2.jpg', category: 'food', alt: 'Traditional couscous dish' },
  { id: '9', src: '/images/reservation-dining.jpg', category: 'ambiance', alt: 'Elegant dining room' },
  { id: '10', src: '/images/gallery-5.jpg', category: 'food', alt: 'Steaming seafood tagine' },
  { id: '11', src: '/images/menu-cocktails.jpg', category: 'drinks', alt: 'Craft cocktails' },
  { id: '12', src: '/images/story-dining.jpg', category: 'ambiance', alt: 'Mediterranean outdoor dining' },
];

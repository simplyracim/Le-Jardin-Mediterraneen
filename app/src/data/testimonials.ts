export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'An unforgettable evening! The Mediterranean mezze platter was incredible, and the Algerian couscous melted in your mouth.',
    author: 'Sarah M.',
    date: '12/25/2025',
  },
  {
    id: '2',
    quote: 'The private event we hosted here was perfect. The staff made everything seamless.',
    author: 'James T.',
    date: '12/10/2025',
  },
  {
    id: '3',
    quote: 'Best Mediterranean restaurant in Montreal. The flavors are authentic, and the ambiance is warm and inviting.',
    author: 'Emily R.',
    date: '11/28/2025',
  },
  {
    id: '4',
    quote: 'We celebrated our anniversary here, and it was magical. The wine selection is exceptional.',
    author: 'Michael & Anna L.',
    date: '11/15/2025',
  },
  {
    id: '5',
    quote: 'From the cocktails to the dessert, every course was a journey. Highly recommend!',
    author: 'David K.',
    date: '10/30/2025',
  },
  {
    id: '6',
    quote: "The chef's tasting menu was an extraordinary experience. We'll be back!",
    author: 'Sophie B.',
    date: '10/18/2025',
  },
];

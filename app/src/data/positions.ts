export interface JobPosition {
  id: string;
  title: string;
  type: string;
  description: string;
}

export const positions: JobPosition[] = [
  {
    id: 'line-cook',
    title: 'Line Cook',
    type: 'Full-time',
    description: 'Join our kitchen team and help create authentic Mediterranean and Algerian dishes. Experience in a fast-paced kitchen environment required.',
  },
  {
    id: 'server',
    title: 'Server / Waitstaff',
    type: 'Part-time / Full-time',
    description: 'Provide exceptional dining experiences to our guests. Knowledge of Mediterranean cuisine and beverages is an asset.',
  },
  {
    id: 'bartender',
    title: 'Beverage Specialist / Barista',
    type: 'Part-time',
    description: 'Craft specialty mocktails, coffees, and teas, and serve beverages with flair. Experience with Mediterranean-inspired specialty drinks preferred.',
  },
  {
    id: 'dishwasher',
    title: 'Dishwasher / Prep Cook',
    type: 'Full-time',
    description: 'Support our kitchen team with food preparation and dishwashing duties. No experience necessary — training provided.',
  },
];

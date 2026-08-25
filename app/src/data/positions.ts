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
    description: 'Provide exceptional dining experiences to our guests. Knowledge of Mediterranean cuisine and wine is an asset.',
  },
  {
    id: 'bartender',
    title: 'Bartender',
    type: 'Part-time',
    description: 'Craft cocktails and serve beverages with flair. Experience with Mediterranean-inspired cocktails preferred.',
  },
  {
    id: 'dishwasher',
    title: 'Dishwasher / Prep Cook',
    type: 'Full-time',
    description: 'Support our kitchen team with food preparation and dishwashing duties. No experience necessary — training provided.',
  },
];

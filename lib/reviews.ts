export type Review = {
  name: string;
  rating: number;
  quote: string;
};

export const reviews: Review[] = [
  {
    name: 'Ananya Mehta',
    rating: 5,
    quote:
      'ORIS lasts from morning meetings through evening — a quiet, citrus warmth that feels expensive without trying. I have already ordered a second bottle.',
  },
  {
    name: 'Rahul Nair',
    rating: 5,
    quote:
      'Hala Paris is the scent I reach for before I leave the house. Floral, polished, and still very much me. People ask what I am wearing every time.',
  },
  {
    name: 'Sara Joseph',
    rating: 5,
    quote:
      'I wanted everyday luxury in a size I would actually finish. The 20 ml bottles are perfect, and From Heavens has become my signature.',
  },
  {
    name: 'Vikram Shah',
    rating: 4,
    quote:
      'Royal Berry is richer than I expected for the price. It sits close to the skin in a way that feels intimate rather than loud. Beautifully made.',
  },
  {
    name: 'Meera Iyer',
    rating: 5,
    quote:
      'MARJ is woods and quiet confidence. I wear it to dinner and still catch it on my scarf the next morning. i-BAN understands lasting elegance.',
  },
];

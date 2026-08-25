export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  tags?: ('V' | 'GF')[];
  image?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  description: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'appetizers',
    title: 'Appetizers',
    description: 'Start your meal with our selection of Mediterranean and Algerian-inspired appetizers.',
    items: [
      { id: 'mezze', name: 'Mediterranean Mezze Platter', description: 'Hummus, baba ganoush, falafel, marinated olives & warm pita.', price: 24, tags: ['V'] },
      { id: 'briouats', name: 'Algerian Briouats', description: 'Crispy phyllo pastries stuffed with spiced minced meat or vegetables.', price: 16 },
      { id: 'halloumi', name: 'Grilled Halloumi Salad', description: 'Pan-seared halloumi, cherry tomatoes, cucumber & pomegranate dressing.', price: 18, tags: ['V', 'GF'] },
      { id: 'harira', name: 'Harira Soup', description: 'Traditional Algerian tomato-based soup with lentils, chickpeas & fresh herbs.', price: 12 },
      { id: 'grape-leaves', name: 'Stuffed Grape Leaves', description: 'Grape leaves filled with rice, pine nuts, herbs & lemon.', price: 14, tags: ['V', 'GF'] },
      { id: 'merguez', name: 'Spicy Merguez Sausages', description: 'Grilled Algerian lamb sausages with harissa & grilled bread.', price: 17 },
      { id: 'calamari', name: 'Fried Calamari', description: 'Crispy calamari with garlic aioli & lemon.', price: 19 },
      { id: 'baba-ganoush', name: 'Baba Ganoush', description: 'Smoky charred eggplant dip with tahini, garlic & olive oil.', price: 13, tags: ['V', 'GF'] },
    ],
  },
  {
    id: 'soups-salads',
    title: 'Soups & Salads',
    description: 'Fresh and flavourful options for a lighter start.',
    items: [
      { id: 'harira-soup', name: 'Harira Soup', description: 'Traditional Moroccan-Algerian soup with tomatoes, lentils, chickpeas & fragrant spices.', price: 12 },
      { id: 'seafood-soup', name: 'Mediterranean Seafood Soup', description: 'A rich broth with mussels, shrimp, calamari & fresh herbs.', price: 16 },
      { id: 'fattoush', name: 'Fattoush Salad', description: 'Mixed greens, tomatoes, cucumber, radish, crispy pita & sumac dressing.', price: 15, tags: ['V'] },
      { id: 'chicken-salad', name: 'Grilled Chicken Salad', description: 'Marinated grilled chicken, avocado, mixed greens & lemon vinaigrette.', price: 18, tags: ['GF'] },
      { id: 'beet-salad', name: 'Roasted Beet & Goat Cheese Salad', description: 'Roasted beets, creamy goat cheese, walnuts & balsamic glaze.', price: 17, tags: ['V', 'GF'] },
      { id: 'tabbouleh', name: 'Tabbouleh', description: 'Fresh parsley, bulgur, tomato, mint, lemon juice & olive oil.', price: 14, tags: ['V'] },
    ],
  },
  {
    id: 'pasta',
    title: 'Pasta',
    description: 'Handcrafted pasta with Mediterranean flair.',
    items: [
      { id: 'seafood-linguine', name: 'Seafood Linguine', description: 'Linguine pasta with shrimp, mussels, calamari & cherry tomatoes in garlic white wine sauce.', price: 28 },
      { id: 'lamb-ragu', name: 'Lamb Ragu Pappardelle', description: 'Slow-cooked lamb ragu with wide pappardelle & parmesan.', price: 26 },
      { id: 'truffle-risotto', name: 'Truffle Mushroom Risotto', description: 'Creamy Arborio rice, wild mushrooms, truffle oil & parmesan.', price: 24, tags: ['V', 'GF'] },
      { id: 'arrabbiata', name: 'Penne Arrabbiata', description: 'Penne pasta in spicy tomato sauce with garlic & chili flakes.', price: 20, tags: ['V'] },
    ],
  },
  {
    id: 'pizza',
    title: 'Pizza',
    description: 'Wood-fired pizzas with authentic Mediterranean toppings.',
    items: [
      { id: 'margherita', name: 'Margherita Pizza', description: 'Tomato sauce, fresh mozzarella, basil & olive oil.', price: 18, tags: ['V'] },
      { id: 'med-pizza', name: 'Mediterranean Pizza', description: 'Hummus base, roasted vegetables, feta cheese, olives & oregano.', price: 22, tags: ['V'] },
      { id: 'merguez-pizza', name: 'Lamb Merguez Pizza', description: 'Spiced lamb sausage, roasted peppers, caramelized onions & harissa drizzle.', price: 24 },
      { id: 'seafood-pizza', name: 'Seafood Pizza', description: 'Garlic cream base, shrimp, calamari, mussels, capers & fresh parsley.', price: 26 },
    ],
  },
  {
    id: 'couscous',
    title: 'Couscous',
    description: 'Traditional Algerian couscous, steamed to perfection.',
    items: [
      { id: 'lamb-couscous', name: 'Lamb Couscous', description: 'Steamed semolina with tender lamb, chickpeas, carrots, zucchini & aromatic broth.', price: 28 },
      { id: 'chicken-couscous', name: 'Chicken Couscous', description: 'Steamed semolina with roasted chicken, turnips, cabbage & raisins.', price: 26 },
      { id: 'veg-couscous', name: 'Vegetable Couscous', description: 'Steamed semolina with seasonal roasted vegetables & harissa.', price: 22, tags: ['V'] },
      { id: 'royal-couscous', name: 'Royal Couscous', description: 'Steamed semolina with lamb, chicken, merguez & mixed vegetables.', price: 32 },
    ],
  },
  {
    id: 'tagines',
    title: 'Tagines',
    description: 'Slow-cooked in traditional clay pots for deep, rich flavours.',
    items: [
      { id: 'lamb-prune', name: 'Lamb & Prune Tagine', description: 'Tender lamb, sweet prunes, caramelized onions & toasted almonds.', price: 30 },
      { id: 'chicken-lemon', name: 'Chicken Lemon & Olive Tagine', description: 'Chicken thighs, preserved lemon, green olives & saffron broth.', price: 28 },
      { id: 'veg-tagine', name: 'Vegetable Tagine', description: 'Seasonal vegetables, chickpeas, apricots & aromatic spices.', price: 24, tags: ['V'] },
      { id: 'beef-apricot', name: 'Beef & Apricot Tagine', description: 'Slow-cooked beef, dried apricots, cinnamon & sesame seeds.', price: 29 },
      { id: 'fish-tagine', name: 'Fish Tagine', description: 'White fish, potatoes, tomatoes, peppers & charmoula sauce.', price: 27 },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    description: 'Sweet finishes inspired by Mediterranean and Algerian traditions.',
    items: [
      { id: 'baklava', name: 'Baklava', description: 'Layers of crispy phyllo, honey & pistachios.', price: 12 },
      { id: 'kaab-ghazal', name: 'Almond Gazelle Horns (Kaab El Ghazal)', description: 'Traditional Algerian crescent pastries filled with almond paste.', price: 11 },
      { id: 'mhalbi', name: 'Mhalbi', description: 'Algerian rice pudding with rose water, garnished with pistachios & dried rose petals.', price: 10 },
      { id: 'fondant', name: 'Chocolate Fondant', description: 'Warm chocolate lava cake with vanilla ice cream.', price: 14 },
      { id: 'fruit-salad', name: 'Fresh Fruit Salad', description: 'Seasonal fruits with orange blossom water & mint.', price: 10, tags: ['V', 'GF'] },
    ],
  },
  {
    id: 'beverages',
    title: 'Beverages',
    description: 'Handcrafted cocktails, curated wines & refreshing non-alcoholic beverages.',
    items: [
      { id: 'sangria', name: 'Mediterranean Sangria', description: 'Red wine, orange liqueur, fresh fruits & a touch of cinnamon.', price: 14 },
      { id: 'mint-mojito', name: 'Algerian Mint Mojito', description: 'White rum, fresh mint, lime, sugar & soda water.', price: 13 },
      { id: 'rose-lemonade', name: 'Rose Lemonade', description: 'House-made lemonade with rose water & pomegranate seeds.', price: 8 },
      { id: 'turkish-coffee', name: 'Turkish Coffee', description: 'Traditional dark coffee brewed with cardamom.', price: 6 },
      { id: 'red-wine', name: 'House Red Wine (Glass)', description: 'A selection of Mediterranean reds.', price: 12 },
      { id: 'white-wine', name: 'House White Wine (Glass)', description: 'Crisp, refreshing whites from the region.', price: 12 },
      { id: 'mint-tea', name: 'Algerian Mint Tea', description: 'Fresh mint tea served in traditional glasses.', price: 7 },
      { id: 'sparkling-water', name: 'Sparkling Water', description: 'Premium sparkling mineral water.', price: 5 },
    ],
  },
];

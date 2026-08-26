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
      { id: 'mezze', name: 'Mediterranean Mezze Platter', description: 'Hummus, baba ganoush, falafel, marinated olives & warm pita.', price: 3600, tags: ['V'], image: '/images/dish-mezze.jpg' },
      { id: 'briouats', name: 'Algerian Briouats', description: 'Crispy phyllo pastries stuffed with spiced minced meat or vegetables.', price: 2400, image: 'https://loremflickr.com/600/400/pastry,food?lock=1001' },
      { id: 'halloumi', name: 'Grilled Halloumi Salad', description: 'Pan-seared halloumi, cherry tomatoes, cucumber & pomegranate dressing.', price: 2700, tags: ['V', 'GF'], image: 'https://loremflickr.com/600/400/salad,food?lock=1002' },
      { id: 'harira', name: 'Harira Soup', description: 'Traditional Algerian tomato-based soup with lentils, chickpeas & fresh herbs.', price: 1800, image: '/images/harira-soup.png' },
      { id: 'grape-leaves', name: 'Stuffed Grape Leaves', description: 'Grape leaves filled with rice, pine nuts, herbs & lemon.', price: 2100, tags: ['V', 'GF'], image: 'https://loremflickr.com/600/400/mezze,food?lock=1004' },
      { id: 'merguez', name: 'Spicy Merguez Sausages', description: 'Grilled Algerian lamb sausages with harissa & grilled bread.', price: 2550, image: 'https://images.unsplash.com/photo-1544025162-83161c9441a1?w=600&q=80' },
      { id: 'calamari', name: 'Fried Calamari', description: 'Crispy calamari with garlic aioli & lemon.', price: 2850, image: 'https://loremflickr.com/600/400/calamari,food?lock=1006' },
      { id: 'baba-ganoush', name: 'Baba Ganoush', description: 'Smoky charred eggplant dip with tahini, garlic & olive oil.', price: 1950, tags: ['V', 'GF'], image: 'https://loremflickr.com/600/400/mezze,food?lock=1007' },
    ],
  },
  {
    id: 'soups-salads',
    title: 'Soups & Salads',
    description: 'Fresh and flavourful options for a lighter start.',
    items: [
      { id: 'harira-soup', name: 'Harira Soup', description: 'Traditional Moroccan-Algerian soup with tomatoes, lentils, chickpeas & fragrant spices.', price: 1800, image: '/images/harira-soup.png' },
      { id: 'seafood-soup', name: 'Mediterranean Seafood Soup', description: 'A rich broth with mussels, shrimp, calamari & fresh herbs.', price: 2400, image: 'https://loremflickr.com/600/400/soup,food?lock=1009' },
      { id: 'fattoush', name: 'Fattoush Salad', description: 'Mixed greens, tomatoes, cucumber, radish, crispy pita & sumac dressing.', price: 2250, tags: ['V'], image: 'https://loremflickr.com/600/400/salad,food?lock=1010' },
      { id: 'chicken-salad', name: 'Grilled Chicken Salad', description: 'Marinated grilled chicken, avocado, mixed greens & lemon vinaigrette.', price: 2700, tags: ['GF'], image: 'https://loremflickr.com/600/400/salad,food?lock=1011' },
      { id: 'beet-salad', name: 'Roasted Beet & Goat Cheese Salad', description: 'Roasted beets, creamy goat cheese, walnuts & balsamic glaze.', price: 2550, tags: ['V', 'GF'], image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&q=80' },
      { id: 'tabbouleh', name: 'Tabbouleh', description: 'Fresh parsley, bulgur, tomato, mint, lemon juice & olive oil.', price: 2100, tags: ['V'], image: 'https://images.unsplash.com/photo-1621510456681-23a23cfb5f57?w=600&q=80' },
    ],
  },
  {
    id: 'pasta',
    title: 'Pasta',
    description: 'Handcrafted pasta with Mediterranean flair.',
    items: [
      { id: 'seafood-linguine', name: 'Seafood Linguine', description: 'Linguine pasta with shrimp, mussels, calamari & cherry tomatoes in garlic lemon herb sauce.', price: 4200, image: 'https://loremflickr.com/600/400/pasta,food?lock=1014' },
      { id: 'lamb-ragu', name: 'Lamb Ragu Pappardelle', description: 'Slow-cooked lamb ragu with wide pappardelle & parmesan.', price: 3900, image: 'https://loremflickr.com/600/400/pasta,food?lock=1015' },
      { id: 'truffle-risotto', name: 'Truffle Mushroom Risotto', description: 'Creamy Arborio rice, wild mushrooms, truffle oil & parmesan.', price: 3600, tags: ['V', 'GF'], image: 'https://loremflickr.com/600/400/risotto,food?lock=1016' },
      { id: 'arrabbiata', name: 'Penne Arrabbiata', description: 'Penne pasta in spicy tomato sauce with garlic & chili flakes.', price: 3000, tags: ['V'], image: 'https://loremflickr.com/600/400/pasta,food?lock=1017' },
    ],
  },
  {
    id: 'pizza',
    title: 'Pizza',
    description: 'Wood-fired pizzas with authentic Mediterranean toppings.',
    items: [
      { id: 'margherita', name: 'Margherita Pizza', description: 'Tomato sauce, fresh mozzarella, basil & olive oil.', price: 2700, tags: ['V'], image: '/images/margherita-pizza.png' },
      { id: 'med-pizza', name: 'Mediterranean Pizza', description: 'Hummus base, roasted vegetables, feta cheese, olives & oregano.', price: 3300, tags: ['V'], image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&q=80' },
      { id: 'merguez-pizza', name: 'Lamb Merguez Pizza', description: 'Spiced lamb sausage, roasted peppers, caramelized onions & harissa drizzle.', price: 3600, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=80' },
      { id: 'seafood-pizza', name: 'Seafood Pizza', description: 'Garlic cream base, shrimp, calamari, mussels, capers & fresh parsley.', price: 3900, image: 'https://images.unsplash.com/photo-1576458088443-04a19bb13da6?w=600&q=80' },
    ],
  },
  {
    id: 'couscous',
    title: 'Couscous',
    description: 'Traditional Algerian couscous, steamed to perfection.',
    items: [
      { id: 'lamb-couscous', name: 'Lamb Couscous', description: 'Steamed semolina with tender lamb, chickpeas, carrots, zucchini & aromatic broth.', price: 4200, image: '/images/dish-couscous.jpg' },
      { id: 'chicken-couscous', name: 'Chicken Couscous', description: 'Steamed semolina with roasted chicken, turnips, cabbage & raisins.', price: 3900, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80' },
      { id: 'veg-couscous', name: 'Vegetable Couscous', description: 'Steamed semolina with seasonal roasted vegetables & harissa.', price: 3300, tags: ['V'], image: 'https://loremflickr.com/600/400/couscous,food?lock=1024' },
      { id: 'royal-couscous', name: 'Royal Couscous', description: 'Steamed semolina with lamb, chicken, merguez & mixed vegetables.', price: 4800, image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&q=80' },
    ],
  },
  {
    id: 'tagines',
    title: 'Tagines',
    description: 'Slow-cooked in traditional clay pots for deep, rich flavours.',
    items: [
      { id: 'lamb-prune', name: 'Lamb & Prune Tagine', description: 'Tender lamb, sweet prunes, caramelized onions & toasted almonds.', price: 4500, image: 'https://loremflickr.com/600/400/tagine,food?lock=1026' },
      { id: 'chicken-lemon', name: 'Chicken Lemon & Olive Tagine', description: 'Chicken thighs, preserved lemon, green olives & saffron broth.', price: 4200, image: 'https://loremflickr.com/600/400/tagine,food?lock=1027' },
      { id: 'veg-tagine', name: 'Vegetable Tagine', description: 'Seasonal vegetables, chickpeas, apricots & aromatic spices.', price: 3600, tags: ['V'], image: 'https://loremflickr.com/600/400/tagine,food?lock=1028' },
      { id: 'beef-apricot', name: 'Beef & Apricot Tagine', description: 'Slow-cooked beef, dried apricots, cinnamon & sesame seeds.', price: 4350, image: 'https://loremflickr.com/600/400/tagine,food?lock=1029' },
      { id: 'fish-tagine', name: 'Fish Tagine', description: 'White fish, potatoes, tomatoes, peppers & charmoula sauce.', price: 4050, image: 'https://loremflickr.com/600/400/tagine,food?lock=1030' },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    description: 'Sweet finishes inspired by Mediterranean and Algerian traditions.',
    items: [
      { id: 'baklava', name: 'Baklava', description: 'Layers of crispy phyllo, honey & pistachios.', price: 1800, image: 'https://loremflickr.com/600/400/dessert,food?lock=1031' },
      { id: 'kaab-ghazal', name: 'Almond Gazelle Horns (Kaab El Ghazal)', description: 'Traditional Algerian crescent pastries filled with almond paste.', price: 1650, image: 'https://loremflickr.com/600/400/dessert,food?lock=1032' },
      { id: 'mhalbi', name: 'Mhalbi', description: 'Algerian rice pudding with rose water, garnished with pistachios & dried rose petals.', price: 1500, image: 'https://loremflickr.com/600/400/dessert,food?lock=1033' },
      { id: 'fondant', name: 'Chocolate Fondant', description: 'Warm chocolate lava cake with vanilla ice cream.', price: 2100, image: 'https://loremflickr.com/600/400/dessert,food?lock=1034' },
      { id: 'fruit-salad', name: 'Fresh Fruit Salad', description: 'Seasonal fruits with orange blossom water & mint.', price: 1500, tags: ['V', 'GF'], image: 'https://loremflickr.com/600/400/salad,food?lock=1035' },
    ],
  },
  {
    id: 'beverages',
    title: 'Beverages',
    description: 'Handcrafted mocktails, traditional coffees & refreshing juices.',
    items: [
      { id: 'pomegranate-fizzer', name: 'Pomegranate Mocktail', description: 'Fresh pomegranate juice, lime, sparkling water & wild mint.', price: 1500, image: 'https://loremflickr.com/600/400/drink,beverage?lock=1036' },
      { id: 'mint-mojito', name: 'Algerian Virgin Mint Mojito', description: 'Fresh mint, lime, organic sugar, orange blossom water & sparkling water.', price: 1950, image: 'https://loremflickr.com/600/400/drink,beverage?lock=1037' },
      { id: 'rose-lemonade', name: 'Rose Lemonade', description: 'House-made lemonade with rose water & pomegranate seeds.', price: 1200, image: 'https://loremflickr.com/600/400/drink,beverage?lock=1038' },
      { id: 'turkish-coffee', name: 'Turkish Coffee', description: 'Traditional dark coffee brewed with cardamom.', price: 900, image: 'https://loremflickr.com/600/400/coffee,tea?lock=1039' },
      { id: 'apricot-nectar', name: 'Spiced Apricot Nectar', description: 'Slow-simmered apricot juice with cardamom, cinnamon & orange blossom.', price: 1350, image: 'https://loremflickr.com/600/400/drink,beverage?lock=1040' },
      { id: 'mint-tea', name: 'Algerian Mint Tea', description: 'Fresh mint tea served in traditional glasses.', price: 1050, image: 'https://loremflickr.com/600/400/coffee,tea?lock=1042' },
      { id: 'sparkling-water', name: 'Sparkling Water', description: 'Premium sparkling mineral water.', price: 750, image: 'https://loremflickr.com/600/400/drink,beverage?lock=1043' },
    ],
  },
];

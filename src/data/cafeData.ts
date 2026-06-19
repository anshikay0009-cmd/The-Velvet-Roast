/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, CafeTable, UGCPost } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE SECTION
  {
    id: 'charcoal-latte',
    name: 'Activated Charcoal Rose Latte',
    description: 'Espresso with edible charcoal, premium house-crafted Bulgarian rose syrup, and silky oat milk. Rich, dramatic slate color.',
    price: 6.75,
    category: 'coffee',
    rating: 9.8,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegan', 'Signature'],
    prepTime: '4 mins'
  },
  {
    id: 'golden-espresso',
    name: 'Aura Golden Turmeric Espresso',
    description: 'Double shot of volcanic single-origin espresso, spiced turmeric syrup, honey, steamed almond milk, and edible gold flakes.',
    price: 6.50,
    category: 'coffee',
    rating: 9.5,
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=600',
    tags: ['Organic', 'Gluten-Free'],
    prepTime: '3 mins'
  },
  {
    id: 'maple-cold-brew',
    name: 'Salted Maple Cold Foam Brew',
    description: '24-hour cold steep topped with a dense cloud of salted maple cold foam. Garnished with cracked pink peppercorn.',
    price: 6.25,
    category: 'coffee',
    rating: 9.6,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    tags: ['Organic', 'Refined-Sugar-Free'],
    prepTime: '2 mins'
  },
  {
    id: 'pistachio-shakerato',
    name: 'Aegean Pistachio Shakerato',
    description: 'Espresso shaken with ice and handcrafted pistachio syrup, served straight up with a crushed salted-pistachio rim.',
    price: 7.00,
    category: 'coffee',
    rating: 9.7,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
    tags: ['Signature', 'Refined-Sugar-Free'],
    prepTime: '4 mins'
  },

  // BAKERY SECTION
  {
    id: 'almond-croissant',
    name: 'Twice-Baked Almond Frangipane Croissant',
    description: 'Unbelievably flakey butter croissant filled with a luscious cardamom almond paste, topped with sliced toasted almonds.',
    price: 5.75,
    category: 'bakery',
    rating: 9.6,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    tags: ['Signature'],
    prepTime: '2 mins'
  },
  {
    id: 'matcha-cruffin',
    name: 'Uji Matcha Lava Cruffin',
    description: 'Croissant-muffin hybrid outer puff dusted in pure organic Kyoto matcha, filled with dripping sweet white chocolate cream.',
    price: 6.25,
    category: 'bakery',
    rating: 9.9,
    image: 'https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?auto=format&fit=crop&q=80&w=600',
    tags: ['Best-Seller'],
    prepTime: '2 mins'
  },
  {
    id: 'fig-tart',
    name: 'Fresh Fig & Whipped Goat Cheese Tart',
    description: 'Artisanal spelt honey pastry rimmed with crumbled organic goat cheese, layered with dynamic local purple figs and fresh rosemary.',
    price: 7.50,
    category: 'bakery',
    rating: 9.3,
    image: 'https://images.unsplash.com/photo-1508737804141-4c3b688e2546?auto=format&fit=crop&q=80&w=600',
    tags: ['Organic'],
    prepTime: '3 mins'
  },

  // MAINS SECTION
  {
    id: 'truffle-avocado',
    name: 'Truffled Smashed Avocado Toast',
    description: 'Charred seed-dense sourdough, crushed avocado cream, heirloom micro-greens, edible flower confetti, and hot white truffle oil drizzle.',
    price: 14.50,
    category: 'mains',
    rating: 9.7,
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegan', 'Signature', 'Best-Seller'],
    prepTime: '8 mins'
  },
  {
    id: 'harissa-bowl',
    name: 'Superfood Harissa Garden Bowl',
    description: 'Sprouted quinoa, hand-massaged purple kale, crunchy harissa chickpeas, beetroot hummus, lemon-tahini massage, and baked herb falafel.',
    price: 15.00,
    category: 'mains',
    rating: 9.4,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegan', 'Gluten-Free', 'Organic'],
    prepTime: '10 mins'
  },
  {
    id: 'eggs-brioche',
    name: 'Chili-Crisp Folded Eggs Brioche',
    description: 'Slow-scrambled, soufflé-textured organic pasture eggs over a toasted home-baked fluffy brioche crown, loaded with crispy house Sichuan chili crunch.',
    price: 13.50,
    category: 'mains',
    rating: 9.5,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600',
    tags: ['Best-Seller'],
    prepTime: '7 mins'
  },

  // DESSERTS SECTION
  {
    id: 'cardamom-creme',
    name: 'Espresso Cardamom Crème Brûlée',
    description: 'Luxuriously smooth espresso and cardamom egg custard, finished with an incredibly glassy torched sugar crust and garden-fresh berries.',
    price: 9.00,
    category: 'desserts',
    rating: 9.4,
    image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&fit=crop&q=80&w=600',
    tags: ['Signature', 'Gluten-Free'],
    prepTime: '5 mins'
  },
  {
    id: 'fudge-brownie',
    name: 'Fleur De Sel Molten Fudge Cake',
    description: 'Deep premium single-origin Belgian dark chocolate brownie bake with a molten lava interior, sprinkled with flaky Maldon salt crystals.',
    price: 8.50,
    category: 'desserts',
    rating: 9.8,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    tags: ['Best-Seller', 'Refined-Sugar-Free'],
    prepTime: '6 mins'
  },
  {
    id: 'rosewater-pavlova',
    name: 'Summer Rosewater Meringue Pavlova',
    description: 'Dazzling crisp-edged meringue basket infused with local rosewater, piled with pillowy coconut cream, wild organic blackberries, and fresh raspberries.',
    price: 9.50,
    category: 'desserts',
    rating: 9.7,
    image: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=600',
    tags: ['Gluten-Free', 'Organic'],
    prepTime: '5 mins'
  }
];

export const CAFE_TABLES: CafeTable[] = [
  // INDOOR ZONE (Intimate moody velvet booths & warm lights)
  { id: 'T-I1', name: 'Velvet Nook 01', capacity: 2, zone: 'indoor', isBooked: false, row: 1, col: 1 },
  { id: 'T-I2', name: 'Velvet Nook 02', capacity: 2, zone: 'indoor', isBooked: false, row: 1, col: 2 },
  { id: 'T-I3', name: 'Intimate Lounge 03', capacity: 4, zone: 'indoor', isBooked: false, row: 2, col: 1 },
  { id: 'T-I4', name: 'Leather Banquet 04', capacity: 6, zone: 'indoor', isBooked: false, row: 2, col: 2 },

  // WINDOW ZONE (Sun-drenched marble counters with power outlets)
  { id: 'T-W1', name: 'Window Marble 01', capacity: 2, zone: 'window', isBooked: false, row: 1, col: 1 },
  { id: 'T-W2', name: 'Window Marble 02', capacity: 2, zone: 'window', isBooked: false, row: 1, col: 2 },
  { id: 'T-W3', name: 'Glass Counter 03', capacity: 2, zone: 'window', isBooked: false, row: 2, col: 1 },
  { id: 'T-W4', name: 'Corner Vista 04', capacity: 4, zone: 'window', isBooked: false, row: 2, col: 2 },

  // OUTDOOR ZONE (Lush plant-lined garden and relaxed poolside vibes)
  { id: 'T-O1', name: 'Garden Greenhouse 01', capacity: 4, zone: 'outdoor', isBooked: false, row: 1, col: 1 },
  { id: 'T-O2', name: 'Olive Shade 02', capacity: 4, zone: 'outdoor', isBooked: false, row: 1, col: 2 },
  { id: 'T-O3', name: 'Poolside Daybed 03', capacity: 2, zone: 'outdoor', isBooked: false, row: 2, col: 1 },
  { id: 'T-O4', name: 'Central Fountain Bistro 04', capacity: 4, zone: 'outdoor', isBooked: false, row: 2, col: 2 },
];

export const UGC_POSTS: UGCPost[] = [
  {
    id: 'p1',
    username: '@_clara_eats',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    caption: 'unbelievable activated charcoal latte with rosewater at my favorite study spot. Yes, it tastes as gorgeous as it looks! 🖤🥀 #minimalistaesthetic #roaselatte',
    likes: 1248,
    tags: ['rose-latte', 'interiorvibe']
  },
  {
    id: 'p2',
    username: '@tyler_creative',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    caption: 'Crisp morning rays, twice-baked cardamom croissants, and a solid 100Mbps Wi-Fi. What else do you need to code? 🥐☕️💻 #wfhlife #cozybooth',
    likes: 852,
    tags: ['WFHSpot', 'GourmetCroissants']
  },
  {
    id: 'p3',
    username: '@sophia_aesthetics',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600',
    caption: 'Avocado toast loaded with micro-flowers and white truffle oil. Eating art on a sunny Thursday afternoon 🌸🥑🍞 #foodstyling #aesthetics',
    likes: 2190,
    tags: ['AestheticMains', 'TruffleAvocado']
  },
  {
    id: 'p4',
    username: '@benjamin.vibes',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=600',
    caption: 'Stepped into the sun-drenched window booth and had this Turmeric gold espresso. The playlist is literally 10/10.',
    likes: 1042,
    tags: ['GoodPlaylist', 'GoldenHour']
  }
];

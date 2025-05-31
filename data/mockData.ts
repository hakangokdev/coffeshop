export interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    small: number;
    medium: number;
    large: number;
  };
  image: any;
  category: string;
  rating: number;
  sizes: string[];
  ingredients: string[];
  nutrition: {
    calories: number;
    caffeine: number;
    sugar: number;
  };
  inStock: boolean;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Espresso',
    description: 'Rich and bold espresso with a perfect crema',
    price: { small: 2.50, medium: 3.00, large: 3.50 },
    image: require('../assets/images/coffee-1.png'),
    category: 'hot',
    rating: 4.8,
    sizes: ['small', 'medium', 'large'],
    ingredients: ['Espresso beans', 'Water'],
    nutrition: { calories: 5, caffeine: 63, sugar: 0 },
    inStock: true,
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'Classic cappuccino with steamed milk and foam',
    price: { small: 3.50, medium: 4.00, large: 4.50 },
    image: require('../assets/images/coffee-2.png'),
    category: 'hot',
    rating: 4.7,
    sizes: ['small', 'medium', 'large'],
    ingredients: ['Espresso', 'Steamed milk', 'Milk foam'],
    nutrition: { calories: 120, caffeine: 63, sugar: 8 },
    inStock: true,
  },
  {
    id: '3',
    name: 'Latte',
    description: 'Smooth latte with steamed milk and light foam',
    price: { small: 4.00, medium: 4.50, large: 5.00 },
    image: require('../assets/images/coffee-3.png'),
    category: 'hot',
    rating: 4.6,
    sizes: ['small', 'medium', 'large'],
    ingredients: ['Espresso', 'Steamed milk', 'Light foam'],
    nutrition: { calories: 150, caffeine: 63, sugar: 12 },
    inStock: true,
  },
  {
    id: '4',
    name: 'Iced Coffee',
    description: 'Refreshing iced coffee served cold',
    price: { small: 3.00, medium: 3.50, large: 4.00 },
    image: require('../assets/images/coffee-4.png'),
    category: 'cold',
    rating: 4.5,
    sizes: ['small', 'medium', 'large'],
    ingredients: ['Coffee', 'Ice', 'Cold water'],
    nutrition: { calories: 10, caffeine: 95, sugar: 0 },
    inStock: true,
  },
  {
    id: '5',
    name: 'Green Tea',
    description: 'Premium green tea with antioxidants',
    price: { small: 2.50, medium: 3.00, large: 3.50 },
    image: require('../assets/images/coffee-5.png'),
    category: 'tea',
    rating: 4.4,
    sizes: ['small', 'medium', 'large'],
    ingredients: ['Green tea leaves', 'Hot water'],
    nutrition: { calories: 2, caffeine: 25, sugar: 0 },
    inStock: true,
  },
  {
    id: '6',
    name: 'Mocha',
    description: 'Rich chocolate and coffee combination',
    price: { small: 4.50, medium: 5.00, large: 5.50 },
    image: require('../assets/images/coffee-6.png'),
    category: 'hot',
    rating: 4.9,
    sizes: ['small', 'medium', 'large'],
    ingredients: ['Espresso', 'Chocolate syrup', 'Steamed milk', 'Whipped cream'],
    nutrition: { calories: 290, caffeine: 95, sugar: 25 },
    inStock: true,
  },
  {
    id: '7',
    name: 'Croissant',
    description: 'Buttery and flaky French croissant',
    price: { small: 2.50, medium: 2.50, large: 2.50 },
    image: require('../assets/images/coffee-1.png'),
    category: 'pastries',
    rating: 4.3,
    sizes: ['small'],
    ingredients: ['Flour', 'Butter', 'Yeast', 'Salt'],
    nutrition: { calories: 231, caffeine: 0, sugar: 5 },
    inStock: true,
  },
  {
    id: '8',
    name: 'Club Sandwich',
    description: 'Triple-decker sandwich with turkey and bacon',
    price: { small: 8.50, medium: 8.50, large: 8.50 },
    image: require('../assets/images/coffee-2.png'),
    category: 'food',
    rating: 4.2,
    sizes: ['small'],
    ingredients: ['Bread', 'Turkey', 'Bacon', 'Lettuce', 'Tomato', 'Mayo'],
    nutrition: { calories: 480, caffeine: 0, sugar: 8 },
    inStock: true,
  },
]; 
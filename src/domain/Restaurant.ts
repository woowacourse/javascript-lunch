import { Category, MinutesToCampus } from '../data/type';

interface Restaurant {
  category: Category;
  name: string;
  distance: MinutesToCampus;
  description?: string;
  link?: string;
}

export default Restaurant;

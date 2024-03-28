import Category from '../enums/Category';
import Distance from '../enums/Distance';

interface Restaurant {
  name: string;
  category: Category;
  distance: Distance;
  description: string;
  url: string;
  favorite: boolean;
}

export default Restaurant;

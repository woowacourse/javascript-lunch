import { RestaurantType, CategoryType, SortType } from './index';
import Restaurant from './restaurant';

interface Matzip {
  restaurants: Restaurant[];
  add: (restaurant: RestaurantType) => void;
  sort: (sortBy: SortType) => Restaurant[];
  filterByCategory: (category: CategoryType) => Restaurant[];
}

export default Matzip;

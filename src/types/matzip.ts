import { Restaurant, CategoryType, SortType } from './index';

interface Matzip {
  restaurants: Restaurant[];
  add: (restaurant: Restaurant) => void;
  sort: (sortBy: SortType, restaurants: Restaurant[]) => Restaurant[];
  filterByCategory: (category: CategoryType) => Restaurant[];
}

export default Matzip;

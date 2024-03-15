import { Restaurant, CategoryType, SortType } from './index';

interface Matzip {
  restaurants: Restaurant[];
  add: (restaurant: Restaurant) => void;
  sort: (sortBy: SortType, restaurants: Restaurant[]) => Restaurant[];
  filterByCategory: (category: CategoryType) => Restaurant[];
  delete: (id: string) => void;
}

export default Matzip;

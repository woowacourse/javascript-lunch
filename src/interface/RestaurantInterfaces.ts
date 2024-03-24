type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

type FilteringCategory = '전체' | Category;

type SortingProperty = 'name' | 'distance';

type ActiveTab = 'all' | 'favorite';

interface Restaurant {
  id: string;
  category: Category;
  name: string;
  distance: number;
  description?: string;
  link?: string;
  isFavorite: boolean;
}

interface Restaurants {
  isExistingRestaurant: (restaurant: Restaurant) => boolean;
  addRestaurant: (restaurant: Restaurant) => void;
  deleteRestaurant: (deleteID: string) => void;
  filterByCategory: (category: Category, restaurantList: Restaurant[]) => Restaurant[];
  sortByProperty: (property: SortingProperty, restaurantList: Restaurant[]) => Restaurant[];
  filterFavorite: (restaurantList: Restaurant[]) => Restaurant[];
  updateFavoriteState: (restaurantId: string) => void;
  generateRenderingList: (
    activeTab: ActiveTab,
    filteringCategory: FilteringCategory,
    sortingProperty: SortingProperty,
  ) => Restaurant[];
}

export { Category, FilteringCategory, SortingProperty, ActiveTab, Restaurant, Restaurants };

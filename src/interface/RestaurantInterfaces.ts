type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

type FilteringCategory = '전체' | Category;

type Distance = 5 | 10 | 15 | 20 | 30;

type SortingProperty = 'name' | 'distance';

interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  favorite: boolean;
}

interface Restaurants {
  addRestaurant: (restaurant: Restaurant, restaurantList: Restaurant[]) => boolean;
  filterByCategory: (category: Category, restaurantList: Restaurant[]) => Restaurant[];
  sortByProperty: (property: SortingProperty, restaurantList: Restaurant[]) => Restaurant[];
  filterByFavorite: (restaurantList: Restaurant[]) => Restaurant[];
}

interface DropdownOption {
  value: string;
  content: string;
}

interface DropdownProps {
  options: DropdownOption[];
  label?: string;
  name?: string;
  id?: string;
  className?: string;
  isRequired: boolean;
}

export {
  Category,
  FilteringCategory,
  Distance,
  SortingProperty,
  Restaurant,
  Restaurants,
  DropdownOption,
  DropdownProps,
};

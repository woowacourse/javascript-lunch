type UserRestaurantInput = {
  category: CategoryType;
  name: string;
  distanceInMinutes: string;
  description: string;
  link: string;
};

type Restaurant = UserRestaurantInput & {
  isFavorite: boolean;
  itemId: number;
};

type FilterProperties = {
  filterBy: string;
  sortBy: string;
  favoriteBy: string;
};

type CategoryType = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type SelectCategoryType = CategoryType | '전체';

export {
  UserRestaurantInput,
  Restaurant,
  FilterProperties,
  CategoryType,
  SelectCategoryType,
};

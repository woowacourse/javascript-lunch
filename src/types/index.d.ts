export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

type Distance = 5 | 10 | 15 | 20 | 30;
type SortingOptions = '이름순' | '거리순';

export type Restaurant = {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  favorite: boolean;
  id: number;
};

export type FormValue = Pick<Restaurant, 'category' | 'name' | 'distance' | 'description' | 'link'>;

export type RestaurantFilter = {
  category: CategoryOptions;
  sorting: SortingOptions;
};

export type Errors = {
  [key: string]: Boolean;
};

import { RESTAURANT_DISTANCE, OPTION_NAMES } from '../constants/constants';

export type Category = (typeof OPTION_NAMES.CATEGORY)[number];

type Distance = (typeof RESTAURANT_DISTANCE)[number];
type SortingOptions = (typeof OPTION_NAMES.SORTING)[number];

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

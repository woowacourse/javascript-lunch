import { CATEGORY, SORTINGWAY } from "../constant/variables";

export type CategoryType = (typeof CATEGORY)[keyof typeof CATEGORY];

export type DistanceType = 5 | 10 | 15 | 20 | 30;

export type SortingWayType = (typeof SORTINGWAY)[keyof typeof SORTINGWAY];

export interface RestaurantInfo {
  name: string;
  category: CategoryType;
  distance: DistanceType;
  description?: string;
  link?: string;
}

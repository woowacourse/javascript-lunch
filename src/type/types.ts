import Restaurant from '../domain/Restaurant';
import { Category, DistanceByWalk } from '../enum/enums';

export type CompareFunction = (a: Restaurant, b: Restaurant) => number;

export type RestaurantData = {
  name: string;
  category: Category;
  distanceByWalk: DistanceByWalk;
  description?: string;
  referenceUrl?: string;
};

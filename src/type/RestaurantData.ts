import { Category, DistanceByWalk } from '../enum/enums';

export type RestaurantData = {
  name: string;
  category: Category;
  distanceByWalk: DistanceByWalk;
  description?: string;
  referenceUrl?: string;
};

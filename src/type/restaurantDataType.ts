import { Category, DistanceByWalk } from '../enum/enums';

export type RestaurantDataType = {
  name: string;
  category: Category;
  distanceByWalk: DistanceByWalk;
  description?: string;
  referenceUrl?: string;
  favorite?: boolean;
};

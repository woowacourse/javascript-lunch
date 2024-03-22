import { RestaurantCategory, MinutesWalk } from '../constants/enums';

interface ILocation {
  name: string;
  category: RestaurantCategory;
  minutesWalk: MinutesWalk;
  description?: string;
  referenceUrl?: string;
  favorite: boolean;
}

export { ILocation };

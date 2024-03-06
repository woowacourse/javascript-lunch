import type { Category, MinutesWalk } from '../constants/Type';

interface IRestaurant {
  name: string;
  category: Category;
  minutesWalk: MinutesWalk;
  description?: string;
  referenceUrl?: string;
}

export { IRestaurant };

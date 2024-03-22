import { Category, MinutesWalk } from '../constants/enums';

interface ILocation {
  name: string;
  category: Category;
  minutesWalk: MinutesWalk;
  description?: string;
  referenceUrl?: string;
  favorite: boolean;
}

export { ILocation };

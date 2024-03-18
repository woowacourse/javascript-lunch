import { Category, MinutesWalk } from '../constants/enums';

interface ILocation {
  name: string;
  category: Category;
  minutesWalk: MinutesWalk;
  description?: string | undefined;
  referenceUrl?: string | undefined;
  favorite: boolean;
}

export { ILocation };

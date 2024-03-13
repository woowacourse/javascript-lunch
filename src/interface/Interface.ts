import { Category, MinutesWalk } from '../constants/enums';

interface ILocation {
  getName(): string;
  getMinutesWalk(): MinutesWalk;
  isMatchedCategory(category: Category): boolean;
}

export { ILocation };

import type { Category, MinutesWalk } from '../constants/typings';

interface ILocation {
  getName(): string;
  getMinutesWalk(): MinutesWalk;
  isMatchedCategory(category: Category): boolean;
}

export { ILocation };

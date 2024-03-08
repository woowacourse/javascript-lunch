import type { Category, MinutesWalk } from '../constants/Type';

interface ILocation {
  getName(): string;
  getMinutesWalk(): MinutesWalk;
  isMatchedCategory(category: Category): boolean;
}

export { ILocation };

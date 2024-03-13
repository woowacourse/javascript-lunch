import Restaurant from '../domain/Restaurant';
import { Category, MinutesWalk } from './enums';

type CompareFunction = (a: Restaurant, b: Restaurant) => number;

type LocationData = {
  name: string;
  category: Category;
  minutesWalk: MinutesWalk;
  description?: string;
  referenceUrl?: string;
};

export { CompareFunction, LocationData };

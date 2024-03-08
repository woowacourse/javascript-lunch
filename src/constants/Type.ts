import { TYPE_SETTING } from './setting';
import Restaurant from '../domain/Restaurant';

type Category = (typeof TYPE_SETTING.category)[number];
type MinutesWalk = (typeof TYPE_SETTING.minutesWalk)[number];
type SortType = (typeof TYPE_SETTING.sortType)[number];
type CompareFunction = (a: Restaurant, b: Restaurant) => number;

type LocationData = {
  name: string;
  category: Category;
  minutesWalk: MinutesWalk;
  description?: string;
  referenceUrl?: string;
};

export { Category, MinutesWalk, SortType, CompareFunction, LocationData };

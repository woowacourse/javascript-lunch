import { CATEGORY, DISTANCE } from '../constants/restaurant';

export type KeyOfCategory = keyof typeof CATEGORY;
export type KeyOfDistance = keyof typeof DISTANCE;

export type Restaurant = {
  category: KeyOfCategory;
  name: string;
  distance: KeyOfDistance;
  description: string;
  link: string;
};

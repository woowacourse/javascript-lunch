import { CATEGORY, DISTANCE, FILTER_DATASET, SORTING_KEY } from '../constants/constants';

export type KeyOfSortingKey = keyof typeof SORTING_KEY;
export type KeyOfCategory = keyof typeof CATEGORY;
export type KeyOfDistance = keyof typeof DISTANCE;
export type KeyOfFilterDataset = keyof typeof FILTER_DATASET;

export type Restaurant = {
  category: Exclude<KeyOfCategory, 'all'>;
  name: string;
  distance: KeyOfDistance;
  description: string;
  link: string;
};

export type EventInfo = {
  target: HTMLElement | Document;
  type: string;
  handler: EventListener;
};

export type FormItem = {
  label: string;
  type: string;
  id: string;
  options?: string[];
  required?: boolean;
};

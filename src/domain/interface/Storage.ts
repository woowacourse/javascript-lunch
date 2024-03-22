import { Restaurant } from './Restaurant';

export type StorageData = Array<Restaurant | number>;

export interface StorageInterface {
  get(key: string): null | StorageData;
  set(key: string, value: StorageData): void;
}

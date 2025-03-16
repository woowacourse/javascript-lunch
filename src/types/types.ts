type SelectOption = {
  readonly value: string;
  readonly option: string;
};

export type SelectOptions = readonly SelectOption[];

type Distance = 5 | 10 | 15 | 20 | 30;
type Category = 'korean' | 'chinese' | 'japanese' | 'western' | 'asian' | 'etc';

export type Restaurant = {
  category: Category;
  distance: Distance;
  name: string;
  description?: string;
  link?: string;
  isFavorite: boolean;
};

export type TabType = 'all' | 'favorite';

export type FilterType = 'category' | 'sort';

export type StorageType = {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
};

import { CATEGORIES } from '../constants/categories';

export type Union<T> = T[keyof T];

export type Category = Union<typeof CATEGORIES>;

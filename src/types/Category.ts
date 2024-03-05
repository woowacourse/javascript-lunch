import { CATEGORIES } from '../constants/categories';

type Union<T> = T[keyof T];

export type Category = Union<typeof CATEGORIES>;

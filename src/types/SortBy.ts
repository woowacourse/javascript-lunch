import { SORTBY } from '../constants/sortBy';

type Union<T> = T[keyof T];

export type SortBy = Union<typeof SORTBY>;

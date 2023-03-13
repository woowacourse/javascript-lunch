import { CATEGORY, FILTER } from '../constants';

export type DistanceTime = 5 | 10 | 15 | 20 | 30;
export type FilterOptions = (typeof FILTER)[number];
export type CategoryOptions = (typeof CATEGORY)[number] | '전체';
export type TabType = 'all' | 'favorite';

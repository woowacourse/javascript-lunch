import { Category } from './index';
import { CATEGORY_ALL } from '../constants/restaurant';

type AllCategory = typeof CATEGORY_ALL;

export type CategoryOptions = AllCategory | Category;

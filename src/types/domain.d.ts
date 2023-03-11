import { Category } from './index';
import { CATEGORY_ALL } from '../constants/constants';

type AllCategory = typeof CATEGORY_ALL;

export type CategoryOptions = AllCategory | Category;

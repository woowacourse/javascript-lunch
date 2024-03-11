import { SORTBY } from '../constants/sortBy';
import { Union } from './Category';

export type SortBy = Union<typeof SORTBY>;

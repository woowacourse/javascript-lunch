import { Category } from './Category';
import { Distance } from './Distance';

export interface Restaurant {
  [keys: string]: string | Category | Distance | number | undefined;
  name: string;
  category: Category;
  distance: Distance;
  description?: string;
  link?: string;
  createdAt: number;
}

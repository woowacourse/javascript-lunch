import { Category } from './Category';
import { Distance } from './Distance';

export interface Restaurant {
  [index: string]: string | Category | Distance | Date | undefined;
  name: string;
  category: Category;
  distance: Distance;
  description?: string;
  link?: string;
  createdAt: Date;
}
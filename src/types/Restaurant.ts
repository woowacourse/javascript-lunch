import { Category } from './Category';
import { Distance } from './Distance';

export interface Restaurant {
  name: string;
  category: Category;
  distance: Distance;
  description?: string;
  link?: string;
  createdAt: Date;
}

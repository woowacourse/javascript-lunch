import { Category, Order } from '@res/constants/enum';
import { TabToggle } from './types';

interface IRenderOptions {
  category: Category;
  order: Order;
  tab: TabToggle;
}

export default IRenderOptions;

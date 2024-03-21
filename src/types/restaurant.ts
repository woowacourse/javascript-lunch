import Category from './category';

type Restaurant = {
  category: Category;
  name: string;
  distance: number;
  introduction?: string;
  link?: string;
  favorite?: boolean;
};

export default Restaurant;

import Category from './category';

type Restaurant = {
  id: string;
  category: Category;
  name: string;
  distance: number;
  introduction?: string;
  link?: string;
};

export default Restaurant;

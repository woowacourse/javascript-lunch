import Category from "./Category";
import Distance from "./Distance";

interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  url?: string;
}

export default Restaurant;

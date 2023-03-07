import { FoodCategory } from "./FoodCategory"
import { EstimatedTime } from "./EstimatedTime";

interface Restaurant {
  name: string;
  category: FoodCategory;
  estimatedTime: EstimatedTime;

  description: string;
  link: string;
}

export default Restaurant;

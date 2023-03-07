import { FoodCategory } from "./FoodCategory"

type EstimatedTime = "5" | "10" | "15" | "20" | "30";

interface Restaurant {
  name: string;
  category: FoodCategory;
  estimatedTime: EstimatedTime;

  description: string;
  link: string;
}

export { Restaurant, EstimatedTime };

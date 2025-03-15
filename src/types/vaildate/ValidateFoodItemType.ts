import { Category } from "../domain/FoodFormHandlerType";

export interface ValidateFoodItemType {
  category: Category;
  name: string;
  distance: string;
  description: string;
  link: string;
}

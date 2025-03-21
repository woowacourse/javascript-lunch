import { Category } from "../domain/GetFormFoodItemType";

export interface ValidateFoodItemType {
  category: Category;
  name: string;
  distance: string;
  description: string;
  link: string;
}

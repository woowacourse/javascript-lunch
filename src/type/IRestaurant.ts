import { TCategory } from "./TCategory";

export default interface IRestaurant {
  category: TCategory;
  name: string;
  distance: number;
  description?: string;
  link?: string;
}

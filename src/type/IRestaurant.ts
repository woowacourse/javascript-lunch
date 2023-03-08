import { TCategory } from "./TCategory";

export default interface IRestaurant {
  category: TCategory | string;
  name: string;
  distance: number;
  description?: string;
  link?: string;
  favorite: boolean;
}

import { Icategory } from "./category";
import { Idistance } from "./distance";

export interface Irestaurant {
  category: Icategory;
  name: string;
  distance: Idistance;
  description?: string;
  link?: string;
}

export interface IrestaurantList {
  sortByName: (restaurantList: Irestaurant[]) => Irestaurant[];

  sortByDistance: (restaurantList: Irestaurant[]) => Irestaurant[];

  filterByCategory: (
    category: Icategory,
    restaurantList: Irestaurant[],
  ) => Irestaurant[];
}

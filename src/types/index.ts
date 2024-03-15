import { CATEGORIES, DISTANCES, SORTING_STANDARDS } from "../constants";

type ArrayToEnum<T extends readonly unknown[]> = T[number];

type Category = ArrayToEnum<typeof CATEGORIES>;

type Distance = ArrayToEnum<typeof DISTANCES>;

type SortingStandard = ArrayToEnum<typeof SORTING_STANDARDS>;

type Link = `https://${string}` | `http://${string}`;

type RestaurantType = {
  category: Category;
  name: string;
  distance: Distance;
  bookmark: boolean;
  description?: string;
  link?: Link | "";
};

export { Category, Distance, RestaurantType, SortingStandard, Link };

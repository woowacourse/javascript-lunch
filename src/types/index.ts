import { categories, distances, sortingStandards } from "../constants";

type ArrayToEnum<T extends readonly unknown[]> = T[number];

type Category = ArrayToEnum<typeof categories>;

type Distance = ArrayToEnum<typeof distances>;

type SortingStandard = ArrayToEnum<typeof sortingStandards>;

type Link = `https://${string}` | `http://${string}`;

type Restaurant = {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: Link | "";
};

export { Category, Distance, Restaurant, SortingStandard, Link };

import { categories, distances, sortingStandards } from "../constants";

type Category = (typeof categories)[number];

type Distance = (typeof distances)[number];

type Link = `https://${string}` | `http://${string}`;

type Restaurant = {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: Link | "";
};

type SortingStandard = (typeof sortingStandards)[number];

export { Category, Distance, Restaurant, SortingStandard, Link };

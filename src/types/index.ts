import { categories, distances } from "../constants";

type Category = "한식" | "중식" | "일식" | "아시안" | "양식" | "기타";

type Distance = 5 | 10 | 15 | 20 | 30;

type Link = `https://${string}` | `http://${string}`;

type Restaurant = {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: Link;
};

type SortingStandard = "name" | "distance";

function isCategory(category: any): category is Category {
  return categories.includes(category as Category);
}

function isDistance(distance: any): distance is Distance {
  return distances.includes(distance as Distance);
}

function isLink(link: any): link is Link {
  return ["https://", "http://"].includes(link as Link);
}

export {
  Category,
  Distance,
  Link,
  Restaurant,
  SortingStandard,
  isCategory,
  isDistance,
  isLink,
};

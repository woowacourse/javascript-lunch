import { categories, distances } from "../constants";

type Category = "한식" | "중식" | "일식" | "아시안" | "양식" | "기타";

type Distance = 5 | 10 | 15 | 20 | 30;

type Link = `https://${string}` | `http://${string}`;

type Restaurant = {
  id: number;
  category: Category;
  name: string;
  distance: Distance;
  isGoTo: boolean;
  description?: string;
  link?: Link;
};

type SortingStandard = "name" | "distance";

function isCategory(category: unknown): category is Category {
  return categories.includes(category as Category);
}

function isDistance(distance: unknown): distance is Distance {
  return distances.includes(distance as Distance);
}

function isLink(link: unknown): link is Link {
  if (typeof link !== "string") {
    return false;
  }

  return link.startsWith("https://") || link.startsWith("http://");
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

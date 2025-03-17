import { CategoryType } from "./filters";

export const DISTANCES = [5, 10, 15, 20, 30] as const;
export type Distance = (typeof DISTANCES)[number];

type UrlString = `http://${string}` | `https://${string}`;

export interface Restaurant {
  id: string;
  category: CategoryType;
  name: string;
  distance: Distance;
  description?: string;
  link?: UrlString;
}

import { CATEGORY, CATEGORY_LOWER_CASE, SORTINGWAY } from "../constant/variables";

export type CategoryType = (typeof CATEGORY)[keyof typeof CATEGORY];

export type DistanceType = 5 | 10 | 15 | 20 | 30;

export type SortingWayType = (typeof SORTINGWAY)[keyof typeof SORTINGWAY];

export type CategoryLowerCaseType = (typeof CATEGORY_LOWER_CASE)[keyof typeof CATEGORY_LOWER_CASE];

export type EventHandler = (event: Event) => void;

const EventTypes = ["click", "submit", "change", "keydown"] as const;

export type EventType = (typeof EventTypes)[number];
export interface RestaurantInfo {
  name: string;
  category: CategoryType;
  distance: DistanceType;
  description?: string;
  link?: string;
}

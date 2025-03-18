import { RestaurantItem } from "./restaurantItem";

export type FilterAndSortOptions = {
  category: "전체" | RestaurantItem["category"];
  sortOption: "name" | "distance";
};

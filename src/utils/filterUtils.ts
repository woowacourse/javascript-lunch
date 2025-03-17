import { Restaurant } from "../data/models/restaurant.ts";

export const filterRestaurants = (
  restaurants: Restaurant[],
  category: "" | "한식" | "중식" | "일식" | "양식" | "아시안" | "기타",
) => {
  if (category === "") return restaurants;
  return restaurants.filter((r) => r.categoryTitle === category);
};

export const sortRestaurants = (
  restaurants: Restaurant[],
  sortBy: "name" | "distance",
): Restaurant[] => {
  if (sortBy === "name") {
    return [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy === "distance") {
    return [...restaurants]
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => a.distance - b.distance);
  }

  return restaurants;
};

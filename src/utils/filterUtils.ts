import { Restaurant } from "../data/restaurant.js";

export const filterRestaurants = (
  restaurants: Restaurant[],
  category: string
) => {
  if (category === "") return restaurants;
  return restaurants.filter((r) => r.categoryTitle === category);
};

export const sortRestaurants = (
  restaurants: Restaurant[],
  sortBy: string
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

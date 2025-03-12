import { Restaurant } from "../data/restaurant.js";

export const filterRestaurants = (
  restaurants: Restaurant[],
  category: string
) => {
  if (category === "") return restaurants;
  return restaurants.filter((r) => r.categoryTitle === category);
};

import { Irestaurant } from "../types";

export default function Restaurant(restaurant: Irestaurant) {
  return {
    category: restaurant.category,
    name: restaurant.name,
    distance: restaurant.distance,
    description: restaurant.description,
    link: restaurant.link,
  };
}

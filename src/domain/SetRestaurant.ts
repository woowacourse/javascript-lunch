import { RestaurantState } from '../types';

export default function setRestaurant(restaurant: RestaurantState) {
  return {
    category: restaurant.category,
    name: restaurant.name,
    distance: restaurant.distance,
    description: restaurant.description,
    link: restaurant.link,
    isFavoirted: false,
  };
}

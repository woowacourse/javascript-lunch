import { RESTAURANT_ITEMS, RestaurantItem } from '../../public/restaurantData.ts';
import { saveRestaurants } from './RestaurantListService.ts';

function createRestaurantData(
  data: Omit<RestaurantItem, 'favorite'> & { favorite?: boolean }
): RestaurantItem {
  return {
    id: data.id,
    name: data.name,
    category: data.category,
    categoryImgSrc: data.categoryImgSrc,
    distance: data.distance,
    description: data.description,
    favorite: data.favorite || false,
  };
}

function toggleFavorite(id: string): void {
  const restaurant = RESTAURANT_ITEMS.find((item) => item.id === id);
  if (restaurant) {
    restaurant.favorite = !restaurant.favorite;

    saveRestaurants(RESTAURANT_ITEMS);
  }
}

function getFavoriteRestaurants(): RestaurantItem[] {
  return RESTAURANT_ITEMS.filter((item) => item.favorite);
}

export { createRestaurantData, toggleFavorite, getFavoriteRestaurants };

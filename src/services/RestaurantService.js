import { RESTAURANT_ITEMS } from '../../public/restaurantData.js';

function createRestaurantData(data) {
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

function toggleFavorite(id) {
  const restaurant = RESTAURANT_ITEMS.find((item) => item.id === id);
  if (restaurant) {
    restaurant.favorite = !restaurant.favorite;
  }
}

function getFavoriteRestaurants() {
  return RESTAURANT_ITEMS.filter((item) => item.favorite);
}

export { createRestaurantData, toggleFavorite, getFavoriteRestaurants };

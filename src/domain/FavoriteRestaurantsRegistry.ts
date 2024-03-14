import { Restaurant } from '../types/Restaurant';

const FavoriteRestaurantsRegistry = {
  likeOneRestaurant(newRestaurant: Restaurant) {
    if (!this.isLikedRestaurant(newRestaurant)) {
      const allRestaurants: Restaurant[] = JSON.parse(localStorage.getItem('liked') ?? '[]');
      allRestaurants.push(newRestaurant);
      localStorage.setItem('liked', JSON.stringify(allRestaurants));
    }
  },

  unlikeOneRestaurant(restaurant: Restaurant) {
    if (this.isLikedRestaurant(restaurant)) {
      const allRestaurants: Restaurant[] = JSON.parse(localStorage.getItem('liked') ?? '[]');
      const removedRestaurants = allRestaurants.filter((value) => value.name !== restaurant.name);
      localStorage.setItem('liked', JSON.stringify(removedRestaurants));
    }
  },

  isLikedRestaurant(restaurant: Restaurant) {
    const allRestaurants: Restaurant[] = JSON.parse(localStorage.getItem('liked') ?? '[]');
    return allRestaurants.some((value) => value.name === restaurant.name);
  },
};

export default FavoriteRestaurantsRegistry;

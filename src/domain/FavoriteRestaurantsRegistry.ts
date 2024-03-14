import { Restaurant } from '../types/Restaurant';

const FavoriteRestaurantsRegistry = {
  likeOneRestaurant(newRestaurant: Restaurant) {
    const allRestaurants: Restaurant[] = JSON.parse(localStorage.getItem('liked') ?? '[]');
    allRestaurants.push(newRestaurant);
    localStorage.setItem('liked', JSON.stringify(allRestaurants));
  },

  unlikeOneRestaurant(restaurant: Restaurant) {
    if (this.isLikedRestaurant(restaurant)) {
      const allRestaurants: Restaurant[] = JSON.parse(localStorage.getItem('liked') ?? '[]');
      const removedRestaurants = allRestaurants.filter((value) => value !== restaurant);
      localStorage.setItem('liked', JSON.stringify(removedRestaurants));
    }
  },

  isLikedRestaurant(restaurant: Restaurant) {
    const allRestaurants: Restaurant[] = JSON.parse(localStorage.getItem('liked') ?? '[]');
    return allRestaurants.includes(restaurant);
  },
};

export default FavoriteRestaurantsRegistry;

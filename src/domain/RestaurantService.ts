import { LOCALSTORAGE_KEY } from '../constant/constants';
import { FilteringCategory, SortingProperty, Restaurant, Restaurants } from '../interface/RestaurantInterfaces';

class RestaurantService implements Restaurants {
  addRestaurant(restaurant: Restaurant, restaurantList: Restaurant[]): boolean {
    const existingRestaurant = restaurantList.find(
      item => item.category === restaurant.category && item.name === restaurant.name,
    );
    if (existingRestaurant) return false;

    const newRestaurant: Restaurant = { ...restaurant, favorite: false };

    restaurantList.push(newRestaurant);
    localStorage.setItem(LOCALSTORAGE_KEY.RESTAURANT_LIST, JSON.stringify(restaurantList));
    return true;
  }

  removeRestaurant(restaurant: Restaurant, restaurantList: Restaurant[]): Restaurant[] {
    const newRestaurantList = restaurantList.filter(item => item !== restaurant);
    localStorage.setItem(LOCALSTORAGE_KEY.RESTAURANT_LIST, JSON.stringify(newRestaurantList));
    return newRestaurantList;
  }

  filterByCategory(category: FilteringCategory, restaurantList: Restaurant[]): Restaurant[] {
    if (category === '전체') return restaurantList;
    return restaurantList.filter(restaurant => restaurant.category === category);
  }

  sortByProperty(property: SortingProperty, restaurantList: Restaurant[]): Restaurant[] {
    return restaurantList.sort((a: Restaurant, b: Restaurant) => {
      if (a[property] === b[property]) return 1;
      return a[property] > b[property] ? 1 : -1;
    });
  }

  filterByFavorite(restaurantList: Restaurant[]): Restaurant[] {
    return restaurantList.filter(restaurant => restaurant.favorite);
  }

  toggleFavorite(restaurant: Restaurant, restaurantList: Restaurant[]) {
    restaurant.favorite = !restaurant.favorite;
    localStorage.setItem(LOCALSTORAGE_KEY.RESTAURANT_LIST, JSON.stringify(restaurantList));
  }
}

export default RestaurantService;

import { LOCALSTORAGE_KEY } from '../constant/constants';
import { FilteringCategory, SortingProperty, Restaurant, Restaurants } from '../interface/RestaurantInterfaces';
import useId from '../utils/useId';

class RestaurantService implements Restaurants {
  addRestaurant(restaurant: Restaurant, restaurantList: Restaurant[]): boolean {
    const existingRestaurant = restaurantList.find(
      item => item.category === restaurant.category && item.name === restaurant.name,
    );
    if (existingRestaurant) return false;

    const createdId = useId();
    const newRestaurant: Restaurant = { ...restaurant, id: createdId, favorite: false };

    restaurantList.push(newRestaurant);
    localStorage.setItem(LOCALSTORAGE_KEY.RESTAURANT_LIST, JSON.stringify(restaurantList));
    return true;
  }

  filterByCategory(category: FilteringCategory, restaurantList: Restaurant[]): Restaurant[] {
    if (category === '전체') return restaurantList;
    return restaurantList.filter(restaurant => restaurant.category === category);
  }

  sortByProperty(property: SortingProperty, restaurantList: Restaurant[]): Restaurant[] {
    return restaurantList.sort((a: Restaurant, b: Restaurant) => {
      if (a[property] === b[property]) return a.id - b.id;
      return a[property] > b[property] ? 1 : -1;
    });
  }

  filterByFavorite(restaurantList: Restaurant[]): Restaurant[] {
    return restaurantList.filter(restaurant => restaurant.favorite);
  }

  changeFavorite(restaurantId: number, restaurantList: Restaurant[]) {
    const targetRestaurant = restaurantList.find(restaurant => restaurant.id === restaurantId);

    if (!targetRestaurant) return false;

    targetRestaurant.favorite = !targetRestaurant.favorite;
    localStorage.setItem(LOCALSTORAGE_KEY.RESTAURANT_LIST, JSON.stringify(restaurantList));

    if (targetRestaurant.favorite) return true;
    return false;
  }
}

export default RestaurantService;

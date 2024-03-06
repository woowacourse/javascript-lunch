import { Category, SortingProperty, Restaurant, Restaurants } from '../interface/RestaurantInterfaces';

const RestaurantService: Restaurants = {
  addRestaurant(restaurant: Restaurant, restaurantList: Restaurant[]): boolean {
    const existingRestaurant = restaurantList.find(
      item => item.category === restaurant.category && item.name === restaurant.name,
    );
    if (existingRestaurant) {
      return false;
    }
    localStorage.push('restaurantList');
    return true;
  },

  filterByCategory(category: Category, restaurantList: Restaurant[]): Restaurant[] {
    return restaurantList.filter(restaurant => restaurant.category === category);
  },

  sortByProperty(property: SortingProperty, restaurantList: Restaurant[]): Restaurant[] {
    return restaurantList.sort((a: Restaurant, b: Restaurant) => (a[property] > b[property] ? 1 : -1));
  },
};

export default RestaurantService;

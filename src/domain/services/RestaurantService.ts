import { LOCAL_STORAGE_KEY } from '../../constant/constants';
import { FilteringCategory, SortingProperty, Restaurant, Restaurants } from '../../interface/RestaurantInterfaces';

const RestaurantService: Restaurants = {
  createRestaurant(formData: Restaurant) {
    return {
      id: formData.id,
      category: formData.category,
      name: formData.name,
      distance: formData.distance,
      description: formData.description,
      link: formData.link,
      isFavorite: false,
    };
  },

  addRestaurant(restaurant: Restaurant, restaurantList: Restaurant[]) {
    const existingRestaurant = restaurantList.find(
      item => item.category === restaurant.category && item.name === restaurant.name,
    );
    if (existingRestaurant) return false;

    restaurantList.push(restaurant);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(restaurantList));
    return true;
  },

  filterByCategory(category: FilteringCategory, restaurantList: Restaurant[]) {
    if (category === '전체') return restaurantList;
    return restaurantList.filter(restaurant => restaurant.category === category);
  },

  sortByProperty(property: SortingProperty, restaurantList: Restaurant[]) {
    // return restaurantList.sort((first, second) => {
    //   if (first[property] === second[property]) return first.id > second.id ? 1 : -1;
    //   else return first[property] > second[property] ? 1 : -1;
    // });
    return restaurantList.sort((first, second) => {
      return first[property] > second[property] ? 1 : -1;
    });
  },

  filterFavorite(restaurantList: Restaurant[]) {
    return restaurantList.filter(restaurant => restaurant.isFavorite);
  },
};

export default RestaurantService;

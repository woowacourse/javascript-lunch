import { LOCAL_STORAGE_KEY } from '../../constant/constants';
import { FilteringCategory, SortingProperty, Restaurant, Restaurants } from '../../interface/RestaurantInterfaces';
import { $ } from '../../utils/querySelector';
import RestaurantEntity from './../entities/RestaurantEntity';

const RestaurantService: Restaurants = {
  createRestaurant() {
    const category = $('#category').value;
    const name = $('#name').value;
    const distance = $('#distance').value;
    const description = $('#description').value;
    const link = $('#link').value;

    return {
      id: category + name,
      category: category,
      name: name,
      distance: distance,
      description: description,
      link: link,
      isFavorite: false,
    };
  },

  addRestaurant(restaurant: Restaurant, restaurantList: Restaurant[]) {
    const existingRestaurant = restaurantList.find(
      item => item.category === restaurant.category && item.name === restaurant.name,
    );
    if (existingRestaurant) return false;

    restaurantList.push(new RestaurantEntity({ restaurant: restaurant }));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(restaurantList));
    return true;
  },

  filterByCategory(category: FilteringCategory, restaurantList: Restaurant[]) {
    if (category === '전체') return restaurantList;
    return restaurantList.filter(restaurant => restaurant.category === category);
  },

  sortByProperty(property: SortingProperty, restaurantList: Restaurant[]) {
    return restaurantList.sort((first, second) => {
      if (first[property] === second[property]) return first.id > second.id ? 1 : -1;
      else return first[property] > second[property] ? 1 : -1;
    });
  },

  filterFavorite(restaurantList: Restaurant[]) {
    return restaurantList.filter(restaurant => restaurant.isFavorite);
  },
};

export default RestaurantService;

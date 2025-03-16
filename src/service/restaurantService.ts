import StoreService from './StoreService.ts';
import { Restaurant, RestaurantInput, RestaurantState } from '../../types/domain';
import { STORE } from '../constants/database.ts';
import sortRestaurants from '../domain/sortRestaurants.ts';
import filterByFavorite from '../domain/filterByFavorite.ts';
import filterByCategory from '../domain/filterByCategory.ts';

export interface RestaurantService {
  restaurantManager: StoreService<Restaurant>;
  getRestaurants: () => Restaurant[];
  getRestaurantById: (id: number) => Restaurant;
  addRestaurant: (restaurantData: RestaurantInput) => void;
  updateRestaurant: (id: number, newProperty: Partial<Restaurant>) => void;
  deleteRestaurant: (id: number) => void;
  getFilteredRestaurants: (states: RestaurantState, restaurants: Restaurant[]) => Restaurant[];
  toggleFavorite: (id: number) => void;
}

const restaurantService: RestaurantService = {
  restaurantManager: new StoreService<Restaurant>(STORE.restaurantsKey),

  getRestaurants() {
    return this.restaurantManager.getDataList();
  },

  getRestaurantById(id) {
    return this.restaurantManager.findDataById(id);
  },

  addRestaurant(restaurantData) {
    const id = this.restaurantManager.getNewDataId();
    const restaurant = { ...restaurantData, id, favorite: false };

    this.restaurantManager.addData(restaurant);
  },

  updateRestaurant(id, newProperty) {
    const existing = this.getRestaurantById(id);
    const updated = { ...existing, ...newProperty };

    this.restaurantManager.updateDataById(id, updated);
  },

  deleteRestaurant(id) {
    this.restaurantManager.deleteDataById(id);
  },

  getFilteredRestaurants(states, restaurants) {
    const { isFavoriteTab, category, sort } = states;

    const favoriteFiltered = filterByFavorite(isFavoriteTab, restaurants);
    const categoryFiltered = filterByCategory(category, favoriteFiltered);
    const filteredRestaurants = sortRestaurants(sort, categoryFiltered);

    return filteredRestaurants;
  },

  toggleFavorite(id) {
    const targetData = this.restaurantManager.findDataById(id);
    const updateData = { favorite: !targetData.favorite };

    this.updateRestaurant(id, updateData);

    return updateData.favorite;
  },
};

export default restaurantService;

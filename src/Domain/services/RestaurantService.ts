import Restaurant from '../Restaurant';
import { validateDropDown, validateName, validateDescription, validateLink } from '../validation/validations';
import {
  getRestaurantData,
  addRestaurant as addRestaurantToStorage,
  updateRestaurant as updateRestaurantInStorage,
  deleteRestaurant as deleteRestaurantFromStorage,
} from '../data/RestaurantStorage';
import { RestaurantData } from '../types/RestaurantTypes';

export type RestaurantEventType = 'add' | 'delete' | 'favorite' | 'update';
export type RestaurantEventListener = (eventType: RestaurantEventType, restaurant: Restaurant) => void;

const eventListeners: RestaurantEventListener[] = [];

export const addRestaurantEventListener = (listener: RestaurantEventListener): void => {
  eventListeners.push(listener);
};

export const removeRestaurantEventListener = (listener: RestaurantEventListener): void => {
  const index = eventListeners.indexOf(listener);
  if (index !== -1) {
    eventListeners.splice(index, 1);
  }
};

const notifyListeners = (eventType: RestaurantEventType, restaurant: Restaurant): void => {
  eventListeners.forEach((listener) => listener(eventType, restaurant));
};

export const getRestaurantList = (): Restaurant[] => {
  const restaurantData = getRestaurantData();
  return restaurantData.map(
    (data) =>
      new Restaurant(data.name, data.distance, data.category, data.description, data.link, data.isFavorite || false),
  );
};

export const getFilteredRestaurants = (category: string, sortBy: string): Restaurant[] => {
  let filteredList = getRestaurantList();

  if (category !== '전체') {
    filteredList = filteredList.filter((restaurant) => restaurant.getCategory() === category);
  }

  if (sortBy === 'name') {
    filteredList.sort((a, b) => a.getName().localeCompare(b.getName()));
  } else if (sortBy === 'distance') {
    filteredList.sort((a, b) => {
      const distanceA = parseInt(a.getDistance().replace(/[^0-9]/g, ''), 10) || 0;
      const distanceB = parseInt(b.getDistance().replace(/[^0-9]/g, ''), 10) || 0;
      return distanceA - distanceB;
    });
  }

  return filteredList;
};

const validateRestaurantData = (restaurantData: RestaurantData): void => {
  validateDropDown('카테고리', restaurantData.category);
  validateName(restaurantData.name);
  validateDropDown('거리', restaurantData.distance);

  if (restaurantData.description) {
    validateDescription(restaurantData.description);
  }

  if (restaurantData.link) {
    validateLink(restaurantData.link);
  }
};

export const addRestaurant = (restaurantData: RestaurantData): Restaurant => {
  validateRestaurantData(restaurantData);

  const newRestaurant = new Restaurant(
    restaurantData.name,
    restaurantData.distance,
    restaurantData.category,
    restaurantData.description || '',
    restaurantData.link || '',
    restaurantData.isFavorite || false,
  );

  addRestaurantToStorage(restaurantData);
  notifyListeners('add', newRestaurant);

  return newRestaurant;
};

export const deleteRestaurant = (restaurant: Restaurant): void => {
  const restaurantList = getRestaurantList();
  const index = restaurantList.findIndex(
    (r) => r.getName() === restaurant.getName() && r.getCategory() === restaurant.getCategory(),
  );

  if (index !== -1) {
    deleteRestaurantFromStorage(index);
    notifyListeners('delete', restaurant);
  }
};

export const toggleFavorite = (restaurant: Restaurant): void => {
  const restaurantList = getRestaurantList();
  const index = restaurantList.findIndex(
    (r) => r.getName() === restaurant.getName() && r.getCategory() === restaurant.getCategory(),
  );

  if (index !== -1) {
    restaurant.toggleFavorite();

    const updatedData: RestaurantData = {
      name: restaurant.getName(),
      distance: restaurant.getDistance(),
      category: restaurant.getCategory(),
      description: restaurant.getDescription(),
      link: restaurant.getLink(),
      isFavorite: restaurant.isFavorite(),
    };

    updateRestaurantInStorage(index, updatedData);
    notifyListeners('favorite', restaurant);
  }
};

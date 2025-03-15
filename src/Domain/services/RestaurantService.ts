import Restaurant from '../Restaurant';
import { validateDropDown, validateName, validateDescription, validateLink } from '../validation/validations';
import {
  mockRestaurantData,
  saveRestaurantData,
  addRestaurant as addRestaurantToData,
  updateRestaurant as updateRestaurantInData,
  deleteRestaurant as deleteRestaurantFromData,
} from '../data/MockRestaurantData';
import { RestaurantData } from '../types/RestaurantTypes';

export type RestaurantEventType = 'add' | 'delete' | 'favorite' | 'update';
export type RestaurantEventListener = (eventType: RestaurantEventType, restaurant: Restaurant) => void;

let restaurantList: Restaurant[] = mockRestaurantData.map(
  (data) =>
    new Restaurant(data.name, data.distance, data.category, data.description, data.link, data.isFavorite || false),
);

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

// localStorage에 현재 레스토랑 목록 저장
const saveRestaurants = (): void => {
  const restaurantDataList: RestaurantData[] = restaurantList.map((restaurant) => ({
    name: restaurant.getName(),
    distance: restaurant.getDistance(),
    category: restaurant.getCategory(),
    description: restaurant.getDescription(),
    link: restaurant.getLink(),
    isFavorite: restaurant.isFavorite(),
  }));

  saveRestaurantData(restaurantDataList);
};

export const getRestaurantList = (): Restaurant[] => [...restaurantList];

export const getFilteredRestaurants = (category: string, sortBy: string): Restaurant[] => {
  let filteredList = [...restaurantList];

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

  restaurantList = [...restaurantList, newRestaurant];

  // localStorage에 저장
  addRestaurantToData(restaurantData);

  notifyListeners('add', newRestaurant);

  return newRestaurant;
};

export const deleteRestaurant = (restaurant: Restaurant): void => {
  const index = restaurantList.findIndex(
    (r) => r.getName() === restaurant.getName() && r.getCategory() === restaurant.getCategory(),
  );

  if (index !== -1) {
    restaurantList = restaurantList.filter((r) => r !== restaurant);

    // localStorage에서 삭제
    deleteRestaurantFromData(index);

    notifyListeners('delete', restaurant);
  }
};

export const toggleFavorite = (restaurant: Restaurant): void => {
  const index = restaurantList.findIndex(
    (r) => r.getName() === restaurant.getName() && r.getCategory() === restaurant.getCategory(),
  );

  if (index !== -1) {
    restaurant.toggleFavorite();

    // localStorage에 업데이트
    const updatedData: RestaurantData = {
      name: restaurant.getName(),
      distance: restaurant.getDistance(),
      category: restaurant.getCategory(),
      description: restaurant.getDescription(),
      link: restaurant.getLink(),
      isFavorite: restaurant.isFavorite(),
    };

    updateRestaurantInData(index, updatedData);

    notifyListeners('favorite', restaurant);
  }
};

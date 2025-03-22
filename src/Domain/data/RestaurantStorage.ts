import { RestaurantData } from '../types/RestaurantTypes';
import { InitialRestaurantData } from './InitialRestaurantData';

const STORAGE_KEY = 'restaurantData';

export const getRestaurantData = (): RestaurantData[] => {
  if (typeof window === 'undefined') {
    return InitialRestaurantData;
  }

  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : InitialRestaurantData;
};

export const saveRestaurantData = (data: RestaurantData[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

export const addRestaurant = (restaurant: RestaurantData): void => {
  const currentData = getRestaurantData();
  const updatedData = [...currentData, restaurant];
  saveRestaurantData(updatedData);
};

export const updateRestaurant = (index: number, restaurant: RestaurantData): void => {
  const currentData = getRestaurantData();
  const updatedData = [...currentData];
  updatedData[index] = restaurant;
  saveRestaurantData(updatedData);
};

export const deleteRestaurant = (index: number): void => {
  const currentData = getRestaurantData();
  const updatedData = currentData.filter((_, i) => i !== index);
  saveRestaurantData(updatedData);
};

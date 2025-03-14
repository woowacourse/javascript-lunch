import Restaurant from '../Restaurant';
import { validateDropDown, validateName, validateDescription, validateLink } from '../validation/validations';
import { mockRestaurantData } from '../data/MockRestaurantData';
import { RestaurantData } from '../types/RestaurantTypes';

let restaurantList: Restaurant[] = mockRestaurantData.map(
  (data) => new Restaurant(data.name, data.distance, data.category, data.description, data.link),
);

export const getRestaurantList = (): Restaurant[] => [...restaurantList];

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
  );

  restaurantList = [...restaurantList, newRestaurant];
  return newRestaurant;
};

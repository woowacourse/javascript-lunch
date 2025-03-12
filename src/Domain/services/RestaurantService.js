import Restaurant from '../Restaurant.js';
import { validateDropDown, validateName, validateDescription, validateLink } from '../validation/validations.js';
import { mockRestaurantData } from '../data/MockRestaurantData.js';

let restaurantList = mockRestaurantData.map(
  (data) => new Restaurant(data.name, data.distance, data.description, data.category),
);

export const getRestaurantList = () => [...restaurantList];

const validateRestaurantData = (restaurantData) => {
  validateDropDown('카테고리', restaurantData.category);
  validateName(restaurantData.name);
  validateDropDown('거리', restaurantData.distance);
  validateDescription(restaurantData.description);
  validateLink(restaurantData.link);
};

export const addRestaurant = (restaurantData) => {
  validateRestaurantData(restaurantData);

  const newRestaurant = new Restaurant(
    restaurantData.name,
    restaurantData.distance,
    restaurantData.description,
    restaurantData.category,
  );

  restaurantList = [...restaurantList, newRestaurant];
  return newRestaurant;
};

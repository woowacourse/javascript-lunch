import Restaurant from '../Restaurant.js';
import { RestaurantList } from '../RestaurantList.js';
import { validateDropDown, validateName, validateDescription, validateLink } from '../validation/validations.js';

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
    restaurantData.category
  );
  
  RestaurantList.push(newRestaurant);
  return newRestaurant;
};
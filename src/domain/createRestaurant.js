import Restaurant from "../model/Restaurant";
import { restaurantList } from "../restaurantList";

export const createRestaurant = (info) => {
  const restaurant = new Restaurant(info);
  restaurantList.push(restaurant);

  return restaurant;
};

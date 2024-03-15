import { Irestaurant } from "../types/restaurant";

const removeRestaurant = (restaurant: Irestaurant) => {
  const item = document.getElementById(String(restaurant.id));
  item?.remove();
};

export default removeRestaurant;

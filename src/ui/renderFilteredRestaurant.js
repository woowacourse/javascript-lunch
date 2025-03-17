import changeModalContents from "./changeModalContents.js";
import storage from "../domain/storage.ts";
import createRestaurantCards from "../service/createRestaurantCards.js";
import renderRestaurants from "./renderRestaurant.js";
import { $ } from "../utils/dom.js";
import eventHandlers from "../events/eventHandlers.js";

const renderFilteredRestaurants = (restaurantList) => {
  const filteredCardList = createRestaurantCards(
    restaurantList.filter(),
    eventHandlers.filtered(restaurantList)
  );

  return renderRestaurants(filteredCardList);
};

export default renderFilteredRestaurants;

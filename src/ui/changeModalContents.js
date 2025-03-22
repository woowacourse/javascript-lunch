import RestaurantCard from "../components/RestaurantCard/index.js";
import RestaurantDetailButtonContainer from "../components/RestaurantDetailButtonContainer/index.js";
import clickDelete from "../events/clickDelete.js";
import { $ } from "../utils/dom.js";
import eventHandlers from "../events/eventHandlers.js";

const changeModalContents = (restaurant, restaurantList) => {
  const restaurantDetailModal = $(".restaurant-detail-modal");
  restaurantDetailModal.innerHTML = "";

  restaurantDetailModal.append(
    RestaurantCard(restaurant, eventHandlers.favorite(restaurantList)),
    RestaurantDetailButtonContainer(restaurant, () => {
      clickDelete(restaurant, restaurantList);
    })
  );

  return restaurantDetailModal;
};

export default changeModalContents;

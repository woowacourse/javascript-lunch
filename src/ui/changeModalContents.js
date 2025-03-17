import RestaurantCard from "../components/RestaurantCard/index.js";
import RestaurantDetailButtonContainer from "../components/RestaurantDetailButtonContainer/index.js";
import clickDelete from "../service/clickDelete.js";
import { $ } from "../utils/dom.js";
import eventHandlers from "../events/eventHandlers.js";

const changeModalContents = (restaurant, restaurantList) => {
  const restaurantDetailModal = $(".restaurant-detail-modal");
  restaurantDetailModal.innerHTML = "";

  restaurantDetailModal.appendChild(
    RestaurantCard(restaurant, eventHandlers.favorite(restaurantList))
  );

  restaurantDetailModal.appendChild(
    RestaurantDetailButtonContainer(restaurant, () => {
      clickDelete(restaurant, restaurantList);
    })
  );

  return restaurantDetailModal;
};

export default changeModalContents;

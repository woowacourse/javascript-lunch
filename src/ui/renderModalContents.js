import RestaurantCard from "../components/RestaurantCard/index.js";
import RestaurantDetailButtonContainer from "../components/RestaurantDetailButtonContainer/index.js";
import clickDelete from "../events/clickDelete.js";
import { $ } from "../utils/dom.js";
import restaurantCardEvents from "../events/restaurantCardEvents.js";

const renderModalContents = (restaurant, restaurantList) => {
  const restaurantDetailModal = $(".restaurant-detail-modal");
  restaurantDetailModal.innerHTML = "";

  restaurantDetailModal.append(
    RestaurantCard(restaurant, restaurantCardEvents(restaurantList)),
    RestaurantDetailButtonContainer(() => {
      clickDelete(restaurant, restaurantList);
    })
  );

  return restaurantDetailModal;
};

export default renderModalContents;

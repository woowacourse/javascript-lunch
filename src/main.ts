import restaurantStore from "./restaurantStore.ts";
import restaurantElement from "./restaurantElement.ts";

const runApp = () => {
  restaurantStore.loadRestaurantListData();
  restaurantElement.init();
  restaurantElement.eventHandler();
  restaurantStore.update(restaurantStore.state.restaurants);
};

document.addEventListener("DOMContentLoaded", runApp);

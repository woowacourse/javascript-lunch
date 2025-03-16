import App from "./App";
import RestaurantService from "./services/RestaurantService.js";
import RestaurantStore from "./stores/RestaurantStore.js";

const restaurantStore: RestaurantStore = new RestaurantStore();
const restaurantService: RestaurantService = new RestaurantService(
  restaurantStore
);

new App(restaurantStore, restaurantService);

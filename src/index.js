import App from "./App.js";
import RestaurantService from "./services/RestaurantService.js";
import RestaurantStore from "./stores/RestaurantStore.js";

const restaurantStore = new RestaurantStore();
const restaurantService = new RestaurantService(restaurantStore);

new App(restaurantStore, restaurantService);

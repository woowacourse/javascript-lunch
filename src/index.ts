import App from "./App";
import RestaurantStore from "./stores/RestaurantStore.js";

const store: RestaurantStore = new RestaurantStore();
new App(store);

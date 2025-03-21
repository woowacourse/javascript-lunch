import App from "./App";
import RestaurantStore from "./stores/RestaurantStore.js";

window.addEventListener("DOMContentLoaded", () => {
  const store: RestaurantStore = new RestaurantStore();
  new App(store);
});

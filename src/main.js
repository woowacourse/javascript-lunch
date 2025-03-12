// src/main.js
import { initializeRestaurantList } from "./initialization/restaurantInitializer.js";
import { initializeFilters } from "./initialization/filterInitializer.js";
import { initializeModalButton } from "./initialization/modalInitializer.js";

addEventListener("load", () => {
  initializeRestaurantList();
  initializeFilters();
  initializeModalButton();
});


import { initializeRestaurantList } from "./initialization/restaurantInitializer.js";
import { initializeFilters } from "./initialization/filterInitializer.js";
import { initializeModalButton } from "./initialization/modalInitializer.js";
import { initializeTabs } from "./initialization/tabInitializer.js";

addEventListener("load", () => {
  initializeRestaurantList();
  initializeFilters();
  initializeModalButton();
  initializeTabs();

});

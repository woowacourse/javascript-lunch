import { initializeRestaurantList } from "./initialization/restaurantInitializer.js";
import { initializeFilters } from "./initialization/filterInitializer.js";
import { initializeModalButton } from "./initialization/modalInitializer.js";
import { initializeTabs } from "./initialization/tabInitializer.js";
import { restaurantStore } from "./store/restaurantStore.js";

addEventListener("load", () => {
  // 명시적으로 데이터 스토어 초기화!
  restaurantStore.initialize();

  initializeRestaurantList();
  initializeFilters();
  initializeModalButton();
  initializeTabs();
});

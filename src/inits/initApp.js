import initPersistenceData from "./initPersistenceData.js";
import initRestaurantList from "./initRestaurantList.js";
import { initAppLayout } from "./initAppLayout.js";
import initSeletedTab from "./initSeletedTab.js";

const initApp = () => {
  initPersistenceData();

  const restaurantList = initRestaurantList();

  initAppLayout(restaurantList);

  initSeletedTab();
};

export default initApp;

import { $ } from "../utils/dom.js";
import RestaurantList from "../domain/RestaurantList.ts";
import Persistence from "../domain/persistence/Persistence.ts";
import header from "../components/Header/index.js";
import Modal from "../components/common/Modal/index.js";
import Title from "../components/common/Title/index.js";
import RegisterForm from "../components/RegisterForm/index.js";
import modalClose from "../components/common/Modal/modalClose.js";
import Tab from "../components/Tab/index.js";
import { restaurants } from "../restaurantListData.js";
import renderAllpage from "../ui/renderAllpage.js";
import clickAddButton from "../events/clickAddButton.js";
import { clearInput } from "../utils/clearInput.js";
import renderFavoritesPage from "../ui/renderFavoritesPage.js";
import initPersistenceData from "./initPersistenceData.js";
import { createRestaurantList } from "./initRestaurantList.js";
import { initAppLayout } from "./initAppLayout.js";
import initSeletedTab from "./initSeletedTab.js";

const initApp = () => {
  initPersistenceData();

  const restaurantList = createRestaurantList();

  initAppLayout(restaurantList);

  initSeletedTab();
};

export default initApp;

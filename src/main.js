import RestaurantFormModal from "./components/Modal/Modal/RestaurantFormModal.js";
import createHeader from "./components/Header/Header.js";
import createCategoryFilter from "./components/Filter/CreateCategoryFilter.js";
import createSortFilter from "./components/Filter/CreateSortFilter.js";
import createTabFilter from "./components/Tab/tabFilter.js";
import createRestaurantList from "./Restaurant/RestaurantList.js";
import RestaurantList from "./Restaurant/RestaurantList.js";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const header = createHeader({ title: "점심 뭐 먹지" });
  body.prepend(header);

  const restaurantList = new RestaurantList();
  restaurantList.createRestaurantList();

  createTabFilter(restaurantList);

  const addRestaurantModalButton = header.querySelector(".gnb__button");

  const restaurantFormModal = new RestaurantFormModal(
    restaurantList,
    addRestaurantModalButton
  );
});

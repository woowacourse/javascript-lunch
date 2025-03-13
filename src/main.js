import RestaurantFormModal from "./components/Modal/RestaurantFormModal.js";
import createHeader from "./components/Header/Header.js";
import createCategoryFilter from "./components/Filter/CategoryFilter.js";
import createSortFilter from "./components/Filter/SortFilter.js";
import createRestaurantList from "./Restaurant/RestaurantList.js";
import RestaurantList from "./Restaurant/RestaurantList.js";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const header = createHeader({ title: "점심 뭐 먹지" });
  body.prepend(header);

  createCategoryFilter();
  createSortFilter();

  const restaurantList = new RestaurantList();
  restaurantList.createRestaurantList();

  const addRestaurantModalButton = header.querySelector(".gnb__button");

  const restaurantFormModal = new RestaurantFormModal(
    restaurantList,
    addRestaurantModalButton
  );
});

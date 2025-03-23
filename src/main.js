import createHeader from "./components/Header/Header.js";
import RestaurantFormModal from "./components/Modal/Modal/RestaurantFormModal.js";
import createTabFilter from "./components/Tab/CreateTabFilter.js";
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

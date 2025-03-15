import append from "../utils/append.js";
import { $ } from "../utils/querySelectors.js";
import LunchInfoCard from "./LunchInfoCard.js";
import Modal from "./Modal.js";
import RestaurantDetail from "./RestaurantDetail.js";

function RestaurantListContainer(items) {
  const el = $(".restaurant-list");
  el.innerHTML = items.map(LunchInfoCard).join("");

  items.forEach((item) => {
    const $li = document.getElementById(`restaurant_${item.name}`);
    $li.addEventListener("click", () => {
      $("main").append(
        new Modal(`restaurantModal_${item.name}`, RestaurantDetail(item))
      );
      Modal.open(`restaurantModal_${item.name}`);
    });
  });
}

export default RestaurantListContainer;

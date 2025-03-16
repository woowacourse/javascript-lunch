import append from "../utils/append.js";
import { $ } from "../utils/querySelectors.js";
import LunchInfoCard from "./LunchInfoCard.js";
import Modal from "./Modal.js";
import RestaurantDetail from "./RestaurantDetail.js";
import FavoriteButton from "./FavoriteButton.js";

function RestaurantListContainer(items) {
  const el = $(".restaurant-list");
  el.innerHTML = items.map(LunchInfoCard).join("");

  items.forEach((item) => {
    const $li = document.getElementById(`restaurant_${item.name}`);

    new FavoriteButton($li);

    $li.addEventListener("click", (event) => {
      if (event.target.closest(".child-exclude")) {
        return;
      }
      $("main").append(
        new Modal(`restaurantModal_${item.name}`, RestaurantDetail(item))
      );
      Modal.open(`restaurantModal_${item.name}`);
    });
  });
}

export default RestaurantListContainer;

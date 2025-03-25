import LunchInfoCard from "./LunchInfoCard.js";
import FavoriteButton from "./FavoriteButton.js";
import Modal from "./Modal.js";
import { $ } from "../utils/querySelectors.js";
import append from "../utils/append.js";
import RestaurantDetail from "./RestaurantDetail.js";

function RestaurantContainer(restaurantList) {
  const renderingItems = restaurantList.items;
  const el = $(".restaurant-list");
  el.innerHTML = renderingItems.map(LunchInfoCard).join("");

  renderingItems.forEach((item) => {
    const $li = document.getElementById(`restaurant_${item.name}`);

    new FavoriteButton($li, item.name, item.favorite, restaurantList);

    $li?.addEventListener("click", (event) => {
      const target = event.target;
      if (target.closest(".child-exclude")) {
        return;
      }
      $("main").append(
        Modal(
          `restaurantModal_${item.name}`,
          RestaurantDetail(item, restaurantList)
        )
      );
      Modal.open(`restaurantModal_${item.name}`);
    });
  });
}

export default RestaurantContainer;

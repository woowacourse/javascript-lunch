import DetailModal from "../components/DetailModal";
import { GetAllRestaurants } from "./RestaurantStorage";

export default function RestaurantDetailModal() {
  const $app = document.getElementById("app");
  const $restaurant = document.querySelectorAll(".restaurant");

  $restaurant.forEach((restaurant) => {
    restaurant.addEventListener("click", (e) => {
      const $restaurant = e.target.closest(".restaurant");

      const restaurants = GetAllRestaurants();
      const restaurantName =
        $restaurant.querySelector(".restaurant__name").textContent;

      const restaurantValues = restaurants.find(
        (restaurant) => restaurant.nameValue === restaurantName
      );

      DetailModal($app, restaurantValues);
      CloseModalEvent();
    });
  });
}

function CloseModalEvent() {
  const $closeModalButton = document.querySelector(
    ".restaurant-detail-modal-close-button"
  );

  $closeModalButton.addEventListener("click", () => {
    const $modal = document.querySelector(
      ".restaurant-detail-modal-background"
    );

    $modal.remove();
    location.reload();
  });
}

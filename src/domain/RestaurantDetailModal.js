import DetailModal from "../components/DetailModal";
import { DeleteRestaurant, GetAllRestaurants } from "./RestaurantStorage";

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
      DeleteModalEvent();
      CloseModalEvent();
    });
  });
}

function DeleteModalEvent() {
  const $deleteButton = document.querySelector(
    ".restaurant-detail-modal-delete-button"
  );

  $deleteButton.addEventListener("click", (e) => {
    const $detailModal = e.target.closest(".restaurant-detail-modal");

    const $restaurantName =
      $detailModal.querySelector(".restaurant__name").textContent;

    DeleteRestaurant($restaurantName);
    location.reload();
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

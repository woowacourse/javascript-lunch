import DetailModal from "../components/DetailModal";
import { Restaurant } from "../shared/types";
import { DeleteRestaurant, GetAllRestaurants } from "./RestaurantStorage";
import { SaveFavoriteRestaurantInModal } from "./SaveFavoriteRestaurant";

export default function RestaurantDetailModal() {
  const $app = document.getElementById("app") as HTMLElement;
  const $restaurant: NodeListOf<Element> = document.querySelectorAll(
    ".restaurant__name-distance"
  );

  $restaurant.forEach((restaurant) => {
    restaurant.addEventListener("click", (e: Event) => {
      const $restaurant = (e.target as HTMLElement).closest(".restaurant");

      const restaurants = GetAllRestaurants();
      const restaurantName = (
        $restaurant?.querySelector(".restaurant__name") as HTMLElement
      )?.textContent;

      const restaurantValues = restaurants.find(
        (restaurant: Restaurant) => restaurant.nameValue === restaurantName
      );

      if (!restaurantValues) return;

      DetailModal($app, restaurantValues);
      SaveFavoriteRestaurantInModal();
      DeleteModalEvent();
      CloseModalEvent();
    });
  });
}

function DeleteModalEvent() {
  const $deleteButton = document.querySelector(
    ".restaurant-detail-modal-delete-button"
  );

  $deleteButton?.addEventListener("click", (e) => {
    const $detailModal = (e.target as HTMLElement).closest(
      ".restaurant-detail-modal"
    );

    const $restaurantName = (
      $detailModal?.querySelector(".restaurant__name") as HTMLElement
    )?.textContent;

    DeleteRestaurant($restaurantName);
    alert(`${$restaurantName} 음식점이 삭제되었습니다.`);
    location.reload();
  });
}

function CloseModalEvent() {
  const $closeModalButton = document.querySelector(
    ".restaurant-detail-modal-close-button"
  ) as HTMLButtonElement;

  $closeModalButton.addEventListener("click", () => {
    const $modal = document.querySelector(
      ".restaurant-detail-modal-background"
    );

    $modal?.remove();
    location.reload();
  });

  CloseOnDarkBackground();
}
function CloseOnDarkBackground() {
  const $modalBackground = document.querySelector(
    ".restaurant-detail-modal-background"
  ) as HTMLElement;

  $modalBackground.addEventListener("click", (e: Event) => {
    const $detailModal = document.querySelector(
      ".restaurant-detail-modal"
    ) as HTMLElement;

    if ($detailModal && e.target === $modalBackground) {
      $modalBackground.remove();
      location.reload();
    }
  });
}

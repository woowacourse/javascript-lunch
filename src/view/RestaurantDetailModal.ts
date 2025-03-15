import { Restaurant } from "../shared/types";
import {
  DeleteRestaurant,
  GetAllRestaurants,
} from "../domain/RestaurantStorage";
import { SaveFavoriteRestaurantInModal } from "../ui/SaveFavoriteRestaurant";
import DetailModal from "../ui/DetailModal";
import { CreateRestaurantList } from "../ui/CreateRestaurantList";

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

    const $modal = document.querySelector(
      ".restaurant-detail-modal-background"
    );

    $modal?.remove();
    UpdateRestaurantList();
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
    UpdateRestaurantList();
  });

  CloseOnDarkBackground();
}
function CloseOnDarkBackground() {
  const $modalBackground = document.querySelector(
    ".restaurant-detail-modal-background"
  ) as HTMLElement;

  $modalBackground.addEventListener("click", (e: Event) => {
    if (e.target === $modalBackground) {
      $modalBackground.remove();
      UpdateRestaurantList();
    }
  });
}

function UpdateRestaurantList() {
  const restaurants = GetAllRestaurants();
  CreateRestaurantList(restaurants);
}

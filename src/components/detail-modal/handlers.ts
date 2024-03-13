import restaurantListService from "../../services/restaurantListService";
import restaurantListStateStore from "../../store/RestaurantListStateStore";
import { Irestaurant } from "../../types/restaurant";

import DetailModal from "./DetailModal";

export const dimmerClickHandler = () => {
  const modal = document.getElementsByClassName("detail-modal")[0];
  const dimmer = document.getElementsByClassName("detail-modal-dackdrop")[0];

  dimmer.addEventListener("click", () => {
    modal.remove();
  });
};

const generateDetailModal = (restaurant: Element) => {
  DetailModal(
    restaurantListService.getListItemById(
      Number(restaurant.id),
      restaurantListStateStore.getListData(),
    ) as Irestaurant,
  );
};

const detailModalOpenHandler = (restaurant: Element) => {
  restaurant.addEventListener("click", () => {
    generateDetailModal(restaurant);
    dimmerClickHandler();
  });
};

export const clickRestaurantModal = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const restaurants = document.querySelectorAll(".restaurant__info");
    restaurants.forEach((restaurant) => {
      detailModalOpenHandler(restaurant);
    });
  });
};

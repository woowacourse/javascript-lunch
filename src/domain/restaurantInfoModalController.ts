import { controlFavoriteIcon } from "../component/restaurantList";
import { closeRestaurantInfoModal, deleteRestaurant, renderRestaurantInfoModal } from "../modal/restaurantInfoModal";
import { executeClickEventListener } from "../util/eventListener";
import { $, $$ } from "../util/selector";
import { LOCAL_STORAGE_KEY } from "../constant";
const { RESTAURANT } = LOCAL_STORAGE_KEY;

export const controlRestaurants = () => {
  controlFavoriteIcon();

  $$(".restaurant").forEach((restaurant) =>
    executeClickEventListener(restaurant, (event: Event) => {
      const clickedElement = event.currentTarget as HTMLElement;
      const clickedRestaurantKey = `${RESTAURANT}${
        clickedElement.children[1].children[0].textContent as string
      }`;
      const clickedRestaurantInfo = localStorage.getItem(clickedRestaurantKey);
      const target = event.target as HTMLImageElement;

      if (target.classList.value !== "favorite-icon") {
        const body = $("body") as HTMLBodyElement;
        body.style.overflow = "hidden";

        $("#restaurant-info-modal")?.classList.add("modal--open");
        renderRestaurantInfoModal(JSON.parse(String(clickedRestaurantInfo)));
      }

      controlRestaurantInfoModal();
    })
  );
};

const controlRestaurantInfoModal = () => {
  closeRestaurantInfoModal();
  deleteRestaurant();
};

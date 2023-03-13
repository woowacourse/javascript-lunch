import { executeEventListener } from "../util/eventListener";
import { $, $$ } from "../util/selector";
import { updateRestaurants } from "./filter";
import { FAVORITE_IMAGE } from "../constant/imageConstant";
import { LOCAL_STORAGE_KEY } from "../constant";
const { RESTAURANT } = LOCAL_STORAGE_KEY;

export const controlFavoriteIcon = () => {
  $$(".favorite-icon").forEach((icon) =>
    executeEventListener(icon, {
      type: "click",
      listener: (event) => {
        toggleFavoriteIcon(event);
        updateRestaurants();
      },
    })
  );
};

export const controlModalFavoriteIcon = () => {
  executeEventListener($("#restaurant-info-modal .favorite-icon")!, {
    type: "click",
    listener: (event) => {
      toggleFavoriteIcon(event);
      updateRestaurants();
    },
  });
};

const toggleFavoriteIcon = (event: Event) => {
  const img = event.target as HTMLImageElement;
  const clickedRestaurantKey =
    img.closest(".restaurant")?.id ??
    `${RESTAURANT}${img.closest(".modal-container")?.id}`;
  const clickedRestaurantInfo = JSON.parse(
    String(localStorage.getItem(clickedRestaurantKey))
  );

  const isFavorite = clickedRestaurantInfo.favorite === "favorite";

  if (isFavorite) {
    changeFavoriteImage(img, "none");
    clickedRestaurantInfo.favorite = "none";
  } else {
    changeFavoriteImage(img, "favorite");
    clickedRestaurantInfo.favorite = "favorite";
  }
  changeFavoriteInLocalStorage(clickedRestaurantKey, clickedRestaurantInfo);
};

const changeFavoriteImage = (
  img: HTMLImageElement,
  state: "none" | "favorite"
) => {
  img.src = `${location.href}favorite-icon-${FAVORITE_IMAGE[state]}.png`;
};

const changeFavoriteInLocalStorage = (key: string, info: string) => {
  localStorage.setItem(key, JSON.stringify(info));
};

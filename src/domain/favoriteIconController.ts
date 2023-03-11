import { executeEventListener } from "../util/eventListener";
import { $, $$ } from "../util/selector";
import { updateRestaurants } from "./filter";
import { FAVORITE_IMAGE } from "../constant/imageConstant";
import { updateAndInitRestaurants } from "../component/restaurants";
import { LOCAL_STORAGE_KEY } from "../constant";
const { RESTAURANT } = LOCAL_STORAGE_KEY;

export const controlFavoriteIcon = () => {
  $$(".favorite-icon").forEach((icon) =>
    executeEventListener(icon, {
      type: "click",
      listener: (event) => {
        console.log("click");
        toggleFavoriteIcon(event);
        updateAndInitRestaurants();
      },
    })
  );
};

export const controlModalFavoriteIcon = () => {
  executeEventListener($("#restaurant-info-modal .favorite-icon")!, {
    type: "click",
    listener: (event: Event) => {
      console.log("modal fav icon click");
      toggleFavoriteIcon(event);
      updateRestaurants();
    },
  });
};

const toggleFavoriteIcon = (event: Event) => {
  const img = event.target as HTMLImageElement;
  const keyName = img.closest("div")?.children[0].textContent as string;
  const clickedRestaurantKey = `${RESTAURANT}${keyName}`;
  const clickedRestaurantInfo = JSON.parse(
    String(localStorage.getItem(clickedRestaurantKey))
  );

  const isNotFavorite =
    img.src === `${location.href}favorite-icon-${FAVORITE_IMAGE["none"]}.png`;

  if (isNotFavorite) {
    changeFavoriteImage(img, "favorite");
    clickedRestaurantInfo.favorite = "favorite";
  } else {
    changeFavoriteImage(img, "none");
    clickedRestaurantInfo.favorite = "none";
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

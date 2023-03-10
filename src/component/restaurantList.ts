import { RestaurantType } from "../type";
import { $, $$ } from "../util/selector";
import { CATEGORY_IMAGE, FAVORITE_IMAGE } from "../constant/imageConstant";
import { FAVORITE_ALT, LOCAL_STORAGE_KEY } from "../constant";
import { executeClickEventListener } from "../util/eventListener";
import { updateRestaurantList } from "../domain/filter";
const { RESTAURANT } = LOCAL_STORAGE_KEY;

// UI
const renderRestaurant = (info: RestaurantType) => {
  return `<li class="restaurant">
    <div class="restaurant__category">
      <img
        src="./category-${CATEGORY_IMAGE[info.category]}.png"
        alt="${info.category}"
        class="category-icon"/>
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${info.name}</h3>
      <span class="restaurant__distance text-body">
        캠퍼스부터 ${info.distance}분 내
      </span>
      <img src="./favorite-icon-${FAVORITE_IMAGE[info.favorite]}.png" alt="${
    FAVORITE_ALT[info.favorite]
  }" class="favorite-icon" />
      <p class="restaurant__description text-body">${info.description}</p>
    </div>
  </li>`;
};

const combineAllRestaurants = (restaurantList: RestaurantType[]) => {
  return restaurantList
    .map((restaurant: RestaurantType) => renderRestaurant(restaurant))
    .join("");
};

export const renderRestaurantList = (restaurantList: RestaurantType[]) => {
  const restaurantListElement = $(".restaurant-list-container") as HTMLElement;

  restaurantListElement.innerHTML = `
  <ul class="restaurant-list">${combineAllRestaurants(restaurantList)}</ul>
  `;
};

// Domain
export const controlFavoriteIcon = () => {
  $$(".favorite-icon").forEach((icon) =>
    executeClickEventListener(icon, (event) => {
      toggleFavoriteIcon(event);
      updateRestaurantList();
    })
  );
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

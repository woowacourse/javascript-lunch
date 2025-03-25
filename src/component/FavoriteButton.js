import toElement from "../utils/toElement.js";
import { FAVORITE_ICON } from "../constants/constants.js";
import append from "../utils/append.js";
import RestaurantContainer from "./RestaurantContainer.js";

function FavoriteButton(parentEl, name, favorite, restaurantList) {
  let isFavorite = favorite;

  const buttonEl = toElement(`
    <button type="button" class="gnb__button child-exclude" aria-label="favorite" style="margin-left: auto">
      <img src=${FAVORITE_ICON[isFavorite]} alt="favorite" />
    </button>
  `);

  function toggleState() {
    isFavorite = !isFavorite;
    buttonEl.querySelector("img").src = FAVORITE_ICON[isFavorite];
    restaurantList.changeFavoriteState(name);
    RestaurantContainer(restaurantList);
  }

  buttonEl.addEventListener("click", toggleState);

  append(parentEl, buttonEl);

  return {
    toggleState,
  };
}

export default FavoriteButton;

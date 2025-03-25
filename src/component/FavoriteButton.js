import toElement from "../utils/toElement.js";
import { FAVORITE_ICON } from "../constants/constants.js";
import append from "../utils/append.js";
import RestaurantContainer from "./RestaurantContainer.js";

class FavoriteButton {
  #el;
  #favorite;

  constructor(parentEl, name, favorite, restaurantList) {
    this.#favorite = favorite;
    this.#el = toElement(`
        <button type="button" class="gnb__button child-exclude" aria-label="favorite" style="margin-left: auto">
          <img src=${FAVORITE_ICON[favorite]} alt="favotire" />
        </button>
      `);

    this.#el.addEventListener("click", () =>
      this.toggleState(name, restaurantList, favorite)
    );

    append(parentEl, this.#el);
  }

  toggleState(name, restaurantList) {
    this.#favorite = !this.#favorite;
    this.#el.querySelector("img").src = FAVORITE_ICON[this.#favorite];
    restaurantList.changeFavoriteState(name);
    RestaurantContainer(restaurantList);
  }
}

export default FavoriteButton;

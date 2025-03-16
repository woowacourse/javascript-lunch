import toElement from "../utils/toElement.js";
import { FAVORITE_ICON } from "../constants/constants.js";
import append from "../utils/append.js";

class FavoriteButton {
  #state;
  #el;

  constructor(element) {
    this.#state = false;
    this.#el = toElement(`
        <button type="button" class="gnb__button child-exclude" aria-label="favorite" style="margin-left: auto">
          <img src=${FAVORITE_ICON[this.#state]} alt="favotire" />
        </button>
      `);

    this.#el.addEventListener("click", () => this.toggleState());
    append(element, this.#el);
  }

  toggleState() {
    this.#state = !this.#state;
    this.#el.querySelector("img").src = FAVORITE_ICON[this.#state];
  }
}

export default FavoriteButton;

import { categoryToIconNameMapper, distancesMapper } from "../../../constants";
import { Restaurant } from "../../../types";
import BaseComponent from "../../../util/BaseComponent";

interface Props {
  restaurants: Restaurant[];
}
interface State {}
class RestaurantListSection extends BaseComponent<Props, State> {
  protected state: State;

  constructor(props: Props) {
    const $section = document.createElement("section");
    $section.classList.add("restaurant-list-container");
    super($section, props);
    this.state = {};
  }

  protected setEvent(): void {}

  protected compose(): void {
    this.$root.innerHTML = this.innerHTML();
  }

  private innerHTML() {
    return /*html*/ `
      <ul class="restaurant-list">
        ${this.props.restaurants
          .map((restaurant) => {
            return /*html*/ `
            <li class="restaurant">
              <div class="restaurant__category">
                <img
                  src=${categoryToIconNameMapper[restaurant.category]}
                  alt=${restaurant.category}
                  class="category-icon"
                />
              </div>
              <div class="restaurant__info">
                <div class="restaurant__header">
                  <div>
                    <h3 class="restaurant__name text-subtitle">${
                      restaurant.name
                    }</h3>
                    <span class="restaurant__distance text-body"
                      >캠퍼스부터 ${distancesMapper[restaurant.distance]}</span
                    >
                  </div>
                  <img
                    class="favorite-icon"
                    src=${
                      restaurant.isGoTo
                        ? "favorite-icon-filled.png"
                        : "favorite-icon-lined.png"
                    }
                    alt=${
                      restaurant.isGoTo
                        ? "자주가는음식점"
                        : "자주가지않은음식점"
                    }
                  />
                </div>
                <p class="restaurant__description text-body">
                ${restaurant.description || ""}
                </p>
              </div>
            </li>
          `;
          })
          .join("")}
      </ul>
    `;
  }
}

export default RestaurantListSection;

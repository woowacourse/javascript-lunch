import {
  categoryToIconNameMapper,
  distancesMapper,
} from "../../../../constants";
import { Restaurant } from "../../../../types";
import BaseComponent from "../../../../util/BaseComponent";

interface ItemProps {
  restaurant: Restaurant;
  onItemClick: (id: number) => void;
  onFavoriteIconClick: (id: number) => void;
}

interface ItemState {}
class RestaurantItem extends BaseComponent<ItemProps, ItemState> {
  protected state: ItemState;

  constructor(props: ItemProps) {
    const $item = document.createElement("li");
    $item.classList.add("restaurant");
    super($item, props);
    this.state = {};
  }

  protected setEvent(): void {
    this.addEvent("li.restaurant", "click", (event: Event) => {
      if (event.target instanceof HTMLImageElement) {
        this.props.onFavoriteIconClick(this.props.restaurant.id);
        return;
      }
      this.props.onItemClick(this.props.restaurant.id);
    });
  }

  protected compose(): void {
    this.$root.innerHTML = this.innerHTML();
  }

  private innerHTML() {
    return /*html*/ `
      <div class="restaurant__category">
        <img
          src=${categoryToIconNameMapper[this.props.restaurant.category]}
          alt=${this.props.restaurant.category}
          class="category-icon"
        />
      </div>
      <div class="restaurant__info">
        <div class="restaurant__header">
          <div>
            <h3 class="restaurant__name text-subtitle">${
              this.props.restaurant.name
            }</h3>
            <span class="restaurant__distance text-body"
              >캠퍼스부터 ${
                distancesMapper[this.props.restaurant.distance]
              }</span
            >
          </div>
          <img
            class="favorite-icon"
            src=${
              this.props.restaurant.isGoTo
                ? "favorite-icon-filled.png"
                : "favorite-icon-lined.png"
            }
            alt=${
              this.props.restaurant.isGoTo
                ? "자주가는음식점"
                : "자주가지않은음식점"
            }
          />
        </div>
        <p class="restaurant__description text-body">
        ${this.props.restaurant.description || ""}
        </p>
      </div>
    `;
  }
}

export default RestaurantItem;

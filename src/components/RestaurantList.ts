import { BaseProps } from "../../types/common.js";
import { Restaurant } from "../entities";
import { isHTMLElement } from "../utils";
import RestaurantItem from "./RestaurantItem.js";
import { Component } from "./core";
import { RestaurantDetailModal } from "./modal";

interface RestaurantListProps extends BaseProps {
  restaurants: Restaurant[];
  deleteRestaurant: (id: Restaurant["id"]) => void;
  getIsFavorite: (id: Restaurant["id"]) => boolean;
  toggleFavorite: (id: Restaurant["id"]) => void;
}

class RestaurantList extends Component<{}, RestaurantListProps> {
  override setup() {
    this.eventBindings.push(
      {
        action: "select-restaurant",
        eventType: "click",
        handler: (event) => this.selectRestaurant(event),
      },
      {
        action: "toggle-favorite",
        eventType: "click",
        handler: (event: Event) => {
          event.stopPropagation();
          const $modal = document.querySelector("#modal");
          if (!isHTMLElement($modal)) return;

          const id = this.selectedId(event)!;
          this.props.toggleFavorite(id);
        },
      }
    );
  }

  private selectedId(event: Event): string | undefined {
    const $li = (event.target as HTMLElement).closest("li");
    if (!isHTMLElement($li)) return;

    return $li.dataset.id;
  }

  private selectRestaurant(event: Event) {
    const $modal = document.querySelector("#modal");
    if (!isHTMLElement($modal)) return;

    const id = this.selectedId(event)!;

    new RestaurantDetailModal($modal, {
      restaurantId: id,
      restaurants: this.props.restaurants,
      isFavorite: () => this.props.getIsFavorite(id),
      delete: (id: Restaurant["id"]) => this.props.deleteRestaurant(id),
      toggleFavorite: () => this.props.toggleFavorite(id),
    }).open();
  }

  override template() {
    return /* html */ `
    <section class="restaurant-list-container" data-testid="restaurant-list">
      <ul class="restaurant-list">
        ${this.props.restaurants
          .map(
            ({ id, category, name, distance, description }) => `
            <li class="restaurant" data-id="${id}" data-action="select-restaurant">
              ${RestaurantItem.CategoryIcon(category)}
              <div class="restaurant__info">
                ${RestaurantItem.Name(name)}
                ${RestaurantItem.Distance(distance)}
                ${RestaurantItem.Description(description)}
              </div>
              ${RestaurantItem.FavoriteButton(id, this.props.getIsFavorite(id))}
            </li>
          `
          )
          .join("")}
      </ul>
    </section>
  `;
  }
}

export default RestaurantList;

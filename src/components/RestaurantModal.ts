import Component from "../common/Component";
import { CATEGORY_IMAGE_MAPPER, DISTANCE_MAPPER } from "../constants";
import { RestaurantType } from "../types";
import RestaurantStorage from "../domain/RestaurantStorage";

interface RestaurantModalProps {
  restaurant: RestaurantType;
  loadRestaurant: Function;
}

export default class RestaurantModal extends Component<
  HTMLDivElement,
  RestaurantModalProps
> {
  render(): string {
    if (!this.props) return "";
    const { restaurant } = this.props;

    return /*html*/ `
    <div id="${restaurant.name}" class="restaurant restuarant-modal">
        <div class="restaurant__category">  
            <img
            src="${CATEGORY_IMAGE_MAPPER[restaurant.category]}"
            alt="${restaurant.category}"
            class="category-icon"
            />
        </div>
     
        <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${
          DISTANCE_MAPPER[restaurant.distance]
        }</span>
        <p class="restaurant__description text-body">${
          restaurant.description || ""
        }</p>
        <span>${restaurant.description || ""}</span>
        <div class="button-container">
            <button class="delete-button">삭제하기</button>
            <button class="cancel-button">닫기</button>
        </div>
        <img
            src="${
              restaurant.bookmark
                ? "favorite-icon-filled.png"
                : "favorite-icon-lined.png"
            }"
            alt="${restaurant.category}"
            id="${restaurant.name}"
            class="star-icon"
        />
    </div>       
    `;
  }

  setEvents(): void {
    if (!this.props) return;

    const { restaurant, loadRestaurant } = this.props;
    const $deleteButton = document.querySelector(".delete-button");
    const $cancelButton = document.querySelector(".cancel-button");
    const $modal = document.querySelector(".modal");

    $deleteButton?.addEventListener("click", (e) => {
      e.preventDefault();
      RestaurantStorage.deleteRestaurant(restaurant.name);
      loadRestaurant();
    });

    $cancelButton?.addEventListener("click", (e) => {
      e.preventDefault();
      $modal?.classList.remove("modal--open");
    });
  }
}

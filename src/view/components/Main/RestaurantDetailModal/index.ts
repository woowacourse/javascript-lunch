import BaseComponent from "../../../../util/BaseComponent";
import {
  categoryToIconNameMapper,
  distancesMapper,
} from "../../../../constants";
import { Restaurant } from "../../../../types";

interface Props {
  restaurant: Restaurant;
  onRemoveButtonClick: (id: number) => void;
  onFavoriteIconClick: (id: number) => void;
  onCancelButtonClick: () => void;
}

interface State {
  isFavorite: boolean;
}

class RestaurantDetailModal extends BaseComponent<Props, State> {
  protected state: State;

  constructor(props: Props) {
    const $modal = document.createElement("div");
    $modal.classList.add("modal", "modal--open");
    $modal.id = "restaurant-detail__modal";
    super($modal, props);
    this.state = {
      isFavorite: props.restaurant.isGoTo,
    };
  }

  protected setEvent(): void {
    this.addEvent("button#restaurant-detail-remove-button", "click", () => {
      this.props.onRemoveButtonClick(this.props.restaurant.id);
      this.$root.remove();
    });

    this.addEvent("button#restaurant-detail-close-button", "click", () => {
      this.props.onCancelButtonClick();
      this.$root.remove();
    });

    this.addEvent("img#is-go-to-button", "click", () => {
      this.props.onFavoriteIconClick(this.props.restaurant.id);
      this.setState({ isFavorite: !this.state.isFavorite });
      console.log("update state");
    });
  }

  protected compose(): void {
    console.log(this.state);
    this.$root.innerHTML = this.innerHTML();
  }

  private innerHTML() {
    return /*html*/ `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <div class="restaurant__modal-card">
          <div class="restaurant__header">
            <div class="restaurant__category">
              <img
                src=${categoryToIconNameMapper[this.props.restaurant.category]}
                alt=${this.props.restaurant.category}
                class="category-icon"
              />
            </div>
            <img
            id="is-go-to-button"
            data-id=${this.props.restaurant.id}
            class="favorite-icon"
            src=${
              this.state.isFavorite
                ? "favorite-icon-filled.png"
                : "favorite-icon-lined.png"
            }
            alt=${
              this.state.isFavorite ? "자주가는음식점" : "자주가지않는음식점"
            }
            />
          </div>
          <h3 class="restaurant__name text-subtitle">${
            this.props.restaurant.name
          }</h3>
          <span class="restaurant__distance text-body"
            >캠퍼스부터 ${distancesMapper[this.props.restaurant.distance]}</span
          >
          <p>${this.props.restaurant.description || ""}</p>
          <a href=${this.props.restaurant.link || ""}>${
      this.props.restaurant.link || ""
    }</a>
          <div class="button-container">
            <button
              type="button"
              class="button button--secondary text-caption"
              id="restaurant-detail-remove-button"
              data-id=${this.props.restaurant.id}
            >
              삭제하기
            </button>
            <button class="button button--primary text-caption" id="restaurant-detail-close-button">닫기</button>
          </div>
        </div>
      </div>
    `;
  }
}

export default RestaurantDetailModal;

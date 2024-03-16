import { RestaurantInfo } from "./../domain/Restaurant";
import EventComponent from "../abstract/EventComponent";
import {
  MODAL_EVENT,
  MODAL_EVENT_ACTION,
  RESTAURANT_DETAIL_SHOW_EVENT,
} from "../constants/event";
import { $ } from "../utils/selector";

export default class RestaurantDetail extends EventComponent {
  private restaurantDetailInfo:
    | (RestaurantInfo & { isFavorite: boolean })
    | null;

  constructor(restaurantDetailInfo = null) {
    super();
    this.restaurantDetailInfo = restaurantDetailInfo;
  }

  protected getTemplate(): string {
    if (!this.restaurantDetailInfo) {
      return "<div></div>";
    }

    const { category, isFavorite, name, timeToReach, description, link } =
      this.restaurantDetailInfo;

    return `
    <div class="restaurant-detail-container">
      <div class="restaurant-detail-icon-container">
        <category-icon category="${category}"></category-icon>
        <favorite-icon class="restaurant__favorite" isActive="${isFavorite}" itemName="${name}"></favorite-icon>
      </div>
      <p class="restaurant-detail-item-name">${name}</p>
      <span class="restaurant__distance text-body">캠퍼스부터 ${timeToReach}분 이내</span>
      <p class="text-body restaurant-detail-description">${description}</p>
      <a class="restaurant-detail-anchor" href="${link}" target="_blank">
        <p class="restaurant-detail-link">${link}</p>
      </a>

      <div class="button-container">
        <button type="button" class="button button--secondary text-caption">삭제하기</button>
        <button id="close-button" class="button button--primary text-caption">닫기</button>
      </div>
    </div>
    `;
  }

  protected setEvent(): void {
    document.addEventListener(RESTAURANT_DETAIL_SHOW_EVENT, (e) =>
      this.handleRestaurantDetailShow(e as CustomEvent)
    );

    const closeButton = $("#close-button");
    if (closeButton) {
      closeButton.addEventListener(
        "click",
        this.handleCloseButtonClick.bind(this)
      );
    }
  }

  private handleRestaurantDetailShow(e: CustomEvent) {
    const { restaurantInfo } = e.detail;

    if (!restaurantInfo) {
      return;
    }

    this.restaurantDetailInfo = restaurantInfo;

    this.connectedCallback();
  }

  private handleCloseButtonClick() {
    this.dispatchEvent(
      new CustomEvent(MODAL_EVENT.restaurantDetailModalAction, {
        bubbles: true,
        detail: {
          action: MODAL_EVENT_ACTION.close,
        },
      })
    );
  }
}

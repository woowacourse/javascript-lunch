import { RestaurantInfo } from "./../domain/Restaurant";
import EventComponent from "../abstract/EventComponent";
import {
  MODAL_EVENT,
  MODAL_EVENT_ACTION,
  RESTAURANT_REMOVE_EVENT,
  RESTAURANT_DETAIL_SHOW_EVENT,
} from "../constants/event";
import { $ } from "../utils/selector";
import restaurantStore from "../store/restaurantStore";
import favoriteStore from "../store/favoriteStore";

export default class RestaurantDetail extends EventComponent {
  private restaurantDetailInfo:
    | (RestaurantInfo & { isFavorite: boolean })
    | null;

  private eventListeners = {
    restaurantDetailShow: {
      eventName: RESTAURANT_DETAIL_SHOW_EVENT,
      handler: this.handleRestaurantDetailShow.bind(this),
    },
  };

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
        <button id="restaurant-delete-button" type="button" class="button button--secondary text-caption">삭제하기</button>
        <button id="detail-close-button" class="button button--primary text-caption">닫기</button>
      </div>
    </div>
    `;
  }

  protected setEvent(): void {
    document.addEventListener(
      this.eventListeners.restaurantDetailShow.eventName,
      this.eventListeners.restaurantDetailShow.handler
    );

    const closeButton = $("#detail-close-button");
    if (closeButton) {
      closeButton.addEventListener(
        "click",
        this.handleCloseButtonClick.bind(this)
      );
    }

    const deleteButton = $("#restaurant-delete-button");
    if (deleteButton) {
      deleteButton.addEventListener(
        "click",
        this.handleDeleteButtonClick.bind(this)
      );
    }
  }

  private handleRestaurantDetailShow(e: Event) {
    const { restaurantInfo } = (e as CustomEvent).detail;

    if (!restaurantInfo) {
      return;
    }

    this.restaurantDetailInfo = restaurantInfo;

    this.connectedCallback();
  }

  private handleCloseButtonClick() {
    this.dispatchCustomEvent(MODAL_EVENT.restaurantDetailModalAction, {
      action: MODAL_EVENT_ACTION.close,
    });
  }

  private handleDeleteButtonClick() {
    const restaurantName = this.restaurantDetailInfo?.name;
    if (!restaurantName) {
      return alert("삭제 대상이 존재하지 않습니다.");
    }

    if (!confirm(`${restaurantName}을 정말 삭제하시겠습니까?`)) {
      return;
    }

    restaurantStore.removeByName(restaurantName);
    favoriteStore.toggle(restaurantName, false);

    this.dispatchCustomEvent(RESTAURANT_REMOVE_EVENT, { name: restaurantName });

    this.dispatchCustomEvent(MODAL_EVENT.restaurantDetailModalAction, {
      action: MODAL_EVENT_ACTION.close,
    });
  }
}

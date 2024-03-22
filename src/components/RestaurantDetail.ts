import EventComponent from "../abstract/EventComponent";
import {
  ACTION_TYPES,
  MODAL_EVENT,
  RESTAURANT_EVENT,
} from "../constants/event";
import restaurantStore from "../store/restaurantStore";
import { $ } from "../utils/selector";

export default class RestaurantDetail extends EventComponent {
  private restaurantName: string | null;
  private showRestaurantInfoBind: (e: Event) => void;
  private handleRemoveRestaurantBind: () => void;

  constructor() {
    super();
    this.restaurantName = null;
    this.showRestaurantInfoBind = this.showRestaurantInfo.bind(this);
    this.handleRemoveRestaurantBind = this.handleRemoveRestaurant.bind(this);
  }

  protected getTemplate(): string {
    if (!this.restaurantName) return "";

    const restaurantInfo = restaurantStore
      .findRestaurantInfo(this.restaurantName)
      ?.getInfo();
    if (!restaurantInfo) return "";

    return `
        <article class="restaurant-detail">
            <div class="icon-wrapper">
                <category-icon category="${restaurantInfo.category}"></category-icon>
                <star-button name="${restaurantInfo.name}"></star-button>
            </div>
            <h2>${restaurantInfo.name}</h2>
            <p class="time-to-reach">캠퍼스부터 ${restaurantInfo.timeToReach}분 내</p>
            <p>${restaurantInfo.description}</p>
            <p class="restaurant-link">${restaurantInfo.link}</p>
            <div class="button-container">
                <button id="remove-restaurant-button" type="button" class="button button--secondary text-caption">삭제하기</button>
                <button id="close-detail-button" class="button button--primary text-caption">닫기</button>
            </div>
        </article>
    `;
  }

  protected setEvent(): void {
    document.addEventListener(
      RESTAURANT_EVENT.restaurantDetail,
      this.showRestaurantInfoBind
    );

    $("#close-detail-button")?.addEventListener("click", this.handleCloseModal);
    $("#remove-restaurant-button")?.addEventListener(
      "click",
      this.handleRemoveRestaurantBind
    );
  }

  private handleCloseModal() {
    this.dispatchEvent(
      new CustomEvent(MODAL_EVENT.restaurantDetailModalAction, {
        bubbles: true,
        detail: { action: ACTION_TYPES.close },
      })
    );
  }

  private handleRemoveRestaurant() {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    if (!this.restaurantName) return;

    restaurantStore.removeFavoriteRestaurantName(this.restaurantName);
    restaurantStore.removeRestaurantByName(this.restaurantName);
    this.dispatchEvent(
      new CustomEvent(RESTAURANT_EVENT.reRenderingList, {
        bubbles: true,
      })
    );
    this.handleCloseModal();
  }

  private showRestaurantInfo(e: Event) {
    if (!(e instanceof CustomEvent)) return;

    this.restaurantName = e.detail.name;
    this.render();
  }

  protected removeEvent(): void {
    document.removeEventListener(
      RESTAURANT_EVENT.restaurantDetail,
      this.showRestaurantInfoBind
    );
  }
}

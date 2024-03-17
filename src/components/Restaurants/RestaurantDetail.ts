import BaseComponent from "../BaseComponent";
import { MENU_APP_EVENTS } from "../../constants/event";
import { RestaurantItem } from "../../types/menu";
import { deleteRestaurantByName } from "../../domains/Restaurants";
import { $ } from "../../utils/dom";
import { isRestaurantItemType } from "../../utils/types";

const RESTAURANT_KEYS = ["name", "category", "distance", "isFavorite", "description", "link"];

class RestaurantDetail extends BaseComponent {
  private detailInfo: RestaurantItem | null = null;

  private getDetailTemplate(): string {
    if (!this.detailInfo) return ``;

    const { name, category, distance, description, isFavorite, link } = this.detailInfo;

    return /*html*/ `
      <div class="restaurant__info gap-4">
        <div class="flex justify-between">
          <div class="flex flex-col gap-4">
            <category-image category="${category}"></category-image>
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          </div>
          <favorite-icon is-favorite="${isFavorite}" restaurant-name="${name}"></favorite-icon>
        </div>
        <p class="text-body">${description}</p>
        ${
          link
            ? `<a href=${link} target="_blank" class="detail-link">${link}</a>`
            : '<p class="text-body font-orange">참고 링크가 존재하지 않습니다.</p>'
        }
      </div>
    `;
  }

  render() {
    this.innerHTML = /*html*/ `
      <div class="modal-container">
        <div class="restaurant-detail">
          ${this.getDetailTemplate()}
          <div class="button-container">
            <button id="delete-button" class="button button--secondary text-caption">삭제하기</button>
            <button id="detail-close-button" class="button button--primary text-caption">닫기</button>
          </div>
        </div>
      <div>
    `;
  }

  private handleShowRestaurantDetailModal(event: CustomEvent) {
    const { detailInfo } = event.detail;
    if (!isRestaurantItemType<RestaurantItem>(detailInfo, RESTAURANT_KEYS)) {
      return;
    }

    this.detailInfo = detailInfo;
    this.connectedCallback();
  }

  setEvent() {
    document.addEventListener(
      MENU_APP_EVENTS.openRestaurantDetail,
      (event) => {
        event instanceof CustomEvent && this.handleShowRestaurantDetailModal(event);
      },
      {
        once: true,
      }
    );

    $<HTMLButtonElement>(`#detail-close-button`)?.addEventListener("click", () => {
      this.emitEvent(MENU_APP_EVENTS.closeModal);
    });

    $<HTMLButtonElement>(`#delete-button`)?.addEventListener("click", () => {
      this.detailInfo && deleteRestaurantByName(this.detailInfo.name);
      this.emitEvent(MENU_APP_EVENTS.closeModal);
      this.emitEvent(MENU_APP_EVENTS.renderRestaurants);
    });
  }
}

customElements.define("restaurant-detail", RestaurantDetail);

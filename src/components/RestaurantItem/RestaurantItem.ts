import "./RestaurantItem.css";

import BaseComponent from "../BaseComponent/BaseComponent";

import {
  categoryKorean,
  categoryAsian,
  categoryChinese,
  categoryEtc,
  categoryJapanese,
  categoryWestern,
} from "../../assets/images/index";

import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";
import { CustomEventListenerDictionary } from "../BaseComponent/BaseComponent.type";

import type { RestaurantDetail } from "../../domain/Restaurant/Restaurant.type";
import type { MenuCategoryWithoutAll } from "../../constants/menuCategory/menuCategory.type";

class RestaurantItem extends BaseComponent {
  private restaurantDetail: RestaurantDetail;

  private restaurantImage: Record<MenuCategoryWithoutAll, string> = {
    아시안: categoryAsian,
    양식: categoryWestern,
    일식: categoryJapanese,
    중식: categoryChinese,
    한식: categoryKorean,
    기타: categoryEtc,
  };

  constructor(restaurantDetail: RestaurantDetail) {
    super();
    this.restaurantDetail = restaurantDetail;
  }

  public handleRestaurantItemClick() {
    this.emit(CUSTOM_EVENT_TYPE.restaurantItemClick, {
      restaurantName: this.restaurantDetail.name,
    });
  }

  public getTemplate() {
    return `
        <li class="restaurant">
            <div class="restaurant__category">
                <img src=${this.convertCategoryToImage(
                  this.restaurantDetail.category
                )} alt=${this.restaurantDetail.category} class="category-icon">
            </div>
            <div class="restaurant__info">
              <div class="restaurant__required__info">
                <div class="left-align">
                  <h3 class="restaurant__name text-subtitle">${
                    this.restaurantDetail.name
                  }</h3>
                  <span class="restaurant__distance text-body">
                      캠퍼스로부터 ${this.restaurantDetail.distance}분 내
                  </span>
                </div>
                <div class="right-align">
                  <favorite-button
                    data-restaurant-name=${this.restaurantDetail.name}
                    data-restaurant-favorite=${this.restaurantDetail.favorite}
                  >
                  </favorite-button>
                </div>
              </div>

              <p class="restaurant__description text-body">${
                this.restaurantDetail.description
              }</p>
            </div>
        </li>
    `;
  }

  private convertCategoryToImage(category: MenuCategoryWithoutAll) {
    return this.restaurantImage[category];
  }
}

customElements.define("restaurant-item", RestaurantItem);

export default RestaurantItem;

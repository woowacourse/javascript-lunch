import "./RestaurantItem.css";

import BaseComponent from "../BaseComponent/BaseComponent";
import categoryKorean from "../../assets/images/category-korean.png";
import { RestaurantDetail } from "../../domain/Restaurant/Restaurant.type";

class RestaurantItem extends BaseComponent {
  private restaurantDetail: RestaurantDetail;

  constructor(restaurantDetail: RestaurantDetail) {
    super();

    this.restaurantDetail = restaurantDetail;
  }

  //TODO: 이미지 리팩터링 필요
  public getTemplate() {
    return `
        <li class="restaurant">
            <div class="restaurant__category">
                <img src=${categoryKorean} alt="한식" class="category-icon">
            </div>
            <div class="restaurant__info">
                <h3 class="restaurant__name text-subtitle">${this.restaurantDetail.name}</h3>
                <span class="restaurant__distance text-body">캠퍼스로부터 ${this.restaurantDetail.distance}분 내</span>
                <p class="restaurant__description text-body">${this.restaurantDetail.description}</p>
            </div>
        </li>
    `;
  }

  protected setEvent(): void {}
}

customElements.define("restaurant-ltem", RestaurantItem);

export default RestaurantItem;

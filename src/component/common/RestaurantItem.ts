import { StarImgPath } from "@/constant/Restaurant";
import { Category, Restaurant } from "@/type/type";
import { categoryToSrc } from "@/utils/convertor";

class RestaurantItem {
  restaurant: Restaurant;

  constructor(restaurant: Restaurant) {
    this.restaurant = restaurant;
  }

  template() {
    return `
    <li class="restaurant" data-id=${this.restaurant.id}>
      <div class="restaurant__category">
        <img src=${categoryToSrc(this.restaurant.category as Category)} alt=${
      this.restaurant.category
    } class="category-icon">
      </div>
      <div class="restaurant__info">
        <div class="flex-row">
        <div>
            <h3 class="restaurant__name text-subtitle">${
              this.restaurant.name
            }</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${
              this.restaurant.takingTime
            }분 내</span>
            </div>
            <img src=${
              this.restaurant.bookmarked
                ? `./${StarImgPath.FILLED_STAR}`
                : `./${StarImgPath.EMPTY_STAR}`
            } alt="bookmarked" class="bookmark"/>
        </div>
        <p class="restaurant__description text-body">${
          this.restaurant.description
        }</p>
      </div>
    </li>`;
  }
}

export default RestaurantItem;

import { $ } from "../utils/Dom";
import { CATEGORY } from "../constants";
import favoriteFilled from "../assets/favorite-icon-lined.png";

export default class RestaurantItem {
  template = ({
    category,
    name,
    distance,
    description,
    link,
    id,
  } = restaurantInfo) => `
    <li class="restaurant">
      <div class="restaurant__category">
      <img src="${CATEGORY[category]}" alt="${category}" class="category-icon">
      </div>
        </div>
          <div class="restaurant__info" id="${id}
          ">
            <div class="restaurant__text">
              <h3 class="restaurant__name text-subtitle">${name}</h3>
              <span class="restaurant__distance text-body">캠퍼스로부터 ${distance}분 내</span>
              <p class="restaurant__description text-body">${description}</p>
            </div>
          </div>
          <button class="favorite" type="button"><img src="${favoriteFilled}" alt=""></button>
    </li>
  `;

  render(restaurantInfo) {
    const restaurantList = $(".restaurant-list");
    restaurantList.insertAdjacentHTML(
      "beforeend",
      this.template(restaurantInfo)
    );
  }
}

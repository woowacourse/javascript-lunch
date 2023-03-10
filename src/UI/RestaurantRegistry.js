import { $ } from "../utils/Dom";
import ModalRestaurantDetail from "./ModalRestaurantDetail";

export default class RestaurantRegistry {
  appendRestaurant(restaurantInfo) {
    const category = {
      한식: "./category-korean.png",
      일식: "./category-japanese.png",
      양식: "./category-western.png",
      중식: "./category-chinese.png",
      아시안: "./category-asian.png",
      기타: "./category-etc.png",
    };
    const template = `
    <li class="restaurant" id="restaurant${restaurantInfo.id}">
        <div class="restaurant_info">
          <div class="restaurant__category">
            <img src="${category[restaurantInfo.category]}" alt="${
      restaurantInfo.category
    }" class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${
              restaurantInfo.name
            }</h3>
            <span class="restaurant__distance text-body">캠퍼스로부터 ${
              restaurantInfo.distance
            }분 내</span>
            <p class="restaurant__description text-body">${
              restaurantInfo.description
            }</p>
          </div>
        </div>  
          <div class="restaurant_favorite" onclick="event.stopPropagation()">
            <img src="./favorite-icon-filled.png">
          </div>
    </li>
    `;

    $(".restaurant-list").insertAdjacentHTML("beforeend", template);
    $(`#restaurant${restaurantInfo.id}`).addEventListener("click", (e) => {
      const modalRestaurantDetail = new ModalRestaurantDetail();
      modalRestaurantDetail.changeRestaurantInformation(restaurantInfo);
    });
    $(".restaurant_favorite").addEventListener("click", (e) => {
      e.stopPropagation()
      console.log(e.target);
    });
  }
}

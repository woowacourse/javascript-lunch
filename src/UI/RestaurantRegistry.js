import { $ } from "../utils/Dom";
import ModalRestaurantDetail from "./ModalRestaurantDetail";
import {
  stringifyJson,
  getRestaurantListFromLocalstorage,
} from "../utils/LocalStorage";

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
          <div class="restaurant_favorite${
            restaurantInfo.id
          }" onclick="event.stopPropagation()">
            <img src="./favorite-icon-lined.png">
          </div>
    </li>
    `;

    $(".restaurant-list").insertAdjacentHTML("beforeend", template);
    $(`#restaurant${restaurantInfo.id}`).addEventListener("click", (e) => {
      const modalRestaurantDetail = new ModalRestaurantDetail();
      modalRestaurantDetail.changeRestaurantInformation(restaurantInfo);
    });
    $(`.restaurant_favorite${restaurantInfo.id}`).addEventListener(
      "click",
      (e) => {
        e.stopPropagation();
        if (e.target.getAttribute("src") === "./favorite-icon-filled.png") {
          // this.restaurantList.deleteRestaurantFromFavorite(restaurantInfo.id);
          const res = getRestaurantListFromLocalstorage("favorite") ?? [];
          const deletedRestaurantElementArray = res.filter((val) =>  {
            return val.id !== restaurantInfo.id});
          localStorage.setItem("favorite", stringifyJson(deletedRestaurantElementArray))
          return e.target.setAttribute("src", "./favorite-icon-lined.png");
        }
        if (e.target.getAttribute("src") === "./favorite-icon-lined.png") {
          const favorite = []
          const favoriteList = getRestaurantListFromLocalstorage("favorite")
          if(favoriteList !== null) 
          favoriteList.forEach((val)=>favorite.push(val))
          favorite.push(restaurantInfo);
          localStorage.setItem("favorite", stringifyJson(favorite));
          return e.target.setAttribute("src", "./favorite-icon-filled.png");
        }
      }
    );
  }
}

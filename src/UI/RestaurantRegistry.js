import { $ } from "../utils/Dom";
import ModalRestaurantDetail from "./ModalRestaurantDetail";
import {
  stringifyJson,
  getRestaurantListFromLocalstorage,
  setToLocalStorage
} from "../utils/LocalStorage";
import { RESTAURANT_LOCALSTORAGE_KEY, FAVORITE_LOCALSTORAGE_KEY, 
  FAVORITE_VALUE, FAVORITE_ENROLL, FAVORITE_UNENROLL } from "../utils/Constant";
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
          <div class="restaurant_favorite${restaurantInfo.id}">
            <img src=${restaurantInfo.favorite}>
          </div>
    </li>
    `;

    $(".restaurant-list").insertAdjacentHTML("beforeend", template);

    $(`#restaurant${restaurantInfo.id}`).addEventListener("click", () => {
      const modalRestaurantDetail = new ModalRestaurantDetail();
      modalRestaurantDetail.changeRestaurantInformation(restaurantInfo);
    });

    $(`.restaurant_favorite${restaurantInfo.id}`).addEventListener(
      "click",
      (e) => {
        this.clickModalFavorite(e, restaurantInfo)}
    );
  }

  clickModalFavorite(e, restaurantInfo) {
    e.stopPropagation();

    if (this.isFilledOrLined(e, FAVORITE_ENROLL)) {
      this.ifFavoriteFilled(e, restaurantInfo)
      return;
    }

    if (this.isFilledOrLined(e, FAVORITE_UNENROLL)) {
      this.ifFavoriteLined(e, restaurantInfo)
      return;
    }
  }

  isFilledOrLined(e, favorite){
    return e.target.getAttribute("src") === favorite
  }

  getFavoriteList(favorite, restaurantInfo){
    return getRestaurantListFromLocalstorage(RESTAURANT_LOCALSTORAGE_KEY).map((restaurant) => {
      if (restaurant.id === restaurantInfo.id)
        restaurant[FAVORITE_VALUE] = favorite;
      return restaurant;
    });
  }
  
  ifFavoriteFilled(e, restaurantInfo){
    const restaurantFavoriteList = this.getFavoriteList(FAVORITE_UNENROLL, restaurantInfo)
    setToLocalStorage(RESTAURANT_LOCALSTORAGE_KEY, restaurantFavoriteList)

    const res = (getRestaurantListFromLocalstorage(FAVORITE_LOCALSTORAGE_KEY)??[]);
    const deletedRestaurantElementArray = res.filter((val) => val.id !== restaurantInfo.id);
    setToLocalStorage(FAVORITE_LOCALSTORAGE_KEY, deletedRestaurantElementArray);
    
    this.changeFavoriteImageAttribut(e, restaurantInfo, FAVORITE_UNENROLL);
  }

  ifFavoriteLined(e, restaurantInfo){
    const favorite = [];
    const restaurantFavoriteList = this.getFavoriteList(FAVORITE_ENROLL, restaurantInfo)
    setToLocalStorage(RESTAURANT_LOCALSTORAGE_KEY, restaurantFavoriteList)

    const favoriteList = getRestaurantListFromLocalstorage(FAVORITE_LOCALSTORAGE_KEY)??[];
    if (favoriteList !== null) favoriteList.forEach((val) => favorite.push(val));
    favorite.push(restaurantInfo);
    setToLocalStorage(FAVORITE_LOCALSTORAGE_KEY, favorite);
    
    this.changeFavoriteImageAttribut(e, restaurantInfo, FAVORITE_ENROLL);
  }

  changeFavoriteImageAttribut(e, restaurantInfo, favorite){
    $(`.restaurant_favorite${restaurantInfo.id}`).children[0].setAttribute("src",favorite);
    e.target.setAttribute("src", favorite);
  }

  attachRestaurantToRegistry(restaurantParsedInfo) {
    restaurantParsedInfo.forEach((value) => {
      this.appendRestaurant(value);
    });
  }
}

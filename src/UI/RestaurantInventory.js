import { $ } from "../utils/Dom";
import { getRestaurantListFromLocalstorage } from "../utils/LocalStorage";
import { RESTAURANT_LOCALSTORAGE_KEY, FAVORITE_LOCALSTORAGE_KEY, 
    FAVORITE_VALUE, FAVORITE_ENROLL } from "../utils/Constant";

export default class RestaurantInventory {
  #template = `
    <div class="restaurant-tab">
        <div class="all-restaurant">
            <span>모든 음식점</span>
        </div>
        <div class="favorite-restaurant">
            <span>자주 가는 음식점</span>
        </div>
    </div>
    `;

    constructor(restaurantRegistry){
        this.restaurantRegistry = restaurantRegistry
    }

  render() {
    $("main").insertAdjacentHTML("afterbegin", this.#template);
  }

  initializeButtonEvents() {
    $(".all-restaurant").addEventListener("click", () => {
        RestaurantInventory.favoriteTabToAllListTab();
      $(".restaurant-list").replaceChildren();

      const restaurantAll = getRestaurantListFromLocalstorage(RESTAURANT_LOCALSTORAGE_KEY);
      this.restaurantRegistry.attachRestaurantToRegistry(restaurantAll);
    });

    $(".favorite-restaurant").addEventListener("click", () => {
        RestaurantInventory.allListTabToFavoriteTab();
      $(".restaurant-list").replaceChildren();

      const restaurantFavorite= getRestaurantListFromLocalstorage(FAVORITE_LOCALSTORAGE_KEY);
      restaurantFavorite.forEach((restaurant) => (restaurant[FAVORITE_VALUE] = FAVORITE_ENROLL));
      this.restaurantRegistry.attachRestaurantToRegistry(restaurantFavorite);
    });
  }

  static favoriteTabToAllListTab=function() {
    $(".all-restaurant").style.color = "#ec4a0a";
    $(".all-restaurant").style.borderBottom = "2px solid #ec4a0a";
    $(".favorite-restaurant").style.color = "#667085";
    $(".favorite-restaurant").style.borderBottom = "2px solid #667085";
    $(".restaurant-filter-container").className = "restaurant-filter-container";
  }

  static allListTabToFavoriteTab=function() {
    $(".favorite-restaurant").style.color = "#ec4a0a";
    $(".favorite-restaurant").style.borderBottom = "2px solid #ec4a0a";
    $(".all-restaurant").style.color = "#667085";
    $(".all-restaurant").style.borderBottom = "2px solid #667085";
    $(".restaurant-filter-container").className =
      "restaurant-filter-container filter-container-close";
  }
}

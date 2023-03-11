import { $ } from "../utils/Dom";
import { getRestaurantListFromLocalstorage } from "../utils/LocalStorage";
import { RESTAURANT } from "../utils/Constant";

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

      const restaurantAll = getRestaurantListFromLocalstorage(RESTAURANT);
      this.restaurantRegistry.attachRestaurantToRegistry(restaurantAll);
    });

    $(".favorite-restaurant").addEventListener("click", () => {
        RestaurantInventory.allListTabToFavoriteTab();
      $(".restaurant-list").replaceChildren();

      const restaurantFavorite= getRestaurantListFromLocalstorage("favorite");
      restaurantFavorite.forEach((restaurant) => (restaurant["favorite"] = "./favorite-icon-filled.png"));
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

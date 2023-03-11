import { $ } from "../utils/Dom";
import { getRestaurantListFromLocalstorage } from "../utils/LocalStorage";
import {RESTAURANT} from "../utils/Constant"

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
    `
    constructor(restaurantRegistry){
        this.restaurantRegistry = restaurantRegistry
    }

    render(){
        $("main").insertAdjacentHTML("afterbegin", this.#template);
    }

    initializeButtonEvents(){
        $(".all-restaurant").addEventListener("click", ()=>{
            $(".all-restaurant").style.color="#ec4a0a";
            $(".all-restaurant").style.borderBottom="2px solid #ec4a0a";
            $(".favorite-restaurant").style.color="#667085";
            $(".favorite-restaurant").style.borderBottom = "2px solid #667085";
            $(".restaurant-filter-container").className = "restaurant-filter-container";
            $(".restaurant-list").replaceChildren();
            const restaurantAll = getRestaurantListFromLocalstorage(RESTAURANT)
            this.attachRestaurantToRegistry(restaurantAll)
        })

        $(".favorite-restaurant").addEventListener("click", ()=>{
            $(".favorite-restaurant").style.color="#ec4a0a";
            $(".favorite-restaurant").style.borderBottom = "2px solid #ec4a0a";
            $(".all-restaurant").style.color="#667085";
            $(".all-restaurant").style.borderBottom="2px solid #667085";
            $(".restaurant-filter-container").className = "restaurant-filter-container filter-container-close"
            $(".restaurant-list").replaceChildren();
            const restaurantFavorite = getRestaurantListFromLocalstorage("favorite")??[]
            restaurantFavorite.forEach((restaurant)=>restaurant["favorite"] = "./favorite-icon-filled.png")
            this.attachRestaurantToRegistry(restaurantFavorite)
        })
    }

    attachRestaurantToRegistry(restaurantParsedInfo) {
        restaurantParsedInfo.forEach((value) => {
          this.restaurantRegistry.appendRestaurant(value);
        });
      }
}
import { restaurants } from "../../domain/restaurants";
import findImage from "../../tools/findImage";
import Storage from "../../tools/Storage";
import IRestaurant from "../../type/IRestaurant";
import BottomSheet from "../../components/BottomSheet";
import { findRestaurantById } from "../../domain/restaurant";
import { CategoryImage } from "../CategoryImage";
class RestaurantItem extends HTMLElement {
  restaurant: IRestaurant | undefined;

  constructor() {
    super();
    const id = this.getAttribute("id");
    if (id) {
      this.restaurant = findRestaurantById(id);
      this.restaurant && this.render(this.restaurant);
      // this.onClickFavoriteButton(id);
    }
  }

  render(restaurant: IRestaurant) {
    this.innerHTML = `
    <li class="restaurant">
      <div class="restaurant__category">
        ${CategoryImage(restaurant.category)}
      </div>
      <div class="restaurant__info w-100">
        <div class="d-flex justify-content-between">
          <div>
            <h3 class="restaurant__name text-subtitle">
              ${restaurant.name}
            </h3>
            <span class="restaurant__distance text-body" >
              캠퍼스부터 ${restaurant.distance}분 내
            </span>
          </div>
          <div>
            <favorite-button
              restaurant-id="${restaurant.id}" 
              favorite="${restaurant.favorite}">
            </favorite-button>
          </div>
        </div>
        <p class="restaurant__description text-body">
          ${restaurant.description}
        </p>
      </div>
    </li>
  `;
  }

  // // 리팩토링 필요
  // onClickFavoriteButton(id: string) {
  //   const favoriteButton = document.getElementById(`favorite-button-${id}`);
  //   favoriteButton?.addEventListener("click", (event) => {
  //     event.stopPropagation();
  //     console.log("button : " + id);
  //     const index = restaurants.state.restaurants.findIndex((r) => r.id === id);
  //     const originalFovrite = restaurants.state.restaurants[index].favorite;
  //     const temp = [...restaurants.state.restaurants];
  //     temp[index].favorite = !originalFovrite;
  //     restaurants.state.restaurants = temp;
  //     Storage.saveRestaurants(restaurants.state.restaurants);
  //   });
  // }
}
export default RestaurantItem;

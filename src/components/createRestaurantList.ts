import RestaurantDetailModal from "../domain/RestaurantDetailModal";
import { SaveFavoriteRestaurant } from "../domain/SaveFavoriteRestaurant";
import { Restaurant } from "../shared/types";

export function CreateRestaurantList(restaurants: Restaurant[]) {
  const $restaurantListContainer = document.querySelector(
    ".restaurant-list-container"
  ) as HTMLElement;

  const restaurantList = document.createElement("ul");
  restaurantList.className = "restaurant-list";

  restaurants.sort((a, b) => {
    return a.nameValue.localeCompare(b.nameValue);
  });

  restaurants.forEach((restaurant) => {
    createRestaurantItem(restaurantList, restaurant);
  });

  $restaurantListContainer.innerHTML = restaurantList.outerHTML;

  RestaurantDetailModal();
  SaveFavoriteRestaurant();
}

function createRestaurantItem(container: HTMLElement, inputValue: Restaurant) {
  container.innerHTML += `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="./category-${inputValue.category}.png" alt="${
    inputValue.categoryValue
  }" class="category-icon"/>
      </div>
      <div class="restaurant__info">
        <div class="restaurant-info-header">
          <div class="restaurant__name-distance">
            <h3 class="restaurant__name text-subtitle">${
              inputValue.nameValue
            }</h3>
            <span class="restaurant__distance text-body">
            캠퍼스부터 ${inputValue.distanceValue}분 내
            </span>
          </div>
          <button class="restaurant-favorite-star-button">
            <img class="restaurant-favorite-star" src=${
              inputValue.favorite === false
                ? "./favorite-icon-lined.png"
                : "./favorite-icon-filled.png"
            } alt="favorite star"/>
          </button>
        </div>
        <p class="restaurant__description text-body">${
          inputValue.descriptionValue
        }</p>
      </div>
    </li>
  `;
}

import RestaurantDetailModal from "../domain/RestaurantDetailModal";
import { GetAllRestaurants } from "../domain/RestaurantStorage";
import SaveFavoriteRestaurant from "../domain/SaveFavoriteRestaurant";

export function CreateRestaurantList(restaurants) {
  const $restaurantListContainer = document.querySelector(
    ".restaurant-list-container"
  );

  const restaurantList = document.createElement("ul");
  restaurantList.className = "restaurant-list";

  restaurants.forEach((restaurant) => {
    createRestaurantItem(restaurantList, restaurant);
  });

  $restaurantListContainer.innerHTML = restaurantList.outerHTML;

  SaveFavoriteRestaurant();
  RestaurantDetailModal();
}

function createRestaurantItem(container, inputValue) {
  container.innerHTML += `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="/category-${inputValue.category}.png" alt="${
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
                ? "/favorite-icon-lined.png"
                : "/favorite-icon-filled.png"
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

import { initialRestaurants } from "../data/initialRestaurants.js";

export default function RestaurantList(
  container,
  restaurants = initialRestaurants,
) {
  const restaurantItemsHTML = restaurants
    .map(
      (restaurant) => /* html */ `
      <li class="restaurant" data-category="${restaurant.category}" data-favorites= "${restaurant.favorites}">
        <div class="restaurant__category">
          <img src="./category-${restaurant.category}.png" alt="${restaurant.categoryName}" class="category-icon" />
        </div>
        <div class="restaurant__info">
        <div class= "restaurant__star__container">
        <div class = "restaurant__name__and__distance">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}</span>
          </div>
          <button class="favorite-button" data-restaurant-id="${restaurant.id}">
          <img src="./${restaurant.favorites === "true" ? "filled-star" : "blank-star"}.png"/>
          </button>
          </div>
          <p class="restaurant__description text-body">${restaurant.description}</p>
        </div>
      </li>
    `,
    )
    .join("");

  container.innerHTML += `
    <ul class="restaurant-list">
      ${restaurantItemsHTML}
    </ul>
  `;
}

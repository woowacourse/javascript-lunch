import RestaurantType from "../type/Restaurant";

class RestaurantItem {
  render(restaurant: RestaurantType) {
    return `
      <li class="restaurant">
        <div class="restaurant__category">
          <img src="./category-asian.png" alt="아시안" class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body">${restaurant.distance}</span>
          <p class="restaurant__description text-body">${restaurant.description}</p>
        </div>
      </li>
    `;
  }
}

export default RestaurantItem;

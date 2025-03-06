import RestaurantItem from "./RestaurantItem.js";

const RestaurantList = (restaurants) => {
  return /* html */ `
    <section class="restaurant-list-container" data-testid="restaurant-list">
      <ul class="restaurant-list">
        ${restaurants
          .map((restaurant) => RestaurantItem(restaurant))
          .reverse()
          .join("")}
      </ul>
    </section>
  `;
};

export default RestaurantList;

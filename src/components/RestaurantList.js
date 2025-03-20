import RestaurantItem from "./RestaurantItem.js";

const RestaurantList = (restaurants) => {
  return /* html */ `
    <section class="restaurant-list-container" >
      <ul id="restaurant-list" class="restaurant-list" data-testid="restaurant-list">
        ${restaurants.map((restaurant) => RestaurantItem(restaurant)).join("")}
      </ul>
    </section>
  `;
};

export default RestaurantList;

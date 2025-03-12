import RestaurantItem from "./RestaurantItem.js";

const RestaurantList = (restaurants) => {
  const htmlString = /* html */ `
    <section class="restaurant-list-container">
      <ul id="restaurant-list" class="restaurant-list" data-testid="restaurant-list">
        ${restaurants
          .map((restaurant) => RestaurantItem(restaurant))
          .join("")}
      </ul>
    </section>
  `;

  const $template = document.createElement("template");
  $template.innerHTML = htmlString;

  return $template.content.firstElementChild;
};

export default RestaurantList;

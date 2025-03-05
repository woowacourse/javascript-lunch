import { FOOD_CATEGORY } from "../../constants/foodCategory";
import { $ } from "../../utils/dom";
import Image from "./image";

const RestaurantCard = (restaurant) => {
  const { category, name, distance, description, link } = restaurant.info;
  const restaurantCard = document.createElement("li");
  restaurantCard.classList.add("restaurant");

  restaurantCard.innerHTML = `     
  <div class="restaurant__info">
    <h3 class="restaurant__name text-subtitle">${name}</h3>
    <span class="restaurant__distance text-body"
      >캠퍼스부터 ${distance}분 내</span
    >
    <p class="restaurant__description text-body">
     ${description}
    </p>
  </div>
`;

  const categoryImageContainer = document.createElement("div");
  categoryImageContainer.classList.add("restaurant__category");
  restaurantCard.prepend(categoryImageContainer);

  const src = `./category-${FOOD_CATEGORY[category]}.png`;

  categoryImageContainer.appendChild(Image(src, category, "category-icon"));
  return restaurantCard;
};

export default RestaurantCard;

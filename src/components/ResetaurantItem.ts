import { getCategoryImageSource } from "../domain/utils";
import { Restaurant } from "../types";

interface Props {
  restaurant: Restaurant;
  onClick?: () => void;
}

export const createRestaurantItem = ({
  restaurant: { category, name, distance, description },
  onClick,
}: Props) => {
  const restaurantItem = document.createElement("li");
  restaurantItem.classList.add("restaurant");

  restaurantItem.innerHTML = /*html*/ `
    <div class="restaurant__category">
      <img
        src=${getCategoryImageSource(category)}
        alt=${category}
        class="category-icon"
      />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">${distance}</span>
      <p class="restaurant__description text-body">${description}</p>
    </div>
  `;

  if (onClick) {
    restaurantItem.addEventListener("click", onClick);
  }

  return restaurantItem;
};

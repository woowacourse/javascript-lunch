import { Restaurant } from "../types";

interface Props {
  restaurant: Restaurant;
  onClick?: () => void;
}

export const createRestaurantItem = ({
  restaurant: { name, distance, description },
  onClick,
}: Props) => {
  const restaurantItem = document.createElement("li");
  restaurantItem.classList.add("restaurant");

  restaurantItem.innerHTML = /*html*/ `
    <div class="restaurant__category">
      <img
        src="./category-korean.png"
        alt="한식"
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

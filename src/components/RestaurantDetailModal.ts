import { getCategoryImageSource } from "../domain/utils";
import { Restaurant } from "../types";
import Modal from "./Modal";

const restaurantDetailContent = document.createElement("div");

const generateTemplate = ({
  category,
  name,
  distance,
  description,
}: Restaurant) => /*html*/ `
<div class="restaurant__category">
  <img src="${getCategoryImageSource(
    category
  )}" alt="${category}" class="category-icon">
</div>
<div class="restaurant__info">
  <h3 class="restaurant__name text-subtitle">${name}</h3>
  <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
  <p class="restaurant__description text-body">${description}</p>
</div>
`;

class RestaurantDetailModal extends Modal {
  #restaurant?: Restaurant;

  constructor() {
    super({ child: restaurantDetailContent });
  }

  set restaurant(restaurant: Restaurant) {
    this.#restaurant = restaurant;
    restaurantDetailContent.innerHTML = generateTemplate(restaurant);
  }
}

export default RestaurantDetailModal;

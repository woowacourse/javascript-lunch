import { $ } from "../utils/Dom";

export default class RestaurantContainer {
  #template = `
            <ul class="restaurant-list">
            </ul>
    `;

  constructor() {
    const listContainer = $(".restaurant-list-container") as HTMLElement;
    listContainer.insertAdjacentHTML("beforeend", this.#template);
  }
}

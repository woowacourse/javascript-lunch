import { $ } from "../utils/Dom";

export default class RestaurantContainer {
  #template = `
          <section class="restaurant-list-container">
            <ul class="restaurant-list">
            </ul>
        </section>
    `;

  render() {
    $("main").insertAdjacentHTML("beforeend", this.#template);
  }
}

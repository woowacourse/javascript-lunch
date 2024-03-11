import { CATEGORIES } from "../constants/menu";
import { initRestaurantStorage } from "../domains/Restaurants";
import BaseComponent from "./BaseComponent.js";

class MenuApp extends BaseComponent {
  constructor() {
    initRestaurantStorage();
    super();
  }

  render() {
    this.innerHTML = `
    <app-header></app-header>
    <main> 
      <section class="restaurant-filter-container">
        <option-selector type="category" options=${[
          "전체",
          ...CATEGORIES,
        ]} ></option-selector>
        <option-selector type="sort" options=${[
          "이름순",
          "거리순",
        ]}></option-selector>
      </section>
      <restaurant-list></restaurant-list>
      <restaurant-add-form></restaurant-add-form>
    </main>
    `;
  }
}

customElements.define("menu-app", MenuApp);

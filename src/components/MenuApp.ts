import { MENU_APP_EVENTS } from "../constants/event";
import { CATEGORIES, SORT_TYPE } from "../constants/menu";
import { initRestaurantStorage } from "../domains/Restaurants";
import BaseComponent from "./BaseComponent";

class MenuApp extends BaseComponent {
  constructor() {
    initRestaurantStorage();
    super();
  }

  render() {
    this.innerHTML = /*html*/ `
    <app-header></app-header>
    <main> 
      <section class="restaurant-filter-container">
        <option-selector type="category" options=${[
          ...Object.values(CATEGORIES),
        ]} ></option-selector>
        <option-selector type="sort" options=${[
          ...Object.values(SORT_TYPE),
        ]}></option-selector>
      </section>
      <restaurant-list></restaurant-list>
    </main>
    <modal-wrapper id='add-form' open-type=${MENU_APP_EVENTS.openAddForm}>
      <restaurant-add-form></restaurant-add-form>
    </modal-wrapper>
    `;
  }
}

customElements.define("menu-app", MenuApp);

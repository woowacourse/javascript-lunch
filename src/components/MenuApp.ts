import BaseComponent from "./BaseComponent";
import { MENU_APP_EVENTS } from "../constants/event";
import { initRestaurantStorage } from "../domains/Restaurants";

class MenuApp extends BaseComponent {
  constructor() {
    initRestaurantStorage();
    super();
  }

  render() {
    this.innerHTML = /*html*/ `
      <app-header></app-header>
      <restaurant-tab-container class="flex justify-between tab-container"></restaurant-tab-container>
      <main> 
        <option-selector-container></option-selector-container>
        <restaurant-list></restaurant-list>
      </main>
      <modal-wrapper 
        open-type=${MENU_APP_EVENTS.openAddForm} 
        id='add-form'>
        <restaurant-add-form></restaurant-add-form>
      </modal-wrapper>
      <modal-wrapper 
        open-type=${MENU_APP_EVENTS.openRestaurantDetail} 
        id="restaurant-detail" >
        <restaurant-detail></restaurant-detail>
      </modal-wrapper>
    `;
  }
}

customElements.define("menu-app", MenuApp);

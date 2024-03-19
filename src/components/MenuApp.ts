import BaseComponent from "./BaseComponent";
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
        id='add-form'>
        <restaurant-add-form></restaurant-add-form>
      </modal-wrapper>
      <modal-wrapper 
        id="restaurant-detail" >
        <restaurant-detail></restaurant-detail>
      </modal-wrapper>
    `;
  }
}

customElements.define("menu-app", MenuApp);

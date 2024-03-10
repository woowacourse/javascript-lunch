import BaseComponent from "./abstract/BaseComponent";
import Select from "./components/common/Select";
import Modal from "./components/common/Modal";
import RestaurantHeader from "./components/RestaurantHeader";
import RestaurantList from "./components/RestaurantList";
import RestaurantForm from "./components/RestaurantForm";

customElements.define("restaurant-header", RestaurantHeader);
customElements.define("restaurant-list", RestaurantList);
customElements.define("select-box", Select);
customElements.define("modal-box", Modal);
customElements.define("restaurant-form", RestaurantForm);

export default class LunchApp extends BaseComponent {
  getTemplate() {
    return `
        <restaurant-header></restaurant-header> 
        <main>
          <filter-bar></filter-bar>
          <restaurant-list></restaurant-list>
          <modal-box modal-id="restaurant-form-modal">
          <restaurant-form></restaurant-form>
          </modal-box>
        </main>
      `;
  }
}

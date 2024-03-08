import BaseComponent from "./abstract/BaseComponent";
import Select from "./components/common/Select";
import Modal from "./components/common/Modal";
import RestaurantHeader from "./components/RestaurantHeader";
import RestaurantList from "./components/RestaurantList";
import RestaurantForm from "./components/RestaurantForm";

customElements.define("restaurant-header", RestaurantHeader);
customElements.define("restaruant-list", RestaurantList);
customElements.define("select-box", Select);
customElements.define("modal-box", Modal);
customElements.define("restaurant-form", RestaurantForm);

export default class LunchApp extends BaseComponent {
  getTemplate() {
    return `
      <div>
        <restaurant-header></restaurant-header> 
        <filter-bar></filter-bar>
        <restaruant-list></restaruant-list>
        <modal-box modal-id="retaurant-form-modal">
          <restaurant-form></restaurant-form>
        </modal-box>
      </div>
      `;
  }
}

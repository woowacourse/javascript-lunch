import BaseComponent from "./abstract/BaseComponent";
import RestaurantHeader from "./components/RestaurantHeader";
import RestaurantList from "./components/RestaurantList";
import Select from "./components/common/Select";
import Modal from "./components/common/Modal";
import RestaurantForm from "./components/RestaurantForm";

customElements.define("restaurant-header", RestaurantHeader);
customElements.define("restaruant-list", RestaurantList);
customElements.define("select-box", Select);
customElements.define("modal-box", Modal);
customElements.define("restaurant-form", RestaurantForm);

export default class LunchApp extends BaseComponent {
  getTemplate() {
    return /* html */ `
      <div>
        <restaurant-header></restaurant-header> 
        <filter-bar></filter-bar>
        <restaruant-list></restaruant-list>
        <modal-box modal-id="retaurant-form-modal">
          <div class="modal-container">
            <h2 class="modal-title text-title">새로운 음식점</h2>
            <restaurant-form></restaurant-form>
          </div>
        </modal-box>
        </div>
      `;
  }
}

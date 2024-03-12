import BaseComponent from "./abstract/BaseComponent";
import SelectBox from "./components/common/SelectBox";
import ModalBox from "./components/common/ModalBox";
import RestaurantHeader from "./components/RestaurantHeader";
import RestaurantList from "./components/RestaurantList";
import RestaurantForm from "./components/RestaurantForm";

customElements.define("restaurant-header", RestaurantHeader);
customElements.define("restaurant-list", RestaurantList);
customElements.define("select-box", SelectBox);
customElements.define("modal-box", ModalBox);
customElements.define("restaurant-form", RestaurantForm);

export default class LunchApp extends BaseComponent {
  getTemplate() {
    return /* html */ `
      <div>
        <restaurant-header></restaurant-header> 
        <filter-bar></filter-bar>
        <restaurant-list></restaurant-list>
        <modal-box modal-id="restaurant-form-modal">
          <restaurant-form></restaurant-form>
        </modal-box>
      </div>
      `;
  }
}

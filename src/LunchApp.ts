import BaseComponent from "./abstract/BaseComponent";
import SelectBox from "./components/common/SelectBox";
import ModalBox from "./components/common/ModalBox";
import RestaurantHeader from "./components/RestaurantHeader";
import RestaurantList from "./components/RestaurantList";
import RestaurantForm from "./components/RestaurantForm";
import HeaderTab from "./components/HeaderTab";
import RestaurantDetail from "./components/RestaurantDetail";
import MODAL_ID from "./constants/modalId";

customElements.define("restaurant-header", RestaurantHeader);
customElements.define("header-tab", HeaderTab);
customElements.define("restaurant-list", RestaurantList);
customElements.define("select-box", SelectBox);
customElements.define("modal-box", ModalBox);
customElements.define("restaurant-form", RestaurantForm);
customElements.define("restaurant-detail", RestaurantDetail);

export default class LunchApp extends BaseComponent {
  getTemplate() {
    return /* html */ `
      <div>
        <restaurant-header></restaurant-header> 
        <header-tab></header-tab>
        <filter-bar></filter-bar>
        <restaurant-list></restaurant-list>
        <modal-box modal-id=${MODAL_ID.restaurantFormModal}>
          <restaurant-form></restaurant-form>
        </modal-box>
        <modal-box modal-id=${MODAL_ID.restaurantDetailModal}>
          <restaurant-detail></restaurant-detail>
        </modal-box>
      </div>
      `;
  }
}

import BaseComponent from "./abstract/BaseComponent";
import RestaurantHeader from "./components/RestaurantHeader";
import RestaurantList from "./components/RestaurantList";
import Select from "./components/common/Select";

customElements.define("restaurant-header", RestaurantHeader);
customElements.define("restaruant-list", RestaurantList);
customElements.define("select-box", Select);

export default class LunchApp extends BaseComponent {
  getTemplate() {
    return `
      <div>
        <restaurant-header></restaurant-header> 
        <filter-bar></filter-bar>
        <restaruant-list></restaruant-list>
      </div>
      `;
  }
}

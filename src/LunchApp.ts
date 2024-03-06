import BaseComponent from "./abstract/BaseComponent";
import RestaurantHeader from "./components/RestaurantHeader";
import CategoryIcon from "./components/CategoryIcon";

customElements.define("restaurant-header", RestaurantHeader);
customElements.define("category-icon", CategoryIcon);

export default class LunchApp extends BaseComponent {
  getTemplate() {
    return `
      <div>
        <restaurant-header></restaurant-header> 
      </div>
      `;
  }
}

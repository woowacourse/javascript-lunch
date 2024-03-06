import BaseComponent from "./abstract/BaseComponent";
import RestaurantHeader from "./components/RestaurantHeader";

customElements.define("restaurant-header", RestaurantHeader);

export default class LunchApp extends BaseComponent {
  getTemplate() {
    return `
      <div>
        <restaurant-header></restaurant-header> 
      </div>
      `;
  }
}

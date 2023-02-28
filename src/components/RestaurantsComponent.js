import CustomElement from "../abstracts/CustomElement";
import RestaurantComponent from "./RestaurantComponent";

class RestaurantsComponent extends CustomElement {
  template() {
    return `
    <ul class="restaurant-list">
          <restaurant-element></restaurant-element>
          <restaurant-element></restaurant-element>
          <restaurant-element></restaurant-element>
          <restaurant-element></restaurant-element>
          <restaurant-element></restaurant-element>
          <restaurant-element></restaurant-element>
      </ul>
        `;
  }
}

customElements.define("restaurant-list", RestaurantsComponent);

export default RestaurantsComponent;

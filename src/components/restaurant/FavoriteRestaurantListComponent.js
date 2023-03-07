import RestaurantListComponent from "./RestaurantListComponent";
import RestaurantInstance from "../../domain/RestaurantsStore";

class FavoriteRestaurantListComponent extends RestaurantListComponent {
  connectedCallback() {
    super.connectedCallback();
    RestaurantInstance.subscribe(this);
    RestaurantInstance.publish();
  }

  rerender(restaurantList) {
    const restaurants = restaurantList
      .map((restaurant) => {
        return `
          <restaurant-element 
          category="${restaurant.category}" 
          name="${restaurant.name}" 
          distance="${restaurant.distance}" 
          description="${restaurant.description}" 
          link="${restaurant.link}"
          >
          </restaurant-element>`;
      })
      .join("");

    this.shadowRoot.querySelector(".restaurant-list").innerHTML = restaurants;
  }
}

customElements.define(
  "favorite-restaurant-list",
  FavoriteRestaurantListComponent
);
export default FavoriteRestaurantListComponent;

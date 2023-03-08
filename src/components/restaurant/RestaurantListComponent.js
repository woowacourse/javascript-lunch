import CustomElement from "../../abstracts/CustomElement";
import RestaurantInstance from "../../domain/store/RestaurantsStore";

class RestaurantListComponent extends CustomElement {
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
          id="${restaurant.id}" 
          category="${restaurant.category}" 
          name="${restaurant.name}" 
          distance="${restaurant.distance}" 
          description="${restaurant.description}" 
          link="${restaurant.link}" 
          isFavorite="${restaurant.isFavorite}"
          >
          </restaurant-element>
        `;
      })
      .join("");

    this.shadowRoot.querySelector(".restaurant-list").innerHTML = restaurants;
  }

  template() {
    return `
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
      :host {
        width: 50%;
        height: 100%;
      }
      .restaurant-list-container {
        display: flex;
        flex-direction: column;
      
        padding: 0 16px;
      }
      ul {
        list-style: none;
      }
    </style>
    <select-container></select-container>
    <section class="restaurant-list-container">
      <ul class="restaurant-list"></ul>
    </section>
        `;
  }
}

customElements.define("restaurant-list", RestaurantListComponent);

export default RestaurantListComponent;

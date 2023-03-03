import CustomElement from "../abstracts/CustomElement";
import RestaurantsStore from "../domain/RestaurantsStore";

class RestaurantsComponent extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    RestaurantsStore.subscribe(this);
    RestaurantsStore.publish();
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
    document.querySelector(".restaurant-list").innerHTML = restaurants;
  }

  template() {
    return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list"></ul>
    </section>
        `;
  }
}

customElements.define("restaurant-list", RestaurantsComponent);

export default RestaurantsComponent;

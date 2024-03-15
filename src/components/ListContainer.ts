import DOM from "../utils/DOM";
import Restaurant from "./restaurant/Restaurant";

const { insertElementsInTarget } = DOM;

class ListContainer extends HTMLUListElement {
  constructor(restaurants: Restaurant[]) {
    super();
    this.className = 'restaurant-lists';
    this.createRestaurants(restaurants);
  }

  createRestaurants(restaurants: Restaurant[]) {
    insertElementsInTarget(this, restaurants);
  }

  addRestaurants(restaurant: Restaurant) {
    this.appendChild(restaurant);
  }
}

customElements.define('matzip-list-container', ListContainer, { extends: 'ul' });

export default ListContainer;

import DOM from "../utils/DOM";
import Restaurant from "./restaurant/Restaurant";

const { $, insertElementsInTarget } = DOM;

class ListContainer extends HTMLUListElement {
  private restaurants: Restaurant[];

  constructor(restaurants: Restaurant[]) {
    super();
    this.className = 'restaurant-lists';
    this.restaurants = this.createRestaurants(restaurants);
  }

  createRestaurants(restaurants: Restaurant[]) {
    insertElementsInTarget(this, restaurants);    
    return restaurants;
  }

  addRestaurants(restaurant: Restaurant) {
    this.appendChild(restaurant);
    this.restaurants.push(restaurant);
  }

  deleteRestaurant(targetId: string) {    
    const targetNode = this.restaurants.find((restaurant) => restaurant.id === `restaurant-list${targetId}`);    
    if (targetNode === undefined) return;

    this.removeChild(targetNode);
  }
}

customElements.define('matzip-list-container', ListContainer, { extends: 'ul' });

export default ListContainer;

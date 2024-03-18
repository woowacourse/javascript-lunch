import DOM from "../../utils/DOM";
import Restaurant from "../restaurant/Restaurant";
import './ListContainer.css';

const { insertElementsInTarget } = DOM;

class ListContainer extends HTMLUListElement {
  private restaurants: Restaurant[];
  private fallbackUI: HTMLDivElement | null;

  constructor(restaurants: Restaurant[]) {
    super();
    this.id = 'restaurant-lists';
    this.className = 'restaurant-lists';
    this.fallbackUI = null;
    this.restaurants = this.createRestaurants(restaurants);
  }

  createRestaurants(restaurants: Restaurant[]) {
    if (restaurants.length === 0) {
      this.fallbackUI = this.createFallback();
      return [];
    }
    insertElementsInTarget(this, restaurants);    
    return restaurants;
  }

  createFallback() {
    const nothingContainer = document.createElement('div');
    nothingContainer.id = 'nothing__restaurant';
    nothingContainer.classList.add('nothing__restaurant');

    const nothingMent = document.createElement('p');
    nothingMent.classList.add('text-title', 'nothing__ment');
    nothingMent.textContent = '어머나 등록된 맛집이 없어요ㅠ';

    nothingContainer.appendChild(nothingMent);
    this.appendChild(nothingContainer);
    return nothingContainer;
  }

  addRestaurants(restaurant: Restaurant) {
    this.appendChild(restaurant);
    if (this.restaurants.length === 0 && this.fallbackUI !== null) {
      this.removeChild(this.fallbackUI);
    }
    this.restaurants.push(restaurant);
  }

  deleteRestaurant(targetId: string) {    
    const targetNode = this.restaurants.find((restaurant) => restaurant.id === `restaurant-list${targetId}`);    
    const targetNodeIndex = this.restaurants.findIndex((restaurant) => restaurant.id === `restaurant-list${targetId}`);
    
    if (targetNode === undefined) return;
    
    this.removeChild(targetNode);
    this.restaurants.splice(targetNodeIndex, 1);

    if (this.restaurants.length === 0 && this.fallbackUI === null) {
      this.fallbackUI = this.createFallback();
    }
  }

  get restaurantCount() {
    return this.restaurants.length;
  }
}

customElements.define('matzip-list-container', ListContainer, { extends: 'ul' });

export default ListContainer;

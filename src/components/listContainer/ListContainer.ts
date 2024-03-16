import DOM from "../../utils/DOM";
import Restaurant from "../restaurant/Restaurant";
import './ListContainer.css';

const { insertElementsInTarget } = DOM;

class ListContainer extends HTMLUListElement {
  private restaurants: Restaurant[];

  constructor(restaurants: Restaurant[]) {
    super();
    this.className = 'restaurant-lists';
    this.restaurants = this.createRestaurants(restaurants);
  }

  createRestaurants(restaurants: Restaurant[]) {
    if (restaurants.length === 0) {
      this.createFallback();
      return [];
    }
    insertElementsInTarget(this, restaurants);    
    return restaurants;
  }

  createFallback() {
    const nothingContainer = document.createElement('div');
    nothingContainer.classList.add('nothing__restaurant');

    const nothingMent = document.createElement('p');
    nothingMent.classList.add('text-title', 'nothing__ment');
    nothingMent.textContent = '어머나 등록된 맛집이 없어요ㅠ';

    nothingContainer.appendChild(nothingMent);
    this.appendChild(nothingContainer);
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

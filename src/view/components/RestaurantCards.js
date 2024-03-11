import restaurantCatalog, { SORT_CONDITION } from '../../domain/RestaurantCatalog';
import RestaurantCard from './RestaurantCard';

const [SORT_BY_NAME, SORT_BY_DISTANCE] = SORT_CONDITION;

function sortMethod(attribute) {
  if (attribute === SORT_BY_NAME) return restaurantCatalog.sortByName;
  if (attribute === SORT_BY_DISTANCE) return restaurantCatalog.sortByDistance;
}

class RestaurantCards extends HTMLUListElement {
  #renderedRestaurants = [];

  #appendRestaurants() {
    const dataFilteredAndSorted = sortMethod(this.getAttribute('data-sort-select'))(
      restaurantCatalog
        .filterByCategory(this.getAttribute('data-category-select'))
        .map((restaurant) => restaurant.getRestaurantInfoObject()),
    );
    this.#appendRestaurantElement(dataFilteredAndSorted);
  }

  #appendRestaurantElement(restaurants) {
    restaurants.forEach((data) => {
      const liElement = new RestaurantCard(data);
      this.appendChild(liElement);
    });
  }

  clear() {
    this.innerHTML = '';
  }

  static get observedAttributes() {
    return ['data-sort-select', 'data-category-select'];
  }

  attributeChangedCallback() {
    this.clear();
    if (!this.getAttribute('data-sort-select') && !this.getAttribute('data-category-select')) {
      return;
    }
    this.#appendRestaurants();
  }
}

export default RestaurantCards;

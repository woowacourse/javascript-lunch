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
      // TODO: renderedRestaurants에 liElement 푸시
      this.appendChild(liElement);
    });
  }

  static get observedAttributes() {
    return ['data-sort-select', 'data-category-select'];
  }

  render() {
    // TODO: 실제 DOM 요소와 필드의 레스토랑을 비교하면서 렌더링하기
    /**
     * 순서 중요
     * 1. 레스토랑이 적어졌을 경우 splice 하기
     * 2. 기존의 레스토랑에서 id만 변경하기.
     * 3. 레스토랑이 많아졌을 경우 append하기
     */
  }

  clear() {
    this.innerHTML = '';
  }

  attributeChangedCallback() {
    this.clear();
    if (!this.getAttribute('data-sort-select') || !this.getAttribute('data-category-select')) {
      return;
    }
    this.#appendRestaurants();
  }
}

export default RestaurantCards;

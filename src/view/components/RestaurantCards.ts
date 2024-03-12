import Restaurant, { Category, IRestaurantInfo } from '../../domain/Restaurant';
import restaurantCatalog, { SORT_CONDITION } from '../../domain/RestaurantCatalog';
import RestaurantCard from './RestaurantCard';

const [SORT_BY_NAME, SORT_BY_DISTANCE] = SORT_CONDITION;

function sortMethod(attribute: string) {
  if (attribute === SORT_BY_NAME) return restaurantCatalog.sortByName;
  if (attribute === SORT_BY_DISTANCE) return restaurantCatalog.sortByDistance;
  throw new Error('RestaurantCards의 Attributes가 잘못 설정되었습니다.');
}

class RestaurantCards extends HTMLUListElement {
  #renderedRestaurantCards: RestaurantCard[] = [];

  #appendRestaurants() {
    const restaurantFilteredAndSorted = sortMethod(this.getAttribute('data-sort-select')!)(
      restaurantCatalog
        .filterByCategory(this.getAttribute('data-category-select') as Category)
        ?.map((restaurant: Restaurant) => restaurant.getRestaurantInfoObject()),
    );
    this.#appendRestaurantCards(restaurantFilteredAndSorted);
    this.#render();
  }

  #appendRestaurantCards(restaurants: IRestaurantInfo[]) {
    this.#renderedRestaurantCards = restaurants.map((data) => new RestaurantCard(data.id!));
  }

  #render() {
    const currentLength = this.children.length;
    const nextLength = this.#renderedRestaurantCards.length;

    // 1. 기존의 레스토랑에서 id만 변경하기.
    for (let i = 0; i < Math.min(currentLength, nextLength); i += 1) {
      if (this.children[i].getAttribute('data-id') !== this.#renderedRestaurantCards[i].getAttribute('data-id')) {
        this.children[i].setAttribute('data-id', this.#renderedRestaurantCards[i].getAttribute('data-id')!);
      }
    }
    // 2. 레스토랑이 적어졌을 경우 remove 하기
    if (currentLength > nextLength) {
      for (let i = currentLength; i > nextLength; i -= 1) {
        this.children[i - 1].remove();
      }
    }
    // 3. 레스토랑이 많아졌을 경우 append하기
    if (currentLength < nextLength) {
      for (let i = currentLength; i < nextLength; i += 1) {
        this.appendChild(this.#renderedRestaurantCards[i]);
      }
    }
  }

  static get observedAttributes() {
    return ['data-sort-select', 'data-category-select'];
  }

  clear() {
    this.innerHTML = '';
  }

  attributeChangedCallback() {
    if (!this.getAttribute('data-sort-select') || !this.getAttribute('data-category-select')) {
      return;
    }
    this.#appendRestaurants();
  }
}

export default RestaurantCards;

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
  #renderRestaurantCards: RestaurantCard[] = [];

  #render() {
    const restaurantFilteredAndSorted = sortMethod(this.getAttribute('data-sort-select')!)(
      restaurantCatalog
        .filterByCategory(this.getAttribute('data-category-select') as Category)
        ?.map((restaurant: Restaurant) => restaurant.getRestaurantInfoObject()),
    );
    this.#setRenderRestaurantCards(restaurantFilteredAndSorted);
    this.#renderRestaurantsField();
  }

  #setRenderRestaurantCards(restaurants: IRestaurantInfo[]) {
    this.#renderRestaurantCards = restaurants.map((data) => new RestaurantCard(data.id!));
  }

  #renderRestaurantsField() {
    // 1. 기존의 레스토랑에서 id만 변경하기.
    this.#reRenderRestaurants();
    // 2. 레스토랑이 적어졌을 경우 remove 하기
    this.#removeRestaurants();
    // 3. 레스토랑이 많아졌을 경우 append하기
    this.#appendRestaurants();
  }

  #reRenderRestaurants() {
    for (let i = 0; i < Math.min(this.children.length, this.#renderRestaurantCards.length); i += 1) {
      if (this.children[i].getAttribute('data-id') !== this.#renderRestaurantCards[i].getAttribute('data-id')) {
        this.children[i].setAttribute('data-id', this.#renderRestaurantCards[i].getAttribute('data-id')!);
      }
    }
  }

  #removeRestaurants() {
    if (this.children.length > this.#renderRestaurantCards.length) {
      for (let i = this.children.length; i > this.#renderRestaurantCards.length; i -= 1) {
        this.children[i - 1].remove();
      }
    }
  }

  #appendRestaurants() {
    if (this.children.length < this.#renderRestaurantCards.length) {
      for (let i = this.children.length; i < this.#renderRestaurantCards.length; i += 1) {
        this.appendChild(this.#renderRestaurantCards[i]);
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
    this.#render();
  }
}

export default RestaurantCards;

import restaurantCatalog, { SORT_CONDITION } from '../../domain/RestaurantCatalog';

const IMG_CATEGORY = Object.freeze({
  한식: 'korean',
  아시안: 'asian',
  중식: 'chinese',
  기타: 'etc',
  양식: 'western',
  일식: 'japanese',
});

const [SORT_BY_NAME, SORT_BY_DISTANCE] = SORT_CONDITION;

class RestaurantCards extends HTMLUListElement {
  connectedCallback() {
    this.setAttribute('data-sort', SORT_BY_NAME);
  }

  #appendList() {
    const restaurants = JSON.parse(this.dataset.restaurants);

    if (this.dataset.sort === SORT_BY_NAME) {
      this.#makeRestaurantElement(restaurantCatalog.sortByName(restaurants));
    }
    if (this.dataset.sort === SORT_BY_DISTANCE) {
      this.#makeRestaurantElement(restaurantCatalog.sortByDistance(restaurants));
    }
  }

  #makeRestaurantElement(restaurants) {
    restaurants.forEach((data) => {
      const liElement = document.createElement('li');
      liElement.classList.add('restaurant');
      liElement.innerHTML = this.#generateInnerHTML(data);
      this.appendChild(liElement);
    });
  }

  #generateInnerHTML({ category, name, distanceFromCampus, description }) {
    return `
    <div class="restaurant__category">
      <img src="./templates/category-${IMG_CATEGORY[category]}.png" alt="${category}" class="category-icon">
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${distanceFromCampus}분 내</span>
      <p class="restaurant__description text-body">${description}</p>
    </div>
  `;
  }

  clear() {
    this.innerHTML = '';
  }

  renderList() {
    if (this.dataset.restaurants) {
      this.#appendList();
    }
  }

  static get observedAttributes() {
    return ['data-restaurants', 'data-sort'];
  }

  attributeChangedCallback() {
    this.clear();
    this.renderList();
  }
}

export default RestaurantCards;

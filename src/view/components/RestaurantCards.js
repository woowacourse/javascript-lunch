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

function sortMethod(attribute) {
  if (attribute === SORT_BY_NAME) return restaurantCatalog.sortByName;
  if (attribute === SORT_BY_DISTANCE) return restaurantCatalog.sortByDistance;
}

class RestaurantCards extends HTMLUListElement {
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

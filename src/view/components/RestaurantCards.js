import RestaurantCatalog from '../../domain/RestaurantCatalog';

class RestaurantCards extends HTMLUListElement {
  connectedCallback() {
    this.setAttribute('data-sort', '이름순');
  }

  #appendList() {
    const restaurants = JSON.parse(this.dataset.restaurants);

    if (this.dataset.sort === '이름순') {
      this.#makeRestaurantElement(RestaurantCatalog.sortByName(restaurants));
    }
    if (this.dataset.sort === '거리순') {
      this.#makeRestaurantElement(RestaurantCatalog.sortByDistance(restaurants));
    }
  }

  #makeRestaurantElement(restaurants) {
    restaurants.forEach(({ category, name, distanceFromCampus, description }) => {
      const liElement = document.createElement('li');
      liElement.classList.add('restaurant');
      liElement.innerHTML = `
          <div class="restaurant__category">
            <img src="./templates/category-${this.#checkImg(category)}.png" alt="${category}" class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distanceFromCampus}분 내</span>
            <p class="restaurant__description text-body">${description}</p>
          </div>
        `;
      this.appendChild(liElement);
    });
  }

  #checkImg(category) {
    const IMG_CATEGOY = {
      한식: 'korean',
      아시안: 'asian',
      중식: 'chinese',
      기타: 'etc',
      양식: 'western',
      일식: 'japanese',
    };
    return IMG_CATEGOY[category];
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

  attributeChangedCallback(name, oldValue, newValue) {
    this.clear();
    this.renderList();
  }
}

export default RestaurantCards;

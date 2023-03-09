customElements.define(
  'restaurant-list-item',
  class RestaurantListItem extends HTMLElement {
    categories = {
      한식: 'korean',
      중식: 'chinese',
      일식: 'japanese',
      아시안: 'asian',
      양식: 'western',
      기타: 'etc',
    };

    constructor() {
      super();

      const category = this.getAttribute('category');
      const restaurantName = this.getAttribute('restaurantName');
      const distance = this.getAttribute('distance');
      const description = this.getAttribute('description');
      // const isFavorite = this.getAttribute('isFavorite');

      this.innerHTML = /* html */ `
      <li class="restaurant">
        <div class="restaurant__category">
          <img src="./category-${this.categories[category]}.png" alt="${category}" class="category-icon" />
        </div>
        <div class="restaurant__info">
          <div class="flex">
            <div>
              <h3 class="restaurant__name text-subtitle">${restaurantName}</h3>
              <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            </div>
            <button class="favorite">
              <img src="./favorite-icon-lined.png" alt="favorite" class="favorite-icon" />
            </button>
          </div>
          <p class="restaurant__description text-body">${description}</p>
        </div>
      </li>`;
    }
  }
);

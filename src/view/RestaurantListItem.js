customElements.define(
  'restaurant-list-item',
  class RestaurantListItem extends HTMLElement {
    constructor() {
      super();

      const category = this.getAttribute('category');
      const restaurantName = this.getAttribute('restaurantName');
      const distance = this.getAttribute('distance');
      const description = this.getAttribute('description');

      this.innerHTML = `
      <li class="restaurant">
        <div class="restaurant__category">
          <img src="./category-korean.png" alt="${category}" class="category-icon" />
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurantName}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="restaurant__description text-body">${description}</p>
        </div>
      </li>`;
    }
  },
);

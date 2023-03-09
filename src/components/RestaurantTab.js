customElements.define(
  'restaurant-tab',
  class RestaurantTab extends HTMLElement {
    constructor() {
      super();

      this.innerHTML = /* html */ `
      <input type="radio" name="restaurant-tab" id="all-restaurants" checked />
      <label class="text-tab" for="all-restaurants">모든 음식점</label>

      <input type="radio" name="restaurant-tab" id="favorite-restaurants" />
      <label class="text-tab" for="favorite-restaurants">자주 가는 음식점</label>
      `;
    }
  }
);

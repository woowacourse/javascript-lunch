import { dispatchCustomEvent } from '../../utils/dom';

customElements.define(
  'restaurant-tab',
  class RestaurantTab extends HTMLElement {
    constructor() {
      super();

      this.innerHTML = /* html */ `
        <input type="radio" id="tab-all"name="tab" value="all" class="restaurant-tab" checked>
        <label for="tab-all">모든 음식점</label>
        <input type="radio" id="tab-favorite" name="tab" value="favorite" class="restaurant-tab">
        <label for="tab-favorite">자주 가는 음식점</label>
      `;
    }

    connectedCallback() {
      this.addEventListener('change', (e) => this.handleChange(e));
    }

    handleChange(e) {
      dispatchCustomEvent(this, {
        eventType: 'changeRestaurantTab',
        data: e.target.value,
      });
    }
  }
);

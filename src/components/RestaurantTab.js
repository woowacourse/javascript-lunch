import Component from '../core/Component.js';

export default class RestaurantTab extends Component {
  template() {
    return `
      <div class="restaurant__tab-list">
        <div class="restaurant__tab-item restaurant__tab-item--active">
          <span>모든 음식점</span>
        </div>
        <div class="restaurant__tab-item">
          <span>자주 가는 음식점</span>
        </div>
      </div>
    `;
  }
}

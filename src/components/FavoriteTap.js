import Component from '../Component.js';
import { qs } from '../utils/domHelpers.js';

export default class Favorite extends Component {
  constructor($target) {
    super($target);

    this.addEvent(
      'click',
      () => {
        this.switchToAllRestaurantList();
      },
      qs('.all__restaurant__label')
    ).addEvent(
      'click',
      () => {
        this.switchToFavoriteRestaurantList();
      },
      qs('.favorite__restaurant__label')
    );
  }

  template() {
    return `
    <div class="favorite-item">
      <input type="radio" id="all__restaurant__radio" name="favorite" aria-label="모든 음식점" checked />
      <label class="all__restaurant__label" for="all__restaurant__radio">모든 음식점</label>
      <div class="restaurant__tap__line"></div>
    </div>
    <div class="favorite-item">
      <input type="radio" id="favorite__restaurant__radio" name="favorite" aria-label="자주 가는 음식점" />
      <label class="favorite__restaurant__label" for="favorite__restaurant__radio">자주 가는 음식점</label>
      <div class="restaurant__tap__line"></div>
    </div>
      `;
  }

  switchToAllRestaurantList() {
    qs('.favorite-list-container').classList.add('list-none');
    qs('.restaurant-list-container').classList.remove('list-none');
    qs('.restaurant-filter-container').classList.remove('list-none');
  }

  switchToFavoriteRestaurantList() {
    qs('.favorite-list-container').classList.remove('list-none');
    qs('.restaurant-list-container').classList.add('list-none');
    qs('.restaurant-filter-container').classList.add('list-none');
  }
}

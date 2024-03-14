import Component from './Component';
import { $$, $addEvent } from '../utils/dom';

class LunchPickerTab extends Component {
  setEvent(): void {
    $addEvent(this, '.all', 'click', () => this.#updateTabItem('all'));
    $addEvent(this, '.favorites', 'click', () => this.#updateTabItem('favorites'));
  }

  #updateTabItem(type: string) {
    this.#updateTabItemColor(type);
    this.makeCustomEvent('updateRestaurantList');
  }

  #updateTabItemColor(type: string) {
    $$(this, '.tab-item').forEach((item) => item.classList.toggle('tab-item--checked', item.classList.contains(type)));
  }

  template(): string {
    return `
      <section class="lunch-picker-tab">
          <button class="tab-item tab-item--checked all" value="모든 음식점">모든 음식점</button>
          <button class="tab-item favorites" value="자주 가는 음식점">자주 가는 음식점</button>
      </section>
      `;
  }
}

export default LunchPickerTab;

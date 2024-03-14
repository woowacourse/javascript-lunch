import { $, $removeEvent } from '../utils/dom';
import Component from './Component';

class RestaurantTypeSelector extends Component {
  #theme: TTheme = '모든 음식점';

  setEvent(): void {
    document.querySelector('.restaurant-type-selector-wrapper')?.addEventListener('click', (event) => {
      const target = event.target as HTMLInputElement;
      this.#theme = target.value as TTheme;
      this.#updateTheme(this.#theme);
      this.#handleButtonClick();
    });
  }

  #updateTheme(theme: string): void {
    if (theme === '모든 음식점') {
      ($('.restaurant-type-favorite') as HTMLElement).classList.remove('restaurant-type-active');
      ($('.restaurant-type-all') as HTMLElement).classList.toggle('restaurant-type-active');
    }

    if (theme === '자주 가는 음식점') {
      ($('.restaurant-type-all') as HTMLElement).classList.remove('restaurant-type-active');
      ($('.restaurant-type-favorite') as HTMLElement).classList.add('restaurant-type-active');
    }
  }

  removeEvent(): void {
    $removeEvent('.restaurant-type-button', 'click', this.#handleButtonClick.bind(this));
  }

  #handleButtonClick(): void {
    this.makeCustomEvent('selectChange');
  }

  template(): string {
    return `
      <div class="restaurant-type-selector-wrapper" role="tablist">
        <button type="button" role="tap" class="restaurant-type-button restaurant-type-all restaurant-type-active" value="모든 음식점">모든 음식점</button>
        <button type="button" role="tap" class="restaurant-type-button restaurant-type-favorite" value="자주 가는 음식점">자주 가는 음식점</button>
      </div>
    `;
  }
}

export default RestaurantTypeSelector;

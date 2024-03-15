import { $, $removeEvent } from '../utils/dom';
import Component from './Component';

class RestaurantThemeSelector extends Component {
  #theme: TTheme = '모든 음식점';

  setEvent(): void {
    document.querySelector('.restaurant-theme-selector-wrapper')?.addEventListener('click', (event) => {
      const target = event.target as HTMLInputElement;
      this.#theme = target.value as TTheme;
      this.#updateTheme(this.#theme);
      this.#handleButtonClick();
    });
  }

  #updateTheme(theme: string): void {
    if (theme === '모든 음식점') {
      ($('.restaurant-theme-favorite') as HTMLElement).classList.remove('restaurant-theme-active');
      ($('.restaurant-theme-all') as HTMLElement).classList.toggle('restaurant-theme-active');
    }

    if (theme === '자주 가는 음식점') {
      ($('.restaurant-theme-all') as HTMLElement).classList.remove('restaurant-theme-active');
      ($('.restaurant-theme-favorite') as HTMLElement).classList.add('restaurant-theme-active');
    }
  }

  removeEvent(): void {
    $removeEvent('.restaurant-theme-button', 'click', this.#handleButtonClick.bind(this));
  }

  #handleButtonClick(): void {
    this.makeCustomEvent('selectChange');
  }

  template(): string {
    return `
      <div class="restaurant-theme-selector-wrapper" role="tablist">
        <button type="button" role="tap" class="restaurant-theme-button restaurant-theme-all restaurant-theme-active" value="모든 음식점">모든 음식점</button>
        <button type="button" role="tap" class="restaurant-theme-button restaurant-theme-favorite" value="자주 가는 음식점">자주 가는 음식점</button>
      </div>
    `;
  }
}

export default RestaurantThemeSelector;

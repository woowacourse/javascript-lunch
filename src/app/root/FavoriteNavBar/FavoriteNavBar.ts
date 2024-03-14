import { IMAGE } from '../../../assets/assets';
import { $ } from '../../../utils/domSelector';

class FavoriteNavBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEvent();
  }

  private addEvent() {
    const allRestaurantButton = $('#show-all');
    if (allRestaurantButton) {
      allRestaurantButton.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('showAll', {}));
      });
    }

    const favoriteRestaurantButton = $('#show-favorite');
    if (favoriteRestaurantButton) {
      favoriteRestaurantButton.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('showFavorite', {}));
      });
    }
  }

  private render() {
    this.innerHTML = `
      <section class="favorite-tabnb-container">
        <button name="all-restaurant" id="show-all" class="favorite-filter sel">
          모든 음식점
        </button>
        <button name="favorite-restaurant" id="show-favorite" class="favorite-filter">
          자주 가는 음식점
        </button>
      </section>
    `;
  }
}

customElements.define('favorite-tabnb', FavoriteNavBar);
export default FavoriteNavBar;

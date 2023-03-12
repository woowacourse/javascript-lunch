import CustomElement from '../CustomElement';

class RestaurantTypeSection extends CustomElement {
  renderTemplate = () => {
    return `
      <style>
        .restaurant-type-container {
          padding: 31px 16px 8px;
          margin-bottom: 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          text-align: center;
          color: var(--grey-300);
        }

        .restaurant-type-item {
          cursor: pointer;
        }
        
         .divide-line {
          width: 100%;
          height: 2px;
          margin-top: 9px;
          background-color: var(--grey-300);
        }

        .selected-type {
          color: var(--primary-color);
        }

        .selected-type-divide-line {
          background-color: var(--primary-color);
        }

      </style>
      <section class="restaurant-type-container">
        <div id="all-type" class="restaurant-type-item selected-type">
          <div>모든 음식점</div>
          <div class="divide-line selected-type-divide-line"></div>
        </div>
        <div id="favorite-type" class="restaurant-type-item">
          <div>자주 가는 음식점</div>
          <div class="divide-line"></div>
        </div>
      </section>
    `;
  };

  render = () => {
    super.render();

    this.initEventHandlers();
  };

  toggleRestaurantType = (type: 'all' | 'favorite') => {
    const $allType = this.querySelector('#all-type');
    const $favorite = this.querySelector('#favorite-type');

    if (!$allType || !$favorite) return;

    const $allTypeDivideLine = $allType.querySelector('.divide-line');
    const $favoriteDivideLine = $favorite.querySelector('.divide-line');

    if (!$allTypeDivideLine || !$favoriteDivideLine) return;

    if (type === 'all') {
      $allType.classList.add('selected-type');
      $favorite.classList.remove('selected-type');
      $allTypeDivideLine.classList.add('selected-type-divide-line');
      $favoriteDivideLine.classList.remove('selected-type-divide-line');
    } else {
      $allType.classList.remove('selected-type');
      $favorite.classList.add('selected-type');
      $allTypeDivideLine.classList.remove('selected-type-divide-line');
      $favoriteDivideLine.classList.add('selected-type-divide-line');
    }
  };

  clickTypeButton = (type: 'all' | 'favorite') => {
    this.toggleRestaurantType(type);

    this.dispatchEvent(
      new CustomEvent('chagneRestaurantType', {
        bubbles: true,
        detail: {
          type,
        },
      }),
    );
  };

  initEventHandlers = () => {
    const $allTypeButton = this.querySelector('.restaurant-type-item');
    const $favoriteTypeButton = this.querySelector('#favorite-type');

    if (!$allTypeButton || !$favoriteTypeButton) return;

    $allTypeButton.addEventListener('click', () => this.clickTypeButton('all'));
    $favoriteTypeButton.addEventListener('click', () => this.clickTypeButton('favorite'));
  };
}

customElements.define('r-restaurant-type-section', RestaurantTypeSection);

export default RestaurantTypeSection;

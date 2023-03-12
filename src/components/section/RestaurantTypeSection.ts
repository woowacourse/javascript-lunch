import CustomElement from '../CustomElement';

class RestaurantTypeSection extends CustomElement {
  renderTemplate(): string {
    return `
      <style>
        .restaurant-type-container {
          padding: 31px 16px 8px;
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
        <div class="restaurant-type-item selected-type">
          <div>모든 음식점</div>
          <div class="divide-line selected-type-divide-line"></div>
        </div>
        <div class="restaurant-type-item">
          <div>자주 가는 음식점</div>
          <div class="divide-line"></div>
        </div>
      </section>
    `;
  }
}

customElements.define('r-restaurant-type-section', RestaurantTypeSection);

export default RestaurantTypeSection;
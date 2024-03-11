import { IMAGE } from '../../../assets/assets';
import { $ } from '../../../utils/domSelector';

class LunchHeader extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEvent();
  }

  private addEvent() {
    $('#add-restaurant-button')!.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('showAddRestaurantModal', {}));
    });
  }

  private render() {
    this.innerHTML = `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" id="add-restaurant-button" class="gnb__button" aria-label="음식점 추가">
          <img src=${IMAGE.url.버튼_음식점추가} alt="음식점 추가" />
        </button>
      </header>
    `;
  }
}

customElements.define('lunch-header', LunchHeader);
export default LunchHeader;

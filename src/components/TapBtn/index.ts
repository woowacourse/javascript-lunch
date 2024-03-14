import { Restaurant, RestaurantList } from '../../domains';
import { FilteringController, RestaurantListController } from '../../services';
import './style.css';

class TapBtn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*HTML*/ `
    <button class="tap-btn-group__btn click" id="all-restaurant">모든 음식점</button>
    <button class="tap-btn-group__btn" id="like-restaurant">자주 가는 음식점</button>
    `;

    this.addEventListener('click', (event) => {
      const clickedEl = event.target as HTMLElement;
      this.#handleChangeTapClick(clickedEl);
      FilteringController.showFilteredSortedList();
    });
  }

  #handleChangeTapClick(clickedEl: HTMLElement) {
    const isClick = clickedEl.classList.contains('click');
    if (!isClick) {
      const containClick = this.querySelector('.click');
      containClick?.classList.remove('click');
      clickedEl.classList.add('click');
    }
  }
}
customElements.define('tap-btn', TapBtn);

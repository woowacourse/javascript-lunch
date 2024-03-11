import Component from './Component';
import RestaurantRepository from '../domain/RestaurantRepository';
import { $, $setAttribute } from '../utils/dom';
import { OPTION } from '../constants/Condition';

class LunchPickerApp extends Component {
  setEvent() {
    this.addEventListener('click', (event) => {
      if (event.target.closest('.gnb__button')) {
        $setAttribute('restaurant-add-modal', 'open', 'true');
      }

      if (event.target.classList.contains('button--primary')) {
        $setAttribute('restaurant-add-modal', 'open', 'false');
      }

      if (event.target.classList.contains('button--secondary')) {
        $setAttribute('restaurant-add-modal', 'open', 'false');
      }
    });

    this.addEventListener('change', (event) => {
      if (event.target.classList.contains('category') || event.target.classList.contains('sorting')) {
        const category = $('.category').value;
        const sorting = $('.sorting').value;

        $setAttribute('restaurant-list', 'category', `${category}`);
        $setAttribute('restaurant-list', 'sorting', `${sorting}`);
      }
    });
  }

  removeEvent() {
    this.removeEventListener('selectChange');
    this.removeEventListener('gnbButtonClick');
    this.removeEventListener('cancelButtonClick');
    this.removeEventListener('submitButtonClick');
  }

  template() {
    return `
      <lunch-picker-header></lunch-picker-header>
      <section class="restaurant-filter-container">
          <filter-box type="category" option='${JSON.stringify([OPTION.ALL, ...OPTION.CATEGORY])}'></filter-box>
          <filter-box type="sorting" option='${JSON.stringify(OPTION.SORTING)}'></filter-box>
      </section>
      <restaurant-list category="전체" sorting="이름순"></restaurant-list>
      <restaurant-add-modal open="false"></restaurant-add-modal>
    `;
  }
}

export default LunchPickerApp;

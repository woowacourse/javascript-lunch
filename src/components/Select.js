import Restaurant from './Restaurant';
import { $ } from '../utils/dom';

export default class Select {
  constructor(restaurants) {
    this.restaurants = restaurants;
    this.addEvent();
  }

  render({ id, name, options }) {
    const select = document.createElement('select');
    select.setAttribute('id', id);
    select.setAttribute('name', name);
    select.classList.add('restaurant-filter');

    Object.entries(options).forEach(([key, value]) => {
      const option = document.createElement('option');

      option.setAttribute('value', key);
      option.innerText = value;
      this.initSelectInput(option, key);

      select.appendChild(option);
    });

    return select;
  }

  addEvent() {
    // TODO: 상수화
    const targetIds = ['sorting-filter', 'category-filter'];

    // TODO: 내부 이벤트 분리
    $('main').addEventListener('change', ({ target }) => {
      if (targetIds.some((id) => target.id === id)) {
        const selectedValue = target.options[target.selectedIndex].value;
        this.restaurants.setStandard = { id: target.id, standard: selectedValue };
      }

      $('restaurant-list').innerHTML = '';
      this.restaurants.standardList.forEach((restaurantData) => {
        $('restaurant-list').innerHTML += new Restaurant().render(restaurantData);
      });
    });
  }

  initSelectInput(option, key) {
    const sortingFilter = localStorage.getItem('sorting-filter');
    const categoryFilter = localStorage.getItem('category-filter');

    if (sortingFilter === key || categoryFilter === key) {
      option.setAttribute('selected', 'selected');
    }
  }
}

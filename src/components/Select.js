import Restaurant from './Restaurant';
import { $ } from '../utils/dom';
import { FIELD_IDS } from '../constants/rules';

export default class Select {
  constructor(restaurants) {
    this.restaurants = restaurants;
    this.handleSelectChange();
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

  handleSelectChange() {
    $('restaurant-filter-container').addEventListener('change', ({ target }) => {
      if (FIELD_IDS.selectIds.some((id) => target.id === id)) {
        const selectedValue = target.options[target.selectedIndex].value;
        this.restaurants.standard = { id: target.id, standard: selectedValue };
      }

      this.reRenderRestaurantList();
    });
  }

  initSelectInput(option, key) {
    const sortingFilter = localStorage.getItem('sorting-filter');
    const categoryFilter = localStorage.getItem('category-filter');

    if (sortingFilter === key || categoryFilter === key) {
      option.setAttribute('selected', 'selected');
    }
  }

  reRenderRestaurantList() {
    $('restaurant-list').innerHTML = '';
    this.restaurants.standardList.forEach((restaurantData) => {
      $('restaurant-list').innerHTML += new Restaurant().render(restaurantData);
    });
  }
}

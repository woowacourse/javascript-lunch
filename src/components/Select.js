import { $ } from '../utils/dom';
import Restaurant from './Restaurant';

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

      select.appendChild(option);
    });

    return select;
  }

  addEvent() {
    const targetIds = ['sorting-filter', 'category-filter'];

    $('main').addEventListener('change', ({ target }) => {
      if (targetIds.some((id) => target.id === id)) {
        const selectedValue = target.options[target.selectedIndex].value;
        this.restaurants.setStandard = { id: target.id, standard: selectedValue };
      }

      document.getElementById('restaurant-list').innerHTML = '';
      this.restaurants.standardList.forEach((restaurantData) => {
        document.getElementById('restaurant-list').innerHTML += new Restaurant().render(
          restaurantData,
        );
      });
    });
  }
}

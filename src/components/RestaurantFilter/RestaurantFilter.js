import Restaurant from '../Restaurant/Restaurant';
import Select from '../Common/Select';
import { $ } from '../../utils/dom';
import { RULES } from '../../constants/rules';

export default class RestaurantFilter {
  constructor(restaurants) {
    this.restaurants = restaurants;
    this.handleSelectChange();
  }

  render(data) {
    return Select(data);
  }

  handleSelectChange() {
    $('restaurant-filter-container').addEventListener('change', ({ target }) => {
      if (RULES.selectIds.some((id) => target.id === id)) {
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

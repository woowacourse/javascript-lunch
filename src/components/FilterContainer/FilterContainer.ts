import { CATEGORIES_WITH_ALL_KEYS, SORT_CRITERION_KEYS } from '@/constants/Condition';
import BaseComponent from '../BaseComponent';
import SelectBox from '../Basic/SelectBox/SelectBox';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { Category, CategoryOrAll, SortCriteria } from '@/types/Restaurant';
import RestaurantList from '../RestaurantList/RestaurantList';

import './FilterContainer.css';
class FilterContainer extends BaseComponent {
  #selectCategoryBox: SelectBox<CategoryOrAll>;
  #selectSortBox: SelectBox<SortCriteria>;
  #restaurantList: RestaurantList;

  constructor() {
    super();
    this.#selectCategoryBox = new SelectBox<CategoryOrAll>(CATEGORIES_WITH_ALL_KEYS, 'category');
    this.#selectSortBox = new SelectBox<SortCriteria>(SORT_CRITERION_KEYS, 'sorting');
    this.#restaurantList = document.querySelector('.restaurant-list')!;
  }

  render() {
    this.append(this.#selectCategoryBox);
    this.append(this.#selectSortBox);
  }

  repaint() {
    const restaurantDBService = new RestaurantDBService();

    const newRestaurantList = restaurantDBService.getFromRestaurantList(
      this.#selectCategoryBox.value as Category,
      this.#selectSortBox.value as SortCriteria,
    );

    //this.#restaurantList = document.querySelector('.restaurant-list')!;

    this.#restaurantList.paint(newRestaurantList);
  }

  setEvent() {
    this.addEventListener('change', () => {
      this.repaint();
    });
  }
}

customElements.define('filter-container', FilterContainer);

export default FilterContainer;

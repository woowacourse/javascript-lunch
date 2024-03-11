import { CATEGORIES_WITH_ALL_KEYS, SORT_CRITERION_KEYS } from '@/constants/Condition';
import BaseComponent from '../BaseComponent';
import SelectBox from '../SelectBox/SelectBox';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { Category, SortCriteria } from '@/types/Restaurant';
import RestaurantList from '../RestaurantList/RestaurantList';
import { ErrorMessage } from '@/constants/ErrorMessage';

class FilterContainer extends BaseComponent {
  #restaurantList;

  constructor() {
    super();
    this.#restaurantList = document.querySelector('.restaurant-list-container') as RestaurantList;
  }

  render() {
    this.append(this.#makeSelectCategoryBox());
    this.append(this.#makeSelectSortBox());
  }

  #makeSelectCategoryBox() {
    return new SelectBox({
      optionValues: CATEGORIES_WITH_ALL_KEYS,
      optionTexts: CATEGORIES_WITH_ALL_KEYS,
      name: 'category',
      classList: ['restaurant-filter'],
      id: 'category-filter',
    });
  }

  #makeSelectSortBox() {
    return new SelectBox({
      optionValues: SORT_CRITERION_KEYS,
      optionTexts: SORT_CRITERION_KEYS,
      name: 'sorting',
      classList: ['restaurant-filter'],
      id: 'sorting-filter',
    });
  }

  setEvent() {
    this.addEventListener('change', () => {
      const restaurantDBService = new RestaurantDBService();

      const selectedCategory = this.querySelector('#category-filter') as HTMLSelectElement;
      if (!selectedCategory) {
        return console.error(ErrorMessage.NULL_SELECTOR(selectedCategory));
      }
      const selectedSortCriteria = this.querySelector('#sorting-filter') as HTMLSelectElement;
      if (!selectedSortCriteria) {
        return console.error(ErrorMessage.NULL_SELECTOR(selectedSortCriteria));
      }
      const newRestaurantList = restaurantDBService.getFromRestaurantList(
        selectedCategory.value as Category,
        selectedSortCriteria.value as SortCriteria,
      );
      this.#restaurantList.rerender(newRestaurantList);
    });
  }
}

customElements.define('filter-container', FilterContainer);

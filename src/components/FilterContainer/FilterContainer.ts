import { CATEGORIES_WITH_ALL_KEYS, SORT_CRITERION_KEYS } from '@/constants/Condition';
import BaseComponent from '../BaseComponent';
import SelectBox from '../SelectBox/SelectBox';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { Category, SortCriteria } from '@/types/Restaurant';
import RestaurantList from '../RestaurantList/RestaurantList';
import { $ } from '@/utils/DOM';

class FilterContainer extends BaseComponent {
  #restaurantList;
  #restaurantDBService;

  constructor() {
    super();
    this.#restaurantList = $<RestaurantList>('.restaurant-list-container');
    this.#restaurantDBService = new RestaurantDBService();
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
      const $selectedCategory = $<HTMLSelectElement>('#category-filter');
      const $selectedSortCriteria = $<HTMLSelectElement>('#sorting-filter');

      const restaurantCollection = this.#restaurantDBService.update();

      const urlParams = new URLSearchParams(window.location.search);
      //favorite일 떄 한번 필터링 해주기
      if (urlParams.get('tab') === 'favorite') restaurantCollection.filterFavorites();

      //무조건 sort 해주기
      const newRestaurantList = restaurantCollection.filterByCategoryAndSort(
        $selectedCategory.value as Category,
        $selectedSortCriteria.value as SortCriteria,
      );

      this.#restaurantList.rerender(newRestaurantList);
      return newRestaurantList;
    });
  }
}

customElements.define('filter-container', FilterContainer);

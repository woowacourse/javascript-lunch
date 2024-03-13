import { DROP_BOX_MAP } from '../constants';
import { RestaurantList } from '../domains';
import { Category } from '../types';
import RestaurantListController from './RestaurantListController';

const FilteringController = {
  addEventToFiltering() {
    const $filteringCategory = document.getElementById('filtering-category');
    const $filteringSorting = document.getElementById('filtering-sorting');

    $filteringCategory?.addEventListener(
      'change',
      this.showFilteredSortedList.bind(this),
    );
    $filteringSorting?.addEventListener(
      'change',
      this.showFilteredSortedList.bind(this),
    );
  },
  /**
   * 현재 선택된 필터링, 정렬 기준으로 음식점 목록을 화면에 나타낸다.
   */
  showFilteredSortedList() {
    const option = this.private_getSelectedOption();
    if (!option) return;

    const { category, sorting } = option;
    const restaurantList = new RestaurantList();

    const dropBoxCategories = DROP_BOX_MAP.get(
      'filteringCategory',
    )?.options.map((item) => item.value);

    if (
      !dropBoxCategories ||
      !dropBoxCategories.find((item) => item === category)
    )
      return;

    const filteredList =
      category === 'all'
        ? restaurantList.list
        : restaurantList.filterRestaurantsByCategory(category as Category);

    if (filteredList?.[0]) {
      const sortedList = restaurantList.sortRestaurants(
        filteredList,
        sorting as 'name' | 'distance',
      );

      RestaurantListController.injectRestaurantListHTML(sortedList);
    } else {
      RestaurantListController.injectRestaurantListHTML();
    }
  },

  private_getSelectedValue(selectElement: HTMLSelectElement) {
    const selectedIndex = selectElement?.selectedIndex;
    const selectedValue = selectElement?.options[selectedIndex].value;

    return selectedValue;
  },

  private_getSelectedOption():
    | { category: string; sorting: string }
    | undefined {
    const $filteringCategory = document.getElementById('filtering-category');
    const $filteringSorting = document.getElementById('filtering-sorting');

    if (
      $filteringCategory instanceof HTMLSelectElement &&
      $filteringSorting instanceof HTMLSelectElement
    ) {
      return {
        category: this.private_getSelectedValue($filteringCategory),
        sorting: this.private_getSelectedValue($filteringSorting),
      };
    }

    return undefined;
  },
};

export default FilteringController;

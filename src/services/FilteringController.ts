import { DROP_BOX_MAP } from '../constants';
import { RestaurantList } from '../domains';
import { Category } from '../types';
import RestaurantListController from './RestaurantListController';

const FilteringController = {
  addEventToFiltering() {
    const filteringCategoryEl = document.getElementById('filtering-category');
    const filteringSortingEl = document.getElementById('filtering-sorting');

    filteringCategoryEl?.addEventListener(
      'change',
      this.showFilteredSortedList.bind(this),
    );
    filteringSortingEl?.addEventListener(
      'change',
      this.showFilteredSortedList.bind(this),
    );
  },

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
      dropBoxCategories.find((item) => item !== category)
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
    const filteringCategory = document.getElementById('filtering-category');
    const filteringSorting = document.getElementById('filtering-sorting');

    if (
      filteringCategory instanceof HTMLSelectElement &&
      filteringSorting instanceof HTMLSelectElement
    ) {
      return {
        category: this.private_getSelectedValue(filteringCategory),
        sorting: this.private_getSelectedValue(filteringSorting),
      };
    }

    return undefined;
  },
};

export default FilteringController;

import { FILTERED_CATEGORY, FILTERED_CATEGORY_ATTRIBUTE, SORTING, SORTING_ATTRIBUTE } from '../constants/filter';
import RestaurantComponent from './Restaurant';
import SelectBoxComponent from './SelectBox';

class RestaurantFilterContainer {
  #restaurantList;

  constructor(restaurantList) {
    this.#restaurantList = restaurantList;
  }

  createFilters() {
    const $restaurantFilterContainer = document.querySelector('.restaurant-filter-container');
    this.createFilterByCategory($restaurantFilterContainer);
    this.createSorting($restaurantFilterContainer);
  }

  createFilterByCategory($restaurantFilterContainer) {
    const filterByCategoryInformation = {
      $target: $restaurantFilterContainer,
      attributes: FILTERED_CATEGORY_ATTRIBUTE,
      eventHandler: () => {
        this.handleFilter();
      },
      options: FILTERED_CATEGORY,
    };
    SelectBoxComponent.create(filterByCategoryInformation);
  }

  createSorting($restaurantFilterContainer) {
    const sortingInformation = {
      $target: $restaurantFilterContainer,
      attributes: SORTING_ATTRIBUTE,
      eventHandler: () => {
        this.handleFilter();
      },
      options: SORTING,
    };
    SelectBoxComponent.create(sortingInformation);
  }

  handleFilter() {
    const $restaurantList = document.querySelector('.restaurant-list');

    this.#restaurantList.filterByCategory(this.getCategoryCondition());
    const sortedList = this.#restaurantList.getSortedByCondition(this.getSortingCondition());

    $restaurantList.replaceChildren();
    RestaurantComponent.create(sortedList);
  }

  favoriteTapFilter() {
    const $restaurantList = document.querySelector('.restaurant-list');

    this.#restaurantList.filterByFavorite();

    $restaurantList.replaceChildren();
    RestaurantComponent.create(this.#restaurantList.getSortedByName());
  }

  getCategoryCondition() {
    const $categoryFilter = document.getElementById('category-filter');

    const categoryOptions = $categoryFilter.options;
    const category = categoryOptions[categoryOptions.selectedIndex].text;

    return category;
  }

  getSortingCondition() {
    const $sortingFilter = document.getElementById('sorting-filter');

    const sortingOptions = $sortingFilter.options;
    const sortingCondition = sortingOptions[sortingOptions.selectedIndex].text;

    return sortingCondition;
  }
}

export default RestaurantFilterContainer;

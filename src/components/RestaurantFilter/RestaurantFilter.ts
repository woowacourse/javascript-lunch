import Category from '../../enums/Category';
import Sorting from '../../enums/Sorting';
import RestaurantList from '../RestaurantList/RestaurantList';

const RestaurantFilter = {
  create() {
    const restaurantFilterContainer = document.createElement('section');
    restaurantFilterContainer.classList.add('restaurant-filter-container');

    const categorySelector = this.createCategorySelector();
    const sortingSelector = this.createSortingSelector();

    restaurantFilterContainer.appendChild(categorySelector);
    restaurantFilterContainer.appendChild(sortingSelector);

    this.setHandle(categorySelector, sortingSelector);

    document.querySelector('main')?.appendChild(restaurantFilterContainer);
  },

  setHandle(categorySelector: HTMLSelectElement, sortingSelector: HTMLSelectElement) {
    categorySelector.addEventListener('change', () => {
      const selectedCategory = categorySelector.value as Category;
      const selectedSorting = sortingSelector.value as Sorting;
      this.refreshRestaurantList(selectedCategory, selectedSorting);
    });
    sortingSelector.addEventListener('change', () => {
      const selectedCategory = categorySelector.value as Category;
      const selectedSorting = sortingSelector.value as Sorting;
      this.refreshRestaurantList(selectedCategory, selectedSorting);
    });
  },

  createCategorySelector() {
    const categorySelector = document.createElement('select');
    categorySelector.name = 'category';
    categorySelector.id = 'category-filter';
    categorySelector.classList.add('restaurant-filter');
    const categoryOptionAll = document.createElement('option');
    categoryOptionAll.value = categoryOptionAll.textContent = '전체';
    categorySelector.appendChild(categoryOptionAll);
    Object.keys(Category).forEach((categoryName) => {
      const categoryOption = document.createElement('option');
      categoryOption.value = categoryOption.textContent = categoryName;
      categorySelector.appendChild(categoryOption);
    });
    return categorySelector;
  },

  createSortingSelector() {
    const sortingSelector = document.createElement('select');
    sortingSelector.name = 'sorting';
    sortingSelector.id = 'sorting-filter';
    sortingSelector.classList.add('restaurant-filter');
    Object.keys(Sorting).forEach((sortingName) => {
      const sortingOption = document.createElement('option');
      sortingOption.value = sortingOption.textContent = sortingName;
      sortingSelector.appendChild(sortingOption);
    });
    return sortingSelector;
  },

  refreshRestaurantList(selectedCategory: Category, selectedSorting: Sorting) {
    const oldRestaurantList = document.querySelector('.restaurant-list-container');
    oldRestaurantList?.replaceChildren();

    new RestaurantList(selectedCategory, selectedSorting);
  },
};

export default RestaurantFilter;

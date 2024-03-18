import RestaurantListStorageService from '../../services/restaurantListStorageService';
import filterState from '../../store/FilterStateStore';
import { Category, SortType } from '../../types';
import RestaurantList from '../restaurantList/RestaurantList';
import RestaurantListFilterService from '../../services/restaurantListFilterService';
import localStorageHandler from '../../services/localStorageHandler';

const setFilterStateByCategoryValue = (selectedValue: Category) => {
  filterState.setFilterType(selectedValue);
};

const setSortStateByNameOrDistance = (selectedValue: SortType) => {
  filterState.setSortType(selectedValue);
};

const reRenderRestaurantListComponent = () => {
  const allData = localStorageHandler('restaurantList').get()!;
  const filterData = RestaurantListFilterService.getFilteredData(allData);
  RestaurantList(filterData ?? []);
};

const reRenderRestaurantListByCategoryEvent = (event: Event) => {
  if (event.target instanceof HTMLSelectElement) {
    const selectedValue = event.target.value as Category;
    setFilterStateByCategoryValue(selectedValue);
    reRenderRestaurantListComponent();
  }
};

const categoryFilterHandler = (categoryFilter: HTMLElement) => {
  categoryFilter.addEventListener('change', (event) => reRenderRestaurantListByCategoryEvent(event));
};

const selectOptionByFoodCategory = () => {
  const categoryFilter = document.getElementById('category-filter');
  if (categoryFilter) {
    categoryFilterHandler(categoryFilter);
  }
};

const selectOptionByNameSortEvent = (event: Event) => {
  if (event.target instanceof HTMLSelectElement) {
    const selectedValue = event.target.value as SortType;
    setSortStateByNameOrDistance(selectedValue);
    reRenderRestaurantListComponent();
  }
};

const sortHandler = (sortFilter: HTMLElement) => {
  sortFilter.addEventListener('change', (event) => selectOptionByNameSortEvent(event));
};

const selectOptionByNameOrDistance = () => {
  const sortFilter = document.getElementById('sorting-filter');
  if (sortFilter) {
    sortHandler(sortFilter);
  }
};

const bindSelectCategoryOrDistanceOrNameFilterEvent = () => {
  selectOptionByNameOrDistance();
  selectOptionByFoodCategory();
};

export default bindSelectCategoryOrDistanceOrNameFilterEvent;

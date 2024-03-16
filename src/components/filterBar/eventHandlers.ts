import RestaurantListStorageService from '../../services/restaurantListStorageService';
import filterState from '../../store/FilterStateStore';
import { Category, SortType } from '../../types';
import RestaurantList from '../restaurantList/RestaurantList';
import RestaurantListFilterService from '../../services/restaurantListFilterService';

const categoryFilterHandler = (categoryFilter: HTMLElement) => {
  categoryFilter.addEventListener('change', (event) => {
    if (event.target instanceof HTMLSelectElement) {
      const selectedValue = event.target.value as Category;
      filterState.setFilterType(selectedValue);
      const allData = RestaurantListStorageService.getData()!;
      const filterData = RestaurantListFilterService.getFilteredData(allData);
      RestaurantList(filterData ?? []);
    }
  });
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
    filterState.setSortType(selectedValue);
    const allData = RestaurantListStorageService.getData()!;
    const filterData = RestaurantListFilterService.getFilteredData(allData);

    RestaurantList(filterData ?? []);
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

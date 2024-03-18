import { RestaurantState } from '../types/index.d';
import restaurantListHelper from '../helpers/RestaurantListHelper';
import filterState from '../store/FilterStateStore';

const RestaurantListFilterService = (function () {
  function getDataFromFilterCategoryValue(data: RestaurantState[]) {
    const filterDataByCategory = restaurantListHelper.filterByCategory(filterState.getFilterInfo().filter, data);
    return filterDataByCategory || [];
  }

  function getDataFromNameOrDistanceSelectValue(data: RestaurantState[]) {
    const sortedData = restaurantListHelper.sortBySelectedValue(filterState.getFilterInfo().sort, data);
    return sortedData || [];
  }

  function getFilteredData(data: RestaurantState[]) {
    const filteredData = getDataFromFilterCategoryValue(data);
    return getDataFromNameOrDistanceSelectValue(filteredData);
  }

  return {
    getDataFromFilterCategoryValue,
    getDataFromNameOrDistanceSelectValue,
    getFilteredData,
  };
})();

export default RestaurantListFilterService;

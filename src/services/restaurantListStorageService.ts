import restaurantListHelper from '../helpers/RestaurantListHelper';
import filterState from '../store/FilterStateStore';
import { RestaurantState } from '../types';

const RestaurantListStorageService = (function () {
  let cachedData: RestaurantState[] | null = null; // 내부 캐시 데이터를 저장할 변수

  function getData() {
    if (cachedData === null) {
      const restaurantList = localStorage.getItem('restaurantList');
      cachedData = restaurantList ? JSON.parse(restaurantList) : [];
    }
    return cachedData;
  }

  function getFilteredData() {
    const data = getData();
    if (data) {
      const filterDataByCategory = restaurantListHelper.filterByCategory(filterState.getFilterInfo().filter, data);
      return restaurantListHelper.sortBySelectedValue(filterState.getFilterInfo().sort, filterDataByCategory);
    }
  }

  function setData(restaurant: RestaurantState) {
    const prevData = getData();
    if (prevData) {
      const newData = [...prevData, restaurant];
      cachedData = newData;
      localStorage.setItem('restaurantList', JSON.stringify(newData));
    }
  }

  return {
    getData,
    getFilteredData,
    setData,
  };
})();

export default RestaurantListStorageService;

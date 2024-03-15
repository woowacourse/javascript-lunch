import restaurantListHelper from '../helpers/RestaurantListHelper';
import filterState from '../store/FilterStateStore';
import { RestaurantState, TabValue } from '../types';

const RestaurantListStorageService = (function () {
  let cachedData: RestaurantState[] | null = null;

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
    return [];
  }

  function patchData(restaurantId: number) {
    const data = getData();
    if (data) {
      const restaurantIndex = data.findIndex((restaurant) => restaurant.id === restaurantId);
      if (restaurantIndex !== -1) {
        data[restaurantIndex].isFavorited = !data[restaurantIndex].isFavorited;
        cachedData = data;
        localStorage.setItem('restaurantList', JSON.stringify(data));
      }
    }
  }

  function setData(restaurant: RestaurantState) {
    const prevData = getData();
    if (prevData) {
      const lastElementId = prevData.length > 0 ? prevData[prevData.length - 1].id || 0 : 0;
      const newId = lastElementId + 1;
      const newRestaurant = { ...restaurant, id: newId };
      const newData = [...prevData, newRestaurant];
      cachedData = newData;
      localStorage.setItem('restaurantList', JSON.stringify(newData));
    }
  }

  function deleteData(restaurant: RestaurantState) {
    const prevData = getData();
    if (prevData) {
      const filteredData = prevData.filter((data) => data.id !== restaurant.id);
      cachedData = filteredData;
      localStorage.setItem('restaurantList', JSON.stringify(filteredData));
    }
  }

  function getDataFromQuery(tabValue: TabValue) {
    const allData = getData();
    if (tabValue === 'all') {
      return allData;
    }

    const filteredDataByFavorite = allData?.filter((restaurant) => restaurant.isFavorited === true) ?? [];

    return filteredDataByFavorite;
  }

  return {
    getData,
    getFilteredData,
    patchData,
    setData,
    deleteData,
    getDataFromQuery,
  };
})();

export default RestaurantListStorageService;

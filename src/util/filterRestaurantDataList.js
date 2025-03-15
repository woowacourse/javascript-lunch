import selectedFilterValue from "../domain/SelectedFilterValue";

export default function filterRestaurantDataList({restaurantDataList, isWishList}) {
    const filteredRestaurantDataList = filterByCategory(restaurantDataList);
    const sortedRestaurantDataList = sortByCategory(filteredRestaurantDataList);

    const filteredByStar = isWishList ? filterByStar(sortedRestaurantDataList) : sortedRestaurantDataList;
    return filteredByStar;
  }
  
  function filterByCategory(dataList) {
    const category = selectedFilterValue.getSelectedFilterCategoryValue();
    const sorting = selectedFilterValue.getSelectedFilterSortingValue();
    return dataList.filter((data) => 
      category === "전체" || data.category === category
    );
  }
  
  function sortByCategory(dataList) {
    const category = selectedFilterValue.getSelectedFilterSortingValue();
    if(category === '이름순') {
      dataList.sort((a, b) => a.name.localeCompare(b.name));
    }
  
    if(category === '거리순') {
      dataList.sort((a, b) => {
        if (a.distance > b.distance) return 1;
        if (a.distance < b.distance) return -1;
        return 0;
      });
    }

    return dataList
  }
    
  function filterByStar(dataList) {
    return dataList.filter((data) => data.isWish === true) || [];    
  }
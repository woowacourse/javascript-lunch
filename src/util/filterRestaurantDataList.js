import selectedFilterValue from "../domain/SelectedFilterValue";

const SORTING_ALL = "전체";
const SORTING_NAME = "이름순"
const SORTING_DISTANCE = "거리순";

export default function filterRestaurantDataList({
  restaurantDataList,
  isWishList,
}) {
  const filteredRestaurantDataList = filterByCategory(restaurantDataList);
  const sortedRestaurantDataList = sortByCategory(filteredRestaurantDataList);

  const filteredByStar = isWishList
    ? filterByStar(sortedRestaurantDataList)
    : sortedRestaurantDataList;
  return filteredByStar;
}

function filterByCategory(dataList) {
  const category = selectedFilterValue.getSelectedFilterCategoryValue();
  return dataList.filter(
    (data) => category === SORTING_ALL || data.category === category
  );
}

function sortByCategory(dataList) {
  const sorting = selectedFilterValue.getSelectedFilterSortingValue();
  if (sorting === SORTING_NAME) {
    dataList.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sorting === SORTING_DISTANCE) {
    dataList.sort((a, b) => a.distance - b.distance);
  }

  return dataList;
}

function filterByStar(dataList) {
  return dataList.filter((data) => data.isWish === true);
}

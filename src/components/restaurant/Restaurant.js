import RestaurantHeader from "./RestaurantHeader.js";
import RestaurantItem from "./RestaurantItem.js";
import RestaurantListContainer from "./RestaurantListContainer.js";

import restaurantDataList from "../../domain/RestaurantDataList.js";
import RestaurantFilterContainer from "./RestaurantFilterContainer.js";
import selectedFilterValue from "../../domain/SelectedFilterValue.js";

export default function Restaurant({isReRender}) {
  const $body = document.querySelector("body");
  
  const $restaurantHeader = RestaurantHeader("점심 뭐 먹지");

  const $restaurantFilterContainer = RestaurantFilterContainer();
  const filteredRestaurantDataList = filterRestaurantDataList(
    restaurantDataList.getDataList(),
  );

  const $restaurantListContainer = RestaurantListContainer(
    filteredRestaurantDataList
  );
  
  if(!isReRender) {
    $body.appendChild($restaurantHeader);
    $body.appendChild($restaurantFilterContainer);
    $body.appendChild($restaurantListContainer)
  }
  
  if(isReRender) {
    reRenderRestaurantListContainer($body, $restaurantListContainer);
  }
}

function filterRestaurantDataList(restaurantDataList) {
  const category = selectedFilterValue.getSelectedFilterCategoryValue()
  const sorting = selectedFilterValue.getSelectedFilterCategorySorting();

  const filteredRestaurantDataListByCategory = restaurantDataList.filter((dataList) => dataList.category === "전체" || dataList.category === category);
  console.log(category);
  console.log(filteredRestaurantDataListByCategory)
  return filteredRestaurantDataListByCategory
}

function reRenderRestaurantListContainer(parent, element) {
  removeRestaurantListContainer();
  parent.appendChild(element);
}

function removeRestaurantListContainer() {
  document.querySelector(".restaurant-list-container").remove();
}
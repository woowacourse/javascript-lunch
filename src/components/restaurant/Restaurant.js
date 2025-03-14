import RestaurantHeader from "./RestaurantHeader.js";
import RestaurantListContainer from "./RestaurantListContainer.js";
import RestaurantFilterContainer from "./RestaurantFilterContainer.js";
import RestaurantItemDetailModal from "../RestaurantItemDetail/RestaurantItemDetailModal.js";

import restaurantDataList from "../../domain/RestaurantDataList.js";
import selectedFilterValue from "../../domain/SelectedFilterValue.js";

import filterRestaurantDataList from "../../util/filterRestaurantDataList.js";
import reRenderRestaurantListContainer from "../../util/reRenderRestaurantListContainer.js";
import RestaurantFilterTabs from "./RestaurantFilterTabs.js";
import Modal from "../util/Modal.js";

export default function Restaurant({isReRender}) {
  const filteredRestaurantDataList = filterRestaurantDataList({
    restaurantDataList: [...restaurantDataList.getDataList()],
    isWishList: selectedFilterValue.getIsWishList()
  },
);
  
  const $body = document.querySelector("body");
  const $restaurantHeader = RestaurantHeader("점심 뭐 먹지");
  
  const $restaurantFilterTabs = RestaurantFilterTabs();
  const $restaurantFilterContainer = RestaurantFilterContainer();

  const $restaurantListContainer = RestaurantListContainer(
    [...filteredRestaurantDataList]
  );
  
  if(!isReRender) {
    $body.appendChild($restaurantHeader);
    $body.appendChild($restaurantFilterTabs);
    $body.appendChild($restaurantFilterContainer);
    $body.appendChild($restaurantListContainer)
  }
  
  if(isReRender) {
    reRenderRestaurantListContainer($body, $restaurantListContainer);
  }

  const $restaurants = document.querySelectorAll(".restaurant");
  $restaurants.forEach(($restaurant) => {
    $restaurant.addEventListener("click", (event) => {
      const restaurantId = event.target.closest(".restaurant").id;
      Modal({component: () => RestaurantItemDetailModal({restaurantId, isColumn: true})});
    });
  });
}
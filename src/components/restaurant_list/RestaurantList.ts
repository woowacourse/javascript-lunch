/* eslint-disable max-lines-per-function */
import RestaurantListStorageService from "../../services/restaurantListStorageService";
import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

import render from "./renderHandlers";
import restaurantListTemplate from "./restaurantListTemplate";

function RestaurantList() {
  const main = document.querySelector("main");

  const reRender = () => {
    const filterData = RestaurantListStorageService.getfilteredData();
    render(filterData);
  };

  const init = () => {
    const formattedRestaurantListTemplate = convertHTMLStringToDOM(
      restaurantListTemplate,
    );
    if (main) {
      main.appendChild(formattedRestaurantListTemplate);
    }

    reRender();
  };

  return {
    init,
    reRender,
  };
}

export default RestaurantList;

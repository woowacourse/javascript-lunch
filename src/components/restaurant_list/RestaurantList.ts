/* eslint-disable max-lines-per-function */
import RestaurantListStorageService from "../../services/restaurantListStorageService";
import { Irestaurant } from "../../types";
import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";
import Restaurant from "../restaurant/Restaurant";

import restaurantListTemplate from "./template";

function RestaurantList() {
  const main = document.querySelector("main");

  const resetPrevRestaurantList = (ul: Element) => {
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  };

  const render = (filterData: Irestaurant[]) => {
    console.log("render");
    const ul = document.getElementsByClassName("restaurant-list")[0];
    resetPrevRestaurantList(ul);
    const totalText = filterData.reduce((acc: string, cur: Irestaurant) => {
      console.log(cur);
      return acc + Restaurant(cur);
    }, "");
    const formattedTotalText = convertHTMLStringToDOM(totalText);
    ul.appendChild(formattedTotalText);
  };

  const reRender = () => {
    console.log("rerender");
    const filterData = RestaurantListStorageService.getfilteredData();
    console.log("f", filterData);
    render(filterData);
  };

  const init = () => {
    console.log("init");
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

import RestaurantListStorageService from "../../services/restaurantListStorageService";
import { Irestaurant } from "../../types";
import Restaurant from "../restaurant/Restaurant";
import { restaurantListTemplate } from "./template";
import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

function RestaurantList() {
  const main = document.querySelector("main");

  const init = () => {
    const formattedRestaurantListTemplate = convertHTMLStringToDOM(
      restaurantListTemplate,
    );

    if (main) {
      main.appendChild(formattedRestaurantListTemplate);
    }

    reRender();
  };

  const reRender = () => {
    const filterData = RestaurantListStorageService.getfilteredData();
    render(filterData);
  };

  const render = (filterData: Irestaurant[]) => {
    const ul = document.getElementsByClassName("restaurant-list")[0];

    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }

    const totalText = filterData.reduce((acc: string, cur: Irestaurant) => {
      return acc + Restaurant().render(cur);
    }, "");

    const formattedTotalText = convertHTMLStringToDOM(totalText);
    ul.appendChild(formattedTotalText);
  };
  return {
    init,
    reRender,
  };
}

export default RestaurantList;

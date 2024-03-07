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
    resetPrevRestaurantList(ul);

    const totalText = filterData.reduce((acc: string, res: Irestaurant) => {
      return acc + Restaurant(res);
    }, "");
    const formattedTotalText = convertHTMLStringToDOM(totalText);
    ul.appendChild(formattedTotalText);
  };

  const resetPrevRestaurantList = (ul: Element) => {
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  };

  return {
    init,
    reRender,
  };
}

export default RestaurantList;

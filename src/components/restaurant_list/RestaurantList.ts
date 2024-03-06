import RestaurantListStorageService from "../../services/restaurantListStorageService";
import { Irestaurant } from "../../types";
import Restaurant from "../restaurant/Restaurant";
import { restaurantListTemplate } from "./template";
import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

function RestaurantList(localStorageTest: Irestaurant[]) {
  const main = document.querySelector("main");

  const init = () => {
    const formattedRestaurantListTemplate = convertHTMLStringToDOM(
      restaurantListTemplate,
    );

    if (main) {
      main.appendChild(formattedRestaurantListTemplate);
    }

    render();
  };

  const render = () => {
    const ul = document.getElementsByClassName("restaurant-list")[0];

    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }

    const totalText = localStorageTest.reduce(
      (acc: string, cur: Irestaurant) => {
        return acc + Restaurant().render(cur);
      },
      "",
    );

    const formattedTotalText = convertHTMLStringToDOM(totalText);
    ul.appendChild(formattedTotalText);
  };
  return {
    init,
    render,
  };
}

export default RestaurantList;

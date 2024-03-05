import { Irestaurant } from "../../types";
import Restaurant from "../restaurant/Restaurant";
import { template } from "./template";

function RestaurantList() {
  const render = () => {
    const main = document.querySelector("main");
    const section = document.createElement("section");
    section.setAttribute("class", "restaurant-list-container");
    section.innerHTML += template;

    const localStorageTest = localStorage.getItem("restaurantInfo");

    if (localStorageTest) {
      const allRestaurants = JSON.parse(localStorageTest);
      const totalText = allRestaurants.reduce(
        (acc: string, cur: Irestaurant) => {
          return acc + Restaurant().render(cur);
        },
        "",
      );

      section.innerHTML += totalText;
    }

    if (main) {
      main.appendChild(section);
    }
  };
  return {
    render,
  };
}

export default RestaurantList;

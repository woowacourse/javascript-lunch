import RestaurantListStorageService from "../../services/restaurantListStorageService";
import { Irestaurant } from "../../types/restaurant";
import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";
import Restaurant from "../restaurant/Restaurant";

const resetPrevRestaurantList = (ul: Element) => {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
};

const render = (filterData: Irestaurant[]) => {
  const ul = document.getElementsByClassName("restaurant-list")[0];
  resetPrevRestaurantList(ul);
  const totalText = filterData.reduce(
    (acc: string, cur: Irestaurant) => acc + Restaurant(cur),
    "",
  );
  const formattedTotalText = convertHTMLStringToDOM(totalText);
  ul.appendChild(formattedTotalText);
};

function RestaurantList() {
  const filterData = RestaurantListStorageService.getfilteredData();
  render(filterData);
}
export default RestaurantList;

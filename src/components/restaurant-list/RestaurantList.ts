import restaurantListStateStore from "../../store/RestaurantListStateStore";
import { Irestaurant } from "../../types/restaurant";
import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";
import { clickRestaurantModal } from "../detail-modal/handlers";
import likeChange from "../restaurant/like/handlers";
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
  const filterData = restaurantListStateStore.getfilteredData();
  render(filterData);

  likeChange();
  clickRestaurantModal();
}
export default RestaurantList;

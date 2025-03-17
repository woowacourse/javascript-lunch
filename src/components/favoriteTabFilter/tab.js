import { createElement } from "../../utils/createElement";
import RestaurantList from "../restaurantList";

const Tab = ({ text, id, active = false, changeState }) => {
  const tab = createElement(/*html*/ `
    <div class="favorite-filter-tab ${
      active ? "active" : ""
    }" id=${id}>${text}</div>
  `);

  tab.addEventListener("click", (e) => {
    e.target.previousSibling?.classList.remove("active");
    e.target.nextSibling?.classList.remove("active");
    e.target.classList.add("active");

    RestaurantList(changeState());
  });

  return tab;
};
export default Tab;

import { FAVORITE } from "../constants";
import { $, $$ } from "../utils/Dom";

const Tab = () => {
  const tabMenu = $$(".tab-menu");
  const tabItems = $$(".tab-item");
  const tabFilter = $(".tab-filter");

  tabMenu.forEach((tab, idx) => {
    tab.addEventListener("click", function (event) {
      tabItems.forEach((item) => {
        item.classList.remove("active");
      });

      tabMenu.forEach((menu) => {
        menu.classList.remove("active");
      });

      event.target.textContent === FAVORITE
        ? tabFilter.classList.add("active")
        : tabFilter.classList.remove("active");

      tabMenu[idx].classList.add("active");
      tabItems[idx].classList.add("active");
    });
  });
};

export default Tab;

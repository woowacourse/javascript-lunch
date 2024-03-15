import filterState from "../../store/FilterStateStore";
import RestaurantList from "../restaurant-list/RestaurantList";

const removeCurrentClassName = () => {
  const allTab = document.getElementsByClassName("tab-item");
  const tabsArray = Array.from(allTab);
  tabsArray.forEach((element) => {
    element.classList.remove("current");
  });
};

const addCurrentClassName = (target: HTMLElement) => {
  const clickedTab = target.closest(".tab-item") as HTMLElement;
  clickedTab.classList.add("current");
  return clickedTab;
};

const changeFavFilter = (clickedTab: HTMLElement) => {
  if (clickedTab.getAttribute("data-tab") === "fav")
    return filterState.setFavType(true);
  return filterState.setFavType(false);
};

const tabClicked = (tabs: HTMLElement) => {
  tabs.addEventListener("click", (event) => {
    removeCurrentClassName();
    if (event.target instanceof HTMLElement) {
      const clickedTab = addCurrentClassName(event.target);
      changeFavFilter(clickedTab);
      RestaurantList();
    }
  });
};

const clickTabHandler = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelector(".tabs") as HTMLElement;

    tabClicked(tabs);
  });
};
export default clickTabHandler;

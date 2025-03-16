import TabWrapper from "../components/TabWrapper.js";
import TAB_DATA from "../constants/tabData.js";

export function createTabView() {
  const tabContainerElement = TabWrapper(TAB_DATA);

  const allRestaurantTab = tabContainerElement.querySelector("#all-restaurant");
  allRestaurantTab.classList.add("active"); // 초기상태

  return tabContainerElement;
}

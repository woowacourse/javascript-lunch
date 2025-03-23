import RestaurantTabs from "../components/RestaurantTabs.js";

export function initializeTabs() {
  const $tabsContainer = document.querySelector(".restaurant-tabs-container");
  if ($tabsContainer) {
    const tabsComponent = RestaurantTabs();
    tabsComponent.render($tabsContainer);
  } else {
    console.error("탭 컨테이너를 찾을 수 없습니다.");
  }
}

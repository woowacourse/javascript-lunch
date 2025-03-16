import { applyFilter } from "./filterHandler.ts";
import { setupRestaurantItemEventListeners } from "./detailModalHandler.ts";
import { TabButton } from "../../types/DomTypes.ts";

interface TabState {
  activeTab : string;
}

export const tabState : TabState= {
  activeTab: "all",
};

export function handleTabChange(e : MouseEvent) : void{
  const selectedTab = e.target.dataset.tab;

  if (!selectedTab || selectedTab === tabState.activeTab) return;

  const preActiveTab = document.querySelector(".tab-button--active");
  if (preActiveTab) {
    preActiveTab.classList.remove("tab-button--active");
  }
  e.target.classList.add("tab-button--active");
  tabState.activeTab = selectedTab;
  // eslint-disable-next-line no-use-before-define
  toggleSortingVisibility(selectedTab);

  applyFilter();
  setTimeout(() => {
    setupRestaurantItemEventListeners();
  }, 10);
}

function toggleSortingVisibility(activeTab:string): void {
  const sortingDropdown = document.querySelectorAll(".filter-dropdown");

  sortingDropdown.forEach((dropdown) => {
    if (activeTab === "all") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }
  });

  applyFilter();
}

export function setupTabEventListeners() : void {
  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => {
    button.removeEventListener("click", handleTabChange);
    button.addEventListener("click", handleTabChange);
  });
  // 로드됐을때도 잘 토글이 보여야 하기때문에
  toggleSortingVisibility(tabState.activeTab);
  setupRestaurantItemEventListeners();
}

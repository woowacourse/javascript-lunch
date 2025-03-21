import { createTabView } from "../view/createTabView.js";

interface TabControllerType {
  mainElement: HTMLElement;
  updateCategorySortListView: () => void;
  updateFavoriteListView: () => void;
}

class TabController {
  mainElement;
  updateCategorySortListView;
  updateFavoriteListView;
  tabContainerElement;

  constructor({ mainElement, updateCategorySortListView, updateFavoriteListView }: TabControllerType) {
    this.mainElement = mainElement;
    this.updateCategorySortListView = updateCategorySortListView;
    this.updateFavoriteListView = updateFavoriteListView;

    this.tabContainerElement = createTabView();

    this.registerEvents();
  }

  getTabContainerElement() {
    return this.tabContainerElement;
  }

  render(container: HTMLElement) {
    container.prepend(this.tabContainerElement);
  }

  registerEvents() {
    this.tabContainerElement.addEventListener("click", this.handleTabClick.bind(this));
  }

  handleTabClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedTab = target.closest(".restaurant-tab") as HTMLElement;
    if (clickedTab.classList.contains("active")) return;

    this.tabContainerElement.querySelectorAll(".restaurant-tab").forEach((tab) => tab.classList.remove("active"));
    clickedTab.classList.add("active");

    const tabId = clickedTab.id;
    const targetContainer = this.mainElement.querySelector(`.${tabId}-list-container`) as HTMLElement;

    this.mainElement.querySelectorAll(".list-container").forEach((container) => container.classList.remove("active"));
    targetContainer.classList.add("active");

    if (tabId === "all-restaurant") this.updateCategorySortListView();
    if (tabId === "favorite-restaurant") this.updateFavoriteListView();
  }
}

export default TabController;

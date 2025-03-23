import { applyFilter } from "../handlers/filterHandler.js";
import { setupRestaurantItemEventListeners } from "./DetailModal.js";

export class RestaurantHeaderTabs {
  constructor(activeTab = "all") {
    this.activeTab = activeTab;
    this.tabsElement = null;
    this.tabChangeListeners = [];
  }

  generateHTML() {
    return `
      <div class="restaurant-tabs">
        <button 
          class="tab-button ${this.activeTab === "all" ? "tab-button--active" : ""}" 
          data-tab="all">
          모든 음식점
        </button>
        <button 
          class="tab-button ${this.activeTab === "favorites" ? "tab-button--active" : ""}" 
          data-tab="favorites">
          자주 가는 음식점
        </button>
      </div>
    `;
  }

  render(container) {
    container.insertAdjacentHTML("beforeend", this.generateHTML());
    this.tabsElement = container.querySelector(".restaurant-tabs");
    this.attachEventListeners();
    this.toggleSortingVisibility(this.activeTab);
    setupRestaurantItemEventListeners();
    return this.tabsElement;
  }

  toggleSortingVisibility(activeTab) {
    const sortingDropdowns = document.querySelectorAll(".filter-dropdown");

    sortingDropdowns.forEach((dropdown) => {
      dropdown.style.display = activeTab === "all" ? "block" : "none";
    });
  }

  attachEventListeners() {
    if (!this.tabsElement) return;

    const tabButtons = this.tabsElement.querySelectorAll(".tab-button");
    tabButtons.forEach((button) => {
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);

      newButton.addEventListener("click", this.handleTabClick.bind(this));
    });
  }

  handleTabClick(e) {
    const selectedTab = e.target.dataset.tab;
    if (!selectedTab || selectedTab === this.activeTab) return;

    const prevActiveTab = this.tabsElement.querySelector(".tab-button--active");
    if (prevActiveTab) {
      prevActiveTab.classList.remove("tab-button--active");
    }

    e.target.classList.add("tab-button--active");

    this.activeTab = selectedTab;
    this.toggleSortingVisibility(selectedTab);

    applyFilter();
    this.notifyTabChangeListeners(selectedTab);

    setTimeout(() => {
      setupRestaurantItemEventListeners();
    }, 10);
  }

  onTabChange(listener) {
    this.tabChangeListeners.push(listener);

    return () => {
      this.tabChangeListeners = this.tabChangeListeners.filter(
        (l) => l !== listener,
      );
    };
  }

  notifyTabChangeListeners(tab) {
    this.tabChangeListeners.forEach((listener) => listener(tab));
  }

  getActiveTab() {
    return this.activeTab;
  }
}

export default function RestaurantTabs(activeTab = "all") {
  const tabs = new RestaurantHeaderTabs(activeTab);

  return {
    render: (container) => tabs.render(container),
    instance: tabs,
  };
}

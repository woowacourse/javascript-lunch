import { applyFilter } from "../handlers/filterHandler.js";
import { setupRestaurantItemEventListeners } from "../handlers/detailModalHandler.js";

export class RestaurantHeaderTabs {
  constructor(container, activeTab = "all") {
    this.container = container;
    this.activeTab = activeTab;
    this.tabsElement = null;
    this.tabChangeListeners = [];
    this.setupInitialState();
  }

  setupInitialState() {
    this.toggleSortingVisibility(this.activeTab);
    setupRestaurantItemEventListeners();
  }

  toggleSortingVisibility(activeTab) {
    const sortingDropdowns = document.querySelectorAll(".filter-dropdown");

    sortingDropdowns.forEach((dropdown) => {
      dropdown.style.display = activeTab === "all" ? "block" : "none";
    });
  }

  render() {
    const tabsHTML = `
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

    this.container.innerHTML += tabsHTML;
    this.tabsElement = this.container.querySelector(".restaurant-tabs");

    this.attachEventListeners();
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

    // 탭 변경 후 이벤트 리스너 재설정
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

export default function RestaurantTabs(container, activeTab = "all") {
  const tabs = new RestaurantHeaderTabs(container, activeTab);
  tabs.render();
  return tabs;
}

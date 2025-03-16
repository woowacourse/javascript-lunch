function TabEventHandler(tabContainerElement, mainElement, tabActionsUpdateListView) {
  tabContainerElement.addEventListener("click", (event) => {
    const clickedTab = event.target.closest(".restaurant-tab");
    if (clickedTab.classList.contains("active")) return;

    tabContainerElement.querySelectorAll(".restaurant-tab").forEach((tab) => tab.classList.remove("active"));
    clickedTab.classList.add("active");

    const tabId = clickedTab.id;
    const targetContainer = mainElement.querySelector(`.${tabId}-list-container`);

    mainElement.querySelectorAll(".list-container").forEach((container) => container.classList.remove("active"));
    targetContainer.classList.add("active");

    if (tabActionsUpdateListView[tabId]) {
      tabActionsUpdateListView[tabId]();
    }
  });
}

export default TabEventHandler;

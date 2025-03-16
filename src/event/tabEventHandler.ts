interface tabActionsUpdateListViewType {
  [key: string]: () => void;
}

function TabEventHandler(
  tabContainerElement: HTMLElement,
  mainElement: HTMLElement,
  tabActionsUpdateListView: tabActionsUpdateListViewType,
) {
  tabContainerElement.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const clickedTab = target.closest(".restaurant-tab") as HTMLElement;
    if (clickedTab.classList.contains("active")) return;

    tabContainerElement.querySelectorAll(".restaurant-tab").forEach((tab) => tab.classList.remove("active"));
    clickedTab.classList.add("active");

    const tabId = clickedTab.id;
    const targetContainer = mainElement.querySelector(`.${tabId}-list-container`) as HTMLElement;

    mainElement.querySelectorAll(".list-container").forEach((container) => container.classList.remove("active"));
    targetContainer.classList.add("active");

    if (tabActionsUpdateListView[tabId]) {
      tabActionsUpdateListView[tabId]();
    }
  });
}

export default TabEventHandler;

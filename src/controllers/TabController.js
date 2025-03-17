import Tab from "../components/Tab.js";
import EventHandler from "./EventHandler.js";
import ListController from "./ListController.js";
import SelectSortController from "./SelectSortController.js";

const TAB_ITEMS = [
  {
    title: "모든 음식점",
    isEnable: true,
    type: "all",
  },
  {
    title: "자주 가는 음식점",
    isEnable: false,
    type: "favorite",
  },
];

function TabController(app) {
  const tabContainerElement = document.createElement("div");
  tabContainerElement.classList.add("tab-container");

  TAB_ITEMS.forEach((item) => {
    tabContainerElement.appendChild(Tab({ title: item.title, isEnable: item.isEnable, type: item.type }));
  });

  tabContainerElement.addEventListener("click", (event) => {
    const app = document.getElementById("app");
    const selectContainerElement = document.querySelector(".select-sort-container");
    if (selectContainerElement) {
      selectContainerElement.remove();
    }
    const listContainerElement = document.querySelector(".restaurant-list-container");
    EventHandler.tabToggle(event, "tab", "enable");
    const enabledTab = document.querySelector(".tab.enabled");
    if (enabledTab.dataset.type === "favorite") {
    } else {
      SelectSortController(app, listContainerElement);
    }
    ListController(app, listContainerElement, enabledTab.dataset.type);
  });

  app.appendChild(tabContainerElement);
  const listType = document.querySelector(".tab.enabled").dataset.type;

  return { type: listType };
}

export default TabController;

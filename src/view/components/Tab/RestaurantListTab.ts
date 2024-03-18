import generateTab, { TAB_ID_PREFIX } from "./generateTab";

import RestaurantDetailModal from "../Modal/RestaurantDetailModal";
import createElementByTag from "../../utils/createElementByTag";
import { getRestaurant } from "../../../domain/AllRestaurantList";

class RestaurantListTab {
  tabElement;

  constructor() {
    this.tabElement = generateTab({
      tabMenu: this.#generateTabMenu(),
      contentsArea: document.getElementById("restaurants-container")!,
    });
    this.#styledCurrentTab();
  }

  #generateTabMenu() {
    return {
      "모든 음식점": this.#sectionsForAllList(),
      "자주 가는 음식점": this.#sectionsForFavoriteList(),
    };
  }

  #sectionsForAllList() {
    const filterContainer = createElementByTag({
      tag: "section",
      classes: ["restaurant-filter-container"],
      attribute: { id: "filter-container" },
    });

    const restaurantListContainer = createElementByTag({
      tag: "section",
      classes: ["restaurant-list-container"],
      attribute: { id: "restaurant-all-list-container" },
    });

    restaurantListContainer.addEventListener("click", onClickHandle);

    return [filterContainer, restaurantListContainer];
  }

  #sectionsForFavoriteList() {
    const restaurantListContainer = createElementByTag({
      tag: "section",
      classes: ["restaurant-list-container"],
      attribute: { id: "restaurant-favorite-list-container" },
    });

    restaurantListContainer.addEventListener("click", onClickHandle);
    return [restaurantListContainer];
  }

  #styledCurrentTab() {
    const currentTab = this.tabElement.getAttribute("value")!;
    const tabButton = this.tabElement.firstChild as HTMLButtonElement;
    this.#handleCurrentTabClassName(currentTab, tabButton);

    this.tabElement.addEventListener("click", (e) => {
      if (
        !(
          e.currentTarget instanceof HTMLElement &&
          e.target instanceof HTMLElement
        )
      ) {
        throw new Error(
          "[ERROR_IN_styledCurrentTab] Invalid e.currentTarget Or e.target"
        );
      }

      const currentTab = e.currentTarget.getAttribute("value")!;
      e.currentTarget.childNodes.forEach((tabButton) => {
        this.#handleCurrentTabClassName(
          currentTab,
          tabButton as HTMLButtonElement
        );
      });
    });
  }

  #handleCurrentTabClassName(currentTab: string, tabButton: HTMLButtonElement) {
    if (currentTab === tabButton.id.slice(TAB_ID_PREFIX.length)) {
      tabButton.classList.add("currentTab");
      return;
    }
    tabButton.classList.remove("currentTab");
  }
}

const onClickHandle = (e: MouseEvent) => {
  if (
    e.target instanceof HTMLElement &&
    !(e.target.parentElement instanceof HTMLButtonElement)
  ) {
    const restaurantName = e.target.closest("li")?.getAttribute("name");
    if (!restaurantName) {
      throw new Error("[ERROR_IN_RestaurantListTab_onClickHandle]");
    }
    const detail = getRestaurant(restaurantName);
    const detailModal = new RestaurantDetailModal(detail!);
    document
      .getElementById("restaurant-detail-modal-container")
      ?.replaceChildren(detailModal.element);
    detailModal.toggle();
  }
};

export default RestaurantListTab;

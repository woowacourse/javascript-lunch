import RestaurantDetailModal from "../Modal/RestaurantDetailModal";
import createElementByTag from "../../utils/createElementByTag";
import generateTab from "./generateTab";
import { getRestaurant } from "../../../domain/AllRestaurantList";

class RestaurantListTab {
  tabElement;
  currentTab;

  constructor() {
    this.tabElement = generateTab({
      tabMenu: this.#generateTabMenu(),
      contentsArea: document.getElementById("restaurants-container")!,
    });
    this.currentTab = this.tabElement.firstChild as HTMLButtonElement;
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
    this.currentTab.classList.add("currentTab");

    this.tabElement.addEventListener("click", (e) => {
      if (
        !(
          e.currentTarget instanceof HTMLElement &&
          e.target instanceof HTMLElement
        )
      ) {
        return;
      }
      this.currentTab.classList.remove("currentTab");
      e.target.classList.add("currentTab");
      this.currentTab = e.target as HTMLButtonElement;
    });
  }
}

const onClickHandle = (e: MouseEvent) => {
  if (
    !(e.target instanceof HTMLElement) ||
    e.target.parentElement instanceof HTMLButtonElement
  ) {
    return;
  }

  const restaurantName = e.target.closest("li")?.getAttribute("name");
  if (!restaurantName) {
    throw new Error(
      "[ERROR_IN_RestaurantListTab_onClickHandle()] Can't find valid restaurantName"
    );
  }
  const detail = getRestaurant(restaurantName);
  const detailModal = new RestaurantDetailModal(detail!);

  document
    .getElementById("restaurant-detail-modal-container")
    ?.replaceChildren(detailModal.element);
  detailModal.toggle();
};

export default RestaurantListTab;

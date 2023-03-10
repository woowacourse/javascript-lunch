import RestaurantCardList from "./RestaurantCardList";
import "./TabMenu.style.css";

class TabMenu extends HTMLUListElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.bindEvent();
  }

  render() {
    this.innerHTML = `
      <li>
        <button type="button" class="restaurant-all-menu text-subtitle active-tab-menu" value="all">모든 음식점</button>
      </li>
      <li>
        <button type="button" class="restaurant-favorite-menu text-subtitle" value="favorite">자주 가는 음식점</button>
      </li>
    `;
  }

  bindEvent() {
    this.querySelectorAll("li button").forEach((node) => {
      node.addEventListener("click", this.onClick.bind(this));
    });
  }

  onClick(event: Event) {
    if (!(event.currentTarget instanceof HTMLButtonElement)) return;
    if (event.currentTarget.classList.contains("active-tab-menu")) return;

    this.querySelectorAll("li button").forEach((node) => {
      node.classList.remove("active-tab-menu");
    });

    event.currentTarget.classList.add("active-tab-menu");

    const { value } = event.currentTarget;

    this.toggleFilterContainer(value);
    this.setRestaurantListViewData(value);
  }

  toggleFilterContainer(tabMenu: string) {
    const $restaurantFilterContainer = document.querySelector(
      ".restaurant-filter-container"
    );

    if (tabMenu === "all") {
      $restaurantFilterContainer?.classList.remove("hide");
      return;
    }

    $restaurantFilterContainer?.classList.add("hide");
  }

  setRestaurantListViewData(tabMenu: string) {
    const $restaurantList =
      document.querySelector<RestaurantCardList>(".restaurant-list");

    if (!$restaurantList?.dataset.view) return;

    $restaurantList.dataset.view = tabMenu;
  }
}

export default TabMenu;

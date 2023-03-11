import { $ } from "../../util/dom";
import "./index.css";

class Tab {
  $target;

  constructor($target) {
    this.$target = $target;
    this.render();
  }

  template() {
    return `
        <input type="radio" name="tab" id="all" value="all" checked />  
        <label for="all" class='tab-item all-tab'>
          모든 음식점
        </label>
        
        <input type="radio" name="tab" id="favorite" value="favorite" />
        <label for="favorite" class='tab-item favorite-tab'>
          자주 가는 음식점
        </label>
        `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());
  }

  onChangeAllTab(restaurantList) {
    const $filter = $(".restaurant-filter-container");
    $filter.classList.add("filter--visible");

    const selectedCategory = $filter.querySelector("#category-filter").value;
    const selectedSortingWay = $filter.querySelector("#category-filter").value;
    restaurantList.renderFilteredList(selectedCategory, selectedSortingWay);
  }

  onChangeFavoriteTab(restaurantList) {
    const $filter = $(".restaurant-filter-container");
    $filter.classList.remove("filter--visible");

    restaurantList.renderFavoriteList();
  }

  setOnChangeTabEvent(restaurantList) {
    this.$target.addEventListener("change", (event) => {
      const selectedTab = event.target.value;

      if (selectedTab === "all") this.onChangeAllTab(restaurantList);
      if (selectedTab === "favorite") this.onChangeFavoriteTab(restaurantList);
    });
  }

  setEvent(restaurantList) {
    this.setOnChangeTabEvent(restaurantList);
  }
}

export default Tab;

import Component from "../../core/Component";
import { categories } from "../../types/restaurant.types";
import { extractNumberFromDistance } from "../../utils/extractNumber";
import { Select } from "../common";
import LunchList from "./LunchList";

export default class AllLunchList extends Component {
  setDefaultProps() {
    this.props = {
      items: [],
      onItemClick: () => {},
    };
  }

  initState() {
    this.state = {
      category: "전체",
      sortBy: "이름순",
    };
  }

  filterByCategory(items) {
    if (this.state.category === "전체") return items;
    return items.filter((item) => item.category === this.state.category);
  }

  sortByName(items) {
    return items.sort((a, b) => a.storeName.localeCompare(b.storeName));
  }

  sortByDistance(items) {
    return items.sort((a, b) => {
      return (
        extractNumberFromDistance(a.distance) -
        extractNumberFromDistance(b.distance)
      );
    });
  }

  filterItems() {
    const filteredByCategory = this.filterByCategory(this.props.items);

    if (this.state.sortBy === "이름순") {
      return this.sortByName(filteredByCategory);
    }

    if (this.state.sortBy === "거리순") {
      return this.sortByDistance(filteredByCategory);
    }

    return filteredByCategory;
  }

  renderCategoryFilter() {
    const categoryFilterSelect = this.addChild(Select, {
      placeholder: "전체",
      options: ["전체", ...categories],
      onChange: (value) => this.setState({ category: value }),
      selectClassList: ["w-125"],
      dropDownClassList: ["w-125"],
      id: "category-filter-select",
    });

    return categoryFilterSelect.template();
  }

  renderNameDistanceFilter() {
    const nameDistanceFilterSelect = this.addChild(Select, {
      placeholder: "이름순",
      options: ["이름순", "거리순"],
      onChange: (value) => this.setState({ sortBy: value }),
      selectClassList: ["w-125"],
      dropDownClassList: ["w-125"],
      id: "name-distance-filter-select",
    });

    return nameDistanceFilterSelect.template();
  }

  renderLunchList() {
    const allLunchList = this.addChild(LunchList, {
      type: "ALL",
      items: this.filterItems(),
      onItemClick: this.props.onItemClick,
    });

    return allLunchList.template();
  }

  template() {
    return `
      <div id="all-lunch-list" class="w-full px-16 box-border">
        <div id="filter" class="w-full flex flex-row justify-between my-16">
          ${this.renderCategoryFilter()}
          ${this.renderNameDistanceFilter()}
        </div>
        ${this.renderLunchList()}
      </div>
    `;
  }

  updateFilterAndList(container) {
    const filterContainer = container.querySelector("#filter");
    const existingList = container.querySelector(".lunch-list-container");
    const listContent = this.renderLunchList();

    if (!filterContainer)
      return filterContainer.insertAdjacentHTML("afterend", listContent);

    filterContainer.innerHTML = `
        ${this.renderCategoryFilter()}
        ${this.renderNameDistanceFilter()}
      `;

    if (existingList) return (existingList.outerHTML = listContent);
  }

  render(props, targetElement = "#all-lunch-list") {
    if (props) this.setProps(props);
    const container = document.querySelector(targetElement);

    if (container.id === "all-lunch-list") {
      this.updateFilterAndList(container);
    }
  }
}

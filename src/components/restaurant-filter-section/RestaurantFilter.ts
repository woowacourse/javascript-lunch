import { FilterOptions } from "../../../types";
import {
  EVENT_TYPES,
  NAV_BAR_KEYS,
  SORT_OPTIONS,
  CATEGORY,
} from "../../constants";
import "./restaurantFilter.css";

type FilterChangeCallback = (filterType: FilterOptions["filterType"]) => void;

interface RestaurantFilterProps {
  onFilterChange: FilterChangeCallback;
}

export default class RestaurantFilter {
  private onFilterChange: FilterChangeCallback;
  private currentFilterType: FilterOptions["filterType"];
  private $filterContainer!: HTMLElement;

  constructor({ onFilterChange }: RestaurantFilterProps) {
    this.onFilterChange = onFilterChange;

    this.currentFilterType = {
      categoryFilterType: CATEGORY[0],
      sortFilterType: "name",
    };
  }

  render() {
    this.$filterContainer = document.createElement("section");
    this.$filterContainer.className = "restaurant-filter-container";

    this.#renderFilterCategory();
    this.#renderFilterSort();

    return this.$filterContainer;
  }

  #renderFilterCategory() {
    const $filterCategory = document.createElement("select");
    $filterCategory.className = "restaurant-filter";
    $filterCategory.id = "category-filter";
    $filterCategory.setAttribute("name", "category-filter");

    this.$filterContainer.append($filterCategory);

    CATEGORY.forEach((optionType) => {
      const $option = document.createElement("option");

      $option.value = optionType;
      $option.textContent = optionType;

      $filterCategory.append($option);
    });

    $filterCategory.addEventListener(EVENT_TYPES.change, (e: Event) => {
      if (!e.target || !(e.target instanceof HTMLSelectElement)) return;
      const categoryFilterType = e.target
        .value as FilterOptions["filterType"]["categoryFilterType"];

      this.currentFilterType = {
        ...this.currentFilterType,
        categoryFilterType,
      };

      this.onFilterChange(this.currentFilterType);
    });
  }

  #renderFilterSort() {
    const $filterSort = document.createElement("select");
    $filterSort.className = "restaurant-filter";
    $filterSort.id = "sort-filter";
    $filterSort.setAttribute("name", "sort-filter");

    this.$filterContainer.append($filterSort);

    (Object.keys(SORT_OPTIONS) as Array<keyof typeof SORT_OPTIONS>).forEach(
      (optionType) => {
        const $option = document.createElement("option");

        $option.value = optionType;
        $option.textContent = SORT_OPTIONS[optionType];

        $filterSort.append($option);
      }
    );

    $filterSort.addEventListener(EVENT_TYPES.change, (e: Event) => {
      if (!e.target || !(e.target instanceof HTMLSelectElement)) return;
      const sortFilterType = e.target
        .value as FilterOptions["filterType"]["sortFilterType"];

      this.currentFilterType = {
        ...this.currentFilterType,
        sortFilterType,
      };

      this.onFilterChange(this.currentFilterType);
    });
  }

  toggleFilterVisibility({ tabType }: { tabType: FilterOptions["tabType"] }) {
    if (tabType === NAV_BAR_KEYS.favorite) {
      this.$filterContainer.classList.add("restaurant-filter--open");
    } else {
      this.$filterContainer.classList.remove("restaurant-filter--open");
    }
  }
}

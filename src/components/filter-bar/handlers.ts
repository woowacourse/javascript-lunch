import filterState from "../../store/FilterStateStore";
import { Icategory } from "../../types/category";
import { IsortType } from "../../types/sort";
import RestaurantList from "../restaurant-list/RestaurantList";

const changeFilterHandler = (categoryFilter: HTMLElement) => {
  categoryFilter.addEventListener("change", (event) => {
    if (event.target instanceof HTMLSelectElement) {
      const selectedValue = event.target.value as Icategory;
      filterState.setFilterType(selectedValue);

      RestaurantList();
    }
  });
};

export const categoryFilterHandler = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const categoryFilter: HTMLElement = document.getElementById(
      "category-filter",
    ) as HTMLElement;

    changeFilterHandler(categoryFilter);
  });
};

const changeSortingHandler = (sortFilter: HTMLElement) => {
  sortFilter.addEventListener("change", (event) => {
    if (event.target instanceof HTMLSelectElement) {
      const selectedValue = event.target.value as IsortType;
      filterState.setSortType(selectedValue);

      RestaurantList();
    }
  });
};

export const sortHandler = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const sortFilter = document.getElementById("sorting-filter") as HTMLElement;
    changeSortingHandler(sortFilter);
  });
};

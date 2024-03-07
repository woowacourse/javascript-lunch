import { filterBarTemplate, sortBarTemplate } from "./template";
import { Icategory, IsortType } from "../../types";

import RestaurantListStorageService from "../../services/restaurantListStorageService";
import restaurantListHelper from "../../domain/RestaurantListHelper";
import RestaurantList from "../restaurant_list/RestaurantList";
import filterState from "../../store/FilterStateStore";

function FilterBar() {
  const render = () => {
    const mainContainer = document.getElementById("mainContainer");
    const main = document.createElement("main");
    main.setAttribute("class", "main");
    const section = document.createElement("section");
    section.setAttribute("class", "restaurant-filter-container");
    section.innerHTML += filterBarTemplate;
    section.innerHTML += sortBarTemplate;
    main.appendChild(section);

    if (mainContainer) {
      mainContainer.appendChild(main);
    }

    filterCategoryHandler();
    sortListHandler();
  };

  const filterCategoryHandler = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const categoryFilter = document.getElementById("category-filter");
      if (categoryFilter) {
        categoryFilter.addEventListener("change", (event) => {
          if (event.target instanceof HTMLSelectElement) {
            const selectedValue = event.target.value as Icategory;
            filterState.setFilterType(selectedValue);

            const filterData = RestaurantListStorageService.getfilteredData();

            console.log(filterData);
            RestaurantList(filterData).render();
          }
        });
      }
    });
  };

  const sortListHandler = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const sortFilter = document.getElementById("sorting-filter");
      if (sortFilter) {
        sortFilter.addEventListener("change", (event) => {
          if (event.target instanceof HTMLSelectElement) {
            const selectedValue = event.target.value as IsortType;
            filterState.setSortType(selectedValue);

            const filterData = RestaurantListStorageService.getfilteredData();

            console.log(filterData);
            RestaurantList(filterData).render();
          }
        });
      }
    });
  };

  return {
    render,
  };
}

export default FilterBar;

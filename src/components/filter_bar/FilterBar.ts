import {
  baseSectionTemplate,
  filterSelectTemplate,
  sortSelectTemplate,
} from "./template";
import { Icategory, IsortType } from "../../types";

import RestaurantList from "../restaurant_list/RestaurantList";
import filterState from "../../store/FilterStateStore";
import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

function FilterBar() {
  const render = () => {
    generateBaseComponents();
    generateFilterBarComponents();

    filterCategoryHandler();
    sortListHandler();
  };

  const generateBaseComponents = () => {
    const mainContainer = document.getElementById("mainContainer");
    const formattedBaseSectionTemplate =
      convertHTMLStringToDOM(baseSectionTemplate);

    if (mainContainer) {
      mainContainer.appendChild(formattedBaseSectionTemplate);
    }
  };

  const generateFilterBarComponents = () => {
    const barContainer = document.getElementsByClassName(
      "restaurant-filter-container",
    )[0];

    barContainer.appendChild(convertHTMLStringToDOM(filterSelectTemplate));
    barContainer.appendChild(convertHTMLStringToDOM(sortSelectTemplate));
  };

  const filterCategoryHandler = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const categoryFilter = document.getElementById("category-filter");
      if (categoryFilter) {
        categoryFilter.addEventListener("change", (event) => {
          if (event.target instanceof HTMLSelectElement) {
            const selectedValue = event.target.value as Icategory;
            filterState.setFilterType(selectedValue);

            RestaurantList().reRender();
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

            RestaurantList().reRender();
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

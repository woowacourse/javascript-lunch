import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

import {
  baseSectionTemplate,
  filterSelectTemplate,
  sortSelectTemplate,
} from "./filterBarTemplate";
import { changeFilter, changeSorting } from "./handlers";

export const generateBaseComponents = () => {
  const formattedBaseSectionTemplate =
    convertHTMLStringToDOM(baseSectionTemplate);

  document.body.appendChild(formattedBaseSectionTemplate);
};

export const generateFilterBarComponents = () => {
  const barContainer = document.getElementsByClassName(
    "restaurant-filter-container",
  )[0];

  barContainer.appendChild(convertHTMLStringToDOM(filterSelectTemplate));
  barContainer.appendChild(convertHTMLStringToDOM(sortSelectTemplate));
};

const FilterBar = () => {
  generateBaseComponents();
  generateFilterBarComponents();

  changeFilter();
  changeSorting();
};
export default FilterBar;

import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

import { changeFilter, changeSorting } from "./handlers";
import {
  baseSectionTemplate,
  filterSelectTemplate,
  sortSelectTemplate,
} from "./template";

const generateBaseComponents = () => {
  const formattedBaseSectionTemplate =
    convertHTMLStringToDOM(baseSectionTemplate);

  document.body.appendChild(formattedBaseSectionTemplate);
};

const generateFilterBarComponents = () => {
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

import {
  baseSectionTemplate,
  filterSelectTemplate,
  sortSelectTemplate,
} from "./template";
import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";
import { changeFilter, changeSorting } from "./handlers";

function FilterBar() {
  const render = () => {
    generateBaseComponents();
    generateFilterBarComponents();

    changeFilter();
    changeSorting();
  };

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

  render();
}

export default FilterBar;

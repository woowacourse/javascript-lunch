import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import { categoryChange } from "./handlers";
import selectCategoryTemplate from "./template";

function SelectCategory(form: Element) {
  const render = () => {
    form.appendChild(convertHTMLStringToDOM(selectCategoryTemplate));

    categoryChange();
  };

  render();
}

export default SelectCategory;

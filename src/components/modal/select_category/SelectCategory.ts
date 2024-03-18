import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import categoryEventHandler from "./handlers";
import selectCategoryTemplate from "./selectCategoryTemplate";

function SelectCategory(form: Element) {
  form.appendChild(convertHTMLStringToDOM(selectCategoryTemplate));

  categoryEventHandler();
}

export default SelectCategory;

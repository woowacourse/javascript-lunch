import { selectCategoryTemplate } from "./template";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";
import { categoryChange } from "./handlers";

function SelectCategory(form: Element) {
  const render = () => {
    form.appendChild(convertHTMLStringToDOM(selectCategoryTemplate));

    categoryChange();
  };

  render();
}

export default SelectCategory;

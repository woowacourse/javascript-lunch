import { selectCategoryTemplate } from "./template";
import { Icategory } from "../../../types";
import restaurantStateStore from "../../../store/RestaurantStateStore";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";
import removeHTMLElementByClassName from "../../../utils/removeHTMLElementByClassName";

function SelectCategory() {
  const render = (form: Element) => {
    form.appendChild(convertHTMLStringToDOM(selectCategoryTemplate));

    categoryChange();
  };

  const categoryChange = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const select = document.getElementById("category");

      if (select) {
        select.addEventListener("change", (event) => {
          if (event.target instanceof HTMLSelectElement) {
            const selectedValue = event.target.value;
            removeHTMLElementByClassName("invalid_category");
            restaurantStateStore.setCategory(selectedValue as Icategory);
          }
        });
      }
    });
  };

  return {
    render,
  };
}

export default SelectCategory;

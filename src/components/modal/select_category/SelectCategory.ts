import { template } from "./template";
import { Icategory } from "../../../types";
import restaurantStateStore from "../../../store/RestaurantStateStore";

function SelectCategory() {
  const render = (form: Element) => {
    form.innerHTML += template;

    categoryChange();
  };

  const categoryChange = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const select = document.getElementById("category");

      if (select) {
        select.addEventListener("change", (event) => {
          if (event.target instanceof HTMLSelectElement) {
            const selectedValue = event.target.value as Icategory;
            restaurantStateStore.setCategory(selectedValue);
            return selectedValue;
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

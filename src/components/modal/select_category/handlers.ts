import restaurantStateStore from "../../../store/RestaurantStateStore";
import { Icategory } from "../../../types/category";
import removeHTMLElementByClassName from "../../../utils/removeErrorMessageByClassName";

export const selectEventHandler = (select: HTMLElement) => {
  select.addEventListener("change", (event) => {
    if (event.target instanceof HTMLSelectElement) {
      const selectedValue = event.target.value;
      removeHTMLElementByClassName("invalid_category");
      restaurantStateStore.setCategory(selectedValue as Icategory);
    }
  });
};

export const categoryChange = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("category") as HTMLElement;

    selectEventHandler(select);
  });
};

import restaurantStateStore from "../../../store/RestaurantStateStore";
import { Icategory } from "../../../types/category";
import removeHTMLElementByClassName from "../../../utils/removeErrorMessageByClassName";

const changeCategoryHandler = (select: HTMLElement) => {
  select.addEventListener("change", (event) => {
    if (event.target instanceof HTMLSelectElement) {
      const selectedValue = event.target.value;
      removeHTMLElementByClassName("invalid_category");
      restaurantStateStore.setCategory(selectedValue as Icategory);
    }
  });
};

const categoryEventHandler = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("category") as HTMLElement;

    changeCategoryHandler(select);
  });
};
export default categoryEventHandler;

import restaurantStateStore from "../../../store/RestaurantStateStore";
import { Icategory } from "../../../types/category";
import removeErrorMessageById from "../../../utils/removeErrorMessageById";

const changeCategoryHandler = (select: HTMLElement) => {
  select.addEventListener("change", (event) => {
    if (event.target instanceof HTMLSelectElement) {
      const selectedValue = event.target.value;
      removeErrorMessageById("invalid_category");
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

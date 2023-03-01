import { $ } from "../utils/domSelectors";
import { Restaurant, Category, Distance } from "../domains/types";

class ModalView {
  private restaurantAddForm = $("#restaurant-add-form") as HTMLFormElement;
  private modal = $(".modal");

  addSubmitEventHandler(onSubmitRestaurantAddForm: CallableFunction) {
    this.restaurantAddForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData: FormData = new FormData(this.restaurantAddForm);
      const restaurantItem: Restaurant = Object.fromEntries(
        [...formData].map(([key, value]) => [
          key,
          key === "distance" ? Number(value) : value,
        ])
      ) as Restaurant;

      this.modal?.classList.remove("modal--open");
      onSubmitRestaurantAddForm(restaurantItem);
    });
  }
}

export default ModalView;

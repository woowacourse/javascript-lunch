import { $ } from "../utils/domSelectors";
import { Restaurant, Category, Distance } from "../domains/types";

class ModalView {
  private restaurantAddForm = $("#restaurant-add-form") as HTMLFormElement;
  private modal = $(".modal");
  private closeButton = $("#modal-close-button");

  constructor() {
    this.addCloseButtonClickEvent();
  }

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

      this.restaurantAddForm.reset();
      this.modal?.classList.remove("modal--open");
      onSubmitRestaurantAddForm(restaurantItem);
    });
  }

  addCloseButtonClickEvent() {
    this.closeButton?.addEventListener("click", () => {
      this.restaurantAddForm.reset();
      this.modal?.classList.remove("modal--open");
    });
  }
}

export default ModalView;

import { $ } from "../utils/domSelectors";
import { Restaurant } from "../domains/types";
import { restaurantFormValidator } from "../domains/restaurantFormValidator";
import { ERROR_MESSAGE } from "../constants/constants";

class ModalView {
  private restaurantAddForm = $("#restaurant-add-form") as HTMLFormElement;
  private modal = $(".modal");
  private closeButton = $("#modal-close-button");
  private categoryInputCaption = $("#category-caption") as HTMLSpanElement;
  private nameInputCaption = $("#name-caption") as HTMLSpanElement;
  private distanceInputCaption = $("#distance-caption") as HTMLSpanElement;
  private linkInputCaption = $("#link-caption") as HTMLSpanElement;

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

      const Errors = restaurantFormValidator.verify(restaurantItem);

      if (!(Errors.category || Errors.name || Errors.distance || Errors.link)) {
        this.restaurantAddForm.reset();
        this.modal?.classList.remove("modal--open");
        return onSubmitRestaurantAddForm(restaurantItem);
      }

      if (Errors.category) {
        this.categoryInputCaption.classList.add("error-text");
        this.categoryInputCaption.textContent = ERROR_MESSAGE.EMPTY_CATEGORY;
      }

      if (Errors.name) {
        this.nameInputCaption.classList.add("error-text");
        this.nameInputCaption.textContent = ERROR_MESSAGE.INVALID_NAME;
      }

      if (Errors.distance) {
        this.distanceInputCaption.classList.add("error-text");
        this.distanceInputCaption.textContent = ERROR_MESSAGE.EMPTY_DISTANCE;
      }

      if (Errors.link) {
        this.linkInputCaption.classList.add("error-text");
        this.linkInputCaption.textContent = ERROR_MESSAGE.INVALID_LINK;
      }
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

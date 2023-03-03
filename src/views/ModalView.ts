import { Restaurant, Errors } from "../types/types";
import { ERROR_MESSAGE, MESSAGE } from "../constants/constants";
import { $ } from "../utils/domSelectors";
import restaurantFormValidator from "../validators/restaurantFormValidator";

class ModalView {
  private restaurantAddForm = $("#restaurant-add-form") as HTMLFormElement;
  private modal = $(".modal") as HTMLDialogElement;
  private closeButton = $("#modal-close-button") as HTMLButtonElement;
  private categoryInput = $("#category") as HTMLSelectElement;
  private categoryInputCaption = $("#category-caption") as HTMLSpanElement;
  private nameInput = $("#name") as HTMLInputElement;
  private nameInputCaption = $("#name-caption") as HTMLSpanElement;
  private distanceInput = $("#distance") as HTMLInputElement;
  private distanceInputCaption = $("#distance-caption") as HTMLSpanElement;
  private linkInput = $("#link") as HTMLInputElement;
  private linkInputCaption = $("#link-caption") as HTMLSpanElement;

  constructor() {
    this.addCloseButtonClickEvent();
    this.addModalBackdropClickEvent();
  }

  addSubmitEventHandler(onSubmitRestaurantAddForm: CallableFunction) {
    this.restaurantAddForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData: FormData = new FormData(this.restaurantAddForm);
      const restaurantItem = Object.fromEntries(
        [...formData].map(([key, value]) => [
          key,
          key === "distance" ? Number(value) : value,
        ])
      ) as Restaurant;

      const formErrors: Errors = restaurantFormValidator.verify(restaurantItem);
      const hasError = Object.values(formErrors).some(Boolean);

      if (!hasError) {
        this.restaurantAddForm.reset();
        this.modal.close();
        return onSubmitRestaurantAddForm(restaurantItem);
      }

      this.showErrorMessages(formErrors);
      this.addErrorMessageRemovingEvents();
    });
  }

  showErrorMessages(errors: Errors) {
    if (errors.category) {
      this.categoryInputCaption.classList.add("error-text");
      this.categoryInputCaption.textContent = ERROR_MESSAGE.EMPTY_CATEGORY;
    }

    if (errors.name) {
      this.nameInputCaption.classList.add("error-text");
      this.nameInputCaption.textContent = ERROR_MESSAGE.INVALID_NAME;
      this.nameInput.value = "";
    }

    if (errors.distance) {
      this.distanceInputCaption.classList.add("error-text");
      this.distanceInputCaption.textContent = ERROR_MESSAGE.EMPTY_DISTANCE;
    }

    if (errors.link) {
      this.linkInputCaption.classList.add("error-text");
      this.linkInputCaption.textContent = ERROR_MESSAGE.INVALID_LINK;
      this.linkInput.value = "";
    }
  }

  addCategoryChangeEvent() {
    this.categoryInput.addEventListener(
      "change",
      () => {
        this.categoryInputCaption.classList.add("error-text");
        this.categoryInputCaption.textContent = "";
      },
      { once: true }
    );
  }

  addNameInputEvent() {
    this.nameInput.addEventListener(
      "input",
      () => {
        this.nameInputCaption.classList.remove("error-text");
        this.nameInputCaption.textContent = "";
      },
      { once: true }
    );
  }

  addDistanceChangeEvent() {
    this.distanceInput.addEventListener(
      "change",
      () => {
        this.distanceInputCaption.classList.remove("error-text");
        this.distanceInputCaption.textContent = "";
      },
      { once: true }
    );
  }

  addLinkInputEvent() {
    this.linkInput.addEventListener(
      "input",
      () => {
        this.linkInputCaption.classList.remove("error-text");
        this.linkInputCaption.textContent = MESSAGE.LINK_DEFAULT_CAPTION;
      },
      { once: true }
    );
  }

  addErrorMessageRemovingEvents() {
    this.addCategoryChangeEvent();
    this.addNameInputEvent();
    this.addDistanceChangeEvent();
    this.addLinkInputEvent();
  }

  addCloseButtonClickEvent() {
    this.closeButton.addEventListener("click", () => {
      this.restaurantAddForm.reset();
      this.modal.close();
    });
  }

  addModalBackdropClickEvent() {
    this.modal.addEventListener("click", (event) => {
      const target = event.target as HTMLDialogElement;
      if (target === event.currentTarget) {
        target.close();
      }
    });
  }
}

export default ModalView;

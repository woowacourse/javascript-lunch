import AddRestaurantForm from "../view/components/AddRestaurantForm/AddRestaurantForm";
import FORM_ITEM_TEXTS from "../constants/formItemTexts";
import Modal from "../view/components/Modal/Modal";
import RenderController from "./RenderController";
import RestaurantListController from "./RestaurantListController";
import createElementByTag from "../view/utils/createElementByTag";

class ModalController {
  static #addRestaurantTitle = createElementByTag({
    tag: "h2",
    classes: ["modal-title", "text-title"],
    contents: FORM_ITEM_TEXTS.formTitle,
  });

  static #addRestaurantForm = this.#createAddRestaurantForm();

  static modal = this.#createModal();

  static changeIntoAddRestaurantForm() {
    this.modal.replaceContents([
      this.#addRestaurantTitle,
      this.#addRestaurantForm.element,
    ]);
  }

  static openModal() {
    this.modal.open();
  }
  static closeModal() {
    this.modal.close();
  }

  static #createModal() {
    const modal = new Modal({
      eventListenerArgs: [
        [
          "submit",
          (e) => {
            e.preventDefault();
            RenderController.renderRestaurantListUl();
            modal.close();
          },
        ],
      ],
    });

    modal.element.addEventListener("submit", () => {
      this.#addRestaurantForm.removeErrorPrint();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") modal.close();
    });

    return modal;
  }

  static #createAddRestaurantForm() {
    const submitFunc = (restaurant: Restaurant) => {
      RestaurantListController.addToEntireRestaurantList(restaurant);
    };

    const addRestaurantForm = new AddRestaurantForm({
      cancelFunc: this.closeModal,
      submitFunc: submitFunc.bind(this),
    });

    return addRestaurantForm;
  }
}

export default ModalController;

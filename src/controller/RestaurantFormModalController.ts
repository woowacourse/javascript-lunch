import AddRestaurantForm from "../view/components/AddRestaurantForm/AddRestaurantForm";
import FORM_ITEM_TEXTS from "../constants/formItemTexts";
import Modal from "../view/components/Modal/Modal";
import RestaurantListProxy from "../domain/RestaurantListProxy";

class RestaurantFormModalController {
  #title = this.#createTitle();

  #addRestaurantForm = this.#createAddRestaurantForm();

  #afterSubmitFunc;

  modal;

  constructor(afterSubmitFunc: () => void) {
    this.modal = this.#createModal();
    this.#afterSubmitFunc = afterSubmitFunc;
  }

  openModal() {
    this.modal.open();
  }
  closeModal() {
    this.#addRestaurantForm.reset();
    this.modal.close();
  }

  #createModal() {
    const modal = new Modal({
      eventListenerArgs: [
        [
          "submit",
          (e) => {
            e.preventDefault();
            this.#addRestaurantForm.removeErrorPrint();
            modal.close();
          },
        ],
      ],
    });

    modal.replaceContents(this.#title, this.#addRestaurantForm.element);

    return modal;
  }

  #createTitle() {
    const title = document.createElement("h2");
    title.classList.add("modal-title", "text-title");
    title.textContent = FORM_ITEM_TEXTS.formTitle;

    return title;
  }

  #createAddRestaurantForm() {
    const submitFunc = (restaurant: Restaurant) => {
      RestaurantListProxy.addToEntireRestaurantList(restaurant);
      this.#afterSubmitFunc();
    };

    const addRestaurantForm = new AddRestaurantForm({
      cancelFunc: this.closeModal,
      submitFunc: submitFunc.bind(this),
    });

    return addRestaurantForm;
  }
}

export default RestaurantFormModalController;

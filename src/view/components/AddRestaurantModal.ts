import generateModal from "../generateComponent/generateModal";
import AddRestaurantForm from "./AddRestaurantForm";

class AddRestaurantModal {
  element;
  #form;

  constructor() {
    this.#form = new AddRestaurantForm();
    const restaurantForm = this.#form.getForm({
      hideModalFunc: this.hide.bind(this),
    });
    const contents = [this.#createH2(), restaurantForm];
    this.element = generateModal(contents);
  }

  hide() {
    this.element.classList.remove("modal--open");
    this.#form.resetForms();
  }

  open() {
    this.element.classList.add("modal--open");
  }

  #createH2() {
    const h2InModal = document.createElement("h2");
    h2InModal.textContent = "새로운 음식점";
    h2InModal.classList.add(..."modal-title text-title".split(" "));
    return h2InModal;
  }
}

export default AddRestaurantModal;

import AddRestaurantForm from "./AddRestaurantForm";
import AllRestaurantList from "../../domain/AllRestaurantList";
import FORM_ITEM_TEXTS from "../../constants/formItemTexts";
import generateModal from "../generateComponent/generateModal";

class AddRestaurantModal {
  element;
  #form;

  constructor() {
    this.#form = new AddRestaurantForm();
    const restaurantForm = this.#form.getForm({
      handleClickCancelButton: this.hide.bind(this),
      handleClickAddButton: (newRestaurant: Restaurant) => {
        this.#addRestaurant.bind(this)(newRestaurant);
      },
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

  #addRestaurant(newRestaurant: Restaurant) {
    if (
      newRestaurant.name &&
      newRestaurant.category &&
      newRestaurant.distance
    ) {
      AllRestaurantList.add(newRestaurant);
    }
  }

  #createH2() {
    const h2InModal = document.createElement("h2");
    h2InModal.textContent = FORM_ITEM_TEXTS.formTitle;
    h2InModal.classList.add(..."modal-title text-title".split(" "));
    return h2InModal;
  }
}

export default AddRestaurantModal;

import AddRestaurantForm from "../Form/AddRestaurantForm";
import FORM_ITEM_TEXTS from "../../../constants/formItemTexts";
import Modal from "./Modal";

class AddingRestaurantModal extends Modal {
  constructor() {
    super(AddingModalChildren());
  }
}

const AddingModalChildren = () => {
  const title = getTitle();
  const form = getForm();

  return [title, form];
};

const getTitle = () => {
  const h2InModal = document.createElement("h2");
  h2InModal.textContent = FORM_ITEM_TEXTS.formTitle;
  h2InModal.classList.add("modal-title", "text-title");
  return h2InModal;
};

const getForm = () => {
  const form = new AddRestaurantForm().getForm({
    handleClickCancelButton: (e: Event) => {
      if (e.target instanceof HTMLElement) {
        e.target.closest(".modal")?.classList.remove("modal--open");
      }
    },
    handleClickAddButton: () => {},
  });

  return form;
};

export default AddingRestaurantModal;
